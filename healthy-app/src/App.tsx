import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Favourites } from "./pages/favourites";
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
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/favourites">Favourites</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Recipes</h1>
                <SearchInput />
                <CardContainer recipes={recipes} />
              </>
            }
          />
          <Route 
            path="/favourites" 
            element={<Favourites  />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
