import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { site } from '@/lib/site';
import styles from './page.module.css';

export const metadata = pageMetadata({
  title: 'About Reputera — Software Built Around Your Business',
  description:
    'Reputera is a software studio founded by Ayaan Shah, building custom software, apps, websites, and AI around how each business actually works.',
  path: '/about',
});

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
            Software, built around <span className="text-gradient">your business</span>.
          </>
        }
        intro="Reputera was founded by Ayaan Shah on a simple belief: software should fit the business, not the other way around."
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

      {/* ---------------------------------------------------------------- story */}
      <section className="section" aria-labelledby="story-title">
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.story}>
              <h2 id="story-title">Where ideas earn their reputation.</h2>
              <p>
                Too many companies are forced to bend their process around rigid, off-the-shelf tools.
                Reputera exists to flip that — building custom software, apps, websites, and AI around how
                each business actually runs, and staying hands-on with every project from first idea to
                final handover.
              </p>
              <p>
                No layers, no account managers relaying messages — you work directly with the person
                building your solution.
              </p>

              <div className={styles.founderRow}>
                {/* TODO(brand): swap the initials disc for a photo when available. */}
                <span className={styles.avatar} aria-hidden="true">
                  AS
                </span>
                <span>
                  <strong>Ayaan Shah</strong>
                  <em>Founder</em>
                </span>
              </div>

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
                  <dt>Founder</dt>
                  <dd>Ayaan Shah</dd>
                </div>
              </dl>
            </aside>
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
