import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";

const recipes = [
  { name: "Chicken & Brown Rice", icon: "chicken", protein: "Chicken breast", desc: "Lean protein with slow-release carbs, carrots, spinach, and turmeric.", tags: ["High protein", "All life stages"], bgColor: "bg-amber-50" },
  { name: "Lamb & Veggies", icon: "lamb", protein: "Lamb mince", desc: "Iron-rich lamb with oats, peas, and pumpkin for easy digestion.", tags: ["Omega-3 rich", "Active dogs"], bgColor: "bg-rose-50" },
  { name: "Egg & Lentil", icon: "egg", protein: "Farm eggs", desc: "A wholesome vegetarian option — eggs with lentils, carrots, and ghee.", tags: ["Vegetarian", "Gentle stomach"], bgColor: "bg-green-50" },
  { name: "Mutton & Sweet Potato", icon: "meat", protein: "Mutton", desc: "Hearty mutton with sweet potato, green beans, and ginger for joint support.", tags: ["Grain-free", "Senior dogs"], bgColor: "bg-orange-50" },
];

const ingredients = [
  "Human-grade chicken breast", "Whole grain brown rice", "Fresh carrots & peas",
  "Spinach & kale", "Anti-inflammatory turmeric", "Free-range eggs",
  "Premium lamb mince", "Lean mutton", "Protein-rich lentils",
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
                4 vet-formulated recipes made from human-grade ingredients. We recommend the best one based on your dog&rsquo;s unique profile.
              </p>
            </div>

            {/* Recipe cards */}
            <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {recipes.map((r) => (
                <div key={r.name} className="group flex flex-col overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-background transition-shadow hover:shadow-lg">
                  <div className={`flex items-center justify-center py-10 ${r.bgColor}`}>
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      <Icon name={r.icon} size={56} className="text-foreground/60" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{r.protein}</div>
                    <h3 className="mt-1.5 font-serif text-lg text-foreground">{r.name}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {r.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-[var(--color-pill-bg)] px-2.5 py-1 text-[11px] text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ingredients */}
            <div className="mt-20 rounded-[20px] bg-[var(--color-hero-panel)] p-8 md:p-12">
              <h2 className="font-serif text-2xl text-foreground">What goes into every meal</h2>
              <p className="mt-3 max-w-[500px] text-sm text-muted-foreground">Every ingredient is human-grade, locally sourced, and seasonal.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {ingredients.map((i) => (
                  <span key={i} className="rounded-full bg-background px-4 py-2 text-sm text-foreground shadow-sm">{i}</span>
                ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/get-started" className="btn-pill-primary">
                Find the right recipe for your dog
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
