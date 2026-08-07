import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { caseStudies } from '@/lib/industries';
import styles from './page.module.css';

export const metadata = pageMetadata({
  title: 'Portfolio | Custom Software, App & AI Projects | Reputera',
  description:
    'A sample of what Reputera has built — ERP systems, AI-powered features and field-ready apps, shown by industry rather than by client name.',
  path: '/portfolio',
});

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Portfolio', path: '/portfolio' },
        ])}
      />

      <PageHero
        eyebrow="Selected work"
        title={
          <>
            Real work, <span className="text-gradient">real businesses</span>.
          </>
        }
        intro="A sample of what we've built — shown by industry, not by name. Much of this runs inside businesses that would rather not publicise their internal systems, so the story is here and the logo is not."
        actions={[{ label: 'Start Your Demo', href: '/get-a-demo' }]}
      />

      <section className="section" aria-labelledby="work-title">
        <div className="container">
          <h2 id="work-title" className="visually-hidden">
            Case studies by industry
          </h2>

          <div className={styles.list}>
            {caseStudies.map((study, index) => (
              <article
                key={study.slug}
                id={study.slug}
                className={`reveal ${styles.item}`}
                data-reveal-index={index}
                aria-labelledby={`${study.slug}-title`}
              >
                <div className={styles.itemHead}>
                  <p className={styles.niche}>{study.niche}</p>
                  <ul className="pill-list">
                    {study.tags.map((tag) => (
                      <li key={tag}>
                        <span className="pill">{tag}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <h3 id={`${study.slug}-title`} className={styles.title}>
                  {study.title}
                </h3>
                <p className={styles.copy}>{study.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-divider" aria-labelledby="nda-title">
        <div className="container container-narrow">
          <h2 id="nda-title">Want to see something closer to your business?</h2>
          <p className="lead" style={{ marginTop: '1rem' }}>
            We can walk you through relevant work in more detail on a call — and if you would rather see
            your own idea than someone else&apos;s, the demo request is the faster route.
          </p>
        </div>
      </section>

      <CtaBand
        title="See your own idea instead."
        body="Describe what you want built and we will send back a visual demo of it within 24–72 hours — designed around your business, not adapted from someone else's."
      />
    </>
  );
}
