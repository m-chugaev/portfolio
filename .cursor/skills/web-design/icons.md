# Icons — download locally from open sources

**Правило:** не хотлинкать CDN в проде. При новом сайте или новой иконке агент **сам скачивает** SVG с открытых ресурсов в `public/icons/` и прописывает локальный путь в data/коде.

CDN в рантайме (в т.ч. simpleicons.org) часто падает — локальные файлы обязательны.

## Where to put files

```
public/icons/
  brands/        # или tech/ — логотипы сервисов/стека
  ui/            # метафоры секций, если нужны файлы
  image-placeholder.svg
  image-off.svg
```

Структура папок — по сайту. В данных: `icon: "/icons/brands/react.svg"`. Brand color — отдельным полем `color` (hex), если нужен tint.

## Sources (open / free)

| Need | Source | How |
|------|--------|-----|
| Brand logos | [Simple Icons](https://simpleicons.org) | SVG по slug |
| Fetch mirror | jsDelivr | `https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/{slug}.svg` |
| Alt mirror | unpkg | `https://unpkg.com/simple-icons@v13/icons/{slug}.svg` |
| UI / metaphors | [Lucide](https://lucide.dev) (ISC) | SVG или `lucide-react` |
| Fallbacks | Lucide `image` / `image-off` или простой SVG | В `public/icons/` |

**Не использовать в рантайме:** `https://cdn.simpleicons.org/...` как `src`.

Лицензии: Simple Icons — CC0; Lucide — ISC.

## Agent workflow

1. Brand → Simple Icons; UI/метафора → Lucide (компонент или файл).
2. Найти slug на simpleicons.org / lucide.dev.
3. Скачать:

```bash
curl -fsSL "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/{slug}.svg" \
  -o public/icons/brands/{slug}.svg
```

Fallback: unpkg →  
`https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/{slug}.svg`

4. Lucide static при необходимости:

```bash
curl -fsSL "https://cdn.jsdelivr.net/npm/lucide-static@0.469.0/icons/{name}.svg" \
  -o public/icons/ui/{name}.svg
```

5. Нормализация: сохранить `viewBox`; `fill` = brand hex или `currentColor`; без scripts; размер в UI классами.
6. Обновить data/импорты локальным путём.
7. Для `<img>` / `next/image` — fallback на placeholder.

## Brand colors

Бери hex с simpleicons.org для конкретного slug. Примеры: React `#61DAFB`, Docker `#2496ED`, Telegram `#26A5E4`.

## UI in components

Кнопки/chrome (`ExternalLink`, `Check`, …) — **`lucide-react`**.  
Файлы в `public/icons/` — data-driven списки и static assets.

## Checklist

- [ ] SVG в `public/icons/`, не CDN URL в коде
- [ ] Скачано с jsDelivr / unpkg / GitHub raw / Lucide
- [ ] Пути обновлены
- [ ] Brand `color` где нужен tint
- [ ] Fallback для media icons
