import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { WhyPupsy } from "@/components/landing/WhyPupsy";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <HowItWorks />
      <WhyPupsy />
      <footer className="border-t border-[var(--color-border)] py-10">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-4 px-6 md:flex-row md:items-center md:px-10">
          <div className="font-serif text-xl text-foreground">
            Pupsy<span className="text-accent">.</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Made with care in Bengaluru · Mumbai · Delhi
          </div>
        </div>
      </footer>
    </main>
  );
}
