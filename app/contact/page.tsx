import Link from 'next/link';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { site, whatsappLink } from '@/lib/site';
import styles from './page.module.css';

export const metadata = pageMetadata({
  title: 'Contact Reputera — Talk to Us About Your Project',
  description:
    'Get in touch with Reputera about custom software, app or website development, or AI solutions. Or skip ahead and request a free visual demo delivered in 24–72 hours.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Reputera',
            url: `${site.url}/contact`,
            mainEntity: { '@id': `${site.url}/#organization` },
          },
        ]}
      />

      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s talk about what you&apos;re <span className="text-gradient">trying to build</span>.
          </>
        }
        intro="Questions, scoping, second opinions on an existing system — all welcome. If you already know what you want built, the demo request will get you further, faster."
      />

      <section className="section" aria-labelledby="contact-form-title">
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.formCol}>
              <h2 id="contact-form-title" className="visually-hidden">
                Contact form
              </h2>
              <ContactForm />
            </div>

            <aside className={styles.aside} aria-labelledby="direct-title">
              <div className={styles.sticky}>
              <div className={styles.card}>
                <h2 id="direct-title" className={styles.cardTitle}>
                  Reach us directly
                </h2>
                <ul className={styles.details}>
                  <li>
                    <span>Email</span>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </li>
                  <li>
                    <span>Phone &amp; WhatsApp</span>
                    <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>{site.phone}</a>
                    <a
                      href={whatsappLink()}
                      className={styles.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Message us on WhatsApp
                    </a>
                  </li>
                  <li>
                    <span>Additional number</span>
                    <a href={`tel:${site.phoneAlt.replace(/[^+\d]/g, '')}`}>{site.phoneAlt}</a>
                    <em className={styles.noteInline}>Calls only — no WhatsApp on this line.</em>
                  </li>
                  <li>
                    <span>Response time</span>
                    <strong>Within one business day</strong>
                  </li>
                </ul>
              </div>

              <div className={`${styles.card} ${styles.demoCard}`}>
                <h2 className={styles.cardTitle}>Skip the back and forth</h2>
                <p>
                  Describe your project once and get a visual demo of it within 24–72 hours. Free, and yours
                  whether or not we end up building it.
                </p>
                <Link href="/get-a-demo" className="btn btn-primary btn-block">
                  Get a Demo
                </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
