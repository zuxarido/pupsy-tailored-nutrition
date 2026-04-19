export type DogProfile = {
  ownerName: string;
  name: string;
  breed: string;
  age: string;
  sex: string;
  neutered: boolean | null;
  weight: string;
  idealWeight: string;
  bodyCondition: string;
  activity: string;
  healthConditions: string[];
  currentFood: string;
};

export const defaultProfile: DogProfile = {
  ownerName: "",
  name: "",
  breed: "",
  age: "",
  sex: "",
  neutered: null,
  weight: "",
  idealWeight: "",
  bodyCondition: "",
  activity: "",
  healthConditions: [],
  currentFood: "",
};
