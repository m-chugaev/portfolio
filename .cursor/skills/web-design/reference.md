# Design reference

См. [nextjs.md](nextjs.md), [seo.md](seo.md), [gotchas.md](gotchas.md).

## New site: customize first

1. `src/data/site.ts` — URL, locale, name  
2. Контент-модули под секции  
3. `public/og.jpg` (1200×630), logo, media  
4. Tokens в `globals.css`  
5. `layout.tsx` meta / `themeColor` / `lang`  
6. Build с верным `NEXT_PUBLIC_SITE_URL`  
7. README по [readme.md](readme.md)

## Color & surfaces (example dark system)

Адаптируй под бренд; это ориентир, не обязательная палитра каждого сайта:

```css
:root {
  --background: oklch(0.34 0.018 265);
  --foreground: oklch(0.98 0.01 265);
  --card: oklch(0.4 0.022 265);
  --primary: oklch(0.72 0.16 255);
  --muted-foreground: oklch(0.86 0.015 265);
  --border: oklch(0.5 0.02 265);
  --radius: 1rem;
}
```

Atmosphere: radial/linear gradients или фото на `body`/`hero`, не один плоский fill.

Цветные чипы/теги: CSS var вроде `--item-color` + лёгкий tint/glow на hover.

## Typography (typical)

| Use | Approach |
|-----|----------|
| Hero H1 | `clamp(...)` или ступенчатый scale, `font-semibold` / display |
| Section titles | `font-display`, растущий scale на `md+` |
| Body | `text-sm` → `md:text-base`, muted для вторичного |

Один–два семейства; не дефолтный Inter-only вид.

## Breakpoints (useful patterns)

| Query | Role |
|-------|------|
| `<640px` | Упрощённый chrome, стек колонок |
| `sm` / `md` / `lg` | Появление nav, split layouts, overlays |
| Wide (`min-[1500px]` и т.п.) | Комфорт плотных виджетов, не всего layout |
| `max-height: 700px` | Опционально уплотнять только «высокие» панели |
| `prefers-reduced-motion` | Резать анимации |

## Hero / first viewport

- Full-bleed visual при promo/landing.
- Один headline + supporting + CTA group.
- Не перекрывать лицо/главный объект плавающими панелями без нужды.
- Soft mask/blur слои — по брифу.

## Buttons

Default `h-10 px-5`, `rounded-full`. Primary CTA может быть `size="lg"`. Outline: полупрозрачный фон. Связанные mobile-controls — сегмент с общим border.

## SafeImage

Fallback SVG в `public/icons/` для битых src. Использовать для внешних/ненадёжных URL и важных media.

## Content voice

- Язык брифа; active voice; без воды.
- CTA называют действие.
- Ошибки/empty — направляют, не извиняются расплывчато.

## OG / SEO

См. [seo.md](seo.md).
