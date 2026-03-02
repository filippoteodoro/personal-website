# filippoteodoro.com

Personal website. Built with Next.js, deployed on Vercel. Contact form protected by Google reCAPTCHA v3, emails sent via Resend.

## Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Email**: Resend
- **Spam protection**: Google reCAPTCHA v3

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

## Environment variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 public key (safe to expose) |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA v3 secret key (server-side only) |
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_EMAIL_TO` | Email address that receives contact form submissions |

Set these in Vercel → Project Settings → Environment Variables.

## First-time setup checklist

- [ ] Get reCAPTCHA v3 keys at https://www.google.com/recaptcha/admin
- [ ] Create a Resend account and verify `filippoteodoro.com` as a sending domain
- [ ] Get a Resend API key and add it to Vercel env vars
- [ ] Add the four Resend DKIM/SPF records to your Vercel DNS dashboard
- [ ] Connect the repo to a Vercel project and add the domain
- [ ] Fill in your bio and links in `app/page.tsx`
