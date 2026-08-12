/**
 * WhatsApp bot — Meta WhatsApp Cloud API.
 *
 * Setup (all in Meta Business / developers.facebook.com):
 *   1. Add the WhatsApp product to a Meta app and register the company number.
 *   2. Set the webhook callback URL to https://<domain>/api/whatsapp and the
 *      verify token to WHATSAPP_VERIFY_TOKEN, then subscribe to `messages`.
 *   3. Put the permanent access token in WHATSAPP_TOKEN, the number's ID in
 *      WHATSAPP_PHONE_NUMBER_ID, and the app secret in WHATSAPP_APP_SECRET.
 *
 * Without those env vars the webhook still validates and logs, but sends
 * nothing — so a half-finished setup never silently drops messages.
 *
 * The bot is deliberately rules-based rather than model-backed: replies are
 * predictable, cost nothing per message, and cannot invent a price or promise
 * a feature that does not exist.
 */

import { site } from './site';

const GRAPH = 'https://graph.facebook.com/v21.0';

export type IncomingMessage = { from: string; text: string; name?: string };

/* ------------------------------------------------------------------ send -- */

export async function sendText(to: string, body: string) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    console.warn(
      `[whatsapp] WHATSAPP_TOKEN / WHATSAPP_PHONE_NUMBER_ID not set — reply to ${to} not sent:\n${body}`,
    );
    return false;
  }

  try {
    const response = await fetch(`${GRAPH}/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { preview_url: true, body },
      }),
    });

    if (!response.ok) {
      console.error(`[whatsapp] send failed ${response.status}: ${await response.text()}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error('[whatsapp] send threw', error);
    return false;
  }
}

/* --------------------------------------------------------------- sessions -- */

type Session = { stage: 'new' | 'menu' | 'human'; lastSeen: number };

const sessions = new Map<string, Session>();
const SESSION_TTL = 6 * 60 * 60 * 1000;

function getSession(from: string): Session {
  const now = Date.now();
  const existing = sessions.get(from);

  if (existing && now - existing.lastSeen < SESSION_TTL) {
    existing.lastSeen = now;
    return existing;
  }

  // Cheap sweep so a long-lived instance does not accumulate stale sessions.
  if (sessions.size > 2000) {
    for (const [key, value] of sessions) {
      if (now - value.lastSeen >= SESSION_TTL) sessions.delete(key);
    }
  }

  const fresh: Session = { stage: 'new', lastSeen: now };
  sessions.set(from, fresh);
  return fresh;
}

/* -------------------------------------------------------------- responses -- */

const MENU = `Reply with a number:

1️⃣ What we build
2️⃣ Get a free demo (24–72 hrs)
3️⃣ Reputera Reviews
4️⃣ Talk to a human`;

const REPLIES = {
  services: `We build four things, all around how your business actually works:

• *Custom software* — ERP systems, internal tools, workflow automation
• *Apps* — mobile and web, for your team or your customers
• *Websites* — fast, search-friendly, built to convert
• *AI solutions* — assistants, agents and chatbots on your own data

More: ${site.url}/services

${MENU}`,

  demo: `Here's how the free demo works:

Tell us what you want built and we come back with a *real visual demo in 24–72 hours* — actual designed screens, not a proposal. No cost, no obligation.

Start here: ${site.url}/get-a-demo

Or just describe your idea in this chat and we'll pick it up.`,

  reviews: `*Reputera Reviews* is our own product — Google review management for agencies looking after local businesses.

It collects reviews automatically, drafts a reply in each business's voice for a human to approve, publishes to Google, and runs invitation campaigns to win more.

It's in development — join the waitlist: ${site.url}/reviews

${MENU}`,

  human: `Got it — a human will pick this up shortly. 👋

We usually reply within one business day. If it's urgent, email ${site.email}.

Feel free to leave the details here in the meantime — what you're trying to build, and roughly when you need it.`,

  fallback: `Thanks for the message! I've passed it to the team, and someone will reply personally.

In the meantime, here's what I can help with:

${MENU}`,
} as const;

function greeting(name?: string) {
  return `Hi${name ? ` ${name.split(' ')[0]}` : ''}! 👋 You've reached *Reputera* — we build custom software, apps, websites and AI.

${MENU}`;
}

/* ----------------------------------------------------------------- router -- */

/**
 * Whole-word match, allowing a trailing plural.
 *
 * Plain substring matching is too eager for short keywords — "ai" would fire
 * on "email", "wait" and "said". Strict word boundaries are too strict the
 * other way: "what are your prices" would miss "price". The optional `s`
 * covers both.
 */
const matches = (text: string, ...needles: string[]) =>
  needles.some((needle) =>
    new RegExp(`\\b${needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}s?\\b`, 'i').test(text),
  );

/**
 * Decides the reply for an incoming message.
 * Exported separately from the route so it can be reasoned about and tested
 * without a webhook payload.
 */
export function replyFor(message: IncomingMessage): { body: string; notifyTeam: boolean } {
  const session = getSession(message.from);
  const text = message.text.trim().toLowerCase();

  // Once handed to a human the bot stays quiet, so it cannot talk over the team.
  if (session.stage === 'human') {
    return { body: '', notifyTeam: true };
  }

  if (matches(text, 'human', 'agent', 'person', 'call me', 'talk to') || text === '4') {
    session.stage = 'human';
    return { body: REPLIES.human, notifyTeam: true };
  }

  // Intent order matters: "how much does an app cost" is a pricing question,
  // not a request for the service list, so pricing is checked first.
  if (text === '2' || matches(text, 'demo', 'quote', 'price', 'pricing', 'cost', 'how much', 'budget')) {
    session.stage = 'menu';
    return { body: REPLIES.demo, notifyTeam: true };
  }

  if (text === '3' || matches(text, 'review', 'reputation')) {
    session.stage = 'menu';
    return { body: REPLIES.reviews, notifyTeam: false };
  }

  if (
    text === '1' ||
    matches(text, 'service', 'what do you do', 'what we build', 'software', 'app', 'website', 'ai', 'chatbot')
  ) {
    session.stage = 'menu';
    return { body: REPLIES.services, notifyTeam: false };
  }

  if (session.stage === 'new' || matches(text, 'hi', 'hello', 'hey', 'salaam', 'namaste', 'menu', 'start')) {
    session.stage = 'menu';
    return { body: greeting(message.name), notifyTeam: false };
  }

  // Anything else is a real enquiry in the visitor's own words — worth a human.
  return { body: REPLIES.fallback, notifyTeam: true };
}

/** The slice of the Cloud API webhook payload we actually read. */
type WebhookPayload = {
  entry?: {
    changes?: {
      value?: {
        contacts?: { profile?: { name?: string } }[];
        messages?: { from?: string; type?: string; text?: { body?: string } }[];
      };
    }[];
  }[];
};

/**
 * Extracts the first text message from a webhook payload. Returns null for
 * anything else — Meta also posts status callbacks (delivered, read) and
 * non-text messages through the same endpoint.
 */
export function parseIncoming(payload: unknown): IncomingMessage | null {
  const value = (payload as WebhookPayload)?.entry?.[0]?.changes?.[0]?.value;
  const message = value?.messages?.[0];

  if (!message || message.type !== 'text' || !message.from) return null;

  return {
    from: message.from,
    text: message.text?.body ?? '',
    name: value?.contacts?.[0]?.profile?.name,
  };
}
