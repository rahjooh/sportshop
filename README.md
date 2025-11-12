# Pitok Frontend

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

## Backend Explorer

Visit `/{locale}/backend` (or `/fa/backend` by default) to open the integrated boofback console. Each tab maps to a major slice of the Go service:

- **Overview** – architecture layers, end-to-end journey, and the most important endpoints.
- **Status** – live `/health` readout plus a playground to ping the server without curl.
- **Products** – renders `/api/v1/products` directly inside the UI and exposes creation/detail playgrounds for admins.
- **Users & Auth** – mirrors every step of the OTP workflow (register, activate, login, reset) with editable JSON payloads.
- **Addresses & Orders** – authenticated forms for address book CRUD and order orchestration, including inline samples for payload shapes.

All playgrounds call the API via `fetch` using `NEXT_PUBLIC_API_BASE_URL`, so cookies issued by boofback are reused automatically in the browser.

## Connecting to boofback

1. Clone and run the backend following the instructions in the boofback repository (`make run` or `go run .`).  
2. Ensure the frontend knows where to find it:
   ```bash
   export NEXT_PUBLIC_API_BASE_URL="http://localhost:8080"
   npm run dev
   ```
3. Open `/fa/backend/status` to confirm `/health` responds. The status cards should flip from `unknown` to the real values.
4. Walk through the onboarding flow:
   - Use `/fa/auth/register` or the **Users** playground to `POST /api/v1/users`.
   - Grab the OTP printed by boofback and call `POST /api/v1/auth/activate`.
   - Log in via `/fa/auth/login` or the **Auth** playground to obtain the session cookie.
5. Seed inventory inside `/fa/backend/products` (admin cookie required) so the orders page has something to work with.

Once a session cookie exists in the browser, all authenticated playgrounds (addresses, orders, `/auth/me`) will automatically include it.

## Troubleshooting

- **Health check fails (`unknown` status)** – confirm the backend is running, the port matches `NEXT_PUBLIC_API_BASE_URL`, and no VPN/firewall is blocking `fetch`.
- **CORS or cookie errors** – boofback must allow the frontend origin (for local dev it should be `http://localhost:3000`). Also verify the backend sets `Secure=false` when testing over HTTP.
- **OTP never validates** – OTP codes are logged to stdout only once. Make sure you copy the most recent code and that the payload includes the same mobile number.
- **Orders/addresses reject requests** – these endpoints require the session cookie issued during OTP login. Re-run the login playground and retry.
- **In-memory data disappears** – restarting boofback clears products, addresses, and orders. Reseed via the products playground or existing curl scripts.

Enjoy building a champion-grade experience for Iranian athletes! 💪
