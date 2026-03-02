# filippoteodoro.com

Personal website. Built with Next.js, deployed on Vercel. Contact form protected by Google reCAPTCHA v3, emails delivered via Web3Forms.

## Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Contact form**: Web3Forms
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
| `WEB3FORMS_ACCESS_KEY` | Web3Forms access key (server-side only) |

Set these in Vercel → Project Settings → Environment Variables.

## First-time setup checklist

- [ ] Get reCAPTCHA v3 keys at https://www.google.com/recaptcha/admin
- [ ] Get a Web3Forms access key at https://web3forms.com (free, no domain verification)
- [ ] Add all three env vars in Vercel → Project Settings → Environment Variables
- [ ] Connect the repo to a Vercel project and add the domain `filippoteodoro.com`
