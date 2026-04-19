"use client";

import { useState } from "react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Icon } from "@/components/ui/Icon";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Nav />
      <main>
        <section className="w-full" style={{ padding: "5rem 0 6rem" }}>
          <div className="mx-auto max-w-[1000px] px-6 md:px-10">
            <div className="mx-auto max-w-[600px] text-center">
              <h1 className="headline-xl text-[clamp(2.4rem,5vw,4rem)] text-foreground">
                Get in <em className="accent-italic">touch.</em>
              </h1>
              <p className="mt-5 text-base text-muted-foreground">
                Have a question, feedback, or just want to say hello? We&rsquo;d love to hear from you.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-[1fr_300px]">
              {/* Form */}
              <div className="card-container p-8">
                {submitted ? (
                  <div className="py-12 text-center">
                    <Icon name="envelope" size={40} className="text-accent mx-auto" />
                    <h2 className="mt-4 font-serif text-2xl text-foreground">Message sent!</h2>
                    <p className="mt-3 text-sm text-muted-foreground">We&rsquo;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Your name</label>
                      <input type="text" required placeholder="e.g. Priya" className="w-full rounded-xl border border-[var(--color-input)] bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Email</label>
                      <input type="email" required placeholder="you@example.com" className="w-full rounded-xl border border-[var(--color-input)] bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Message</label>
                      <textarea required rows={5} placeholder="Tell us what's on your mind…" className="w-full resize-none rounded-xl border border-[var(--color-input)] bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                    <button type="submit" className="btn-pill-primary mt-2 w-full">
                      Send message
                    </button>
                  </form>
                )}
              </div>

              {/* Contact sidebar */}
              <div className="flex flex-col gap-6">
                <div className="rounded-[16px] bg-[var(--color-hero-panel)] p-6">
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Email</div>
                  <a href="mailto:hello@pupsy.in" className="mt-2 block text-sm text-foreground hover:text-accent">hello@pupsy.in</a>
                </div>
                <div className="rounded-[16px] bg-[var(--color-hero-panel)] p-6">
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Phone</div>
                  <a href="tel:+918888888888" className="mt-2 block text-sm text-foreground hover:text-accent">+91 88888 88888</a>
                </div>
                <div className="rounded-[16px] bg-[var(--color-hero-panel)] p-6">
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Hours</div>
                  <p className="mt-2 text-sm text-foreground">Mon–Sat: 9am–7pm IST</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
