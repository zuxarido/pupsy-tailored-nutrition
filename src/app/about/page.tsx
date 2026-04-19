import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Icon } from "@/components/ui/Icon";

const values = [
  { icon: "microscope", title: "Data-driven", desc: "Every meal is calculated by breed, age, weight, and activity. Not guesswork." },
  { icon: "transparency", title: "Transparent", desc: "We tell you exactly what goes in — every ingredient, every gram." },
  { icon: "paw", title: "Dog-first", desc: "We build for dogs, not shelves. Every decision starts with what's best for your dog." },
  { icon: "handshake", title: "Honest", desc: "No lock-ins, no gimmicks. If it doesn't work, we'll make it right." },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="w-full" style={{ padding: "5rem 0 6rem" }}>
          <div className="mx-auto max-w-[800px] px-6 md:px-10">
            <div className="text-center">
              <h1 className="headline-xl text-[clamp(2.4rem,5vw,4rem)] text-foreground">
                About <em className="accent-italic">Pupsy.</em>
              </h1>
              <p className="mt-5 text-base text-muted-foreground md:text-lg">
                We started Pupsy because we couldn&rsquo;t find fresh, personalised dog food in India.
              </p>
            </div>

            {/* Founder story */}
            <div className="mt-14 rounded-[20px] bg-[var(--color-hero-panel)] p-8 md:p-12">
              <h2 className="font-serif text-2xl text-foreground">Our story</h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  It started with a simple realisation: our dogs deserve better than processed kibble that sits on a shelf for months. When we looked at what was available in India, the options were limited — mass-produced, one-size-fits-all, and full of ingredients we couldn&rsquo;t recognise.
                </p>
                <p>
                  We built Pupsy to change that. Every meal is cooked fresh each morning, personalised to your dog&rsquo;s breed, age, weight, and health conditions, and delivered to your door before breakfast.
                </p>
                <p>
                  Our mission is simple: <strong className="text-foreground">make real, fresh food accessible to every dog in India.</strong>
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="mt-14">
              <h2 className="text-center font-serif text-2xl text-foreground">What we believe</h2>
              <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {values.map((v) => (
                  <div key={v.title} className="rounded-[16px] border border-[var(--color-border)] p-6">
                    <Icon name={v.icon} size={28} className="text-accent" />
                    <h3 className="mt-3 font-serif text-lg text-foreground">{v.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
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
