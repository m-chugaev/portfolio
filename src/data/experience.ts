export type AdditionalExperience = {
  id: string;
  employer: string;
  role: string;
  period: string;
  industry: string;
  location: string;
  summary: string;
  work: string[];
  stack: string[];
  companyHref?: string;
};

export const additionalExperience: AdditionalExperience[] = [
  {
    id: "fbs",
    employer: "FBS",
    role: "Senior fullstack developer",
    period: "Ноябрь 2018 — июнь 2020",
    industry: "Финансовые услуги",
    location: "Санкт-Петербург",
    summary:
      "Работа в компании финансовых услуг: команда разработки, спринты, Yii2 и инфраструктура. Отдельной страницы кейса нет — в открытых источниках нет названия продукта и публичных результатов.",
    work: [
      "Управление командой разработчиков, планирование спринтов и распределение задач.",
      "Код-ревью PHP/Yii2 и ES6, рефакторинг legacy-кода.",
      "Фронтенд на Yii2, вёрстка HTML, SCSS, ES6.",
      "Проектирование архитектуры и базы данных PostgreSQL.",
      "Настройка Gitlab CI/CD, Docker и сборки на Gulp.",
    ],
    stack: [
      "PHP",
      "Yii2",
      "JavaScript",
      "jQuery",
      "HTML",
      "CSS",
      "БЭМ",
      "PostgreSQL",
      "Docker",
      "CI/CD",
    ],
    companyHref: "https://career.habr.com/companies/fbs-com",
  },
  {
    id: "ckdigital",
    employer: "Сайт консалтинг",
    role: "Fullstack developer",
    period: "Июль 2017 — октябрь 2018",
    industry: "Эффективные решения для бизнеса в интернете",
    location: "Пермь",
    summary:
      "Проектная разработка сайтов и внутренних инструментов в веб-студии. Отдельных кейсов по клиентам нет: в открытом профиле нет названий сайтов, ссылок и разрешений на публикацию.",
    work: [
      "Разработка и поддержка сайтов, вёрстка и интеграция с 1С-Битрикс.",
      "Разработка CRM на Yii2.",
      "Поддержка проектов на React и Vue.",
      "Проектирование баз данных и архитектуры, наставничество.",
    ],
    stack: [
      "PHP",
      "Yii2",
      "JavaScript",
      "jQuery",
      "HTML",
      "CSS",
      "БЭМ",
      "Gulp",
      "Sass",
      "MySQL",
      "1С-Битрикс",
      "Git",
    ],
    companyHref: "https://career.habr.com/companies/ckdigital",
  },
];
