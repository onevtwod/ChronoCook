import React, { createContext, useContext, useState, useEffect } from 'react';
import { Recipe } from '../models';
import mockRecipes from '../utils/mockData';

interface RecipeContextType {
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
  fetchRecipes: () => Promise<void>;
  fetchRecipesByEra: (era: string) => Promise<Recipe[]>;
  fetchRecipeById: (id: string) => Promise<Recipe | null>;
  rateRecipe: (recipeId: string, accuracyRating?: number, flavorRating?: number) => Promise<void>;
}

const RecipeContext = createContext<RecipeContextType>({
  recipes: [],
  isLoading: false,
  error: null,
  fetchRecipes: async () => {},
  fetchRecipesByEra: async () => [],
  fetchRecipeById: async () => null,
  rateRecipe: async () => {},
});

export const useRecipes = () => useContext(RecipeContext);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use mock data for now
      setRecipes(mockRecipes);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError('Failed to fetch recipes');
      console.error('Error fetching recipes:', error);
    }
  };

  const fetchRecipesByEra = async (era: string): Promise<Recipe[]> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const filteredRecipes = mockRecipes.filter(
        recipe => recipe.era.includes(era)
      );
      
      setIsLoading(false);
      return filteredRecipes;
    } catch (error) {
      setIsLoading(false);
      setError('Failed to fetch recipes by era');
      console.error('Error fetching recipes by era:', error);
      return [];
    }
  };

  const fetchRecipeById = async (id: string): Promise<Recipe | null> => {
    try {
      // Don't update global loading state for individual recipe fetches
      // as it's handled locally in the components
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const recipe = mockRecipes.find(r => r.id === id) || null;
      
      return recipe;
    } catch (error) {
      console.error('Error fetching recipe:', error);
      return null;
    }
  };

  const rateRecipe = async (
    recipeId: string,
    accuracyRating?: number,
    flavorRating?: number
  ) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Update local state
      setRecipes(prevRecipes => 
        prevRecipes.map(recipe => {
          if (recipe.id === recipeId) {
            return {
              ...recipe,
              ...(accuracyRating !== undefined && { accuracyRating }),
              ...(flavorRating !== undefined && { flavorRating }),
            };
          }
          return recipe;
        })
      );
      
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError('Failed to rate recipe');
      console.error('Error rating recipe:', error);
    }
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        isLoading,
        error,
        fetchRecipes,
        fetchRecipesByEra,
        fetchRecipeById,
        rateRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}; 