import type { Service } from '@/lib/site';
import styles from './ServiceCardVisual.module.css';

/**
 * Small abstract preview at the top of each service card — a different motif
 * per discipline so the four cards read as distinct at a glance. Decorative.
 */
export default function ServiceCardVisual({ icon }: { icon: Service['icon'] }) {
  if (icon === 'mobile') {
    return (
      <div className={styles.wrap} aria-hidden="true">
        <span className={styles.phoneShape}>
          <em />
          <i />
          <i />
        </span>
        <span className={`${styles.phoneShape} ${styles.phoneBack}`}>
          <em />
          <i />
        </span>
      </div>
    );
  }

  if (icon === 'globe') {
    return (
      <div className={styles.wrap} aria-hidden="true">
        <span className={styles.browser}>
          <b />
          <span className={styles.browserBody}>
            <i />
            <i />
          </span>
        </span>
      </div>
    );
  }

  if (icon === 'spark') {
    return (
      <div className={styles.wrap} aria-hidden="true">
        <span className={styles.nodes}>
          {[0, 1, 2, 3, 4].map((node) => (
            <i key={node} style={{ '--n': node } as React.CSSProperties} />
          ))}
        </span>
      </div>
    );
  }

  // code — stacked "logic" rows
  return (
    <div className={styles.wrap} aria-hidden="true">
      <span className={styles.rows}>
        <i />
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}
