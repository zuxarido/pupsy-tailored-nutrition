/**
 * Shared nutrition calculation helpers.
 * Single source of truth for calorie and portion formulas used across the app.
 */

type ActivityLevel = "low" | "moderate" | "high";

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  low: 0.8,
  moderate: 1.0,
  high: 1.2,
};

/**
 * Calculate a dog's daily calorie target.
 * Formula: weight(kg) × 20 × activityMultiplier
 */
export function calculateDailyCalories(weightKg: number, activity: string): number {
  const multiplier = ACTIVITY_MULTIPLIERS[activity as ActivityLevel] ?? 1.0;
  return Math.round(weightKg * 20 * multiplier);
}

/**
 * Calculate the daily portion size in grams for a given calorie target and recipe.
 * Rounds to the nearest 50g and caps at 800g.
 */
export function calculateDailyPortion(dailyCalories: number, caloriesPer100g: number): number {
  const rawGrams = (dailyCalories / caloriesPer100g) * 100;
  const rounded = Math.round(rawGrams / 50) * 50;
  return Math.min(800, rounded);
}
