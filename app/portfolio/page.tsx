import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import CaseVisual from '@/components/CaseVisual';
import OutcomeIcon from '@/components/OutcomeIcon';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { workSections } from '@/lib/work';
import { caseStudies } from '@/lib/industries';
import { site } from '@/lib/site';
import styles from './page.module.css';

export const metadata = pageMetadata({
  title: 'Our Work — What We Build & What It Achieves | Reputera',
  description:
    'See what Reputera builds and the results it drives — custom software, apps, websites, and AI that save time, cut costs, and grow businesses.',
  path: '/portfolio',
});

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/portfolio' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Reputera work',
            url: `${site.url}/portfolio`,
            description:
              'What Reputera builds and the results it drives — custom software, apps, websites, and AI.',
            isPartOf: { '@id': `${site.url}/#website` },
            hasPart: caseStudies.map((study) => ({
              '@type': 'CreativeWork',
              name: study.title,
              description: study.copy,
              about: study.niche,
              keywords: study.tags.join(', '),
              creator: { '@id': `${site.url}/#organization` },
            })),
          },
        ]}
      />

      <Breadcrumbs
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/portfolio' },
        ]}
      />

      <PageHero
        eyebrow="Our work"
        title={
          <>
            Work that earns its place in a <span className="text-gradient">business</span>.
          </>
        }
        intro="We don't build software to sit in a portfolio — we build it to do a job. Here's what each kind of build actually achieves for the businesses we work with, and a look at some of the real projects behind it."
        actions={[
          {
            label: (
              <>
                Start Your Demo <span aria-hidden="true">→</span>
              </>
            ),
            href: '/get-a-demo',
          },
        ]}
      />

      {workSections.map((section, sectionIndex) => (
        <section
          key={section.id}
          id={section.id}
          className={`${styles.section} ${sectionIndex % 2 === 1 ? styles.sectionAlt : ''}`}
          aria-labelledby={`${section.id}-title`}
        >
          <div className="container">
            <div className="section-head">
              <p className={`eyebrow ${section.accent === 'amber' ? 'eyebrow-amber' : ''}`}>
                {section.eyebrow}
              </p>
              <h2 id={`${section.id}-title`}>{section.heading}</h2>
              <p>{section.intro}</p>
            </div>

            <ul className={`${styles.outcomes} ${section.accent === 'amber' ? styles.amber : ''}`}>
              {section.outcomes.map((outcome, index) => (
                <li key={outcome.title} className="reveal" data-reveal-index={index}>
                  <span className={styles.outcomeIcon}>
                    <OutcomeIcon name={outcome.icon} />
                  </span>
                  <div>
                    <strong>{outcome.title}</strong>
                    <span className={styles.outcomeBody}>{outcome.body}</span>
                  </div>
                </li>
              ))}
            </ul>

            {section.proof && (
              <article className={`reveal ${styles.proof} ${section.accent === 'amber' ? styles.amber : ''}`}>
                <div className={styles.proofVisual}>
                  <CaseVisual slug={section.proof.caseSlug} />
                </div>
                <div className={styles.proofCopy}>
                  <p className={styles.proofLabel}>Proof · {section.proof.niche}</p>
                  <h3>{section.proof.title}</h3>
                  <p>{section.proof.copy}</p>
                  <ul className="pill-list">
                    {section.proof.tags.map((tag) => (
                      <li key={tag}>
                        <span className="pill">{tag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )}

            {section.note && <p className={styles.note}>{section.note}</p>}

            <div className={`btn-row ${styles.sectionCta}`}>
              <Link href={section.service.href} className="btn btn-ghost">
                Explore {section.service.label} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      ))}

      <CtaBand
        title="Let's build something that earns its place."
        body="Tell us what you're trying to achieve. We'll come back with a real, visual demo in 24–72 hours — proof, before you commit to anything."
      />
    </>
  );
}
