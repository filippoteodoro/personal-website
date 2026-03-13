'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const GoogleAnalytics = dynamic(
  () => import('@next/third-parties/google').then(module => module.GoogleAnalytics),
  { ssr: false }
)
const VercelAnalytics = dynamic(
  () => import('@vercel/analytics/react').then(module => module.Analytics),
  { ssr: false }
)

type DeferredAnalyticsProps = Readonly<{
  gaId?: string
}>

const ANALYTICS_DELAY_MS = 2500

export default function DeferredAnalytics({
  gaId,
}: DeferredAnalyticsProps): React.JSX.Element | null {
  const [shouldLoadAnalytics, setShouldLoadAnalytics] = useState(false)

  useEffect(function deferAnalyticsLoad(): () => void {
    const runtimeWindow = window as Window &
      typeof globalThis & {
        cancelIdleCallback?: (handle: number) => void
        requestIdleCallback?: (
          callback: IdleRequestCallback,
          options?: IdleRequestOptions
        ) => number
      }
    let timeoutId: number | null = null
    let idleId: number | null = null

    function enableAnalytics(): void {
      setShouldLoadAnalytics(true)
    }

    function scheduleAnalyticsLoad(): void {
      timeoutId = runtimeWindow.setTimeout(function queueIdleAnalyticsLoad(): void {
        if (runtimeWindow.requestIdleCallback) {
          idleId = runtimeWindow.requestIdleCallback(enableAnalytics, {
            timeout: ANALYTICS_DELAY_MS,
          })
          return
        }

        enableAnalytics()
      }, ANALYTICS_DELAY_MS)
    }

    if (document.readyState === 'complete') {
      scheduleAnalyticsLoad()
    } else {
      runtimeWindow.addEventListener('load', scheduleAnalyticsLoad, { once: true })
    }

    runtimeWindow.addEventListener('keydown', enableAnalytics, { once: true })
    runtimeWindow.addEventListener('pointerdown', enableAnalytics, {
      once: true,
      passive: true,
    })

    return function cleanupDeferredAnalytics(): void {
      runtimeWindow.removeEventListener('load', scheduleAnalyticsLoad)
      runtimeWindow.removeEventListener('keydown', enableAnalytics)
      runtimeWindow.removeEventListener('pointerdown', enableAnalytics)

      if (timeoutId !== null) {
        runtimeWindow.clearTimeout(timeoutId)
      }

      if (idleId !== null && runtimeWindow.cancelIdleCallback) {
        runtimeWindow.cancelIdleCallback(idleId)
      }
    }
  }, [])

  if (!shouldLoadAnalytics) {
    return null
  }

  return (
    <>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      <VercelAnalytics />
    </>
  )
}
