import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

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

  // Forward to Web3Forms
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: process.env.WEB3FORMS_ACCESS_KEY,
      name,
      email,
      message,
      subject: `New message from ${name}`,
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
