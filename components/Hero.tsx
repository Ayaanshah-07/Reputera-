import Link from 'next/link';
import AnimatedBackground from './AnimatedBackground';
import HeroVisual from './HeroVisual';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <AnimatedBackground />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={`badge ${styles.badge}`}>
            <span className={styles.pulse} aria-hidden="true" />
            Software · Apps · Websites · AI
          </p>

          <h1 className={styles.title}>
            Where ideas earn their <span className="text-gradient">reputation</span>.
          </h1>

          <p className={styles.lead}>
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
        </div>

        <div className={styles.visual}>
          <HeroVisual />
        </div>
      </div>

      <div className={`container ${styles.bannerWrap}`}>
        <aside className={styles.reviewsBanner} aria-label="Reputera Reviews">
          <span className={styles.reviewsBadge}>Also from Reputera</span>
          <div className={styles.reviewsBody}>
            <h2 className={styles.reviewsTitle}>Reputera Reviews</h2>
            <p>
              A subscription tool that helps your business manage and grow its Google reviews — reputation,
              handled.
            </p>
          </div>
          <span className={styles.stars} aria-hidden="true">
            {[0, 1, 2, 3, 4].map((star) => (
              <svg key={star} viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 1.6l2.5 5.3 5.6.8-4.1 4 1 5.7L10 14.7 4.9 17.4l1-5.7-4.1-4 5.6-.8L10 1.6Z" />
              </svg>
            ))}
          </span>
          <Link href="/reviews" className={styles.reviewsLink}>
            Explore <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </div>
    </section>
  );
}
