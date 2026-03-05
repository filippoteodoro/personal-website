import { NextRequest, NextResponse } from 'next/server'
import { content } from '@/lib/content'

export const dynamic = 'force-dynamic'

type RecaptchaVerifyResponse = {
  success: boolean
  score?: number
  action?: string
  hostname?: string
}

const DEFAULT_HOSTNAMES = [new URL(content.url).hostname, 'localhost']

function parseExpectedHostnames(): string[] {
  const raw = process.env.RECAPTCHA_EXPECTED_HOSTNAMES
  if (!raw) return DEFAULT_HOSTNAMES

  const parsed = raw
    .split(',')
    .map(value => value.trim().toLowerCase())
    .filter(Boolean)

  return parsed.length > 0 ? parsed : DEFAULT_HOSTNAMES
}

function hostnameMatches(hostname: string | undefined, expectedHostnames: string[]): boolean {
  if (!hostname) return false

  const normalized = hostname.toLowerCase()
  return expectedHostnames.some(expected => normalized === expected || normalized.endsWith(`.${expected}`))
}

export async function POST(req: NextRequest) {
  const { token } = await req.json()
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  const expectedHostnames = parseExpectedHostnames()

  if (!token) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  if (!secretKey) {
    return NextResponse.json({ success: false }, { status: 500 })
  }

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    })

    const data = await res.json() as RecaptchaVerifyResponse

    if (!data.success || typeof data.score !== 'number' || data.score < 0.5) {
      return NextResponse.json({ success: false }, { status: 400 })
    }

    if (data.action !== 'contact_form') {
      return NextResponse.json({ success: false }, { status: 400 })
    }

    if (!hostnameMatches(data.hostname, expectedHostnames)) {
      return NextResponse.json({ success: false }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
