import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Dimensions,
  Platform
} from 'react-native';
import { COLORS } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import EraSelector from '../components/EraSelector';
import { useRecipes } from '../contexts/RecipeContext';
import { useTheme } from '../contexts/ThemeContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ExploreStackParamList } from '../navigation/AppNavigator';

type ExploreScreenNavigationProp = NativeStackNavigationProp<ExploreStackParamList>;

interface ExploreScreenProps {
  navigation: ExploreScreenNavigationProp;
}

const { width } = Dimensions.get('window');

// Mock data for trending recipes
const TRENDING_RECIPES = [
  {
    id: '1',
    name: 'Roman Honey Cake',
    era: 'Ancient Rome',
    imageUrl: 'https://example.com/roman-cake.jpg',
    popularity: 4.8,
    cookingTime: 45,
  },
  {
    id: '2',
    name: 'Medieval Meat Pie',
    era: 'Medieval',
    imageUrl: 'https://example.com/medieval-pie.jpg',
    popularity: 4.5,
    cookingTime: 120,
  },
  {
    id: '3',
    name: 'Renaissance Risotto',
    era: 'Renaissance',
    imageUrl: 'https://example.com/renaissance-risotto.jpg',
    popularity: 4.7,
    cookingTime: 60,
  },
];

// Mock data for eras
const ERAS = [
  { id: '1', name: 'Ancient Egypt', startYear: -3000, endYear: -332 },
  { id: '2', name: 'Ancient Greece', startYear: -800, endYear: -146 },
  { id: '3', name: 'Ancient Rome', startYear: -753, endYear: 476 },
  { id: '4', name: 'Medieval', startYear: 476, endYear: 1453 },
  { id: '5', name: 'Renaissance', startYear: 1300, endYear: 1700 },
  { id: '6', name: 'Victorian', startYear: 1837, endYear: 1901 },
  { id: '7', name: 'Modern', startYear: 1901, endYear: 2023 },
];

// Add historical recipe locations
const HISTORICAL_RECIPES = [
  {
    id: 'roman-honey-cake',
    name: 'Roman Honey Cake',
    era: 'Ancient Rome',
    coordinates: { latitude: 41.9028, longitude: 12.4964 }, // Rome
    year: '100 CE',
  },
  {
    id: 'medieval-meat-pie',
    name: 'Medieval Meat Pie',
    era: 'Medieval',
    coordinates: { latitude: 51.5074, longitude: -0.1278 }, // London
    year: '1400 CE',
  },
  {
    id: 'renaissance-risotto',
    name: 'Renaissance Risotto',
    era: 'Renaissance',
    coordinates: { latitude: 45.4642, longitude: 9.1900 }, // Milan
    year: '1500 CE',
  },
];

