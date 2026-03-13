import type { Metadata, Viewport } from 'next'
import { Courier_Prime } from 'next/font/google'
import DeferredAnalytics from './components/DeferredAnalytics'
import { content } from '@/lib/content'
import './globals.css'

const courierPrime = Courier_Prime({ subsets: ['latin'], weight: ['400', '700'], display: 'optional' })
type RootLayoutProps = Readonly<{ children: React.ReactNode }>

function getGoogleAnalyticsId(): string | undefined {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()
  return gaId || undefined
}

export const metadata: Metadata = {
  title: content.name,
  description: content.description,
  metadataBase: new URL(content.url),
  alternates: {
    canonical: content.url,
  },
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

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  const gaId = getGoogleAnalyticsId()

  return (
    <html lang="en">
      <body className={courierPrime.className}>
        {children}
        <DeferredAnalytics gaId={gaId} />
      </body>
    </html>
  )
}
