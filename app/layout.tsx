import type { Metadata } from 'next'
import { Geom } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geom = Geom({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Filippo Teodoro',
  description: 'Personal website of Filippo Teodoro.', // TODO: update
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geom.className}>{children}</body>
      <GoogleAnalytics gaId="G-GMFJT73TES" />
      <Analytics />
    </html>
  )
}
