import Image from "next/image";

type ContentImageProps = {
  src: string;
  alt: string;
  className?: string;
  aspect?: "video" | "square" | "photo" | "wide";
  priority?: boolean;
  sizes?: string;
};

const aspectClasses = {
  video: "aspect-video",
  square: "aspect-square",
  photo: "aspect-[4/3]",
  wide: "aspect-[21/9]",
};

export function ContentImage({
  src,
  alt,
  className = "",
  aspect = "video",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px",
}: ContentImageProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-card)] bg-surface-muted ${aspectClasses[aspect]} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
