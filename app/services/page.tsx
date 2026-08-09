import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
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
    'Reputera builds custom software, apps, websites, and AI solutions — all engineered around how your business runs. Explore our services and get a demo in 24–72 hrs.',
  path: '/services',
});

const process = [
  {
    step: '01',
    title: 'Understand your workflow',
    body: 'We learn how your business actually operates — the steps, the exceptions, the things no template accounts for.',
  },
  {
    step: '02',
    title: 'Map the logic',
    body: "We turn your workflow into a clear design, so you can see how it'll work before anything is built.",
  },
  {
    step: '03',
    title: 'Build around it',
    body: 'We build to match your logic — not the other way around — with you in the loop, not handed off.',
  },
  {
    step: '04',
    title: 'Fit, refine, hand over',
    body: 'We refine against real use until it feels like it was always part of your business.',
  },
];

const why = [
  {
    title: 'Built around your logic.',
    body: 'Off-the-shelf tools make you change how you work. We build around how you already do.',
  },
  {
    title: 'One team for all of it.',
    body: "Software, app, website, AI — one team who understands the whole picture, instead of four vendors who don't talk to each other.",
  },
  {
    title: 'Hands-on, start to finish.',
    body: 'You work directly with the people building it — no account manager relaying messages.',
  },
  {
    title: 'See it before you commit.',
    body: 'Our 24–72 hour demo means you see real proof before you spend anything.',
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
              item: {
                '@type': 'Service',
                name: service.title,
                serviceType: service.serviceType ?? service.title,
                description: service.hub.copy,
                url: `${site.url}/services/${service.slug}`,
                provider: { '@id': `${site.url}/#organization` },
              },
            })),
          },
        ]}
      />

      <Breadcrumbs
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
      />

      <PageHero
        eyebrow="Services"
        title={
          <>
            One team, built around <span className="text-gradient">your business</span>.
          </>
        }
        intro="Software, apps, websites, AI — most companies make you juggle a different agency for each. Reputera does all four, with one principle running through everything: we build around how your business actually works, not around a template. Whatever you need built, it starts with your logic."
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

      {/* ---------------------------------------------------- the four services */}
      <section className="section" aria-labelledby="all-services">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">The four services</p>
            <h2 id="all-services">What we build</h2>
            <p>Four services, one team, one standard — each built around your business, not off a shelf.</p>
          </div>

          <div className="grid grid-2">
            {services.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
                tag={service.hub.tag}
                body={service.hub.copy}
                linkLabel={`Explore ${service.title}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- process */}
      <section className={styles.processSection} aria-labelledby="process-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">How we work</p>
            <h2 id="process-title">One process behind everything we build</h2>
            <p>
              No matter which service you need, we build the same way — business first, code second.
              It&apos;s why what we build actually fits.
            </p>
          </div>

          <ol className={styles.process}>
            {process.map((step, index) => (
              <li key={step.step} className="reveal" data-reveal-index={index}>
                <span className={styles.processNum}>{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------------- why */}
      <section className="section" aria-labelledby="why-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Why Reputera</p>
            <h2 id="why-title">Why work with Reputera</h2>
          </div>

          <div className="grid grid-2">
            {why.map((point, index) => (
              <article key={point.title} className="card card-hover reveal" data-reveal-index={index}>
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which you need? Start with a demo."
        body="Tell us what you're trying to achieve — we'll figure out whether it's software, an app, a website, AI, or a mix, and come back with a real, visual demo in 24–72 hours. No sales call, no commitment."
      />
    </>
  );
}
