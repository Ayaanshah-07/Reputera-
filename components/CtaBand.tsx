import Link from 'next/link';
import styles from './CtaBand.module.css';

type Props = {
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

/** Closing conversion block. Appears at the foot of every page. */
export default function CtaBand({
  title = 'Tell us the idea. See it in 24–72 hours.',
  body = 'Describe what you want built and we send back a visual demo — real screens, your business, no obligation and no cost.',
  primaryLabel = 'Get a Demo',
  primaryHref = '/get-a-demo',
  secondaryLabel = 'Talk to us first',
  secondaryHref = '/contact',
}: Props) {
  return (
    <section className={styles.band} aria-labelledby="cta-band-title">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.copy}>
            <h2 id="cta-band-title">{title}</h2>
            <p>{body}</p>
          </div>
          <div className="btn-row">
            <Link href={primaryHref} className="btn btn-primary btn-lg">
              {primaryLabel}
            </Link>
            <Link href={secondaryHref} className="btn btn-ghost btn-lg">
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
