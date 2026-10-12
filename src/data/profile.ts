export const profile = {
  name: "Михаил Чугаев",
  roles: "Backend · Frontend · Lead",
  headline: "Разрабатываю",
  headlineAccent: "веб-приложения и сайты под ключ",
  slogan:
    "От идеи и архитектуры до запуска. Один контакт — закрываю все вопросы по дороге.",
  location: "Москва · удалённо и переезд",
  experience: "9 лет в разработке",
  responseNote: "Быстро отвечаю и погружаюсь в проект",
  advantages: [
    {
      title: "Полный цикл разработки",
      description: "От обсуждения задачи и архитектуры до релиза и поддержки.",
      icon: "/icons/advantages/rocket.svg",
    },
    {
      title: "Опыт в команде и лидерство",
      description:
        "Руководил командами до 8 человек: найм, онбординг, код-ревью и соблюдение дедлайнов.",
      icon: "/icons/advantages/users.svg",
    },
    {
      title: "Надёжный код и качество",
      description: "Простые решения без оверинжиниринга, удобные для поддержки.",
      icon: "/icons/advantages/shield-check.svg",
    },
    {
      title: "Бизнес-ориентированный подход",
      description: "От бизнес-цели до измеримого результата в продукте.",
      icon: "/icons/advantages/chart.svg",
    },
  ],
  skills: [
    { name: "PHP", icon: "/icons/tech/php.svg", color: "#777BB4" },
    { name: "Laravel", icon: "/icons/tech/laravel.svg", color: "#FF2D20" },
    { name: "PostgreSQL", icon: "/icons/tech/postgresql.svg", color: "#4169E1" },
    { name: "React", icon: "/icons/tech/react.svg", color: "#61DAFB" },
    { name: "JavaScript", icon: "/icons/tech/javascript.svg", color: "#F7DF1E" },
    { name: "Docker", icon: "/icons/tech/docker.svg", color: "#2496ED" },
    { name: "Kubernetes", icon: "/icons/tech/kubernetes.svg", color: "#326CE5" },
    { name: "Redis", icon: "/icons/tech/redis.svg", color: "#FF4438" },
  ],
  skillRequests: [
    {
      name: "AI-интеграции",
      icon: "/icons/business/sparkles.svg",
      color: "#A78BFA",
    },
    {
      name: "Telegram-боты",
      icon: "/icons/business/telegram.svg",
      color: "#26A5E4",
    },
    {
      name: "Автоматизация",
      icon: "/icons/business/bot.svg",
      color: "#34D399",
    },
    {
      name: "Личный кабинет",
      icon: "/icons/business/layout-dashboard.svg",
      color: "#60A5FA",
    },
    {
      name: "CRM и воронки",
      icon: "/icons/business/waypoints.svg",
      color: "#F472B6",
    },
    {
      name: "Платежи",
      icon: "/icons/business/wallet.svg",
      color: "#FBBF24",
    },
    {
      name: "Аналитика",
      icon: "/icons/business/chart-column.svg",
      color: "#38BDF8",
    },
    {
      name: "Интеграции",
      icon: "/icons/business/plug.svg",
      color: "#FB923C",
    },
  ],
  skillsToggle: {
    more: {
      name: "... и другие...",
      icon: "/icons/tech/more.svg",
      color: "#94A3B8",
    },
    back: {
      name: "← к стеку",
      icon: "/icons/tech/back.svg",
      color: "#94A3B8",
    },
  },
  contacts: {
    telegram: {
      label: "@Allmore",
      href: "https://t.me/Allmore",
    },
    email: {
      label: "mixachugaev@gmail.com",
      href: "mailto:mixachugaev@gmail.com",
    },
    habr: {
      label: "Habr Career",
      href: "https://career.habr.com/almor",
    },
  },
} as const;
