import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { CommunityStackParamList } from '../navigation/AppNavigator';

type ChallengeDetailScreenNavigationProp = NativeStackNavigationProp<
  CommunityStackParamList,
  'ChallengeDetail'
>;

type ChallengeDetailScreenRouteProp = RouteProp<
  CommunityStackParamList,
  'ChallengeDetail'
>;

interface ChallengeDetailScreenProps {
  navigation: ChallengeDetailScreenNavigationProp;
  route: ChallengeDetailScreenRouteProp;
}

// Mock challenge data
const CHALLENGE_DATA = {
  id: '1',
  title: 'Medieval Bread Making Challenge',
  description: 'Create an authentic medieval bread recipe using only period-accurate ingredients and techniques. Document your process and share your results!',
  startDate: '2024-03-01',
  endDate: '2024-03-31',
  participants: 128,
  prize: '500 XP + Medieval Baker Badge',
  rules: [
    'Use only ingredients available in medieval Europe',
    'No modern equipment (e.g., electric mixers)',
    'Document each step with photos',
    'Include historical references for your recipe',
  ],
  submissions: [
    {
      id: '1',
      author: {
        name: 'Eleanor',
        avatar: 'https://example.com/avatar1.jpg',
        level: 25,
      },
      title: 'Rye Bread with Honey',
      description: 'Based on a 13th-century monastery recipe...',
      image: 'https://example.com/submission1.jpg',
      likes: 45,
      timestamp: '2d ago',
    },
    {
      id: '2',
      author: {
        name: 'William',
        avatar: 'https://example.com/avatar2.jpg',
        level: 18,
      },
      title: 'Barley and Wheat Mixed Loaf',
      description: 'Recreated from English manor records...',
      image: 'https://example.com/submission2.jpg',
      likes: 32,
      timestamp: '1d ago',
    },
  ],
};

const ChallengeDetailScreen: React.FC<ChallengeDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const [commentText, setCommentText] = useState('');
  const { challengeId } = route.params;

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      // Add comment logic here
      setCommentText('');
    }
  };

  const renderSubmission = (submission: typeof CHALLENGE_DATA.submissions[0]) => (
    <View
      key={submission.id}
      style={[styles.submissionContainer, { backgroundColor: COLORS?.card || '#ffffff' }]}
    >
      <View style={styles.submissionHeader}>
        <View style={styles.authorInfo}>
          <Image
            source={{ uri: submission.author.avatar }}
            style={styles.avatar}
            defaultSource={require('../../assets/placeholder.png')}
          />
          <View>
            <Text style={[styles.authorName, { color: COLORS?.text || '#2c3e50' }]}>
              {submission.author.name}
            </Text>
            <Text style={[styles.authorLevel, { color: COLORS?.primary || '#3498db' }]}>
              Level {submission.author.level}
            </Text>
          </View>
        </View>
        <Text style={[styles.timestamp, { color: COLORS?.lightText || '#7f8c8d' }]}>
          {submission.timestamp}
        </Text>
      </View>
      <Text style={[styles.submissionTitle, { color: COLORS?.text || '#2c3e50' }]}>
        {submission.title}
      </Text>
      <Text style={[styles.submissionDescription, { color: COLORS?.text || '#2c3e50' }]}>
        {submission.description}
      </Text>
      <Image
        source={{ uri: submission.image }}
        style={styles.submissionImage}
        defaultSource={require('../../assets/placeholder.png')}
      />
      <View style={styles.submissionFooter}>
        <TouchableOpacity style={styles.likeButton}>
          <Ionicons
            name="heart-outline"
            size={20}
            color={COLORS?.accent || '#e74c3c'}
          />
          <Text style={[styles.likeCount, { color: COLORS?.lightText || '#7f8c8d' }]}>
            {submission.likes}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: COLORS?.background || '#f8f9fa' }]}>
      <ScrollView>
        {/* Challenge Header */}
        <View style={[styles.headerContainer, { backgroundColor: COLORS?.card || '#ffffff' }]}>
          <Text style={[styles.title, { color: COLORS?.text || '#2c3e50' }]}>
            {CHALLENGE_DATA.title}
          </Text>
          <Text style={[styles.description, { color: COLORS?.text || '#2c3e50' }]}>
            {CHALLENGE_DATA.description}
          </Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color={COLORS?.primary || '#3498db'}
              />
              <Text style={[styles.statText, { color: COLORS?.text || '#2c3e50' }]}>
                {CHALLENGE_DATA.startDate} - {CHALLENGE_DATA.endDate}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons
                name="people-outline"
                size={20}
                color={COLORS?.primary || '#3498db'}
              />
              <Text style={[styles.statText, { color: COLORS?.text || '#2c3e50' }]}>
                {CHALLENGE_DATA.participants} Participants
              </Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons
                name="trophy-outline"
                size={20}
                color={COLORS?.primary || '#3498db'}
              />
              <Text style={[styles.statText, { color: COLORS?.text || '#2c3e50' }]}>
                {CHALLENGE_DATA.prize}
              </Text>
            </View>
          </View>
        </View>

        {/* Challenge Rules */}
        <View style={[styles.rulesContainer, { backgroundColor: COLORS?.card || '#ffffff' }]}>
          <Text style={[styles.rulesTitle, { color: COLORS?.text || '#2c3e50' }]}>
            Challenge Rules
          </Text>
          {CHALLENGE_DATA.rules.map((rule, index) => (
            <View key={index} style={styles.ruleItem}>
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color={COLORS?.primary || '#3498db'}
              />
              <Text style={[styles.ruleText, { color: COLORS?.text || '#2c3e50' }]}>
                {rule}
              </Text>
            </View>
          ))}
        </View>

        {/* Submissions */}
        <View style={styles.submissionsContainer}>
          <Text style={[styles.submissionsTitle, { color: COLORS?.text || '#2c3e50' }]}>
            Recent Submissions
          </Text>
          {CHALLENGE_DATA.submissions.map(renderSubmission)}
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={[styles.submitContainer, { backgroundColor: COLORS?.card || '#ffffff' }]}>
        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: COLORS?.primary || '#3498db' }]}
          onPress={() => {
            // Handle submission navigation
          }}
        >
          <Text style={styles.submitButtonText}>Submit Your Entry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 14,
  },
  rulesContainer: {
    padding: 16,
    marginBottom: 8,
  },
  rulesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  ruleText: {
    fontSize: 14,
    flex: 1,
  },
  submissionsContainer: {
    padding: 16,
  },
  submissionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  submissionContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  submissionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  authorLevel: {
    fontSize: 12,
    marginTop: 2,
  },
  timestamp: {
    fontSize: 12,
  },
  submissionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  submissionDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  submissionImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  submissionFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    marginLeft: 4,
    fontSize: 12,
  },
  submitContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS?.border || '#e0e0e0',
  },
  submitButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChallengeDetailScreen; 