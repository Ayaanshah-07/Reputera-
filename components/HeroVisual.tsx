import styles from './HeroVisual.module.css';

/**
 * Hero artwork: an abstract operations dashboard with floating status chips.
 * Built from markup and CSS rather than an image file — nothing to download,
 * it scales cleanly at any size, and it inherits the brand tokens.
 * Entirely decorative, so it is hidden from assistive tech.
 */
export default function HeroVisual() {
  const bars = [42, 68, 54, 88, 61, 76, 95];

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.glow} />

      <div className={styles.window}>
        <div className={styles.titlebar}>
          <span className={styles.dots}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.titleText}>Operations</span>
          <span className={styles.live}>
            <em />
            Live
          </span>
        </div>

        <div className={styles.body}>
          <aside className={styles.sidebar}>
            <span className={styles.navActive} />
            <span />
            <span />
            <span />
            <span />
          </aside>

          <div className={styles.content}>
            <div className={styles.tiles}>
              <div className={styles.tile}>
                <span className={styles.tileValue}>1,284</span>
                <span className={styles.tileLabel} />
              </div>
              <div className={styles.tile}>
                <span className={`${styles.tileValue} ${styles.amberValue}`}>98.2%</span>
                <span className={styles.tileLabel} />
              </div>
              <div className={styles.tile}>
                <span className={styles.tileValue}>36h</span>
                <span className={styles.tileLabel} />
              </div>
            </div>

            <div className={styles.chart}>
              {bars.map((height, index) => (
                <span
                  key={index}
                  className={styles.bar}
                  style={{ '--h': `${height}%`, '--i': index } as React.CSSProperties}
                />
              ))}
            </div>

            <div className={styles.rows}>
              {[0, 1, 2].map((row) => (
                <div key={row} className={styles.row}>
                  <span className={styles.rowDot} />
                  <span className={styles.rowLine} />
                  <span className={styles.rowPill} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.chip} ${styles.chipOne}`}>
        <span className={styles.chipIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m4.5 12.5 5 5 10-11" />
          </svg>
        </span>
        Demo delivered · 36h
      </div>

      <div className={`${styles.chip} ${styles.chipTwo}`}>
        <span className={`${styles.chipIcon} ${styles.chipIconAmber}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3.5 13.5 9l5.5 1.5L13.5 12 12 17.5 10.5 12 5 10.5 10.5 9 12 3.5Z" />
          </svg>
        </span>
        AI matched 128 photos
      </div>
    </div>
  );
}
