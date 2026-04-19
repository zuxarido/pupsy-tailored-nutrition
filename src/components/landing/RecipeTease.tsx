import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

type Recipe = {
  name: string;
  icon: string;
  protein: string;
  description: string;
  tags: string[];
  bgColor: string;
};

const recipes: Recipe[] = [
  {
    name: "Chicken & Brown Rice",
    icon: "chicken",
    protein: "Chicken breast",
    description: "Our classic recipe — lean protein with slow-release carbs, carrots, spinach, and a dash of turmeric.",
    tags: ["High protein", "All life stages"],
    bgColor: "bg-amber-50",
  },
  {
    name: "Lamb & Veggies",
    icon: "lamb",
    protein: "Lamb mince",
    description: "Rich in iron and flavour — lamb mince with oats, peas, and pumpkin for easy digestion.",
    tags: ["Omega-3 rich", "Active dogs"],
    bgColor: "bg-rose-50",
  },
  {
    name: "Egg & Lentil",
    icon: "egg",
    protein: "Farm eggs",
    description: "A wholesome vegetarian option — eggs with lentils, carrots, brown rice, and a touch of ghee.",
    tags: ["Vegetarian", "Gentle stomach"],
    bgColor: "bg-green-50",
  },
  {
    name: "Mutton & Sweet Potato",
    icon: "meat",
    protein: "Mutton",
    description: "Hearty and nourishing — mutton with sweet potato, green beans, and ginger for joint support.",
    tags: ["Grain-free", "Senior dogs"],
    bgColor: "bg-orange-50",
  },
];

export function RecipeTease() {
  return (
    <section className="w-full border-t border-[var(--color-border)]" style={{ padding: "6rem 0" }}>
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <h2 className="headline-xl text-[clamp(2.2rem,4.6vw,3.6rem)] text-foreground">
            Recipes your dog will <em className="accent-italic">love.</em>
          </h2>
          <p className="max-w-[480px] self-end text-base text-muted-foreground md:text-lg">
            4 vet-formulated recipes made from real, whole ingredients. We'll recommend the best
            one for your dog based on their profile.
          </p>
        </div>

        {/* Recipe cards */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recipes.map((r) => (
            <div
              key={r.name}
              className="group flex flex-col overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-background transition-shadow hover:shadow-lg"
            >
              {/* Icon hero area */}
              <div
                className={`flex items-center justify-center py-10 ${r.bgColor} transition-transform`}
              >
                <span className="transition-transform duration-300 group-hover:scale-110">
                  <Icon name={r.icon} size={56} className="text-foreground/60" />
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {r.protein}
                </div>
                <h3 className="mt-1.5 font-serif text-lg text-foreground">{r.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {r.description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {r.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[var(--color-pill-bg)] px-2.5 py-1 text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link href="/get-started" className="btn-pill-primary">
            Find the right recipe for your dog
          </Link>
        </div>
      </div>
    </section>
  );
}
