import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { site, siteOrigin } from "@/data/site";

export const seo = {
  title: `${profile.name} — сайты и приложения под ключ`,
  description: `${profile.headline} ${profile.headlineAccent}. ${profile.slogan}`,
  keywords: [
    "Михаил Чугаев",
    "fullstack разработчик",
    "сайты под ключ",
    "веб-приложения",
    "Laravel",
    "PHP",
    "React",
    "PostgreSQL",
    "тимлид",
    "портфолио",
  ],
  ogAlt: `${profile.name} — ${profile.headlineAccent}`,
} as const;

export function absoluteUrl(path = "/"): string {
  const origin = siteOrigin();
  if (path === "/" || path === "") {
    return origin;
  }

  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getStructuredData() {
  const pageUrl = absoluteUrl("/");
  const personId = `${pageUrl}/#person`;
  const websiteId = `${pageUrl}/#website`;
  const webpageId = `${pageUrl}/#webpage`;
  const knowsAbout = [
    ...profile.skills.map((item) => item.name),
    ...profile.skillRequests.map((item) => item.name),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        url: pageUrl,
        jobTitle: profile.roles,
        description: seo.description,
        email: profile.contacts.email.label,
        image: absoluteUrl(site.og.path),
        sameAs: [profile.contacts.telegram.href, profile.contacts.habr.href],
        knowsAbout,
        workExample: projects.map((project) => ({
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          ...(project.href ? { url: project.href } : {}),
        })),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: pageUrl,
        name: profile.name,
        inLanguage: "ru",
        description: seo.description,
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": webpageId,
        url: pageUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: "ru",
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "ItemList",
        name: "Над чем я работал",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.title,
          description: project.product,
          ...(project.href ? { url: project.href } : {}),
        })),
      },
      {
        "@type": "ItemList",
        name: "Популярные запросы бизнеса сейчас",
        itemListElement: profile.skillRequests.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
        })),
      },
    ],
  };
}
