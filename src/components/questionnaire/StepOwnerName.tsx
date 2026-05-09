"use client";

import { useState } from "react";
import type { DogProfile } from "@/types/dog-profile";

type Props = {
  profile: DogProfile;
  update: (patch: Partial<DogProfile>) => void;
  next: () => void;
};

export function StepOwnerName({ profile, update, next }: Props) {
  const [localName, setLocalName] = useState(profile.ownerName || "");

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = localName.trim();
    if (!trimmedName) return;

    // Direct navigation for snappy feel
    update({ ownerName: trimmedName });
    next();

    // Silently upsert in background
    try {
      const { supabase } = await import("@/lib/supabase");
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from("customer_profiles")
          .upsert(
            { user_id: user.id, first_name: trimmedName },
            { onConflict: "user_id" }
          );
      }
    } catch {
      // Background failure is non-blocking
    }
  };

  return (
    <form onSubmit={handleNext} className="flex flex-col items-center text-center">


      <h2 className="headline-xl text-[clamp(1.5rem,4vw,2.2rem)] text-foreground">
        First things first — what&rsquo;s your name?
      </h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
        So we know who&rsquo;s building this custom meal plan!
      </p>

      <input
        type="text"
        autoFocus
        value={localName}
        onChange={(e) => setLocalName(e.target.value)}
        placeholder="e.g. Jaskaran"
        className="mt-8 w-full max-w-[340px] rounded-xl border border-[var(--color-input)] bg-background px-4 py-3 text-center text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
      />

      <button
        type="submit"
        disabled={!localName.trim()}
        className="btn-pill-primary mt-8 w-full max-w-[340px] disabled:opacity-50"
      >
        Next
      </button>
    </form>
  );
}
