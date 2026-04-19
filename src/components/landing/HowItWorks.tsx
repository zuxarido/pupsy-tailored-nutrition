import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

type Step = {
  num: string;
  icon: string;
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    num: "01",
    icon: "clipboard",
    title: "Tell us about your dog",
    body: "Breed, age, weight, activity level — a 2-minute questionnaire so we know exactly what your dog needs.",
  },
  {
    num: "02",
    icon: "cook",
    title: "We cook fresh every morning",
    body: "Our kitchen prepares your dog's meal each morning using vet-formulated recipes and real, whole ingredients.",
  },
  {
    num: "03",
    icon: "door",
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
        <div className="card-container mt-14 grid grid-cols-1 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className={`flex flex-col p-7 md:p-9 ${
                i > 0
                  ? "border-t border-[var(--color-border)] md:border-t-0 md:border-l"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon name={s.icon} size={24} className="text-accent" />
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Step {s.num}
                </span>
              </div>

              <h3 className="mt-6 font-serif text-xl text-foreground">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-[1.7] text-muted-foreground">
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
