import { Icon } from "@/components/ui/Icon";

const StarIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-amber-400">
    <path d="M10 1l2.39 4.85 5.35.78-3.87 3.77.91 5.33L10 13.18l-4.78 2.55.91-5.33L2.26 6.63l5.35-.78z" />
  </svg>
);

type Review = {
  quote: string;
  dogName: string;
  ownerName: string;
  city: string;
  stars: number;
  highlight?: string;
};

const reviews: Review[] = [
  {
    quote: "Max used to skip meals with kibble. Now he runs to his bowl the moment he hears the delivery arrive. The difference in his energy levels is unreal.",
    dogName: "Max",
    ownerName: "Priya S.",
    city: "Mumbai",
    stars: 5,
    highlight: "Energy levels transformed",
  },
  {
    quote: "We tried three different brands before Pupsy. Luna's coat was dull and she had constant stomach issues. Within 3 weeks on Pupsy — her coat is shiny and no more vet visits for digestion.",
    dogName: "Luna",
    ownerName: "Arjun M.",
    city: "Bengaluru",
    stars: 5,
    highlight: "Coat & digestion improved",
  },
  {
    quote: "The fact that it's cooked the same morning is what sold me. I can actually see the chicken and vegetables in the pack. It looks like real food because it IS real food.",
    dogName: "Bruno",
    ownerName: "Sneha R.",
    city: "Delhi",
    stars: 5,
    highlight: "Visible real ingredients",
  },
  {
    quote: "I have two dogs with very different needs — a senior lab and a young beagle. Pupsy portions each one separately. I've never seen anything like it in India.",
    dogName: "Buddy & Coco",
    ownerName: "Karan T.",
    city: "Pune",
    stars: 5,
    highlight: "Perfect for multi-dog homes",
  },
];

export function Testimonials() {
  return (
    <section className="w-full border-t border-[var(--color-border)]" style={{ padding: "6rem 0" }}>
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-[680px] text-center">
          <h2 className="headline-xl text-[clamp(2rem,4vw,3.2rem)] text-foreground">
            Real dogs. Real <em className="accent-italic">results.</em>
          </h2>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">
            Don't take our word for it — hear from dog parents who switched.
          </p>
        </div>

        {/* Review grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {reviews.map((r) => (
            <div
              key={r.dogName}
              className="card-container flex flex-col p-7 md:p-8"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              {/* Highlight badge */}
              {r.highlight && (
                <span className="mt-4 w-fit rounded-full bg-[var(--color-tag-fresh-bg)] px-3 py-1 text-[11px] font-medium text-[var(--color-tag-fresh-fg)]">
                  {r.highlight}
                </span>
              )}

              {/* Quote */}
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{r.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div className="mt-6 border-t border-[var(--color-border)] pt-5">
                <div className="text-sm font-medium text-foreground">
                  {r.ownerName}
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  Dog parent to {r.dogName} · {r.city}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Icon name="check" size={18} className="text-accent" />
            Human-Grade Ingredients
          </div>
          <div className="hidden h-4 w-px bg-[var(--color-border)] sm:block" />
          <div className="flex items-center gap-2">
            <Icon name="vet" size={18} className="text-accent" />
            Vet-Formulated
          </div>
          <div className="hidden h-4 w-px bg-[var(--color-border)] sm:block" />
          <div className="flex items-center gap-2">
            <Icon name="paw" size={18} className="text-accent" />
            1,000+ happy dogs
          </div>
        </div>
      </div>
    </section>
  );
}
