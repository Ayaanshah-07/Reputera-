import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { deliverLead } from '@/lib/leads';
import { parseIncoming, replyFor, sendText } from '@/lib/whatsapp';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET — Meta's webhook verification handshake. It calls this once with a
 * challenge when you save the callback URL; echo it back only if the verify
 * token matches.
 */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const mode = params.get('hub.mode');
  const token = params.get('hub.verify_token');
  const challenge = params.get('hub.challenge');
  const expected = process.env.WHATSAPP_VERIFY_TOKEN;

  if (!expected) {
    console.error('[whatsapp] WHATSAPP_VERIFY_TOKEN is not set — cannot verify the webhook.');
    return new NextResponse('Not configured', { status: 500 });
  }

  if (mode === 'subscribe' && token === expected && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse('Forbidden', { status: 403 });
}

/**
 * POST — incoming messages.
 *
 * Always answers 200 quickly: Meta retries on any non-2xx, so a failure inside
 * our own handling would otherwise cause the same message to be delivered over
 * and over.
 */
export async function POST(request: Request) {
  const raw = await request.text();

  if (!verifySignature(raw, request.headers.get('x-hub-signature-256'))) {
    return new NextResponse('Invalid signature', { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: true });
  }

  const message = parseIncoming(payload);
  if (!message) return NextResponse.json({ ok: true });

  try {
    const { body, notifyTeam } = replyFor(message);

    if (body) await sendText(message.from, body);

    // Route anything worth a human into the same inbox as the web forms.
    if (notifyTeam) {
      await deliverLead({
        type: 'contact',
        submittedAt: new Date().toISOString(),
        fields: {
          source: 'WhatsApp',
          name: message.name || 'WhatsApp contact',
          phone: `+${message.from}`,
          message: message.text,
        },
      });
    }
  } catch (error) {
    console.error('[whatsapp] handler failed', error);
  }

  return NextResponse.json({ ok: true });
}

/**
 * Confirms the payload really came from Meta. Without the app secret set we
 * refuse rather than trusting the request — the endpoint would otherwise let
 * anyone trigger replies and lead notifications.
 */
function verifySignature(raw: string, header: string | null) {
  const secret = process.env.WHATSAPP_APP_SECRET;

  if (!secret) {
    console.error('[whatsapp] WHATSAPP_APP_SECRET is not set — rejecting webhook delivery.');
    return false;
  }
  if (!header?.startsWith('sha256=')) return false;

  const expected = crypto.createHmac('sha256', secret).update(raw).digest('hex');
  const received = header.slice('sha256='.length);

  const a = Buffer.from(expected, 'hex');
  const b = Buffer.from(received, 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
