/**
 * Single source of truth for brand copy, navigation and service data.
 * Pages, the sitemap, the nav and JSON-LD schema all read from here so
 * adding a service only means editing this file.
 */

export const site = {
  name: 'Reputera',
  legalName: 'Reputera',
  tagline: 'Where ideas earn their reputation.',
  supportingTagline: 'From the software we build to the reputation you keep.',
  description:
    'Reputera builds custom software, apps, websites, and AI solutions engineered around how your business actually runs. Get a working demo in 24–72 hours.',
  // Override in production with NEXT_PUBLIC_SITE_URL (Vercel/Netlify env var).
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://reputera.in').replace(/\/$/, ''),
  email: 'info@reputera.in',
  /** Company line. WhatsApp is connected to this one. */
  phone: '+91 90822 17597',
  /** Digits only, for wa.me and the Cloud API. */
  whatsapp: '919082217597',
  /** Additional contact number. No WhatsApp on this line. */
  phoneAlt: '+971 50 415 4976',
  locale: 'en_US',
  twitter: '@reputera',
} as const;

/** Prefilled text on every click-to-chat link. */
export const whatsappGreeting =
  "Hi Reputera — I'd like to talk about a project.";

export const whatsappLink = (message: string = whatsappGreeting) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export type NavLink = {
  href: string;
  label: string;
  children?: NavLink[];
};

/**
 * A titled block of copy.
 * `href` turns the whole card into a link to another page.
 * `links` adds explicit cross-links beneath the copy, for items that point at
 * more than one page. Use one or the other — a stretched card link would sit
 * on top of the inline ones.
 */
export type ServiceItem = {
  title: string;
  body: string;
  href?: string;
  links?: { label: string; href: string }[];
};

/** A case study shown on a service page, optionally reframed for that page. */
export type ServiceProofCase = {
  /** Matches a slug in lib/industries.ts. */
  slug: string;
  title?: string;
  copy?: string;
  tags?: string[];
};

export type Service = {
  slug: string;
  /** Short label used in nav and cards. */
  title: string;
  /** H1 on the service page. */
  heading: string;
  /** Substring of `heading` rendered in the accent gradient. */
  headingAccent?: string;
  metaTitle: string;
  metaDescription: string;
  /** schema.org serviceType. Defaults to `title` when the two match. */
  serviceType?: string;
  /** Small label shown on the service card. */
  tag: string;
  /** Homepage card copy, also used in schema. Leads with the target keyword. */
  summary: string;
  /** The /services hub frames each service slightly differently to the homepage. */
  hub: { tag: string; copy: string };
  /** Lead paragraph under the H1. */
  intro: string;
  accent: 'cyan' | 'amber';
  icon: 'code' | 'mobile' | 'globe' | 'spark';
  /** Marked as the flagship offering — gets visual priority everywhere. */
  flagship?: boolean;
  /** "What we build" — H2 plus H3 sub-items. */
  build: { eyebrow: string; heading: string; intro?: string; items: ServiceItem[] };
  /** Numbered process section. */
  process: { eyebrow: string; heading: string; intro?: string; steps: ServiceItem[] };
  /** Optional "why custom" section. */
  why?: { eyebrow: string; heading: string; points: ServiceItem[] };
  /**
   * Optional proof section. Cases reference lib/industries.ts by slug so the
   * project has one record, while title/copy/tags can be reframed per page —
   * the same build is the lead story on one service page and a supporting
   * detail on another.
   */
  proof?: { eyebrow: string; heading: string; cases: ServiceProofCase[] };
  /** Optional closing CTA copy. Falls back to the site-wide default. */
  cta?: { heading: string; body: string };
  /** Each section below renders only when present and non-empty. */
  stack?: string[];
  faqs?: { question: string; answer: string }[];
  /** Show the "rest of what we build" cross-links. Defaults to true. */
  showRelated?: boolean;
};

