# SEO & Open Graph

Каждый новый сайт сразу SEO-friendly: Metadata API, корректный `lang`, семантика, доступный OG. Не откладывать.

## Required metadata (Next.js Metadata API)

Источник: `site.ts` + контент сайта. В `src/app/layout.tsx` (и per-page при мультистраничности):

```ts
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,                           // бренд + суть, ~50–60 символов
  description,                     // 140–160 символов, уникальный оффер
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [/* релевантные, без спама */],
  alternates: { canonical: "/" },
  icons: { icon: [...], apple: [...] },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title,
    description,
    images: [{
      url: "/og.jpg",
      width: 1200,
      height: 630,
      alt: "...",
      type: "image/jpeg",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "...",               // под палитру
};
```

`<html lang="...">` — языку контента (`ru`, `en`, …).

### Title & description

- Title: бренд + ценность страницы; совпадает со смыслом H1.
- Description: оффер без кликбейта; не копия title.
- Меняешь ключевой copy → обнови meta.

## Open Graph image

| Rule | Value |
|------|--------|
| File | `public/og.jpg` |
| Size | **1200×630** (≈1.91:1) |
| Weight | желательно &lt; 1 MB (лучше 100–300 KB) |
| Meta width/height | = реальный файл |
| URL | `{site.url}/og.jpg` через `metadataBase` |
| Access | HTTPS, 200, `image/jpeg`, без auth |

После смены картинки/meta — сброс кэша мессенджеров ([WebpageBot](https://t.me/webpagebot) и аналоги).  
`NEXT_PUBLIC_SITE_URL` / `site.url` — **до** `npm run build`.

## On-page SEO (must)

1. **Один H1** на страницу. Далее H2 → H3 по секциям.
2. **Семантика:** `header`, `main`, `section`/`article`, `footer`; `aria-labelledby` где уместно.
3. **Canonical** без дублей www/non-www.
4. **Images:** осмысленный `alt` у контента; декоративные — `alt=""`.
5. **Links:** понятный якорный текст; `rel="noopener noreferrer"` при `target="_blank"`.
6. **Performance:** static export по умолчанию; LCP с `priority`; без лишнего preload.
7. **Mobile-friendly:** viewport, tap targets ≥ ~40px, без горизонтального скролла.

## Recommended extras

```txt
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://{domain}/sitemap.xml
```

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://{domain}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1</priority>
  </url>
</urlset>
```

Файлы в `public/` попадут в `out/`. URL = актуальный `site.url`.

**JSON-LD** — по типу сайта (`Organization`, `WebSite`, `Person`, `Product`, `LocalBusiness`…), только проверяемые факты из data. Без выдуманных рейтингов.

## Multi-page

На каждую страницу: свой `metadata` / `generateMetadata`, уникальные title/description, свой canonical; OG общий или per-page.

## Agent checklist (SEO)

- [ ] `metadataBase` + title + description + canonical
- [ ] `openGraph` + `twitter.summary_large_image`
- [ ] `og.jpg` 1200×630, meta sizes совпадают
- [ ] `robots` index/follow (или noindex на staging)
- [ ] `html lang`; один H1; иерархия заголовков
- [ ] alt / aria на ключевых блоках
- [ ] `site.url` совпадает с продом после build
- [ ] README упоминает OG + `NEXT_PUBLIC_SITE_URL`
- [ ] После деплоя: view-source `og:image`, JPG открывается
