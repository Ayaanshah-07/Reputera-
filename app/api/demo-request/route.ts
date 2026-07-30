import { NextResponse } from 'next/server';
import { budgetRanges, buildOptions } from '@/lib/site';
import { clientKey, deliverLead, rateLimit } from '@/lib/leads';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MIN_DESCRIPTION = 150;
const MAX_DESCRIPTION = 20000;
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

  // Honeypot — silently accept so bots do not learn anything.
  if (clean(payload.website)) {
    return NextResponse.json({ message: 'Thanks — we will be in touch.' });
  }

  if (!rateLimit(`demo:${clientKey(request)}`).allowed) {
    return NextResponse.json(
      { message: 'That is a few requests in a short time. Email hello@reputera.com and we will help directly.' },
      { status: 429 },
    );
  }

  const fields = {
    build: clean(payload.build, 40),
    niche: clean(payload.niche, 120),
    description: clean(payload.description, MAX_DESCRIPTION),
    budget: clean(payload.budget, 60),
    name: clean(payload.name, 120),
    email: clean(payload.email, 200),
    phone: clean(payload.phone, 40),
    company: clean(payload.company, 160),
  };

  const errors: string[] = [];

  if (!buildOptions.some((option) => option.value === fields.build)) {
    errors.push('Select what you want built.');
  }
  if (!fields.niche) errors.push('Business niche is required.');
  if (fields.description.length < MIN_DESCRIPTION) {
    errors.push('Please describe the project in a little more detail.');
  }
  if (!(budgetRanges as readonly string[]).includes(fields.budget)) {
    errors.push('Select a budget range.');
  }
  if (!fields.name) errors.push('Name is required.');
  if (!emailPattern.test(fields.email)) errors.push('A valid email address is required.');
  if (fields.phone.replace(/[^\d]/g, '').length < 7) errors.push('A valid phone number is required.');

  if (errors.length > 0) {
    return NextResponse.json({ message: errors[0], errors }, { status: 422 });
  }

  await deliverLead({
    type: 'demo-request',
    submittedAt: new Date().toISOString(),
    fields,
  });

  return NextResponse.json({
    message:
      'We have your brief. Our team is building a visual demo of it now — expect it in your inbox within 24–72 hours.',
  });
}
