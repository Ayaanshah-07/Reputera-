import Link from 'next/link';
import PageHero from '@/components/PageHero';
import WaitlistForm from '@/components/WaitlistForm';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema';
import { planLabel, reviewsBenefits, reviewsFeatures } from '@/lib/reviews';
import styles from './page.module.css';

export const metadata = pageMetadata({
  title: 'Reputera Reviews — Google Review Management Software',
  description:
    'Google review management software for agencies: collect reviews automatically, draft AI replies, publish to Google Business Profile, and run review invitation campaigns.',
  path: '/reviews',
});

const faqs = [
  {
    question: 'What is Reputera Reviews?',
    answer:
      'Reputera Reviews is Google review management software. It collects a business’s reviews automatically, drafts a reply to each one in that business’s brand voice for a human to approve, publishes approved replies to the Google Business Profile, and runs invitation campaigns to bring in more reviews. It is built for agencies managing reputation on behalf of local businesses.',
  },
  {
    question: 'Can one agency manage reviews for multiple businesses?',
    answer:
      'Yes — that is the point. Reviews are collected on a schedule per business, replies are drafted in each business’s own voice and language, and on Growth plans you can invite teammates and scope each one to exactly the businesses they should see. Nobody sees a client they do not work on.',
  },
  {
    question: 'Does it reply to Google reviews automatically?',
    answer:
      'It drafts the reply automatically; it does not publish automatically. Every response is written in the business’s brand voice, language and sign-off style, then waits for a human to approve it. Nothing publishes unreviewed. Approved replies post straight to the Google Business Profile through the official API.',
  },
  {
    question: 'How do review invitation campaigns work?',
    answer:
      'Upload a customer list, choose email or WhatsApp — or both — and invite past customers to leave a review. You get full funnel tracking on every campaign: sent, delivered, read and clicked. For walk-in traffic there are printable QR codes that link straight to a business’s Google review page.',
  },
  {
    question: 'What happens when a business gets a bad review?',
    answer:
      'Every review is analysed for sentiment and flagged when it needs urgent human attention, so a reputation fire never sits unnoticed. The reply is drafted for you immediately, so responding is a matter of reviewing and approving rather than starting from a blank box.',
  },
  {
    question: 'Does it work with platforms other than Google?',
    answer:
      'Google reviews are the focus for the first release, because that is where most local buying decisions are influenced. Other review platforms are on the roadmap.',
  },
  {
    question: 'When does Reputera Reviews launch, and what will it cost?',
    answer:
      'It is in active development. Waitlist members hear first and get early access in the order they joined, before any public launch. Pricing is being finalised across plan tiers — waitlist members will see it first, and the first cohort gets a founding-member rate.',
  },
  {
    question: 'How does this relate to the agency side of Reputera?',
    answer:
      'Same company, two sides. The agency builds custom software, apps and websites for clients; Reputera Reviews is our own product. If you need reputation tooling built into something bespoke instead, that is an agency project — start with a demo request.',
  },
];

export default function ReviewsPage() {
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema(),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Reputera Reviews', path: '/reviews' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Our product · Coming soon"
        title={
          <>
            Reputera <span className="text-amber">Reviews</span>
          </>
        }
        intro="Google review management software — collect reviews automatically, reply in each business’s own voice, and win more of them. Built for agencies managing reputation for local businesses. In development now."
        accent="amber"
      >
        <p className={styles.motto}>From the software we build to the reputation you keep.</p>
      </PageHero>

      {/* ------------------------------------------------------------- product */}
      <section className="section" aria-labelledby="product-title">
        <div className="container">
          <div className={styles.productHead}>
            <div>
              <p className="eyebrow eyebrow-amber">The product</p>
              <h2 id="product-title" className={`heading-fade ${styles.productTitle}`}>
                Reputation management for local businesses, sold to the agencies that serve them.
              </h2>
            </div>

            <div className={styles.productIntro}>
              <p>
                Every business lives or dies by its Google rating, and almost none of them keep up with it.
                Reputera automates the whole loop: pull the reviews in, draft intelligent replies, get them
                approved and posted, then go get <em>more</em> reviews through invitation campaigns — and
                turn the best ones into marketing assets.
              </p>
              <p>
                One dashboard covers every business on your books, so a single account manager can run
                reputation for a whole portfolio instead of logging into a dozen Google accounts by hand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ benefits */}
      <section className={styles.benefitsSection} aria-labelledby="benefits-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow eyebrow-amber">What it will do</p>
            <h2 id="benefits-title">Your review pipeline, in one place.</h2>
            <p>
              Reviews are the closest thing a local business has to a public credit score. This is the tool
              we wanted for our own clients, built properly.
            </p>
          </div>

          <div className="grid grid-2">
            {reviewsBenefits.map((benefit, index) => (
              <article key={benefit.title} className="card card-hover reveal" data-reveal-index={index}>
                <h3>{benefit.title}</h3>
                <p>{benefit.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ features */}
      <section className="section" aria-labelledby="features-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow eyebrow-amber">Everything included</p>
            <h2 id="features-title">What ships in the product.</h2>
            <p>
              Every capability below is in the build. The badge shows which plan it belongs to — almost
              everything is included at every tier.
            </p>
          </div>

          <div className="grid grid-2">
            {reviewsFeatures.map((feature, index) => (
              <article
                key={feature.title}
                className={`card card-hover reveal ${styles.feature}`}
                data-reveal-index={index % 4}
              >
                <div className={styles.featureHead}>
                  <h3>{feature.title}</h3>
                  <span className={`${styles.plan} ${feature.plan === 'growth' ? styles.planGrowth : ''}`}>
                    {planLabel[feature.plan]}
                  </span>
                </div>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>

          <p className={styles.disclaimer}>
            Reputera Reviews is in development. Features described here are planned and may change before
            release.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="waitlist-title">
        <div className="container">
          <div className={styles.waitlist}>
            <div>
              <span className="badge badge-amber">Early access</span>
              <h2 id="waitlist-title" className={`heading-fade ${styles.waitlistTitle}`}>
                Join the waitlist.
              </h2>
              <p className="muted">
                We will email you when it opens up. Early access goes out in the order people joined, with a
                founding-member rate for the first cohort.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      <Faq items={faqs} title="Reputera Reviews — questions" />

      <section className="section section-divider" aria-labelledby="agency-title">
        <div className="container container-narrow">
          <h2 id="agency-title" className="heading-fade">
            Need reputation tooling built into your own system?
          </h2>
          <p className="lead" style={{ marginTop: '1rem' }}>
            That is the agency side of Reputera. We build custom software, apps and websites around your
            exact workflow — including review capture, customer feedback loops and everything around them.
          </p>
          <div className="btn-row" style={{ marginTop: '1.75rem' }}>
            <Link href="/get-a-demo" className="btn btn-primary btn-lg">
              Get a Demo
            </Link>
            <Link href="/services/software-development" className="btn btn-ghost btn-lg">
              Software development
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
