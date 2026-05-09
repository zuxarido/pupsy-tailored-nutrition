"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { supabase } from "@/lib/supabase";

const trustItems = [
  { icon: "vet", label: "Vet-Formulated" },
  { icon: "sunrise", label: "Fresh Every Morning" },
  { icon: "no-preservatives", label: "No Preservatives" },
  { icon: "scale", label: "Portioned for Your Dog" },
];

export function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
       if (event === "SIGNED_OUT") setIsLoggedIn(false);
       if (event === "SIGNED_IN") setIsLoggedIn(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <section className="w-full">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 px-6 pb-10 pt-6 md:grid-cols-2 md:gap-12 md:px-10 md:pb-24 md:pt-8">
        {/* Left column */}
        <div className="flex flex-col justify-center">
          <span className="pill-badge w-fit">Freshly made &amp; delivered</span>

          <h1 className="headline-xl mt-7 text-[clamp(2.6rem,6vw,4.6rem)] text-foreground">
            Real food. Cooked <em className="accent-italic">fresh.</em> At your
            door every morning.
          </h1>

          <p className="mt-6 max-w-[480px] text-base text-muted-foreground md:text-lg">
            Personalised daily meals for your dog — delivered like a dabbawala,
            every single day. Built on data. Portioned to the gram.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Link href="/get-started" className="btn-pill-primary">
              Get your free trial meal today
            </Link>

            {!loading && (
              isLoggedIn ? (
                <Link href="/dashboard" className="link-ghost font-medium">
                  Go to Dashboard
                </Link>
              ) : (
                <Link href="/auth" className="link-ghost font-medium">
                  Log in
                </Link>
              )
            )}

            <Link href="/wellness" className="text-sm font-medium text-accent hover:underline">
              Wellness Tracker
            </Link>
          </div>
        </div>

        {/* Right column — hero panel */}
        <div className="relative min-h-[520px] overflow-hidden rounded-[28px] bg-[var(--color-hero-panel)] md:min-h-[620px]">
          {/* Dog illustration */}
          <Image
            src="/pupsy-dog.png"
            alt="A friendly illustrated dog mascot for Pupsy"
            width={896}
            height={1024}
            className="absolute bottom-0 left-1/2 w-[80%] max-w-[440px] -translate-x-1/2 select-none mix-multiply"
            priority
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

      {/* Trust bar */}
      <div className="border-t border-[var(--color-border)]">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-center gap-8 px-6 py-5 md:justify-between md:px-10">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2.5 text-sm text-muted-foreground"
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
