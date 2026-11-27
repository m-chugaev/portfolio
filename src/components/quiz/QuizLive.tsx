"use client";

import { useEffect } from "react";
import { quizModel } from "@/data/quiz";

const labels = {
  biz: {
    services: "Услуги и ремонт",
    estate: "Недвижимость",
    edu: "Обучение",
    shop: "Магазин, производство",
  },
  traffic: {
    social: "Соцсети",
    direct: "Директ и РСЯ",
    search: "Поиск",
    word: "Сарафан",
  },
  goal: {
    calc: "Расчёт стоимости",
    pick: "Подбор варианта",
    book: "Запись",
    lead: "Просто заявка",
  },
  form: {
    long: "Длинная форма",
    phone: "Телефон",
    nosite: "Сайта нет",
    hasquiz: "Квиз уже есть",
  },
} as const;

const suits = { biz: "♥", traffic: "♠", goal: "♣", form: "♦" } as const;
const empty = { biz: "бизнес", traffic: "трафик", goal: "цель", form: "форма сейчас" } as const;
const order = ["biz", "traffic", "goal", "form"] as const;
const moved: Record<string, string> = {
  examples: "«Вопросы для вашей ниши»",
  vs: "«Квиз или форма»",
  more: "«Другие страницы про конверсию»",
  prices: "«Цены»",
  flow: "«Как квиз удерживает конверсию»",
};

type Key = (typeof order)[number];
type Answers = Partial<Record<Key, string>>;

function answerLabel(key: Key, value: string) {
  return (labels[key] as Record<string, string>)[value] ?? value;
}

function format(value: number, digits = 1) {
  return value.toFixed(digits).replace(".", ",");
}

