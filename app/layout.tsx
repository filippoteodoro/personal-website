import type { Metadata } from 'next'
import { Courier_Prime } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const courierPrime = Courier_Prime({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Filippo Teodoro',
  description: 'Personal website of Filippo Teodoro.', // TODO: update
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={courierPrime.className}>{children}</body>
      <GoogleAnalytics gaId="G-GMFJT73TES" />
      <Analytics />
    </html>
  )
}
