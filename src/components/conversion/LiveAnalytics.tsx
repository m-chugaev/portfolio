"use client";

import { useEffect } from "react";
import {
  formatDemo,
  FUNNEL_MAX,
  funnelSteps,
  leadWord,
  projectedLeads,
  safeLeads,
  safeVisits,
} from "@/data/conversion";

const HEAT_SCALE = 8;
const HEAT_ALPHA_CAP = 170;
const LAYER_KEY = "cv-layer-";

const weights = Object.fromEntries(
  funnelSteps.map((step) => [step.id, step.weight]),
) as Record<string, number>;

type HeatPoint = {
  x: number;
  y: number;
  r: number;
  a: number;
};

type Cursor = {
  el: HTMLDivElement;
  x: number;
  y: number;
  tx: number;
  ty: number;
  wait: number;
  v: number;
};

type MetricState = {
  el: HTMLElement;
  value: number;
  base: number;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isMobile(): boolean {
  return window.matchMedia("(max-width: 640px)").matches;
}

function contentHeight(root: HTMLElement): number {
  let height = 0;

  for (const selector of ["header", "main", "footer"]) {
    const element = root.querySelector(selector);

    if (element instanceof HTMLElement) {
      height += element.offsetHeight;
    }
  }

  return Math.max(1, Math.min(height, 20000));
}

export function LiveAnalytics() {
  useEffect(() => {
    const root = document.getElementById("cv-root");

    if (!root) {
      return;
    }

    return startLiveAnalytics(root);
  }, []);

  return null;
}

function startLiveAnalytics(root: HTMLElement): () => void {
  let disposed = false;
  const reduced = prefersReducedMotion();
  const mobile = isMobile();
  const cleanups: Array<() => void> = [];
  const done = new Set<string>(["hero"]);
  let bonus = 0;
  let loopId = 0;
  let loopRunning = false;
  const cursors: Cursor[] = [];
  const userPoints: HeatPoint[] = [];
  let heatTimer = 0;
  let dwellTimer = 0;
  const seen = new Set<string>();
  const metrics = new Map<string, MetricState>();

  const heat = root.querySelector("#cv-heat");
  const cursorLayer = root.querySelector("#cv-cursors");
  const field = document.createElement("canvas");
  const fieldContext = field.getContext("2d", { willReadFrequently: true });
  const heatContext =
    heat instanceof HTMLCanvasElement
      ? heat.getContext("2d")
      : null;

  root.querySelectorAll<HTMLElement>("[data-metric]").forEach((element) => {
    const key = element.dataset.metric;
    const base = Number(element.dataset.base);

    if (!key || !Number.isFinite(base)) {
      return;
    }

    metrics.set(key, { el: element, value: base, base });
  });

  const on = (target: EventTarget, type: string, listener: EventListener, options?: AddEventListenerOptions) => {
    target.addEventListener(type, listener, options);
    cleanups.push(() => target.removeEventListener(type, listener, options));
  };

  const probability = () => {
    let total = bonus;

    done.forEach((key) => {
      total += weights[key] ?? 0;
    });

    return Math.min(FUNNEL_MAX, total);
  };

  const paintProbability = () => {
    const value = probability();
    const label = `${value}%`;
    const prob = root.querySelector("#cv-prob");
    const hud = root.querySelector("#cv-hud-pct");
    const bar = root.querySelector("#cv-prob-bar");

    if (prob) {
      prob.textContent = label;
    }

    if (hud) {
      hud.textContent = label;
    }

    if (bar instanceof HTMLElement) {
      bar.style.width = `${(value / FUNNEL_MAX) * 100}%`;
    }
  };

  const announce = (text: string) => {
    const live = root.querySelector("#cv-live");

    if (live) {
      live.textContent = text;
    }
  };

  const step = (key: string) => {
    if (done.has(key) || !(key in weights)) {
      return;
    }

    done.add(key);
    root.querySelector(`[data-step="${key}"]`)?.classList.add("is-done");
    paintProbability();
    const item = funnelSteps.find((entry) => entry.id === key);

    if (item) {
      announce(`${item.label}. Шанс заявки по демо-модели ${probability()}%. Это демо.`);
    }
  };

  const bump = (key: string, delta: number) => {
    const metric = metrics.get(key);

    if (!metric || disposed) {
      return;
    }

    const from = metric.value;
    const next = Math.min(metric.base * 2.2, metric.value + delta);

    if (next === from) {
      return;
    }

    metric.value = next;
    metric.el.classList.add("is-up");
    const deltaNode = metric.el.querySelector(".cv-d");
    const valueNode = metric.el.querySelector(".cv-v");

    if (deltaNode) {
      deltaNode.textContent = `+${(metric.value - metric.base).toFixed(1).replace(".", ",")}`;
    }

    if (!(valueNode instanceof HTMLElement)) {
      return;
    }

    metric.el.classList.remove("is-pulse");

    if (!reduced) {
      void metric.el.offsetWidth;
      metric.el.classList.add("is-pulse");
    }

    const started = performance.now();
    const duration = reduced ? 0 : 500;

    const tick = (now: number) => {
      if (disposed) {
        return;
      }

      const progress = duration ? Math.min(1, (now - started) / duration) : 1;
      valueNode.textContent = formatDemo(from + (metric.value - from) * progress);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  root.querySelectorAll<HTMLButtonElement>(".cv-hud button").forEach((button) => {
    const layer = button.dataset.layer;

    if (!layer) {
      return;
    }

    try {
      if (localStorage.getItem(`${LAYER_KEY}${layer}`) === "false") {
        button.setAttribute("aria-pressed", "false");
        root.classList.add(`no-${layer}`);
      }
    } catch (error) {
      void error;
    }

    on(button, "click", () => {
      const pressed = button.getAttribute("aria-pressed") !== "true";
      button.setAttribute("aria-pressed", String(pressed));
      root.classList.toggle(`no-${layer}`, !pressed);

      try {
        localStorage.setItem(`${LAYER_KEY}${layer}`, String(pressed));
      } catch (error) {
        void error;
      }

      if (layer === "cur") {
        if (pressed) {
          startLoop();
        } else {
          stopLoop();
        }
      }

      if (layer === "heat" && pressed) {
        scheduleHeat();
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const visible =
          entry.isIntersecting &&
          (entry.intersectionRect.height > 120 || entry.intersectionRatio >= 0.35);

        if (!visible || !(entry.target instanceof HTMLElement)) {
          return;
        }

        const key = entry.target.dataset.block;

        if (!key || seen.has(key)) {
          return;
        }

        seen.add(key);
        step(key);

        if (key === "process") {
          bump("process", 2.1);
        }
      });
    },
    { threshold: [0, 0.15, 0.35, 0.6] },
  );

  root.querySelectorAll<HTMLElement>("[data-block]").forEach((section) => {
    observer.observe(section);
  });
  cleanups.push(() => observer.disconnect());

  root.querySelectorAll<HTMLElement>('[data-hot="cta"]').forEach((button) => {
    let used = false;

    on(button, "pointerenter", () => {
      if (used) {
        return;
      }

      used = true;
      const block = button.closest<HTMLElement>("[data-block]")?.dataset.block ?? "hero";
      bump(block, 1.6);
      bonus += 1;
      paintProbability();
    });
  });

  on(root, "click", (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const target = event.target.closest<HTMLElement>("[data-ev]");

    if (!target) {
      return;
    }

    const name = target.dataset.ev ?? "";

    if (name === "svc") {
      bump("services", 1.7);
    }

    if (name.startsWith("cta")) {
      const block = target.closest<HTMLElement>("[data-block]")?.dataset.block ?? "hero";
      bump(block, 2.2);
      bonus += 2;
      paintProbability();
    }
  });

  root.querySelectorAll("details").forEach((details) => {
    on(details, "toggle", () => {
      if (!details.open) {
        return;
      }

      const name = details.querySelector<HTMLElement>("[data-ev]")?.dataset.ev;

      if (name === "case") {
        bump("cases", 2.4);
      }

      if (name === "faq") {
        bump("faq", 1.9);
      }
    });
  });

  const hovered = new WeakSet<Element>();

  root.querySelectorAll(".cv-svc").forEach((card) => {
    on(card, "pointerenter", () => {
      if (hovered.has(card)) {
        return;
      }

      hovered.add(card);
      bump("services", 0.6);
    });
  });

  root.querySelectorAll(".cv-prow[data-hot]").forEach((row) => {
    on(row, "pointerenter", () => {
      if (hovered.has(row)) {
        return;
      }

      hovered.add(row);
      bump("prices", 0.8);
    });
  });

  const visits = root.querySelector("#cv-visits");
  const leads = root.querySelector("#cv-leads");
  const what = root.querySelector("#cv-what");
  let calculatorUsed = false;

  const readNumber = (input: Element | null, fallback: number) => {
    if (!(input instanceof HTMLInputElement)) {
      return fallback;
    }

    return Number(input.value);
  };

  const paintCalculator = () => {
    const visitCount = safeVisits(readNumber(visits, 1));
    const leadCount = safeLeads(readNumber(leads, 0));
    const rate = readNumber(what, 2);
    const projected = projectedLeads(visitCount, rate);
    const rateNode = root.querySelector("#cv-cr");
    const whatOut = root.querySelector("#cv-what-out");
    const countNode = root.querySelector("#cv-what-count");
    const baseNode = root.querySelector("#cv-what-base");

    if (rateNode) {
      rateNode.textContent = formatDemo((leadCount / visitCount) * 100);
    }

    if (whatOut) {
      whatOut.textContent = formatDemo(rate);
    }

    if (countNode) {
      countNode.textContent = `${projected} ${leadWord(projected)}`;
    }

    if (baseNode) {
      baseNode.textContent = String(Math.round(leadCount));
    }
  };

  [visits, leads, what].forEach((input) => {
    if (!input) {
      return;
    }

    on(input, "input", () => {
      paintCalculator();

      if (!calculatorUsed) {
        calculatorUsed = true;
        bump("calc", 3.5);
        bonus += 4;
        paintProbability();
      }
    });
  });

  const palette = createPalette();

  const scheduleHeat = () => {
    if (heatTimer || disposed || !heatContext || !fieldContext) {
      return;
    }

    heatTimer = window.setTimeout(() => {
      heatTimer = 0;

      if (!disposed) {
        renderHeat();
      }
    }, 120);
  };

  const addHeat = (x: number, y: number, radius = 60, alpha = 0.35) => {
    if (reduced) {
      return;
    }

    userPoints.push({ x, y, r: radius, a: alpha });

    if (userPoints.length > 400) {
      userPoints.shift();
    }

    scheduleHeat();
  };

  const renderHeat = () => {
    if (
      disposed ||
      !(heat instanceof HTMLCanvasElement) ||
      !heatContext ||
      !fieldContext ||
      root.classList.contains("no-heat")
    ) {
      return;
    }

    const width = Math.max(1, Math.ceil(window.innerWidth / HEAT_SCALE));
    const height = Math.max(1, Math.ceil(contentHeight(root) / HEAT_SCALE));
    field.width = width;
    field.height = height;
    heat.width = width;
    heat.height = height;
    heat.style.height = `${height * HEAT_SCALE}px`;
    fieldContext.clearRect(0, 0, width, height);

    for (let y = 0; y < height; y += 2) {
      const depth = y / height;
      const alpha = 0.3 * Math.exp(-depth * 2.6) + 0.05;
      fieldContext.fillStyle = `rgba(0,0,0,${alpha})`;
      fieldContext.fillRect(0, y, width, 2);
    }

    let seed = 7;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };

    root.querySelectorAll<HTMLElement>("[data-hot]").forEach((element) => {
      const rect = element.getBoundingClientRect();
      const centerX = (rect.left + rect.width / 2) / HEAT_SCALE;
      const centerY = (rect.top + window.scrollY + rect.height / 2) / HEAT_SCALE;
      const depth = 1 - (centerY / height) * 0.65;
      const weight = element.dataset.hot === "cta" ? 1 : 0.55;
      blob(
        fieldContext,
        centerX,
        centerY,
        (Math.max(rect.width, rect.height) / HEAT_SCALE) * 0.8,
        0.6 * weight * depth,
      );

      for (let index = 0; index < 3; index += 1) {
        blob(
          fieldContext,
          centerX + (random() - 0.5) * (rect.width / HEAT_SCALE),
          centerY + (random() - 0.5) * (rect.height / HEAT_SCALE),
          6 + random() * 10,
          0.3 * depth,
        );
      }
    });

    root.querySelectorAll("h1, .cv-title").forEach((element) => {
      const rect = element.getBoundingClientRect();
      blob(
        fieldContext,
        (rect.left + rect.width * 0.35) / HEAT_SCALE,
        (rect.top + window.scrollY + rect.height / 2) / HEAT_SCALE,
        (rect.width / HEAT_SCALE) * 0.6,
        0.2,
      );
    });

    if (!reduced) {
      userPoints.forEach((point) => {
        blob(
          fieldContext,
          point.x / HEAT_SCALE,
          point.y / HEAT_SCALE,
          point.r / HEAT_SCALE,
          point.a,
        );
      });
    }

    const source = fieldContext.getImageData(0, 0, width, height);
    const output = heatContext.createImageData(width, height);

    for (let index = 0; index < source.data.length; index += 4) {
      const alpha = source.data[index + 3];

      if (!alpha) {
        continue;
      }

      const tone = Math.min(255, alpha * 1.25) | 0;
      const paletteIndex = tone * 4;
      output.data[index] = palette[paletteIndex];
      output.data[index + 1] = palette[paletteIndex + 1];
      output.data[index + 2] = palette[paletteIndex + 2];
      output.data[index + 3] = Math.min(HEAT_ALPHA_CAP, tone * 0.75);
    }

    heatContext.putImageData(output, 0, 0);
    root.classList.add("is-heat");
  };

  const updateRuler = () => {
    const tag = root.querySelector("#cv-ruler-tag");

    if (!(tag instanceof HTMLElement)) {
      return;
    }

    const range = Math.max(1, contentHeight(root) - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / range));
    const reach = Math.round(100 * Math.exp(-progress * 1.35));
    tag.style.top = `${progress * 100}%`;
    tag.textContent = `${reach}% · демо`;
  };

  let rulerQueued = false;

  on(
    window,
    "scroll",
    () => {
      if (rulerQueued) {
        return;
      }

      rulerQueued = true;
      requestAnimationFrame(() => {
        rulerQueued = false;

        if (!disposed) {
          updateRuler();
        }
      });
    },
    { passive: true },
  );

  on(
    window,
    "pointermove",
    (event) => {
      if (!(event instanceof PointerEvent) || reduced) {
        return;
      }

      const now = performance.now();

      if (now - lastMove >= 250) {
        lastMove = now;
        addHeat(event.pageX, event.pageY, 40, 0.08);
      }

      cursors.forEach((cursor) => {
        const distance = Math.hypot(cursor.x - event.pageX, cursor.y - event.pageY);
        cursor.el.style.opacity = distance < 160 ? "0.12" : "";
      });
    },
    { passive: true },
  );

  let lastMove = 0;

  on(window, "click", (event) => {
    if (!(event instanceof MouseEvent) || reduced) {
      return;
    }

    addHeat(event.pageX, event.pageY, 70, 0.5);
  });

  const resizeObserver = new ResizeObserver(() => {
    scheduleHeat();
    placeCursors();
  });
  resizeObserver.observe(root);
  cleanups.push(() => resizeObserver.disconnect());

  function placeCursors() {
    if (!(cursorLayer instanceof HTMLElement)) {
      return;
    }

    cursorLayer.style.height = `${contentHeight(root)}px`;
  }

  function cursorTargets(): Array<{ x: number; y: number }> {
    const points = Array.from(
      root.querySelectorAll(".cv-main .cv-btn, .cv-metric, .cv-price, .cv-plus, .cv-faq summary"),
    ).map((element) => {
      const rect = element.getBoundingClientRect();
      return {
        x: rect.left + rect.width * (0.55 + Math.random() * 0.4),
        y: rect.top + window.scrollY + rect.height * (0.5 + Math.random() * 0.4),
      };
    });
    const gutter = Math.max(24, (window.innerWidth - Math.min(1200, window.innerWidth - 48)) / 2);

    const header = root.querySelector(".cv-header");
    const headerBottom =
      header instanceof HTMLElement ? header.getBoundingClientRect().height + window.scrollY + 8 : window.scrollY + 72;

    for (let index = 0; index < 6; index += 1) {
      points.push({
        x:
          Math.random() < 0.5
            ? gutter * Math.random()
            : window.innerWidth - gutter * Math.random() - 30,
        y: headerBottom + (window.innerHeight - 80) * Math.random(),
      });
    }

    return points;
  }

  function titleBand() {
    const title = root.querySelector("h1");

    if (!(title instanceof HTMLElement)) {
      return null;
    }

    const rect = title.getBoundingClientRect();

    return {
      left: rect.left - 12,
      right: rect.right + 12,
      top: rect.top + window.scrollY - 8,
      bottom: rect.bottom + window.scrollY + 28,
    };
  }

  function clearsTitle(point: { x: number; y: number }) {
    const band = titleBand();

    if (!band) {
      return true;
    }

    const labelRight = point.x + 156;
    const labelBottom = point.y + 40;

    return (
      labelRight < band.left ||
      point.x > band.right ||
      labelBottom < band.top ||
      point.y > band.bottom
    );
  }

  function retarget(cursor: Cursor, initial = false) {
    const points = cursorTargets().filter(
      (point) =>
        clearsTitle(point) &&
        (initial ||
          Math.abs(point.y - (window.scrollY + window.innerHeight / 2)) < window.innerHeight * 1.1),
    );
    const band = titleBand();
    const point = points[Math.floor(Math.random() * points.length)] ?? {
      x: Math.max(24, window.innerWidth * 0.62),
      y: band ? band.bottom + 56 : window.scrollY + window.innerHeight * 0.72,
    };
    cursor.tx = point.x;
    cursor.ty = point.y;
  }

  function createCursor(index: number): Cursor {
    const colors = ["#2F6BFF", "#0E9F6E", "#B03CFF", "#FF4A1C", "#C77F00"];
    const color = colors[index % colors.length];
    const element = document.createElement("div");
    element.className = "cv-cur";
    element.style.setProperty("--cur", color);
    element.innerHTML = `<svg width="18" height="20" viewBox="0 0 18 20" aria-hidden="true"><path d="M1 1l15 8-6.5 1.6L6 17z" fill="${color}" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg><span>${index === 0 ? "имитация · " : ""}гость ${index + 1}</span>`;
    cursorLayer?.appendChild(element);

    return {
      el: element,
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      wait: 0,
      v: 0.012 + Math.random() * 0.012,
    };
  }

  function initCursors() {
    if (!(cursorLayer instanceof HTMLElement)) {
      return;
    }

    cursorLayer.replaceChildren();
    cursors.length = 0;
    placeCursors();
    const count = reduced ? (mobile ? 2 : 3) : mobile ? 2 : 5;
    const gutter = Math.max(14, (window.innerWidth - Math.min(1200, window.innerWidth - 48)) / 2 - 20);
    const narrow = window.innerWidth < 700;
    const band = titleBand();
    const belowTitle = band ? band.bottom + 20 : window.scrollY + window.innerHeight * 0.55;

    for (let index = 0; index < count; index += 1) {
      const cursor = createCursor(index);
      cursor.x = narrow
        ? window.innerWidth * (0.42 + Math.random() * 0.36)
        : index % 2
          ? window.innerWidth - gutter * Math.random() - 24
          : gutter * Math.random();
      cursor.y = narrow
        ? Math.min(
            window.scrollY + window.innerHeight - 96,
            Math.max(belowTitle, window.scrollY + window.innerHeight * (0.58 + Math.random() * 0.28)),
          )
        : window.scrollY + window.innerHeight * (0.2 + 0.7 * Math.random());
      cursor.tx = cursor.x;
      cursor.ty = cursor.y;
      cursor.el.style.transform = `translate(${cursor.x}px, ${cursor.y}px)`;
      cursors.push(cursor);

      if (!reduced) {
        retarget(cursor);
      }
    }
  }

  function stopLoop() {
    loopRunning = false;

    if (loopId) {
      cancelAnimationFrame(loopId);
      loopId = 0;
    }
  }

  function startLoop() {
    if (reduced || disposed || loopRunning || root.classList.contains("no-cur")) {
      return;
    }

    loopRunning = true;
    let last = performance.now();

    const frame = (now: number) => {
      if (disposed || !loopRunning) {
        return;
      }

      const delta = Math.min(50, now - last);
      last = now;

      if (!document.hidden && !root.classList.contains("no-cur")) {
        cursors.forEach((cursor) => {
          if (cursor.wait > 0) {
            cursor.wait -= delta;
            return;
          }

          const dx = cursor.tx - cursor.x;
          const dy = cursor.ty - cursor.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 3) {
            cursor.wait = 900 + Math.random() * 2600;

            if (Math.random() < 0.35 && cursorLayer) {
              const ripple = document.createElement("div");
              ripple.className = "cv-ripple";
              ripple.style.left = `${cursor.x}px`;
              ripple.style.top = `${cursor.y}px`;
              cursorLayer.appendChild(ripple);
              window.setTimeout(() => ripple.remove(), 700);
              addHeat(cursor.x, cursor.y, 50, 0.18);
            }

            retarget(cursor);
            return;
          }

          const stepSize = Math.min(1, cursor.v * delta * 0.06);
          const wobble = Math.sin(now / 300 + cursor.v * 1000) * 0.6;
          cursor.x += dx * stepSize + wobble;
          cursor.y += dy * stepSize;
          cursor.el.style.transform = `translate(${cursor.x.toFixed(1)}px, ${cursor.y.toFixed(1)}px)`;
        });
      }

      loopId = requestAnimationFrame(frame);
    };

    loopId = requestAnimationFrame(frame);
  }

  const bootLayers = () => {
    if (disposed) {
      return;
    }

    renderHeat();
    initCursors();
    updateRuler();

    if (!reduced) {
      startLoop();
      dwellTimer = window.setInterval(() => {
        if (document.hidden || disposed) {
          return;
        }

        addHeat(
          window.innerWidth / 2,
          window.scrollY + window.innerHeight * 0.45,
          window.innerWidth * 0.45,
          0.05,
        );
      }, 1500);
    }
  };

  let idleId = 0;
  let timeoutId = 0;
  const fontsReady = document.fonts?.ready ?? Promise.resolve();

  const scheduleBoot = () => {
    fontsReady.then(() => {
      if (disposed) {
        return;
      }

      const run = () => {
        if (!disposed) {
          bootLayers();
        }
      };

      const scheduleIdle = window.requestIdleCallback?.bind(window);

      if (scheduleIdle) {
        idleId = scheduleIdle(run, { timeout: 1200 });
      } else {
        timeoutId = window.setTimeout(run, 300);
      }
    });
  };

  scheduleBoot();
  paintProbability();
  updateRuler();

  return () => {
    disposed = true;
    stopLoop();
    window.clearTimeout(heatTimer);
    window.clearInterval(dwellTimer);

    if (idleId) {
      window.cancelIdleCallback(idleId);
    }

    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }

    cleanups.forEach((cleanup) => cleanup());

    if (cursorLayer) {
      cursorLayer.replaceChildren();
    }
  };
}

function blob(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  alpha: number,
) {
  if (radius <= 0 || alpha <= 0) {
    return;
  }

  const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, `rgba(0,0,0,${alpha})`);
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = gradient;
  context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
}

function createPalette(): Uint8ClampedArray {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 1;
  const context = canvas.getContext("2d");

  if (!context) {
    return new Uint8ClampedArray(256 * 4);
  }

  const gradient = context.createLinearGradient(0, 0, 256, 0);
  const stops: Array<[number, string]> = [
    [0, "#2F6BFF"],
    [0.3, "#2FB5FF"],
    [0.5, "#5FD16A"],
    [0.7, "#FFD12E"],
    [0.85, "#FF8A1C"],
    [1, "#FF3B1C"],
  ];

  stops.forEach(([offset, color]) => gradient.addColorStop(offset, color));
  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 1);
  return context.getImageData(0, 0, 256, 1).data;
}
