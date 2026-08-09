/**
 * Content for the outcome-led Work page. Each section explains what a kind of
 * build achieves, then (where we have one) shows a real project as proof.
 */

export type OutcomeIconName =
  | 'automate'
  | 'merge'
  | 'hub'
  | 'scale'
  | 'field'
  | 'capture'
  | 'journey'
  | 'live'
  | 'convert'
  | 'search'
  | 'trust'
  | 'speed'
  | 'chat'
  | 'agent'
  | 'assistant'
  | 'embed';

export type Outcome = { icon: OutcomeIconName; title: string; body: string };

export type WorkSection = {
  id: string;
  eyebrow: string;
  heading: string;
  intro: string;
  accent: 'cyan' | 'amber';
  outcomes: Outcome[];
  service: { label: string; href: string };
  /** Optional real project. `caseSlug` matches lib/industries.ts. */
  proof?: { caseSlug: string; niche: string; title: string; copy: string; tags: string[] };
  /** Shown when a section has no named project yet. */
  note?: string;
};

export const workSections: WorkSection[] = [
  {
    id: 'software',
    eyebrow: 'Custom software',
    heading: 'What custom software achieves',
    intro:
      'Off-the-shelf tools handle the generic. Custom software handles your business — the parts no product was built for.',
    accent: 'cyan',
    outcomes: [
      {
        icon: 'automate',
        title: 'Removes manual work.',
        body: "Automates the repetitive, error-prone tasks eating your team's hours.",
      },
      {
        icon: 'merge',
        title: 'Ends the spreadsheet chaos.',
        body: 'Replaces fragile spreadsheets and disconnected tools with one system that fits how you work.',
      },
      {
        icon: 'hub',
        title: 'Puts your whole operation in one place.',
        body: 'Inventory, orders, production, reporting — connected, not scattered.',
      },
      {
        icon: 'scale',
        title: 'Scales with you.',
        body: 'A system built around your logic grows as you do, instead of breaking when you outgrow it.',
      },
    ],
    service: { label: 'Software Development', href: '/services/software-development' },
    proof: {
      caseSlug: 'footwear-manufacturing',
      niche: 'Footwear manufacturing',
      title: 'ERP system',
      copy: 'We documented and extended a full ERP system for a footwear manufacturer — mapping their real production and catalog workflow into one connected system, and adding an AI image-matching feature that cut manual catalog lookup time.',
      tags: ['Software', 'ERP', 'AI'],
    },
  },
  {
    id: 'apps',
    eyebrow: 'Custom apps',
    heading: 'What custom apps achieve',
    intro:
      "An app earns its place when it makes the work easier wherever the work happens — in the field, on the floor, or in a customer's hand.",
    accent: 'amber',
    outcomes: [
      {
        icon: 'field',
        title: 'Work that moves with your team.',
        body: 'Field tools and mobile systems that work on-site, on the go, even offline.',
      },
      {
        icon: 'capture',
        title: 'Faster, fewer errors.',
        body: 'Capture data at the source — photos, status, notes — instead of writing it up later.',
      },
      {
        icon: 'journey',
        title: "A customer experience they'll return to.",
        body: "Apps built around the customer's journey, not a generic template.",
      },
      {
        icon: 'live',
        title: 'Real-time visibility.',
        body: "See what's happening across your operation as it happens.",
      },
    ],
    service: { label: 'App Development', href: '/services/app-development' },
    proof: {
      caseSlug: 'construction-fit-out',
      niche: 'Construction & fit-out',
      title: 'Site snagging app',
      copy: 'We built a field-ready app for tracking construction defects on site — with photo upload and AI-generated issue descriptions — so teams could log and report snags in real conditions instead of back at the office.',
      tags: ['App', 'AI', 'Field tools'],
    },
  },
  {
    id: 'websites',
    eyebrow: 'Websites',
    heading: 'What a website should achieve',
    intro:
      "A website isn't a brochure — it's your hardest-working salesperson. Built right, it earns attention, trust, and enquiries.",
    accent: 'cyan',
    outcomes: [
      {
        icon: 'convert',
        title: 'Turns visitors into enquiries.',
        body: 'Designed around a clear goal, guiding people to act — not just look.',
      },
      {
        icon: 'search',
        title: 'Gets found.',
        body: 'Built clean and search-friendly so you rank and get discovered.',
      },
      {
        icon: 'trust',
        title: 'Builds instant credibility.',
        body: "A fast, sharp site signals you're a business worth trusting.",
      },
      {
        icon: 'speed',
        title: 'Loads fast, works everywhere.',
        body: 'Speed and mobile-first performance that keep visitors from bouncing.',
      },
    ],
    service: { label: 'Website Development', href: '/services/website-development' },
    note: 'From marketing sites to full web platforms, we build the front door to everything a business does online.',
  },
  {
    id: 'ai',
    eyebrow: 'AI solutions',
    heading: "What AI achieves when it's built right",
    intro:
      "AI is only worth it when it saves real time or money. Built around a real problem, it quietly takes work off your team's plate.",
    accent: 'amber',
    outcomes: [
      {
        icon: 'chat',
        title: 'Answers, around the clock.',
        body: 'Chatbots that handle customer questions and qualify leads 24/7.',
      },
      {
        icon: 'agent',
        title: 'Work that runs itself.',
        body: 'AI agents that carry out multi-step tasks without someone driving every step.',
      },
      {
        icon: 'assistant',
        title: 'Instant answers from your own data.',
        body: 'Assistants that search, summarize, and draft so your team stops digging through systems.',
      },
      {
        icon: 'embed',
        title: 'Smarter software.',
        body: 'AI features — smart search, image matching, automation — built right into the tools you already use.',
      },
    ],
    service: { label: 'AI Solutions', href: '/services/ai-solutions' },
    proof: {
      caseSlug: 'footwear-manufacturing',
      niche: 'AI image matching',
      title: 'Inside the footwear ERP',
      copy: 'Inside the footwear ERP, we built an AI feature that automatically matches product photos to the correct catalog entries — replacing slow manual lookup with an instant, accurate match.',
      tags: ['AI', 'Software'],
    },
  },
];