export function QuizLive() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("#qz-root");
    if (!root) {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const $ = <T extends Element>(selector: string, base: ParentNode = root) =>
      base.querySelector<T>(selector);
    const $$ = <T extends Element>(selector: string, base: ParentNode = root) =>
      [...base.querySelectorAll<T>(selector)];

    const answers: Answers = {};
    const done = new Set<string>();
    let chance = 1.5;
    let step = 0;
    let questions = 4;
    let showForm = true;
    let deltaTimer = 0;
    let toastTimer = 0;
    const cleanups: Array<() => void> = [];

    const on = (
      target: EventTarget,
      type: string,
      listener: EventListener,
      options?: AddEventListenerOptions,
    ) => {
      target.addEventListener(type, listener, options);
      cleanups.push(() => target.removeEventListener(type, listener, options));
    };

    const paintMeter = () => {
      const node = $<HTMLElement>("#qz-cr");
      if (node) {
        node.textContent = format(chance);
      }
      const count = Math.round((chance / 9.5) * 20);
      $$<HTMLElement>("#qz-segs i").forEach((item, index) => {
        item.classList.toggle("on", index < count);
        item.classList.toggle("hi", index < count && count >= 14);
      });
    };

    const log = (text: string, delta?: number) => {
      const list = $<HTMLElement>("#qz-log");
      if (!list) {
        return;
      }
      const item = document.createElement("li");
      item.innerHTML = `${delta ? `<b>+${format(delta, 2)} п.п.</b> · ` : ""}${text}`;
      list.prepend(item);
      while (list.children.length > 3) {
        list.lastChild?.remove();
      }
    };

    const addChance = (amount: number, text: string) => {
      const before = chance;
      chance = Math.min(9.5, chance + amount);
      const real = chance - before;
      if (real <= 0.001) {
        return;
      }
      paintMeter();
      const delta = $<HTMLElement>("#qz-crd");
      if (delta) {
        delta.textContent = `+${format(real, 2)}`;
        window.clearTimeout(deltaTimer);
        deltaTimer = window.setTimeout(() => {
          delta.textContent = "";
        }, 1600);
      }
      log(text, real);
    };

    const once = (key: string, amount: number, text: string) => {
      if (done.has(key)) {
        return;
      }
      done.add(key);
      addChance(amount, text);
    };

    const model = () =>
      quizModel({ traffic: answers.traffic, goal: answers.goal, questions });

    const youIndex = (steps: number) => {
      const count = order.filter((key) => answers[key]).length;
      if (!count) {
        return -1;
      }
      if (count >= 4) {
        return steps - 1;
      }
      return Math.min(count + 1, steps - 2);
    };

    const renderChart = (element: HTMLElement | null, compact: boolean) => {
      if (!element) {
        return model();
      }
      const current = model();
      const narrow = compact || element.clientWidth < 360;
      const here = youIndex(current.steps.length);
      element.replaceChildren();
      current.steps.forEach((item, index) => {
        const bar = document.createElement("div");
        bar.className = `qz-bar${item.last ? " last" : ""}${index === here ? " you" : ""}`;
        const height = Math.max(2, Math.sqrt(item.value / 1000) * 82);
        const label = narrow ? (item.last ? "✓" : index === 0 ? "вх" : `в${index}`) : item.label;
        if (index === here) {
          const tag = document.createElement("span");
          tag.className = "qz-you";
          tag.textContent = "вы тут";
          bar.append(tag);
        }
        const number = document.createElement("span");
        number.className = "n";
        number.textContent = String(Math.round(item.value));
        const column = document.createElement("span");
        column.className = "col";
        column.style.height = `${height}%`;
        const caption = document.createElement("span");
        caption.className = "l";
        caption.textContent = label;
        bar.append(number, column, caption);
        element.append(bar);
      });
      if (showForm) {
        const bar = document.createElement("div");
        bar.className = "qz-bar form";
        const height = Math.max(2, Math.sqrt(current.form / 1000) * 82);
        bar.innerHTML = `<span class="n">${Math.round(current.form)}</span><span class="col" style="height:${height}%"></span><span class="l">${narrow ? "ф" : "форма"}</span>`;
        element.append(bar);
      }
      return current;
    };

    const renderCharts = () => {
      const current = renderChart($<HTMLElement>("#qz-chart"), false);
      renderChart($<HTMLElement>("#qz-mini"), true);
      const start = $<HTMLElement>("#qz-start");
      const quiz = $<HTMLElement>("#qz-quiz");
      const form = $<HTMLElement>("#qz-form");
      const note = $<HTMLElement>("#qz-note");
      if (start) {
        start.textContent = String(Math.round(current.start));
      }
      if (quiz) {
        quiz.textContent = `${Math.round(current.quiz)} · ${format(current.quiz / 10)}%`;
      }
      if (form) {
        form.textContent = showForm
          ? `${Math.round(current.form)} · ${format(current.form / 10)}%`
          : "скрыта";
      }
      if (note) {
        note.textContent =
          answers.traffic === "search"
            ? "Для поискового трафика модель показывает, что короткая форма может собрать не меньше квиза. Это честный сценарий: квиз нужен не всегда. Коэффициенты демо."
            : "Из 1000 условных визитов. Коэффициенты придуманы для демонстрации и меняются от ваших ответов. Реальные доли берём из Метрики: цель на каждый шаг квиза.";
      }
    };

    const questionsInput = $<HTMLInputElement>("#qz-nq");
    const formInput = $<HTMLInputElement>("#qz-form-toggle");
    on(questionsInput ?? window, "input", (event) => {
      if (event.currentTarget !== questionsInput || !questionsInput) {
        return;
      }
      questions = Number(questionsInput.value);
      const output = $<HTMLElement>("#qz-nqv");
      if (output) {
        output.textContent = String(questions);
      }
      renderCharts();
      once("nq", 0.2, "покрутили число вопросов");
    });
    on(formInput ?? window, "change", (event) => {
      if (event.currentTarget !== formInput || !formInput) {
        return;
      }
      showForm = formInput.checked;
      renderCharts();
    });

    const deck = $<HTMLElement>("#qz-deck");
    const stack = $<HTMLElement>(".qz-deck");
    const cards = $$<HTMLElement>(".qz-card", deck ?? root);
    const flow = $<HTMLElement>("#qz-flow");
    const defaultOrder = $$<HTMLElement>(":scope > section", flow ?? root).map((section) => section.id);

    const layout = () => {
      cards.forEach((card, index) => {
        card.classList.remove("top", "under1", "under2", "gone", "hidden");
        const distance = index - step;
        card.classList.add(
          distance < 0 ? "gone" : distance === 0 ? "top" : distance === 1 ? "under1" : distance === 2 ? "under2" : "hidden",
        );
        if ("inert" in card) {
          card.inert = distance !== 0;
        }
      });
      const label = $<HTMLElement>("#qz-deck-label");
      if (label) {
        label.textContent = step < 4 ? `Карта ${step + 1} из 4` : "Ваш результат";
      }
      $$<HTMLElement>("#qz-pips .qz-pip").forEach((pip, index) => {
        pip.className = `qz-pip${index < step ? " on" : index === step ? " cur" : ""}`;
      });
      const top = cards[step];
      if (stack && top) {
        stack.style.minHeight = `${top.offsetHeight + 30}px`;
      }
      root.classList.add("is-live");
    };

    const paintHand = () => {
      const hand = $<HTMLElement>("#qz-hand");
      if (!hand) {
        return;
      }
      hand.replaceChildren();
      const caption = document.createElement("span");
      caption.className = "lbl";
      caption.textContent = "Ваша рука:";
      hand.append(caption);
      order.forEach((key) => {
        const chip = document.createElement("span");
        const value = answers[key];
        if (value) {
          chip.className = "qz-chip";
          const suit = document.createElement("span");
          suit.className = "s";
          suit.setAttribute("aria-hidden", "true");
          suit.textContent = suits[key];
          chip.append(suit, document.createTextNode(answerLabel(key, value)));
        } else {
          chip.className = "qz-chip empty";
          chip.textContent = empty[key];
        }
        hand.append(chip);
      });
    };

    const toast = (text: string) => {
      const node = $<HTMLElement>("#qz-toast");
      if (!node) {
        return;
      }
      node.textContent = text;
      node.classList.add("show");
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => node.classList.remove("show"), 2800);
    };

    const priorities = (source: Answers) => {
      const next: string[] = [];
      if (source.biz) {
        next.push("examples");
      }
      if (source.traffic === "search" || source.traffic === "word") {
        next.push("vs");
      }
      if (source.form === "hasquiz") {
        next.push("more");
      }
      if (source.form === "nosite") {
        next.push("prices");
      }
      if (source.form === "long" || source.form === "phone") {
        next.push("flow");
      }
      return next;
    };

    const selectTab = (id: string, user: boolean) => {
      $$<HTMLButtonElement>(".qz-tab").forEach((tab, index) => {
        const selected = tab.id === `qz-tab-${id}`;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        if (!selected && index === 0 && !$$(".qz-tab[aria-selected='true']").length) {
          tab.tabIndex = -1;
        }
      });
      $$<HTMLElement>(".qz-tabpanel").forEach((panel) => {
        panel.hidden = panel.id !== `qz-panel-${id}`;
      });
      if (user) {
        once(`tab-${id}`, 0.2, "посмотрели вопросы для ниши");
      }
    };

    const personalise = () => {
      const pri = priorities(answers);
      if (flow) {
        [...pri, ...defaultOrder.filter((id) => !pri.includes(id))].forEach((id) => {
          const section = document.getElementById(id);
          if (section) {
            flow.appendChild(section);
          }
        });
        $$<HTMLElement>(":scope > section", flow).forEach((section) => {
          section.classList.toggle("is-picked", pri.includes(section.id));
        });
      }
      if (answers.biz) {
        selectTab(answers.biz, false);
      }
      $$<HTMLElement>(".qz-vs-row[data-t]").forEach((row) => {
        row.classList.toggle("hl", row.dataset.t === answers.traffic);
      });
      const inside = answers.goal
        ? answers.goal === "lead"
          ? "script"
          : "final"
        : answers.form === "hasquiz"
          ? "metrika"
          : null;
      $$<HTMLElement>(".qz-icard").forEach((card) => {
        card.classList.toggle("hl", card.dataset.k === inside);
      });
      const any = order.some((key) => answers[key]);
      const priceKey = answers.form === "hasquiz" ? "audit" : answers.traffic === "word" ? "bot" : "quiz";
      $$<HTMLElement>(".qz-pcard").forEach((card) => {
        card.classList.toggle("hl", any && card.dataset.p === priceKey);
      });
      $$<HTMLElement>(".qz-mcard").forEach((card) => {
        card.classList.toggle("hl", answers.form === "hasquiz" && card.dataset.m === "audit");
      });
      return pri;
    };

    const buildResult = () => {
      let title =
        {
          social: "Квиз-лендинг под рекламу в соцсетях",
          direct: "Квиз-лендинг под Директ и РСЯ",
          search: "Короткая форма + квиз второй кнопкой",
          word: "Квиз или Telegram-бот для заявок",
        }[answers.traffic ?? ""] ?? "Квиз-лендинг";
      if (answers.form === "hasquiz") {
        title = "Сначала разбор текущего квиза по шагам";
      }
      if (answers.form === "nosite" && answers.traffic !== "search") {
        title = "Квиз-лендинг как первый сайт";
      }
      const first = {
        services: "«Что нужно сделать?» — с картинками вариантов",
        estate: "«Что ищете: квартира, дом или участок?»",
        edu: "«Для кого обучение?»",
        shop: "«Что нужно: кухня, шкаф или другое?»",
      }[answers.biz ?? ""];
      const fin = {
        calc: "примерный расчёт стоимости по ответам",
        pick: "подборка из 3–5 вариантов",
        book: "выбор времени записи или звонка",
        lead: "«перезвоним» — лучше добавить расчёт или подборку, чтобы было ради чего дойти",
      }[answers.goal ?? ""];
      const now = {
        long: "Длинную форму заменяем квизом: те же поля, но по одному на экран.",
        phone: "Кнопку «позвоните» оставляем, квиз добавляем для тех, кто не готов звонить.",
        nosite:
          "Начинаем с одной страницы-квиза: это мини-сайт, его можно ставить в рекламу и в шапку соцсетей.",
        hasquiz:
          'Квиз уже есть — сначала смотрим доходимость по шагам: обычно видно вопрос, на котором бросают. Это <a href="/services/audit-konversii/">аудит конверсии</a>.',
      }[answers.form ?? ""];
      const titleNode = $<HTMLElement>("#qz-result-title");
      const list = $<HTMLElement>("#qz-result-list");
      const summary = $<HTMLElement>("#qz-summary");
      if (titleNode) {
        titleNode.textContent = title;
      }
      if (list) {
        list.innerHTML = `<li><b>Первый вопрос:</b> ${first}.</li><li><b>Финальный экран:</b> ${fin}.</li><li>${now}</li><li><b>Замер:</b> цель в Метрике на каждый шаг, заявки с ответами — в Telegram.</li>`;
      }
      if (summary && answers.biz && answers.traffic && answers.goal && answers.form) {
        summary.textContent = `Бизнес: ${answerLabel("biz", answers.biz)}; трафик: ${answerLabel("traffic", answers.traffic)}; в конце: ${answerLabel("goal", answers.goal)}; сейчас: ${answerLabel("form", answers.form)}. Рекомендация со страницы: ${title.toLowerCase()}.`;
      }
    };

    const answer = (key: Key, value: string) => {
      const before = priorities(answers);
      answers[key] = value;
      $$<HTMLButtonElement>(`.qz-card[data-q="${key}"] .qz-opt`).forEach((option) => {
        option.setAttribute("aria-pressed", String(option.dataset.v === value));
      });
      step = order.indexOf(key) + 1;
      once(`ans-${key}`, 0.6, `ответ ${order.indexOf(key) + 1}/4 · ${answerLabel(key, value)}`);
      const pri = personalise();
      const fresh = pri.filter((item) => !before.includes(item));
      if (fresh[0]) {
        toast(`Перетасовал страницу: ${moved[fresh[0]]} теперь выше`);
      }
      paintHand();
      renderCharts();
      if (order.every((item) => answers[item])) {
        step = 4;
        buildResult();
        once("result", 1, "дошли до результата квиза");
      }
      layout();
      const focusTarget = cards[step]?.querySelector<HTMLElement>(".qz-opt, .qz-btn");
      window.setTimeout(() => focusTarget?.focus({ preventScroll: true }), reduced ? 0 : 450);
    };

    cards.forEach((card) => {
      const key = card.dataset.q as Key | undefined;
      if (!key) {
        return;
      }
      $$<HTMLButtonElement>(".qz-opt", card).forEach((option) => {
        on(option, "click", () => answer(key, option.dataset.v ?? ""));
      });
      const back = card.querySelector<HTMLButtonElement>("[data-back]");
      if (back) {
        on(back, "click", () => {
          step = Math.max(0, step - 1);
          layout();
        });
      }
    });

    const resultTitle = $<HTMLElement>("#qz-result-title");
    const resultList = $<HTMLElement>("#qz-result-list");
    const summary = $<HTMLElement>("#qz-summary");
    const initialTitle = resultTitle?.textContent ?? "";
    const initialList = resultList?.innerHTML ?? "";
    const initialSummary = summary?.textContent ?? "";
    const copy = $<HTMLButtonElement>("#qz-copy");
    on(copy ?? window, "click", async (event) => {
      if (event.currentTarget !== copy || !copy) {
        return;
      }
      const text = `Здравствуйте! Хочу обсудить квиз. ${summary?.textContent ?? ""}`;
      try {
        await navigator.clipboard.writeText(text);
        copy.textContent = "Скопировано ✓";
      } catch {
        copy.textContent = "Скопируйте сводку внизу";
      }
      once("copy", 0.4, "скопировали ответы для сообщения");
    });
    const redeal = $<HTMLButtonElement>("#qz-redeal");
    on(redeal ?? window, "click", (event) => {
      if (event.currentTarget !== redeal) {
        return;
      }
      order.forEach((key) => {
        delete answers[key];
      });
      step = 0;
      $$<HTMLButtonElement>(".qz-opt").forEach((option) => option.setAttribute("aria-pressed", "false"));
      personalise();
      paintHand();
      renderCharts();
      layout();
      if (resultTitle) {
        resultTitle.textContent = initialTitle;
      }
      if (resultList) {
        resultList.innerHTML = initialList;
      }
      if (summary) {
        summary.textContent = initialSummary;
      }
      if (copy) {
        copy.textContent = "Скопировать ответы";
      }
      cards[0]?.querySelector<HTMLElement>(".qz-opt")?.focus({ preventScroll: true });
      toast("Колода пересдана, порядок блоков исходный");
    });

    $$<HTMLButtonElement>(".qz-tab").forEach((tab, index, all) => {
      on(tab, "click", () => selectTab(tab.id.replace("qz-tab-", ""), true));
      on(tab, "keydown", (event) => {
        const keyboard = event as KeyboardEvent;
        if (keyboard.key !== "ArrowRight" && keyboard.key !== "ArrowLeft") {
          return;
        }
        const next = all[(index + (keyboard.key === "ArrowRight" ? 1 : all.length - 1)) % all.length];
        next?.focus();
        if (next) {
          selectTab(next.id.replace("qz-tab-", ""), true);
        }
      });
    });

    on(document, "click", (event) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-ev]");
      if (!target || !root.contains(target)) {
        return;
      }
      const kind = target.dataset.ev ?? "";
      if (kind.startsWith("cta")) {
        once("cta", 0.9, "клик по кнопке заявки");
      } else if (kind === "faq") {
        once(`faq-${target.textContent?.slice(0, 24) ?? ""}`, 0.15, "открыли вопрос FAQ");
      } else if (kind === "case") {
        once("case", 0.2, "открыли кейс");
      } else if (kind === "price") {
        once(`price-${target.dataset.p ?? ""}`, 0.25, "посмотрели цену");
      }
    });
    $$<HTMLElement>('[data-ev^="cta"]').forEach((button) => {
      on(button, "mouseenter", () => once("hover", 0.1, "навели на кнопку заявки"));
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          const section = entry.target as HTMLElement;
          once(`sec-${section.id}`, 0.15, `дошли до блока «${section.dataset.sec ?? ""}»`);
        });
      },
      { threshold: 0.12 },
    );
    $$<HTMLElement>("section[data-sec]").forEach((section) => observer.observe(section));

    const boardButton = $<HTMLButtonElement>("#qz-board-min");
    on(boardButton ?? window, "click", (event) => {
      if (event.currentTarget !== boardButton || !boardButton) {
        return;
      }
      const board = $<HTMLElement>("#qz-board");
      if (window.innerWidth <= 700) {
        const open = board?.classList.toggle("open") ?? false;
        boardButton.setAttribute("aria-expanded", String(open));
      } else {
        const minimized = board?.classList.toggle("min") ?? false;
        boardButton.setAttribute("aria-expanded", String(!minimized));
      }
    });

    paintMeter();
    renderCharts();
    layout();
    if (window.innerWidth <= 700) {
      boardButton?.setAttribute("aria-expanded", "false");
    }
    on(window, "resize", layout);
    document.fonts?.ready.then(() => {
      if (root.isConnected) {
        layout();
      }
    });

    return () => {
      window.clearTimeout(deltaTimer);
      window.clearTimeout(toastTimer);
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
