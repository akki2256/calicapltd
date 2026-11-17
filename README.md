# Calicon marketing site

Next.js (App Router) + Tailwind — optimised for **local development** and **Vercel**.

## Prerequisites

- Node.js 18.18+ (or 20+)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Edit files under `src/`; the dev server hot-reloads.

## Production build

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Push this repository to GitHub (or connect your Git provider).
2. Import the project in Vercel (framework preset: **Next.js**).
3. Add **`NEXT_PUBLIC_SITE_URL`** in Vercel → Settings → Environment Variables to your live URL (no trailing slash), e.g. `https://your-project.vercel.app`. Redeploy after saving.

## Contact form

Requires `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `CONTACT_INBOX_EMAIL`. The form fails closed when delivery is not configured.

## Customisation

- Branding and nav: `src/components/canvas/` (header, nav, footer) and copy in `src/lib/calicap-*.ts`.
- Global styling: `src/app/globals.css` (Tailwind v4 `@theme` tokens; `data-theme="canvas"`).
