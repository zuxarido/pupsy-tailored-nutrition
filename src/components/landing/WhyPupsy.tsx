import type { ReactNode } from "react";

const ScaleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <path d="M12 4v16M5 8h14M5 8l-2 6a4 4 0 0 0 8 0L9 8M19 8l-2 6a4 4 0 0 0 8 0L23 8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z" strokeLinejoin="round" />
    <path d="M5 19c4-4 8-6 12-8" strokeLinecap="round" />
  </svg>
);
const SparkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" strokeLinecap="round" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
);

type Card = { icon: ReactNode; title: string; body: string };

const cards: Card[] = [
  {
    icon: <ScaleIcon />,
    title: "Precision portioning",
    body: "Overfeeding is the most common health problem in dogs. Every Pupsy meal is calculated to the gram for your dog's exact body weight and energy needs.",
  },
  {
    icon: <LeafIcon />,
    title: "Made fresh, not stored",
    body: "No preservatives, no shelf-stable compromises. Meals are cooked and shipped within 48 hours so your dog eats food that is actually fresh.",
  },
  {
    icon: <SparkIcon />,
    title: "Gets smarter over time",
    body: "Pupsy tracks your dog's health data across every order. The longer you stay, the more personalised the plan becomes — from meals to supplements to wellness checks.",
  },
];

export function WhyPupsy() {
  return (
    <section
      id="science"
      className="w-full"
      style={{
        backgroundColor: "var(--color-dark-section)",
        color: "var(--color-cream)",
        padding: "7rem 0",
      }}
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <h2
          className="headline-xl max-w-[820px] text-[clamp(2.2rem,4.6vw,3.6rem)]"
          style={{ color: "var(--color-cream)" }}
        >
          Not just food. A <em className="accent-italic">system</em> for a healthier dog.
        </h2>

        <div className="card-container-dark mt-14 grid grid-cols-1 md:grid-cols-3">
          {cards.map((c, i) => (
            <div
              key={c.title}
              className={`flex flex-col p-7 md:p-9 ${
                i > 0 ? "border-t border-white/10 md:border-t-0 md:border-l" : ""
              }`}
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-[10px]"
                style={{
                  backgroundColor: "rgba(232,98,42,0.15)",
                  color: "var(--color-accent)",
                }}
              >
                {c.icon}
              </div>

              <h3
                className="mt-7 font-serif text-2xl"
                style={{ color: "var(--color-cream)" }}
              >
                {c.title}
              </h3>
              <p
                className="mt-4 text-sm leading-[1.7]"
                style={{ color: "rgba(250,246,240,0.55)" }}
              >
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
