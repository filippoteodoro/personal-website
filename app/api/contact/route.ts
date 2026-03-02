import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const { email, message, token } = await req.json()

  if (!email || !message || !token) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
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

  const data = await res.json()

  if (!res.ok || !data.success) {
    return NextResponse.json({ error: `Web3Forms error: ${JSON.stringify(data)}` }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
