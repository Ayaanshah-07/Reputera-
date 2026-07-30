'use client';

import { useState } from 'react';
import styles from './DemoForm.module.css';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const topics = [
  'A new project',
  'An existing system or rebuild',
  'AI solutions',
  'Reputera Reviews',
  'Partnership or supplier enquiry',
  'Something else',
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    message: '',
    website: '', // honeypot
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const setField = (key: keyof typeof values, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};
    if (!values.name.trim()) nextErrors.name = 'Your name, please.';
    if (!emailPattern.test(values.email.trim())) nextErrors.email = 'A valid email address is required.';
    if (values.message.trim().length < 20) nextErrors.message = 'Tell us a little more — 20 characters minimum.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
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
      setMessage('That did not send. Please email hello@reputera.com directly and we will pick it up.');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.success} role="status">
        <span className={styles.tick} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m4.5 12.5 5 5 10-11" />
          </svg>
        </span>
        <h2>Message received.</h2>
        <p>{message || 'Thanks — we will come back to you within one business day.'}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Send us a message</legend>

        <div className={styles.twoUp}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Full name
            </label>
            <input
              id="name"
              className={styles.input}
              value={values.name}
              onChange={(event) => setField('name', event.target.value)}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={values.email}
              onChange={(event) => setField('email', event.target.value)}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor="phone" className={styles.label}>
              Phone <span className={styles.optional}>(optional)</span>
            </label>
            <input
              id="phone"
              type="tel"
              className={styles.input}
              value={values.phone}
              onChange={(event) => setField('phone', event.target.value)}
              autoComplete="tel"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="topic" className={styles.label}>
              What is it about?
            </label>
            <div className={styles.selectWrap}>
              <select
                id="topic"
                className={styles.input}
                value={values.topic}
                onChange={(event) => setField('topic', event.target.value)}
              >
                <option value="">Select a topic…</option>
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="message" className={styles.label}>
            Message
          </label>
          <textarea
            id="message"
            rows={7}
            className={`${styles.input} ${styles.textarea}`}
            style={{ minHeight: '10rem' }}
            value={values.message}
            onChange={(event) => setField('message', event.target.value)}
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message && <p className={styles.error}>{errors.message}</p>}
        </div>

        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => setField('website', event.target.value)}
          />
        </div>
      </fieldset>

      <div className={styles.submitRow}>
        <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </button>
        <p className={styles.submitNote}>We reply within one business day.</p>
      </div>

      {status === 'error' && (
        <p className={styles.formError} role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
