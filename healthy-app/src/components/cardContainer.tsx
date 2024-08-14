import RecipeReviewCard from "./card";
import Grid from '@mui/material/Grid';

import { Recipe } from "../types/types";

interface CardContainerProps {
    recipes: Recipe[];
}

export default function CardContainer({ recipes }: CardContainerProps) {


    return (
        <div className="card-container">
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {recipes.map((recipe) => (
                    <Grid item xs={4} sm={4} md={4} key={recipe.uri}>
                        <RecipeReviewCard recipe={recipe} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
