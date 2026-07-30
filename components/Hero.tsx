import Link from 'next/link';
import AnimatedBackground from './AnimatedBackground';
import { site } from '@/lib/site';
import styles from './Hero.module.css';

const proofPoints = [
  { value: '24–72h', label: 'From brief to visual demo' },
  { value: '0', label: 'Templates used' },
  { value: '4', label: 'Disciplines under one roof' },
  { value: '100%', label: 'Code ownership, yours' },
];

export default function Hero() {
  return (
    <section className={styles.hero}>
      <AnimatedBackground />

      <div className={`container ${styles.inner}`}>
        <p className={`badge ${styles.badge}`}>
          <span className={styles.pulse} aria-hidden="true" />
          Software · Apps · Websites · AI
        </p>

        <h1 className={styles.title}>
          Where ideas earn their <span className="text-gradient">reputation</span>.
        </h1>

        <p className={styles.sub}>{site.supportingTagline}</p>

        <p className={`lead ${styles.lead}`}>
          We build custom software, apps and websites shaped around your exact business model and
          workflow logic — never templated, never forced into someone else&apos;s product.
        </p>

        <div className={`btn-row ${styles.actions}`}>
          <Link href="/get-a-demo" className="btn btn-primary btn-lg">
            Get a Demo
          </Link>
          <Link href="/services/software-development" className="btn btn-ghost btn-lg">
            Explore what we build
          </Link>
        </div>

        <p className={styles.note}>
          Tell us the idea — we send back a visual demo in <strong>24–72 hours</strong>. Free, no obligation.
        </p>

        <dl className={styles.proof}>
          {proofPoints.map((point) => (
            <div key={point.label} className={styles.proofItem}>
              <dt className={styles.proofValue}>{point.value}</dt>
              <dd className={styles.proofLabel}>{point.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
