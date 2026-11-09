# Портфолио — Михаил Чугаев

Личный сайт-портфолио fullstack-разработчика и тимлида. Тёмный hero с фото, блок технологий (с переключением на бизнес-запросы), избранные кейсы и контакты.

## Стек

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + компоненты в стиле shadcn/ui
- Сборка в **статику** (`output: "export"`) — результат в папке `out/`

## Возможности

- Hero на весь экран: фото, CTA в Telegram, стек технологий
- Переключение «… и другие…» → популярные бизнес-запросы
- Карточки проектов со слайдшоу превью и годами, ссылка на страницу кейса
- Отдельные SEO-страницы кейсов (`/projects/<slug>`) и индекс `/projects`
- Блок «Это не все проекты» с дополнительными направлениями
- Адаптив под мобильные и десктоп
- SEO/OG, robots, sitemap, JSON-LD и Яндекс Метрика

## Структура

```
src/
  app/           # layout, главная, /projects, robots.ts, sitemap.ts, стили
  components/    # Hero, TechStack, проекты, кейсы, контакты, UI, JSON-LD, Метрика
  data/          # site.ts, profile.ts, projects.ts, experience.ts
  lib/           # утилиты и SEO/JSON-LD
public/
  promo/         # скриншоты проектов
  icons/         # иконки технологий и преимуществ
  hero-bg.jpg    # фон hero
  og.jpg         # превью ссылки 1200×629
  llms.txt       # краткое описание сайта для языковых моделей
out/             # статическая сборка (после npm run build)
```

## Требования

- Node.js 20+ (рекомендуется LTS)
- npm

## Установка и запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

### Production (статика)

```bash
npm run build
```

Готовые файлы появятся в `out/`. Эту папку можно отдавать любым статическим хостингом (nginx, Cloudflare Pages, Timeweb и т.п.).

### Другие команды

| Команда         | Описание               |
| --------------- | ---------------------- |
| `npm run dev`   | Разработка (Turbopack) |
| `npm run build` | Сборка статики в `out/`|
| `npm run lint`  | ESLint                 |

## Контент

Основные тексты и данные правятся в:

- `src/data/profile.ts` — имя, слоган, навыки, преимущества, контакты
- `src/data/projects.ts` — проекты, годы, теги, ссылки, тексты страниц кейсов
- `src/data/experience.ts` — дополнительный опыт без отдельных страниц кейсов
- `src/data/site.ts` — прод-URL, Open Graph, счётчик Яндекс Метрики
- `src/lib/seo.ts` — title, description, keywords, JSON-LD

Превью проектов кладите в `public/promo/`, иконки — в `public/icons/`.
Картинка для превью ссылки: `public/og.jpg` (фактически 1200×629; размеры в meta совпадают с файлом).

## SEO и превью ссылок

Canonical, Open Graph и Twitter Card собираются из `site.url`. На продакшене это `https://web-dev.su` (без www: такой хост сейчас не резолвится). У каждой страницы свой title, description и canonical. После `npm run build` в `out/` также появляются:

- `robots.txt` и `sitemap.xml` (главная, `/projects/` и страницы кейсов)
- В `next.config.ts` включён `trailingSlash`, чтобы статический хост отдавал `/projects/` как папку с `index.html`
- JSON-LD: на всех страницах `Person` и `WebSite`; на главной — `ProfilePage` и списки; на кейсах — `CreativeWork` / `SoftwareApplication` и `BreadcrumbList`
- `llms.txt` — фактическое описание сайта и URL кейсов для AI-поиска, не сигнал ранжирования

Для корректного превью в Telegram задайте домен **до** сборки:

```bash
# .env.local или переменная на хостинге
NEXT_PUBLIC_SITE_URL=https://web-dev.su
```

По умолчанию в `site.ts` указан `https://web-dev.su`. После смены картинки или meta сбросьте кэш мессенджеров (WebpageBot и аналоги).

На сайте подключена Яндекс Метрика, счётчик `114130745` (`ssr`, webvisor, clickmap, ecommerce/`dataLayer`, accurateTrackBounce, trackLinks). Скрипт грузится один раз через `next/script`; noscript-пиксель есть в HTML. Первый просмотр считает `init`; при клиентской навигации Next.js уходит отдельный `hit` без повторной инициализации. Хостинг сейчас без CSP; если появится — нужны `mc.yandex.ru` / `mc.yandex.com`.

## Деплой (статический хостинг)

Пример настроек:

| Поле                 | Значение        |
| -------------------- | --------------- |
| Команда сборки       | `npm run build` |
| Директория сборки    | `out`           |
| Путь до проекта      | корень репо     |

Node.js-сервер (`npm start`) не нужен.
