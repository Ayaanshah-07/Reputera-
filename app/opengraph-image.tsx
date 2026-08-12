import { ImageResponse } from 'next/og';
import { markDataUri } from '@/lib/brand';
import { site } from '@/lib/site';

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Default social card. Individual pages inherit this via lib/seo.ts. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: '#070b18',
          backgroundImage:
            'radial-gradient(900px 500px at 10% -10%, rgba(34,211,238,0.28), transparent 60%), radial-gradient(700px 450px at 95% 10%, rgba(245,185,66,0.20), transparent 60%)',
          color: '#f2f7ff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markDataUri} width={64} height={64} alt="" />
          <div style={{ display: 'flex', fontSize: 38, fontWeight: 600, letterSpacing: '-0.03em' }}>
            <span>Reputera</span>
            <span style={{ color: '#f5b942' }}>.</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 74, fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.05 }}>
            Where ideas earn
          </div>
          {/* Satori requires an explicit display on any element with more than one child. */}
          <div
            style={{
              display: 'flex',
              gap: 18,
              fontSize: 74,
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
            }}
          >
            <span>their</span>
            <span style={{ color: '#34e3f5' }}>reputation.</span>
          </div>
          <div style={{ marginTop: 26, fontSize: 30, color: '#93a3be' }}>
            Custom software, apps, websites &amp; AI — built around your business.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 26 }}>
          <div
            style={{
              padding: '10px 24px',
              borderRadius: 999,
              background: '#f5b942',
              color: '#04070f',
              fontWeight: 700,
            }}
          >
            Get a Demo
          </div>
          <div style={{ color: '#93a3be' }}>A visual demo of your idea in 24–72 hours</div>
        </div>
      </div>
    ),
    size,
  );
}
