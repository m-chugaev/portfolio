import { projectPath, projects } from "./projects";
import { servicePath } from "./services";

export const FUNNEL_MAX = 72;

export const calculatorDefaults = {
  visits: 1200,
  leads: 18,
  whatIf: 2,
} as const;

export const funnelSteps = [
  { id: "hero", label: "Открыл первый экран", weight: 3, done: true },
  { id: "calc", label: "Посчитал конверсию", weight: 12, done: false },
  { id: "services", label: "Изучил услуги", weight: 8, done: false },
  { id: "cases", label: "Раскрыл кейс", weight: 10, done: false },
  { id: "prices", label: "Посмотрел цены", weight: 9, done: false },
  { id: "faq", label: "Прочитал ответ в FAQ", weight: 6, done: false },
  { id: "contact", label: "Дошёл до контактов", weight: 14, done: false },
] as const;

export const blockMetrics = [
  { id: "hero", base: 9.4, label: "клик с экрана", floating: false },
  { id: "calc", base: 21, label: "доходят до расчёта", floating: false },
  { id: "services", base: 14.2, label: "переход в услугу", floating: false },
  { id: "cases", base: 11.8, label: "раскрыли кейс", floating: false },
  { id: "process", base: 38, label: "дочитали блок", floating: false },
  { id: "prices", base: 27.5, label: "цена → контакт", floating: false },
  { id: "faq", base: 17.3, label: "открыли ответ", floating: false },
  { id: "contact", base: 31, label: "контакты → заявка", floating: true },
] as const;

export function formatDemo(value: number): string {
  return `${value.toFixed(1).replace(".", ",")}%`;
}

export function leadWord(count: number): string {
  const abs = Math.abs(Math.trunc(count));
  const mod10 = abs % 10;
  const mod100 = abs % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return "заявка";
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return "заявки";
  }

  return "заявок";
}

export function safeVisits(visits: number): number {
  if (!Number.isFinite(visits) || visits < 1) {
    return 1;
  }

  return visits;
}

export function safeLeads(leads: number): number {
  if (!Number.isFinite(leads) || leads < 0) {
    return 0;
  }

  return leads;
}

export function conversionRate(leads: number, visits: number): number {
  return (safeLeads(leads) / safeVisits(visits)) * 100;
}

export function projectedLeads(visits: number, ratePercent: number): number {
  return Math.round((safeVisits(visits) * ratePercent) / 100);
}

export const funnelServices = [
  {
    id: "telegram-bots",
    href: servicePath("telegram-bots"),
    mark: "A · ответ за секунды",
    title: "Telegram-бот для бизнеса",
    text: "Заказы, запись, уведомления и статусы в Telegram. Клиент не ждёт ответа в директе.",
    step: "Шаг воронки: обращение → заявка",
    price: "от 10 000 ₽",
    note: "меню, сбор заявки, отправка в Telegram · 3–5 дней",
  },
  {
    id: "booking-sites",
    href: servicePath("booking-sites"),
    mark: "B · запись в пару касаний",
    title: "Сайт с онлайн-записью",
    text: "Услуги, фото, карта и запись. Форма в Telegram или виджет YClients и DIKIDI, плюс Метрика.",
    step: "Шаг воронки: визит → запись",
    price: "от 10 000 ₽ за страницу",
    note: "от 2 дней · онлайн-запись отдельно",
  },
  {
    id: "integrations",
    href: servicePath("integrations"),
    mark: "C · ни одной потерянной заявки",
    title: "Интеграции и автоматизация",
    text: "Битрикс, amoCRM, ЮKassa, Tilda, подключение интернет-эквайринга. Без ручного копирования.",
    step: "Шаг воронки: заявка → оплата",
    price: "после разбора",
    note: "стоимость и срок после разбора задачи",
  },
  {
    id: "web-apps",
    href: servicePath("web-apps"),
    mark: "D · путь без тупиков",
    title: "Веб-приложения и кабинеты",
    text: "Кабинеты, админки и SaaS MVP. Первая версия по этапам, с демо, а не «сразу всё».",
    step: "Шаг воронки: регистрация → действие",
    price: "от 10 000 ₽ за экран",
    note: "сроки после разбора задачи",
  },
] as const;

const caseTags: Record<string, readonly string[]> = {
  "hrm-saas": ["PHP", "Laravel", "GraphQL", "PostgreSQL", "Docker", "Kubernetes"],
  studybay: ["PHP", "Laravel", "PostgreSQL", "GraphQL", "React"],
  mgu: ["Product", "Web", "Education"],
  "poker-club": ["Next.js", "Landing", "UX"],
  "life-tracker": ["iOS", "Swift", "Product"],
};

const caseTitles: Record<string, string> = {
  "poker-club": "Сайт покерного клуба",
};

const caseOrder = [
  "hrm-saas",
  "studybay",
  "mgu",
  "poker-club",
  "life-tracker",
];

export const conversionCases = caseOrder.map((id) => {
  const project = projects.find((item) => item.id === id);

  if (!project) {
    throw new Error(id);
  }

  return {
    id: project.id,
    href: projectPath(project.id),
    role: project.role,
    year: project.year,
    title: caseTitles[project.id] ?? project.title,
    subtitle: project.product,
    body: project.description,
    tags: caseTags[project.id] ?? project.tags.slice(0, 6),
    concept: project.id === "poker-club",
  };
});

export const priceRows = [
  {
    id: "telegram-bots",
    href: servicePath("telegram-bots"),
    name: "Telegram-бот",
    price: "от 10 000 ₽",
    priceSuffix: "",
    term: "3–5 дней после согласования задачи и материалов",
  },
  {
    id: "booking-sites",
    href: servicePath("booking-sites"),
    name: "Сайт с записью",
    price: "от 10 000 ₽",
    priceSuffix: " / страница",
    term: "от 2 дней; онлайн-запись в цену не входит",
  },
  {
    id: "web-apps",
    href: servicePath("web-apps"),
    name: "Веб-приложение",
    price: "от 10 000 ₽",
    priceSuffix: " / экран",
    term: "после разбора задачи",
  },
  {
    id: "integrations",
    href: servicePath("integrations"),
    name: "Интеграции",
    price: "после разбора",
    priceSuffix: "",
    term: "после разбора задачи",
  },
  {
    id: "audit",
    href: "",
    name: "Аудит конверсии",
    price: "после разбора задачи",
    priceSuffix: "",
    term: "после разбора задачи",
  },
] as const;

export const processSteps = [
  {
    index: "01",
    title: "Разбор задачи",
    text: "Как устроен путь клиента сейчас и где он обрывается. Варианты проще и полнее, оценка.",
  },
  {
    index: "02",
    title: "Фиксируем объём",
    text: "Что входит, этапы и как принимаем результат. Без размытого «сделаем всё».",
  },
  {
    index: "03",
    title: "Делаем по этапам",
    text: "Показываю рабочий результат по мере готовности, а не только макет в конце.",
  },
  {
    index: "04",
    title: "Сдача и замер",
    text: "Передаю доступы, настраиваю цели в Метрике, чтобы конверсию было видно в цифрах.",
  },
] as const;

export function answerParts(answer: string): Array<{ text: string; placeholder: boolean }> {
  return answer.split(/(\[[^\]]+\])/g).filter(Boolean).map((text) => ({
    text,
    placeholder: text.startsWith("[") && text.endsWith("]"),
  }));
}
