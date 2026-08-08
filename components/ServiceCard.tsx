import Link from 'next/link';
import ServiceCardVisual from './ServiceCardVisual';
import type { Service } from '@/lib/site';
import styles from './ServiceCard.module.css';

export default function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  return (
    <article
      className={`card card-hover reveal ${styles.card} ${service.flagship ? styles.flagship : ''} ${
        service.accent === 'amber' ? `${styles.amber} amberCard` : ''
      }`}
      data-reveal-index={index}
    >
      <span className={`${styles.flag} ${service.flagship ? styles.flagLead : ''}`}>{service.tag}</span>
      {/* The preview strip carries the card's imagery, so no separate icon disc. */}
      <ServiceCardVisual icon={service.icon} />
      <h3>
        <Link href={`/services/${service.slug}`} className={styles.link}>
          <span className={styles.stretch} />
          {service.title}
        </Link>
      </h3>
      <p>{service.summary}</p>
      <span className={styles.more} aria-hidden="true">
        Explore
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </span>
    </article>
  );
}
