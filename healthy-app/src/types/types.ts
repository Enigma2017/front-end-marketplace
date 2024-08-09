export interface Recipe {
  label: string;
  image: string;
  source: string;
  url: string;
  ingredients: { text: string }[];
  text: string;
  calories: number;
}
  
export interface RecipeResponse {
    hits: { recipe: Recipe }[];
    // Add more fields as needed
}
  