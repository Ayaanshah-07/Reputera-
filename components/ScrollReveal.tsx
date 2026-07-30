'use client';

import { useEffect } from 'react';

/**
 * Progressive enhancement: fades `.reveal` elements in as they enter view.
 * Content is visible without JS only if `.reveal` is applied deliberately, so
 * this also force-reveals everything when IntersectionObserver is unavailable.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!nodes.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const index = Number(el.dataset.revealIndex ?? 0);
          el.style.transitionDelay = `${Math.min(index, 5) * 70}ms`;
          el.classList.add('is-visible');
          observer.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    nodes.forEach((node) => observer.observe(node));

    // Safety net: if anything is still hidden after a few seconds (an observer
    // that never fired, a print request, an odd viewport), just show it.
    const failsafe = window.setTimeout(() => {
      nodes.forEach((node) => node.classList.add('is-visible'));
    }, 4000);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return null;
}
