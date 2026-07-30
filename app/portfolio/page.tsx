import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { industries } from '@/lib/industries';
import styles from './page.module.css';

export const metadata = pageMetadata({
  title: 'Work & Case Studies by Industry | Reputera',
  description:
    'Software, app and website projects Reputera has delivered, shown by industry: healthcare, real estate, logistics, professional services, retail, construction, hospitality and fitness.',
  path: '/portfolio',
});

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/portfolio' },
        ])}
      />

      <PageHero
        eyebrow="Selected work"
        title={
          <>
            The problem, the build, the <span className="text-gradient">outcome</span>.
          </>
        }
        intro="We show our work by industry rather than by client name. Most of what we build runs inside businesses that would rather not publicise their internal systems — so the story is here, and the logo is not."
        actions={[{ label: 'Get a Demo', href: '/get-a-demo' }]}
      />

      <section className="section" aria-labelledby="work-title">
        <div className="container">
          <h2 id="work-title" className="visually-hidden">
            Case studies by industry
          </h2>

          <div className={styles.list}>
            {industries.map((industry, index) => (
              <article
                key={industry.slug}
                id={industry.slug}
                className={`reveal ${styles.item}`}
                data-reveal-index={index % 3}
                aria-labelledby={`${industry.slug}-title`}
              >
                <div className={styles.itemHead}>
                  <h3 id={`${industry.slug}-title`}>{industry.name}</h3>
                  <span className="pill">{industry.discipline}</span>
                </div>

                <p className={styles.headline}>{industry.headline}</p>

                <div className={styles.body}>
                  <div>
                    <h4 className={styles.label}>The challenge</h4>
                    <p>{industry.challenge}</p>
                  </div>
                  <div>
                    <h4 className={styles.label}>What we built</h4>
                    <p>{industry.build}</p>
                  </div>
                  <div>
                    <h4 className={styles.label}>The outcome</h4>
                    <ul className={styles.outcomes}>
                      {industry.outcomes.map((outcome) => (
                        <li key={outcome}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                </div>
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
