import axios from 'axios';
import { RecipeResponse, Recipe } from '../types/types';

const API_BASE_URL = 'https://api.edamam.com/api/recipes/v2';
const APP_ID = 'ebbc0f49';
const APP_KEY = '0307afa472ffcb66207dff5f4832a855';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Accept-Language': 'en',
  },
});

export const fetchRecipes = async (
  type: string = 'public',
  diet: string = 'balanced',
  health: string = 'alcohol-cocktail'
): Promise<RecipeResponse> => {
  try {
    const response = await api.get<RecipeResponse>('', {
      params: {
        type,
        app_id: APP_ID,
        app_key: APP_KEY,
        diet,
        health,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  try {
    const response = await api.get<RecipeResponse>(`/${id}`, {
      params: {
        type: 'public',
        app_id: APP_ID,
        app_key: APP_KEY,
      },
    });  
    console.log(response);              
    //return response.data;
    //return response.data.recipe;
    return response.data.recipe;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error; 
  }
}; 
