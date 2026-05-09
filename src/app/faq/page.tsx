"use client";

import { useState } from "react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";

const categories = ["All", "Product", "Delivery", "Pricing", "Health"];

const faqs = [
  { q: "What is Pupsy?", a: "Pupsy is a fresh dog food delivery service. We cook personalised, vet-formulated meals for your dog every morning and deliver them to your door.", cat: "Product" },
  { q: "How is this different from regular dog food?", a: "Unlike kibble that is processed at extreme heat and sits on shelves for months, Pupsy meals are cooked fresh daily with real, human-grade ingredients — no preservatives, no fillers.", cat: "Product" },
  { q: "How do you know what to feed my dog?", a: "You take a 2-minute quiz about your dog's breed, age, weight, activity level, and health conditions. Our algorithm creates a personalised plan.", cat: "Product" },
  { q: "Is the food vet-approved?", a: "Yes. Every recipe is formulated by certified veterinary nutritionists and meets AAFCO guidelines for complete and balanced nutrition.", cat: "Health" },
  { q: "What ingredients do you use?", a: "Human-grade chicken, lamb, mutton, eggs, brown rice, lentils, vegetables, and superfoods like turmeric. No by-products, no fillers.", cat: "Product" },
  { q: "My dog has allergies. Can you accommodate that?", a: "Absolutely. Our quiz captures allergies and we'll recommend recipes that avoid your dog's triggers.", cat: "Health" },
  { q: "How is the food delivered?", a: "Every morning, your dog's meals arrive in insulated packaging — two pre-portioned packs (breakfast + dinner).", cat: "Delivery" },
  { q: "Do I need to refrigerate the food?", a: "Yes — the dinner pack should go in the fridge immediately. It stays fresh for up to 48 hours refrigerated.", cat: "Delivery" },
  { q: "Which cities do you deliver to?", a: "We currently deliver across Mumbai, Bengaluru, Delhi NCR, Pune, and Hyderabad. More cities coming soon.", cat: "Delivery" },
  { q: "What time does the delivery arrive?", a: "Between 6am and 9am, before your dog's breakfast time.", cat: "Delivery" },
  { q: "How much does it cost?", a: "It depends on your dog's size and needs, typically between ₹99–₹299/day. The quiz gives you an exact price.", cat: "Pricing" },
  { q: "Is there a subscription or contract?", a: "No contracts. You can pause, skip, or cancel anytime from your dashboard.", cat: "Pricing" },
  { q: "Can I change recipes?", a: "Yes, you can switch recipes or adjust your plan at any time through your account.", cat: "Product" },
  { q: "Is the food suitable for puppies?", a: "Yes. We adjust recipes and portions for puppies, adults, and seniors. Just select the right life stage in the quiz.", cat: "Health" },
  { q: "What if my dog doesn't like it?", a: "We offer a taste-test guarantee. If your dog doesn't love it, we'll work with you or issue a full refund.", cat: "Pricing" },
  { q: "How is the food packaged?", a: "Each meal comes in a sealed, BPA-free container inside an insulated bag to maintain freshness.", cat: "Delivery" },
  { q: "Can I feed Pupsy alongside kibble?", a: "Yes — many parents transition gradually. You can mix Pupsy with your dog's current food during the transition.", cat: "Health" },
  { q: "Is the kitchen facility certified?", a: "Yes. Our kitchen is a state-of-the-art commercial facility that follows strict food safety protocols.", cat: "Product" },
  { q: "Do you offer treats or supplements?", a: "Not yet — but we're working on it. For now, we're focused on perfecting daily meals.", cat: "Product" },
  { q: "How do I contact support?", a: "You can reach us at hello@pupsy.in or through the contact page. We respond within 24 hours.", cat: "Pricing" },
];

export default function FaqPage() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  const filtered = faqs.filter((f) => {
    const matchesCat = activeCat === "All" || f.cat === activeCat;
    const matchesSearch = !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <Nav />
      <main>
        <section className="w-full" style={{ padding: "5rem 0 6rem" }}>
          <div className="mx-auto max-w-[800px] px-6 md:px-10">
            <div className="text-center">
              <h1 className="headline-xl text-[clamp(2.4rem,5vw,4rem)] text-foreground">
                Frequently asked <em className="accent-italic">questions.</em>
              </h1>
              <p className="mt-5 text-base text-muted-foreground">
                Everything you need to know about Pupsy.
              </p>
            </div>

            {/* Search */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions…"
              className="mt-10 w-full rounded-2xl border border-[var(--color-input)] bg-background px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
            />

            {/* Category filter */}
            <div className="mt-5 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`rounded-full border px-4 py-2 text-sm transition-all ${
                    activeCat === cat
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-[var(--color-border)] text-muted-foreground hover:border-accent/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* FAQ list */}
            <div className="mt-8 space-y-4">
              {filtered.map((f) => (
                <div key={f.q} className="rounded-[16px] border border-[var(--color-border)] p-6">
                  <h3 className="font-serif text-base text-foreground">{f.q}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="mt-8 text-center text-sm text-muted-foreground">No matching questions found.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
