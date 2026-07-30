import Link from 'next/link';
import { services } from '@/lib/site';

export const metadata = {
  title: 'Page not found | Reputera',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section" style={{ paddingBlock: 'clamp(5rem, 12vw, 9rem)' }}>
      <div className="container container-narrow">
        <p className="eyebrow">404</p>
        <h1>This page doesn&apos;t exist.</h1>
        <p className="lead" style={{ marginTop: '1rem' }}>
          The link may be out of date, or the page may have moved. Here is where most people are heading.
        </p>

        <div className="btn-row" style={{ marginTop: '2rem' }}>
          <Link href="/get-a-demo" className="btn btn-primary btn-lg">
            Get a Demo
          </Link>
          <Link href="/" className="btn btn-ghost btn-lg">
            Back to home
          </Link>
        </div>

        <ul className="pill-list" style={{ marginTop: '2.5rem' }}>
          {services.map((service) => (
            <li key={service.slug}>
              <Link href={`/services/${service.slug}`} className="pill">
                {service.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
