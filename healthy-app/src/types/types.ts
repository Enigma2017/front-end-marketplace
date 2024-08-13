export interface Recipe {
  label: string;
  image: string;
  source: string;
  url: string;
  uri: string;
  id: string;
  ingredients: { text: string }[];
  text: string;
  calories: number;
}
  
export interface RecipeResponse {
    hits: { recipe: Recipe }[];
    data: { recipe : Recipe };
    // Add more fields as needed
}
  