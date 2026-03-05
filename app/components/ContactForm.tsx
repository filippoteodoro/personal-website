'use client'

import { useRef, useState, type FormEvent } from 'react'

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, opts: { action: string }) => Promise<string>
    }
  }
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

type FormFields = {
  email: string
  message: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const INPUT_CLASS =
  'w-full border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:focus:ring-gray-400 transition'

function validateEmail(value: string): boolean {
  return EMAIL_REGEX.test(value)
}

export default function ContactForm(): React.JSX.Element {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!
  const loadedRef = useRef(false)

  const [scriptReady, setScriptReady] = useState(false)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [fields, setFields] = useState<FormFields>({ email: '', message: '' })
  const [emailError, setEmailError] = useState('')

  function loadRecaptcha(): void {
    if (loadedRef.current) return

    loadedRef.current = true
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.onload = () => setScriptReady(true)
    document.head.appendChild(script)
  }

  function handleEmailChange(value: string): void {
    setFields(current => ({ ...current, email: value }))
    setEmailError('')
  }

  function handleMessageChange(value: string): void {
    setFields(current => ({ ...current, message: value }))
  }

  function handleEmailBlur(value: string): void {
    if (value && !validateEmail(value)) {
      setEmailError('Please enter a valid email address.')
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()

    if (!window.grecaptcha) {
      setStatus('error')
      return
    }

    if (!validateEmail(fields.email)) {
      setEmailError('Please enter a valid email address.')
      return
    }

    setStatus('loading')

    try {
      await new Promise<void>(resolve => window.grecaptcha.ready(resolve))
      const token = await window.grecaptcha.execute(siteKey, { action: 'contact_form' })

      const verifyResponse = await fetch('/api/verify-captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })

      if (!verifyResponse.ok) {
        setStatus('error')
        return
      }

      const submitResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          ...fields,
          subject: `New message from ${fields.email}`,
        }),
      })

      const submitResult = (await submitResponse.json()) as { success?: boolean }
      setStatus(submitResult.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p className="text-sm text-gray-500 dark:text-gray-400">Thanks - I&apos;ll get back to you soon.</p>
  }

  return (
    <div onPointerEnter={loadRecaptcha} onFocus={loadRecaptcha}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-xs text-gray-600 dark:text-gray-400 mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={fields.email}
            onChange={event => handleEmailChange(event.target.value)}
            onBlur={event => handleEmailBlur(event.target.value)}
            className={INPUT_CLASS}
            placeholder="you@example.com"
          />
          {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-xs text-gray-600 dark:text-gray-400 mb-1.5">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={fields.message}
            onChange={event => handleMessageChange(event.target.value)}
            className={`${INPUT_CLASS} resize-none`}
            placeholder="What's on your mind?"
          />
        </div>

        {status === 'error' && (
          <p className="text-xs text-red-500">Something went wrong - please try again later.</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading' || !scriptReady}
          className="bg-gray-600 dark:bg-gray-200 text-white dark:text-gray-900 px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-500 dark:hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  )
}
