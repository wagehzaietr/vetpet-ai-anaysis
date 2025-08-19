## PetCare AI — AI Veterinary Assistant

PetCare AI is a bilingual (EN/AR) veterinary assistant for pet owners in Syria. It analyzes symptoms, behavior, and images to provide guidance and urgency assessment. Built with Next.js App Router and next-intl.

## Features

- __Bilingual i18n (EN/AR)__ with locale routing and RTL support.
- __AI analysis flows__: text + image inputs, risk level, recommendations.
- __SEO optimized__ per-locale metadata (Open Graph, Twitter, robots, alternates).
- __Responsive UI__ with Tailwind CSS and accessible components.
- __Sectioned homepage__: Hero, How it works, Features, Risk Levels, Trust, Testimonials, FAQ, CTA.

## Tech Stack

- __Framework__: Next.js 15 (App Router)
- __Internationalization__: next-intl 4
- __UI__: React 19, Tailwind CSS 4, Radix UI, Lucide Icons, Framer Motion
- __AI__: AI SDK (@ai-sdk/*) [optional based on your integration]

## Project Structure

```
app/
  [locale]/
    layout.tsx      # Root layout with i18n + SEO (generateMetadata)
    page.tsx        # Home page sections
components/
  ...               # Reusable UI and site sections
i18n/
  routing.ts        # locales and defaultLocale
messages/
  en.json, ar.json  # translation messages
lib/
  utils.ts          # utilities
public/
  ...               # static assets (favicon, logo, etc.)
```

## Internationalization

- Locales are defined in `i18n/routing.ts` (`en`, `ar`).
- Pages live under `app/[locale]/` and read `params.locale`.
- Use `useTranslations()` from `next-intl` in components/pages.
- RTL is automatically applied for `ar` via `dir="rtl"` in `RootLayout`.

## SEO Configuration

Implemented in `app/[locale]/layout.tsx` via `generateMetadata`:

- __Title template__: `%s | PetCare AI`
- __Locale-aware description__ and keywords
- __Open Graph__ and __Twitter__ images (`/headerlogo.png`)
- __Robots__ and Googlebot directivess
- __Alternates__: canonical + language URLs for `en` and `ar`
- __metadataBase__: uses `NEXT_PUBLIC_SITE_URL` if provided

Update brand messaging in one place inside `generateMetadata`.

## Environment Variables

Create `.env.local` (not committed) and set as needed:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
# AI provider keys (optional, depending on your usage)
# GOOGLE_GENERATIVE_AI_API_KEY=...
# OPENAI_API_KEY=...
```

## Scripts

```
npm run dev     # Start dev server (http://localhost:3000)
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Lint
```

## Development

1. Install deps: `npm install`
2. Run locally: `npm run dev`
3. Edit content:
   - Text/UI: files in `components/`
   - Translations: `messages/en.json`, `messages/ar.json`
   - SEO/i18n: `app/[locale]/layout.tsx`, `i18n/routing.ts`

## Deployment

- Set `NEXT_PUBLIC_SITE_URL` in your hosting environment.
- Typical platforms: Vercel, Netlify. For Node hosting, run `npm run build && npm run start`.

## Troubleshooting

- __Wrong text direction__: ensure `locale === 'ar'` sets `dir="rtl"` in `RootLayout`.
- __Incorrect URLs in OG tags__: set `NEXT_PUBLIC_SITE_URL`.
- __Missing translations__: add keys to `messages/*.json` and re-run dev server.
