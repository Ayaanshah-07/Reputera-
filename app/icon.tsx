import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/**
 * Placeholder favicon matching the placeholder nav mark.
 * TODO(brand): replace this file with the real icon — drop `icon.png`
 * (or `icon.svg`) into /app and delete this route.
 */
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
          borderRadius: 8,
          border: '2px solid #34e3f5',
          color: '#34e3f5',
          fontSize: 20,
          fontWeight: 700,
          fontFamily: 'sans-serif',
        }}
      >
        R
      </div>
    ),
    size,
  );
}
