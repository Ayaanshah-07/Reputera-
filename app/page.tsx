import Link from 'next/link';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import CtaBand from '@/components/CtaBand';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { faqSchema } from '@/lib/schema';
import { services } from '@/lib/site';
import { industries } from '@/lib/industries';
import styles from './page.module.css';

export const metadata = pageMetadata({
  title: 'Reputera — Custom Software, App & Website Development',
  description:
    'Reputera builds custom software, apps, websites and AI solutions around your exact business model and workflow logic — never templated. Get a free visual demo in 24–72 hours.',
  path: '/',
});

const demoSteps = [
  {
    step: '01',
    title: 'Tell us what you want built',
    body: 'Website, app, custom software, AI — or all of it. Pick your niche and describe the idea in as much detail as you like.',
  },
  {
    step: '02',
    title: 'We design it, not describe it',
    body: 'Our team turns your description into real screens: the interface, the flow, the feel of the thing you asked for.',
  },
  {
    step: '03',
    title: 'You see it in 24–72 hours',
    body: 'A visual demo lands in your inbox. If it is right, we build it. If it is not, you have lost nothing but a form.',
  },
];

const differentiators = [
  {
    title: 'Built around your logic',
    body: 'We map how your business actually runs — the approvals, the exceptions, the workarounds — and encode that. Your software should not ask you to work differently.',
  },
  {
    title: 'Nothing templated',
    body: 'No themes, no recycled builds with a new logo dropped on top. Every interface and data model starts from your business, not from a starter kit.',
  },
  {
    title: 'Show, then build',
    body: 'Most agencies send a proposal. We send a demo. You judge the work before you commit to it, which is a far more honest way to start.',
  },
  {
    title: 'One team, four disciplines',
    body: 'Software, apps, websites and AI under one roof — so the pieces are designed to fit together instead of being stitched between vendors.',
  },
];

export default function HomePage() {
  const homeFaqs = [
    {
      question: 'What does Reputera actually build?',
      answer:
        'Custom software, mobile and web apps, websites, and AI assistants, agents and chatbots. Software development is our lead offering — the others usually connect back into it.',
    },
    {
      question: 'What is the free demo?',
      answer:
        'You describe what you want built and within 24–72 hours we send back a visual demo — real designed screens of your product. There is no cost and no obligation to continue.',
    },
    {
      question: 'Do you work with businesses in any industry?',
      answer:
        'Yes. We have built for healthcare, real estate, logistics, professional services, retail, hospitality and more. The process starts with learning your workflow, so the industry matters less than your willingness to explain how it works.',
    },
    {
      question: 'What is Reputera Reviews?',
      answer:
        'A subscription product we are building: a reputation management tool that helps businesses collect, monitor and respond to Google reviews. It is coming soon — you can join the waitlist.',
    },
  ];

  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

      {/* Hero owns the page's single <h1>. */}
      <Hero />

      {/* ------------------------------------------------------------- services */}
      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">What we build</p>
            <h2 id="services-title">Four disciplines. One team that connects them.</h2>
            <p>
              Software development leads everything we do. Apps, websites and AI extend it — built by the
              same people, on the same foundations.
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
              <p className="eyebrow eyebrow-amber">The signature move</p>
              <h2 id="demo-title">
                Get a <span className="text-amber">Demo</span> — your idea, made visible in 24–72 hours.
              </h2>
              <p className="lead">
                This is the brand promise in action. Instead of a slide deck about what we could build, you
                get a visual demo of the actual thing — designed around your business, delivered in days.
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
                  Start your demo request
                </Link>
                <span className={styles.freeNote}>Free · No obligation</span>
              </div>
            </div>

            <aside className={styles.demoPanel} aria-label="What the demo request asks for">
              <div className={styles.panelHead}>
                <span className={styles.dots} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span>Demo request</span>
              </div>
              <ul className={styles.panelList}>
                <li>
                  <span>What do you want built?</span>
                  <em>Website · App · Software · AI · All of it</em>
                </li>
                <li>
                  <span>Your business niche</span>
                  <em>Choose from the list, or type your own</em>
                </li>
                <li>
                  <span>Describe what you want</span>
                  <em>The more detail, the sharper the demo</em>
                </li>
                <li>
                  <span>Budget range</span>
                  <em>So we scope something realistic</em>
                </li>
                <li>
                  <span>Name, phone, email</span>
                  <em>Where we send the demo</em>
                </li>
              </ul>
              <p className={styles.panelFoot}>
                Reply window: <strong>24–72 hours</strong>
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- differentiators */}
      <section className="section" aria-labelledby="approach-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Why Reputera</p>
            <h2 id="approach-title">Custom means built for your logic — not your logo on a template.</h2>
          </div>

          <div className="grid grid-2">
            {differentiators.map((item, index) => (
              <article key={item.title} className="card card-hover reveal" data-reveal-index={index}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ industries */}
      <section className="section section-divider" aria-labelledby="industries-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Where we&apos;ve built</p>
            <h2 id="industries-title">Work shown by industry, not by client name.</h2>
            <p>
              Much of what we build runs inside businesses that would rather not advertise their systems. So
              we show the problem, the build and the outcome — and keep the names out of it.
            </p>
          </div>

          <ul className={styles.industryGrid}>
            {industries.slice(0, 6).map((industry, index) => (
              <li key={industry.slug} className="reveal" data-reveal-index={index}>
                <Link href={`/portfolio#${industry.slug}`} className={styles.industryCard}>
                  <span className={styles.industryName}>{industry.name}</span>
                  <span className={styles.industryLine}>{industry.headline}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="btn-row" style={{ marginTop: '2rem' }}>
            <Link href="/portfolio" className="btn btn-ghost">
              See the work
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- reviews */}
      <section className="section" aria-labelledby="reviews-title">
        <div className="container">
          <div className={styles.reviewsCard}>
            <div>
              <p className="eyebrow eyebrow-amber">The product side</p>
              <h2 id="reviews-title">Reputera Reviews</h2>
              <p className="lead">
                A subscription tool for managing your Google reviews — collect more of them, catch new ones
                as they land, and reply without living in your inbox. Currently in development.
              </p>
              <div className="btn-row" style={{ marginTop: '1.75rem' }}>
                <Link href="/reviews" className="btn btn-ghost">
                  Join the waitlist
                </Link>
                <span className="badge badge-amber">Coming soon</span>
              </div>
            </div>
            <p className={styles.reviewsMotto}>
              From the software we build
              <br />
              to the reputation you keep.
            </p>
          </div>
        </div>
      </section>

      {/* Rendered on-page as well as in FAQPage schema — Google requires the
          answers to be visible to users, not schema-only. */}
      <Faq items={homeFaqs} />

      <CtaBand />
    </>
  );
}
