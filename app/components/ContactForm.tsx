'use client'

import { useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react'

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, opts: { action: string }) => Promise<string>
    }
  }
}

type FormStatus = 'idle' | 'loading' | 'success'

type FormFields = {
  email: string
  message: string
}

type FieldName = keyof FormFields
type FieldErrors = Record<FieldName, string>
type TouchedFields = Record<FieldName, boolean>

type FeedbackPanelProps = Readonly<{
  title: string
  messages: string[]
}>

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const EMPTY_FIELDS: FormFields = { email: '', message: '' }
const UNTOUCHED_FIELDS: TouchedFields = { email: false, message: false }
const SUBMISSION_ERROR_MESSAGE = 'The note did not go through. Try again in a minute.'
const INPUT_CLASS =
  'w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:ring-gray-400'
const INPUT_ERROR_CLASS =
  'border-rose-300 bg-rose-50/70 text-rose-950 placeholder:text-rose-300 focus:ring-rose-300 dark:border-rose-400/40 dark:bg-rose-950/30 dark:text-rose-50 dark:placeholder:text-rose-200/40 dark:focus:ring-rose-300/40'
const LABEL_CLASS = 'mb-1.5 block text-xs transition-colors'
const FEEDBACK_PANEL_CLASS =
  'rounded-2xl border border-rose-200/80 bg-rose-50/75 px-4 py-3 backdrop-blur-sm dark:border-rose-400/20 dark:bg-rose-500/10'
const FEEDBACK_TITLE_CLASS =
  'text-[11px] font-medium uppercase tracking-[0.24em] text-rose-700 dark:text-rose-100/90'
const FEEDBACK_MESSAGE_CLASS =
  'rounded-full border border-rose-200/80 bg-white/70 px-3 py-1 text-xs text-rose-700 dark:border-rose-300/15 dark:bg-white/5 dark:text-rose-100'
const INLINE_ERROR_CLASS =
  'mt-2 inline-flex rounded-full border border-rose-200/80 bg-rose-50/80 px-2.5 py-1 text-[11px] text-rose-700 dark:border-rose-300/15 dark:bg-rose-500/10 dark:text-rose-100'

function validateEmail(value: string): boolean {
  return EMAIL_REGEX.test(value)
}

function getEmailError(value: string): string {
  const normalizedValue = value.trim()

  if (!normalizedValue) {
    return 'Need your email so I can write back'
  }

  if (!validateEmail(normalizedValue)) {
    return 'That email does not look valid yet'
  }

  return ''
}

function getMessageError(value: string): string {
  if (!value.trim()) {
    return 'Write a message before sending'
  }

  return ''
}

function getFieldErrors(fields: FormFields): FieldErrors {
  return {
    email: getEmailError(fields.email),
    message: getMessageError(fields.message),
  }
}

function getVisibleFieldErrors(fieldErrors: FieldErrors, touchedFields: TouchedFields): FieldErrors {
  return {
    email: touchedFields.email ? fieldErrors.email : '',
    message: touchedFields.message ? fieldErrors.message : '',
  }
}

function hasFieldErrors(fieldErrors: FieldErrors): boolean {
  return Boolean(fieldErrors.email || fieldErrors.message)
}

function getFirstInvalidFieldName(fieldErrors: FieldErrors): FieldName | null {
  if (fieldErrors.email) {
    return 'email'
  }

  if (fieldErrors.message) {
    return 'message'
  }

  return null
}

function getInputClassName(hasError: boolean): string {
  if (hasError) {
    return `${INPUT_CLASS} ${INPUT_ERROR_CLASS}`
  }

  return INPUT_CLASS
}

function getLabelClassName(hasError: boolean): string {
  if (hasError) {
    return `${LABEL_CLASS} text-rose-700 dark:text-rose-100`
  }

  return `${LABEL_CLASS} text-gray-600 dark:text-gray-400`
}

