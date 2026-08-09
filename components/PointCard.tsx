import styles from './PointCard.module.css';

type Props = {
  index: number;
  title: string;
  body: string;
  /** Optional glyph. Without one the card leads with its index numeral. */
  icon?: React.ReactNode;
  /** Defaults to alternating cyan/amber by position. */
  accent?: 'cyan' | 'amber';
};

/**
 * The card used by every "why" / values grid on the site: an oversized index
 * numeral behind the copy, an optional icon, an accent hairline on hover, and
 * alternating cyan/amber so a row of four never reads as one flat block.
 */
export default function PointCard({ index, title, body, icon, accent }: Props) {
  const isAmber = (accent ?? (index % 2 === 1 ? 'amber' : 'cyan')) === 'amber';

  return (
    <article
      className={`reveal ${styles.card} ${isAmber ? styles.amber : ''}`}
      data-reveal-index={index}
    >
      <span className={styles.num} aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>

      {icon && (
        <span className={styles.icon} aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {icon}
          </svg>
        </span>
      )}

      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}
