import type { ReactNode } from "react";

type Column = {
  tag: string;
  tagColor: string;
  title: string;
  items: { label: string; bad?: boolean }[];
  highlight?: boolean;
};

const XIcon = () => (
  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-red-400" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-green-600" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 8.5l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const columns: Column[] = [
  {
    tag: "Kibble",
    tagColor: "bg-red-100 text-red-700",
    title: "Processed & shelf-stable",
    items: [
      { label: "Cooked at extreme heat — destroys nutrients", bad: true },
      { label: "Loaded with preservatives and fillers", bad: true },
      { label: "Same formula for every dog", bad: true },
      { label: "Can sit on a shelf for 12+ months", bad: true },
    ],
  },
  {
    tag: "Frozen",
    tagColor: "bg-amber-100 text-amber-700",
    title: "Better, but compromised",
    items: [
      { label: "Needs thawing before every meal", bad: true },
      { label: "Frozen for weeks — freshness is debatable", bad: true },
      { label: "Not portioned for your dog", bad: true },
      { label: "Requires freezer space", bad: true },
    ],
  },
  {
    tag: "Pupsy",
    tagColor: "bg-green-100 text-green-700",
    title: "Cooked fresh. Every morning.",
    highlight: true,
    items: [
      { label: "Gently cooked to preserve nutrients" },
      { label: "Zero preservatives, zero fillers" },
      { label: "Portioned exactly for your dog" },
      { label: "Delivered fresh — never frozen" },
    ],
  },
];

export function TheProblem() {
  return (
    <section className="w-full border-t border-[var(--color-border)]" style={{ padding: "6rem 0" }}>
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-[680px] text-center">
          <h2 className="headline-xl text-[clamp(2rem,4vw,3.2rem)] text-foreground">
            Most dog food wasn't made for <em className="accent-italic">your</em> dog.
          </h2>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">
            Here's how Pupsy compares to what's out there.
          </p>
        </div>

        {/* Comparison grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {columns.map((col) => (
            <div
              key={col.tag}
              className={`flex flex-col rounded-[20px] p-7 md:p-8 ${
                col.highlight
                  ? "bg-[var(--color-dark-section)] text-[var(--color-cream)]"
                  : "border border-[var(--color-border)] bg-background"
              }`}
            >
              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${col.tagColor}`}
              >
                {col.tag}
              </span>

              <h3
                className={`mt-5 font-serif text-xl ${
                  col.highlight ? "text-[var(--color-cream)]" : "text-foreground"
                }`}
              >
                {col.title}
              </h3>

              <ul className="mt-6 flex flex-col gap-3.5">
                {col.items.map((item) => (
                  <li key={item.label} className="flex items-start gap-2.5 text-sm leading-relaxed">
                    {item.bad ? <XIcon /> : <CheckIcon />}
                    <span className={col.highlight ? "text-[rgba(250,246,240,0.7)]" : "text-muted-foreground"}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
