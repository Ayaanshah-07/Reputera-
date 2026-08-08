import styles from './ReviewsVisual.module.css';

/** Mock review-management widget for the Reputera Reviews section. Decorative. */
export default function ReviewsVisual() {
  const stars = [0, 1, 2, 3, 4];

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.head}>
        <span className={styles.avatar}>G</span>
        <div>
          <span className={styles.rating}>
            {stars.map((star) => (
              <svg key={star} viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 1.6l2.5 5.3 5.6.8-4.1 4 1 5.7L10 14.7 4.9 17.4l1-5.7-4.1-4 5.6-.8L10 1.6Z" />
              </svg>
            ))}
          </span>
          <span className={styles.meta}>New review · just now</span>
        </div>
        <span className={styles.score}>4.9</span>
      </div>

      <div className={styles.quote}>
        <span />
        <span />
        <span className={styles.quoteShort} />
      </div>

      <div className={styles.reply}>
        <span className={styles.replyTag}>Reply drafted</span>
        <span className={styles.replyLine} />
      </div>

      <div className={styles.trend}>
        {[38, 52, 47, 66, 74, 88].map((height, index) => (
          <span key={index} style={{ height: `${height}%` }} />
        ))}
      </div>
    </div>
  );
}
