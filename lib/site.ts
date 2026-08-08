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
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://reputera.com').replace(/\/$/, ''),
  email: 'hello@reputera.com',
  phone: '+1 (000) 000-0000',
  locale: 'en_US',
  twitter: '@reputera',
} as const;

export type NavLink = {
  href: string;
  label: string;
  children?: NavLink[];
};

/** A titled block of copy. `href` turns the title into an internal link. */
export type ServiceItem = { title: string; body: string; href?: string };

export type Service = {
  slug: string;
  /** Short label used in nav and cards. */
  title: string;
  /** H1 on the service page. */
  heading: string;
  metaTitle: string;
  metaDescription: string;
  /** Small label shown on the service card. */
  tag: string;
  /** Card copy, also used in schema. Leads with the target keyword. */
  summary: string;
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
  /** Optional proof section. Case studies are referenced by slug. */
  proof?: { eyebrow: string; heading: string; caseSlugs: string[] };
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
    heading: 'Custom software, built around your business — not a template.',
    metaTitle: 'Custom Software Development Company | Reputera',
    metaDescription:
      'Reputera builds custom software around your exact business logic — ERP systems, internal tools, workflow automation, and AI features. See a demo in 24–72 hrs.',
    tag: 'Lead offering',
    summary:
      'Custom software mapped to how your business actually runs — ERP systems, internal tools, and workflow automation, including AI-powered features. We build the system around your logic, so it fits like it was always yours.',
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
      caseSlugs: ['footwear-manufacturing'],
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
    heading: 'Mobile & Web App Development',
    metaTitle: 'Mobile & Web App Development | Reputera',
    metaDescription:
      'iOS, Android and web apps designed around your users and your business logic. Native-feeling, fast, and built to ship. Get a visual demo in 24–72 hours.',
    tag: 'Mobile & web',
    summary:
      "Custom apps that put your workflow in your team's or customers' pocket — built for how they'll actually use it, not a generic shell forced to fit.",
    intro:
      'An app earns its place on someone\'s home screen or it gets deleted. We design for the two or three things your users genuinely need to do, make those effortless, and build the rest of the business logic in behind them.',
    accent: 'amber',
    icon: 'mobile',
    build: {
      eyebrow: 'What we deliver',
      heading: 'App Development, in practice.',
      items: [
        {
          title: 'iOS & Android apps',
          body: 'One codebase, native feel on both platforms — with the platform conventions users expect, not a website in a wrapper.',
        },
        {
          title: 'Progressive web apps',
          body: 'Installable, offline-capable apps that skip the app stores entirely when that is the faster route to your users.',
        },
        {
          title: 'Customer & field-team apps',
          body: 'Booking, ordering, tracking, job sheets, inspections and proof-of-work capture — built for real conditions and bad signal.',
        },
        {
          title: 'Backends & APIs',
          body: 'Authentication, payments, push notifications, sync and reporting — the unglamorous half that decides whether an app holds up.',
        },
        {
          title: 'Store launch & release',
          body: 'App Store and Play Store submission, review handling, staged rollouts and the release pipeline behind them.',
        },
        {
          title: 'Post-launch iteration',
          body: 'Analytics on what users actually tap, then focused releases that improve the numbers that matter to you.',
        },
      ],
    },
    process: {
      eyebrow: 'How it runs',
      heading: 'From first conversation to something you can use.',
      steps: [
        {
          title: 'Define the core job',
          body: 'We identify the handful of actions the app exists to make effortless, and ruthlessly protect them from feature creep.',
        },
        {
          title: 'Visual demo',
          body: 'Real screens within 24–72 hours — the flow, the interface, the feel — before a line of production code is written.',
        },
        {
          title: 'Build & test on real devices',
          body: 'Tested on real hardware and real networks, not just a simulator on a fast connection.',
        },
        {
          title: 'Launch & improve',
          body: 'We handle the store submissions, then keep shipping against what the usage data tells us.',
        },
      ],
    },
    stack: ['React Native', 'Expo', 'Swift', 'Kotlin', 'TypeScript', 'Node.js', 'Firebase', 'PostgreSQL'],
    faqs: [
      {
        question: 'Do you build for both iOS and Android?',
        answer:
          'Yes. We usually build both from a single codebase so features and fixes land on both platforms at once, and go fully native when a specific requirement genuinely calls for it.',
      },
      {
        question: 'Can you take over an existing app?',
        answer:
          'Often, yes. We start with an audit of the code, dependencies and release setup, then give you a straight answer on whether to continue it or rebuild.',
      },
      {
        question: 'Do you handle App Store and Play Store submission?',
        answer:
          'We do — including store listings, review responses and staged rollouts, so launch day is not the day you discover the process.',
      },
    ],
  },
  {
    slug: 'website-development',
    title: 'Website Development',
    heading: 'Website Design & Development',
    metaTitle: 'Website Design & Development | Reputera',
    metaDescription:
      'Fast, SEO-ready websites built to convert — custom design, semantic markup, Core Web Vitals in the green. Get a visual demo in 24–72 hours.',
    tag: 'Web',
    summary:
      'Fast, sharp, search-friendly websites built to convert — the front door to everything else Reputera builds for you.',
    intro:
      'Your website is usually the first thing anyone checks before deciding whether to trust you. We build sites that load fast, read clearly, rank well and turn visitors into enquiries — designed for your business rather than dropped onto a theme.',
    accent: 'cyan',
    icon: 'globe',
    build: {
      eyebrow: 'What we deliver',
      heading: 'Website Development, in practice.',
      items: [
        {
          title: 'Marketing & brand sites',
          body: 'Custom design and copy structure that says what you do in seconds and gives people an obvious next step.',
        },
        {
          title: 'Technical SEO foundations',
          body: 'Semantic HTML, correct heading hierarchy, metadata, sitemaps, structured data and internal linking done properly from day one.',
        },
        {
          title: 'Performance engineering',
          body: 'Core Web Vitals in the green — because a slow site quietly loses both rankings and enquiries.',
        },
        {
          title: 'E-commerce & booking',
          body: 'Storefronts, checkouts, booking flows and payment integration built to reduce drop-off at each step.',
        },
        {
          title: 'Content management',
          body: 'Edit your own pages without breaking the design or calling us — a CMS scoped to what you actually need to change.',
        },
        {
          title: 'Analytics & conversion tracking',
          body: 'Know where enquiries come from and which pages earn them, with tracking configured to answer real questions.',
        },
      ],
    },
    process: {
      eyebrow: 'How it runs',
      heading: 'From first conversation to something you can use.',
      steps: [
        {
          title: 'Positioning & structure',
          body: 'We work out what the site has to prove, to whom, and in what order — then map pages to that.',
        },
        {
          title: 'Visual demo',
          body: 'A designed page in your brand within 24–72 hours, so the direction is settled before the build starts.',
        },
        {
          title: 'Build & optimise',
          body: 'Responsive build, accessibility checks, performance budgets and technical SEO baked in as we go.',
        },
        {
          title: 'Launch & grow',
          body: 'Clean launch with redirects and tracking in place, then ongoing improvements based on real search and conversion data.',
        },
      ],
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Headless CMS', 'Vercel', 'Cloudflare', 'Core Web Vitals'],
    faqs: [
      {
        question: 'Will I be able to edit the website myself?',
        answer:
          'Yes. We connect a CMS scoped to the parts you should be changing — copy, images, posts, listings — while the design system stays protected from accidental breakage.',
      },
      {
        question: 'Is SEO included?',
        answer:
          'The technical foundations are: semantic markup, heading hierarchy, metadata, structured data, sitemaps, performance and internal linking. Ongoing content and campaign work is a separate conversation.',
      },
      {
        question: 'Can you redesign an existing site without losing rankings?',
        answer:
          'Yes. We map existing URLs, preserve or redirect them, keep the content that already earns traffic, and monitor rankings through the transition.',
      },
    ],
  },
  {
    slug: 'ai-solutions',
    title: 'AI Solutions',
    heading: 'AI Assistants, Agents & Chatbots',
    metaTitle: 'AI Solutions: Assistants, Agents & Chatbots | Reputera',
    metaDescription:
      'AI assistants, autonomous agents and chatbots trained on your business — grounded in your data, wired into your systems. Get a visual demo in 24–72 hours.',
    tag: 'AI Solutions',
    summary:
      'AI assistants, agents, and chatbots built into how your business already operates — automating real work, not bolted on as a gimmick.',
    intro:
      'AI is only useful when it knows your business. We build assistants, agents and chatbots grounded in your documents, your data and your rules — connected to the systems where the work actually happens, with limits on what they are allowed to do.',
    accent: 'amber',
    icon: 'spark',
    build: {
      eyebrow: 'What we deliver',
      heading: 'AI Solutions, in practice.',
      items: [
        {
          title: 'AI assistants',
          body: 'An assistant your team can ask about your own policies, contracts, inventory or history — answering from your data, with sources.',
        },
        {
          title: 'AI agents',
          body: 'Agents that carry out multi-step work — triage, research, drafting, data entry, follow-up — inside guardrails you define.',
        },
        {
          title: 'AI chatbots',
          body: 'Customer-facing chat that qualifies enquiries, answers accurately and hands over to a human at the right moment.',
        },
        {
          title: 'Document & data intelligence',
          body: 'Turn invoices, forms, emails and PDFs into structured data your systems can actually use.',
        },
        {
          title: 'AI inside your software',
          body: 'Embedded directly into the product we build for you, rather than bolted on as a separate tool nobody opens.',
        },
        {
          title: 'Evaluation & guardrails',
          body: 'Accuracy testing, escalation paths, permissions and audit trails — so you can trust what it does unsupervised.',
        },
      ],
    },
    process: {
      eyebrow: 'How it runs',
      heading: 'From first conversation to something you can use.',
      steps: [
        {
          title: 'Find the right use case',
          body: 'We look for the repetitive, high-volume, judgement-light work where AI pays off — and say so when a simpler tool would win.',
        },
        {
          title: 'Visual demo',
          body: 'Within 24–72 hours you see the assistant or agent working on a slice of your real material, not a generic canned demo.',
        },
        {
          title: 'Ground it in your data',
          body: 'We connect your documents and systems, then tune retrieval and prompting until the answers hold up under scrutiny.',
        },
        {
          title: 'Measure & tighten',
          body: 'Accuracy tracked against real cases, with guardrails and escalation adjusted before scope widens.',
        },
      ],
    },
    stack: ['Claude', 'OpenAI', 'RAG', 'Vector search', 'Python', 'TypeScript', 'MCP', 'Evals'],
    faqs: [
      {
        question: 'Will the AI make things up?',
        answer:
          'We ground responses in your own approved sources, cite where answers come from, constrain what the model is allowed to assert, and test accuracy against real cases before anything goes live.',
      },
      {
        question: 'Is our data used to train public models?',
        answer:
          'No. We use enterprise API configurations where your data is not used for training, and we agree data handling and retention with you in writing before any integration.',
      },
      {
        question: 'What is the difference between an assistant, an agent and a chatbot?',
        answer:
          'An assistant answers questions from your knowledge on request. An agent takes actions across several steps to complete a task. A chatbot is the conversational front door, usually for customers. Many builds combine all three.',
      },
    ],
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
