# Next.js setup

## Create / align a project

```bash
npx create-next-app@15 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack
```

Довести до шаблона:

1. Включить static export (ниже), если хостинг статический.
2. Tailwind v4 + `@tailwindcss/postcss` (PostCSS plugin; без обязательного классического `tailwind.config`).
3. UI: CVA + `clsx` + `tailwind-merge` + Lucide; опционально `npx shadcn@latest init` (style `new-york`, css variables).
4. Шрифты: `@fontsource/...` с нужными weights/скриптами (в т.ч. кириллица) — импорт CSS в `layout.tsx`.
5. Контент в `src/data/`, страницы в `src/app/`.

Node **20+**. Scripts:

```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "lint": "next lint"
}
```

`start` для static export не нужен.

## next.config.ts (static default)

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

Почему:
- `output: "export"` → HTML/CSS/JS/assets в `out/` после `next build`.
- `images.unoptimized: true` → `next/image` без Image Optimization Server.

Без миграции на Node-хостинг не использовать: динамические Route Handlers, ISR/SSR-only, middleware с секретами, `headers()`/`cookies()` в страницах, dynamic `searchParams` без `generateStaticParams`.

## App Router layout

`src/app/layout.tsx`:

- `export const metadata: Metadata` — см. [seo.md](seo.md).
- `export const viewport: Viewport` — `device-width`, `themeColor` под бренд.
- `<html lang="...">` по языку контента; `body` без горизонтального скролла (`overflow-x-clip` при необходимости).
- `import "./globals.css"` + font CSS.

`src/app/page.tsx` (и другие pages) — composition; `"use client"` только в интерактивных листьях.

## Path alias

```json
"paths": { "@/*": ["./src/*"] }
```

## Tailwind v4

```css
@import "tailwindcss";
@import "tw-animate-css"; /* опционально */

@custom-variant dark (&:is(.dark *));
@theme inline { /* map --color-* */ }
:root { /* design tokens */ }
```

`postcss.config.mjs`: `{ plugins: { "@tailwindcss/postcss": {} } }`.

## shadcn / components.json

- `rsc: true`, `tsx: true`, `style: "new-york"`, `cssVariables: true`
- `tailwind.css` → `src/app/globals.css`
- aliases: components, utils, ui, lib, hooks
- `iconLibrary: "lucide"`

## Data modules

```ts
// site.ts — минимум для любого сайта
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  name: "...",
  locale: "ru_RU",
} as const;
```

Дополнительные модули (`content.ts`, `nav.ts`, `products.ts` …) — по структуре продукта.  
`NEXT_PUBLIC_*` фиксируется на **build** — задавать URL до `npm run build`.

## Images

- Файлы в `public/`; в коде абсолютные пути от корня сайта.
- Fallback-обёртка над `next/image` при ненадёжных src.
- `priority` только для LCP.

## Metadata & OG

См. [seo.md](seo.md).

## Deploy static

| Field | Value |
|-------|--------|
| Build | `npm run build` |
| Publish dir | `out` |
| Node | 20+ (build only) |

Локально: `npx serve out`. HTTPS в проде желателен (clipboard, доверие к OG).

## Client vs Server

| Server (default) | Client (`"use client"`) |
|------------------|-------------------------|
| `layout`, page composition | timers, clipboard, observers |
| metadata exports | local UI state, toggles |
| static data imports | `onError` image swap |

## ESLint

`next/core-web-vitals` + `next/typescript` (FlatCompat при необходимости).

## Folder skeleton

```
src/
  app/layout.tsx, page.tsx, globals.css
  components/   # секции + ui/
  data/         # site.ts + контент
  lib/utils.ts
public/
  icons/, og.jpg, logo.*, favicons, media/
next.config.ts
postcss.config.mjs
components.json
tsconfig.json
README.md
```
