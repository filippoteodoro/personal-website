import type { Metadata, Viewport } from 'next'
import { Courier_Prime } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const courierPrime = Courier_Prime({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Filippo Teodoro',
  description: 'Strategy at Sky. Builder. Curious about everything.',
  metadataBase: new URL('https://filippoteodoro.com'),
  openGraph: {
    title: 'Filippo Teodoro',
    description: 'Strategy at Sky. Builder. Curious about everything.',
    url: 'https://filippoteodoro.com',
    siteName: 'Filippo Teodoro',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Filippo Teodoro',
    description: 'Strategy at Sky. Builder. Curious about everything.',
    creator: '@FilippoTeodoro',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={courierPrime.className}>
        {children}
        <GoogleAnalytics gaId="G-GMFJT73TES" />
        <Analytics />
      </body>
    </html>
  )
}
