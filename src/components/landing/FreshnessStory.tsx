import { Icon } from "@/components/ui/Icon";

const ingredients = [
  { icon: "chicken", name: "Chicken breast", desc: "Lean, high-quality protein" },
  { icon: "grain", name: "Brown rice", desc: "Slow-release carbohydrates" },
  { icon: "carrot", name: "Carrots", desc: "Beta-carotene & fibre" },
  { icon: "leaf", name: "Spinach", desc: "Iron & vitamins" },
  { icon: "spice", name: "Turmeric", desc: "Anti-inflammatory" },
  { icon: "egg", name: "Eggs", desc: "Complete amino acids" },
];

const badges = [
  { icon: "cook", label: "FSSAI-licensed kitchen" },
  { icon: "vet", label: "Vet-formulated recipes" },
  { icon: "sunrise", label: "Cooked & delivered same day" },
];

export function FreshnessStory() {
  return (
    <section className="w-full border-t border-[var(--color-border)]" style={{ padding: "6rem 0" }}>
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <h2 className="headline-xl text-[clamp(2.2rem,4.6vw,3.6rem)] text-foreground">
            Ingredients you'd <em className="accent-italic">recognise.</em>
          </h2>
          <div className="flex flex-col justify-end gap-4">
            <p className="max-w-[480px] text-base text-muted-foreground md:text-lg">
              Human-grade, locally sourced, seasonal. No fillers, no by-products, no preservatives.
              Every meal is cooked fresh in our FSSAI-licensed kitchen.
            </p>
          </div>
        </div>

        {/* Ingredient grid */}
        <div className="card-container mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {ingredients.map((ing, i) => (
            <div
              key={ing.name}
              className={`flex flex-col items-center p-6 text-center ${
                i > 0
                  ? "border-t border-[var(--color-border)] md:border-l " +
                    (i % 2 !== 0 ? "border-l" : "md:border-t-0 ") +
                    (i >= 2 ? "" : "md:border-t-0 ") +
                    (i % 3 === 0 ? "md:border-l-0 " : "")
                  : ""
              } ${i >= 2 ? "lg:border-t-0" : ""} ${i > 0 ? "lg:border-l" : ""} ${i % 6 === 0 ? "lg:border-l-0" : ""}`}
            >
              <Icon name={ing.icon} size={32} className="text-accent" />
              <div className="mt-3 text-sm font-medium text-foreground">{ing.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">{ing.desc}</div>
            </div>
          ))}
        </div>

        {/* Differentiator callout */}
        <div className="mt-10 rounded-[20px] bg-[var(--color-hero-panel)] p-7 md:p-10">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-[600px]">
              <h3 className="font-serif text-xl text-foreground md:text-2xl">
                Unlike frozen food that has to be thawed —<br />
                <em className="accent-italic">yours is cooked this morning.</em>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Every Pupsy box arrives fresh, never frozen. No microwave, no thawing, no guesswork.
                Just open and serve.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {badges.map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-2 rounded-full bg-background px-4 py-2 text-xs text-foreground shadow-sm"
                >
                  <Icon name={b.icon} size={16} />
                  {b.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
