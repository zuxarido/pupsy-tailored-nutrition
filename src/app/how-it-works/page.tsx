import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";

const steps = [
  { num: "01", icon: "clipboard", title: "Take the quiz", body: "Answer a quick 2-minute questionnaire about your dog's breed, age, weight, activity level, and any health conditions.", image: "/how-it-works-1.png" },
  { num: "02", icon: "plan", title: "We design their plan", body: "Our vet-formulated algorithm creates a personalised feeding plan — the right recipe, the right portion, every single day.", image: "/how-it-works-2.png" },
  { num: "03", icon: "cook", title: "Cooked fresh every morning", body: "Each day, your dog's meals are cooked in our kitchen using real, human-grade ingredients. No preservatives. No fillers.", image: "/how-it-works-3.png" },
  { num: "04", icon: "door", title: "Delivered to your door", body: "Two pre-portioned packs arrive every morning — one for breakfast, one goes in the fridge for dinner. Easy.", image: "/how-it-works-4.png" },
];

const faqs = [
  { q: "How do I know the right portion for my dog?", a: "Our algorithm calculates the ideal daily portion based on your dog's breed, age, weight, body condition, and activity level. We adjust over time based on feedback." },
  { q: "What if my dog doesn't like the food?", a: "We offer a taste-test guarantee. If your dog doesn't love it, we'll work with you to find a recipe that works — or issue a full refund." },
  { q: "Can I pause or cancel anytime?", a: "Absolutely. No contracts, no lock-in. Pause, skip, or cancel from your dashboard at any time." },
];

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="w-full" style={{ padding: "5rem 0 6rem" }}>
          <div className="mx-auto max-w-[1320px] px-6 md:px-10">
            <div className="mx-auto max-w-[600px] text-center">
              <h1 className="headline-xl text-[clamp(2.4rem,5vw,4rem)] text-foreground">
                How Pupsy <em className="accent-italic">works.</em>
              </h1>
              <p className="mt-5 text-base text-muted-foreground md:text-lg">
                From quiz to bowl — here's how we build and deliver your dog's personalised meals.
              </p>
            </div>

            <div className="mt-20 space-y-0">
              {steps.map((s, i) => (
                <div key={s.num} className="relative mx-auto grid max-w-[900px] grid-cols-1 gap-12 md:grid-cols-[200px_1fr] items-center py-10">
                  {/* Step Art Marker */}
                  <div className="flex flex-col items-center">
                    <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-2 border-accent/20 bg-accent/5 p-8 overflow-hidden transition-all duration-500 hover:bg-accent/10 hover:shadow-xl">
                      <img src={s.image} alt={s.title} className="h-full w-full object-contain mix-multiply animate-in fade-in zoom-in duration-1000" />
                      <div className="absolute -left-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background shadow-lg">
                        {s.num}
                      </div>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="hidden h-32 w-px bg-gradient-to-b from-[var(--color-border)] to-transparent md:block mt-8" />
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Step {s.num}</div>
                    <h3 className="mt-3 font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-tight text-foreground">{s.title}</h3>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{s.body}</p>
                    
                    <div className="mt-8 flex items-center gap-4">
                      <div className="h-px flex-1 bg-[var(--color-border)]" />
                      <Icon name={s.icon as any} size={20} className="text-accent/40" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/get-started" className="btn-pill-primary">
                Take the quiz — 2 minutes
              </Link>
            </div>

            {/* FAQ section */}
            <div className="mx-auto mt-20 max-w-[700px]">
              <h2 className="text-center font-serif text-2xl text-foreground">Frequently asked</h2>
              <div className="mt-10 space-y-6">
                {faqs.map((f) => (
                  <div key={f.q} className="rounded-[16px] border border-[var(--color-border)] p-6">
                    <h3 className="font-serif text-base text-foreground">{f.q}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
