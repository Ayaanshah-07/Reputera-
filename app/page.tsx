import Link from 'next/link';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import CaseVisual from '@/components/CaseVisual';
import DemoVisual from '@/components/DemoVisual';
import ReviewsVisual from '@/components/ReviewsVisual';
import { pageMetadata } from '@/lib/seo';
import { services } from '@/lib/site';
import { caseStudies } from '@/lib/industries';
import styles from './page.module.css';

export const metadata = pageMetadata({
  title: 'Reputera | Custom Software, App & AI Development',
  description:
    'Reputera builds custom software, apps, websites, and AI solutions engineered around how your business actually runs. Get a working demo in 24–72 hours.',
  path: '/',
  ogTitle: 'Reputera — Where ideas earn their reputation.',
  ogDescription:
    'Custom software, apps, and AI built around your exact business logic. See a real demo in 24–72 hours.',
});

const demoSteps = [
  {
    step: '01',
    title: 'What are you building?',
    body: 'Website, app, software, AI — or all of it.',
  },
  {
    step: '02',
    title: 'Describe your business.',
    body: 'Your niche, and what the build actually needs to do — in your own words.',
  },
  {
    step: '03',
    title: 'We hand you back a demo.',
    body: 'A real, working visual of your idea — not a proposal, not a call.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero owns the page's single <h1>. */}
      <Hero />

      {/* ------------------------------------------------------------- services */}
      <section id="services" className="section" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">What we build</p>
            <h2 id="services-title">One team. Four ways to build it.</h2>
            <p>
              Software is where we go deepest — apps, websites, and AI are how it reaches your customers.
              Every build starts with your workflow, not a template.
            </p>
          </div>

          <div className="grid grid-2">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- get a demo */}
      <section className={styles.demoSection} aria-labelledby="demo-title">
        <div className="container">
          <div className={styles.demoInner}>
            <div className={styles.demoCopy}>
              <p className="eyebrow eyebrow-amber">Get a Demo</p>
              <h2 id="demo-title">Bring your idea into action.</h2>
              <p className="lead">
                Answer a few questions about what you need — we come back with a real, visual demo, not a
                sales call. It&apos;s the fastest way to see we can build exactly what you&apos;re picturing.
              </p>

              <ol className={styles.steps}>
                {demoSteps.map((item) => (
                  <li key={item.step} className="reveal">
                    <span className={styles.stepNum}>{item.step}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="btn-row">
                <Link href="/get-a-demo" className="btn btn-amber btn-lg">
                  Start Your Demo <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <aside className={styles.promiseBox} aria-label="Demo turnaround">
              <DemoVisual />
            </aside>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ portfolio */}
      <section className="section" aria-labelledby="work-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title">Real work, real businesses.</h2>
            <p>A sample of what we&apos;ve built — shown by industry, not by name.</p>
          </div>

          <div className="grid grid-2">
            {caseStudies.map((study, index) => (
              <article key={study.slug} className={`card card-hover reveal ${styles.case}`} data-reveal-index={index}>
                <CaseVisual slug={study.slug} />
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
              See the work
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- product */}
      <section className={styles.reviewsSection} aria-labelledby="product-title">
        <div className="container">
          <div className={styles.reviewsCard}>
            <div className={styles.reviewsCopy}>
              <p className="eyebrow eyebrow-amber">Coming soon</p>
              <h2 id="product-title" className={styles.reviewsHeading}>
                Reputera <span className="text-amber">Reviews</span>
              </h2>
              <p className={styles.reviewsLead}>
                A subscription tool for managing and growing your Google reviews — turning happy customers
                into a reputation that markets you. Details coming soon.
              </p>
              <p className={styles.reviewsMotto}>
                From the software we build to the reputation you keep.
              </p>
              <div className="btn-row" style={{ marginTop: '2rem' }}>
                <Link href="/reviews" className="btn btn-amber btn-lg">
                  Join the waitlist <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className={styles.reviewsVisual}>
              <ReviewsVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- about */}
      <section className="section" aria-labelledby="about-title">
        <div className="container">
          <div className={styles.founders}>
            <span className={styles.quoteMark} aria-hidden="true">
              &ldquo;
            </span>

            <div className={styles.foundersCopy}>
              {/* "Founders" is the section's heading, so the copy stays one sentence. */}
              <h2 id="about-title" className={`eyebrow ${styles.aboutLabel}`}>
                Founders
              </h2>
              <p className={styles.aboutCopy}>
                Reputera is built by <strong>Ayaan Shah</strong> and <strong>Shahid Khan</strong>, who
                started the company to build software the way it should be built: shaped around how a
                business actually runs, and delivered by the people who actually build it — hands-on with
                every project, start to finish.
              </p>

              <ul className={styles.founderList}>
                {[
                  { name: 'Ayaan Shah', initials: 'AS' },
                  { name: 'Shahid Khan', initials: 'SK' },
                ].map((founder) => (
                  <li key={founder.name}>
                    {/* TODO(brand): swap the initials disc for a photo when available. */}
                    <span className={styles.founderAvatar} aria-hidden="true">
                      {founder.initials}
                    </span>
                    <span>
                      <strong>{founder.name}</strong>
                      <em>Co-founder</em>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="btn-row" style={{ marginTop: '1.75rem' }}>
                <Link href="/about" className="btn btn-ghost">
                  More about us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
