"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

type DogProfileRow = {
  id: string;
  name: string;
  breed: string | null;
  age_category: string | null;
  sex: string | null;
  weight_kg: number | null;
  activity_level: string | null;
  recommended_recipe: string | null;
  daily_grams: number | null;
  daily_price: number | null;
};

type SubscriptionRow = {
  id: string;
  plan_type: string;
  status: string;
  amount: number | null;
  created_at: string;
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<DogProfileRow[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionRow[]>([]);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profileData } = await supabase
          .from("dog_profiles")
          .select("*")
          .eq("user_id", user.id);
        setProfiles(profileData || []);

        const { data: subData } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", user.id);
        setSubscriptions(subData || []);
      }

      setLoading(false);
    };

    init();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <>
        <Nav />
        <main className="flex min-h-[60vh] items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </main>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Nav />
        <main className="flex min-h-[60vh] items-center justify-center px-6">
          <div className="text-center">
            <Icon name="paw" size={40} className="text-accent mx-auto" />
            <h1 className="headline-xl mt-4 text-2xl text-foreground">Sign in to view your dashboard</h1>
            <p className="mt-3 text-sm text-muted-foreground">You need an account to manage your dog&rsquo;s meal plan.</p>
            <Link href="/auth" className="btn-pill-primary mt-6 inline-block">
              Sign in
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main>
        <section className="w-full" style={{ padding: "3rem 0 6rem" }}>
          <div className="mx-auto max-w-[800px] px-6 md:px-10">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="headline-xl text-[clamp(1.8rem,4vw,2.8rem)] text-foreground">
                  Your Dashboard
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign out
              </button>
            </div>

            {/* Dog profiles */}
            <div className="mt-10">
              <h2 className="font-serif text-xl text-foreground">Dog Profiles</h2>
              {profiles.length === 0 ? (
                <div className="mt-4 rounded-[16px] border border-dashed border-[var(--color-border)] p-8 text-center">
                  <Icon name="paw" size={32} className="text-muted-foreground/40 mx-auto" />
                  <p className="mt-3 text-sm text-muted-foreground">No dog profiles yet.</p>
                  <Link href="/get-started" className="mt-4 inline-block text-sm text-accent underline underline-offset-4">
                    Take the quiz to create one
                  </Link>
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  {profiles.map((p) => (
                    <div key={p.id} className="rounded-[16px] border border-[var(--color-border)] p-6">
                      <div className="flex items-center gap-3">
                        <Icon name="dog" size={24} className="text-accent" />
                        <div>
                          <div className="font-serif text-lg text-foreground">{p.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {[p.breed, p.age_category, p.weight_kg ? `${p.weight_kg}kg` : null]
                              .filter(Boolean)
                              .join(" · ")}
                          </div>
                        </div>
                      </div>
                      {p.recommended_recipe && (
                        <div className="mt-4 flex items-center gap-4 rounded-[12px] bg-[var(--color-hero-panel)] p-4">
                          <div>
                            <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                              Recommended recipe
                            </div>
                            <div className="text-sm font-medium text-foreground">{p.recommended_recipe}</div>
                          </div>
                          {p.daily_grams && (
                            <div className="ml-auto text-right">
                              <div className="text-sm font-medium text-foreground">{p.daily_grams}g/day</div>
                              {p.daily_price && (
                                <div className="text-xs text-muted-foreground">&#x20B9;{p.daily_price}/day</div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Subscriptions */}
            <div className="mt-10">
              <h2 className="font-serif text-xl text-foreground">Subscriptions</h2>
              {subscriptions.length === 0 ? (
                <div className="mt-4 rounded-[16px] border border-dashed border-[var(--color-border)] p-8 text-center">
                  <Icon name="check" size={32} className="text-muted-foreground/40 mx-auto" />
                  <p className="mt-3 text-sm text-muted-foreground">No active subscriptions.</p>
                  <p className="mt-1 text-xs text-muted-foreground">Complete the quiz and subscribe to get started.</p>
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  {subscriptions.map((s) => (
                    <div key={s.id} className="flex items-center justify-between rounded-[16px] border border-[var(--color-border)] p-6">
                      <div>
                        <div className="text-sm font-medium text-foreground capitalize">{s.plan_type} Plan</div>
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          Started {new Date(s.created_at).toLocaleDateString("en-IN")}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`rounded-full px-3 py-1 text-[11px] font-medium ${
                          s.status === "active"
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}>
                          {s.status}
                        </span>
                        {s.amount && (
                          <div className="mt-1 text-xs text-muted-foreground">&#x20B9;{s.amount}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
