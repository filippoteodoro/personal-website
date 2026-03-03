import type { Metadata, Viewport } from 'next'
import { Courier_Prime } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import { content } from '@/lib/content'
import './globals.css'

const courierPrime = Courier_Prime({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: content.name,
  description: content.description,
  metadataBase: new URL(content.url),
  openGraph: {
    title: content.name,
    description: content.description,
    url: content.url,
    siteName: content.name,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: content.name,
    description: content.description,
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
