import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Recipe } from '../models';
import { COLORS } from '../navigation/AppNavigator';

interface RecipeCardProps {
  recipe: Recipe;
  onPress: (recipeId: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(recipe.id)}
      style={[
        styles.container,
        {
          backgroundColor: COLORS?.card || '#ffffff',
          borderColor: COLORS?.border || '#e0e0e0',
        },
      ]}
    >
      <Image
        source={{ uri: recipe.imageUrl || 'https://via.placeholder.com/150' }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
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
                  backgroundColor: (COLORS?.primary || '#3498db') + '20', // 20% opacity
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
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {recipe.description}
        </Text>

        <View style={styles.ratingContainer}>
          <View style={styles.ratingItem}>
            <Text style={[styles.ratingLabel, { color: COLORS?.lightText || '#7f8c8d' }]}>Accuracy</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Text
                  key={`accuracy-${star}`}
                  style={[
                    styles.star,
                    {
                      color:
                        star <= (recipe.historicalAccuracy || 0)
                          ? COLORS?.secondary || '#2ecc71'
                          : '#ddd',
                    },
                  ]}
                >
                  ★
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.ratingItem}>
            <Text style={[styles.ratingLabel, { color: COLORS?.lightText || '#7f8c8d' }]}>Flavor</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Text
                  key={`flavor-${star}`}
                  style={[
                    styles.star,
                    {
                      color:
                        star <= (recipe.userRatings?.flavorRating || 0)
                          ? COLORS?.secondary || '#2ecc71'
                          : '#ddd',
                    },
                  ]}
                >
                  ★
                </Text>
              ))}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: COLORS?.shadow || '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eraContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  eraTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  eraText: {
    fontSize: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingItem: {
    flexDirection: 'column',
  },
  ratingLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 16,
    marginRight: 2,
  },
});

export default RecipeCard; 