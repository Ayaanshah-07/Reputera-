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
    'Reputera builds custom software, apps and websites shaped around your exact business model and workflow logic — never templated. Get a visual demo in 24–72 hours.',
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

export type Service = {
  slug: string;
  /** Short label used in nav and cards. */
  title: string;
  /** H1 on the service page. */
  heading: string;
  metaTitle: string;
  metaDescription: string;
  /** One-line summary used on cards and in schema. */
  summary: string;
  /** Lead paragraph on the service page. */
  intro: string;
  accent: 'cyan' | 'amber';
  icon: 'code' | 'mobile' | 'globe' | 'spark';
  /** Marked as the flagship offering — gets visual priority everywhere. */
  flagship?: boolean;
  capabilities: { title: string; body: string }[];
  process: { title: string; body: string }[];
  stack: string[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: 'software-development',
    title: 'Software Development',
    heading: 'Custom Software Development',
    metaTitle: 'Custom Software Development | Reputera',
    metaDescription:
      'Custom software built around your exact business model and workflow logic — internal tools, platforms, dashboards, automations and AI features. Get a visual demo in 24–72 hours.',
    summary:
      'Systems built around your workflow logic — internal tools, platforms, portals and automations that fit how your business actually runs.',
    intro:
      'Most software asks your business to change shape to fit it. We do the opposite. We map how your operation actually runs — the approvals, the exceptions, the spreadsheet everybody secretly relies on — and build software around that logic. No templates, no forcing your process into someone else\'s product.',
    accent: 'cyan',
    icon: 'code',
    flagship: true,
    capabilities: [
      {
        title: 'Internal tools & operations platforms',
        body: 'Replace the spreadsheet-and-inbox stack with one system that mirrors your real workflow, roles and approval chains.',
      },
      {
        title: 'Customer portals & dashboards',
        body: 'Give clients a branded place to track orders, jobs, documents and progress — with the reporting your team needs behind it.',
      },
      {
        title: 'Workflow automation',
        body: 'Remove the repeat manual steps: routing, scheduling, notifications, document generation, reconciliation and handoffs.',
      },
      {
        title: 'Integrations & data plumbing',
        body: 'Connect the tools you already pay for — CRM, accounting, payments, logistics, calendars — so data stops being re-typed.',
      },
      {
        title: 'AI features, built in',
        body: 'Assistants, agents and chatbots embedded directly into your software, working on your data. See AI Solutions for the full picture.',
      },
      {
        title: 'Rebuilds & rescues',
        body: 'Inherited a system nobody can maintain? We map it, stabilise it and rebuild it on foundations your team can actually own.',
      },
    ],
    process: [
      {
        title: 'Workflow mapping',
        body: 'We sit with the people doing the work and document the real process — including the parts that never made it into the SOP.',
      },
      {
        title: 'Visual demo',
        body: 'Within 24–72 hours of your brief you get a visual demo of the interface, so you are reacting to something real instead of a proposal.',
      },
      {
        title: 'Build in slices',
        body: 'We ship the highest-leverage slice first and put it in front of real users, then layer on the rest with feedback already priced in.',
      },
      {
        title: 'Handover & support',
        body: 'Documented, tested and yours. We stay on for support and iteration for as long as it is useful to you.',
      },
    ],
    stack: ['TypeScript', 'Node.js', 'React', 'Next.js', 'PostgreSQL', 'Python', 'AWS', 'Docker'],
    faqs: [
      {
        question: 'How is custom software different from off-the-shelf tools?',
        answer:
          'Off-the-shelf software gives you someone else\'s process and asks you to adapt. Custom software encodes your process — your rules, your terminology, your exceptions — so the tool matches the way your team already thinks and works.',
      },
      {
        question: 'How long does a custom software build take?',
        answer:
          'You see a visual demo within 24–72 hours. A focused first release typically lands in weeks rather than months, because we ship the highest-value slice first and build outward from real usage.',
      },
      {
        question: 'Do we own the code?',
        answer:
          'Yes. You own the source code, the data and the infrastructure. Everything is documented and handed over so you are never locked in.',
      },
    ],
  },
  {
    slug: 'app-development',
    title: 'App Development',
    heading: 'Mobile & Web App Development',
    metaTitle: 'Mobile & Web App Development | Reputera',
    metaDescription:
      'iOS, Android and web apps designed around your users and your business logic. Native-feeling, fast, and built to ship. Get a visual demo in 24–72 hours.',
    summary:
      'iOS, Android and web apps that feel native, load fast and are built around what your users actually do.',
    intro:
      'An app earns its place on someone\'s home screen or it gets deleted. We design for the two or three things your users genuinely need to do, make those effortless, and build the rest of the business logic in behind them.',
    accent: 'amber',
    icon: 'mobile',
    capabilities: [
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
    process: [
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
    summary:
      'Fast, search-ready sites built to convert — custom design, clean markup and performance that holds up on a phone.',
    intro:
      'Your website is usually the first thing anyone checks before deciding whether to trust you. We build sites that load fast, read clearly, rank well and turn visitors into enquiries — designed for your business rather than dropped onto a theme.',
    accent: 'cyan',
    icon: 'globe',
    capabilities: [
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
    process: [
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
    summary:
      'AI assistants, agents and chatbots grounded in your own data and wired into the systems you already use.',
    intro:
      'AI is only useful when it knows your business. We build assistants, agents and chatbots grounded in your documents, your data and your rules — connected to the systems where the work actually happens, with limits on what they are allowed to do.',
    accent: 'amber',
    icon: 'spark',
    capabilities: [
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
    process: [
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
