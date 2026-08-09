'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Progressive enhancement: fades `.reveal` elements in as they enter view.
 *
 * Re-runs on every route change. This component lives in the root layout, which
 * is NOT remounted during client-side navigation — with an empty dependency
 * array the observer only ever watched the first page's elements, and every
 * page reached through a link stayed stuck at opacity 0 until a hard refresh.
 *
 * Reveal styles are scoped to `.js` in globals.css, so with JavaScript off the
 * content is simply visible.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = (node: Element) => node.classList.add('is-visible');
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!nodes.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      nodes.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const index = Number(el.dataset.revealIndex ?? 0);
          el.style.transitionDelay = `${Math.min(index, 5) * 70}ms`;
          reveal(el);
          observer.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    nodes.forEach((node) => observer.observe(node));

    // Safety net: if anything is still hidden after a few seconds (an observer
    // that never fired, a print request, an odd viewport), just show it.
    const failsafe = window.setTimeout(() => nodes.forEach(reveal), 3000);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [pathname]);

  return null;
}
