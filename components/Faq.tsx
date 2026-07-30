import styles from './Faq.module.css';

export type FaqItem = { question: string; answer: string };

/**
 * Native <details> accordion — works without JS and is readable by crawlers,
 * which matters because these questions are also emitted as FAQPage schema.
 */
export default function Faq({ items, title = 'Common questions' }: { items: FaqItem[]; title?: string }) {
  return (
    <section className="section section-tight" aria-labelledby="faq-title">
      <div className="container container-narrow">
        <h2 id="faq-title" className={styles.title}>
          {title}
        </h2>
        <div className={styles.list}>
          {items.map((item) => (
            <details key={item.question} className={styles.item}>
              <summary className={styles.summary}>
                <span>{item.question}</span>
                <span className={styles.chev} aria-hidden="true" />
              </summary>
              <div className={styles.answer}>
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
