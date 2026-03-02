# filippoteodoro.com

Personal website. Built with Next.js, deployed on Vercel. Contact form protected by Google reCAPTCHA v3, emails delivered via Web3Forms.

## Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Contact form**: Web3Forms (client-side submission)
- **Spam protection**: Google reCAPTCHA v3 (server-side verification)
- **Analytics**: Google Analytics 4

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
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA v3 secret key (server-side only, never expose) |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms access key (safe to expose) |

Set these in Vercel → Project Settings → Environment Variables.

## First-time setup checklist

- [ ] Get reCAPTCHA v3 keys at https://www.google.com/recaptcha/admin — select **Score based (v3)**, add `filippoteodoro.com` as an allowed domain
- [ ] Get a Web3Forms access key at https://web3forms.com (free, no domain verification needed)
- [ ] Add all three env vars in Vercel → Project Settings → Environment Variables
- [ ] The Google Analytics ID (`G-GMFJT73TES`) is hardcoded in `app/layout.tsx` — update it if the property changes
- [ ] Connect the repo to a Vercel project and add the domain `filippoteodoro.com`
