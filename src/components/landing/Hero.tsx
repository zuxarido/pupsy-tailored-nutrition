import dogImg from "@/assets/pupsy-dog.png";

export function Hero() {
  return (
    <section className="w-full">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 px-6 pb-16 pt-6 md:grid-cols-2 md:gap-12 md:px-10 md:pb-24 md:pt-8">
        {/* Left column */}
        <div className="flex flex-col justify-center">
          <span className="pill-badge w-fit">Freshly made &amp; delivered</span>

          <h1 className="headline-xl mt-7 text-[clamp(2.6rem,6vw,4.6rem)] text-foreground">
            Food as <em className="accent-italic">good</em> as your dog deserves.
          </h1>

          <p className="mt-6 max-w-[480px] text-base text-muted-foreground md:text-lg">
            Personalised fresh meals, portioned by breed, age, and activity. Built on data.
            Delivered to your door.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <a href="#plan" className="btn-pill-primary">
              Build your dog&rsquo;s plan
            </a>
            <a href="#how" className="link-ghost">
              See how it works
            </a>
          </div>
        </div>

        {/* Right column — hero panel */}
        <div className="relative min-h-[520px] overflow-hidden rounded-[28px] bg-[var(--color-hero-panel)] md:min-h-[620px]">
          {/* Dog illustration anchored to bottom */}
          <img
            src={dogImg}
            alt="A friendly illustrated dog mascot for Pupsy"
            width={896}
            height={1024}
            className="absolute bottom-0 left-1/2 w-[80%] max-w-[440px] -translate-x-1/2 select-none"
          />

          {/* Floating meal card */}
          <div
            className="absolute bottom-6 left-1/2 w-[88%] max-w-[340px] -translate-x-1/2 rounded-[16px] bg-white p-5"
            style={{ boxShadow: "0 18px 40px -18px rgba(59,42,26,0.25)" }}
          >
            <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Today&rsquo;s meal
            </div>
            <h3 className="mt-1.5 font-serif text-xl text-foreground">
              Chicken &amp; Brown Rice Bowl
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-[var(--color-tag-fresh-bg)] px-2.5 py-1 text-[11px] text-[var(--color-tag-fresh-fg)]">
                Fresh today
              </span>
              <span className="rounded-full bg-[var(--color-tag-portion-bg)] px-2.5 py-1 text-[11px] text-[var(--color-tag-portion-fg)]">
                Portioned
              </span>
              <span className="rounded-full bg-[var(--color-tag-vet-bg)] px-2.5 py-1 text-[11px] text-[var(--color-tag-vet-fg)]">
                Vet approved
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
