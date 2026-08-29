import type { OutcomeIconName } from '@/lib/work';

const paths: Record<OutcomeIconName, React.ReactNode> = {
  automate: (
    <>
      <path d="M4 12a8 8 0 0 1 13.7-5.6" />
      <path d="M20 12a8 8 0 0 1-13.7 5.6" />
      <path d="M17.5 3.5v3.2h-3.2M6.5 20.5v-3.2h3.2" />
    </>
  ),
  merge: (
    <>
      <path d="M4 4h6v6H4zM14 14h6v6h-6z" />
      <path d="M10 7h4a3 3 0 0 1 3 3v4" />
    </>
  ),
  hub: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
    </>
  ),
  scale: (
    <>
      <path d="M3 20V9M9 20V4M15 20v-8M21 20V7" />
    </>
  ),
  field: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10.5 5.5h3M12 18.5h.01" />
    </>
  ),
  capture: (
    <>
      <path d="M3.5 7.75h3l1.5-2.5h8l1.5 2.5h3v11h-17z" />
      <circle cx="12" cy="12.75" r="3.2" />
    </>
  ),
  journey: (
    <>
      <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
      <circle cx="12" cy="7" r="3.5" />
    </>
  ),
  live: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M7.5 7.5a6.5 6.5 0 0 0 0 9M16.5 16.5a6.5 6.5 0 0 0 0-9" />
      <path d="M4.5 4.5a10.5 10.5 0 0 0 0 15M19.5 19.5a10.5 10.5 0 0 0 0-15" />
    </>
  ),
  convert: (
    <>
      <path d="M12 3.5v10M8.5 10 12 13.5 15.5 10" />
      <path d="M4.5 15.5v3a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 4.5 4.5" />
    </>
  ),
  trust: (
    <>
      <path d="M12 3 5 6v6c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6l-7-3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  speed: (
    <>
      <path d="M13 3 5.5 13.5H12L10.5 21 18.5 10H12L13 3Z" />
    </>
  ),
  chat: (
    <>
      <path d="M21.5 12a7.5 7.5 0 0 1-7.5 7.5H9l-4 3v-4.4A7.5 7.5 0 0 1 9.5 4.5h4.5A7.5 7.5 0 0 1 21.5 12Z" />
      <path d="M10 10.5h7M10 14h4.5" />
    </>
  ),
  agent: (
    <>
      <rect x="4.5" y="7.75" width="15" height="12" rx="4" />
      <path d="M12 7.75V4.25" />
      <circle cx="9.5" cy="13.75" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="13.75" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  assistant: (
    <>
      <path d="M4.5 4.75h15v11h-9l-4 3.5v-3.5h-2z" />
      <path d="M9 8.75h6M9 11.75h3.5" />
    </>
  ),
  embed: (
    <>
      <path d="M8.5 8.5 5 12l3.5 3.5M15.5 8.5 19 12l-3.5 3.5" />
      <path d="M13.5 5 10.5 19" />
    </>
  ),
};

export default function OutcomeIcon({ name }: { name: OutcomeIconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
