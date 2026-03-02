'use client'

import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useState, FormEvent, useCallback } from 'react'

function Form() {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [fields, setFields] = useState({ email: '', message: '' })

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!executeRecaptcha) return
    setStatus('loading')

    try {
      const token = await executeRecaptcha('contact_form')
      const verify = await fetch('/api/verify-captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      if (!verify.ok) { setStatus('error'); return }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          ...fields,
          subject: `New message from ${fields.email}`,
        }),
      })
      const data = await res.json()
      setStatus(data.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }, [executeRecaptcha, fields])

  if (status === 'success') {
    return <p className="text-sm text-gray-500 dark:text-gray-400">Thanks — I&apos;ll get back to you soon.</p>
  }

  const inputClass = "w-full border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:focus:ring-gray-400 transition"

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label htmlFor="email" className="block text-xs text-gray-400 dark:text-gray-500 mb-1.5">Email</label>
        <input
          id="email"
          type="email"
          required
          value={fields.email}
          onChange={e => setFields(f => ({ ...f, email: e.target.value }))}
          className={inputClass}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs text-gray-400 dark:text-gray-500 mb-1.5">Message</label>
        <textarea
          id="message"
          required
          rows={5}
          value={fields.message}
          onChange={e => setFields(f => ({ ...f, message: e.target.value }))}
          className={`${inputClass} resize-none`}
          placeholder="What's on your mind?"
        />
      </div>

      {status === 'error' && (
        <p className="text-xs text-red-500">Something went wrong — please try again later.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-gray-600 dark:bg-gray-200 text-white dark:text-gray-900 px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-500 dark:hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </button>

    </form>
  )
}

export default function ContactForm() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
      <Form />
    </GoogleReCaptchaProvider>
  )
}
