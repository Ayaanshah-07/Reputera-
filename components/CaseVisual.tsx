import styles from './CaseVisual.module.css';

/**
 * Abstract artwork for each case study, keyed by case slug. Decorative only —
 * the card's heading and copy carry the meaning, so this is aria-hidden.
 * Drawn in markup/CSS so there is no image payload and no licensing question.
 */
export default function CaseVisual({ slug }: { slug: string }) {
  if (slug === 'construction-fit-out') {
    return (
      <div className={`${styles.wrap} ${styles.site}`} aria-hidden="true">
        <div className={styles.phone}>
          <span className={styles.notch} />
          <div className={styles.photo}>
            <span className={`${styles.pin} ${styles.pinOne}`}>1</span>
            <span className={`${styles.pin} ${styles.pinTwo}`}>2</span>
            <span className={styles.scan} />
          </div>
          <div className={styles.noteRow}>
            <span className={styles.noteDot} />
            <span className={styles.noteLine} />
          </div>
          <div className={styles.noteRow}>
            <span className={`${styles.noteDot} ${styles.noteDotAmber}`} />
            <span className={`${styles.noteLine} ${styles.noteShort}`} />
          </div>
          <span className={styles.aiTag}>AI description drafted</span>
        </div>
      </div>
    );
  }

  // Default: the ERP + image-matching build.
  return (
    <div className={`${styles.wrap} ${styles.erp}`} aria-hidden="true">
      <div className={styles.catalog}>
        {Array.from({ length: 6 }).map((_, index) => (
          <span key={index} className={`${styles.swatch} ${index === 3 ? styles.swatchMatched : ''}`}>
            {index === 3 && <em className={styles.check} />}
          </span>
        ))}
      </div>
      <div className={styles.matchBar}>
        <span className={styles.matchFill} />
      </div>
      <div className={styles.matchMeta}>
        <span className={styles.matchLabel} />
        <span className={styles.matchPct}>98%</span>
      </div>
    </div>
  );
}
