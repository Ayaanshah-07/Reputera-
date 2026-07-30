import type { Service } from '@/lib/site';

const paths: Record<Service['icon'], React.ReactNode> = {
  code: (
    <>
      <path d="M9 8 4 12.5 9 17" />
      <path d="M15 8l5 4.5-5 4.5" />
      <path d="M13 5.5 11 19.5" />
    </>
  ),
  mobile: (
    <>
      <rect x="6.5" y="2.75" width="11" height="18.5" rx="2.6" />
      <path d="M10.6 5.6h2.8" />
      <path d="M12 18.1h.01" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.2 9.8h17.6M3.2 14.2h17.6" />
      <path d="M12 3c2.4 2.6 3.6 5.6 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.6-3.6-9S9.6 5.6 12 3Z" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3.2 13.7 9l5.8 1.7-5.8 1.7L12 18.2l-1.7-5.8L4.5 10.7 10.3 9 12 3.2Z" />
      <path d="M18.5 16.4l.7 2.2 2.2.7-2.2.7-.7 2.2-.7-2.2-2.2-.7 2.2-.7.7-2.2Z" />
    </>
  ),
};

export default function ServiceIcon({ icon, size = 26 }: { icon: Service['icon']; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[icon]}
    </svg>
  );
}
