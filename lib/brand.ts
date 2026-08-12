/**
 * The official Reputera mark, in one place.
 *
 * Components render it as inline JSX (see components/Logo.tsx) so it inherits
 * colour and needs no extra request. The generated favicon and social card run
 * through Satori, which renders an <img> reliably but only partially supports
 * inline SVG — so those use the data URI below.
 *
 * A standalone copy also lives at /public/logo.svg for anything outside the
 * app: email signatures, social profiles, third-party listings.
 */

export const brandGradient = { from: '#34e3f5', to: '#f5b942' } as const;

export const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
<defs><linearGradient id="m" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
<stop offset="0%" stop-color="${brandGradient.from}"/><stop offset="100%" stop-color="${brandGradient.to}"/>
</linearGradient></defs>
<rect x="1.5" y="1.5" width="37" height="37" rx="11" stroke="url(#m)" stroke-width="2"/>
<path d="M14 28V12h7.5a5 5 0 0 1 0 10H17l7 6" stroke="url(#m)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

/** Base64 data URI — Satori (next/og) renders this in <img>. */
export const markDataUri = `data:image/svg+xml;base64,${Buffer.from(markSvg).toString('base64')}`;
