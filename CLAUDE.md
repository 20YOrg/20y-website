# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server with HMR at http://localhost:3000
npm run build      # Production build (outputs to .next/)
npm run start      # Serve production build
npm run typecheck  # Run tsc --noEmit
```

No test runner or linter is configured.

## Architecture

**Stack**: Next.js 15 (App Router, SSR), React 19, TailwindCSS v4, TypeScript, next-intl

### Multilingual Routing

The site supports three languages (English, Spanish, Chinese) via the `[locale]` dynamic segment. next-intl handles routing via `middleware.ts` with `localePrefix: 'as-needed'` — English routes have no prefix (`/`, `/principles`), Spanish and Chinese are prefixed (`/es/principles`, `/zh/founder`).

```
/                → English home
/es              → Spanish home (same component: app/[locale]/page.tsx)
/zh              → Chinese home (same component: app/[locale]/page.tsx)
```

### i18n

- Config: `i18n.ts` — exports `routing` with locales `['en', 'es', 'zh']`, defaultLocale `'en'`
- Translation files: `messages/{en,es,zh}.json` — single flat namespace
- Middleware: `middleware.ts` — next-intl locale routing + dashboard auth protection
- Usage in server components: `getTranslations('namespace')` from `next-intl/server`
- Usage in client components: `useTranslations('namespace')` from `next-intl`
- All UI strings must be added to all three message files

### Layout & Navigation

- `app/layout.tsx` — root layout: loads Google Fonts (Cormorant Garamond + Inter), sets `<html>`
- `app/[locale]/layout.tsx` — locale layout: wraps with `NextIntlClientProvider`, renders `<Navigation>` and `<Footer>`
- `components/Navigation.tsx` — client component; reads locale from pathname, builds prefixed links, language switcher, `<UserMenu>`
- `components/Footer.tsx` — client component; newsletter input + copyright

### Adding a New Page

1. Create `app/[locale]/yourpage/page.tsx` — can be server or client component
2. Add translation keys to all three `messages/{lang}.json` files
3. Add nav link in `components/Navigation.tsx` using the `prefixed()` helper

### Auth

Directus handles **both** CMS and user authentication — no Supabase.

- Login: `POST /api/auth/login` → calls Directus `/auth/login`, sets HttpOnly cookies (`directus_token`, `directus_refresh_token`)
- Logout: `POST /api/auth/logout` → calls Directus `/auth/logout`, clears cookies
- Me: `GET /api/auth/me` → reads `directus_token` cookie, returns user info for client-side `<UserMenu>`
- Dashboard: server component reads cookie directly via `next/headers`, redirects if missing
- Middleware protects `/dashboard`, `/es/dashboard`, `/zh/dashboard`

### Directus CMS

`lib/directus.ts` exports all Directus API functions. All functions return graceful empty values (`[]`, `null`) if `NEXT_PUBLIC_DIRECTUS_URL` is not set.

**Collections needed in Directus:**
- `research` — fields: `slug`, `title`, `date_published`, `executive_summary`, `video_url`, `framework_image`, `status`
- `investors` — fields: `email`, `investor_name`, `investment_amount`, `investment_date`, `wallet_address`, `status`

### Design System

Minimal institutional design — white/black only, no animations, no shadows, no gradients.

| Token | Value |
|---|---|
| Background | #ffffff |
| H1/H2 text | #1a1a1a |
| Body text | #4a4a4a |
| Secondary | #7a7a7a |
| Borders | #e5e5e5 |
| Links | #000000, underline |
| Button | 1px black border; hover: bg-black text-white |

CSS design tokens defined in `app/app.css` via `@theme {}`.

### Environment Variables

```
NEXT_PUBLIC_DIRECTUS_URL=   # Directus base URL (public, used client+server)
DIRECTUS_TOKEN=             # Static admin token for server-side reads only
```

Without these set, all Directus calls return empty/null gracefully and the site still renders.
