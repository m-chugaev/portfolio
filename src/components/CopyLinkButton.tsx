"use client";

import { useState, type MouseEvent } from "react";
import { CheckIcon, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type CopyLinkButtonProps = {
  href: string;
};

export function CopyLinkButton({ href }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleCopy}
      aria-label="Скопировать ссылку на проект"
    >
      {copied ? (
        <CheckIcon data-icon="inline-start" />
      ) : (
        <LinkIcon data-icon="inline-start" />
      )}
      {copied ? "Скопировано" : "Копировать"}
    </Button>
  );
}
