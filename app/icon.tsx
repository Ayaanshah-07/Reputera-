import { ImageResponse } from 'next/og';
import { markDataUri } from '@/lib/brand';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

/** Browser-tab icon: the Reputera mark on the brand navy. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#070b18',
          borderRadius: 12,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markDataUri} width={52} height={52} alt="" />
      </div>
    ),
    size,
  );
}
