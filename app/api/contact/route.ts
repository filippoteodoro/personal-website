import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { name, email, message, token } = await req.json()

  if (!name || !email || !message || !token) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // Verify reCAPTCHA v3 token
  const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY!,
      response: token,
    }),
  })

  const { success, score } = await verifyRes.json() as { success: boolean; score: number }

  if (!success || score < 0.5) {
    return NextResponse.json({ error: 'reCAPTCHA check failed' }, { status: 400 })
  }

  // Send email via Resend
  const { error } = await resend.emails.send({
    from: 'contact@filippoteodoro.com',
    to: process.env.CONTACT_EMAIL_TO!,
    replyTo: email,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  })

  if (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
