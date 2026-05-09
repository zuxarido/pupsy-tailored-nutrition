import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

type Step = {
  num: string;
  icon: string;
  title: string;
  body: string;
};

const steps: (Step & { image: string })[] = [
  {
    num: "01",
    icon: "clipboard",
    image: "/how-it-works-1.png",
    title: "Tell us about your dog",
    body: "Breed, age, weight, activity level — a 2-minute questionnaire so we know exactly what your dog needs.",
  },
  {
    num: "02",
    icon: "cook",
    image: "/how-it-works-3.png",
    title: "We cook fresh every morning",
    body: "Our kitchen prepares your dog's meal each morning using vet-formulated recipes and real, whole ingredients.",
  },
  {
    num: "03",
    icon: "door",
    image: "/how-it-works-4.png",
    title: "Delivered to your door",
    body: "Two pre-portioned packs arrive each morning — one for breakfast, one goes in the fridge for dinner.",
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
        {/* Header */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <h2 className="headline-xl text-[clamp(2.2rem,4.6vw,3.6rem)] text-foreground">
            Built around your <em className="accent-italic">dog,</em> not a
            shelf.
          </h2>
          <p className="max-w-[480px] self-end text-base text-muted-foreground md:text-lg">
            Most pet food is made for the average dog. There is no average dog.
            Pupsy builds a feeding plan specific to yours.
          </p>
        </div>

        {/* 3-step strip */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="group flex flex-col items-center text-center p-8 rounded-[32px] border border-[var(--color-border)] bg-background transition-all hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="relative mb-8 flex h-44 w-44 items-center justify-center rounded-full border-2 border-accent/10 bg-accent/5 p-8 overflow-hidden">
                <img 
                  src={s.image} 
                  alt={s.title} 
                  className="h-full w-full object-contain mix-multiply transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background shadow-md">
                  {s.num}
                </div>
              </div>

              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                Step {s.num}
              </div>
              <h3 className="mt-3 font-serif text-xl text-foreground">
                {s.title}
              </h3>
              <p className="mt-4 text-sm leading-[1.7] text-muted-foreground">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link href="/get-started" className="btn-pill-primary">
            Get started — it takes 2 minutes
          </Link>
        </div>
      </div>
    </section>
  );
}
