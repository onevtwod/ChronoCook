import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useRecipes } from '../contexts/RecipeContext';
import { Recipe } from '../models';
import IngredientComparison from '../components/IngredientComparison';
import CookingSteps from '../components/CookingSteps';
import RecipeRating from '../components/RecipeRating';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RecipeStackParamList, COLORS } from '../navigation/AppNavigator';

type RecipeDetailScreenNavigationProp = NativeStackNavigationProp<
  RecipeStackParamList,
  'RecipeDetail'
>;

type RecipeDetailScreenRouteProp = RouteProp<
  RecipeStackParamList,
  'RecipeDetail'
>;

interface RecipeDetailScreenProps {
  route: RecipeDetailScreenRouteProp;
  navigation: RecipeDetailScreenNavigationProp;
}

const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { recipeId } = route.params;
  const { fetchRecipeById } = useRecipes();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);
  const initialLoadRef = useRef(true);

  // Use useCallback to prevent unnecessary re-renders
  const loadRecipe = useCallback(async () => {
    if (!isMounted.current || !initialLoadRef.current) return;
    
    try {
      setIsLoading(true);
      const recipeData = await fetchRecipeById(recipeId);
      
      if (isMounted.current) {
        setRecipe(recipeData);
        initialLoadRef.current = false;
        setIsLoading(false);
      }
    } catch (err) {
      if (isMounted.current) {
        setError('Failed to load recipe. Please try again.');
        initialLoadRef.current = false;
        setIsLoading(false);
      }
    }
  }, [recipeId]);

  useEffect(() => {
    isMounted.current = true;
    initialLoadRef.current = true;
    loadRecipe();
    
    return () => {
      isMounted.current = false;
      initialLoadRef.current = false;
    };
  }, [loadRecipe]);

  // Render loading state
  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: COLORS?.background || '#f8f9fa' }]}>
        <ActivityIndicator size="large" color={COLORS?.primary || '#3498db'} />
        <Text style={[styles.loadingText, { color: COLORS?.text || '#2c3e50' }]}>
          Loading recipe...
        </Text>
      </View>
    );
  }

  // Render error state
  if (error || !recipe) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: COLORS?.background || '#f8f9fa' }]}>
        <Text style={[styles.errorText, { color: COLORS?.accent || '#e74c3c' }]}>
          {error || 'Recipe not found'}
        </Text>
      </View>
    );
  }

  // Render recipe details
  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: COLORS?.background || '#f8f9fa',
        },
      ]}
    >
      <Image
        source={{ uri: recipe.imageUrl || 'https://via.placeholder.com/400' }}
        style={styles.recipeImage}
        resizeMode="cover"
      />

      <View style={[styles.content, { backgroundColor: COLORS?.card || '#ffffff' }]}>
        <Text
          style={[
            styles.title,
            {
              color: COLORS?.text || '#2c3e50',
            },
          ]}
        >
          {recipe.title}
        </Text>

        <View style={styles.eraContainer}>
          {recipe.era.map((era) => (
            <View
              key={era}
              style={[
                styles.eraTag,
                {
                  backgroundColor: (COLORS?.primary || '#3498db') + '20',
                },
              ]}
            >
              <Text
                style={[
                  styles.eraText,
                  {
                    color: COLORS?.primary || '#3498db',
                  },
                ]}
              >
                {era}
              </Text>
            </View>
          ))}
        </View>

        <Text
          style={[
            styles.description,
            {
              color: COLORS?.lightText || '#7f8c8d',
            },
          ]}
        >
          {recipe.description}
        </Text>

        <IngredientComparison
          originalIngredients={recipe.originalIngredients}
          modernSubstitutes={recipe.modernSubstitutes}
        />

        <CookingSteps steps={recipe.cookingSteps} />

        <RecipeRating
          recipeId={recipe.id}
          initialAccuracyRating={recipe.accuracyRating}
          initialFlavorRating={recipe.flavorRating}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '500',
  },
  recipeImage: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    shadowColor: COLORS?.shadow || '#000000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eraContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  eraTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  eraText: {
    fontSize: 14,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
});

export default RecipeDetailScreen; 