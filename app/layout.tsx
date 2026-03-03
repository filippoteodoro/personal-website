import type { Metadata } from 'next'
import { Saira } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const saira = Saira({ subsets: ['latin'], weight: ['300', '400', '500', '600'] })

export const metadata: Metadata = {
  title: 'Filippo Teodoro',
  description: 'Personal website of Filippo Teodoro.', // TODO: update
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={saira.className}>{children}</body>
      <GoogleAnalytics gaId="G-GMFJT73TES" />
      <Analytics />
    </html>
  )
}