const ExploreScreen: React.FC<ExploreScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState({
    ingredients: [] as string[],
    dietary: [] as string[],
    cookingTime: null as string | null,
    popularity: null as string | null,
  });
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  
  const { currentTheme } = useTheme();
  const { recipes } = useRecipes();
  
  const handleSelectEra = (era: string) => {
    setSelectedEra(era);
  };
  
  const handleSearch = () => {
    // Implementation for search functionality
    console.log('Searching for:', searchQuery, 'with filters:', activeFilters);
  };
  
  const handleRandomRecipe = () => {
    // Time capsule randomizer implementation
    console.log('Finding a random recipe from history');
  };

  const handleRecipePress = (recipeId: string) => {
    navigation.navigate('RecipeDetail', { recipeId });
  };

  const handleMapRecipePress = (recipeId: string) => {
    setSelectedRecipe(recipeId);
  };

  const handleViewRecipeDetails = (recipeId: string) => {
    navigation.navigate('RecipeDetail', { recipeId });
  };
  
  const renderTrendingRecipe = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.trendingCard,
        {
          backgroundColor: COLORS?.card || '#ffffff',
          borderColor: COLORS?.border || '#e0e0e0',
        }
      ]}
      onPress={() => handleRecipePress(item.id)}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.recipeImage}
        defaultSource={require('../../assets/placeholder.png')}
      />
      <View style={styles.recipeInfo}>
        <Text style={[styles.recipeName, { color: COLORS?.text || '#2c3e50' }]}>
          {item.name}
        </Text>
        <View style={styles.recipeDetailRow}>
          <Text style={[styles.eraTag, { backgroundColor: (COLORS?.primary || '#3498db') + '20' }]}>
            {item.era}
          </Text>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={14} color={COLORS?.lightText || '#7f8c8d'} />
            <Text style={[styles.timeText, { color: COLORS?.lightText || '#7f8c8d' }]}>
              {item.cookingTime} min
            </Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={`star-${star}`}
              name={star <= Math.floor(item.popularity) ? "star" : "star-outline"}
              size={16}
              color={COLORS?.secondary || '#2ecc71'}
            />
          ))}
          <Text style={[styles.ratingText, { color: COLORS?.lightText || '#7f8c8d' }]}>
            {item.popularity}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  const renderFilterChip = (
    label: string,
    isActive: boolean,
    onPress: () => void
  ) => (
    <TouchableOpacity
      style={[
        styles.filterChip,
        {
          backgroundColor: isActive 
            ? COLORS?.primary || '#3498db' 
            : 'transparent',
          borderColor: COLORS?.border || '#e0e0e0',
        }
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.filterChipText,
          {
            color: isActive
              ? '#ffffff'
              : COLORS?.text || '#2c3e50',
          }
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
  
  const renderHistoricalLocation = ({ item }: { item: typeof HISTORICAL_RECIPES[0] }) => (
    <TouchableOpacity
      style={[
        styles.locationCard,
        { backgroundColor: COLORS?.card || '#ffffff' }
      ]}
      onPress={() => handleRecipePress(item.id)}
    >
      <View style={styles.locationHeader}>
        <Text style={[styles.locationName, { color: COLORS?.text || '#2c3e50' }]}>
          {item.name}
        </Text>
        <Text style={[styles.locationEra, { color: COLORS?.primary || '#3498db' }]}>
          {item.era}
        </Text>
      </View>
      <View style={styles.locationDetails}>
        <View style={styles.locationInfo}>
          <Ionicons name="location" size={16} color={COLORS?.accent || '#e74c3c'} />
          <Text style={[styles.locationText, { color: COLORS?.lightText || '#7f8c8d' }]}>
            {Math.abs(item.coordinates.latitude).toFixed(2)}°{item.coordinates.latitude >= 0 ? 'N' : 'S'}, {' '}
            {Math.abs(item.coordinates.longitude).toFixed(2)}°{item.coordinates.longitude >= 0 ? 'E' : 'W'}
          </Text>
        </View>
        <View style={styles.locationInfo}>
          <Ionicons name="calendar" size={16} color={COLORS?.secondary || '#2ecc71'} />
          <Text style={[styles.locationText, { color: COLORS?.lightText || '#7f8c8d' }]}>
            {item.year}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: COLORS?.background || '#f8f9fa' }]}>
      <ScrollView>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchBar,
              { 
                backgroundColor: COLORS?.card || '#ffffff',
                borderColor: COLORS?.border || '#e0e0e0',
              }
            ]}
          >
            <Ionicons
              name="search"
              size={20}
              color={COLORS?.lightText || '#7f8c8d'}
              style={styles.searchIcon}
            />
            <TextInput
              style={[styles.searchInput, { color: COLORS?.text || '#2c3e50' }]}
              placeholder="Search historical recipes..."
              placeholderTextColor={COLORS?.lightText || '#7f8c8d'}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={COLORS?.lightText || '#7f8c8d'}
                />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={[
              styles.randomButton,
              { backgroundColor: COLORS?.primary || '#3498db' }
            ]}
            onPress={handleRandomRecipe}
          >
            <Ionicons name="dice" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
        
        {/* Era Timeline Selector */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: COLORS?.text || '#2c3e50' }]}>
            Travel Through Time
          </Text>
          <EraSelector
            eras={ERAS}
            selectedEra={selectedEra}
            onSelectEra={handleSelectEra}
          />
        </View>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {renderFilterChip('< 30 mins', activeFilters.cookingTime === '< 30 mins', 
            () => setActiveFilters({...activeFilters, cookingTime: '< 30 mins'}))}
          {renderFilterChip('< 60 mins', activeFilters.cookingTime === '< 60 mins', 
            () => setActiveFilters({...activeFilters, cookingTime: '< 60 mins'}))}
          {renderFilterChip('Vegetarian', activeFilters.dietary.includes('vegetarian'),
            () => {
              const newDietary = [...activeFilters.dietary];
              const index = newDietary.indexOf('vegetarian');
              if (index >= 0) {
                newDietary.splice(index, 1);
              } else {
                newDietary.push('vegetarian');
              }
              setActiveFilters({...activeFilters, dietary: newDietary});
            })}
          {renderFilterChip('Gluten-Free', activeFilters.dietary.includes('gluten-free'),
            () => {
              const newDietary = [...activeFilters.dietary];
              const index = newDietary.indexOf('gluten-free');
              if (index >= 0) {
                newDietary.splice(index, 1);
              } else {
                newDietary.push('gluten-free');
              }
              setActiveFilters({...activeFilters, dietary: newDietary});
            })}
          {renderFilterChip('4★+', activeFilters.popularity === '4+',
            () => setActiveFilters({...activeFilters, popularity: '4+'}))}
        </ScrollView>
        
        {/* Recipe of the Day */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: COLORS?.text || '#2c3e50' }]}>
            Recipe of the Day
          </Text>
          <TouchableOpacity
            style={[
              styles.recipeOfDay,
              { 
                backgroundColor: COLORS?.card || '#ffffff',
                borderColor: COLORS?.border || '#e0e0e0',
              }
            ]}
            onPress={() => handleRecipePress('recipe-of-day-id')}
          >
            <Image
              source={{ uri: 'https://example.com/recipe-of-day.jpg' }}
              style={styles.recipeOfDayImage}
              defaultSource={require('../../assets/placeholder.png')}
            />
            <View style={styles.recipeOfDayOverlay}>
              <Text style={styles.recipeOfDayTitle}>
                Ancient Greek Kykeon
              </Text>
              <Text style={styles.recipeOfDaySubtitle}>
                A traditional barley drink from 800 BCE
              </Text>
              <View style={styles.recipeOfDayButton}>
                <Text style={styles.recipeOfDayButtonText}>
                  Explore Recipe
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
        {/* Trending Now */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: COLORS?.text || '#2c3e50' }]}>
            Trending Now
          </Text>
          <FlatList
            data={TRENDING_RECIPES}
            renderItem={renderTrendingRecipe}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingList}
            snapToInterval={width * 0.75 + 16}
            decelerationRate="fast"
          />
        </View>
        
        {/* Historical Locations */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: COLORS?.text || '#2c3e50' }]}>
            Historical Origins
          </Text>
          <View style={styles.locationsGrid}>
            {HISTORICAL_RECIPES.map((item) => (
              <View key={item.id} style={styles.locationCardWrapper}>
                {renderHistoricalLocation({ item })}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  randomButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersContent: {
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  recipeOfDay: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    height: 200,
  },
  recipeOfDayImage: {
    width: '100%',
    height: '100%',
  },
  recipeOfDayOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
  },
  recipeOfDayTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recipeOfDaySubtitle: {
    color: 'white',
    fontSize: 14,
    marginBottom: 12,
  },
  recipeOfDayButton: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  recipeOfDayButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },
  trendingList: {
    paddingRight: 16,
  },
  trendingCard: {
    width: width * 0.75,
    borderRadius: 12,
    marginRight: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
    height: 140,
  },
  recipeInfo: {
    padding: 12,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recipeDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
  },
  eraTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
  },
  locationsGrid: {
    flexDirection: 'column',
    padding: 16,
  },
  locationCardWrapper: {
    width: '100%',
  },
  locationCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  locationHeader: {
    marginBottom: 8,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationEra: {
    fontSize: 14,
    fontWeight: '500',
  },
  locationDetails: {
    gap: 8,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    fontSize: 14,
  },
});

export default ExploreScreen; 