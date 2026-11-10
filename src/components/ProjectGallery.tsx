import { SafeImage } from "@/components/SafeImage";

type ProjectGalleryProps = {
  images: string[];
  alt: string;
};

export function ProjectGallery({ images, alt }: ProjectGalleryProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {images.map((src, index) => (
        <li
          key={src}
          className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/60 bg-[#12151b]"
        >
          <SafeImage
            src={src}
            alt={`${alt}, кадр ${index + 1}`}
            fill
            sizes="(min-width: 640px) 33vw, 100vw"
            className="object-contain object-center p-2"
            priority={index === 0}
          />
        </li>
      ))}
    </ul>
  );
}
