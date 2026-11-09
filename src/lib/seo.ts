import type { Metadata } from "next";
import { profile } from "@/data/profile";
import {
  PROJECTS_INDEX_PATH,
  projectPath,
  type Project,
  projects,
} from "@/data/projects";
import {
  SERVICES_INDEX_PATH,
  servicePath,
  services,
  servicesIndex,
  type Service,
} from "@/data/services";
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
  projectsIndexTitle: `Проекты — кейсы и опыт · ${profile.name}`,
  projectsIndexDescription:
    "Кейсы Михаила Чугаева: HRM SaaS, работа в команде Studyworld над Studybay, сайт МГУ им. Петра Великого и iOS-приложение Life Tracker — роли, стек и ссылки.",
} as const;

export function personId(): string {
  return `${absoluteUrl("/")}/#person`;
}

export function websiteId(): string {
  return `${absoluteUrl("/")}/#website`;
}

export function canonicalPath(path = "/"): string {
  if (path === "/" || path === "") {
    return "/";
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized.endsWith("/") ? normalized : `${normalized}/`;
}

export function absoluteUrl(path = "/"): string {
  const origin = siteOrigin();
  const normalized = canonicalPath(path);

  if (normalized === "/") {
    return origin;
  }

  return `${origin}${normalized}`;
}

const ogImage = {
  url: site.og.path,
  width: site.og.width,
  height: site.og.height,
  alt: seo.ogAlt,
  type: site.og.type,
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  ogType = "website",
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogType?: "website" | "article";
}): Metadata {
  const pathWithSlash = canonicalPath(path);

  return {
    title,
    description,
    keywords: keywords ?? [...seo.keywords],
    alternates: {
      canonical: pathWithSlash,
    },
    openGraph: {
      type: ogType,
      locale: site.locale,
      url: pathWithSlash,
      siteName: profile.name,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [site.og.path],
    },
  };
}

function personNode() {
  const pageUrl = absoluteUrl("/");
  const knowsAbout = [
    ...profile.skills.map((item) => item.name),
    ...profile.skillRequests.map((item) => item.name),
  ];

  return {
    "@type": "Person",
    "@id": personId(),
    name: profile.name,
    url: pageUrl,
    jobTitle: profile.roles,
    description: seo.description,
    email: profile.contacts.email.label,
    image: absoluteUrl(site.og.path),
    sameAs: [profile.contacts.telegram.href, profile.contacts.habr.href],
    knowsAbout,
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.h1,
        url: absoluteUrl(servicePath(service.id)),
      },
    })),
    workExample: projects.map((project) => ({
      "@type":
        project.jsonLdType === "SoftwareApplication"
          ? "SoftwareApplication"
          : "CreativeWork",
      name: project.title,
      description: project.description,
      url: absoluteUrl(projectPath(project.id)),
      ...(project.href ? { sameAs: project.href } : {}),
    })),
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": websiteId(),
    url: absoluteUrl("/"),
    name: profile.name,
    inLanguage: "ru",
    description: seo.description,
    publisher: { "@id": personId() },
  };
}

export function getSiteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [personNode(), websiteNode()],
  };
}

export function getHomePageGraph() {
  const pageUrl = absoluteUrl("/");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: "ru",
        isPartOf: { "@id": websiteId() },
        about: { "@id": personId() },
        mainEntity: { "@id": personId() },
      },
      {
        "@type": "ItemList",
        name: "Над чем я работал",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.title,
          description: project.product,
          url: absoluteUrl(projectPath(project.id)),
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
      {
        "@type": "ItemList",
        name: "Услуги",
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.h1,
          description: service.cardPitch,
          url: absoluteUrl(servicePath(service.id)),
        })),
      },
    ],
  };
}

export function getProjectsIndexGraph() {
  const pageUrl = absoluteUrl(PROJECTS_INDEX_PATH);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: seo.projectsIndexTitle,
        description: seo.projectsIndexDescription,
        inLanguage: "ru",
        isPartOf: { "@id": websiteId() },
        about: { "@id": personId() },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#list`,
        name: "Кейсы",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.title,
          description: project.product,
          url: absoluteUrl(projectPath(project.id)),
        })),
      },
      breadcrumbNode(pageUrl, [
        { name: "Главная", path: "/" },
        { name: "Проекты", path: PROJECTS_INDEX_PATH },
      ]),
    ],
  };
}

export function getServicesIndexGraph() {
  const pageUrl = absoluteUrl(SERVICES_INDEX_PATH);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: servicesIndex.seoTitle,
        description: servicesIndex.seoDescription,
        inLanguage: "ru",
        isPartOf: { "@id": websiteId() },
        about: { "@id": personId() },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#list`,
        name: "Услуги",
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.h1,
          description: service.cardPitch,
          url: absoluteUrl(servicePath(service.id)),
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: servicesIndex.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      breadcrumbNode(pageUrl, [
        { name: "Главная", path: "/" },
        { name: "Услуги", path: SERVICES_INDEX_PATH },
      ]),
    ],
  };
}

export function getServicePageGraph(service: Service) {
  const path = servicePath(service.id);
  const pageUrl = absoluteUrl(path);
  const serviceId = `${pageUrl}#service`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: service.seoTitle,
        description: service.seoDescription,
        inLanguage: "ru",
        isPartOf: { "@id": websiteId() },
        about: { "@id": serviceId },
        mainEntity: { "@id": serviceId },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: service.h1,
        description: service.seoDescription,
        url: pageUrl,
        serviceType: service.serviceType,
        provider: { "@id": personId() },
        areaServed: {
          "@type": "Country",
          name: "Россия",
        },
        availableLanguage: "ru",
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: service.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      breadcrumbNode(pageUrl, [
        { name: "Главная", path: "/" },
        { name: "Услуги", path: SERVICES_INDEX_PATH },
        { name: service.navLabel, path },
      ]),
    ],
  };
}

export function getProjectPageGraph(project: Project) {
  const path = projectPath(project.id);
  const pageUrl = absoluteUrl(path);
  const workId = `${pageUrl}#work`;
  const workType =
    project.jsonLdType === "SoftwareApplication"
      ? "SoftwareApplication"
      : "CreativeWork";

  const work: Record<string, unknown> = {
    "@type": workType,
    "@id": workId,
    name: project.title,
    description: project.description,
    url: pageUrl,
    inLanguage: "ru",
    creator: { "@id": personId() },
    author: { "@id": personId() },
    keywords: project.stack.join(", "),
    ...(project.href ? { sameAs: project.href } : {}),
  };

  if (project.jsonLdType === "SoftwareApplication") {
    work.applicationCategory = project.applicationCategory;
    work.operatingSystem = project.operatingSystem;
    work.offers = {
      "@type": "Offer",
      price: "0",
      priceCurrency: "RUB",
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: project.seoTitle,
        description: project.seoDescription,
        inLanguage: "ru",
        isPartOf: { "@id": websiteId() },
        about: { "@id": workId },
        mainEntity: { "@id": workId },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      work,
      breadcrumbNode(pageUrl, [
        { name: "Главная", path: "/" },
        { name: "Проекты", path: PROJECTS_INDEX_PATH },
        { name: project.title, path },
      ]),
    ],
  };
}

function breadcrumbNode(
  pageUrl: string,
  items: { name: string; path: string }[],
) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
