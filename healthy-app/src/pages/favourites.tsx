import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { FavouritesContainer } from "../components/favouritesContainer";
import favoriteStore from "../lib/store";
import { fetchRecipeById } from "../api/api";

interface FavouritesProps {}

export const Favourites: React.FC<FavouritesProps> = observer(() => {
  useEffect(() => {
    favoriteStore.favoriteRecipes.forEach(async (id) => {
      const doc = await fetchRecipeById(id);
      // Assuming `addFavoriteRecipeDoc` accepts a Recipe object.
      favoriteStore.addFavoriteRecipeDoc(doc);
    });
  }, []);

  return (
    <div>
      <FavouritesContainer recipes={favoriteStore.favoriteRecipeDocs} />
    </div>
  );
});
