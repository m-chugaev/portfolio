"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { CheckIcon, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CopyLinkButtonProps = {
  href: string;
  compact?: boolean;
  className?: string;
};

function copyWithExecCommand(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.width = "1px";
  textarea.style.height = "1px";
  textarea.style.padding = "0";
  textarea.style.border = "none";
  textarea.style.outline = "none";
  textarea.style.boxShadow = "none";
  textarea.style.background = "transparent";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, text.length);

  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }

  document.body.removeChild(textarea);
  return ok;
}

export function CopyLinkButton({
  href,
  compact = false,
  className,
}: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  function markCopied() {
    setCopied(true);
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }
    resetTimerRef.current = window.setTimeout(() => {
      setCopied(false);
      resetTimerRef.current = null;
    }, 1600);
  }

  function handleCopy(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (copyWithExecCommand(href)) {
      markCopied();
      return;
    }

    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(href).then(markCopied).catch(() => {});
    }
  }

  const Icon = copied ? CheckIcon : LinkIcon;

  return (
    <Button
      type="button"
      variant="outline"
      size={compact ? "icon" : "default"}
      onClick={handleCopy}
      aria-label={copied ? "Ссылка скопирована" : "Скопировать ссылку на проект"}
      className={cn(
        compact
          ? "size-auto h-10 shrink-0 rounded-none rounded-r-full border-0 border-l border-border bg-transparent px-3.5 shadow-none hover:bg-accent/60"
          : "px-6 has-[>svg]:px-5",
        className,
      )}
    >
      <Icon
        key={copied ? "copied" : "idle"}
        data-icon={compact ? undefined : "inline-start"}
      />
      {compact ? null : copied ? "Скопировано" : "Копировать"}
    </Button>
  );
}
