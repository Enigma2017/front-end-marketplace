import React, { useEffect, useState } from "react";
import SearchInput from "./components/search";
import { fetchRecipes } from "./api/api";
import { Recipe } from "./types/types";

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data.hits.map((hit) => hit.recipe));
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    getRecipes();
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      <SearchInput />
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            <h2>{recipe.label}</h2>
            <img src={recipe.image} alt={recipe.label} />
            <p>
              Source: <a href={recipe.url}>{recipe.source}</a>
            </p>
            <ul>
              {recipe.ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient.text}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
