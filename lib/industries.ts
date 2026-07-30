/**
 * Case studies are presented by industry rather than by client name — most of
 * this work runs inside businesses that would rather not publicise their
 * internal systems.
 */

export type Industry = {
  slug: string;
  name: string;
  /** One-line hook used on cards. */
  headline: string;
  discipline: string;
  challenge: string;
  build: string;
  outcomes: string[];
};

export const industries: Industry[] = [
  {
    slug: 'healthcare-clinics',
    name: 'Healthcare & clinics',
    headline: 'Scheduling and records that follow clinic rules, not generic templates.',
    discipline: 'Custom software · Web app',
    challenge:
      'A multi-site clinic ran bookings across three calendars, a spreadsheet of clinician availability and a phone line. Double-bookings were routine and nobody could see capacity across sites.',
    build:
      'A single scheduling and patient-record platform encoding their real rules: room and equipment constraints, clinician specialisms, buffer times, and a recall workflow for follow-up appointments.',
    outcomes: [
      'One live view of capacity across every site',
      'Double-bookings designed out rather than caught later',
      'Automated recalls replacing a manual call list',
    ],
  },
  {
    slug: 'real-estate-property',
    name: 'Real estate & property',
    headline: 'A portal that turned a mailbox full of updates into one live view.',
    discipline: 'Custom software · Client portal',
    challenge:
      'A property firm updated owners by individual email — maintenance, tenancy, payments. Owners asked the same questions constantly and staff time disappeared into replies.',
    build:
      'A branded owner portal with live property status, document vault, maintenance tickets and statements, plus an internal dashboard that reflected how their managers actually divide portfolios.',
    outcomes: [
      'Routine owner questions answered without staff involvement',
      'Maintenance requests tracked instead of buried in threads',
      'Statements and documents in one permanent place',
    ],
  },
  {
    slug: 'logistics-transport',
    name: 'Logistics & transport',
    headline: 'Dispatch, proof of delivery and tracking built for bad signal.',
    discipline: 'App development · Custom software',
    challenge:
      'Drivers captured proof of delivery on paper and photographed it later. Dispatch could not answer "where is it?" without ringing round.',
    build:
      'A driver app that works offline and syncs when signal returns, paired with a dispatch board showing live job state, plus customer-facing tracking links.',
    outcomes: [
      'Proof of delivery captured at the door, not in the depot',
      'Dispatch answering location questions from the screen',
      'Disputes settled with timestamped evidence',
    ],
  },
  {
    slug: 'professional-services',
    name: 'Legal & professional services',
    headline: 'An AI assistant that answers from the firm\'s own documents.',
    discipline: 'AI solutions · Custom software',
    challenge:
      'Fee earners lost hours searching precedent documents, past matters and internal policy across shared drives with inconsistent naming.',
    build:
      'An AI assistant grounded strictly in the firm\'s own document set, returning answers with citations back to the source file, with permissions mirroring existing matter-level access.',
    outcomes: [
      'Answers with a citation trail, not unsourced summaries',
      'Access controls respected at the document level',
      'Search time reduced to a question and an answer',
    ],
  },
  {
    slug: 'retail-ecommerce',
    name: 'Retail & e-commerce',
    headline: 'A storefront rebuilt around the checkout that was leaking sales.',
    discipline: 'Website development',
    challenge:
      'A retailer\'s themed store loaded slowly on mobile, and the checkout added steps that had nothing to do with how their customers buy.',
    build:
      'A custom storefront with a rebuilt product and checkout flow, performance budgets enforced on every release, and technical SEO reworked from the URL structure up.',
    outcomes: [
      'Core Web Vitals in the green on mobile',
      'Fewer steps between product page and payment',
      'Category pages structured for search intent',
    ],
  },
  {
    slug: 'construction-trades',
    name: 'Construction & trades',
    headline: 'Quotes, job sheets and site photos in one chain instead of four apps.',
    discipline: 'Custom software · App development',
    challenge:
      'Quoting happened in a spreadsheet, jobs in a calendar, site photos in a phone gallery and invoices somewhere else. Nothing reconciled at the end of a job.',
    build:
      'One system running quote → job → site record → invoice, with a field app for teams on site capturing photos and sign-off against the job it belongs to.',
    outcomes: [
      'Every job traceable from quote to invoice',
      'Site evidence attached to the right job automatically',
      'Variations captured when they happen, not at billing',
    ],
  },
  {
    slug: 'hospitality',
    name: 'Restaurants & hospitality',
    headline: 'Bookings, covers and reviews on one screen for the floor manager.',
    discipline: 'Website development · Custom software',
    challenge:
      'Reservations arrived from three platforms and the phone, with no single view of covers. Review responses were an afterthought.',
    build:
      'A booking layer consolidating every channel into one floor view, plus a website rebuilt around reservations, and review monitoring feeding the same dashboard.',
    outcomes: [
      'One reservation view across every channel',
      'Covers forecast rather than guessed',
      'Reviews surfaced the day they land',
    ],
  },
  {
    slug: 'fitness-wellness',
    name: 'Fitness & wellness',
    headline: 'A member app that made memberships worth keeping.',
    discipline: 'App development',
    challenge:
      'A studio group relied on a generic booking platform members disliked, with no visibility into who was drifting toward cancellation.',
    build:
      'A branded member app for class booking, waitlists, streaks and progress, plus an operator dashboard flagging attendance patterns that precede churn.',
    outcomes: [
      'Booking and waitlists in a branded experience',
      'At-risk members flagged before they cancel',
      'Class demand data guiding the timetable',
    ],
  },
];

export const getIndustry = (slug: string) => industries.find((industry) => industry.slug === slug);
