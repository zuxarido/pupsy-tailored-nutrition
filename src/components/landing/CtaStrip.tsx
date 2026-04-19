import Link from "next/link";

export function CtaStrip() {
  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "var(--color-accent)",
        padding: "5rem 0",
      }}
    >
      <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-8 px-6 text-center md:px-10">
        <h2
          className="headline-xl max-w-[600px] text-[clamp(2rem,4.6vw,3.2rem)]"
          style={{ color: "white" }}
        >
          Your dog deserves better.{" "}
          <em style={{ fontStyle: "italic", opacity: 0.9 }}>Start today.</em>
        </h2>

        <p className="max-w-[480px] text-base" style={{ color: "rgba(255,255,255,0.8)" }}>
          It takes 2 minutes to build a plan. No commitment — pause or cancel anytime.
        </p>

        <Link
          href="/get-started"
          className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-medium transition-transform hover:scale-[1.03]"
          style={{ color: "var(--color-accent)" }}
        >
          Build your dog's plan →
        </Link>
      </div>
    </section>
  );
}
