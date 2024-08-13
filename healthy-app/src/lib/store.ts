import { makeAutoObservable } from "mobx";
import { Recipe } from "../types/types";

class FavoriteStore {
  favorites: Set<string> = new Set(); // Store recipe IDs
  favoriteRecipesDocs: Recipe[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addFavorite(id: string) {
    this.favorites.add(id);
    console.log(this.favorites);
  }

  removeFavorite(id: string) {
    this.favorites.delete(id);
  }

  isFavorite(id: string): boolean {
    return this.favorites.has(id);
  }

  addFavoriteRecipeDoc(doc: Recipe) {
    this.favoriteRecipesDocs.push(doc);
  }

  get favoriteRecipes(): string[] {
    return Array.from(this.favorites);
  }

  get favoriteRecipeDocs(): Recipe[] {
    return Array.from(this.favoriteRecipesDocs);
  }
}

const favoriteStore = new FavoriteStore();
export default favoriteStore;
