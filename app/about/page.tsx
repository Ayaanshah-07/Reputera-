import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { site } from '@/lib/site';
import styles from './page.module.css';

export const metadata = pageMetadata({
  title: 'About Reputera — Founders, Values & How We Work',
  description:
    'Reputera builds custom software, apps, websites and AI around each client\'s workflow logic. Founded by Ayaan Shah and Shahid Khan. Where ideas earn their reputation.',
  path: '/about',
});

const founders = [
  { name: 'Ayaan Shah', role: 'Co-founder', initials: 'AS' },
  { name: 'Shahid Khan', role: 'Co-founder', initials: 'SK' },
];

const values = [
  {
    title: 'Show the work',
    body: 'A demo before a contract. It is a harder standard to hold ourselves to, and it is the fastest way for someone to know whether we are any good.',
    icon: (
      <>
        <rect x="2.5" y="4" width="19" height="13" rx="2.5" />
        <path d="M12 17v3M8.5 20h7" />
        <path d="m9.5 8.5 4.5 2.5-4.5 2.5V8.5Z" />
      </>
    ),
  },
  {
    title: 'No templates',
    body: "Reusing our own components is engineering. Reusing someone else's product and calling it custom is not. We do the former and refuse the latter.",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.6" />
        <rect x="14" y="3" width="7" height="7" rx="1.6" />
        <rect x="3" y="14" width="7" height="7" rx="1.6" />
        <path d="M14.5 17.5h6M17.5 14.5v6" />
      </>
    ),
  },
  {
    title: 'Plain language',
    body: 'You should never need a translator to understand what we are building, what it costs, or what is going wrong when something does.',
    icon: (
      <>
        <path d="M20.5 12.5a7.5 7.5 0 0 1-7.5 7.5H8l-4 3v-4.4A7.5 7.5 0 0 1 8.5 5h4.5a7.5 7.5 0 0 1 7.5 7.5Z" />
        <path d="M9 11h7M9 14.5h4.5" />
      </>
    ),
  },
  {
    title: 'Earn it every time',
    body: 'A reputation is not a launch asset, it is a running total. Every project either adds to it or takes from it — ours and yours.',
    icon: (
      <>
        <path d="M3.5 17.5 9 12l3.5 3.5L20.5 7" />
        <path d="M15.5 7h5v5" />
      </>
    ),
  },
];


export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About Reputera',
            url: `${site.url}/about`,
            mainEntity: { '@id': `${site.url}/#organization` },
          },
        ]}
      />

      <PageHero
        eyebrow="About us"
        title={
          <>
            A software company built on a <span className="text-gradient">simple promise</span>.
          </>
        }
        intro="Reputera exists because too much software is sold before it is shown. We flipped that: describe your idea and we will put a visual demo of it in front of you within 24–72 hours, then build it properly if you like what you see."
      />

      {/* ---------------------------------------------------------------- story */}
      <section className="section" aria-labelledby="story-title">
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.story}>
              <h2 id="story-title">Where ideas earn their reputation.</h2>
              <p>
                Every business we meet has a way of working that took years to settle into shape — the
                sequence, the exceptions, the judgement calls, the spreadsheet somebody built once that the
                whole operation now quietly depends on. Generic software ignores all of it and asks you to
                adapt.
              </p>
              <p>
                We build the other way round. We learn the logic first, then encode it. That is the whole
                difference between software you tolerate and software your team actually reaches for.
              </p>
              <p>
                The second half of our name is deliberate. Reputation is what a business runs on, and it is
                built from small things done properly and repeatedly. It applies to the software we hand
                over, and it applies to how we behave while building it.
              </p>
              <p className={styles.motto}>{site.supportingTagline}</p>
            </div>

            <aside className={styles.factCard} aria-label="Reputera at a glance">
              <h3>At a glance</h3>
              <dl>
                <div>
                  <dt>What we do</dt>
                  <dd>Custom software, apps, websites and AI solutions</dd>
                </div>
                <div>
                  <dt>Lead offering</dt>
                  <dd>
                    <Link href="/services/software-development">Software development</Link>
                  </dd>
                </div>
                <div>
                  <dt>How we start</dt>
                  <dd>A free visual demo within 24–72 hours</dd>
                </div>
                <div>
                  <dt>Also building</dt>
                  <dd>
                    <Link href="/reviews">Reputera Reviews</Link> — reputation management, coming soon
                  </dd>
                </div>
                <div>
                  <dt>Founded by</dt>
                  <dd>Ayaan Shah &amp; Shahid Khan</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- founders */}
      <section className="section section-divider" aria-labelledby="founders-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">The founders</p>
            <h2 id="founders-title">Two people who answer for the work.</h2>
            <p>
              Reputera is built by Ayaan Shah and Shahid Khan, who started the company to build software the
              way it should be built: shaped around how a business actually runs, and delivered by the people
              who actually build it — hands-on with every project, start to finish.
            </p>
          </div>

          <div className="grid grid-2">
            {founders.map((founder, index) => (
              <article key={founder.name} className={`card reveal ${styles.founder}`} data-reveal-index={index}>
                {/* TODO(brand): swap for a photo when available. */}
                <span className={styles.avatar} aria-hidden="true">
                  {founder.initials}
                </span>
                <div>
                  <h3>{founder.name}</h3>
                  <p className={styles.role}>{founder.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- values */}
      <section className={styles.valuesSection} aria-labelledby="values-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">What we hold to</p>
            <h2 id="values-title">Four things we will not trade away.</h2>
          </div>

          <div className={styles.values}>
            {values.map((value, index) => (
              <article
                key={value.title}
                className={`reveal ${styles.value} ${index % 2 === 1 ? styles.valueAmber : ''}`}
                data-reveal-index={index}
              >
                <span className={styles.valueNum} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className={styles.valueIcon} aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {value.icon}
                  </svg>
                </span>

                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Judge us on the work, not the pitch."
        body="Send us your idea and see what we do with it. A visual demo, in 24–72 hours, at no cost."
      />
    </>
  );
}
