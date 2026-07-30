import styles from './AnimatedBackground.module.css';

/**
 * Hero backdrop: drifting aurora orbs over a perspective grid, plus a few
 * rising "signal" motes. Pure CSS — no JS, no canvas, no layout cost — so it
 * stays cheap on mobile and disables itself under prefers-reduced-motion.
 */
export default function AnimatedBackground() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.grid} />
      <div className={`${styles.orb} ${styles.orbCyan}`} />
      <div className={`${styles.orb} ${styles.orbAmber}`} />
      <div className={`${styles.orb} ${styles.orbDeep}`} />
      <div className={styles.motes}>
        {Array.from({ length: 14 }).map((_, index) => (
          <span key={index} className={styles.mote} style={{ '--i': index } as React.CSSProperties} />
        ))}
      </div>
      <div className={styles.vignette} />
    </div>
  );
}
