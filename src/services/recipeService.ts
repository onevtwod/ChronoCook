import { Recipe } from '../models';
import mockRecipes from '../utils/mockData'; // Ensure this import is present

export const recipeService = {
  getRecipes: async (): Promise<Recipe[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockRecipes);
      }, 500);
    });
  },

  getRecipeById: async (id: string): Promise<Recipe | null> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const recipe = mockRecipes.find((r) => r.id === id);
        resolve(recipe || null);
      }, 500);
    });
  },
};

export default recipeService;
