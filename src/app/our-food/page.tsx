import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";
import Image from "next/image";

const recipes = [
  {
    name: "Paneer & Rice",
    image: "/recipes/veg.png",
    protein: "Paneer & Moong Dal",
    desc: "A vibrant vegetarian mix of cubed paneer, cooked yellow moong dal, white rice, shredded pumpkin, and fresh veggies.",
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
    desc: "Shredded cooked chicken, fluffy cooked quinoa, vibrant shredded carrots, green beans, and a rich golden bone broth. Lower carbs & kcal.",
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
    desc: "Juicy diced chicken breast, small pieces of chicken liver, fluffy white rice, scrambled farm eggs, carrots, and a hint of rich ghee.",
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

export default function OurFoodPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="w-full" style={{ padding: "5rem 0 6rem" }}>
          <div className="mx-auto max-w-[1320px] px-6 md:px-10">
            <div className="mx-auto max-w-[600px] text-center">
              <h1 className="headline-xl text-[clamp(2.4rem,5vw,4rem)] text-foreground">
                Real food. Real <em className="accent-italic">ingredients.</em>
              </h1>
              <p className="mt-5 text-base text-muted-foreground md:text-lg">
                3 vet-formulated recipes made from human-grade ingredients. We recommend the best one based on your dog&rsquo;s unique profile.
              </p>
            </div>

            {/* Recipe cards */}
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((r) => (
                <div key={r.name} className="group flex flex-col overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-background transition-shadow hover:shadow-lg">
                  <div className={`relative h-64 w-full ${r.bgColor} overflow-hidden`}>
                    <Image src={r.image} alt={r.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{r.protein}</div>
                    <h3 className="mt-1.5 font-serif text-xl text-foreground">{r.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>

                    {/* Visual Breakdown */}
                    <div className="mt-6 mb-2">
                      <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">Recipe Breakdown</p>
                      <div className="space-y-3">
                        {r.breakdown.map((item, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">{item.label}</span>
                              <span className="font-medium">{item.percent}%</span>
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

                    <div className="mt-auto flex flex-wrap gap-2">
                      {r.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-[var(--color-pill-bg)] px-2.5 py-1 text-[11px] text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="mb-6 text-sm font-medium text-accent uppercase tracking-widest">Meals starting from ₹100/day</p>
              <Link href="/get-started" className="btn-pill-primary px-10 py-4 text-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Get your free trial meal today
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
