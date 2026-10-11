export type Project = {
  id: string;
  title: string;
  role: string;
  product: string;
  context: string;
  description: string;
  year: string;
  tags: string[];
  href?: string;
  linkLabel?: string;
  images: string[];
  imageAlt: string;
};

export const projects: Project[] = [
  {
    id: "hrm-saas",
    title: "HRM SaaS",
    role: "Team Lead / Tech Lead",
    product: "SaaS для управления персоналом: доступы, подбор и подписки",
    context: "Технологии управления персоналом",
    description:
      "С нуля спроектировал backend и схему БД, собрал команду и довёл до продакшена модули прав, воронки найма, интеграций и биллинга.",
    year: "2025–2026",
    tags: ["PHP", "Laravel", "GraphQL", "PostgreSQL", "Docker", "Kubernetes"],
    images: ["/promo/s1.png", "/promo/s2.png", "/promo/s3.png"],
    imageAlt: "Интерфейс HRM SaaS: доступы, подбор и подписка",
  },
  {
    id: "studybay",
    title: "Studybay",
    role: "Senior Fullstack",
    product: "Крупный образовательный сервис для студентов",
    context: "В рамках работы в Studyworld",
    description:
      "Развивал и поддерживал продуктовую платформу: оптимизация, рефакторинг, код-ревью и менторинг команды.",
    year: "2020–2025",
    tags: ["PHP", "Laravel", "PostgreSQL", "GraphQL", "React"],
    href: "https://studybay.com",
    linkLabel: "studybay.com",
    images: ["/promo/sb1.png", "/promo/sb2.png", "/promo/sb3.png"],
    imageAlt: "Интерфейс Studybay",
  },
  {
    id: "mgu",
    title: "МГУ им. Петра Великого",
    role: "Product & Web",
    product: "Сайт приёма и запуск колледжа",
    context: "Образовательная деятельность и открытие колледжа",
    description:
      "Помогал запускать образовательное направление: путь абитуриента, программы обучения и посадочные страницы.",
    year: "2024",
    tags: ["Product", "Web", "Education"],
    href: "https://mgu-edu.ru",
    linkLabel: "mgu-edu.ru",
    images: ["/promo/mgu1.png", "/promo/mgu2.png", "/promo/mgu3.png"],
    imageAlt: "Сайт МГУ им. Петра Великого",
  },
  {
    id: "life-tracker",
    title: "Life Tracker",
    role: "Author & Solo Dev",
    product: "iOS-приложение для привычек, дат и списков",
    context: "Запуск личных проектов",
    description:
      "С нуля собрал продукт: идея, дизайн, разработка и публикация в App Store.",
    year: "2021",
    tags: ["iOS", "Swift", "Product"],
    href: "https://apps.apple.com/ru/app/%D1%82%D1%80%D0%B5%D0%BA%D0%B5%D1%80-%D0%BF%D1%80%D0%B8%D0%B2%D1%8B%D1%87%D0%B5%D0%BA-%D0%B4%D0%B0%D1%82-%D0%B8-%D1%81%D0%BF%D0%B8%D1%81%D0%BA%D0%BE%D0%B2/id1569970464",
    linkLabel: "App Store",
    images: ["/promo/lt1.png", "/promo/lt2.jpg", "/promo/lt3.png"],
    imageAlt: "Приложение Life Tracker",
  },
];
