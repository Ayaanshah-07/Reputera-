import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import ServiceIcon from '@/components/ServiceIcon';
import CtaBand from '@/components/CtaBand';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';
import { getService, services } from '@/lib/site';
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

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service),
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <div className="container">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li aria-current="page">{service.title}</li>
          </ol>
        </div>
      </nav>

      <PageHero
        eyebrow={service.flagship ? 'Flagship service' : 'Service'}
        title={service.heading}
        intro={service.intro}
        accent={service.accent}
        actions={[
          { label: 'Get a Demo', href: '/get-a-demo', variant: service.accent === 'amber' ? 'amber' : 'primary' },
          { label: 'All services', href: '/services', variant: 'ghost' },
        ]}
      />

      {/* ---------------------------------------------------------- capabilities */}
      <section className="section" aria-labelledby="capabilities-title">
        <div className="container">
          <div className="section-head">
            <p className={`eyebrow ${service.accent === 'amber' ? 'eyebrow-amber' : ''}`}>What we deliver</p>
            <h2 id="capabilities-title">{service.title}, in practice.</h2>
          </div>

          <div className="grid grid-3">
            {service.capabilities.map((capability, index) => (
              <article
                key={capability.title}
                className={`card card-hover reveal ${service.accent === 'amber' ? styles.amber : ''}`}
                data-reveal-index={index}
              >
                <span className={styles.capIcon}>
                  <ServiceIcon icon={service.icon} size={20} />
                </span>
                <h3>{capability.title}</h3>
                <p>{capability.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- process */}
      <section className={styles.processSection} aria-labelledby="process-title">
        <div className="container">
          <div className="section-head">
            <p className={`eyebrow ${service.accent === 'amber' ? 'eyebrow-amber' : ''}`}>How it runs</p>
            <h2 id="process-title">From first conversation to something you can use.</h2>
          </div>

          <ol className={styles.process}>
            {service.process.map((step, index) => (
              <li key={step.title} className="reveal" data-reveal-index={index}>
                <span className={styles.processNum}>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ----------------------------------------------------------------- stack */}
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

      <Faq items={service.faqs} title={`${service.title} — common questions`} />

      {/* ---------------------------------------------------------------- others */}
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

      <CtaBand
        title={`Want to see your ${service.title.toLowerCase()} idea as a demo?`}
        body="Describe it in the form and we send back real designed screens within 24–72 hours. Free, and yours whether or not we build it."
      />
    </>
  );
}
