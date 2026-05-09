import Link from "next/link";
import Image from "next/image";

type Recipe = {
  name: string;
  image: string;
  protein: string;
  description: string;
  tags: string[];
  bgColor: string;
  macros: string;
  breakdown: { label: string; percent: number; color: string }[];
};

const recipes: Recipe[] = [
  { 
    name: "Paneer & Rice", 
    image: "/recipes/veg.png", 
    protein: "Paneer & Moong Dal", 
    description: "A vibrant vegetarian mix of cubed paneer, cooked yellow moong dal, white rice, shredded pumpkin, and fresh veggies.", 
    tags: ["Vegetarian", "Gentle stomach"], 
    bgColor: "bg-green-50",
    macros: "130 kcal | 7.5g Protein | 6.8g Fat | 10g Carbs (per 100g)",
    breakdown: [
      { label: "Paneer", percent: 40, color: "bg-amber-100" },
      { label: "Rice & Dal", percent: 40, color: "bg-amber-500" },
      { label: "Veggies", percent: 20, color: "bg-emerald-400" },
    ]
  },
  { 
    name: "Chicken & Quinoa", 
    image: "/recipes/senior.png", 
    protein: "Chicken & Quinoa", 
    description: "Shredded cooked chicken, fluffy cooked quinoa, vibrant shredded carrots, green beans, and a rich golden bone broth. Lower carbs & kcal.", 
    tags: ["High protein", "Senior dogs"], 
    bgColor: "bg-rose-50",
    macros: "88 kcal | 7.6g Protein | 1.8g Fat | 5.3g Carbs (per 100g)",
    breakdown: [
      { label: "Chicken", percent: 60, color: "bg-rose-400" },
      { label: "Quinoa", percent: 20, color: "bg-amber-400" },
      { label: "Veggies & Broth", percent: 20, color: "bg-emerald-400" },
    ]
  },
  { 
    name: "Chicken & Rice", 
    image: "/recipes/chicken_rice.png", 
    protein: "Chicken & Liver", 
    description: "Juicy diced chicken breast, small pieces of chicken liver, fluffy white rice, scrambled farm eggs, carrots, and a hint of rich ghee.", 
    tags: ["All life stages", "Energy boost"], 
    bgColor: "bg-amber-50",
    macros: "149 kcal | 13g Protein | 7.2g Fat | 7.3g Carbs (per 100g)",
    breakdown: [
      { label: "Chicken", percent: 60, color: "bg-rose-400" },
      { label: "Liver & Eggs", percent: 15, color: "bg-amber-600" },
      { label: "Rice & Veggies", percent: 25, color: "bg-amber-400" },
    ]
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
            3 vet-formulated recipes made from real, whole ingredients. We'll recommend the best
            one for your dog based on their profile.
          </p>
        </div>

        {/* Recipe cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((r) => (
            <div
              key={r.name}
              className="group flex flex-col overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-background transition-shadow hover:shadow-lg"
            >
              {/* Image hero area */}
              <div className={`relative h-64 w-full ${r.bgColor} overflow-hidden`}>
                <Image src={r.image} alt={r.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {r.protein}
                </div>
                <h3 className="mt-1.5 font-serif text-xl text-foreground">{r.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {r.description}
                </p>
                
                {/* Visual Breakdown */}
                <div className="mt-5 mb-2">
                  <div className="space-y-2">
                    {r.breakdown.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-[10px] uppercase tracking-wider mb-1 text-muted-foreground">
                          <span>{item.label}</span>
                          <span className="font-bold text-foreground">{item.percent}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted/20 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`} 
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 mb-5 rounded-lg bg-muted/10 p-3 border border-[var(--color-border)]">
                   <p className="text-[11px] font-medium text-muted-foreground text-center">{r.macros}</p>
                </div>

                {/* Tags */}
                <div className="mt-auto flex flex-wrap gap-2">
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
      </div>
    </section>
  );
}
