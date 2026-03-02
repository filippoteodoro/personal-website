import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const { email, message, token } = await req.json()

  if (!email || !message || !token) {
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

  const recaptchaData = await verifyRes.json() as { success: boolean; score: number; 'error-codes'?: string[] }

  if (!recaptchaData.success || recaptchaData.score < 0.5) {
    return NextResponse.json({ error: `reCAPTCHA failed: ${JSON.stringify(recaptchaData)}` }, { status: 400 })
  }

  // Forward to Web3Forms
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: process.env.WEB3FORMS_ACCESS_KEY,
      email,
      message,
      subject: `New message from ${email}`,
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
