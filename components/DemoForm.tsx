'use client';

import { useMemo, useState } from 'react';
import { budgetRanges, buildOptions, niches } from '@/lib/site';
import styles from './DemoForm.module.css';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const MIN_DESCRIPTION = 150;

const initialValues = {
  build: '',
  niche: '',
  description: '',
  budget: '',
  name: '',
  email: '',
  phone: '',
  company: '',
  /** Honeypot — real users never see or fill this. */
  website: '',
};

type Values = typeof initialValues;
type Errors = Partial<Record<keyof Values, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (!values.build) errors.build = 'Pick what you want built.';
  if (!values.niche.trim()) errors.niche = 'Tell us your business niche.';

  if (!values.description.trim()) {
    errors.description = 'Describe what you want built.';
  } else if (values.description.trim().length < MIN_DESCRIPTION) {
    errors.description = `Add a bit more detail — ${
      MIN_DESCRIPTION - values.description.trim().length
    } more characters. The more you give us, the sharper the demo.`;
  }

  if (!values.budget) errors.budget = 'Choose a budget range.';
  if (!values.name.trim()) errors.name = 'Your name, please.';

  if (!values.email.trim()) {
    errors.email = 'We need an email to send the demo to.';
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'That email address does not look right.';
  }

  if (!values.phone.trim()) {
    errors.phone = 'A phone number, in case we need to clarify something.';
  } else if (values.phone.replace(/[^\d]/g, '').length < 7) {
    errors.phone = 'That phone number looks too short.';
  }

  return errors;
}

