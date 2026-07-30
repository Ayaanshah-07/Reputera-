import { NextResponse } from 'next/server';
import { clientKey, deliverLead, rateLimit } from '@/lib/leads';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (value: unknown, max = 300) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  if (clean(payload.website)) {
    return NextResponse.json({ message: 'Thanks — we will be in touch.' });
  }

  if (!rateLimit(`contact:${clientKey(request)}`).allowed) {
    return NextResponse.json(
      { message: 'Too many messages in a short window. Email hello@reputera.com and we will help directly.' },
      { status: 429 },
    );
  }

  const fields = {
    name: clean(payload.name, 120),
    email: clean(payload.email, 200),
    phone: clean(payload.phone, 40),
    topic: clean(payload.topic, 80),
    message: clean(payload.message, 8000),
  };

  if (!fields.name) return NextResponse.json({ message: 'Name is required.' }, { status: 422 });
  if (!emailPattern.test(fields.email)) {
    return NextResponse.json({ message: 'A valid email address is required.' }, { status: 422 });
  }
  if (fields.message.length < 20) {
    return NextResponse.json({ message: 'Please add a little more detail.' }, { status: 422 });
  }

  await deliverLead({ type: 'contact', submittedAt: new Date().toISOString(), fields });

  return NextResponse.json({
    message: 'Thanks — your message is with us. We reply within one business day.',
  });
}
