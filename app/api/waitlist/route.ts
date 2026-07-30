import { NextResponse } from 'next/server';
import { clientKey, deliverLead, rateLimit } from '@/lib/leads';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (value: unknown, max = 200) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  if (clean(payload.website)) {
    return NextResponse.json({ message: 'You are on the list.' });
  }

  if (!rateLimit(`waitlist:${clientKey(request)}`, 8).allowed) {
    return NextResponse.json({ message: 'Too many attempts. Try again later.' }, { status: 429 });
  }

  const fields = {
    name: clean(payload.name, 120),
    email: clean(payload.email),
    business: clean(payload.business, 160),
  };

  if (!fields.name) return NextResponse.json({ message: 'Name is required.' }, { status: 422 });
  if (!emailPattern.test(fields.email)) {
    return NextResponse.json({ message: 'A valid email address is required.' }, { status: 422 });
  }

  await deliverLead({ type: 'reviews-waitlist', submittedAt: new Date().toISOString(), fields });

  return NextResponse.json({
    message: 'You are on the list — we will email you the moment Reputera Reviews opens up.',
  });
}