export const services: Service[] = [
  {
    slug: 'software-development',
    title: 'Software Development',
    heading: 'Software, built around your business — not a template.',
    headingAccent: 'your business',
    metaTitle: 'Custom Software Development Company | Reputera',
    metaDescription:
      'Reputera builds custom software around your exact business logic — ERP systems, internal tools, workflow automation, and AI features. See a demo in 24–72 hrs.',
    serviceType: 'Custom Software Development',
    tag: 'Lead offering',
    summary:
      'Custom software mapped to how your business actually runs — ERP systems, internal tools, and workflow automation, including AI-powered features. We build the system around your logic, so it fits like it was always yours.',
    hub: {
      tag: 'Lead offering',
      copy:
        "Custom software mapped to how your business runs — ERP systems, internal tools, workflow automation, and AI-powered features. The system fits your logic, because we build it around your logic.",
    },
    intro:
      'Most software forces your business to bend around it. We do the opposite. Reputera builds custom software that maps to how your business actually runs — your workflow, your logic, your rules — so the system fits like it was designed from the inside out. Because it was.',
    accent: 'cyan',
    icon: 'code',
    flagship: true,
    build: {
      eyebrow: 'What we build',
      heading: 'What we build',
      intro:
        'From full systems to the specific tool your team is missing, we build software that does real work — not off-the-shelf products dressed up as custom.',
      items: [
        {
          title: 'ERP Systems',
          body: 'End-to-end systems that run your operations — inventory, orders, production, and reporting — designed around your processes instead of a rigid template you have to adapt to.',
        },
        {
          title: 'Internal Tools & Dashboards',
          body: 'The specific tools your team keeps asking for: admin panels, dashboards, trackers, and internal apps that remove the manual work slowing everyone down.',
        },
        {
          title: 'Workflow Automation',
          body: 'We find the repetitive, error-prone steps in your process and automate them — so your team spends time on the work that actually needs a human.',
        },
        {
          title: 'AI-Powered Features',
          body: 'From smart search and image matching to AI assistants built into your system — we add intelligence where it saves real time, not as a gimmick.',
          href: '/services/ai-solutions',
        },
      ],
    },
    process: {
      eyebrow: 'How we work',
      heading: 'How we build software that fits',
      intro:
        'Our process is built to understand your business first, and write code second. That\'s the whole difference.',
      steps: [
        {
          title: 'Understand your workflow',
          body: 'We start by learning how your business actually operates — the steps, the exceptions, the things no template accounts for.',
        },
        {
          title: 'Map the logic',
          body: 'We turn your workflow into a clear system design, so you can see exactly how the software will think before anything gets built.',
        },
        {
          title: 'Build around it',
          body: 'We build the system to match that logic — not the other way around — with you in the loop, not handed off.',
        },
        {
          title: 'Fit, refine, and hand over',
          body: 'We refine against real use until it feels like it was always part of your business, then hand over software you fully own.',
        },
      ],
    },
    why: {
      eyebrow: 'Why Reputera',
      heading: 'Why businesses choose custom over off-the-shelf',
      points: [
        {
          title: 'Built around your logic, not a template.',
          body: 'Off-the-shelf software makes you change how you work. Custom software from Reputera works the way you already do.',
        },
        {
          title: 'You own it, fully.',
          body: 'No per-seat subscriptions locking you in forever, no vendor deciding your roadmap. The software is yours.',
        },
        {
          title: 'Hands-on, start to finish.',
          body: 'You work directly with the people building your software — not an account manager relaying messages.',
        },
      ],
    },
    proof: {
      eyebrow: 'Proof',
      heading: "Software we've built",
      cases: [
        {
          slug: 'footwear-manufacturing',
          title: 'ERP system + AI image-matching feature',
          copy: 'We documented and extended a full ERP for a footwear manufacturer, adding an AI feature that matches product photos to the correct catalog entries — cutting manual lookup time.',
          tags: ['ERP', 'AI', 'Software'],
        },
      ],
    },
    cta: {
      heading: 'See it before you commit.',
      body: "Tell us what you're trying to build. We'll come back with a real, working demo in 24–72 hours — no sales call, no commitment. Just proof we can build exactly what your business needs.",
    },
    showRelated: false,
  },
  {
    slug: 'app-development',
    title: 'App Development',
    heading: 'Apps built for how your people actually work.',
    headingAccent: 'actually work',
    metaTitle: 'Custom App Development Company | Reputera',
    metaDescription:
      'Reputera builds custom mobile and web apps around how your business works — for your team or your customers. See a working demo in 24–72 hours.',
    serviceType: 'Custom App Development',
    tag: 'Mobile & web',
    summary:
      "Custom apps that put your workflow in your team's or customers' pocket — built for how they'll actually use it, not a generic shell forced to fit.",
    hub: {
      tag: 'Mobile & web',
      copy:
        "Custom mobile and web apps built for how your team or customers actually work — not a generic shell forced to fit.",
    },
    intro:
      'A generic app forces your team or customers to adapt to it. Reputera builds custom apps around your real workflow — mobile and web apps that do exactly what your business needs, on the device where the work actually happens.',
    accent: 'amber',
    icon: 'mobile',
    build: {
      eyebrow: 'What we build',
      heading: 'What we build',
      intro:
        "Whether it's an app your team uses in the field or one your customers use every day, we build it around the real job it has to do.",
      items: [
        {
          title: 'Business & Internal Apps',
          body: "Apps that put your operations in your team's hands — field tools, tracking apps, and internal systems that work wherever your people do, online or off.",
        },
        {
          title: 'Customer-Facing Apps',
          body: 'Apps your customers actually want to use — built around their journey, fast, and designed to keep them coming back.',
        },
        {
          title: 'Web Apps',
          body: 'Powerful browser-based apps with no install required — dashboards, portals, and tools your users can open from anywhere.',
        },
        {
          title: 'AI-Enabled Apps',
          body: 'Apps with intelligence built in — from smart automation to AI assistants embedded right in the interface.',
          href: '/services/ai-solutions',
        },
      ],
    },
    process: {
      eyebrow: 'How we work',
      heading: 'How we build apps that get used',
      intro:
        'An app only earns its place if people actually use it. Our process is built to make sure they do.',
      steps: [
        {
          title: 'Understand the real job',
          body: "We learn who's using the app and what they're actually trying to get done — in the field, at a desk, or on the go.",
        },
        {
          title: 'Design around the user',
          body: 'We shape the app around how your users move and think, so it feels obvious to use from the first tap.',
        },
        {
          title: 'Build & test on real devices',
          body: 'We build for real-world conditions — different devices, patchy connections, busy hands — not just a perfect demo screen.',
        },
        {
          title: 'Launch and refine',
          body: "We get it into your users' hands, then refine based on how it's actually used.",
        },
      ],
    },
    why: {
      eyebrow: 'Why Reputera',
      heading: 'Why our apps work',
      points: [
        {
          title: 'Built around your workflow.',
          body: "We don't start from a template. We start from how your business and your users actually operate.",
        },
        {
          title: 'One team, all the way through.',
          body: 'The people designing your app are the people building it — no handoffs, no telephone game.',
        },
        {
          title: 'Ready for the real world.',
          body: 'We build for messy reality — real devices, real connectivity, real users — not just a clean pitch demo.',
        },
      ],
    },
    proof: {
      eyebrow: 'Proof',
      heading: "Apps we've built",
      cases: [
        {
          slug: 'construction-fit-out',
          title: 'Site snagging application',
          copy: 'A field-ready app for tracking construction defects on site, with photo upload and AI-generated issue descriptions — built to work in real site conditions, not just the office.',
          tags: ['App', 'AI', 'Field tools'],
        },
      ],
    },
    cta: {
      heading: 'See your app before you commit.',
      body: "Tell us what you need your app to do. We'll come back with a real, visual demo in 24–72 hours — no sales call, no commitment.",
    },
    showRelated: false,
  },
  {
    slug: 'website-development',
    title: 'Website Development',
    heading: 'Websites that work as hard as you do.',
    headingAccent: 'as hard as you do',
    metaTitle: 'Custom Website Development Company | Reputera',
    metaDescription:
      'Reputera builds fast, custom websites built to convert — designed around your business and your customers. See a working demo in 24–72 hours.',
    tag: 'Web',
    summary:
      'Fast, sharp, search-friendly websites built to convert — the front door to everything else you do. From marketing sites to landing pages and web platforms, every build is designed around your goals and coded clean for speed and SEO.',
    hub: {
      tag: 'Web',
      copy:
        'Fast, sharp, search-friendly websites built to convert — the front door to everything else you do. From marketing sites to landing pages and web platforms, every build is designed around your goals and coded clean for speed and SEO.',
    },
    intro:
      'Your website is often the first thing a customer sees — it should do more than look good. Reputera builds fast, custom websites designed around your business and built to convert visitors into customers, with the search visibility to get found in the first place.',
    accent: 'cyan',
    icon: 'globe',
    build: {
      eyebrow: 'What we build',
      heading: 'What we build',
      intro:
        'From a sharp marketing site to a full web platform, we build websites that earn their place as your best salesperson.',
      items: [
        {
          title: 'Marketing & Business Websites',
          body: 'Clean, fast, credible websites that tell your story and turn visitors into enquiries — the front door to everything you do.',
        },
        {
          title: 'Landing Pages',
          body: 'Focused, high-converting pages built around a single goal — a campaign, a launch, a product.',
        },
        {
          title: 'Web Platforms & Portals',
          body: 'When you need more than a website — customer portals, booking systems, and web platforms built around your workflow.',
          links: [
            { label: 'Software Development', href: '/services/software-development' },
            { label: 'App Development', href: '/services/app-development' },
          ],
        },
        {
          title: 'SEO-Ready Builds',
          body: 'Every site is built clean and search-friendly from the ground up — fast loading, structured properly, and ready to rank.',
        },
      ],
    },
    process: {
      eyebrow: 'How we work',
      heading: 'How we build websites that convert',
      intro:
        "A good-looking site that doesn't convert is a missed opportunity. We build for results, not just aesthetics.",
      steps: [
        {
          title: 'Understand your goal',
          body: "We start with what the site needs to achieve — leads, sales, sign-ups — and who it's speaking to.",
        },
        {
          title: 'Design with intent',
          body: 'Every section earns its place, guiding visitors toward the action that matters to your business.',
        },
        {
          title: 'Build fast & search-ready',
          body: 'We build clean, fast, SEO-friendly code — so the site loads quickly and gets found.',
        },
        {
          title: 'Launch and improve',
          body: 'We launch, measure how visitors behave, and refine to lift conversion over time.',
        },
      ],
    },
    why: {
      eyebrow: 'Why Reputera',
      heading: 'More than a pretty page',
      points: [
        {
          title: 'Built to convert.',
          body: 'We design around your business goals, so your site actively brings in customers instead of just sitting there.',
        },
        {
          title: 'Fast and search-friendly.',
          body: 'Speed and SEO are built in from day one — not bolted on after launch.',
        },
        {
          title: 'Built around your brand.',
          body: 'No cookie-cutter templates — a site that looks and feels like you, not everyone else.',
        },
      ],
    },
    cta: {
      heading: 'See your site before you commit.',
      body: "Tell us what you need your website to do. We'll come back with a real, visual demo in 24–72 hours — no sales call, no commitment.",
    },
    showRelated: false,
  },
  {
    slug: 'ai-solutions',
    title: 'AI Solutions',
    heading: 'AI that does real work inside your business.',
    headingAccent: 'real work',
    metaTitle: 'AI Assistants, Agents & Chatbots for Business | Reputera',
    metaDescription:
      'Reputera builds custom AI assistants, agents, and chatbots into how your business already works — automating real tasks. See a demo in 24–72 hours.',
    tag: 'AI Solutions',
    summary:
      'AI assistants, agents, and chatbots built into how your business already operates — automating real work, not bolted on as a gimmick.',
    hub: {
      tag: 'AI',
      copy:
        "AI assistants, agents, and chatbots built into how your business already operates — automating real work, not bolted on as a gimmick.",
    },
    intro:
      'AI is only useful if it actually saves you time. Reputera builds custom AI assistants, agents, and chatbots into how your business already operates — automating the repetitive work, answering the routine questions, and handling the tasks that pull your team away from what matters. Not a gimmick bolted on the side — intelligence built into the workflow.',
    accent: 'amber',
    icon: 'spark',
    build: {
      eyebrow: 'What we build',
      heading: 'What we build',
      intro:
        'Three ways we put AI to work — each built around your actual processes, not a generic bot.',
      items: [
        {
          title: 'AI Chatbots',
          body: 'Chatbots that actually help — answering customer questions, qualifying leads, and handling support around the clock, trained on your business, not generic scripts.',
        },
        {
          title: 'AI Agents',
          body: 'Autonomous agents that carry out multi-step tasks for you — pulling information, taking actions, and moving work forward without someone driving every step.',
        },
        {
          title: 'AI Assistants',
          body: 'Internal assistants that give your team a faster way to work — searching your data, drafting, summarizing, and answering questions instantly instead of digging through systems.',
        },
        {
          title: 'AI Features in Your Software',
          body: 'We embed AI directly into your existing systems and apps — smart search, image matching, automation — wherever it saves real time.',
          href: '/services/software-development',
        },
      ],
    },
    process: {
      eyebrow: 'How we work',
      heading: "How we build AI that's actually useful",
      intro:
        "The difference between AI that helps and AI that gathers dust is whether it's built around a real problem. That's where we start.",
      steps: [
        {
          title: 'Find the real time-sink',
          body: 'We look for the repetitive, time-consuming work in your business where AI would genuinely help — not where it just looks impressive.',
        },
        {
          title: 'Design around your data & process',
          body: 'We build the AI to understand your business — your data, your rules, your tone — so its answers and actions are actually right.',
        },
        {
          title: 'Build & ground it',
          body: "We build the solution and ground it in your real information, so it's reliable instead of making things up.",
        },
        {
          title: 'Launch, monitor, improve',
          body: 'We put it to work, watch how it performs, and keep sharpening it as your business grows.',
        },
      ],
    },
    why: {
      eyebrow: 'Why Reputera',
      heading: 'AI with a purpose, not a buzzword',
      points: [
        {
          title: 'Built around a real problem.',
          body: 'We only put AI where it saves real time or money — not to tick a box.',
        },
        {
          title: 'Grounded in your business.',
          body: "Trained and grounded on your data and rules, so it's accurate and on-brand, not generic.",
        },
        {
          title: 'Built to fit your systems.',
          body: 'We build AI into the software and workflows you already use — not as one more disconnected tool.',
        },
      ],
    },
    proof: {
      eyebrow: 'Proof',
      heading: "AI we've built",
      cases: [
        {
          slug: 'footwear-manufacturing',
          title: 'AI image-matching feature inside an ERP system',
          copy: 'Automatically matching product photos to the correct catalog entries, cutting out slow manual lookup.',
          tags: ['AI', 'Software', 'ERP'],
        },
      ],
    },
    cta: {
      heading: 'See what AI could do for you.',
      body: "Tell us where your team loses the most time. We'll come back with a real, visual demo of an AI solution in 24–72 hours — no sales call, no commitment.",
    },
    showRelated: false,
  },
];

