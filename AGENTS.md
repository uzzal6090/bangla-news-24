<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# bangla-news-24

Bangla news portal. Next.js 16 (App Router, `src/` dir), React 19, TypeScript, Tailwind CSS v4. News content comes from an **external API** — MongoDB is used **only** for Better Auth data (users/sessions), not news articles.

## Commands

- `npm run dev` — dev server
- `npm run build` — production build; **this is also the typecheck** (no `typecheck` or `test` script exists)
- `npm run lint` — ESLint (flat config, `eslint-config-next`)
- No test suite. Verify changes with `lint` + `build`.

## Stack quirks (Next 16 / breaking changes)

- **Request interception uses `src/proxy.ts`, not `middleware.ts`.** It exports `proxy()` + `config.matcher` and protects `/profile` and `/news/:path*` by redirecting unauthenticated users to `/signin`. Route protection lives here, not in layouts/pages.
- Dynamic route `params` is a **Promise**: `const { newsId } = await params` (see `src/app/news/[newsId]/page.tsx`).
- Tailwind **v4 CSS-first config**: no `tailwind.config.js`. Theme/plugin setup lives in `src/app/globals.css` (`@import "tailwindcss"`, `@plugin "daisyui"`, `@import "@heroui/styles"`). Both daisyUI and HeroUI styles are loaded — UI is mostly Tailwind utility classes.
- **React Compiler is enabled** (`reactCompiler: true` in `next.config.ts`). Components don't need manual memoization; avoid adding refs/mutations to work around renders.
- Path alias: `@/*` → `./src/*`.

## Auth (Better Auth + MongoDB)

- Server config: `src/lib/auth.ts` (MongoDB adapter, email/password + Google + GitHub). Client: `src/lib/auth-client.ts`. Catch-all route: `src/app/api/auth/[...all]/route.ts` — don't add manual auth API routes.
- Env vars (read from `.env`, which is untracked — README says `.env.local`; either works): `BETTER_AUTH_DB_URL`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`. No env vars are needed for news fetching.

## News API

- Base: `https://news-api-v2.vercel.app/api`. Endpoints used: `/news/sections` (home), `/categories` (nav), `/category/{id}`, `/article/{newsId}` (details), `/news/most-read`, `/news?limit=10` (marquee).
- Fetches are server-side in pages/components; details page uses `next: { revalidate: 60 }` and calls `notFound()` on non-OK responses — follow that pattern for new fetches.
- Response shapes are defined as local interfaces per page (no shared types package). The `/article/{id}` payload has a nested `body` array (`text`/`image`/`subheading` blocks) — read `src/app/news/[newsId]/page.tsx` before touching article rendering.

## Images

- `next.config.ts` `images.remotePatterns` allows **only `ichef.bbci.co.uk`**. `next/image` will fail for any other host — add the hostname to the config when introducing images from new sources.

## Layout of `src/`

- `src/app/` — routes: `/`, `/news/[newsId]`, `/category/[categoryId]`, `/signin`, `/signup`, `/profile`. Auth-aware nav state is rendered in `src/components/Header.tsx`.
- `src/components/` — shared components (`NewsCard`, `MainNews`, `MostRead`, `Marquee`, `NavLinks`, `MobileNav`, `Header`, `Footer`, `UserInfo`).
- `src/lib/` — auth server/client only.

## Deployment

- Vercel. `CLAUDE.md` just contains `@AGENTS.md` (keep both files in sync; CLAUDE.md forwards here automatically).
