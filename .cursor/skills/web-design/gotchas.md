# Known issues & potential fixes

## Next.js static export

- Нет `images.unoptimized` → build/export или картинки ломаются.
- API route / server action / dynamic SSR на static → сборка падает или фича пустая.
- Сменили домен без rebuild с новым `NEXT_PUBLIC_SITE_URL` → старый OG/canonical в HTML.
- Ждут `npm start` на static-хосте → отдавать `out/`.
- Remote `next/image` без unoptimized/loader — на export осторожно.

## Open Graph / link previews

Чеклист — [seo.md](seo.md).

1. Кэш Telegram/мессенджеров — WebpageBot / `?v=2`.
2. Файл OG ≠ размеры в meta.
3. Хостинг режет ботов (403/timeout).
4. Неверный `site.url` на build.

## Clipboard (iOS Safari)

Синхронный `document.execCommand("copy")` в click-handler первым; затем `navigator.clipboard.writeText`. После успеха — state + `key` на иконке. Не `await` до первой sync-попытки.

## Overflow labels / typewriter

Если анимация только при overflow, длинные лейблы на широких chip могут не запускаться — форсировать на mobile для заранее известных длинных строк.

## Dense widgets vs neighbors

Уплотнять только плотный блок (чипы, сайд-панель); соседние секции не сжимать автоматически.

## Mobile CTA vs side panels

На узкой ширине CTA и вторичная панель — колонкой (CTA выше), не в один ряд.

## Assets extensions

Пути в data = реальные расширения в `public/`. После массовой конвертации (png→jpg) обновить data.

## HTML weight

Тяжёлый HTML ок для OG (meta в head), но не раздувать preload без нужды.

## External icon CDNs

Не ставить CDN URL в `src`. Скачивать в `public/icons/` — [icons.md](icons.md).

## Nested radius

Вложенные элементы: радиус меньше родителя (`max(…, calc(parent - gap))`), не одинаковый radius «карточка в карточке».

## Hero subject occlusion

Плавающие панели не должны перекрывать главный объект фото; сдвигать panel/`object-position`/mask.

## Segmented controls

На mobile связанные outline-кнопки — один pill с разделителем; высота как у primary.
