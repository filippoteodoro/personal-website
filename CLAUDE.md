# CLAUDE.md — filippoteodoro.com

## Project overview

Personal website for Filippo Teodoro at https://filippoteodoro.com.
Next.js 15 App Router, Tailwind CSS 4, deployed on Vercel.

## Critical: single source of truth

**`lib/content.ts` is the only file to edit for bio/social/metadata changes.**

It drives: page text, Open Graph tags, Twitter card, JSON-LD schema, social nav links, and `/llms.txt`. Never hardcode bio content or social URLs elsewhere.

## File map

| File | Purpose |
|---|---|
| `lib/content.ts` | Bio, social links, metadata — edit this for content changes |
| `app/page.tsx` | Homepage JSX — bio paragraphs with inline links live here |
| `app/layout.tsx` | Root layout: font (Courier Prime), metadata, GA4, Vercel Analytics |
| `app/globals.css` | Tailwind import + reCAPTCHA badge hidden |
| `app/icon.tsx` | PNG favicon (32×32) via ImageResponse — edit text/colors here |
| `app/sitemap.ts` | Auto-generates `/sitemap.xml` |
| `app/robots.ts` | Auto-generates `/robots.txt` |
| `app/llms.txt/route.ts` | Dynamic `/llms.txt` derived from `lib/content.ts` |
| `app/components/ContactForm.tsx` | Client form: reCAPTCHA token → verify API → Web3Forms |
| `app/api/verify-captcha/route.ts` | Server-side reCAPTCHA v3 token verification |
| `next.config.ts` | Security headers (X-Frame-Options, CSP, etc.) |

## Contact form flow

1. User submits form → `window.grecaptcha.execute()` fires client-side (script lazy-loaded via IntersectionObserver)
2. Token sent to `/api/verify-captcha` → verified against Google (score ≥ 0.5)
3. If valid → form submits directly from browser to Web3Forms API
4. Web3Forms delivers email to inbox

**Why split?** Web3Forms is behind Cloudflare — server-to-server calls get blocked. Browser requests work fine.

## Environment variables

| Variable | Where used |
|---|---|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Client-side reCAPTCHA widget |
| `RECAPTCHA_SECRET_KEY` | `app/api/verify-captcha/route.ts` — never expose |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Client-side Web3Forms submission |

## Dark mode

Automatic via Tailwind `dark:` variants + `prefers-color-scheme`. No toggle. Theme color meta tag set in `app/layout.tsx` viewport export so mobile browser chrome matches.

## Font

Currently **SF Mono Regular** (local OTF, loaded via `next/font/local`). Font files live in `app/fonts/`. To change:
1. Update import and variable in `app/layout.tsx`
2. Update `loadFontData` path and `fontFamily` in `app/icon.tsx`

## Deployment

Push to `main` → Vercel auto-deploys. No manual steps needed.
Remote: `https://github.com/filippoteodoro/personal`

## Commands

```bash
npm run dev      # local dev server
npm run build    # production build (run before pushing to check for errors)
npm run lint     # lint
```

## Do not

- Do not add `console.log` or debug code before committing
- Do not hardcode social URLs or bio text outside `lib/content.ts`
- Do not commit `.env.local`
- Do not use `git push --force` on `main`
