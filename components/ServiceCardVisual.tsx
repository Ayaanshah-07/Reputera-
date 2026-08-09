import type { Service } from '@/lib/site';
import styles from './ServiceCardVisual.module.css';

/**
 * Small animated preview at the top of each service card — a different motif
 * per discipline so the four cards read as distinct at a glance:
 * a dashboard, stacked phones, a browser, and an AI agent.
 * Decorative, so the whole thing is hidden from assistive tech.
 */
export default function ServiceCardVisual({ icon }: { icon: Service['icon'] }) {
  if (icon === 'mobile') {
    return (
      <div className={styles.wrap} aria-hidden="true">
        <span className={`${styles.phoneShape} ${styles.phoneBack}`}>
          <em />
          <i />
        </span>
        <span className={styles.phoneShape}>
          <em />
          <i />
          <i />
        </span>
      </div>
    );
  }

  if (icon === 'globe') {
    return (
      <div className={styles.wrap} aria-hidden="true">
        <span className={styles.browser}>
          <span className={styles.browserBar}>
            <em />
            <em />
            <em />
            <span className={styles.url} />
          </span>
          <span className={styles.browserBody}>
            <span className={styles.banner} />
            <span className={styles.cols}>
              <i />
              <i />
              <i />
            </span>
          </span>
          <span className={styles.cursor} />
        </span>
      </div>
    );
  }

  if (icon === 'spark') {
    return (
      <div className={styles.wrap} aria-hidden="true">
        <span className={styles.agent}>
          <svg viewBox="0 0 44 40" fill="none">
            {/* antenna */}
            <path d="M22 6V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="22" cy="2" r="2" fill="currentColor" className={styles.antenna} />
            {/* head */}
            <rect
              x="7"
              y="6"
              width="30"
              height="23"
              rx="7"
              stroke="currentColor"
              strokeWidth="2"
              fill="rgba(245,185,66,0.10)"
            />
            {/* eyes */}
            <circle cx="16.5" cy="17" r="2.6" fill="currentColor" className={styles.eye} />
            <circle cx="27.5" cy="17" r="2.6" fill="currentColor" className={styles.eye} />
            {/* mouth */}
            <path d="M17.5 23.5h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            {/* ears */}
            <path d="M4 14v7M40 14v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </svg>
        </span>

        <span className={styles.nodes}>
          {[0, 1, 2].map((node) => (
            <i key={node} style={{ '--n': node } as React.CSSProperties} />
          ))}
        </span>
      </div>
    );
  }

  // code — a compact operations dashboard
  return (
    <div className={styles.wrap} aria-hidden="true">
      <span className={styles.dash}>
        <span className={styles.dashSide}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.dashMain}>
          <span className={styles.dashTiles}>
            <b />
            <b />
          </span>
          <span className={styles.dashChart}>
            {[46, 72, 58, 90, 66].map((height, index) => (
              <i key={index} style={{ '--h': `${height}%`, '--i': index } as React.CSSProperties} />
            ))}
          </span>
        </span>
      </span>
    </div>
  );
}
