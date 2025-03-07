import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../navigation/AppNavigator';
import CreateContentModal from '../components/CreateContentModal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommunityStackParamList } from '../navigation/AppNavigator';
import communityService, { Discussion, Challenge } from '../services/communityService';

const CommunityScreen = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigation = useNavigation<NativeStackNavigationProp<CommunityStackParamList>>();

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const [discussionsData, challengesData] = await Promise.all([
        communityService.getDiscussions(),
        communityService.getChallenges(),
      ]);
      setDiscussions(discussionsData);
      setChallenges(challengesData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load content. Please try again.');
    }
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await fetchData();
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, [fetchData]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await fetchData();
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchData]);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleContentCreated = () => {
    handleRefresh();
  };

  const renderDiscussionItem = ({ item }: { item: Discussion }) => (
    <TouchableOpacity
      style={[
        styles.discussionCard,
        {
          backgroundColor: COLORS?.card || '#ffffff',
          borderColor: COLORS?.border || '#e0e0e0',
        },
      ]}
      onPress={() => navigation.navigate('DiscussionDetail', { discussionId: item.id })}
    >
      <View style={styles.discussionHeader}>
        <Text style={[styles.discussionTitle, { color: COLORS?.text || '#2c3e50' }]}>
          {item.title}
        </Text>
        <Text style={[styles.discussionMeta, { color: COLORS?.lightText || '#7f8c8d' }]}>
          by {item.author.name} • {item.timestamp}
        </Text>
      </View>
      <View style={styles.discussionFooter}>
        <View style={styles.tagContainer}>
          {item.tags.map((tag) => (
            <View
              key={tag}
              style={[
                styles.tag,
                { backgroundColor: (COLORS?.primary || '#3498db') + '20' },
              ]}
            >
              <Text style={[styles.tagText, { color: COLORS?.primary || '#3498db' }]}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.statsContainer}>
          <Ionicons name="chatbubble-outline" size={16} color={COLORS?.lightText || '#7f8c8d'} />
          <Text style={[styles.statsText, { color: COLORS?.lightText || '#7f8c8d' }]}>
            {item.replies}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderChallengeItem = ({ item }: { item: Challenge }) => (
    <TouchableOpacity
      style={[
        styles.challengeCard,
        {
          backgroundColor: COLORS?.card || '#ffffff',
          borderColor: COLORS?.border || '#e0e0e0',
        },
      ]}
      onPress={() => navigation.navigate('ChallengeDetail', { challengeId: item.id })}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.challengeImage}
        defaultSource={require('../../assets/placeholder.png')}
      />
      <View style={styles.challengeInfo}>
        <Text style={[styles.challengeTitle, { color: COLORS?.text || '#2c3e50' }]}>
          {item.title}
        </Text>
        <View style={styles.challengeStats}>
          <View style={styles.statItem}>
            <Ionicons name="people-outline" size={16} color={COLORS?.lightText || '#7f8c8d'} />
            <Text style={[styles.statText, { color: COLORS?.lightText || '#7f8c8d' }]}>
              {item.participants} participants
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={16} color={COLORS?.lightText || '#7f8c8d'} />
            <Text style={[styles.statText, { color: COLORS?.lightText || '#7f8c8d' }]}>
              {Math.ceil((new Date(item.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={COLORS?.primary || '#3498db'} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: COLORS?.background || '#f8f9fa' }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: COLORS?.text || '#2c3e50' }]}>
          Culinary Time Travelers
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: COLORS?.card || '#ffffff',
              borderColor: COLORS?.border || '#e0e0e0',
            },
          ]}
        >
          <Ionicons name="search" size={20} color={COLORS?.lightText || '#7f8c8d'} />
          <TextInput
            style={[styles.searchInput, { color: COLORS?.text || '#2c3e50' }]}
            placeholder="Search discussions..."
            placeholderTextColor={COLORS?.lightText || '#7f8c8d'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'discussions' && {
              borderBottomColor: COLORS?.primary || '#3498db',
              borderBottomWidth: 2,
            },
          ]}
          onPress={() => setActiveTab('discussions')}
        >
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === 'discussions'
                    ? COLORS?.primary || '#3498db'
                    : COLORS?.lightText || '#7f8c8d',
              },
            ]}
          >
            Discussions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'challenges' && {
              borderBottomColor: COLORS?.primary || '#3498db',
              borderBottomWidth: 2,
            },
          ]}
          onPress={() => setActiveTab('challenges')}
        >
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === 'challenges'
                    ? COLORS?.primary || '#3498db'
                    : COLORS?.lightText || '#7f8c8d',
              },
            ]}
          >
            Challenges
          </Text>
        </TouchableOpacity>
      </View>

      {/* Error Message */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: COLORS?.error || '#e74c3c' }]}>
            {error}
          </Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: COLORS?.primary || '#3498db' }]}
            onPress={handleRefresh}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Content */}
      {activeTab === 'discussions' ? (
        <FlatList
          data={discussions}
          renderItem={renderDiscussionItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={[COLORS?.primary || '#3498db']}
            />
          }
        />
      ) : (
        <FlatList
          data={challenges}
          renderItem={renderChallengeItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={[COLORS?.primary || '#3498db']}
            />
          }
        />
      )}

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: COLORS?.primary || '#3498db' }]}
        onPress={handleOpenModal}
      >
        <Ionicons name="add" size={24} color="#ffffff" />
      </TouchableOpacity>

      {/* Creation Modal */}
      <CreateContentModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        type={activeTab === 'discussions' ? 'discussion' : 'challenge'}
        onSuccess={handleContentCreated}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
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
  discussionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  discussionHeader: {
    marginBottom: 12,
  },
  discussionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  discussionMeta: {
    fontSize: 12,
  },
  discussionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    marginLeft: 4,
    fontSize: 12,
  },
  challengeCard: {
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  challengeImage: {
    width: '100%',
    height: 150,
  },
  challengeInfo: {
    padding: 16,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  challengeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 4,
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    backgroundColor: '#fdeaea',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
    marginBottom: 12,
  },
  retryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default CommunityScreen; 