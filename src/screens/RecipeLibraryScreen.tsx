import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useRecipes } from '../contexts/RecipeContext';
import { Recipe } from '../models';
import RecipeCard from '../components/RecipeCard';
import EraSelector from '../components/EraSelector';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RecipeStackParamList, COLORS } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';

type RecipeLibraryScreenNavigationProp = NativeStackNavigationProp<
  RecipeStackParamList,
  'RecipeLibrary'
>;

interface RecipeLibraryScreenProps {
  navigation: RecipeLibraryScreenNavigationProp;
}

const RecipeLibraryScreen: React.FC<RecipeLibraryScreenProps> = ({
  navigation,
}) => {
  const { recipes, isLoading, fetchRecipes, fetchRecipesByEra } = useRecipes();
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState<string | null>(null);
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(true);
  const [resultsCount, setResultsCount] = useState(0);
  
  // Animation values
  const headerHeight = useState(new Animated.Value(isHeaderExpanded ? 1 : 0))[0];
  const toggleIconRotation = useState(new Animated.Value(isHeaderExpanded ? 0 : 1))[0];

  // Mock eras data - in a real app, this would come from an API
  const eras = [
    { id: '1', name: 'Ancient Rome', startYear: -753, endYear: 476 },
    { id: '2', name: 'Medieval', startYear: 476, endYear: 1450 },
    { id: '3', name: 'Renaissance', startYear: 1450, endYear: 1600 },
    { id: '4', name: 'Victorian', startYear: 1837, endYear: 1901 },
    { id: '5', name: 'Modern', startYear: 1901, endYear: 2023 },
  ];

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  useEffect(() => {
    // Set the navigation header title and style
    navigation.setOptions({
      headerStyle: {
        backgroundColor: COLORS?.primary || '#3498db',
      },
      headerTintColor: '#ffffff',
    } as any);
  }, [navigation]);

  useEffect(() => {
    // Filter recipes based on search query and selected era
    const filterRecipes = async () => {
      let filtered = [...recipes];

      // Filter by era if selected
      if (selectedEra) {
        filtered = await fetchRecipesByEra(selectedEra);
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (recipe) =>
            recipe.title.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.originalIngredients.some((ingredient) =>
              ingredient.name.toLowerCase().includes(query)
            )
        );
      }

      setFilteredRecipes(filtered);
      setResultsCount(filtered.length);
    };

    filterRecipes();
  }, [recipes, searchQuery, selectedEra, fetchRecipesByEra]);

  // Animation effect for header expand/collapse
  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerHeight, {
        toValue: isHeaderExpanded ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(toggleIconRotation, {
        toValue: isHeaderExpanded ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  }, [isHeaderExpanded, headerHeight, toggleIconRotation]);

  const rotateInterpolation = toggleIconRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  const animatedHeaderHeight = headerHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 200]
  });

  const handleSelectEra = (era: string) => {
    if (selectedEra === era) {
      setSelectedEra(null);
    } else {
      setSelectedEra(era);
    }
  };

  const handleRecipePress = (recipeId: string) => {
    navigation.navigate('RecipeDetail', { recipeId });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const renderRecipeItem = ({ item }: { item: Recipe }) => (
    <RecipeCard recipe={item} onPress={handleRecipePress} />
  );

  if (isLoading && recipes.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator 
          size="large" 
          color={COLORS?.primary || '#3498db'} 
        />
        <Text 
          style={[
            styles.loadingText, 
            { 
              color: COLORS?.text || '#2c3e50',
            }
          ]}
        >
          Loading recipes...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: COLORS?.background || '#f8f9fa',
        },
      ]}
    >
      <Animated.View 
        style={[
          styles.header,
          {
            height: animatedHeaderHeight,
            overflow: 'hidden',
            backgroundColor: COLORS?.card || '#ffffff',
            borderBottomWidth: 1,
            borderBottomColor: COLORS?.border || '#e0e0e0',
          }
        ]}
      >
        <View style={styles.headerTop}>
          <View style={styles.searchContainer}>
            <Ionicons 
              name="search" 
              size={20} 
              color={COLORS?.primary || '#3498db'} 
              style={styles.searchIcon}
            />
            <TextInput
              style={[
                styles.searchInput,
                {
                  backgroundColor: 'transparent',
                  color: COLORS?.text || '#2c3e50',
                },
              ]}
              placeholder="Search recipes or ingredients..."
              placeholderTextColor={COLORS?.lightText || '#7f8c8d'}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={handleClearSearch}>
                <Ionicons 
                  name="close-circle" 
                  size={18} 
                  color={COLORS?.lightText || '#7f8c8d'} 
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <EraSelector
          eras={eras}
          selectedEra={selectedEra}
          onSelectEra={handleSelectEra}
        />

        {selectedEra && (
          <TouchableOpacity
            style={[
              styles.clearFilterButton,
              {
                backgroundColor: COLORS?.accent || '#e74c3c',
              },
            ]}
            onPress={() => setSelectedEra(null)}
          >
            <Text
              style={[
                styles.clearFilterText,
                {
                  color: '#fff',
                },
              ]}
            >
              Clear Era Filter
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>

      <TouchableOpacity 
        style={[
          styles.headerToggle,
          {
            backgroundColor: COLORS?.primary || '#3498db',
            shadowColor: COLORS?.shadow || '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          },
        ]}
        onPress={() => setIsHeaderExpanded(!isHeaderExpanded)}
      >
        <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
          <Ionicons 
            name="chevron-down"
            size={20} 
            color="#ffffff" 
          />
        </Animated.View>
      </TouchableOpacity>

      <View style={styles.resultsHeader}>
        <Text style={[
          styles.resultsText,
          {
            color: COLORS?.text || '#2c3e50',
          }
        ]}>
          {resultsCount} {resultsCount === 1 ? 'Recipe' : 'Recipes'} Found
        </Text>
      </View>

      {filteredRecipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons 
            name="search-outline" 
            size={50} 
            color={COLORS?.border || '#e0e0e0'}
          />
          <Text
            style={[
              styles.emptyText,
              {
                color: COLORS?.text || '#2c3e50',
              },
            ]}
          >
            No recipes found. Try adjusting your search or filters.
          </Text>
          <TouchableOpacity 
            style={[
              styles.resetButton,
              {
                backgroundColor: COLORS?.primary || '#3498db',
              }
            ]}
            onPress={() => {
              setSearchQuery('');
              setSelectedEra(null);
            }}
          >
            <Text style={[
              styles.resetButtonText,
              {
                color: '#ffffff',
              }
            ]}>
              Reset All Filters
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredRecipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.recipeList}
          showsVerticalScrollIndicator={false}
          numColumns={Dimensions.get('window').width > 500 ? 2 : 1}
          key={Dimensions.get('window').width > 500 ? 'two-column' : 'one-column'}
        />
      )}
    </View>
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
  header: {
    padding: 10,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS?.border || '#e0e0e0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    padding: 0,
    fontSize: 14,
  },
  headerToggle: {
    height: 28,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    alignSelf: 'center',
    marginTop: -1,
    zIndex: 10,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultsText: {
    fontSize: 14,
    fontWeight: '500',
  },
  clearFilterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  clearFilterText: {
    fontSize: 12,
    fontWeight: '500',
  },
  recipeList: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
    maxWidth: 300,
  },
  resetButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default RecipeLibraryScreen; 