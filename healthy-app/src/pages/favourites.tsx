import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { FavouritesContainer } from "../components/favouritesContainer";
import favoriteStore from "../lib/store";
import { fetchRecipeById } from "../api/api";

interface FavouritesProps {}

export const Favourites: React.FC<FavouritesProps> = observer(() => {
  useEffect(() => {
    // Восстанавливаем рецепты при переходе на страницу избранного
    favoriteStore.clearFavoriteRecipeDocs();
    const loadFavoriteRecipes = async () => {
      const promises = favoriteStore.favoriteRecipes.map(id => fetchRecipeById(id));
      const favoriteDocs = await Promise.all(promises);
      favoriteDocs.forEach(doc => favoriteStore.addFavoriteRecipeDoc(doc));
    };

    loadFavoriteRecipes();
  }, []);

  return (
    <div>
      <FavouritesContainer recipes={favoriteStore.favoriteRecipeDocs} />
    </div>
  );
});
