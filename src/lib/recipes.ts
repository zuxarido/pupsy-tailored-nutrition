/**
 * Shared Pupsy recipe definitions.
 * Single source of truth used across the questionnaire, wellness tracker, and checkout.
 */

export type Recipe = {
  id: string;
  name: string;
  icon: string;
  protein: string;
  ingredients: string;
  tags: string[];
  bestFor: string;
  caloriesPer100g: number;
  /** Macro breakdown per 100g */
  macrosPer100g: {
    protein: number;
    fat: number;
    carbs: number;
    calories: number;
  };
};

export const PUPSY_RECIPES: Recipe[] = [
  {
    id: "veg",
    name: "Paneer & Rice",
    icon: "paw",
    protein: "Paneer & Moong Dal",
    ingredients: "Paneer, Moong Dal, White Rice, Pumpkin, Fresh Veggies",
    tags: ["Vegetarian", "Gentle stomach"],
    bestFor: "Sensitive stomachs",
    caloriesPer100g: 130,
    macrosPer100g: { protein: 7.5, fat: 6.8, carbs: 10.0, calories: 130 },
  },
  {
    id: "senior",
    name: "Chicken & Quinoa",
    icon: "chicken",
    protein: "Chicken & Quinoa",
    ingredients: "Chicken, Quinoa, Carrots, Green Beans, Bone Broth",
    tags: ["High protein", "Senior dogs"],
    bestFor: "Senior or overweight dogs",
    caloriesPer100g: 88,
    macrosPer100g: { protein: 7.6, fat: 1.8, carbs: 5.3, calories: 88 },
  },
  {
    id: "chicken_rice",
    name: "Chicken & Rice",
    icon: "chicken",
    protein: "Chicken & Liver",
    ingredients: "Chicken Breast, Chicken Liver, White Rice, Farm Eggs, Carrots, Ghee",
    tags: ["All life stages", "Energy boost"],
    bestFor: "Active dogs",
    caloriesPer100g: 149,
    macrosPer100g: { protein: 13.0, fat: 7.2, carbs: 7.3, calories: 149 },
  },
];
