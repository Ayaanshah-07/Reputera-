import styles from './DemoVisual.module.css';

/**
 * "Brief in, screens out" artwork for the Get a Demo section: a stack of mock
 * demo screens behind the turnaround promise. Decorative.
 */
export default function DemoVisual() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.stack}>
        <div className={`${styles.screen} ${styles.screenBack}`} />
        <div className={`${styles.screen} ${styles.screenMid}`} />
        <div className={`${styles.screen} ${styles.screenFront}`}>
          <span className={styles.bar} />
          <div className={styles.blocks}>
            <span className={styles.block} />
            <span className={styles.block} />
          </div>
          <span className={styles.line} />
          <span className={`${styles.line} ${styles.lineShort}`} />
          <span className={styles.cta} />
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
