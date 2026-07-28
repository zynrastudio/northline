import Image from "next/image";
import { DoubleBezel } from "@/components/shared/DoubleBezel";

type InsightBodyProps = {
  body: string;
};

type FigureBlock = {
  kind: "figure";
  src: string;
  alt: string;
  caption?: string;
};

type TextBlock =
  | { kind: "heading"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | FigureBlock;

const FIGURE_PATTERN = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/;

function parseBlocks(body: string): TextBlock[] {
  const raw = body
    .trim()
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return raw.map((block): TextBlock => {
    if (block.startsWith("## ")) {
      return { kind: "heading", text: block.replace(/^##\s+/, "") };
    }

    if (block.startsWith("> ")) {
      return {
        kind: "quote",
        text: block
          .split(/\n/)
          .map((line) => line.replace(/^>\s?/, "").trim())
          .join(" "),
      };
    }

    const figureMatch = block.match(FIGURE_PATTERN);
    if (figureMatch) {
      return {
        kind: "figure",
        alt: figureMatch[1],
        src: figureMatch[2],
        caption: figureMatch[3],
      };
    }

    if (/^\d+\.\s/.test(block) || /^[-*]\s/.test(block) || block.includes("\n")) {
      const lines = block
        .split(/\n/)
        .map((line) => line.trim())
        .filter(Boolean);
      const isList = lines.every(
        (line) => /^\d+\.\s/.test(line) || /^[-*]\s/.test(line),
      );
      if (isList) {
        return {
          kind: "list",
          ordered: lines.every((line) => /^\d+\.\s/.test(line)),
          items: lines.map((line) =>
            line.replace(/^\d+\.\s+/, "").replace(/^[-*]\s+/, ""),
          ),
        };
      }
    }

    return { kind: "paragraph", text: block.replace(/\s*\n\s*/g, " ") };
  });
}

/** Renders insight body: headings, pull quotes, figures, lists, paragraphs. */
export function InsightBody({ body }: InsightBodyProps) {
  const blocks = parseBlocks(body);

  return (
    <div className="space-y-8 text-base leading-relaxed text-ink sm:space-y-10 sm:text-lg">
      {blocks.map((block, index) => {
        switch (block.kind) {
          case "heading":
            return (
              <h2
                key={index}
                className="pt-2 font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-2 border-brand/40 pl-5 sm:pl-6"
              >
                <p className="font-[family-name:var(--font-outfit)] text-xl font-medium leading-snug tracking-tight text-ink sm:text-2xl">
                  {block.text}
                </p>
              </blockquote>
            );
          case "figure":
            return (
              <figure key={index} className="py-2">
                <DoubleBezel>
                  <div className="relative aspect-[16/10] bg-surface-muted">
                    <Image
                      src={block.src}
                      alt={block.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 720px"
                      className="object-cover"
                    />
                  </div>
                </DoubleBezel>
                {block.caption ? (
                  <figcaption className="mt-4 text-sm leading-relaxed text-steel">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "list": {
            const ListTag = block.ordered ? "ol" : "ul";
            return (
              <ListTag
                key={index}
                className={
                  block.ordered
                    ? "list-decimal space-y-2.5 pl-5 text-steel marker:text-brand"
                    : "list-disc space-y-2.5 pl-5 text-steel marker:text-brand"
                }
              >
                {block.items.map((item) => (
                  <li key={item} className="pl-1 text-ink">
                    {item}
                  </li>
                ))}
              </ListTag>
            );
          }
          default:
            return (
              <p key={index} className="text-steel">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
