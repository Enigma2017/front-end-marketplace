import React from "react";
import RecipeReviewCard from "./card";
import { Recipe } from "../types/types";

interface FavouritesContainerProps {
  recipes: Recipe[];
}

export const FavouritesContainer: React.FC<FavouritesContainerProps> = ({ recipes }) => {
  console.log(recipes);
  return (
    <div>
      <h1>Favorites</h1>
      <div className="card-container">
        {recipes.length > 0 ? (
            recipes.map((recipe) => <RecipeReviewCard key={recipe.uri} recipe={recipe} />)
        ) : (
            <p>No favorite recipes yet!</p>
        )}
      </div>
    </div>
  );
};
