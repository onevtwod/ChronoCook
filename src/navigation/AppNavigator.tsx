import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Platform, TextStyle } from 'react-native';

import RecipeLibraryScreen from '../screens/RecipeLibraryScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import ExploreScreen from '../screens/ExploreScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DiscussionDetailScreen from '../screens/DiscussionDetailScreen';
import ChallengeDetailScreen from '../screens/ChallengeDetailScreen';
import { useTheme } from '../contexts/ThemeContext';
import EraSelector from '../components/EraSelector';

// Define the types for our navigation stacks
export type RecipeStackParamList = {
  RecipeLibrary: undefined;
  RecipeDetail: { recipeId: string };
};

export type ExploreStackParamList = {
  ExploreMain: undefined;
  RecipeDetail: { recipeId: string };
};

export type CommunityStackParamList = {
  CommunityHome: undefined;
  DiscussionDetail: { discussionId: string };
  ChallengeDetail: { challengeId: string };
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
};

export type RootTabParamList = {
  Recipes: undefined;
  Explore: undefined;
  Community: undefined;
  Profile: undefined;
};

// Colors palette
export const COLORS = {
  primary: '#3498db',       // Blue
  secondary: '#2ecc71',     // Green
  accent: '#e74c3c',        // Red
  background: '#f8f9fa',    // Light Gray
  card: '#ffffff',          // White
  text: '#2c3e50',          // Dark Blue/Gray
  lightText: '#7f8c8d',     // Gray
  border: '#e0e0e0',        // Light Gray
  shadow: '#000000',        // Black (for shadows)
  error: '#e74c3c',
};

// Create the navigators
const RecipeStack = createStackNavigator<RecipeStackParamList>();
const ExploreStack = createStackNavigator<ExploreStackParamList>();
const CommunityStack = createNativeStackNavigator<CommunityStackParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

// Common header options
const commonHeaderOptions = {
  headerStyle: {
    backgroundColor: COLORS?.primary || '#3498db',
    height: Platform.OS === 'ios' ? 96 : 68, // Increased height for both platforms
    borderBottomWidth: 1,
    borderBottomColor: COLORS?.border || '#e0e0e0',
    elevation: 2,
    shadowColor: COLORS?.shadow || '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitleStyle: {
    fontSize: 20,
    fontWeight: '600' as TextStyle['fontWeight'],
    marginBottom: 8, // Add bottom margin to the title
  },
  headerTitleAlign: 'center' as const,
  headerTintColor: '#ffffff',
  headerLeftContainerStyle: {
    paddingLeft: 16,
    paddingBottom: 8, // Add bottom padding to left container
  },
  headerRightContainerStyle: {
    paddingRight: 16,
    paddingBottom: 8, // Add bottom padding to right container
  },
  headerTitleContainerStyle: {
    paddingBottom: 8, // Add bottom padding to title container
  },
};

// Recipe Stack Navigator
const RecipeStackNavigator = () => {
  return (
    <RecipeStack.Navigator screenOptions={commonHeaderOptions}>
      <RecipeStack.Screen
        name="RecipeLibrary"
        component={RecipeLibraryScreen}
        options={{ 
          title: 'Historical Recipes',
        }}
      />
      <RecipeStack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{ 
          title: 'Recipe',
        }}
      />
    </RecipeStack.Navigator>
  );
};

// Explore Stack Navigator
const ExploreStackNavigator = () => {
  return (
    <ExploreStack.Navigator screenOptions={commonHeaderOptions}>
      <ExploreStack.Screen
        name="ExploreMain"
        component={ExploreScreen}
        options={{ 
          title: 'Explore History',
        }}
      />
      <ExploreStack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{ 
          title: 'Recipe',
        }}
      />
    </ExploreStack.Navigator>
  );
};

// Community Stack Navigator
const CommunityStackNavigator = () => {
  return (
    <CommunityStack.Navigator screenOptions={commonHeaderOptions}>
      <CommunityStack.Screen
        name="CommunityHome"
        component={CommunityScreen}
        options={{
          title: 'Community',
        }}
      />
      <CommunityStack.Screen
        name="DiscussionDetail"
        component={DiscussionDetailScreen}
        options={{
          title: 'Discussion',
        }}
      />
      <CommunityStack.Screen
        name="ChallengeDetail"
        component={ChallengeDetailScreen}
        options={{
          title: 'Challenge',
        }}
      />
    </CommunityStack.Navigator>
  );
};

// Profile Stack Navigator
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={commonHeaderOptions}>
      <ProfileStack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{ 
          title: 'Your Chronicle',
        }}
      />
    </ProfileStack.Navigator>
  );
};

// Main Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Recipes') {
            iconName = 'restaurant';
          } else if (route.name === 'Explore') {
            iconName = 'compass';
          } else if (route.name === 'Community') {
            iconName = 'people';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else {
            iconName = 'home'; // Default icon
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS?.primary || '#3498db',
        tabBarInactiveTintColor: COLORS?.lightText || '#7f8c8d',
        tabBarStyle: {
          height: 60,
          paddingTop: 5,
          paddingBottom: 20,
          borderTopWidth: 1,
          borderTopColor: COLORS?.border || '#e0e0e0',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Recipes" component={RecipeStackNavigator} />
      <Tab.Screen name="Explore" component={ExploreStackNavigator} />
      <Tab.Screen name="Community" component={CommunityStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

// Main App Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator; 