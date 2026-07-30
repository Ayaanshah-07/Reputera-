import DemoForm from '@/components/DemoForm';
import PageHero from '@/components/PageHero';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import styles from './page.module.css';

export const metadata = pageMetadata({
  title: 'Get a Free Demo of Your Idea in 24–72 Hours | Reputera',
  description:
    'Describe the website, app or software you want built and Reputera sends back a visual demo within 24–72 hours. Free, no obligation — see the work before you commit.',
  path: '/get-a-demo',
});

const faqs = [
  {
    question: 'Is the demo really free?',
    answer:
      'Yes. There is no cost and no obligation to continue. We would rather show you the quality of our work than describe it in a proposal, and we accept that some demos will not turn into projects.',
  },
  {
    question: 'What exactly will I receive?',
    answer:
      'A visual demo: designed screens of the product you described — the interface, the key flows and the feel of it — presented so you can see how it would work in your business. Not a wireframe sketch and not a generic template.',
  },
  {
    question: 'Why do you ask for a budget range?',
    answer:
      'So the demo shows something you can actually build. A range lets us scope sensibly rather than designing something out of reach, and it tells us where to focus first if the full idea is bigger than the budget.',
  },
  {
    question: 'What happens after I get the demo?',
    answer:
      'We walk you through it, answer questions and give you a clear scope and quote if you want to proceed. If you do not, the demo is yours and there is no follow-up pressure.',
  },
  {
    question: 'How much detail should I write?',
    answer:
      'As much as you can. The description field has no upper limit. Who uses it, what they need to do, how the process works today and where it breaks — that detail is what turns a generic demo into one that looks like your business.',
  },
  {
    question: 'Do I need to know exactly what I want?',
    answer:
      'No. Plenty of people arrive with a problem rather than a specification. Describe the problem and choose "advise me" on budget — working out the right shape for a solution is part of what we do.',
  },
];

const promises = [
  { title: '24–72 hours', body: 'From your brief landing with us to a visual demo landing with you.' },
  { title: 'Zero cost', body: 'No fee, no deposit, no obligation to continue afterwards.' },
  { title: 'Built for you', body: 'Designed around your niche and description — never a recycled mockup.' },
];

export default function GetADemoPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Get a Demo', path: '/get-a-demo' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Get a Demo"
        title={
          <>
            Tell us the idea. We&apos;ll show you <span className="text-gradient">the real thing</span>.
          </>
        }
        intro="Fill this in once and our team turns it into a visual demo of your website, app or software — delivered within 24–72 hours. Free, no obligation, and yours to keep either way."
      >
        <ul className={styles.promises}>
          {promises.map((promise) => (
            <li key={promise.title}>
              <strong>{promise.title}</strong>
              <span>{promise.body}</span>
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="section" aria-labelledby="form-title">
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.formCol}>
              <h2 id="form-title" className={styles.formTitle}>
                Your demo request
              </h2>
              <p className={`muted ${styles.formSub}`}>
                Five steps. Most people finish in under ten minutes — the description is the part worth
                slowing down for.
              </p>
              <DemoForm />
            </div>

            <aside className={styles.sidebar} aria-labelledby="sidebar-title">
              <div className={styles.sticky}>
                <h2 id="sidebar-title" className={styles.sidebarTitle}>
                  What happens next
                </h2>
                <ol className={styles.timeline}>
                  <li>
                    <strong>Straight away</strong>
                    <span>Your brief reaches our team and we confirm receipt by email.</span>
                  </li>
                  <li>
                    <strong>Within a day</strong>
                    <span>We come back with questions if anything is unclear — often just one or two.</span>
                  </li>
                  <li>
                    <strong>24–72 hours</strong>
                    <span>Your visual demo arrives: real screens of the product you described.</span>
                  </li>
                  <li>
                    <strong>Your call</strong>
                    <span>Walk through it with us, or walk away. No cost either way.</span>
                  </li>
                </ol>
                <p className={styles.sidebarNote}>
                  Prefer to talk it through first? <a href="/contact">Send us a message</a> instead.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Faq items={faqs} title="Questions about the demo" />
    </>
  );
}
