"use client";

import { useEffect } from "react";
import { auditQuestions, auditStages, formatAudit } from "@/data/audit";

export function AuditLive() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("#au-root");
    if (!root) {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const $ = <T extends Element>(selector: string, base: ParentNode = root) =>
      base.querySelector<T>(selector);
    const $$ = <T extends Element>(selector: string, base: ParentNode = root) =>
      [...base.querySelectorAll<T>(selector)];

    const done = new Set<string>();
    const seen = new Set<string>();
    const fixed = new Set<number>();
    const found = new Set<string>();
    let score = 0;
    let chance = 1.2;
    let deltaTimer = 0;
    let frame = 0;
    let disposed = false;
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

    const log = (text: string, delta?: number) => {
      const list = $<HTMLElement>("#au-log");
      if (!list) {
        return;
      }
      const item = document.createElement("li");
      item.innerHTML = `${delta ? `<b>+${formatAudit(delta)} п.п.</b> · ` : ""}${text}`;
      list.prepend(item);
      while (list.children.length > 3) {
        list.lastChild?.remove();
      }
    };

    const addScore = (amount: number) => {
      score = Math.min(100, score + amount);
      const node = $<HTMLElement>("#au-score");
      const ring = $<HTMLElement>("#au-ring");
      if (node) {
        node.textContent = String(Math.round(score));
      }
      ring?.style.setProperty("--p", String(score));
    };

    const addChance = (amount: number, text: string) => {
      const before = chance;
      chance = Math.min(9.5, chance + amount);
      const real = chance - before;
      if (real <= 0.001) {
        return;
      }
      const node = $<HTMLElement>("#au-cr");
      const delta = $<HTMLElement>("#au-crd");
      if (node) {
        node.textContent = formatAudit(chance);
      }
      if (delta) {
        delta.textContent = `+${formatAudit(real)}`;
        window.clearTimeout(deltaTimer);
        deltaTimer = window.setTimeout(() => {
          delta.textContent = "";
        }, 1600);
      }
      log(text, real);
    };

    const once = (key: string, scoreDelta: number, chanceDelta: number, text: string) => {
      if (done.has(key)) {
        return;
      }
      done.add(key);
      addScore(scoreDelta);
      addChance(chanceDelta, text);
    };

    const toggle = $<HTMLButtonElement>("#au-hud-min");
    on(toggle ?? window, "click", (event) => {
      if (event.currentTarget !== toggle) {
        return;
      }
      const hud = $<HTMLElement>("#au-hud");
      const minimized = hud?.classList.toggle("min") ?? false;
      toggle?.setAttribute("aria-expanded", String(!minimized));
    });

    const sections = $$<HTMLElement>("main section[data-sec]");
    const seenObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          const section = entry.target as HTMLElement;
          section.classList.add("inspected");
          if (section.dataset.rail) {
            document.getElementById(section.dataset.rail)?.classList.add("seen");
          }
          if (!seen.has(section.id) && section.id !== "hero") {
            seen.add(section.id);
            const counter = $<HTMLElement>("#au-seen");
            if (counter) {
              counter.textContent = String(seen.size);
            }
            addScore(Number(section.dataset.w ?? 0));
            addChance(0.15, `проверен блок «${section.dataset.sec ?? ""}»`);
          }
        });
      },
      { threshold: 0.12 },
    );
    const currentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          $$<HTMLElement>(".au-rail a").forEach((link) => link.classList.remove("on"));
          const section = entry.target as HTMLElement;
          if (section.dataset.rail) {
            document.getElementById(section.dataset.rail)?.classList.add("on");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section, index) => {
      section.dataset.rail = `au-rail-${index}`;
      seenObserver.observe(section);
      currentObserver.observe(section);
    });

    const stage = $<HTMLElement>("#au-stage");
    const pins = $$<HTMLElement>(".au-pin", stage ?? root);

    const moveLens = (x: number, y: number, automatic: boolean) => {
      if (!stage) {
        return;
      }
      stage.style.setProperty("--lx", `${x}px`);
      stage.style.setProperty("--ly", `${y}px`);
      const radius = Number.parseFloat(getComputedStyle(stage).getPropertyValue("--lr")) || 105;
      const bounds = stage.getBoundingClientRect();
      pins.forEach((pin) => {
        const rect = pin.getBoundingClientRect();
        const px = rect.left - bounds.left + 10;
        const py = rect.top - bounds.top + 10;
        const id = pin.dataset.f ?? "";
        if (!automatic && Math.hypot(px - x, py - y) < radius * 0.8 && !found.has(id)) {
          found.add(id);
          const counter = $<HTMLElement>("#au-pins");
          if (counter) {
            counter.textContent = String(found.size);
          }
          addScore(2);
          addChance(0.25, `рентген: находка №${id}`);
        }
      });
    };

    const sizeLens = () => {
      if (!stage) {
        return;
      }
      const radius = Math.round(Math.min(148, Math.max(108, stage.clientWidth * 0.34)));
      stage.style.setProperty("--lr", `${radius}px`);
    };

    const stopAuto = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const autoStarted = performance.now();
    const autoLoop = (now: number) => {
      if (disposed || !stage) {
        return;
      }
      if (document.hidden) {
        frame = requestAnimationFrame(autoLoop);
        return;
      }
      const seconds = (now - autoStarted) / 1000;
      moveLens(
        stage.clientWidth * (0.5 + 0.28 * Math.sin(seconds * 0.7)),
        stage.clientHeight * (0.45 + 0.38 * Math.sin(seconds * 0.43 + 1)),
        true,
      );
      frame = requestAnimationFrame(autoLoop);
    };

    sizeLens();
    on(window, "resize", sizeLens);
    if (stage) {
      const point = (event: PointerEvent) => {
        const bounds = stage.getBoundingClientRect();
        moveLens(event.clientX - bounds.left, event.clientY - bounds.top, false);
        stopAuto();
      };
      on(stage, "pointermove", point as EventListener, { passive: true });
      on(stage, "pointerdown", point as EventListener, { passive: true });
    }
    if (!reduced && stage) {
      frame = requestAnimationFrame(autoLoop);
    } else if (stage) {
      stage.style.setProperty("--lx", `${stage.clientWidth * 0.55}px`);
      stage.style.setProperty("--ly", `${stage.clientHeight * 0.2}px`);
    }

    const drawFunnel = () => {
      let visitors = 1000;
      const base = auditStages.reduce((total, item) => total * item.keep, 1000);
      auditStages.forEach((item, index) => {
        const before = visitors;
        visitors *= fixed.has(index) ? item.fix : item.keep;
        const row = $<HTMLElement>(`.au-stage-row[data-i="${index}"]`);
        if (!row) {
          return;
        }
        const keep = $<HTMLElement>(".au-keep", row);
        const lost = $<HTMLElement>(".au-lost", row);
        const value = $<HTMLElement>(".v", row);
        const loss = $<HTMLElement>(".l", row);
        if (keep) {
          keep.style.width = `${(visitors / 1000) * 100}%`;
        }
        if (lost) {
          lost.style.left = `${(visitors / 1000) * 100}%`;
          lost.style.width = `${((before - visitors) / 1000) * 100}%`;
        }
        if (value) {
          value.textContent = `${Math.round(visitors)} из 1000`;
        }
        if (loss) {
          loss.textContent = `${fixed.has(index) ? "после правки " : ""}−${Math.round(before - visitors)} чел.`;
        }
        row.classList.toggle("fixed", fixed.has(index));
      });
      const arrived = $<HTMLElement>("#au-fbase");
      const arrow = $<HTMLElement>("#au-farrow");
      if (arrived) {
        arrived.textContent = `${Math.round(visitors)} чел. (${formatAudit(visitors / 10)}%)`;
      }
      if (arrow) {
        arrow.textContent = fixed.size
          ? `было ${Math.round(base)} — разница только из-за правок в модели`
          : "нажмите на шаг воронки";
      }
    };

    $$<HTMLButtonElement>(".au-stage-row").forEach((button) => {
      on(button, "click", () => {
        const index = Number(button.dataset.i);
        const drawer = button.nextElementSibling;
        if (!(drawer instanceof HTMLElement)) {
          return;
        }
        const open = drawer.classList.toggle("open");
        button.setAttribute("aria-expanded", String(open));
        if (open) {
          once(`stage${index}`, 2, 0.3, `открыт шаг «${auditStages[index]?.name ?? ""}»`);
        }
      });
    });
    $$<HTMLButtonElement>(".au-fix").forEach((button) => {
      on(button, "click", () => {
        const index = Number(button.dataset.i);
        const onState = !fixed.has(index);
        if (onState) {
          fixed.add(index);
        } else {
          fixed.delete(index);
        }
        button.setAttribute("aria-pressed", String(onState));
        button.textContent = onState ? "утечка закрыта ✓" : "закрыть утечку · демо";
        drawFunnel();
        if (onState) {
          once(`fix${index}`, 3, 0.4, `смоделирована правка «${auditStages[index]?.name ?? ""}»`);
        }
      });
    });
    drawFunnel();

    $$<HTMLElement>(".au-dcard").forEach((card, index) => {
      let timer = 0;
      const mark = () => {
        if (card.classList.contains("read")) {
          return;
        }
        card.classList.add("read");
        once(
          `d${index}`,
          2,
          0.12,
          `изучен пункт «${card.querySelector("h3")?.textContent ?? ""}»`,
        );
      };
      on(card, "mouseenter", () => {
        timer = window.setTimeout(mark, 700);
      });
      on(card, "mouseleave", () => window.clearTimeout(timer));
      on(card, "click", mark);
      on(card, "focus", mark);
    });

    $$<HTMLElement>(".au-rrow[data-ev]").forEach((row, index) => {
      on(row, "mouseenter", () => once(`r${index}`, 1, 0.08, "просмотрена строка отчёта"));
    });

    const answers = new Map<number, boolean>();
    const renderQuiz = () => {
      if (!answers.size) {
        return;
      }
      let got = 0;
      let total = 0;
      const recs: Array<[number, string]> = [];
      answers.forEach((yes, index) => {
        const question = auditQuestions[index];
        if (!question) {
          return;
        }
        total += question.weight;
        if (yes) {
          got += question.weight;
        } else {
          recs.push([question.weight, question.rec]);
        }
      });
      const value = Math.round((got / total) * 100);
      const scoreNode = $<HTMLElement>("#au-qscore");
      const meta = $<HTMLElement>("#au-qmeta");
      const meter = $<HTMLElement>("#au-qmeter");
      const list = $<HTMLElement>("#au-recs");
      if (scoreNode) {
        scoreNode.textContent = String(value);
      }
      if (meta) {
        meta.textContent = `/100 · отвечено ${answers.size} из ${auditQuestions.length}`;
      }
      if (meter) {
        meter.style.width = `${value}%`;
      }
      recs.sort((left, right) => right[0] - left[0]);
      if (list) {
        list.innerHTML = recs.length
          ? recs
              .slice(0, 4)
              .map((item) => `<li>${item[1]}</li>`)
              .join("")
          : '<li style="color:var(--scan)">По этим ответам явных утечек нет. Дальше — смотреть данные: воронку по каналам и вебвизор.</li>';
      }
    };

    $$<HTMLElement>(".au-q").forEach((row) => {
      $$<HTMLButtonElement>("button", row).forEach((button) => {
        on(button, "click", () => {
          const index = Number(row.dataset.i);
          answers.set(index, button.dataset.yes === "true");
          $$<HTMLButtonElement>("button", row).forEach((item) => {
            item.setAttribute("aria-pressed", String(item === button));
          });
          once(`q${index}`, 2, 0.35, `ответ в самопроверке №${index + 1}`);
          renderQuiz();
        });
      });
    });

    on(document, "click", (event) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-ev]");
      if (!target || !root.contains(target)) {
        return;
      }
      const kind = target.dataset.ev ?? "";
      if (kind.startsWith("cta")) {
        once(
          kind,
          4,
          0.9,
          `клик по кнопке «${target.textContent?.trim().replace(/\s*→$/, "") ?? ""}»`,
        );
      } else if (kind === "faq") {
        once(`faq${target.textContent ?? ""}`, 1, 0.15, "открыт вопрос FAQ");
      } else if (kind === "case") {
        once(`case${target.getAttribute("href") ?? ""}`, 1, 0.2, "переход в кейс");
      } else if (kind === "price") {
        once(`price${target.getAttribute("href") ?? ""}`, 1, 0.25, "интерес к услуге");
      }
    });

    $$<HTMLElement>('[data-ev^="cta"]').forEach((button) => {
      on(button, "mouseenter", () =>
        once(`h${button.dataset.ev ?? ""}`, 1, 0.1, "наведение на кнопку"),
      );
    });

    return () => {
      disposed = true;
      stopAuto();
      window.clearTimeout(deltaTimer);
      seenObserver.disconnect();
      currentObserver.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
