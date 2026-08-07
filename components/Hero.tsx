import Link from 'next/link';
import AnimatedBackground from './AnimatedBackground';
import styles from './Hero.module.css';

const stats = [
  { value: '24–72hrs', label: 'demo turnaround' },
  { value: '4', label: 'build types, one team' },
  { value: '0', label: 'templates used' },
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

        <p className={`lead ${styles.lead}`}>
          From the software we build to the reputation you keep — we engineer custom software, apps, and
          AI around how your business actually runs, not the other way around.
        </p>

        <div className={`btn-row ${styles.actions}`}>
          <Link href="/get-a-demo" className="btn btn-primary btn-lg">
            Start Your Demo <span aria-hidden="true">→</span>
          </Link>
          <Link href="#services" className="btn btn-ghost btn-lg">
            See what we build
          </Link>
        </div>

        <dl className={styles.proof}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.proofItem}>
              <dt className={styles.proofValue}>{stat.value}</dt>
              <dd className={styles.proofLabel}>{stat.label}</dd>
            </div>
          ))}
        </dl>

        <aside className={styles.reviewsBanner} aria-label="Reputera Reviews">
          <span className={styles.reviewsBadge}>Also from Reputera</span>
          <div className={styles.reviewsBody}>
            <h2 className={styles.reviewsTitle}>Reputera Reviews</h2>
            <p>
              A subscription tool that helps your business manage and grow its Google reviews — reputation,
              handled.
            </p>
          </div>
          <Link href="/reviews" className={styles.reviewsLink}>
            Explore <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </div>
    </section>
  );
}
