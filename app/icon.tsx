import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

async function loadFontData(): Promise<ArrayBuffer | null> {
  try {
    const fontPath = path.join(process.cwd(), 'app/fonts/SF-Mono-Bold.otf')
    const buffer = await readFile(fontPath)
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer
  } catch {
    return null
  }
}

export default async function Icon(): Promise<ImageResponse> {
  const fontData = await loadFontData()

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
        fontFamily: fontData ? 'SF Mono' : '"Courier New", Courier, monospace',
        fontWeight: 700,
      }}
    >
      FT
    </div>,
    {
      ...size,
      fonts: fontData
        ? [{ name: 'SF Mono', data: fontData, style: 'normal' as const, weight: 700 as const }]
        : [],
    }
  )
}
