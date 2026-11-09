export type ProjectLink = {
  href: string;
  label: string;
};

export type Project = {
  id: string;
  title: string;
  role: string;
  product: string;
  context: string;
  description: string;
  year: string;
  period: string;
  tags: string[];
  stack: string[];
  tools?: string[];
  href?: string;
  linkLabel?: string;
  extraLinks?: ProjectLink[];
  images: string[];
  imageAlt: string;
  seoTitle: string;
  seoDescription: string;
  jsonLdType: "CreativeWork" | "SoftwareApplication";
  applicationCategory?: string;
  operatingSystem?: string;
  employment?: {
    employer: string;
    kind: "product-team" | "lead" | "solo" | "product";
    note: string;
  };
  summary: string[];
  task?: string[];
  roleDetails?: string[];
  work?: string[];
  results?: string[];
};

export const PROJECTS_INDEX_PATH = "/projects";

export function projectPath(id: string): string {
  return `${PROJECTS_INDEX_PATH}/${id}`;
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getOtherProjects(id: string): Project[] {
  return projects.filter((project) => project.id !== id);
}

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
    period: "Июль 2025 — сентябрь 2026",
    tags: ["PHP", "Laravel", "GraphQL", "PostgreSQL", "Docker", "Kubernetes"],
    stack: [
      "PHP",
      "Laravel",
      "GraphQL",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Kubernetes",
      "CI/CD",
    ],
    tools: [
      "Jira",
      "Figma (Untitled UI)",
      "Miro",
      "Gitlab",
      "Argocd",
      "Lens",
      "Postman",
    ],
    images: ["/promo/s1.jpg", "/promo/s2.jpg", "/promo/s3.jpg"],
    imageAlt: "Интерфейс HRM SaaS: доступы, подбор и подписка",
    seoTitle: "HRM SaaS — Team Lead / Tech Lead · Михаил Чугаев",
    seoDescription:
      "Кейс Team Lead / Tech Lead: backend и схема БД HRM SaaS с нуля, команда, модули прав, воронка найма, интеграции и биллинг. Laravel, GraphQL, PostgreSQL.",
    jsonLdType: "CreativeWork",
    employment: {
      employer: "Технологии управления персоналом",
      kind: "lead",
      note: "Позиция в продуктовой команде работодателя, не фриланс-заказ. На Habr Career указаны роли Team Lead / Tech Lead / Senior Backend Developer.",
    },
    summary: [
      "HRM SaaS обычно собирает в одном контуре доступы, сотрудников, подбор и подписки — чтобы HR и финансы не вели это в разрозненных таблицах и внешних сервисах. Типовой контур: роли, карточки сотрудников, графики и табели, расчёты, воронка вакансий и оплата подписки.",
      "В этом кейсе я с нуля спроектировал backend и схему БД, собрал команду и довёл до продакшена модули прав, воронки найма, интеграций и биллинга.",
    ],
    task: [
      "Запустить backend SaaS для управления персоналом как модульный монолит на Laravel с GraphQL API.",
      "Заложить схему данных под права доступа, сотрудников, подбор и биллинг, чтобы модули можно было поставлять по спринтам.",
      "Собрать поставку: Docker, CI/CD, Kubernetes, очереди и Redis.",
    ],
    roleDetails: [
      "Team Lead / Tech Lead: архитектура backend, схема БД и ответственность за поставку модулей в продакшен.",
      "Управление командой из 5 человек, найм и развитие: frontend, дизайн, аналитика.",
      "Наставничество project-менеджера и выстраивание процессов поставки.",
      "Двухнедельные спринты: планирование, декомпозиция, контроль метрик VEL, Sprint Goal, TCP, TAS.",
      "Design review в Untitled UI на протяжении проекта.",
    ],
    work: [
      "Спроектировал и разработал backend SaaS с нуля: Laravel, модульный монолит, GraphQL.",
      "Спроектировал схему БД, права доступа, расчёты заработной платы, валидации и отчётность.",
      "Собрал интеграции с Avito, HeadHunter и ЮKassa: подписки и биллинг с нуля.",
      "Настроил Docker, CI/CD, Kubernetes, очереди и Redis.",
      "Автоматизировал техревью, отчёты по задачам и проверку CI с помощью ИИ.",
    ],
    results: [
      "Архитектура backend и схема БД под HRM/payroll MVP — с акцентом на простой онбординг и поддержку.",
      "За ~29 спринтов команда поставила 9619 story points при плане 11260 (~85% выполнения).",
      "Лично закрыл 1727 SP из 1731 запланированных (~99.8%; в 23 из 28 спринтов — 100%).",
      "Средняя доля срочных задач в спринте ~1.5%.",
      "По SaaS закрыли 110+ бизнес-целей спринтов: права и роли, сотрудники, графики, табели, расчёты, ведомости, воронка, вакансии и другие модули.",
      "Покрытие backend тестами на 100%.",
      "Собрал команду: нанял frontend и двух дизайнеров, подключил внешнего аналитика.",
    ],
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
    period: "Октябрь 2020 — апрель 2025",
    tags: ["PHP", "Laravel", "PostgreSQL", "GraphQL", "React"],
    stack: [
      "PHP 7.2–8.1",
      "Laravel",
      "GraphQL",
      "Twig",
      "PostgreSQL",
      "Redis",
      "Nginx",
      "JavaScript",
      "React",
    ],
    tools: [
      "JIRA",
      "Bitbucket",
      "Gitlab",
      "Sentry",
      "Grafana",
      "Figma",
      "Miro",
    ],
    href: "https://studybay.com",
    linkLabel: "studybay.com",
    images: ["/promo/sb1.jpg", "/promo/sb2.jpg", "/promo/sb3.jpg"],
    imageAlt: "Интерфейс Studybay",
    seoTitle: "Studybay — Senior Fullstack в Studyworld · Михаил Чугаев",
    seoDescription:
      "Работа в продуктовой команде Studyworld над платформой Studybay: поддержка, оптимизация SQL, рефакторинг, код-ревью и менторинг. Senior Fullstack, 2020–2025.",
    jsonLdType: "CreativeWork",
    employment: {
      employer: "Studyworld",
      kind: "product-team",
      note: "Это штатная работа в продуктовой команде Studyworld над платформой Studybay, а не фриланс-проект для внешнего заказчика. На сайте роль указана как Senior Fullstack, в профиле Habr Career — Senior Backend Developer: в зоне ответственности были backend, ревью frontend и менторинг.",
    },
    summary: [
      "Studybay — крупный образовательный сервис для студентов. Такие платформы со временем обрастают длинной кодовой базой, сложными выборками и связанными сценариями: устойчивость зависит от тех, кто держит легаси, ускоряет запросы и помогает команде поставлять изменения без сюрпризов.",
      "Я работал в команде Studyworld над этой продуктовой платформой: развивал и поддерживал её, занимался оптимизацией, рефакторингом, код-ревью и менторингом.",
    ],
    task: [
      "Поддерживать и развивать продуктовую платформу Studybay с кодовой базой старше 10 лет.",
      "Ускорять узкие места: SQL-запросы, N+1, обновление больших массивов данных по сложным условиям.",
      "Помогать команде: ревью, менторинг, декомпозиция и стыковка с бизнес-требованиями.",
    ],
    roleDetails: [
      "Senior Fullstack в продуктовой команде Studyworld (на Habr Career позиция указана как Senior Backend Developer).",
      "Код-ревью backend- и frontend-задач, менторинг новичков.",
      "Анализ бизнес-требований и консультации постановщиков задач.",
      "Постановка и декомпозиция задач.",
      "Год был проджект-менеджером для команды из 8 человек.",
    ],
    work: [
      "Разработка и поддержка кодовой базы возрастом больше 10 лет.",
      "Оптимизация скорости: анализ SQL-запросов, разбор N+1.",
      "Обновление больших массивов данных по сложным комплексным условиям.",
      "План рефакторинга и его реализация.",
      "Написал онбординг с нуля и провёл через него нескольких новичков.",
      "Настроил дашборд в Grafana, которым пользовалось больше 50 человек.",
    ],
    results: [
      "1 место по числу выполненных story points за год: 998 SP из общих 4312 SP.",
      "Более 50 ретроспектив и более 300 предложенных решений проблем.",
      "Исправил более 2000 ошибок в Sentry.",
    ],
  },
  {
    id: "mgu",
    title: "МГУ им. Петра Великого",
    role: "Product & Web",
    product: "Сайт приёма и запуск колледжа",
    context: "Создание дистанционного образования в Перми",
    description:
      "Помогал запускать образовательное направление: путь абитуриента, программы обучения и посадочные страницы.",
    year: "2024",
    period: "2024",
    tags: ["Product", "Web", "Education"],
    stack: ["Product", "Web", "Education"],
    href: "https://mgu-edu.ru",
    linkLabel: "mgu-edu.ru",
    images: ["/promo/mgu1.jpg", "/promo/mgu2.jpg", "/promo/mgu3.jpg"],
    imageAlt: "Сайт МГУ им. Петра Великого",
    seoTitle: "МГУ им. Петра Великого — Product & Web · Михаил Чугаев",
    seoDescription:
      "Кейс Product & Web: сайт приёма и запуск колледжа МГУ им. Петра Великого — путь абитуриента, программы и посадочные страницы дистанционного образования в Перми.",
    jsonLdType: "CreativeWork",
    employment: {
      employer: "МГУ им. Петра Великого",
      kind: "product",
      note: "Роль Product & Web на запуске образовательного направления. В профиле Habr Career отдельной позиции по этому проекту нет.",
    },
    summary: [
      "Сайт приёма для дистанционного образования обычно закрывает короткий путь: понять программы, выбрать формат и оставить заявку, не собирая это из разрозненных лендингов. Публичный сайт mgu-edu.ru так и устроен: витрина программ, объяснение дистанционного формата и анкета поступления.",
      "В 2024 году я помогал запускать образовательное направление в Перми: путь абитуриента, программы обучения и посадочные страницы.",
    ],
    task: [
      "Запустить сайт приёма и посадочные страницы под дистанционное образование.",
      "Собрать путь абитуриента: от программ обучения до заявки.",
    ],
    roleDetails: [
      "Product & Web на запуске направления, а не отдельная штатная позиция из резюме Habr Career.",
    ],
    work: [
      "Помогал запускать образовательное направление: путь абитуриента, программы обучения и посадочные страницы.",
    ],
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
    period: "2021, публикация в App Store",
    tags: ["iOS", "Swift", "Product"],
    stack: ["iOS", "Swift", "Product"],
    href: "https://apps.apple.com/ru/app/%D1%82%D1%80%D0%B5%D0%BA%D0%B5%D1%80-%D0%BF%D1%80%D0%B8%D0%B2%D1%8B%D1%87%D0%B5%D0%BA-%D0%B4%D0%B0%D1%82-%D0%B8-%D1%81%D0%BF%D0%B8%D1%81%D0%BA%D0%BE%D0%B2/id1569970464",
    linkLabel: "App Store",
    extraLinks: [
      {
        href: "https://m-chugaev.github.io/life-tracker-app/privacy-policy.html",
        label: "Политика конфиденциальности",
      },
      {
        href: "https://m-chugaev.github.io/life-tracker-app/terms-and-conditions.html",
        label: "Условия использования",
      },
    ],
    images: ["/promo/lt1.jpg", "/promo/lt2.jpg", "/promo/lt3.jpg"],
    imageAlt: "Приложение Life Tracker",
    seoTitle: "Life Tracker — iOS-приложение · Михаил Чугаев",
    seoDescription:
      "Авторский iOS-продукт Life Tracker: привычки, даты и списки. Идея, дизайн, разработка на Swift и публикация в App Store в 2021 году. Бесплатно, с покупками.",
    jsonLdType: "SoftwareApplication",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS",
    employment: {
      employer: "Личный продукт",
      kind: "solo",
      note: "Авторская разработка без заказчика: идея, дизайн, код и публикация. В профиле Habr Career отдельной позиции нет.",
    },
    summary: [
      "Трекер привычек и дат решает простую задачу: не размазывать дни рождения, цели и чек-листы по заметкам и календарям. Life Tracker собирает важные даты, привычки и списки в одном приложении с минималистичным интерфейсом.",
      "В 2021 году я с нуля собрал продукт — идея, дизайн, разработка и публикация в App Store. В магазине приложение выходит как «Трекер привычек, дат и списков», разработчик — Mikhail Chugaev.",
    ],
    task: [
      "Собрать iOS-приложение для привычек, дат и списков и опубликовать его в App Store.",
      "Закрыть весь цикл соло: идея, дизайн, разработка и релиз.",
    ],
    roleDetails: [
      "Author & Solo Dev: один человек на продукт, без продуктовой команды заказчика.",
    ],
    work: [
      "Спроектировал и разработал приложение на Swift для iPhone (iOS 14 и новее).",
      "Собрал сценарии: отсчёт до дат и прошедших событий, чек-листы, список стран, 30-дневные испытания, настройка цвета, светлая и тёмная темы.",
      "Опубликовал приложение в App Store; есть политика конфиденциальности и условия использования.",
      "В описании версии 2.0 от 9 сентября 2024 года указано, что подписка больше не обязательна для пользования приложением.",
    ],
    results: [
      "Приложение доступно в App Store: бесплатно, со встроенными покупками, категория «Образ жизни», языки русский и английский, размер 8 МБ.",
      "Оценка 4,1 из 5 на основе 15 оценок в App Store на момент сбора данных для этой страницы.",
    ],
  },
];
