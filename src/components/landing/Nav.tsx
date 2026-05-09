"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Icon } from "@/components/ui/Icon";
// Trigger rebuild
const navLinks = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Our food", href: "/our-food" },
  { label: "Wellness", href: "/wellness" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setUserName(null);
        setLoading(false);
        return;
      }

      let name: string | null = null;

      // 1. Try customer_profiles table
      try {
        const { data: profile } = await supabase
          .from("customer_profiles")
          .select("first_name")
          .eq("user_id", user.id)
          .single();
        if (profile?.first_name) {
          name = profile.first_name;
        }
      } catch {
        // Table might not exist yet — that's okay
      }

      // 2. Fallback: OAuth metadata (e.g. Google)
      if (!name && user.user_metadata?.full_name) {
        name = user.user_metadata.full_name.split(" ")[0];
      }

      // 3. Fallback: email prefix
      if (!name && user.email) {
        name = user.email.split("@")[0];
      }

      // 4. Fallback: last 4 digits of phone
      if (!name && user.phone) {
        name = `••••${user.phone.slice(-4)}`;
      }

      // 5. Check localStorage for ownerName from quiz
      if (!name) {
        try {
          const saved = localStorage.getItem("pupsy_dog_profile");
          if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.ownerName) {
              name = parsed.ownerName;
            }
          }
        } catch {
          // ignore
        }
      }

      setUserName(name || "Friend");
    } catch {
      setUserName(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Initial fetch
    fetchUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setUserName(null);
        setLoading(false);
      } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED") {
        fetchUser();
      }
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      subscription.unsubscribe();
    };
  }, [fetchUser]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUserName(null);
      localStorage.removeItem("pupsy_dog_profile");
      localStorage.removeItem("pupsy_step");
    } catch {
      // ignore
    }
    window.location.href = "/";
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-[0_1px_0_var(--color-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-5 md:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/logov1.png" alt="Pupsy Logo" className="h-8 md:h-10 w-auto" />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 min-w-[150px] justify-end">
          {!loading ? (
            userName ? (
              <div className="flex items-center gap-3 animate-in fade-in duration-300">
                <Link href="/dashboard" className="text-sm font-medium text-foreground transition-colors hover:text-accent">
                  Welcome, {userName}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground underline underline-offset-4"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link href="/auth" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground animate-in fade-in duration-300">
                Log in
              </Link>
            )
          ) : (
            <div className="h-5 w-20 animate-pulse rounded bg-muted/20" />
          )}

          {/* Primary CTA */}
          <Link href="/get-started" className="btn-pill-dark hidden sm:inline-flex">
            Build your plan
          </Link>

          {/* Mobile hamburger */}
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(!open)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
            >
              {open ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="absolute left-0 top-full w-full border-t border-[var(--color-border)] bg-background/95 backdrop-blur-lg md:hidden">
          <div className="flex flex-col gap-1 px-6 py-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-foreground transition-colors hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
            <div className="my-4 border-t border-[var(--color-border)]" />
            {!loading ? (
              userName ? (
                <>
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="px-3 py-2 text-sm font-medium text-foreground">
                    Welcome, {userName}
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setOpen(false); }}
                    className="rounded-lg px-3 py-3 text-left text-base text-muted-foreground transition-colors hover:bg-muted"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link
                  href="/auth"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base text-foreground transition-colors hover:bg-muted"
                >
                  Log in
                </Link>
              )
            ) : (
              <div className="h-10 w-full animate-pulse rounded-lg bg-muted/20" />
            )}
            <Link
              href="/get-started"
              onClick={() => setOpen(false)}
              className="btn-pill-primary mt-2 w-full text-center"
            >
              Build your plan
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