export default function DemoForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const descriptionCount = values.description.trim().length;
  const descriptionMet = descriptionCount >= MIN_DESCRIPTION;
  const progress = useMemo(
    () => Math.min(100, Math.round((descriptionCount / MIN_DESCRIPTION) * 100)),
    [descriptionCount],
  );

  const setField = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(firstKey)?.focus();
      document.getElementById(firstKey)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = (await response.json().catch(() => ({}))) as { message?: string };

      if (!response.ok) throw new Error(data.message || 'Request failed');

      setStatus('success');
      setMessage(data.message || '');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setStatus('error');
      setMessage(
        'Something went wrong sending that. Please email hello@reputera.com and we will pick it up straight away.',
      );
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
        <h2>Your demo request is in.</h2>
        <p>
          {message ||
            'We are on it. Expect a visual demo of your idea within 24–72 hours — check your inbox, and your spam folder just in case.'}
        </p>
        <dl className={styles.recap}>
          <div>
            <dt>Building</dt>
            <dd>{buildOptions.find((option) => option.value === values.build)?.label ?? '—'}</dd>
          </div>
          <div>
            <dt>Niche</dt>
            <dd>{values.niche}</dd>
          </div>
          <div>
            <dt>Budget</dt>
            <dd>{values.budget}</dd>
          </div>
          <div>
            <dt>Demo lands</dt>
            <dd>Within 24–72 hours</dd>
          </div>
        </dl>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* ---------------------------------------------------------- step 1 */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          <span className={styles.stepBadge}>1</span>
          What do you want built?
        </legend>
        <p className={styles.hint}>Pick the closest fit. We will tell you if something else suits you better.</p>

        <div className={styles.optionGrid} id="build" tabIndex={-1}>
          {buildOptions.map((option) => (
            <label
              key={option.value}
              className={`${styles.option} ${values.build === option.value ? styles.optionActive : ''}`}
            >
              <input
                type="radio"
                name="build"
                value={option.value}
                checked={values.build === option.value}
                onChange={(event) => setField('build', event.target.value)}
                className={styles.radio}
              />
              <span className={styles.optionLabel}>{option.label}</span>
              <span className={styles.optionDesc}>{option.description}</span>
            </label>
          ))}
        </div>
        {errors.build && <p className={styles.error}>{errors.build}</p>}
      </fieldset>

      {/* ---------------------------------------------------------- step 2 */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          <span className={styles.stepBadge}>2</span>
          What is your business niche?
        </legend>
        <p className={styles.hint}>Choose from the list or type your own — this shapes how the demo looks.</p>

        <div className={styles.field}>
          <label htmlFor="niche" className={styles.label}>
            Business niche
          </label>
          <input
            id="niche"
            name="niche"
            list="niche-options"
            className={styles.input}
            placeholder="e.g. Dental clinic, freight brokerage, boutique gym…"
            value={values.niche}
            onChange={(event) => setField('niche', event.target.value)}
            aria-invalid={Boolean(errors.niche)}
            aria-describedby={errors.niche ? 'niche-error' : undefined}
            autoComplete="organization-title"
          />
          <datalist id="niche-options">
            {niches.map((niche) => (
              <option key={niche} value={niche} />
            ))}
          </datalist>
          {errors.niche && (
            <p className={styles.error} id="niche-error">
              {errors.niche}
            </p>
          )}
        </div>
      </fieldset>

      {/* ---------------------------------------------------------- step 3 */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          <span className={styles.stepBadge}>3</span>
          Describe what you want
        </legend>
        <p className={styles.hint}>
          This is the part that matters most. Tell us what it should do, who uses it, what the current
          process looks like, what annoys you about it, and what a good result would be. Write as much as you
          like — there is no upper limit and detail directly improves the demo.
        </p>

        <div className={styles.field}>
          <label htmlFor="description" className={styles.label}>
            Your description
          </label>
          <textarea
            id="description"
            name="description"
            rows={16}
            className={`${styles.input} ${styles.textarea}`}
            placeholder={
              'For example:\n\n• What the product is, in your own words\n• Who uses it (customers, staff, both)\n• The main things they need to do in it\n• How the process works today and where it breaks\n• Any systems it must connect to\n• What success looks like six months in'
            }
            value={values.description}
            onChange={(event) => setField('description', event.target.value)}
            aria-invalid={Boolean(errors.description)}
            aria-describedby="description-meter"
          />
          <div className={styles.meter} id="description-meter">
            <div className={styles.meterTrack} aria-hidden="true">
              <div
                className={`${styles.meterFill} ${descriptionMet ? styles.meterFillDone : ''}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className={descriptionMet ? styles.meterDone : styles.meterText}>
              {descriptionMet
                ? 'Great — that gives us plenty to work with.'
                : `${descriptionCount} / ${MIN_DESCRIPTION} characters minimum`}
            </span>
          </div>
          {errors.description && <p className={styles.error}>{errors.description}</p>}
        </div>
      </fieldset>

      {/* ---------------------------------------------------------- step 4 */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          <span className={styles.stepBadge}>4</span>
          What is your budget range?
        </legend>
        <p className={styles.hint}>
          An honest range means we scope something you can actually build, not a fantasy. Not sure? Say so —
          we will advise.
        </p>

        <div className={styles.field}>
          <label htmlFor="budget" className={styles.label}>
            Budget range
          </label>
          <div className={styles.selectWrap}>
            <select
              id="budget"
              name="budget"
              className={styles.input}
              value={values.budget}
              onChange={(event) => setField('budget', event.target.value)}
              aria-invalid={Boolean(errors.budget)}
            >
              <option value="">Select a range…</option>
              {budgetRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
          {errors.budget && <p className={styles.error}>{errors.budget}</p>}
        </div>
      </fieldset>

      {/* ---------------------------------------------------------- step 5 */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          <span className={styles.stepBadge}>5</span>
          Where do we send it?
        </legend>

        <div className={styles.twoUp}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Full name
            </label>
            <input
              id="name"
              name="name"
              className={styles.input}
              value={values.name}
              onChange={(event) => setField('name', event.target.value)}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor="company" className={styles.label}>
              Company <span className={styles.optional}>(optional)</span>
            </label>
            <input
              id="company"
              name="company"
              className={styles.input}
              value={values.company}
              onChange={(event) => setField('company', event.target.value)}
              autoComplete="organization"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
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
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              className={styles.input}
              value={values.phone}
              onChange={(event) => setField('phone', event.target.value)}
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone && <p className={styles.error}>{errors.phone}</p>}
          </div>
        </div>

        {/* Honeypot: hidden from users, catches naive bots. */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => setField('website', event.target.value)}
          />
        </div>
      </fieldset>

      <div className={styles.submitRow}>
        <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send my demo request'}
        </button>
        <p className={styles.submitNote}>
          Free, no obligation. We reply with a visual demo within 24–72 hours.
        </p>
      </div>

      {status === 'error' && (
        <p className={styles.formError} role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
