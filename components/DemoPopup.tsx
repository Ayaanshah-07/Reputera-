'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './DemoPopup.module.css';

const DELAY_MS = 10_000;
const STORAGE_KEY = 'reputera:demo-popup-dismissed';
/** Stay away for a week once dismissed, rather than forever or every visit. */
const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function DemoPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<Element | null>(null);

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // Private browsing can throw on write — the popup just reappears later.
    }
  }, []);

  // Schedule it. Never on the demo page itself: the visitor is already there.
  useEffect(() => {
    if (pathname === '/get-a-demo') return;

    let dismissedAt = 0;
    try {
      dismissedAt = Number(window.localStorage.getItem(STORAGE_KEY) ?? 0);
    } catch {
      dismissedAt = 0;
    }
    if (dismissedAt && Date.now() - dismissedAt < SNOOZE_MS) return;

    const timer = window.setTimeout(() => setOpen(true), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  // Close on route change, so it never lingers over a new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Modal behaviour: lock scroll, trap focus, Escape to close, restore focus.
  useEffect(() => {
    if (!open) return;

    returnFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dismiss();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      (returnFocusRef.current as HTMLElement | null)?.focus?.();
    };
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div className={styles.overlay} role="presentation" onClick={dismiss}>
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-popup-title"
        aria-describedby="demo-popup-body"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.glow} aria-hidden="true" />

        <button type="button" className={styles.close} onClick={dismiss} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <p className={styles.eyebrow}>
          <span className={styles.pulse} aria-hidden="true" />
          Free · No obligation
        </p>

        <h2 id="demo-popup-title" className={styles.title}>
          See your idea as a <span className="text-gradient">real demo</span>.
        </h2>

        <p id="demo-popup-body" className={styles.body}>
          Tell us what you want built — a website, an app, custom software or AI — and we send back a
          visual demo of it within <strong>24–72 hours</strong>. Real designed screens, not a proposal.
        </p>

        <ul className={styles.points}>
          <li>Takes a few minutes to describe</li>
          <li>Costs nothing, and yours to keep</li>
          <li>No sales call unless you want one</li>
        </ul>

        <div className={styles.actions}>
          <Link href="/get-a-demo" className="btn btn-primary btn-lg" onClick={dismiss}>
            Get a Demo <span aria-hidden="true">→</span>
          </Link>
          <button type="button" className={styles.later} onClick={dismiss}>
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
