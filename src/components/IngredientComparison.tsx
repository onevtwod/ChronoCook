import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { OriginalIngredient, ModernSubstitute } from '../models';
import { COLORS } from '../navigation/AppNavigator';

interface IngredientComparisonProps {
  originalIngredients: OriginalIngredient[];
  modernSubstitutes: ModernSubstitute[];
}

const IngredientComparison: React.FC<IngredientComparisonProps> = ({
  originalIngredients,
  modernSubstitutes,
}) => {
  const [showModern, setShowModern] = useState(false);

  // Create a map of original ingredients to their substitutes
  const substitutesMap: Record<string, ModernSubstitute> = {};
  modernSubstitutes.forEach((substitute) => {
    substitutesMap[substitute.original] = substitute;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {
              color: COLORS?.text || '#2c3e50',
            },
          ]}
        >
          Ingredients
        </Text>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            onPress={() => setShowModern(false)}
            style={[
              styles.toggleButton,
              !showModern && {
                backgroundColor: COLORS?.primary || '#3498db',
              },
            ]}
          >
            <Text
              style={[
                styles.toggleText,
                !showModern && { color: '#fff' },
              ]}
            >
              Historical
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowModern(true)}
            style={[
              styles.toggleButton,
              showModern && {
                backgroundColor: COLORS?.primary || '#3498db',
              },
            ]}
          >
            <Text
              style={[
                styles.toggleText,
                showModern && { color: '#fff' },
              ]}
            >
              Modern
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.ingredientsList}>
        {originalIngredients.map((ingredient, index) => {
          const hasSubstitute = substitutesMap[ingredient.name];
          
          return (
            <View
              key={`ingredient-${index}`}
              style={[
                styles.ingredientItem,
                {
                  backgroundColor: COLORS?.background || '#f8f9fa',
                  borderLeftWidth: 3,
                  borderLeftColor: showModern ? COLORS?.secondary || '#2ecc71' : COLORS?.primary || '#3498db',
                },
              ]}
            >
              <View style={styles.ingredientHeader}>
                <Text
                  style={[
                    styles.ingredientName,
                    {
                      color: COLORS?.text || '#2c3e50',
                    },
                  ]}
                >
                  {showModern && hasSubstitute
                    ? substitutesMap[ingredient.name].substitute
                    : ingredient.name}
                </Text>
                <Text
                  style={[
                    styles.ingredientQuantity,
                    {
                      color: COLORS?.lightText || '#7f8c8d',
                    },
                  ]}
                >
                  {ingredient.quantity}
                </Text>
              </View>

              {!showModern && (
                <Text
                  style={[
                    styles.historicalNote,
                    {
                      color: COLORS?.lightText || '#7f8c8d',
                      fontStyle: 'italic',
                    },
                  ]}
                >
                  {ingredient.historicalNote}
                </Text>
              )}

              {showModern && hasSubstitute && (
                <Text
                  style={[
                    styles.substitutionReason,
                    {
                      color: COLORS?.lightText || '#7f8c8d',
                    },
                  ]}
                >
                  {substitutesMap[ingredient.name].substitutionReason}
                </Text>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS?.border || '#e0e0e0',
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  toggleText: {
    fontSize: 14,
    color: COLORS?.lightText || '#7f8c8d',
  },
  ingredientsList: {
    maxHeight: 300,
  },
  ingredientItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: COLORS?.shadow || '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  ingredientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: '500',
  },
  ingredientQuantity: {
    fontSize: 16,
  },
  historicalNote: {
    fontSize: 14,
    marginTop: 4,
  },
  substitutionReason: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default IngredientComparison; 