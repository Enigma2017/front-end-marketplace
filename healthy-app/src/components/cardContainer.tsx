import RecipeReviewCard from "./card";

import { Recipe } from "../types/types";

interface CardContainerProps {
    recipes: Recipe[];
}

export default function CardContainer({ recipes }: CardContainerProps) {


    return (
        <div>
            {recipes.map((recipe) => (
                <RecipeReviewCard recipe={recipe} />
            ))}
        </div>
    );
}
