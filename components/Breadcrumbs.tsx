import Link from 'next/link';
import styles from './Breadcrumbs.module.css';

export type Crumb = { name: string; path: string };

/**
 * Visible breadcrumb trail. Pair with breadcrumbSchema() from lib/schema.ts —
 * the last crumb is the current page and is not linked.
 */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <div className="container">
        <ol>
          {trail.map((crumb, index) => {
            const isCurrent = index === trail.length - 1;
            return (
              <li key={crumb.path} aria-current={isCurrent ? 'page' : undefined}>
                {isCurrent ? crumb.name : <Link href={crumb.path}>{crumb.name}</Link>}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
