"use client";

import { useState } from "react";
import type { DogProfile } from "@/types/dog-profile";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

type Props = {
  profile: DogProfile;
  update: (patch: Partial<DogProfile>) => void;
  next: () => void;
};

export function StepOwnerName({ profile, update, next }: Props) {
  const [saving, setSaving] = useState(false);

  const handleNext = async () => {
    if (!profile.ownerName.trim()) return;

    // Silently upsert customer_profiles if the user is already authenticated
    try {
      setSaving(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from("customer_profiles")
          .upsert(
            { user_id: user.id, first_name: profile.ownerName.trim() },
            { onConflict: "user_id" }
          );
      }
    } catch {
      // Non-blocking — continue even if upsert fails
    } finally {
      setSaving(false);
    }

    next();
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mx-auto mb-4 h-[180px] w-[180px] sm:h-[220px] sm:w-[220px]">
        <Image
          src="/quiz-dog-welcome.png"
          alt="Friendly dog waving hello"
          fill
          className="object-contain"
          priority
        />
      </div>

      <h2 className="headline-xl text-[clamp(1.5rem,4vw,2.2rem)] text-foreground">
        First things first — what&rsquo;s your name?
      </h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-xs">
        So we know who&rsquo;s building this custom meal plan!
      </p>

      <input
        type="text"
        autoFocus
        value={profile.ownerName}
        onChange={(e) => update({ ownerName: e.target.value })}
        placeholder="e.g. Jaskaran"
        className="mt-8 w-full max-w-[340px] rounded-xl border border-[var(--color-input)] bg-background px-4 py-3 text-center text-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
      />

      <button
        onClick={handleNext}
        disabled={!profile.ownerName.trim() || saving}
        className="btn-pill-primary mt-8 w-full max-w-[340px] disabled:opacity-50"
      >
        {saving ? "Saving..." : "Next"}
      </button>
    </div>
  );
}
