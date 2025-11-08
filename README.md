# SportShop Frontend

A bilingual (Persian-first) sport marketplace UI inspired by Shopify, built with Next.js 13 App Router. The UI showcases premium imagery, responsive layouts, and localized messaging tailored for the Iranian market. It is designed to work with an existing Go Gin backend.

## Features

- 🇮🇷 Default Persian experience with English toggle using Next.js i18n routing and middleware.
- 🛒 Shopify-inspired layout featuring hero, category grids, curated products, testimonials, and feature highlights.
- 📱 Responsive Tailwind CSS styling with generous use of imagery from Unsplash.
- 🔌 API client helper prepared for integration with the Go Gin backend, including logging and localization headers.
- 📝 Robust TypeScript types, inline documentation, and console logging for observability.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   npm start
   ```

The middleware automatically redirects `/` to `/fa`. Navigate to `/en` for the English experience.

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL` – base URL for the Go Gin backend. Defaults to `http://localhost:8080` for local development.

## Project Structure

```
app/
  [locale]/
    layout.tsx  # Locale-aware shell with header/footer
    page.tsx    # Home page rendering localized sections
components/    # UI building blocks (hero, grids, highlights, testimonials)
content/       # JSON dictionaries for FA and EN locales
lib/           # i18n config, dictionary loader, API client helper
public/        # Static assets (add brand imagery/logos here)
```

## Backend Integration Notes

- The `lib/api-client.ts` helper wraps `fetch` with consistent logging, error handling, and `Accept-Language` headers. Use it inside server actions or route handlers when wiring the UI to the Go Gin services.
- Extend `content/*.json` dictionaries with additional copy as new pages/components are introduced. Each React component consumes only the keys it needs to remain maintainable.

Enjoy building a champion-grade experience for Iranian athletes! 💪
