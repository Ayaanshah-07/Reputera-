import styles from './DemoVisual.module.css';

/**
 * "Brief in, screens out" artwork for the Get a Demo section: a stack of demo
 * screens with the turnaround promise beneath. The front screen carries real
 * labels so it reads as a product mockup rather than placeholder blocks.
 * Decorative — the section's own copy carries the meaning.
 */
export default function DemoVisual() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.stack}>
        <div className={`${styles.screen} ${styles.screenBack}`} />
        <div className={`${styles.screen} ${styles.screenMid}`} />

        <div className={`${styles.screen} ${styles.screenFront}`}>
          <div className={styles.head}>
            <span className={styles.dots}>
              <i />
              <i />
              <i />
            </span>
            <span className={styles.headTitle}>Your demo</span>
            <span className={styles.ready}>Ready</span>
          </div>

          <div className={styles.body}>
            <p className={styles.screenTitle}>Bookings</p>

            <div className={styles.tiles}>
              <div className={styles.tile}>
                <b>24</b>
                <span>Today</span>
              </div>
              <div className={`${styles.tile} ${styles.tileAmber}`}>
                <b>8</b>
                <span>Open</span>
              </div>
            </div>

            <p className={styles.rowItem}>
              <span className={styles.rowDot} />
              New request · 09:40
            </p>

            <span className={styles.button}>Approve</span>
          </div>
        </div>
      </div>

      <div className={styles.promise}>
        <p className={styles.value}>24–72</p>
        <p className={styles.label}>Hours to your demo.</p>
        <p className={styles.note}>No commitment. Just proof we can build it.</p>
      </div>
    </div>
  );
}
