import { NextRequest, NextResponse } from 'next/server'
import { content } from '@/lib/content'

export const dynamic = 'force-dynamic'

type RecaptchaVerifyResponse = {
  success: boolean
  score?: number
  action?: string
  hostname?: string
}
type VerifyCaptchaRequestBody = { token?: string }

const DEFAULT_HOSTNAMES = [new URL(content.url).hostname, 'localhost']
const MIN_RECAPTCHA_SCORE = 0.5
const CAPTCHA_ACTION = 'contact_form'
const FAILURE_RESPONSE = { success: false } as const
const SUCCESS_RESPONSE = { success: true } as const

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

function errorResponse(status: 400 | 500): NextResponse {
  return NextResponse.json(FAILURE_RESPONSE, { status })
}

function isCaptchaResponseValid(
  data: RecaptchaVerifyResponse,
  expectedHostnames: string[]
): boolean {
  if (!data.success) return false
  if (typeof data.score !== 'number' || data.score < MIN_RECAPTCHA_SCORE) return false
  if (data.action !== CAPTCHA_ACTION) return false
  return hostnameMatches(data.hostname, expectedHostnames)
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { token } = (await req.json()) as VerifyCaptchaRequestBody
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  const expectedHostnames = parseExpectedHostnames()

  if (!token) {
    return errorResponse(400)
  }

  if (!secretKey) {
    return errorResponse(500)
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

    if (!isCaptchaResponseValid(data, expectedHostnames)) {
      return errorResponse(400)
    }

    return NextResponse.json(SUCCESS_RESPONSE)
  } catch {
    return errorResponse(500)
  }
}
