'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const ContactForm = dynamic(() => import('./ContactForm'), {
  ssr: false,
  loading: function ContactFormLoading() {
    return <ContactFormPlaceholder isLoading />
  },
})

type ContactFormPlaceholderProps = Readonly<{
  isLoading?: boolean
  onActivate?: () => void
}>

const PLACEHOLDER_PANEL_CLASS =
  'rounded-2xl border border-gray-200/80 bg-gray-50/80 px-4 py-4 text-sm text-gray-500 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-400'
const PLACEHOLDER_BUTTON_CLASS =
  'inline-flex rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-600 transition hover:border-gray-300 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-100 dark:focus:ring-gray-400'
const FORM_LOAD_ROOT_MARGIN = '240px 0px'

function ContactFormPlaceholder({
  isLoading,
  onActivate,
}: ContactFormPlaceholderProps): React.JSX.Element {
  return (
    <div className={PLACEHOLDER_PANEL_CLASS}>
      <p>
        {isLoading
          ? 'Loading the contact form...'
          : 'The contact form loads on demand to keep the homepage light.'}
      </p>
      {!isLoading && onActivate ? (
        <button type="button" onClick={onActivate} className={`${PLACEHOLDER_BUTTON_CLASS} mt-4`}>
          Load form
        </button>
      ) : null}
    </div>
  )
}

export default function DeferredContactForm(): React.JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null)
  const [shouldLoadForm, setShouldLoadForm] = useState(false)

  function activateForm(): void {
    setShouldLoadForm(true)
  }

  useEffect(
    function observeContactSection(): (() => void) | void {
      if (shouldLoadForm) {
        return
      }

      const rootElement = rootRef.current

      if (!rootElement) {
        return
      }

      const observer = new IntersectionObserver(
        function handleIntersection(entries): void {
          if (entries.some(entry => entry.isIntersecting)) {
            activateForm()
            observer.disconnect()
          }
        },
        { rootMargin: FORM_LOAD_ROOT_MARGIN }
      )

      observer.observe(rootElement)

      return function cleanupObserver(): void {
        observer.disconnect()
      }
    },
    [shouldLoadForm]
  )

  return (
    <div ref={rootRef} onPointerEnter={activateForm} onFocus={activateForm}>
      {shouldLoadForm ? <ContactForm /> : <ContactFormPlaceholder onActivate={activateForm} />}
    </div>
  )
}
