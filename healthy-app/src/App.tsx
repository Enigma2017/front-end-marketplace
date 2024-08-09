import React, { useState, useEffect } from "react";
import SearchInput from "./components/search";
import CardContainer from "./components/cardContainer";
import { fetchRecipes } from "./api/api";
import { Recipe, RecipeResponse } from "./types/types";

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchRecipes().then((data: RecipeResponse) => {
      const recipes = data.hits.map((hit) => hit.recipe);
      setRecipes(recipes);
    });
  }, []);

  return (
    <div className="container">
      <h1>Recipes</h1>
      <SearchInput />
      <CardContainer recipes={recipes} />
    </div>
  );
};

export default App;