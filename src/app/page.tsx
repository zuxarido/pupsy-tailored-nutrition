import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { TheProblem } from "@/components/landing/TheProblem";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FreshnessStory } from "@/components/landing/FreshnessStory";
import { RecipeTease } from "@/components/landing/RecipeTease";
import { WhyPupsy } from "@/components/landing/WhyPupsy";
import { Testimonials } from "@/components/landing/Testimonials";
import { CtaStrip } from "@/components/landing/CtaStrip";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <TheProblem />
      <HowItWorks />
      <FreshnessStory />
      <RecipeTease />
      <WhyPupsy />
      <Testimonials />
      <CtaStrip />
      <Footer />
    </>
  );
}
