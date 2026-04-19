"use client";

import { useState } from "react";
import Link from "next/link";
import type { DogProfile } from "@/types/dog-profile";
import { Icon } from "@/components/ui/Icon";

type Recipe = {
  name: string;
  icon: string;
  protein: string;
  ingredients: string;
  tags: string[];
  bestFor: string;
};

const allRecipes: Recipe[] = [
  {
    name: "Chicken & Brown Rice",
    icon: "chicken",
    protein: "Chicken breast",
    ingredients: "Chicken, Brown Rice, Carrots, Spinach, Turmeric",
    tags: ["High protein", "Omega-3 rich"],
    bestFor: "All life stages",
  },
  {
    name: "Lamb & Veggies",
    icon: "lamb",
    protein: "Lamb mince",
    ingredients: "Lamb Mince, Oats, Peas, Pumpkin",
    tags: ["Iron-rich", "Grain-friendly"],
    bestFor: "Active dogs",
  },
  {
    name: "Egg & Lentil",
    icon: "egg",
    protein: "Farm eggs",
    ingredients: "Eggs, Lentils, Carrots, Rice, Ghee",
    tags: ["Vegetarian", "Gentle"],
    bestFor: "Sensitive stomachs",
  },
  {
    name: "Mutton & Sweet Potato",
    icon: "meat",
    protein: "Mutton",
    ingredients: "Mutton, Sweet Potato, Beans, Ginger",
    tags: ["Grain-free", "Joint support"],
    bestFor: "Senior dogs",
  },
];

function getRecommendation(profile: DogProfile): { primary: Recipe; alternate: Recipe } {
  const hasChickenAllergy = profile.healthConditions.includes("Chicken allergy");
  const hasGrainAllergy = profile.healthConditions.includes("Grain allergy");
  const isSenior = profile.age === "senior";
  const hasSensitiveStomach = profile.healthConditions.includes("Sensitive stomach");

  let primary = allRecipes[0];
  let alternate = allRecipes[1];

  if (hasChickenAllergy) {
    primary = allRecipes[1];
    alternate = allRecipes[3];
  } else if (hasSensitiveStomach) {
    primary = allRecipes[2];
    alternate = allRecipes[0];
  } else if (isSenior) {
    primary = allRecipes[3];
    alternate = allRecipes[2];
  } else if (hasGrainAllergy) {
    primary = allRecipes[3];
    alternate = allRecipes[0];
  } else if (profile.activity === "high") {
    primary = allRecipes[1];
    alternate = allRecipes[0];
  }

  return { primary, alternate };
}

function calculatePortion(profile: DogProfile): number {
  const w = parseFloat(profile.weight) || 15;
  let calories = 30 * w + 70;
  if (profile.activity === "high") calories *= 1.3;
  else if (profile.activity === "low") calories *= 0.8;
  if (profile.age === "puppy") calories *= 1.2;
  if (profile.age === "senior") calories *= 0.9;
  return Math.round(calories / 1.5);
}

function calculatePrice(portion: number): number {
  const raw = Math.round(portion * 0.55);
  return Math.max(99, Math.min(299, raw));
}

type Props = {
  profile: DogProfile;
};

export function StepResults({ profile }: Props) {
  const { primary, alternate } = getRecommendation(profile);
  const [selectedRecipe, setSelectedRecipe] = useState(primary);

  const portion = calculatePortion(profile);
  const halfPortion = Math.round(portion / 2);
  const price = calculatePrice(portion);

  const dogName = profile.name || "Your dog";

  return (
    <div className="flex flex-col">
      {/* Reveal header */}
      <div className="text-center">
        <Icon name="check" size={40} className="text-accent mx-auto" />
        <h2 className="headline-xl mt-4 text-[clamp(1.8rem,4vw,2.8rem)] text-foreground">
          {dogName}&rsquo;s plan is ready!
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Based on what you told us, here&rsquo;s what we recommend.
        </p>
      </div>

      {/* Primary recommendation card */}
      <div className="mt-8 rounded-[20px] border border-accent/30 bg-accent/5 p-6">
        <div className="flex items-center gap-3">
          <Icon name={selectedRecipe.icon} size={32} className="text-accent" />
          <div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Recommended recipe
            </div>
            <h3 className="font-serif text-xl text-foreground">{selectedRecipe.name}</h3>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          <strong className="text-foreground">Ingredients:</strong> {selectedRecipe.ingredients}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {selectedRecipe.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--color-tag-fresh-bg)] px-2.5 py-1 text-[11px] text-[var(--color-tag-fresh-fg)]"
            >
              {tag}
            </span>
          ))}
          <span className="rounded-full bg-[var(--color-tag-vet-bg)] px-2.5 py-1 text-[11px] text-[var(--color-tag-vet-fg)]">
            Best for: {selectedRecipe.bestFor}
          </span>
        </div>
      </div>

      {/* Portion + price */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-[16px] border border-[var(--color-border)] bg-background p-5 text-center">
          <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Daily portion
          </div>
          <div className="mt-1 font-serif text-2xl text-foreground">{portion}g</div>
          <div className="mt-1 text-xs text-muted-foreground">
            2 x {halfPortion}g packs
          </div>
        </div>
        <div className="rounded-[16px] border border-[var(--color-border)] bg-background p-5 text-center">
          <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Price
          </div>
          <div className="mt-1 font-serif text-2xl text-foreground">&#x20B9;{price}/day</div>
          <div className="mt-1 text-xs text-muted-foreground">
            Delivered every morning
          </div>
        </div>
      </div>

      {/* Personalisation note */}
      <div className="mt-5 rounded-[16px] bg-[var(--color-hero-panel)] p-5">
        <p className="text-sm text-foreground">
          <Icon name="microscope" size={16} className="inline-flex mr-1.5 text-accent" />
          <strong>Why this recipe?</strong>{" "}
          Based on {dogName}&rsquo;s {profile.breed || "breed"}, {profile.age} life stage,
          {profile.weight ? ` ${profile.weight}kg weight,` : ""} and {profile.activity} activity level.
          {profile.healthConditions.length > 0 && profile.healthConditions[0] !== "None"
            ? ` Adjusted for: ${profile.healthConditions.join(", ")}.`
            : ""}
        </p>
      </div>

      {/* Alternate recipe */}
      <button
        type="button"
        onClick={() =>
          setSelectedRecipe((r) =>
            r.name === primary.name ? alternate : primary,
          )
        }
        className="mt-4 text-center text-sm text-accent underline underline-offset-4 hover:text-accent/80"
      >
        {selectedRecipe.name === primary.name
          ? `Also works for ${dogName}: ${alternate.name}`
          : `Switch back to ${primary.name}`}
      </button>

      {/* CTA */}
      <Link
        href="/checkout"
        className="btn-pill-primary mt-8 w-full text-center"
      >
        Complete & Subscribe
      </Link>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Checkout coming soon · No commitment · Pause or cancel anytime
      </p>
    </div>
  );
}
