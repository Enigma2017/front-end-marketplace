import RecipeReviewCard from "./card";

import { Recipe } from "../types/types";

interface CardContainerProps {
    recipes: Recipe[];
}

export default function CardContainer({ recipes }: CardContainerProps) {


    return (
        <div className="card-container">
            {recipes.map((recipe) => (
                <RecipeReviewCard key={recipe.uri} recipe={recipe} />
            ))}
        </div>
    );
}