function FeedbackPanel({ title, messages }: FeedbackPanelProps): React.JSX.Element {
  return (
    <div className={FEEDBACK_PANEL_CLASS} aria-live="polite">
      <p className={FEEDBACK_TITLE_CLASS}>{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {messages.map(function renderMessage(message): React.JSX.Element {
          return (
            <p key={message} className={FEEDBACK_MESSAGE_CLASS}>
              {message}
            </p>
          )
        })}
      </div>
    </div>
  )
}

export default function ContactForm(): React.JSX.Element {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!
  const loadedRef = useRef(false)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const messageInputRef = useRef<HTMLTextAreaElement>(null)

  const [scriptReady, setScriptReady] = useState(false)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [fields, setFields] = useState<FormFields>(EMPTY_FIELDS)
  const [touchedFields, setTouchedFields] = useState<TouchedFields>(UNTOUCHED_FIELDS)
  const [submissionError, setSubmissionError] = useState('')

  const fieldErrors = getFieldErrors(fields)
  const visibleFieldErrors = getVisibleFieldErrors(fieldErrors, touchedFields)

  function clearSubmissionError(): void {
    setSubmissionError('')
  }

  function focusField(fieldName: FieldName): void {
    if (fieldName === 'email') {
      emailInputRef.current?.focus()
      return
    }

    messageInputRef.current?.focus()
  }

  function loadRecaptcha(): void {
    if (loadedRef.current) {
      return
    }

    loadedRef.current = true
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.onload = function handleRecaptchaLoad(): void {
      setScriptReady(true)
    }
    document.head.appendChild(script)
  }

  function updateField(fieldName: FieldName, value: string): void {
    setFields(function updateFields(current): FormFields {
      return {
        ...current,
        [fieldName]: value,
      }
    })

    clearSubmissionError()
  }

  function markFieldAsTouched(fieldName: FieldName): void {
    setTouchedFields(function updateTouchedFields(current): TouchedFields {
      if (current[fieldName]) {
        return current
      }

      return {
        ...current,
        [fieldName]: true,
      }
    })
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
    updateField('email', event.target.value)
  }

  function handleMessageChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    updateField('message', event.target.value)
  }

  function handleEmailBlur(_event: FocusEvent<HTMLInputElement>): void {
    markFieldAsTouched('email')
  }

  function handleMessageBlur(_event: FocusEvent<HTMLTextAreaElement>): void {
    markFieldAsTouched('message')
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    clearSubmissionError()

    if (hasFieldErrors(fieldErrors)) {
      const firstInvalidField = getFirstInvalidFieldName(fieldErrors)

      if (firstInvalidField) {
        markFieldAsTouched(firstInvalidField)
        focusField(firstInvalidField)
      }

      return
    }

    if (!window.grecaptcha) {
      setSubmissionError('The form is still waking up. Give it one more second.')
      return
    }

    setStatus('loading')

    try {
      await new Promise<void>(function resolveWhenRecaptchaReady(resolve): void {
        window.grecaptcha.ready(resolve)
      })
      const token = await window.grecaptcha.execute(siteKey, { action: 'contact_form' })

      const verifyResponse = await fetch('/api/verify-captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })

      if (!verifyResponse.ok) {
        setStatus('idle')
        setSubmissionError(SUBMISSION_ERROR_MESSAGE)
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
      if (!submitResult.success) {
        setStatus('idle')
        setSubmissionError(SUBMISSION_ERROR_MESSAGE)
        return
      }

      setStatus('success')
    } catch {
      setStatus('idle')
      setSubmissionError(SUBMISSION_ERROR_MESSAGE)
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-gray-200/80 bg-gray-50/80 px-4 py-3 text-sm text-gray-500 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-400">
        Thanks - I&apos;ll get back to you soon.
      </div>
    )
  }

  return (
    <div onPointerEnter={loadRecaptcha} onFocus={loadRecaptcha}>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {submissionError ? <FeedbackPanel title="Not through yet" messages={[submissionError]} /> : null}

        <div>
          <label htmlFor="email" className={getLabelClassName(Boolean(visibleFieldErrors.email))}>
            Email
          </label>
          <input
            ref={emailInputRef}
            id="email"
            type="email"
            required
            aria-invalid={Boolean(visibleFieldErrors.email)}
            aria-describedby={visibleFieldErrors.email ? 'contact-email-error' : undefined}
            value={fields.email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            className={getInputClassName(Boolean(visibleFieldErrors.email))}
            placeholder="you@example.com"
          />
          {visibleFieldErrors.email ? (
            <p id="contact-email-error" className={INLINE_ERROR_CLASS}>
              {visibleFieldErrors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="message" className={getLabelClassName(Boolean(visibleFieldErrors.message))}>
            Message
          </label>
          <textarea
            ref={messageInputRef}
            id="message"
            required
            rows={5}
            aria-invalid={Boolean(visibleFieldErrors.message)}
            aria-describedby={visibleFieldErrors.message ? 'contact-message-error' : undefined}
            value={fields.message}
            onChange={handleMessageChange}
            onBlur={handleMessageBlur}
            className={`${getInputClassName(Boolean(visibleFieldErrors.message))} resize-none`}
            placeholder="What's on your mind?"
          />
          {visibleFieldErrors.message ? (
            <p id="contact-message-error" className={INLINE_ERROR_CLASS}>
              {visibleFieldErrors.message}
            </p>
          ) : null}
        </div>

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
