# README — always present and up to date

**Правило:** в корне сразу оформленный `README.md` на языке проекта (для RU-брифа — русский). Пишется вместе со scaffold. При смене стека, скриптов, структуры, env, деплоя, OG — **сразу обновить**.

Не оставлять дефолтный README от `create-next-app`.

## When to update

| Change | Update README section |
|--------|------------------------|
| Новый проект | Весь файл по шаблону |
| Смена домена / `site.url` | Контент + env |
| Новые npm scripts | Команды |
| Новые папки / data | Структура + Контент |
| Другой деплой | Деплой |
| Новые assets (og, icons) | Контент / структура |
| Static-only host | Явно: `npm start` не нужен |

## Required sections (order)

1. Заголовок + 1–2 предложения  
2. Стек  
3. Возможности / что на сайте  
4. Структура  
5. Требования (Node 20+, npm)  
6. Установка и запуск  
7. Production → `out/`  
8. Таблица команд  
9. Контент / data / env  
10. SEO / OG (кратко)  
11. Деплой  

## Template

```markdown
# {Название} — {тип сайта}

{1–2 предложения.}

## Стек

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + компоненты в стиле shadcn/ui
- Сборка в **статику** (`output: "export"`) — папка `out/`

## Возможности

- …

## Структура

\`\`\`
src/
  app/
  components/
  data/          # site.ts + контент
  lib/
public/
  icons/
  og.jpg         # 1200×630
out/
\`\`\`

## Требования

- Node.js 20+
- npm

## Установка и запуск

\`\`\`bash
npm install
npm run dev
\`\`\`

### Production (статика)

\`\`\`bash
npm run build
\`\`\`

Результат в `out/`.

### Команды

| Команда | Описание |
| ------- | -------- |
| `npm run dev` | Разработка |
| `npm run build` | Статика в `out/` |
| `npm run lint` | ESLint |

## Контент

- `src/data/site.ts` — URL, имя, locale
- …другие data-модули

OG: `public/og.jpg` (1200×630). Иконки: `public/icons/` (локально).

\`\`\`bash
NEXT_PUBLIC_SITE_URL=https://ваш-домен.ru
\`\`\`

## Деплой

| Поле | Значение |
| ---- | -------- |
| Команда сборки | `npm run build` |
| Директория | `out` |

Node-сервер (`npm start`) не нужен.
```

## Agent rules

1. Новый сайт → README в той же сессии.  
2. Смена DX → сразу править README.  
3. Домены/пути = как в коде.  
4. Без копипаста всего design system — только onboarding.  
5. Чеклист сайта не закрыт без актуального README.
