import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import ServiceIcon from '@/components/ServiceIcon';
import CtaBand from '@/components/CtaBand';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';
import { getService, services } from '@/lib/site';
import { caseStudies } from '@/lib/industries';
import styles from './page.module.css';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return pageMetadata({ title: 'Not found', description: '', path: '/services', index: false });

  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const others = services.filter((item) => item.slug !== service.slug);
  // Merge each proof case with its shared record, letting the page reframe it.
  const proofCases = (service.proof?.cases ?? []).flatMap((entry) => {
    const study = caseStudies.find((item) => item.slug === entry.slug);
    if (!study) return [];
    return [
      {
        slug: study.slug,
        niche: study.niche,
        title: entry.title ?? study.title,
        copy: entry.copy ?? study.copy,
        tags: entry.tags ?? study.tags,
      },
    ];
  });
  const amber = service.accent === 'amber';
  const eyebrowClass = `eyebrow ${amber ? 'eyebrow-amber' : ''}`;

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service),
          ...(service.faqs?.length ? [faqSchema(service.faqs)] : []),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      <Breadcrumbs
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
      />

      <PageHero
        eyebrow={service.flagship ? 'Flagship service' : 'Service'}
        title={service.heading}
        intro={service.intro}
        accent={service.accent}
        actions={[
          {
            label: (
              <>
                Start Your Demo <span aria-hidden="true">→</span>
              </>
            ),
            href: '/get-a-demo',
            variant: amber ? 'amber' : 'primary',
          },
          { label: 'All services', href: '/services', variant: 'ghost' },
        ]}
      />

      {/* ------------------------------------------------------------ what we build */}
      <section className="section" aria-labelledby="build-title">
        <div className="container">
          <div className="section-head">
            <p className={eyebrowClass}>{service.build.eyebrow}</p>
            <h2 id="build-title">{service.build.heading}</h2>
            {service.build.intro && <p>{service.build.intro}</p>}
          </div>

          <div className={service.build.items.length > 4 ? 'grid grid-3' : 'grid grid-2'}>
            {service.build.items.map((item, index) => (
              <article
                key={item.title}
                className={`card card-hover reveal ${amber ? styles.amber : ''}`}
                data-reveal-index={index}
              >
                <span className={styles.capIcon}>
                  <ServiceIcon icon={service.icon} size={20} />
                </span>
                <h3>
                  {item.href ? (
                    <Link href={item.href} className={styles.itemLink}>
                      <span className={styles.stretch} />
                      {item.title}
                    </Link>
                  ) : (
                    item.title
                  )}
                </h3>
                <p>{item.body}</p>
                {item.href && (
                  <span className={styles.itemMore} aria-hidden="true">
                    Explore →
                  </span>
                )}
                {item.links && item.links.length > 0 && (
                  <p className={styles.itemLinks}>
                    {item.links.map((link) => (
                      <Link key={link.href} href={link.href}>
                        {link.label} <span aria-hidden="true">→</span>
                      </Link>
                    ))}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- process */}
      <section className={styles.processSection} aria-labelledby="process-title">
        <div className="container">
          <div className="section-head">
            <p className={eyebrowClass}>{service.process.eyebrow}</p>
            <h2 id="process-title">{service.process.heading}</h2>
            {service.process.intro && <p>{service.process.intro}</p>}
          </div>

          <ol className={styles.process}>
            {service.process.steps.map((step, index) => (
              <li key={step.title} className="reveal" data-reveal-index={index}>
                <span className={styles.processNum}>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------------- why */}
      {service.why && (
        <section className="section" aria-labelledby="why-title">
          <div className="container">
            <div className="section-head">
              <p className={eyebrowClass}>{service.why.eyebrow}</p>
              <h2 id="why-title">{service.why.heading}</h2>
            </div>

            <div className="grid grid-3">
              {service.why.points.map((point, index) => (
                <article key={point.title} className="card card-hover reveal" data-reveal-index={index}>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ----------------------------------------------------------------- proof */}
      {service.proof && proofCases.length > 0 && (
        <section className="section section-divider" aria-labelledby="proof-title">
          <div className="container">
            <div className="section-head">
              <p className={eyebrowClass}>{service.proof.eyebrow}</p>
              <h2 id="proof-title">{service.proof.heading}</h2>
            </div>

            <div className={`grid grid-2 ${proofCases.length === 1 ? styles.singleCase : ''}`}>
              {proofCases.map((study, index) => (
                <article key={study.slug} className={`card reveal ${styles.case}`} data-reveal-index={index}>
                  <p className={styles.caseNiche}>{study.niche}</p>
                  <h3>{study.title}</h3>
                  <p>{study.copy}</p>
                  <ul className="pill-list">
                    {study.tags.map((tag) => (
                      <li key={tag}>
                        <span className="pill">{tag}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="btn-row" style={{ marginTop: '2rem' }}>
              <Link href="/portfolio" className="btn btn-ghost">
                See more of our work <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ----------------------------------------------------------------- stack */}
      {service.stack && service.stack.length > 0 && (
        <section className="section section-tight" aria-labelledby="stack-title">
          <div className="container">
            <div className={styles.stackRow}>
              <div>
                <h2 id="stack-title" className={styles.stackTitle}>
                  What we build it with
                </h2>
                <p className="muted">
                  Chosen per project for fit and longevity — never because it is what we happen to have lying
                  around.
                </p>
              </div>
              <ul className="pill-list">
                {service.stack.map((item) => (
                  <li key={item}>
                    <span className="pill">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {service.faqs && service.faqs.length > 0 && (
        <Faq items={service.faqs} title={`${service.title} — common questions`} />
      )}

      {/* ---------------------------------------------------------------- others */}
      {service.showRelated !== false && (
        <section className="section section-divider" aria-labelledby="related-title">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Also from Reputera</p>
              <h2 id="related-title">The rest of what we build.</h2>
            </div>
            <ul className={styles.related}>
              {others.map((other) => (
                <li key={other.slug}>
                  <Link href={`/services/${other.slug}`} className={styles.relatedLink}>
                    <span className={styles.relatedIcon}>
                      <ServiceIcon icon={other.icon} size={18} />
                    </span>
                    <span>
                      <strong>{other.title}</strong>
                      <em>{other.summary}</em>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        title={service.cta?.heading ?? `Want to see your ${service.title.toLowerCase()} idea as a demo?`}
        body={
          service.cta?.body ??
          'Describe it in the form and we send back real designed screens within 24–72 hours. Free, and yours whether or not we build it.'
        }
        primaryLabel="Start Your Demo"
      />
    </>
  );
}
