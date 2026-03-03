import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default async function Icon() {
  // Fetch TTF directly from Google Fonts GitHub (stable, Satori-compatible format)
  const fontData = await fetch(
    'https://raw.githubusercontent.com/google/fonts/main/ofl/courierprime/CourierPrime-Bold.ttf'
  ).then(r => r.arrayBuffer()).catch(() => null)

  return new ImageResponse(
    <div
      style={{
        background: '#111111',
        color: '#ffffff',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 17,
        fontFamily: fontData ? 'Courier Prime' : '"Courier New", Courier, monospace',
        fontWeight: 700,
      }}
    >
      FT
    </div>,
    {
      ...size,
      fonts: fontData
        ? [{ name: 'Courier Prime', data: fontData, style: 'normal' as const, weight: 700 as const }]
        : [],
    }
  )
}
