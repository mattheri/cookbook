export interface Instruction {
  name?: string;
  steps: string[];
}

export interface ExternalRecipe {
  uuid: string;
  name: string;
  description: string;
  images: string[];
  ingredients: string[];
  instructions: Instruction[];
  yield: string;
  ["prep-time"]: string;
  ["cook-time"]: string;
  ["total-time"]: string;
  url: string;
}
