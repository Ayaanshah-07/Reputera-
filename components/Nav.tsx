'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import { primaryNav } from '@/lib/site';
import styles from './Nav.module.css';

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);

  // Close everything on navigation.
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Dismiss the desktop dropdown on outside click or Escape.
  useEffect(() => {
    if (!servicesOpen) return;
    const onClick = (event: MouseEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setServicesOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [servicesOpen]);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.bar}`}>
        <Logo />

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.navList}>
            {primaryNav.map((item) =>
              item.children ? (
                <li key={item.href} ref={servicesRef} className={styles.hasChildren}>
                  <button
                    type="button"
                    className={`${styles.navLink} ${isActive(item.href) ? styles.active : ''}`}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    onClick={() => setServicesOpen((value) => !value)}
                  >
                    {item.label}
                    <svg
                      className={`${styles.chevron} ${servicesOpen ? styles.chevronOpen : ''}`}
                      viewBox="0 0 12 12"
                      aria-hidden="true"
                    >
                      <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div className={`${styles.dropdown} ${servicesOpen ? styles.dropdownOpen : ''}`}>
                    <Link href="/services" className={styles.dropdownLead}>
                      All services
                      <span>Everything we build, in one place.</span>
                    </Link>
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className={styles.dropdownLink}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${isActive(item.href) ? styles.active : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href="/get-a-demo" className={`btn btn-primary ${styles.cta}`}>
            Get a Demo
          </Link>
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className={`${styles.burger} ${open ? styles.burgerOpen : ''}`} aria-hidden="true" />
          </button>
        </div>
      </div>
      </header>

      {/*
        Rendered as a sibling of <header>, not inside it. The scrolled header
        applies backdrop-filter, which makes it a containing block for
        position: fixed descendants — nested here, the menu sized itself against
        the 73px header instead of the viewport and collapsed to a sliver.
      */}
      <div id="mobile-menu" className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ''}`} hidden={!open}>
        <nav className="container" aria-label="Mobile">
          <ul className={styles.mobileList}>
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.mobileLink}>
                  {item.label}
                </Link>
                {item.children && (
                  <ul className={styles.mobileSublist}>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className={styles.mobileSublink}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link href="/get-a-demo" className="btn btn-primary btn-lg btn-block">
            Get a Demo
          </Link>
          <p className={styles.mobileNote}>A visual demo of your idea in 24–72 hours.</p>
        </nav>
      </div>
    </>
  );
}