export const getService = (slug: string) => services.find((service) => service.slug === slug);

export const primaryNav: NavLink[] = [
  {
    href: '/services',
    label: 'Services',
    children: services.map((service) => ({
      href: `/services/${service.slug}`,
      label: service.title,
    })),
  },
  { href: '/portfolio', label: 'Work' },
  { href: '/reviews', label: 'Reputera Reviews' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

/** Budget bands offered in the Get a Demo form. */
export const budgetRanges = [
  'Under $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000 – $150,000',
  '$150,000+',
  'Not sure yet — advise me',
] as const;

/** Niche options in the Get a Demo form. Visitors can also type their own. */
export const niches = [
  'Healthcare & clinics',
  'Real estate & property',
  'Legal & professional services',
  'Construction & trades',
  'Logistics & transport',
  'Retail & e-commerce',
  'Restaurants & hospitality',
  'Education & training',
  'Finance & insurance',
  'Manufacturing',
  'Fitness & wellness',
  'Automotive',
  'Media & creative',
  'Non-profit',
  'SaaS & technology',
] as const;

export const buildOptions = [
  {
    value: 'website',
    label: 'A website',
    description: 'Marketing site, e-commerce or booking platform.',
  },
  {
    value: 'app',
    label: 'An app',
    description: 'iOS, Android or a progressive web app.',
  },
  {
    value: 'software',
    label: 'Custom software',
    description: 'Internal tools, platforms, portals, automation.',
  },
  {
    value: 'ai',
    label: 'AI solutions',
    description: 'Assistants, agents and chatbots on your data.',
  },
  {
    value: 'all',
    label: 'All of it',
    description: 'The full build — advise me on where to start.',
  },
] as const;
