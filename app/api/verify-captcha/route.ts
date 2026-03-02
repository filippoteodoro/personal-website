import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const { token } = await req.json()

  if (!token) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY!,
      response: token,
    }),
  })

  const data = await res.json() as { success: boolean; score: number; 'error-codes'?: string[] }

  if (!data.success || data.score < 0.5) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
