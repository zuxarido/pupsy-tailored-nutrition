import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";

const steps = [
  { num: "01", icon: "clipboard", title: "Take the quiz", body: "Answer a quick 2-minute questionnaire about your dog's breed, age, weight, activity level, and any health conditions." },
  { num: "02", icon: "plan", title: "We design their plan", body: "Our vet-formulated algorithm creates a personalised feeding plan — the right recipe, the right portion, every single day." },
  { num: "03", icon: "cook", title: "Cooked fresh every morning", body: "Each day, your dog's meals are cooked in our FSSAI-licensed kitchen using real, human-grade ingredients. No preservatives. No fillers." },
  { num: "04", icon: "door", title: "Delivered to your door", body: "Two pre-portioned packs arrive every morning — one for breakfast, one goes in the fridge for dinner. Easy." },
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

            <div className="mt-16 space-y-0">
              {steps.map((s, i) => (
                <div key={s.num} className="relative mx-auto grid max-w-[800px] grid-cols-1 gap-6 md:grid-cols-[60px_1fr]">
                  {/* Step marker */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-accent/10">
                      <Icon name={s.icon} size={26} className="text-accent" />
                    </div>
                    {i < steps.length - 1 && (
                      <div className="hidden h-full w-px bg-[var(--color-border)] md:block" />
                    )}
                  </div>
                  <div className="pb-12">
                    <div className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Step {s.num}</div>
                    <h3 className="mt-2 font-serif text-2xl text-foreground">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
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
