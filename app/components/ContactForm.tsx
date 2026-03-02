'use client'

import { useState, FormEvent } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [fields, setFields] = useState({ email: '', message: '' })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'ba385ecc-fc29-4812-8db7-2a7fe9607b2d',
          ...fields,
          subject: `New message from ${fields.email}`,
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p className="text-sm text-gray-500">Thanks — I&apos;ll get back to you soon.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label htmlFor="email" className="block text-xs text-gray-400 mb-1.5">Email</label>
        <input
          id="email"
          type="email"
          required
          value={fields.email}
          onChange={e => setFields(f => ({ ...f, email: e.target.value }))}
          className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs text-gray-400 mb-1.5">Message</label>
        <textarea
          id="message"
          required
          rows={5}
          value={fields.message}
          onChange={e => setFields(f => ({ ...f, message: e.target.value }))}
          className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition resize-none"
          placeholder="What's on your mind?"
        />
      </div>

      {status === 'error' && (
        <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-gray-900 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </button>

    </form>
  )
}
