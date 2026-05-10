"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Icon } from "@/components/ui/Icon";
import { AuthForm } from "@/components/ui/AuthForm";
import { PlanSelector } from "@/components/checkout/PlanSelector";
import type { DogProfile } from "@/types/dog-profile";
import type { User } from "@supabase/supabase-js";
import { getPricing } from "@/lib/pricing";
import { calculateDailyCalories, calculateDailyPortion } from "@/lib/nutrition";
export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<DogProfile | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Pricing/plan state
  const [dailyGrams, setDailyGrams] = useState(500);
  const [selectedPlan, setSelectedPlan] = useState<string>("monthly");
  const [planType, setPlanType] = useState<"full" | "half">("full");

  useEffect(() => {
    const init = async () => {
      // 1. Get profile from localStorage
      const raw = localStorage.getItem("pupsy_dog_profile");
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as DogProfile;
          setProfile(parsed);
          const weightKg = parseFloat(parsed.weight) || 15;
          const grams = parsed.dailyGrams || calculateDailyPortion(
            calculateDailyCalories(weightKg, parsed.activity),
            149, // default to Chicken & Rice kcal/100g
          );
          setDailyGrams(Math.min(800, grams));
        } catch {
          // ignore malformed localStorage
        }
      }

      // 2. Get user session
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    init();

    // Listen for auth state changes (e.g. magic link opened in same browser tab)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) setUser(session.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleOrderViaWhatsApp = async () => {
    try {
      setLoading(true);
      
      // 1. Save dog profile to Supabase if missing
      if (user && profile) {
        let dailyPrice = pricing.daily;
        if (selectedPlan === "weekly") dailyPrice = pricing.weekly / 7;
        else if (selectedPlan === "monthly") dailyPrice = pricing.monthly / 30;

        const { error: profileErr } = await supabase
          .from("dog_profiles")
          .insert({
            user_id: user.id,
            name: profile.name,
            breed: profile.breed,
            age_category: profile.age,
            sex: profile.sex,
            weight_kg: parseFloat(profile.weight),
            activity_level: profile.activity,
            health_conditions: profile.healthConditions || [],
            current_food: profile.currentFood,
            daily_price: dailyPrice,
            recommended_recipe: profile.recommendedRecipe || "Chicken & Rice",
            daily_grams: dailyGrams,
          })
          .select("id")
          .single();
      }

      // Clear local storage
      localStorage.removeItem("pupsy_dog_profile");
      localStorage.removeItem("pupsy_step");
      
      // Redirect to WhatsApp
      const recipe = profile?.recommendedRecipe || "Chicken & Rice";
      const waMessage = `Hi! I would like to place an order for my dog ${profile?.name || "dog"}.\n\nRecipe: ${recipe}\nDaily Portion: ${dailyGrams}g\nPlan Selected: ${selectedPlan}\nPrice: ₹${totalAmount.toLocaleString("en-IN")}`;
      const waUrl = `https://wa.me/919811808217?text=${encodeURIComponent(waMessage)}`;
      
      window.location.href = waUrl;
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Failed to save profile. Please try again or contact support.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground animate-pulse">Loading checkout...</p>
      </div>
    );
  }

  if (!profile && !user) {
    return (
      <>
        <Nav />
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
          <Icon name="paw" size={40} className="text-muted-foreground mx-auto" />
          <h1 className="headline-xl mt-4 text-2xl text-foreground">No plan found</h1>
          <p className="mt-2 text-sm text-muted-foreground">Take the quiz to generate a meal plan first.</p>
          <button onClick={() => router.push("/get-started")} className="btn-pill-primary mt-6">
            Take the Quiz
          </button>
        </main>
      </>
    );
  }

  // Calculate final amount based on selection
  const pricingData = getPricing(dailyGrams);
  const pricing = planType === "full" ? pricingData.full : pricingData.half;
  
  let totalAmount = pricing.monthly;
  if (selectedPlan === "weekly") totalAmount = pricing.weekly;
  else if (selectedPlan === "daily") totalAmount = pricing.daily;

  return (
    <>
      <Nav />
      <main className="bg-muted/30">
        <section className="mx-auto max-w-[1000px] px-6 py-12 md:px-10 lg:py-20">
          <div className="mb-10">
            <h1 className="headline-xl text-[clamp(2rem,4vw,3rem)] text-foreground">Checkout</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Finalise '{profile?.name || "your dog"}'s customised meal plan.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px]">
            <div className="flex flex-col gap-8">
              
              {/* Step 1: Account */}
              <div className="rounded-[20px] bg-background p-6 shadow-sm border border-[var(--color-border)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white font-serif text-sm">1</div>
                  <h2 className="font-serif text-xl text-foreground">Your Account</h2>
                </div>
                
                {user ? (
                  <div className="flex items-center justify-between rounded-[12px] bg-green-50 p-4 border border-green-100">
                    <div>
                      <div className="text-sm font-medium text-green-900">Signed in securely</div>
                      <div className="text-xs text-green-700 mt-0.5">{user.phone || user.email}</div>
                    </div>
                    <Icon name="check" size={24} className="text-green-600" />
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Log in or create an account to save &lsquo;{profile?.name}&rsquo;s profile and manage your subscription.
                    </p>
                    <AuthForm
                      redirectTo="/checkout"
                      onSuccess={() => window.location.reload()}
                    />
                  </div>
                )}
              </div>

              {/* Step 2: Plan Selection */}
              <div className="rounded-[20px] bg-background p-6 shadow-sm border border-[var(--color-border)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white font-serif text-sm">2</div>
                  <h2 className="font-serif text-xl text-foreground">Subscription Plan</h2>
                </div>
                
                <PlanSelector 
                  dailyGrams={dailyGrams} 
                  selectedPlan={selectedPlan} 
                  onSelect={setSelectedPlan}
                  planType={planType}
                  onTypeChange={setPlanType}
                />
              </div>

            </div>

            {/* Sidebar Summary */}
            <div>
              <div className="sticky top-24 rounded-[20px] bg-background p-6 shadow-sm border border-[var(--color-border)]">
                <h3 className="font-serif text-lg text-foreground border-b border-[var(--color-border)] pb-4 mb-4">Order Summary</h3>
                
                <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Dog Profile</span>
                    <span className="font-medium text-foreground">{profile?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Plan Duration</span>
                    <span className="font-medium text-foreground capitalize">{selectedPlan}</span>
                  </div>
                  <div className="flex justify-between mt-2 pt-4 border-t border-[var(--color-border)]">
                    <span className="font-medium text-foreground">Total Due</span>
                    <span className="font-serif text-xl text-foreground">&#x20B9;{totalAmount.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {!user && (
                   <p className="mt-6 text-xs text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
                     Please sign in with your email or phone number above before continuing to payment.
                   </p>
                )}

                {user && (
                  <div className="mt-6">
                    <button
                      onClick={handleOrderViaWhatsApp}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-4 text-base font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                    >
                      <Icon name="message" size={20} />
                      Get your trial meal free
                    </button>
                  </div>
                )}
                
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[var(--color-border)] pt-6">
                  <div className="flex flex-col items-center text-center gap-1.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600">
                      <Icon name="check" size={16} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">100% Fresh</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <Icon name="vet" size={16} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">Vet Approved</span>
                  </div>
                </div>

                <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                  <Icon name="lock" size={12} />
                  Your information is saved securely
                </p>

                <div className="mt-6 rounded-xl bg-accent/5 p-4 border border-accent/10">
                  <p className="text-[11px] leading-relaxed text-accent font-medium text-center italic">
                    "100% money-back guarantee if they don't lick the bowl clean."
                  </p>
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
