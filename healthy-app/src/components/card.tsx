import React from "react";
import { observer } from "mobx-react-lite";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Link from "@mui/material/Link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FlatwareIcon from "@mui/icons-material/Flatware";
import { Recipe } from "../types/types";
import favoriteStore from "../lib/store";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface RecipeReviewCardProps {
  recipe: Recipe;
}

function extractRecipeId(uri: string): string {
  const parts = uri.split("#recipe_");
  return parts.length > 1 ? parts[1] : uri;
}

// Example usage:
/* const uri = "http://www.edamam.com/ontologies/edamam.owl#recipe_someUniqueID";
const id = extractRecipeId(uri);
console.log(id); // Outputs: someUniqueID */

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RecipeReviewCard: React.FC<RecipeReviewCardProps> = observer(({ recipe }) => {
  const { label, image, source, url, ingredients, calories, id, uri } = recipe;
  const [expanded, setExpanded] = React.useState(false);
  // console.log(recipe);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteClick = () => {
    const id = extractRecipeId(uri);
    if (favoriteStore.isFavorite(id)) {
      favoriteStore.removeFavorite(id);
    } else {
      favoriteStore.addFavorite(id);
    }
  };

  

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <FlatwareIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        subheader={`${calories.toFixed(0)} Kcal`}
      />
      <CardMedia component="img" height="194" image={image} alt={label} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </CardContent>
      <Link href={url} underline="none">
        {source}
      </Link>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={handleFavoriteClick}
          color={favoriteStore.isFavorite(id) ? "primary" : "default"}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Ingredients:</Typography>
          <Typography paragraph>
            {ingredients.map((ingredient) => ingredient.text).join(", ")}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
});

export default RecipeReviewCard;
