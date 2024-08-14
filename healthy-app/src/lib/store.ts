import { makeAutoObservable } from "mobx";
import { Recipe } from "../types/types";
import { extractRecipeId } from "../utilits/recipeDoc";


class FavoriteStore {
  favorites: Set<string> = new Set(); // Store recipe IDs
  favoriteRecipesDocs: Recipe[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFavoritesFromStorage();
  }

  addFavorite(id: string) {
    this.favorites.add(id);
    this.saveFavoritesToStorage();
  }

  clearFavoriteRecipeDocs() {
    this.favoriteRecipesDocs = [];
  }

  removeFavorite(id: string) {
    this.favorites.delete(id);
    this.favoriteRecipesDocs = this.favoriteRecipesDocs.filter(doc => extractRecipeId(doc.uri) !== id);
    this.saveFavoritesToStorage();
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

  // Save the favorite IDs to localStorage
  saveFavoritesToStorage() {
    localStorage.setItem('favoriteRecipes', JSON.stringify(Array.from(this.favorites)));
  }

  // Load the favorite IDs from localStorage
  loadFavoritesFromStorage() {
    const storedFavorites = localStorage.getItem('favoriteRecipes');
    if (storedFavorites) {
      this.favorites = new Set(JSON.parse(storedFavorites));
    }
  }
}

const favoriteStore = new FavoriteStore();
export default favoriteStore;
