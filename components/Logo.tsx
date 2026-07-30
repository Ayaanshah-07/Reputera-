import Link from 'next/link';
import styles from './Logo.module.css';

/**
 * Placeholder brand lockup.
 *
 * TODO(brand): swap the inline <svg> mark below for the supplied logo file.
 * Drop the asset in /public (e.g. /public/logo.svg) and replace the mark with
 * <Image src="/logo.svg" alt="" width={34} height={34} priority /> — the
 * wordmark, sizing and link behaviour can stay exactly as they are.
 */
export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={styles.logo} aria-label="Reputera — home">
      <span className={styles.mark} aria-hidden="true">
        <svg viewBox="0 0 40 40" fill="none" focusable="false">
          <defs>
            <linearGradient id="reputera-mark" x1="4" y1="4" x2="36" y2="36">
              <stop offset="0%" stopColor="#34e3f5" />
              <stop offset="100%" stopColor="#f5b942" />
            </linearGradient>
          </defs>
          <rect x="1.5" y="1.5" width="37" height="37" rx="11" stroke="url(#reputera-mark)" strokeWidth="2" />
          <path
            d="M14 28V12h7.5a5 5 0 0 1 0 10H17l7 6"
            stroke="url(#reputera-mark)"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {!compact && (
        <span className={styles.word}>
          Reputera
          <span className={styles.dot} aria-hidden="true">
            .
          </span>
        </span>
      )}
    </Link>
  );
}
