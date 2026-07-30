/**
 * Lead delivery.
 *
 * The site works with zero configuration, but a lead is only *delivered*
 * when one of these is set (see README):
 *
 *   LEAD_WEBHOOK_URL   POST the lead as JSON — Zapier, Make, Slack, n8n, CRM…
 *   RESEND_API_KEY + LEAD_EMAIL_TO + LEAD_EMAIL_FROM   email the lead
 *
 * With neither configured we log loudly and still return success to the
 * visitor, so a missing env var never shows them a broken form. Configure at
 * least one before going live or submissions go nowhere.
 */

export type Lead = {
  type: 'demo-request' | 'contact' | 'reviews-waitlist';
  submittedAt: string;
  fields: Record<string, string>;
};

type DeliveryResult = { delivered: boolean; channels: string[] };

export async function deliverLead(lead: Lead): Promise<DeliveryResult> {
  const channels: string[] = [];
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM;

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
      if (response.ok) channels.push('webhook');
      else console.error(`[leads] webhook responded ${response.status}`);
    } catch (error) {
      console.error('[leads] webhook delivery failed', error);
    }
  }

  if (resendKey && to && from) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: to.split(',').map((address) => address.trim()),
          reply_to: lead.fields.email || undefined,
          subject: subjectFor(lead),
          text: asPlainText(lead),
        }),
      });
      if (response.ok) channels.push('email');
      else console.error(`[leads] email responded ${response.status}`);
    } catch (error) {
      console.error('[leads] email delivery failed', error);
    }
  }

  if (channels.length === 0) {
    console.warn(
      `[leads] NO DELIVERY CHANNEL CONFIGURED — this ${lead.type} was not sent anywhere. ` +
        'Set LEAD_WEBHOOK_URL or RESEND_API_KEY + LEAD_EMAIL_TO + LEAD_EMAIL_FROM.',
    );
    console.warn(asPlainText(lead));
  }

  return { delivered: channels.length > 0, channels };
}

function subjectFor(lead: Lead) {
  const name = lead.fields.name || 'Someone';
  switch (lead.type) {
    case 'demo-request':
      return `Demo request — ${name}${lead.fields.niche ? ` (${lead.fields.niche})` : ''}`;
    case 'reviews-waitlist':
      return `Reputera Reviews waitlist — ${name}`;
    default:
      return `Contact form — ${name}`;
  }
}

function asPlainText(lead: Lead) {
  const rows = Object.entries(lead.fields)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}:\n${value}`)
    .join('\n\n');

  return `${lead.type} · ${lead.submittedAt}\n\n${rows}\n`;
}

/**
 * Best-effort in-memory rate limit. Per-instance and resets on cold start,
 * which is fine as a speed bump on top of the honeypot; put a real WAF rule
 * in front if the forms ever get seriously targeted.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit = 5, windowMs = 60 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return { allowed: false as const };
  }

  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound on long-lived instances.
  if (hits.size > 5000) {
    for (const [mapKey, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) hits.delete(mapKey);
    }
  }

  return { allowed: true as const };
}

export function clientKey(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}
