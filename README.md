# filippoteodoro.com

Personal website. Built with Next.js 15, deployed on Vercel.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS 4 |
| Font | Courier Prime (Google Fonts) |
| Contact form | Web3Forms (client-side submission) |
| Spam protection | Google reCAPTCHA v3 (server-side token verification) |
| Analytics | Google Analytics 4 + Vercel Web Analytics |
| Deployment | Vercel |

## Architecture

```
app/
  layout.tsx              # Root layout — font, metadata, analytics
  page.tsx                # Homepage
  globals.css             # Tailwind + reCAPTCHA badge hide
  icon.svg                # Favicon (dark/light mode aware)
  sitemap.ts              # Auto-generated sitemap.xml
  robots.ts               # Auto-generated robots.txt
  llms.txt/route.ts       # Dynamic llms.txt for LLM discoverability
  components/
    ContactForm.tsx        # reCAPTCHA + Web3Forms contact form
  api/
    verify-captcha/
      route.ts            # Server-side reCAPTCHA token verification
lib/
  content.ts              # ← Single source of truth for bio, social links, metadata
public/                   # Static assets
```

## Content updates

**All bio text, social links, and metadata flow from a single file:**

```
lib/content.ts
```

Edit that file and everything updates automatically on deploy — the page, Open Graph tags, JSON-LD schema, social nav, and `llms.txt`.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

## Environment variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 public key (safe to expose) |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA v3 secret key — server-side only, never expose |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms access key (safe to expose) |

Set these in Vercel → Project Settings → Environment Variables.

## First-time setup checklist

- [ ] Get reCAPTCHA v3 keys at https://www.google.com/recaptcha/admin — select **Score based (v3)**, add `filippoteodoro.com` as an allowed domain
- [ ] Get a Web3Forms access key at https://web3forms.com (free, no domain verification needed)
- [ ] Add all three env vars in Vercel → Project Settings → Environment Variables
- [x] Enable Vercel Web Analytics: Vercel dashboard → project → Analytics tab → Enable
- [ ] The Google Analytics ID (`G-GMFJT73TES`) is hardcoded in `app/layout.tsx` — update if the property changes
- [ ] Connect the repo to a Vercel project and add the domain `filippoteodoro.com`
