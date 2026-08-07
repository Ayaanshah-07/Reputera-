import Link from 'next/link';
import Logo from './Logo';
import { services, site } from '@/lib/site';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo />
            <p className={styles.tagline}>{site.tagline}</p>
            <p className={styles.support}>{site.supportingTagline}</p>
            <Link href="/get-a-demo" className="btn btn-primary">
              Get a Demo
            </Link>
          </div>

          <nav className={styles.columns} aria-label="Footer">
            <div>
              <h2 className={styles.colTitle}>Services</h2>
              <ul>
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`}>{service.title}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/services">All services</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className={styles.colTitle}>Company</h2>
              <ul>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/portfolio">Portfolio</Link>
                </li>
                <li>
                  <Link href="/reviews">
                    Product <span className={styles.soon}>Soon</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className={styles.colTitle}>Get started</h2>
              <ul>
                <li>
                  <Link href="/get-a-demo">Get a Demo</Link>
                </li>
                <li>
                  <a href={`mailto:${site.email}`}>Email us</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} {site.name}. All rights reserved. <span aria-hidden="true">·</span> Built around your
            business.
          </p>
          <p className={styles.motto}>Where ideas earn their reputation.</p>
        </div>
      </div>
    </footer>
  );
}
