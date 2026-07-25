type InsightBodyProps = {
  body: string;
};

/** Renders insight body with paragraph and ## heading blocks (no MDX dependency). */
export function InsightBody({ body }: InsightBodyProps) {
  const blocks = body
    .trim()
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6 text-base leading-relaxed text-ink sm:text-lg">
      {blocks.map((block, index) => {
        if (block.startsWith("## ")) {
          return (
            <h2
              key={index}
              className="pt-4 font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl"
            >
              {block.replace(/^##\s+/, "")}
            </h2>
          );
        }

        if (/^\d+\.\s/.test(block) || block.includes("\n")) {
          const lines = block.split(/\n/).map((line) => line.trim()).filter(Boolean);
          const isList = lines.every(
            (line) => /^\d+\.\s/.test(line) || /^[-*]\s/.test(line),
          );
          if (isList) {
            return (
              <ol
                key={index}
                className="list-decimal space-y-2 pl-5 text-steel marker:text-brand"
              >
                {lines.map((line) => (
                  <li key={line} className="pl-1 text-ink">
                    {line.replace(/^\d+\.\s+/, "").replace(/^[-*]\s+/, "")}
                  </li>
                ))}
              </ol>
            );
          }
        }

        return (
          <p key={index} className="text-steel">
            {block.replace(/\s*\n\s*/g, " ")}
          </p>
        );
      })}
    </div>
  );
}
