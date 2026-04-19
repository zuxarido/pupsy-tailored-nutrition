"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Nav } from "@/components/landing/Nav";
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [identifier, setIdentifier] = useState("");
  const [authStep, setAuthStep] = useState<1 | 2>(1); // 1: email/phone, 2: verify OTP
  const [otp, setOtp] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isEmail = (val: string) => val.includes("@");

  const handleIdentifierSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError("Please enter your email or mobile number.");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (isEmail(identifier)) {
        const { error } = await supabase.auth.signInWithOtp({
          email: identifier.trim(),
          options: { emailRedirectTo: `${window.location.origin}/get-started` },
        });
        if (error) throw error;
        setMessage("Magic link sent! Check your email inbox to sign in securely.");
      } else {
        const { error } = await supabase.auth.signInWithOtp({
          phone: identifier.replace(/\s+/g, ""),
        });
        if (error) throw error;
        setAuthStep(2);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) return;
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: identifier.replace(/\s+/g, ""),
        token: otp.trim(),
        type: "sms",
      });
      if (error) throw error;
      window.location.href = "/get-started";
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google") => {
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/get-started`,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "OAuth failed");
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <main>
        <section className="flex min-h-[80vh] items-center justify-center px-6" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
          <div className="w-full max-w-[420px]">
            <div className="text-center">
              <Icon name="paw" size={40} className="text-accent mx-auto" />
              <h1 className="headline-xl mt-4 text-[clamp(1.8rem,4vw,2.6rem)] text-foreground">
                {authStep === 2 ? "Verify your number" : mode === "login" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                {authStep === 2 
                  ? `We sent a 6-digit code to ${identifier}` 
                  : mode === "login"
                  ? "Sign in to manage your dog's meal plan."
                  : "Sign up to save your dog's profile and start their plan."}
              </p>
            </div>

            {authStep === 1 ? (
              <form onSubmit={handleIdentifierSubmit} className="mt-8 flex flex-col gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Email or Mobile Number
                  </label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="you@example.com or +919876543210"
                    className="w-full rounded-xl border border-[var(--color-input)] bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <p className="mt-2 text-[11px] text-muted-foreground">Include country code for mobile (e.g. +91)</p>
                </div>

                {error && (
                  <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
                )}
                {message && (
                  <div className="rounded-lg bg-green-50 px-4 py-3 border border-green-100">
                    <p className="text-sm font-medium text-green-800">{message}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !!message}
                  className="btn-pill-primary mt-2 w-full disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Continue"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="mt-8 flex flex-col gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    6-Digit Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    className="w-full rounded-xl border border-[var(--color-input)] bg-background px-4 py-3 text-center tracking-widest text-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                {error && (
                  <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || otp.length < 6}
                  className="btn-pill-primary mt-2 w-full disabled:opacity-60"
                >
                  {loading ? "Verifying..." : "Verify Code"}
                </button>
                
                <button
                  type="button"
                  onClick={() => setAuthStep(1)}
                  className="mt-2 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  Use a different number or email
                </button>
              </form>
            )}

            {authStep === 1 && (
              <>
                <div className="my-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-[var(--color-border)]" />
                  <span className="text-xs text-muted-foreground">or continue with</span>
                  <div className="h-px flex-1 bg-[var(--color-border)]" />
                </div>

                <button
                  onClick={() => handleOAuth("google")}
                  disabled={loading}
                  className="mb-4 flex w-full items-center justify-center gap-3 rounded-xl border border-[var(--color-border)] bg-background px-4 py-3 text-sm text-foreground transition-colors hover:bg-accent/5 disabled:opacity-60"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>

                {/* Toggle */}
                <p className="mt-8 text-center text-sm text-muted-foreground">
                  {mode === "login" ? (
                    <>
                      Don&rsquo;t have an account?{" "}
                      <button onClick={() => setMode("signup")} className="text-accent font-medium hover:underline underline-offset-4 hover:text-accent/80">
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button onClick={() => setMode("login")} className="text-accent font-medium hover:underline underline-offset-4 hover:text-accent/80">
                        Sign in
                      </button>
                    </>
                  )}
                </p>

                <div className="mt-6 text-center">
                  <Link href="/get-started" className="text-xs text-muted-foreground font-medium underline underline-offset-4 hover:text-foreground">
                    Skip for now — take the quiz first
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
