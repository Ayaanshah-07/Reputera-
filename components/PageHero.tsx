import Link from 'next/link';
import styles from './PageHero.module.css';

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  accent?: 'cyan' | 'amber';
  actions?: { label: React.ReactNode; href: string; variant?: 'primary' | 'ghost' | 'amber' }[];
  children?: React.ReactNode;
};

/** Shared inner-page header. The homepage uses its own richer Hero. */
export default function PageHero({ eyebrow, title, intro, accent = 'cyan', actions, children }: Props) {
  return (
    <section className={`${styles.hero} ${accent === 'amber' ? styles.amber : ''}`}>
      <div className={styles.glow} aria-hidden="true" />
      <div className="container">
        <p className={`eyebrow ${accent === 'amber' ? 'eyebrow-amber' : ''}`}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={`lead ${styles.intro}`}>{intro}</p>
        {actions && actions.length > 0 && (
          <div className={`btn-row ${styles.actions}`}>
            {actions.map((action, index) => (
              <Link
                key={`${action.href}-${index}`}
                href={action.href}
                className={`btn btn-lg btn-${action.variant ?? 'primary'}`}
              >
                {action.label}
              </Link>
            ))}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
