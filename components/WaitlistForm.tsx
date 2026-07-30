'use client';

import { useState } from 'react';
import styles from './WaitlistForm.module.css';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function WaitlistForm() {
  const [values, setValues] = useState({ name: '', email: '', business: '', website: '' });
  const [error, setError] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const setField = (key: keyof typeof values, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setError('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values.name.trim()) {
      setError('Your name, please.');
      return;
    }
    if (!emailPattern.test(values.email.trim())) {
      setError('A valid email address is required.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) throw new Error(data.message);

      setStatus('success');
      setMessage(data.message || '');
    } catch {
      setStatus('error');
      setError('That did not send. Email hello@reputera.com and we will add you manually.');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.success} role="status">
        <h3>You&apos;re on the list.</h3>
        <p>{message || 'We will email you when Reputera Reviews opens up — early access goes out in order.'}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="wl-name" className={styles.label}>
            Name
          </label>
          <input
            id="wl-name"
            className={styles.input}
            value={values.name}
            onChange={(event) => setField('name', event.target.value)}
            autoComplete="name"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="wl-email" className={styles.label}>
            Email
          </label>
          <input
            id="wl-email"
            type="email"
            className={styles.input}
            value={values.email}
            onChange={(event) => setField('email', event.target.value)}
            autoComplete="email"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="wl-business" className={styles.label}>
            Business <span className={styles.optional}>(optional)</span>
          </label>
          <input
            id="wl-business"
            className={styles.input}
            value={values.business}
            onChange={(event) => setField('business', event.target.value)}
            autoComplete="organization"
          />
        </div>
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="wl-website">Website</label>
        <input
          id="wl-website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => setField('website', event.target.value)}
        />
      </div>

      <div className={styles.actions}>
        <button type="submit" className="btn btn-amber btn-lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Adding you…' : 'Join the waitlist'}
        </button>
        <p className={styles.note}>No spam. One email when it launches.</p>
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
