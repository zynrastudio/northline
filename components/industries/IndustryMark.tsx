import Image from "next/image";

type IndustryMarkProps = {
  src: string;
  name: string;
  className?: string;
  /** Larger mark for heroes / featured */
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "h-12 w-12",
  md: "h-16 w-16",
  lg: "h-24 w-24 sm:h-28 sm:w-28",
} as const;

/**
 * Soft Structuralism industry mark — nested shell around a line SVG.
 */
export function IndustryMark({
  src,
  name,
  className = "",
  size = "md",
}: IndustryMarkProps) {
  return (
    <div
      className={[
        "inline-flex items-center justify-center rounded-[1.25rem] border border-ink/5 bg-ink/[0.03] p-1.5",
        "shadow-[0_18px_40px_-28px_rgba(20,22,26,0.28)]",
        className,
      ].join(" ")}
      aria-hidden
    >
      <div
        className={[
          "relative flex items-center justify-center rounded-[calc(1.25rem-0.375rem)] bg-surface-elevated",
          "shadow-[inset_0_1px_1px_rgba(255,255,255,0.65)]",
          sizeMap[size],
        ].join(" ")}
      >
        <Image
          src={src}
          alt=""
          width={112}
          height={112}
          unoptimized
          className="h-[68%] w-[68%]"
        />
      </div>
      <span className="sr-only">{name} industry mark</span>
    </div>
  );
}
