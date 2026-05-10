"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { DogProfile } from "@/types/dog-profile";
import { Icon } from "@/components/ui/Icon";
import { getPricing } from "@/lib/pricing";
import { PUPSY_RECIPES, type Recipe } from "@/lib/recipes";
import { calculateDailyCalories, calculateDailyPortion } from "@/lib/nutrition";

function getRecommendation(profile: DogProfile): { primary: Recipe; alternate: Recipe } {
  const isSenior = profile.age === "senior";
  const hasSensitiveStomach = profile.healthConditions.includes("Sensitive stomach");
  const hasGrainAllergy = profile.healthConditions.includes("Grain allergy");

  let primary = PUPSY_RECIPES[2]; // Default: Chicken & Rice
  let alternate = PUPSY_RECIPES[1]; // Chicken & Quinoa

  if (hasSensitiveStomach) {
    primary = PUPSY_RECIPES[0]; // Paneer & Rice
    alternate = PUPSY_RECIPES[2];
  } else if (isSenior || hasGrainAllergy) {
    primary = PUPSY_RECIPES[1]; // Chicken & Quinoa
    alternate = PUPSY_RECIPES[2];
  } else if (profile.activity === "low") {
    primary = PUPSY_RECIPES[1]; // Lower kcal for sedentary
    alternate = PUPSY_RECIPES[0];
  }

  return { primary, alternate };
}

type Props = {
  profile: DogProfile;
  update: (patch: Partial<DogProfile>) => void;
};

export function StepResults({ profile, update }: Props) {
  const { primary, alternate } = getRecommendation(profile);
  const [selectedRecipe, setSelectedRecipe] = useState(primary);

  const weightKg = parseFloat(profile.weight) || 15;
  const dailyCalories = calculateDailyCalories(weightKg, profile.activity);
  const dailyPortion = calculateDailyPortion(dailyCalories, selectedRecipe.caloriesPer100g);
  const pricing = getPricing(dailyPortion);

  // Sync recommendation to parent state on mount or recipe change
  useEffect(() => {
    update({
      recommendedRecipe: selectedRecipe.name,
      dailyGrams: dailyPortion,
    });
  }, [selectedRecipe.name, dailyPortion]);

  const halfPortion = Math.round(dailyPortion / 2);
  const dogName = profile.name || "Your dog";

  return (
    <div className="flex flex-col">
      {/* Reveal header */}
      <div className="text-center">
        <Icon name="check" size={32} className="text-accent mx-auto" />
        <h2 className="headline-xl mt-3 text-[clamp(1.6rem,3vw,2.4rem)] text-foreground">
          {dogName}&rsquo;s plan is ready!
        </h2>
        <p className="mt-2 text-xs text-muted-foreground">
          Based on what you told us, here&rsquo;s what we recommend.
        </p>
      </div>

      {/* Primary recommendation card */}
      <div className="mt-6 rounded-[20px] border border-accent/30 bg-accent/5 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <Icon name={selectedRecipe.icon as never} size={28} className="text-accent" />
          <div>
            <div className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
              Recommended recipe
            </div>
            <h3 className="font-serif text-lg text-foreground">{selectedRecipe.name}</h3>
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Ingredients:</strong> {selectedRecipe.ingredients}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {selectedRecipe.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--color-tag-fresh-bg)] px-2 py-0.5 text-[10px] text-[var(--color-tag-fresh-fg)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Portion & Pricing */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-[16px] border border-[var(--color-border)] bg-background p-4 text-center shadow-sm flex flex-col justify-center">
          <div className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
            Daily Portion
          </div>
          <div className="mt-0.5 font-serif text-xl text-foreground">{dailyPortion}g</div>
          <div className="mt-0.5 text-[10px] text-muted-foreground">
            2 x {halfPortion}g meals
          </div>
        </div>
        <div className="rounded-[16px] border border-accent/40 bg-accent/5 p-4 text-center shadow-sm flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 bg-accent text-[9px] uppercase font-bold text-white tracking-wider py-0.5">
            Best Value
          </div>
          <div className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground mt-2">
            Starts at
          </div>
          <div className="mt-0.5 font-serif text-xl text-accent">
            &#x20B9;{Math.round(pricing.full.monthly / 30)}
            <span className="text-sm">/day</span>
          </div>
          <div className="mt-0.5 text-[10px] text-muted-foreground">on our Monthly plan</div>
        </div>
      </div>

      {/* Unsure option */}
      <div className="mt-3 rounded-[16px] border border-dashed border-[var(--color-border)] p-3 flex items-center justify-between bg-muted/5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background border border-[var(--color-border)] shadow-sm">
            <Icon name="shrug" size={14} className="text-muted-foreground" />
          </div>
          <div>
            <div className="text-xs font-medium text-foreground">Unsure? Try one meal a day.</div>
            <div className="text-[10px] text-muted-foreground">Perfect for toppers or transition.</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-foreground">&#x20B9;{Math.round(pricing.half.daily)}</div>
          <div className="text-[9px] text-muted-foreground">per meal</div>
        </div>
      </div>

      {/* Trial breakdown */}
      <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-background p-5">
        <h4 className="font-serif text-sm text-foreground mb-3">What&rsquo;s inside your trial?</h4>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
              <Icon name="check" size={10} />
            </div>
            <div className="text-xs">
              <span className="font-medium text-foreground">Perfectly portioned meals</span>
              <p className="text-muted-foreground text-[10px] mt-0.5">
                Calculated to {dailyCalories} kcal/day for {dogName}.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
              <Icon name="check" size={10} />
            </div>
            <div className="text-xs">
              <span className="font-medium text-foreground">Transition guide & Wellness tracking</span>
            </div>
          </li>
        </ul>
      </div>

      {/* Algorithm note */}
      <div className="mt-4 rounded-[12px] bg-[var(--color-hero-panel)] p-4 border border-[var(--color-border)]">
        <p className="text-[11px] leading-relaxed text-foreground italic">
          <Icon name="microscope" size={12} className="inline-flex mr-1.5 text-accent" />
          <strong>Algorithm Note:</strong>{" "}
          Optimized for {dogName}&rsquo;s {profile.age} stage to manage{" "}
          {profile.activity === "high" ? "high energy output" : "ideal weight"}.
        </p>
      </div>

      {/* Alternate recipe toggle */}
      <button
        type="button"
        onClick={() => setSelectedRecipe((r) => (r.id === primary.id ? alternate : primary))}
        className="mt-4 cursor-pointer text-center text-xs font-medium text-accent hover:text-accent/80 transition-colors"
      >
        {selectedRecipe.id === primary.id
          ? `Also works for ${dogName}: ${alternate.name}`
          : `Switch back to ${primary.name}`}
      </button>

      {/* CTA */}
      <Link
        href="/checkout"
        className="btn-pill-primary mt-6 w-full text-center py-3.5 text-base"
      >
        Complete & Subscribe
      </Link>
    </div>
  );
}
