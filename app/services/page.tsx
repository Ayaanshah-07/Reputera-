import Link from 'next/link';
import PageHero from '@/components/PageHero';
import ServiceCard from '@/components/ServiceCard';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { services, site } from '@/lib/site';
import styles from './page.module.css';

export const metadata = pageMetadata({
  title: 'Services — Software, Apps, Websites & AI | Reputera',
  description:
    'Custom software development, mobile and web apps, website design and AI solutions — all built around your business model and workflow logic. Free visual demo in 24–72 hours.',
  path: '/services',
});

const principles = [
  {
    title: 'We start with your workflow',
    body: 'Before anything is designed we map how the work actually moves through your business — including the parts nobody documented.',
  },
  {
    title: 'We show before we build',
    body: 'A visual demo lands within 24–72 hours, so the first thing you judge is the work itself rather than a proposal.',
  },
  {
    title: 'We ship in slices',
    body: 'The highest-value part goes live first and gets used by real people. Everything after that is informed by that usage.',
  },
  {
    title: 'You own the result',
    body: 'Source code, data and infrastructure are yours, documented and handed over. No lock-in, no hostage situation.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Reputera services',
            itemListElement: services.map((service, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: service.title,
              url: `${site.url}/services/${service.slug}`,
            })),
          },
        ]}
      />

      <PageHero
        eyebrow="Services"
        title={
          <>
            Everything we build starts with <span className="text-gradient">how you work</span>.
          </>
        }
        intro="Custom software leads what we do. Apps, websites and AI extend it — designed by the same team, on the same foundations, so the pieces fit together instead of being stitched between vendors."
        actions={[
          { label: 'Get a Demo', href: '/get-a-demo' },
          { label: 'Talk to us', href: '/contact', variant: 'ghost' },
        ]}
      />

      <section className="section" aria-labelledby="all-services">
        <div className="container">
          <h2 id="all-services" className="visually-hidden">
            All services
          </h2>
          <div className="grid grid-2">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-divider" aria-labelledby="principles-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">How we work</p>
            <h2 id="principles-title">Four rules that apply to every project.</h2>
          </div>

          <div className="grid grid-2">
            {principles.map((principle, index) => (
              <article key={principle.title} className="card card-hover reveal" data-reveal-index={index}>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="combined-title">
        <div className="container">
          <div className={styles.combined}>
            <div>
              <p className="eyebrow eyebrow-amber">Not sure which you need?</p>
              <h2 id="combined-title">Most projects are more than one of these.</h2>
              <p className="lead">
                A booking platform is software, a website and an app. A support assistant is AI inside
                software you already run. Describe the outcome you want and we will tell you what it takes —
                and where to start so you see value soonest.
              </p>
              <div className="btn-row" style={{ marginTop: '1.75rem' }}>
                <Link href="/get-a-demo" className="btn btn-amber">
                  Describe your project
                </Link>
              </div>
            </div>
            <ul className={styles.exampleList}>
              <li>
                <strong>&ldquo;Customers book online, my team sees it instantly&rdquo;</strong>
                <span>Website + custom software</span>
              </li>
              <li>
                <strong>&ldquo;My field team needs it on their phones&rdquo;</strong>
                <span>App + custom software</span>
              </li>
              <li>
                <strong>&ldquo;Answer the same questions without staff time&rdquo;</strong>
                <span>AI solutions + website</span>
              </li>
              <li>
                <strong>&ldquo;Replace the spreadsheet everything depends on&rdquo;</strong>
                <span>Custom software</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
