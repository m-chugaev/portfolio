export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-dev.su",
  name: "Михаил Чугаев",
  locale: "ru_RU",
  og: {
    path: "/og.jpg",
    width: 1200,
    height: 629,
    type: "image/jpeg",
  },
} as const;

export const yandexMetrika = {
  id: 114130745,
  src: "https://mc.yandex.ru/metrika/tag.js?id=114130745",
  watch: "https://mc.yandex.ru/watch/114130745",
} as const;

export function siteOrigin(): string {
  return site.url.replace(/\/$/, "");
}
