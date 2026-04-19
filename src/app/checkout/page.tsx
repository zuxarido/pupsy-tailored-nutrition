"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Icon } from "@/components/ui/Icon";
import { PlanSelector } from "@/components/checkout/PlanSelector";
import { RazorpayButton } from "@/components/checkout/RazorpayButton";
import type { DogProfile } from "@/types/dog-profile";
import type { User } from "@supabase/supabase-js";

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<DogProfile | null>(null);
  const [user, setUser] = useState<User | null>(null);
  
  // Pricing/plan state
  const [dailyPrice, setDailyPrice] = useState(150); // fallback
  const [selectedPlan, setSelectedPlan] = useState<string>("monthly");
  
  // Auth state for inline login (Email or Phone)
  const [identifier, setIdentifier] = useState("");
  const [authStep, setAuthStep] = useState<1 | 2>(1);
  const [otp, setOtp] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState("");

  const isEmail = (val: string) => val.includes("@");

  useEffect(() => {
    const init = async () => {
      // 1. Get profile from localStorage
      const raw = localStorage.getItem("pupsy_dog_profile");
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          setProfile(parsed);
          
          // Calculate arbitrary price based on weight
          const w = parseFloat(parsed.weight) || 15;
          const portion = Math.round((30 * w + 70) / 1.5);
          const rawPrice = Math.round(portion * 0.55);
          setDailyPrice(Math.max(99, Math.min(299, rawPrice)));
        } catch (e) {}
      }

      // 2. Get user session
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        setIdentifier(user.email || user.phone || "");
      }
      
      setLoading(false);
    };
    init();

    // Listen for auth state changes if they complete magic link in same browser
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleIdentifierSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    setAuthLoading(true);
    setAuthMessage("");
    
    try {
      if (isEmail(identifier)) {
        const { error } = await supabase.auth.signInWithOtp({
          email: identifier.trim(),
          options: { emailRedirectTo: `${window.location.origin}/checkout` },
        });
        if (error) throw error;
        setAuthMessage("Check your email for the secure link!");
      } else {
        const { error } = await supabase.auth.signInWithOtp({
          phone: identifier.replace(/\s+/g, ""),
        });
        if (error) throw error;
        setAuthStep(2);
      }
    } catch (err: any) {
      setAuthMessage(err.message || "Failed to send code");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) return;
    setAuthLoading(true);
    setAuthMessage("");

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: identifier.trim(),
        token: otp.trim(),
        type: "sms",
      });
      if (error) throw error;
      
      // Successfully logged in
      setUser(data.user);
      setAuthStep(1);
    } catch (err: any) {
      setAuthMessage(err.message || "Invalid or expired code");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleOAuth = async (provider: "google") => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/checkout`,
        },
      });
      if (error) throw error;
    } catch (err) {
      alert("Failed to authenticate with Google");
    }
  };

  const handlePaymentSuccess = async (paymentData: any) => {
    try {
      setLoading(true);
      // 1. Save dog profile to Supabase if missing
      let dogProfileId = null;
      if (user && profile) {
        const { data: profileInsert, error: profileErr } = await supabase
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
          })
          .select("id")
          .single();
          
        if (!profileErr && profileInsert) {
          dogProfileId = profileInsert.id;
        }
      }

      // 2. Verify payment on server
      await fetch("/api/razorpay/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...paymentData,
          userId: user?.id,
          dogProfileId,
          planType: selectedPlan,
          amount: dailyPrice * (selectedPlan === "monthly" ? 30 : selectedPlan === "quarterly" ? 90 : 7),
        }),
      });

      // Clear local storage and redirect to dashboard
      localStorage.removeItem("pupsy_dog_profile");
      localStorage.removeItem("pupsy_step");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Payment verified, but failed to save profile. Please contact support.");
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
  let days = 30;
  let multiplier = 0.9;
  if (selectedPlan === "weekly") { days = 7; multiplier = 1; }
  if (selectedPlan === "quarterly") { days = 90; multiplier = 0.8; }
  const totalAmount = Math.round(dailyPrice * multiplier) * days;

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
                    <p className="text-sm text-muted-foreground mb-4">Log in or create an account to save '{profile?.name}'s profile and manage your subscription.</p>
                    
                    {authStep === 1 ? (
                      <form onSubmit={handleIdentifierSubmit} className="flex flex-col sm:flex-row gap-3">
                        <input 
                          type="text" 
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          placeholder="Email or mobile number (+91...)"
                          required
                          className="flex-1 rounded-xl border border-[var(--color-input)] bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <button 
                          type="submit" 
                          disabled={authLoading}
                          className="rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
                        >
                          {authLoading ? "Sending..." : "Continue"}
                        </button>
                      </form>
                    ) : (
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">We sent a 6-digit code to {identifier}.</p>
                        <form onSubmit={handleVerifyOtp} className="flex flex-col sm:flex-row gap-3">
                          <input 
                            type="text" 
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="123456"
                            required
                            className="w-[120px] rounded-xl border border-[var(--color-input)] bg-background px-4 py-3 text-center tracking-widest text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                          />
                          <button 
                            type="submit" 
                            disabled={authLoading || otp.length < 6}
                            className="rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
                          >
                            {authLoading ? "Verifying..." : "Verify"}
                          </button>
                        </form>
                        <button 
                          onClick={() => setAuthStep(1)} 
                          className="mt-3 text-[11px] underline text-muted-foreground hover:text-foreground"
                        >
                          Change number
                        </button>
                      </div>
                    )}

                    {authMessage && (
                      <p className={`mt-3 text-xs font-medium ${authMessage.includes("Invalid") ? "text-red-500" : "text-accent"}`}>{authMessage}</p>
                    )}

                    {authStep === 1 && (
                      <>
                        <div className="my-6 flex items-center gap-4">
                          <div className="h-px flex-1 bg-[var(--color-border)]" />
                          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">or continue with</span>
                          <div className="h-px flex-1 bg-[var(--color-border)]" />
                        </div>

                        <button
                          onClick={() => handleOAuth("google")}
                          className="flex w-full items-center justify-center gap-3 rounded-xl border border-[var(--color-border)] bg-background px-4 py-3 text-sm text-foreground transition-colors hover:bg-accent/5"
                        >
                          <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                          Google
                        </button>
                      </>
                    )}
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
                  dailyPrice={dailyPrice} 
                  selectedPlan={selectedPlan} 
                  onSelect={setSelectedPlan} 
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
                    <RazorpayButton 
                      amount={totalAmount} 
                      planType={selectedPlan} 
                      dogName={profile?.name || "dog"} 
                      userEmail={user.email || undefined} 
                      onSuccess={handlePaymentSuccess} 
                      onFailure={(err) => alert(err)} 
                    />
                  </div>
                )}
                
                <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                  <Icon name="lock" size={12} />
                  Secure payment via Razorpay
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
