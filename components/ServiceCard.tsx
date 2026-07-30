import Link from 'next/link';
import ServiceIcon from './ServiceIcon';
import type { Service } from '@/lib/site';
import styles from './ServiceCard.module.css';

export default function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  return (
    <article
      className={`card card-hover reveal ${styles.card} ${service.flagship ? styles.flagship : ''} ${
        service.accent === 'amber' ? styles.amber : ''
      }`}
      data-reveal-index={index}
    >
      {service.flagship && <span className={styles.flag}>Flagship</span>}
      <span className={styles.icon}>
        <ServiceIcon icon={service.icon} />
      </span>
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
