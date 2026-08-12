import Link from 'next/link';
import PageHero from '@/components/PageHero';
import WaitlistForm from '@/components/WaitlistForm';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema';
import { planLabel, reviewsFeatures } from '@/lib/reviews';
import styles from './page.module.css';

export const metadata = pageMetadata({
  title: 'Reputera Reviews — Google Review Management Software (Coming Soon)',
  description:
    'Reputera Reviews is a subscription tool for collecting, monitoring and responding to Google reviews. Currently in development — join the waitlist for early access.',
  path: '/reviews',
});


const faqs = [
  {
    question: 'When does Reputera Reviews launch?',
    answer:
      'It is in active development. Waitlist members hear first and get early access in the order they joined, before any public launch.',
  },
  {
    question: 'What will it cost?',
    answer:
      'It will be a subscription, priced for small and mid-sized businesses. Pricing is being finalised — waitlist members will see it first and early access will carry a founding-member rate.',
  },
  {
    question: 'Does it work with platforms other than Google?',
    answer:
      'Google reviews are the focus for the first release, because that is where most local buying decisions are influenced. Other platforms are on the roadmap.',
  },
  {
    question: 'How does this relate to the agency side of Reputera?',
    answer:
      'Same company, same standard, two sides. The agency builds custom software for clients; Reputera Reviews is our own product. If you need reputation tooling built into something bespoke, that is an agency project — start with a demo request.',
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
        intro="A subscription tool for managing your Google reviews — collect more of them, catch new ones as they land, and reply without living in your inbox. In development now."
        accent="amber"
      >
        <p className={styles.motto}>From the software we build to the reputation you keep.</p>
      </PageHero>

      <section className="section" aria-labelledby="features-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow eyebrow-amber">The product</p>
            <h2 id="features-title">
              Reputation management for local businesses, sold to the agencies that serve them.
            </h2>
            <p>
              Every business lives or dies by its Google rating, and almost none of them keep up with it.
              Reputera automates the whole loop: pull the reviews in, draft intelligent replies, get them
              approved and posted, then go get <em>more</em> reviews through invitation campaigns — and turn
              the best ones into marketing assets.
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
                  <span
                    className={`${styles.plan} ${feature.plan === 'growth' ? styles.planGrowth : ''}`}
                  >
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
          <h2 id="agency-title" className="heading-fade">Need reputation tooling built into your own system?</h2>
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
