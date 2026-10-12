"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";

export const IMAGE_FALLBACK = "/icons/image-placeholder.svg";
export const IMAGE_FALLBACK_ICON = "/icons/image-off.svg";

type SafeImageProps = Omit<ImageProps, "src" | "onError"> & {
  src: ImageProps["src"];
  fallbackSrc?: string;
};

export function SafeImage({
  src,
  fallbackSrc = IMAGE_FALLBACK,
  alt,
  ...props
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setFailed(false);
  }, [src]);

  return (
    <Image
      {...props}
      alt={alt}
      src={failed ? fallbackSrc : currentSrc}
      onError={() => {
        if (failed) return;
        setFailed(true);
        setCurrentSrc(fallbackSrc);
      }}
    />
  );
}
