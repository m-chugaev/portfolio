---
name: web-design
description: >-
  Build or maintain marketing and product websites with Next.js 15 static
  export, Tailwind v4, shadcn UI, SEO/Open Graph, local icons, and README.
  Use when scaffolding a new site, editing layout/UI, metadata, assets,
  deploy to out/, or applying this web design system.
---

# Web Design Playbook

Универсальный скилл для **любого нового сайта** на одном стеке и правилах DX/SEO/UI. Контент, секции и палитра — под бриф; не предполагай портфолио, лендинг или личный бренд, пока этого нет в задаче.

Читай связанные файлы по задаче:
- Next.js / scaffold / deploy → [nextjs.md](nextjs.md)
- SEO, Open Graph, семантика → [seo.md](seo.md)
- README (сразу и актуально) → [readme.md](readme.md)
- Иконки (скачать с открытых источников) → [icons.md](icons.md)
- Токены, breakpoints, паттерны UI → [reference.md](reference.md)
- Известные баги и правки → [gotchas.md](gotchas.md)

## Stack (default)

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 App Router + React 19 + TypeScript |
| Output | **Static export** (`output: "export"`) → папка `out/` |
| Styles | Tailwind CSS v4 (`@import "tailwindcss"`), CSS variables in `globals.css` |
| UI | shadcn-like (new-york), CVA, `cn()`, Lucide |
| Fonts | Выразительные `@fontsource/*` (не Inter/Roboto/Arial по умолчанию); для кириллицы — нужные weights |
| Content | Typed modules в `src/data/*` (минимум `site.ts`); компоненты читают данные |
| Images | `next/image` + `images.unoptimized: true` + fallback-обёртка при необходимости |
| Hosting | Static host (Caddy, nginx, Cloudflare Pages…) — **без** `npm start` |

Не добавлять SSR-only API routes, server actions с БД или Image Optimization CDN — static export их не поддерживает. Если бриф требует Node/SSR — явно согласовать смену `next.config`, не молча ломать export.

## New site (workflow)

1. **Scaffold** по [nextjs.md](nextjs.md): App Router, `src/`, alias `@/*`, static export, Tailwind v4, shadcn basics.
2. **Tokens** в `globals.css`: палитра и радиусы под бренд; atmosphere (gradients/patterns), не плоский single-color фон без причины.
3. **Data layer** — `site.ts` + модули контента под структуру сайта; без хардкода текстов в UI.
4. **Page shell** под бриф: обычно `Header` → `main` (секции) → `Footer`; первый экран = одна композиция (не dashboard).
5. **Assets:** logo, `og.jpg` 1200×630, медиа секций в `public/`.
6. **Icons:** по [icons.md](icons.md) — сразу скачать SVG в `public/icons/`, не CDN в рантайме; UI в JSX — `lucide-react`.
7. **SEO + OG** сразу по [seo.md](seo.md).
8. **README.md** сразу по [readme.md](readme.md); поддерживать при смене DX/домена/структуры.
9. **`npm run build`** → `out/`; после деплоя при шаринге — сброс OG-кэша (WebpageBot и т.п.).

## Visual direction

- Один визуальный характер на проект; brand/product name — сильный сигнал в первом экране.
- Typography намеренная; избегать дефолтных «AI» стеков (Inter / system как единственный голос).
- Background с атмосферой (градиент, фото, паттерн), не только flat fill.
- Landing/promo: full-bleed hero; не inset media-карточки в первом экране без запроса.
- Первый viewport: бренд, один headline, одна supporting line, одна CTA-группа, один dominant visual — без стат-полос и вторичного шума.
- Buttons/badges: `rounded-full` по умолчанию в этом стеке; карточки — только где нужна интерактивная/смысловая оболочка.
- Motion: 2–3 осмысленных эффекта; уважать `prefers-reduced-motion`.

**Anti-defaults:** purple-on-white / purple-indigo gradient kit; cream `#F4F1EA` + serif + terracotta; broadsheet hairlines; glow spam; emoji-декор; detached badges поверх hero.

## Layout principles

1. Mobile-first; ключевые блоки читаемы без горизонтального скролла.
2. CTA и вторичные панели не конкурируют в одном ряду на узкой ширине — стек колонок.
3. Уплотнять плотные виджеты на малых ширинах; соседние секции не сжимать «за компанию».
4. Header: на mobile упрощённый; desktop — полная навигация при наличии пунктов.
5. Primary actions одной высоты (`h-10` / `size="default"`); связанные mobile-controls можно сегментировать (иконка + border-left).
6. Длинные подписи в чипах — overflow/typewriter или truncate по смыслу; на mobile можно форсировать анимацию для самых длинных лейблов.
7. Тексты и URL — из `src/data/*`.

## Typical component map

| Area | Role |
|------|------|
| Shell | `Header`, `Footer` |
| Landing | `Hero` + секции по брифу |
| Media | `SafeImage` (или аналог с fallback) |
| UI | `components/ui/*` (button, badge, card, …) |
| Utils | `lib/utils.ts` → `cn` |

Имена секций и набор блоков — от брифа, не копировать чужую карту секций без нужды.

## Assets contract

- `public/og.jpg` = 1200×630; meta width/height совпадают
- Иконки: локальные `public/icons/**`; агент качает сам — [icons.md](icons.md)
- `NEXT_PUBLIC_SITE_URL` или default в `site.ts`
- Медиа секций — согласованные расширения и пути в data

## Agent checklist

- [ ] Static export + unoptimized images (если остаёмся на static)
- [ ] SEO/OG complete per [seo.md](seo.md)
- [ ] Data-driven copy
- [ ] Icons in `public/icons/` (no runtime CDN) per [icons.md](icons.md)
- [ ] README.md present and accurate per [readme.md](readme.md)
- [ ] First viewport = one composition; brand visible
- [ ] Mobile layout stacked sanely; desktop hierarchy clear
- [ ] Safari-safe clipboard if copy UI exists
- [ ] Build `out/` succeeds; no Node server assumed
- [ ] Gotchas reviewed ([gotchas.md](gotchas.md))
