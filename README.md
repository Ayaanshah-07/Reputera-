# Reputera — marketing website

Multi-page marketing site for Reputera: custom software, app and website development, plus AI
solutions, and the forthcoming **Reputera Reviews** product.

> **Where ideas earn their reputation.**
> From the software we build to the reputation you keep.

Built with **Next.js 15 (App Router) + TypeScript**. No CSS framework — a small design-token system in
`app/globals.css` plus colocated CSS Modules. Static by default, so it deploys to Vercel or Netlify and
loads fast.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then edit
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
```

---

## Project structure

```
app/
  layout.tsx              Root layout: fonts, nav, footer, org + website schema
  page.tsx                Homepage
  globals.css             Design tokens, reset, layout/typography/button primitives
  get-a-demo/             Signature CTA — the demo request page
  services/               Services index
  services/[slug]/        One page per service, generated from lib/site.ts
  portfolio/              Case studies, grouped by industry
  about/                  Founders, story, values
  contact/                Contact form + direct details
  reviews/                Reputera Reviews (coming soon + waitlist)
  api/                    Route handlers: demo-request, contact, waitlist
  sitemap.ts robots.ts    Generated from the same data as the nav
  opengraph-image.tsx     Default social card (generated at build)
components/               Nav, Footer, Hero, DemoForm, ContactForm, cards, FAQ, …
lib/
  site.ts                 Brand copy, nav, SERVICE DATA, form options
  industries.ts           Portfolio case-study data
  seo.ts                  Per-page metadata helper (canonical, OG, Twitter)
  schema.ts               JSON-LD builders
  leads.ts                Lead delivery + rate limiting
```

### Adding or editing a service

Everything about a service lives in one object in `lib/site.ts`. Add an entry to the `services` array
and you automatically get: a page at `/services/<slug>`, a nav dropdown item, footer link, homepage and
services-index cards, a sitemap entry, and `Service` + `FAQPage` schema. No other file needs touching.

Case studies work the same way via the `industries` array in `lib/industries.ts`.

---

## Configuration

Set these in `.env.local` locally and in your host's environment variables in production. See
`.env.example`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Yes, before launch** | Canonical URLs, sitemap, robots, OG image URLs. No trailing slash. |
| `LEAD_WEBHOOK_URL` | One of these two | POSTs each submission as JSON (Zapier, Make, n8n, Slack, CRM). |
| `RESEND_API_KEY` + `LEAD_EMAIL_FROM` | One of these two | Emails each submission via [Resend](https://resend.com). Mail goes to `info@reputera.in` (the `site.email` value); set `LEAD_EMAIL_TO` only to route it elsewhere. |

> **Important:** with no delivery channel configured, the three forms still validate and return success
> to the visitor, but the submission is only written to the server log with a loud warning — it is not
> delivered anywhere. Configure at least one channel before you send traffic to the site.

Brand details that are not secrets — email address, phone number, social handle — live in the `site`
object at the top of `lib/site.ts`. Every form delivers to `site.email` (`info@reputera.in`) and every
"email us" link points at it, so changing it there changes it everywhere. **The phone number is still a
placeholder; replace it before launch.**

---

## WhatsApp bot

The company number **+91 90822 17597** has WhatsApp. **+971 50 415 4976** is listed on the contact page
as an additional number (no WhatsApp connected to it).

Two separate things:

- **Click-to-chat** — the floating button, the contact page and the footer link to `wa.me`. These work
  with no configuration at all.
- **Automated replies** — `app/api/whatsapp/route.ts` is a Meta WhatsApp Cloud API webhook. It answers
  the verification handshake, checks each delivery's `x-hub-signature-256`, and replies through
  `lib/whatsapp.ts`.

To turn the bot on:

1. Add the WhatsApp product to a Meta app and register the company number.
2. Set the webhook callback URL to `https://<domain>/api/whatsapp`, use your `WHATSAPP_VERIFY_TOKEN` as
   the verify token, and subscribe to the `messages` field.
3. Set `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID` and `WHATSAPP_APP_SECRET` (see `.env.example`).

The bot is rules-based, not model-backed — replies are predictable, cost nothing per message, and can't
invent a price or a feature. It offers a four-option menu (what we build / free demo / Reputera Reviews /
talk to a human), answers keywords, and goes quiet once someone asks for a human so it never talks over
the team. Anything that looks like a real enquiry is forwarded to the same inbox as the web forms.

Conversation state is in memory, so it resets when the server restarts — a returning visitor just gets
the greeting again. Move it to a store if that becomes a problem.

---

## Deployment

### Vercel (recommended)

1. Import the repository. Next.js is detected automatically — no build settings to change.
2. Add the environment variables above.
3. Deploy, then point the domain at it.

### Netlify

`netlify.toml` is committed with the build command and the Next.js plugin. Add the same environment
variables in **Site settings → Environment variables**.

---

## SEO

Handled site-wide, not page by page:

- **Per-page metadata** — every page exports its own title/description via `pageMetadata()`, which also
  emits the canonical URL, OpenGraph and Twitter card tags.
- **Structured data** — `ProfessionalService` and `WebSite` on every page (root layout), plus `Service`,
  `FAQPage`, `BreadcrumbList`, `ItemList`, `AboutPage`, `ContactPage` and `SoftwareApplication` where
  relevant. FAQ answers are rendered on-page as well as in schema, which Google requires.
- **Semantic HTML** — one `<h1>` per page, ordered headings, `<nav>`/`<main>`/`<section>`/`<article>`,
  labelled landmarks, visible breadcrumbs on service pages.
- **Sitemap and robots** — generated at `/sitemap.xml` and `/robots.txt` from the same data as the nav,
  so new services appear automatically.
- **Performance** — static pre-rendering, `next/font` with `display: swap` and no layout shift, no CSS
  framework, CSS-only hero animation, and no client JS beyond the nav, the forms and a small
  scroll-reveal observer.

---

## Accessibility

Skip link, visible focus rings, labelled form fields with inline error messages, `aria-invalid` on
failed fields, keyboard-operable nav and accordions, and every animation disabled under
`prefers-reduced-motion`.

---

## Brand assets

The logo is the mark plus the "Reputera." wordmark. It is defined once as inline SVG in
`components/Logo.tsx` (nav and footer) and as a data URI in `lib/brand.ts`, which feeds the generated
favicon (`app/icon.tsx`) and social card (`app/opengraph-image.tsx`). `/public/logo.svg` is the
standalone copy for anything outside the app — email signatures, social profiles, directory listings.

Changing the mark means editing `lib/brand.ts` and the inline copy in `components/Logo.tsx`.

---

## Still to do

- **Founder photos** — `app/about/page.tsx` uses initials avatars, marked with a `TODO(brand)` comment.
- **Real phone number** — the placeholder in `lib/site.ts` still needs replacing.
- **Case-study specifics** — `lib/industries.ts` is written from the brief; confirm the details match
  real projects before launch.
