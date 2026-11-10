"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { yandexMetrika } from "@/data/site";

type YmHitOptions = {
  title?: string;
  referer?: string;
};

declare global {
  interface Window {
    ym?: (
      id: number,
      method: string,
      url?: string,
      options?: YmHitOptions,
    ) => void;
  }
}

export function YandexMetrikaHit() {
  const pathname = usePathname();
  const isFirstPath = useRef(true);
  const previousUrl = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (isFirstPath.current) {
      isFirstPath.current = false;
      previousUrl.current = window.location.href;
      return;
    }

    const url = window.location.href;
    window.ym?.(yandexMetrika.id, "hit", url, {
      title: document.title,
      referer: previousUrl.current,
    });
    previousUrl.current = url;
  }, [pathname]);

  return null;
}
