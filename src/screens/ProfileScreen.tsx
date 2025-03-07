import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../navigation/AppNavigator';

// Mock user data
const USER_DATA = {
  name: 'Isabella',
  title: 'Renaissance Chef',
  level: 15,
  experience: 2750,
  nextLevel: 3000,
  avatar: 'https://example.com/user-avatar.jpg',
  badges: [
    {
      id: '1',
      name: 'Iron Age Chef',
      icon: '🏺',
      description: 'Completed 5 ancient recipes',
    },
    {
      id: '2',
      name: 'Time Traveler',
      icon: '⏳',
      description: 'Cooked from 3 different eras',
    },
    {
      id: '3',
      name: 'Medieval Master',
      icon: '🏰',
      description: 'Top contributor in Medieval recipes',
    },
  ],
  stats: {
    recipesCooked: 47,
    erasMastered: 3,
    totalLikes: 156,
    followers: 89,
  },
};

// Mock activity data
const ACTIVITIES = [
  {
    id: '1',
    type: 'recipe',
    title: 'Cooked Roman Honey Cake',
    timestamp: '2h ago',
    era: 'Ancient Rome',
    likes: 12,
  },
  {
    id: '2',
    type: 'badge',
    title: 'Earned Medieval Master Badge',
    timestamp: '1d ago',
    icon: '🏰',
  },
  {
    id: '3',
    type: 'challenge',
    title: 'Completed Renaissance Week Challenge',
    timestamp: '3d ago',
    position: '2nd place',
  },
];

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('timeline');

  const renderBadge = ({ item }: { item: any }) => (
    <View
      style={[
        styles.badgeCard,
        {
          backgroundColor: COLORS?.card || '#ffffff',
          borderColor: COLORS?.border || '#e0e0e0',
        },
      ]}
    >
      <Text style={styles.badgeIcon}>{item.icon}</Text>
      <Text style={[styles.badgeName, { color: COLORS?.text || '#2c3e50' }]}>
        {item.name}
      </Text>
      <Text style={[styles.badgeDescription, { color: COLORS?.lightText || '#7f8c8d' }]}>
        {item.description}
      </Text>
    </View>
  );

  const renderActivity = ({ item }: { item: any }) => (
    <View
      style={[
        styles.activityCard,
        {
          backgroundColor: COLORS?.card || '#ffffff',
          borderColor: COLORS?.border || '#e0e0e0',
        },
      ]}
    >
      <View style={styles.activityHeader}>
        <View style={styles.activityIconContainer}>
          {item.type === 'recipe' && (
            <Ionicons name="restaurant" size={20} color={COLORS?.primary || '#3498db'} />
          )}
          {item.type === 'badge' && (
            <Text style={styles.activityIcon}>{item.icon}</Text>
          )}
          {item.type === 'challenge' && (
            <Ionicons name="trophy" size={20} color={COLORS?.secondary || '#2ecc71'} />
          )}
        </View>
        <View style={styles.activityContent}>
          <Text style={[styles.activityTitle, { color: COLORS?.text || '#2c3e50' }]}>
            {item.title}
          </Text>
          <Text style={[styles.activityMeta, { color: COLORS?.lightText || '#7f8c8d' }]}>
            {item.timestamp}
          </Text>
        </View>
      </View>
      {item.type === 'recipe' && (
        <View style={styles.activityFooter}>
          <View style={styles.eraTag}>
            <Text style={[styles.eraText, { color: COLORS?.primary || '#3498db' }]}>
              {item.era}
            </Text>
          </View>
          <View style={styles.likesContainer}>
            <Ionicons name="heart" size={16} color={COLORS?.accent || '#e74c3c'} />
            <Text style={[styles.likesText, { color: COLORS?.lightText || '#7f8c8d' }]}>
              {item.likes}
            </Text>
          </View>
        </View>
      )}
      {item.type === 'challenge' && (
        <View style={styles.activityFooter}>
          <View style={styles.positionTag}>
            <Text style={[styles.positionText, { color: COLORS?.secondary || '#2ecc71' }]}>
              {item.position}
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: COLORS?.background || '#f8f9fa' }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: USER_DATA.avatar }}
              style={styles.avatar}
              defaultSource={require('../../assets/placeholder.png')}
            />
            <TouchableOpacity
              style={[
                styles.editButton,
                { backgroundColor: COLORS?.primary || '#3498db' },
              ]}
            >
              <Ionicons name="camera" size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.userName, { color: COLORS?.text || '#2c3e50' }]}>
            {USER_DATA.name}
          </Text>
          <Text style={[styles.userTitle, { color: COLORS?.primary || '#3498db' }]}>
            {USER_DATA.title}
          </Text>
          
          {/* Level Progress */}
          <View style={styles.levelContainer}>
            <Text style={[styles.levelText, { color: COLORS?.text || '#2c3e50' }]}>
              Level {USER_DATA.level}
            </Text>
            <View
              style={[
                styles.progressBar,
                { backgroundColor: (COLORS?.primary || '#3498db') + '20' },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: COLORS?.primary || '#3498db',
                    width: `${(USER_DATA.experience / USER_DATA.nextLevel) * 100}%`,
                  },
                ]}
              />
            </View>
            <Text style={[styles.experienceText, { color: COLORS?.lightText || '#7f8c8d' }]}>
              {USER_DATA.experience} / {USER_DATA.nextLevel} XP
            </Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View
            style={[
              styles.statCard,
              { backgroundColor: COLORS?.card || '#ffffff' },
            ]}
          >
            <Text style={[styles.statValue, { color: COLORS?.text || '#2c3e50' }]}>
              {USER_DATA.stats.recipesCooked}
            </Text>
            <Text style={[styles.statLabel, { color: COLORS?.lightText || '#7f8c8d' }]}>
              Recipes
            </Text>
          </View>
          <View
            style={[
              styles.statCard,
              { backgroundColor: COLORS?.card || '#ffffff' },
            ]}
          >
            <Text style={[styles.statValue, { color: COLORS?.text || '#2c3e50' }]}>
              {USER_DATA.stats.erasMastered}
            </Text>
            <Text style={[styles.statLabel, { color: COLORS?.lightText || '#7f8c8d' }]}>
              Eras
            </Text>
          </View>
          <View
            style={[
              styles.statCard,
              { backgroundColor: COLORS?.card || '#ffffff' },
            ]}
          >
            <Text style={[styles.statValue, { color: COLORS?.text || '#2c3e50' }]}>
              {USER_DATA.stats.followers}
            </Text>
            <Text style={[styles.statLabel, { color: COLORS?.lightText || '#7f8c8d' }]}>
              Followers
            </Text>
          </View>
          <View
            style={[
              styles.statCard,
              { backgroundColor: COLORS?.card || '#ffffff' },
            ]}
          >
            <Text style={[styles.statValue, { color: COLORS?.text || '#2c3e50' }]}>
              {USER_DATA.stats.totalLikes}
            </Text>
            <Text style={[styles.statLabel, { color: COLORS?.lightText || '#7f8c8d' }]}>
              Likes
            </Text>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'timeline' && {
                borderBottomColor: COLORS?.primary || '#3498db',
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => setActiveTab('timeline')}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === 'timeline'
                      ? COLORS?.primary || '#3498db'
                      : COLORS?.lightText || '#7f8c8d',
                },
              ]}
            >
              Timeline
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'badges' && {
                borderBottomColor: COLORS?.primary || '#3498db',
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => setActiveTab('badges')}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === 'badges'
                      ? COLORS?.primary || '#3498db'
                      : COLORS?.lightText || '#7f8c8d',
                },
              ]}
            >
              Badges
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.content}>
          {activeTab === 'timeline' ? (
            <FlatList
              key="timeline"
              data={ACTIVITIES}
              renderItem={renderActivity}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <FlatList
              key="badges"
              data={USER_DATA.badges}
              renderItem={renderBadge}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.badgeRow}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>

      {/* Settings Button */}
      <TouchableOpacity
        style={[styles.settingsButton, { backgroundColor: COLORS?.card || '#ffffff' }]}
      >
        <Ionicons name="settings-outline" size={24} color={COLORS?.text || '#2c3e50'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userTitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  levelContainer: {
    width: '100%',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  experienceText: {
    fontSize: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    margin: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 16,
  },
  activityCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIcon: {
    fontSize: 24,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  activityMeta: {
    fontSize: 12,
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  eraTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eraText: {
    fontSize: 12,
    fontWeight: '500',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    marginLeft: 4,
    fontSize: 12,
  },
  positionTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  positionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  badgeRow: {
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  badgeDescription: {
    fontSize: 12,
    textAlign: 'center',
  },
  settingsButton: {
    position: 'absolute',
    top: 24,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen; 