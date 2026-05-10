export type DogProfile = {
  ownerName: string;
  name: string;
  breed: string;
  age: string;
  sex: string;
  neutered: boolean | null;
  weight: string;
  bodyCondition: string;
  activity: string;
  healthConditions: string[];
  currentFood: string;
  recommendedRecipe?: string;
  dailyGrams?: number;
};

export const defaultProfile: DogProfile = {
  ownerName: "",
  name: "",
  breed: "",
  age: "",
  sex: "",
  neutered: null,
  weight: "",
  bodyCondition: "",
  activity: "",
  healthConditions: [],
  currentFood: "",
};
