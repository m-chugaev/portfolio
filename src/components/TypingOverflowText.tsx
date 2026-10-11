"use client";

import { useEffect, useRef, useState } from "react";

type TypingOverflowTextProps = {
  text: string;
};

export function TypingOverflowText({ text }: TypingOverflowTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [overflows, setOverflows] = useState(false);
  const [display, setDisplay] = useState(text);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const check = () => {
      setOverflows(measure.scrollWidth > container.clientWidth + 1);
    };

    check();
    const observer = new ResizeObserver(check);
    observer.observe(container);
    return () => observer.disconnect();
  }, [text]);

  useEffect(() => {
    if (!overflows) {
      setDisplay(text);
      setOffset(0);
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setDisplay(text);
      setOffset(0);
      return;
    }

    let index = 0;
    let deleting = false;
    let timer = 0;

    const syncOffset = () => {
      const container = containerRef.current;
      const label = textRef.current;
      if (!container || !label) return;
      const overflow = label.scrollWidth - container.clientWidth;
      setOffset(overflow > 0 ? overflow : 0);
    };

    const tick = () => {
      if (!deleting) {
        index += 1;
        setDisplay(text.slice(0, index));
        requestAnimationFrame(syncOffset);

        if (index >= text.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1600);
          return;
        }

        timer = window.setTimeout(tick, 85);
        return;
      }

      index -= 1;
      setDisplay(text.slice(0, Math.max(index, 0)));
      requestAnimationFrame(syncOffset);

      if (index <= 0) {
        deleting = false;
        timer = window.setTimeout(tick, 450);
        return;
      }

      timer = window.setTimeout(tick, 40);
    };

    setDisplay("");
    setOffset(0);
    timer = window.setTimeout(tick, 500);

    return () => window.clearTimeout(timer);
  }, [overflows, text]);

  return (
    <span
      ref={containerRef}
      className="relative min-w-0 flex-1 overflow-hidden"
      title={text}
    >
      <span
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none absolute whitespace-nowrap opacity-0"
      >
        {text}
      </span>
      <span className="sr-only">{text}</span>
      <span
        ref={textRef}
        aria-hidden="true"
        className="block whitespace-nowrap will-change-transform"
        style={{
          transform: offset > 0 ? `translateX(-${offset}px)` : undefined,
        }}
      >
        {display}
        {overflows ? (
          <span className="ml-px inline-block animate-pulse opacity-70">|</span>
        ) : null}
      </span>
    </span>
  );
}
