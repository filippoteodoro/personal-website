# filippoteodoro.com

Personal website built with Next.js and deployed on Vercel.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Font | Courier Prime (Google Fonts) |
| Contact form | Web3Forms |
| Spam protection | Google reCAPTCHA v3 (server-side verification) |
| Analytics | Google Analytics 4 + Vercel Web Analytics |
| Deployment | Vercel |

## Architecture

```text
app/
  api/verify-captcha/route.ts  # Server-side reCAPTCHA verification
  components/ContactForm.tsx   # Contact form UI + client-side token flow
  icon.tsx                     # Dynamic favicon
  llms.txt/route.ts            # Dynamic llms.txt
  layout.tsx                   # Root layout, metadata, analytics
  page.tsx                     # Homepage
  robots.ts                    # robots.txt
  sitemap.ts                   # sitemap.xml
lib/
  content.ts                   # Source of truth for bio/links/metadata
```

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID (public identifier). Leave empty to disable GA. |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 public site key (safe to expose). |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA v3 secret key (server-side only). |
| `RECAPTCHA_EXPECTED_HOSTNAMES` | Optional comma-separated hostnames to accept in server verification. Defaults to `filippoteodoro.com,localhost`. |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms access key (safe to expose). |

Set production values in Vercel -> Project Settings -> Environment Variables.

## Security notes

- `verify-captcha` validates reCAPTCHA `success`, `score`, `action`, and `hostname`.
- Security headers are set in `next.config.ts` (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
- `.env` and `.env*.local` are ignored by git.

## Setup checklist

- [ ] Create reCAPTCHA v3 keys at https://www.google.com/recaptcha/admin.
- [ ] Create a Web3Forms access key at https://web3forms.com.
- [ ] Set all required environment variables in Vercel.
- [ ] Enable Vercel Web Analytics in the Vercel project.
- [ ] Connect custom domain `filippoteodoro.com`.