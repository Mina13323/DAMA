import { Fragment, type CSSProperties, type ElementType } from "react";

/** Renders "*accent*" segments in signature red italic serif. */
export function Accent({ text }: { text: string }) {
  return text.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <span key={i} className="text-[#C51E28] italic font-serif">
        {part.slice(1, -1)}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export const plain = (lines: readonly string[]) => lines.join(" ").replace(/\*/g, "");

export const stagger = (d: number) => ({ "--d": d }) as CSSProperties;

/**
 * Editorial headline split into deliberate lines. Each line rises inside its
 * own mask. `mode="enter"` plays on load (hero); default reveals on scroll.
 */
export function Lines({
  lines,
  as: Tag = "h2",
  id,
  className = "",
  delay = 0,
  mode = "scroll",
}: {
  lines: readonly string[];
  as?: ElementType;
  id?: string;
  className?: string;
  delay?: number;
  mode?: "scroll" | "enter";
}) {
  const enter = mode === "enter";
  return (
    <Tag id={id} className={className} data-reveal={enter ? undefined : "lines"} style={stagger(delay)}>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="line">
            <span
              className={enter ? "line-inner enter-line" : "line-inner"}
              style={
                (enter
                  ? { animationDelay: `${250 + i * 110}ms` }
                  : { "--i": i }) as CSSProperties
              }
            >
              <Accent text={line} />
            </span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
