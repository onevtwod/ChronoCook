import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRecipes } from '../contexts/RecipeContext';
import { COLORS } from '../navigation/AppNavigator';

interface RecipeRatingProps {
  recipeId: string;
  initialAccuracyRating?: number;
  initialFlavorRating?: number;
}

const RecipeRating: React.FC<RecipeRatingProps> = ({
  recipeId,
  initialAccuracyRating,
  initialFlavorRating,
}) => {
  const { rateRecipe } = useRecipes();
  
  const [accuracyRating, setAccuracyRating] = useState<number | undefined>(
    initialAccuracyRating
  );
  const [flavorRating, setFlavorRating] = useState<number | undefined>(
    initialFlavorRating
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAccuracyRating = (rating: number) => {
    setAccuracyRating(rating);
  };

  const handleFlavorRating = (rating: number) => {
    setFlavorRating(rating);
  };

  const handleSubmitRating = async () => {
    try {
      setIsSubmitting(true);
      await rateRecipe(recipeId, accuracyRating, flavorRating);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error submitting rating:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS?.card || '#ffffff' }]}>
      <Text
        style={[
          styles.title,
          {
            color: COLORS?.text || '#2c3e50',
          },
        ]}
      >
        Rate this Recipe
      </Text>

      <View style={styles.ratingContainer}>
        <View style={styles.ratingSection}>
          <Text
            style={[
              styles.ratingLabel,
              {
                color: COLORS?.text || '#2c3e50',
              },
            ]}
          >
            Historical Accuracy
          </Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={`accuracy-${star}`}
                onPress={() => handleAccuracyRating(star)}
              >
                <Text
                  style={[
                    styles.star,
                    {
                      color:
                        star <= (accuracyRating || 0)
                          ? COLORS?.secondary || '#2ecc71'
                          : '#ddd',
                      fontSize: 32,
                    },
                  ]}
                >
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text
            style={[
              styles.ratingDescription,
              {
                color: COLORS?.lightText || '#7f8c8d',
              },
            ]}
          >
            {accuracyRating
              ? accuracyRating === 5
                ? 'Perfectly authentic'
                : accuracyRating >= 4
                ? 'Very historically accurate'
                : accuracyRating >= 3
                ? 'Mostly accurate'
                : accuracyRating >= 2
                ? 'Some historical elements'
                : 'Not historically accurate'
              : 'Rate the historical authenticity'}
          </Text>
        </View>

        <View style={styles.ratingSection}>
          <Text
            style={[
              styles.ratingLabel,
              {
                color: COLORS?.text || '#2c3e50',
              },
            ]}
          >
            Flavor
          </Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={`flavor-${star}`}
                onPress={() => handleFlavorRating(star)}
              >
                <Text
                  style={[
                    styles.star,
                    {
                      color:
                        star <= (flavorRating || 0)
                          ? COLORS?.secondary || '#2ecc71'
                          : '#ddd',
                      fontSize: 32,
                    },
                  ]}
                >
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text
            style={[
              styles.ratingDescription,
              {
                color: COLORS?.lightText || '#7f8c8d',
              },
            ]}
          >
            {flavorRating
              ? flavorRating === 5
                ? 'Absolutely delicious'
                : flavorRating >= 4
                ? 'Very tasty'
                : flavorRating >= 3
                ? 'Good flavor'
                : flavorRating >= 2
                ? 'Somewhat tasty'
                : 'Not very flavorful'
              : 'Rate the taste and flavor'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.submitButton,
          {
            backgroundColor: COLORS?.primary || '#3498db',
            opacity: isSubmitting ? 0.7 : 1,
          },
        ]}
        onPress={handleSubmitRating}
        disabled={isSubmitting || (!accuracyRating && !flavorRating)}
      >
        <Text
          style={styles.submitButtonText}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Rating'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    shadowColor: COLORS?.shadow || '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  ratingContainer: {
    marginBottom: 20,
  },
  ratingSection: {
    marginBottom: 16,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  star: {
    marginRight: 8,
  },
  ratingDescription: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  submitButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default RecipeRating; 