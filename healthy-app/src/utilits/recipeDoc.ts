export function extractRecipeId(uri: string): string {
    const parts = uri.split("#recipe_");
    return parts.length > 1 ? parts[1] : uri;
}

