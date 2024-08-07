export interface Recipe {
    label: string;
    image: string;
    source: string;
    url: string;
    ingredients: { text: string }[];
    // Add more fields as needed
  }
  
export interface RecipeResponse {
    hits: { recipe: Recipe }[];
    // Add more fields as needed
}
  