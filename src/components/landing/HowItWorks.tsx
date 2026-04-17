import type { ReactNode } from "react";

type Step = {
  num: string;
  icon: ReactNode;
  title: string;
  body: string;
  detailLabel: string;
  detailValue: string;
};

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" strokeLinecap="round" />
  </svg>
);
const DocIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <path d="M7 3h7l4 4v14H7z" strokeLinejoin="round" />
    <path d="M14 3v4h4" strokeLinejoin="round" />
    <path d="M9.5 12h6M9.5 15.5h6M9.5 18h4" strokeLinecap="round" />
  </svg>
);
const BagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <path d="M6 8h12l-1 12H7z" strokeLinejoin="round" />
    <path d="M9 8a3 3 0 0 1 6 0" strokeLinecap="round" />
  </svg>
);
const PulseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <circle cx="12" cy="12" r="3.5" />
    <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" strokeLinecap="round" />
  </svg>
);

const steps: Step[] = [
  {
    num: "One",
    icon: <PersonIcon />,
    title: "Tell us about your dog",
    body: "Breed, age, weight, and how active they are day to day. Takes under two minutes.",
    detailLabel: "What we ask",
    detailValue: "Breed · Age · Weight · Activity level · Health goals",
  },
  {
    num: "Two",
    icon: <DocIcon />,
    title: "We build a meal plan",
    body: "Our system calculates exact daily caloric needs and portions every meal to match.",
    detailLabel: "Optimised for",
    detailValue: "Calories · Protein · Gut health · Coat & joint support",
  },
  {
    num: "Three",
    icon: <BagIcon />,
    title: "Fresh meals delivered",
    body: "Cooked fresh, portioned into ready-to-serve packs, and delivered on your schedule.",
    detailLabel: "Delivery",
    detailValue: "Weekly · Fortnightly · Monthly — pause or cancel anytime",
  },
  {
    num: "Four",
    icon: <PulseIcon />,
    title: "The plan evolves",
    body: "As your dog grows, gains weight, or changes activity levels, the plan adjusts automatically.",
    detailLabel: "Coming soon",
    detailValue: "Supplements · Vet check-ins · Health tracking",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="w-full border-t border-[var(--color-border)]"
      style={{ padding: "6rem 0" }}
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        {/* Header row */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <h2 className="headline-xl text-[clamp(2.2rem,4.6vw,3.6rem)] text-foreground">
            Built around your <em className="accent-italic">dog,</em> not a shelf.
          </h2>
          <p className="max-w-[480px] self-end text-base text-muted-foreground md:text-lg">
            Most pet food is made for the average dog. There is no average dog. Pupsy builds a
            feeding plan specific to yours.
          </p>
        </div>

        {/* Card grid */}
        <div className="card-container mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className={`flex flex-col p-7 md:p-8 ${
                i > 0 ? "border-t border-[var(--color-border)] lg:border-t-0 lg:border-l" : ""
              } ${i > 0 && i < 2 ? "md:border-t-0 md:border-l" : ""} ${
                i === 2 ? "md:border-l-0 lg:border-l" : ""
              } ${i === 3 ? "md:border-l" : ""}`}
            >
              <div className="font-serif italic text-accent text-lg">{s.num}</div>

              <div
                className="mt-4 flex h-10 w-10 items-center justify-center rounded-[10px] text-foreground"
                style={{ backgroundColor: "var(--color-card)" }}
              >
                {s.icon}
              </div>

              <h3 className="mt-6 font-serif text-xl text-foreground">{s.title}</h3>
              <p className="mt-3 text-sm leading-[1.7] text-muted-foreground">{s.body}</p>

              <div className="mt-6 flex-1" />

              <div className="mt-6 border-t border-[var(--color-border)] pt-5">
                <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {s.detailLabel}
                </div>
                <div className="mt-1.5 text-sm text-foreground">{s.detailValue}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
