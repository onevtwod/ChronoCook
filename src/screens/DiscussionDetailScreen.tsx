import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { CommunityStackParamList } from '../navigation/AppNavigator';

type DiscussionDetailScreenNavigationProp = NativeStackNavigationProp<
  CommunityStackParamList,
  'DiscussionDetail'
>;

type DiscussionDetailScreenRouteProp = RouteProp<
  CommunityStackParamList,
  'DiscussionDetail'
>;

interface DiscussionDetailScreenProps {
  navigation: DiscussionDetailScreenNavigationProp;
  route: DiscussionDetailScreenRouteProp;
}

// Mock discussion data
const DISCUSSION_DATA = {
  id: '1',
  title: 'Authentic Roman Garum Recipe?',
  author: {
    name: 'Marcus',
    avatar: 'https://example.com/avatar1.jpg',
    level: 15,
  },
  content: 'I\'ve been researching ancient Roman garum recipes and found conflicting information. Some sources suggest using mackerel, others anchovies. What do historical records actually show about the authentic preparation method?',
  timestamp: '2h ago',
  replies: [
    {
      id: '1',
      author: {
        name: 'Julia',
        avatar: 'https://example.com/avatar2.jpg',
        level: 23,
      },
      content: 'According to Apicius, the most common fish used were mackerel, tuna, and moray eel. The key was using fish rich in blood and innards.',
      timestamp: '1h ago',
      likes: 12,
    },
    {
      id: '2',
      author: {
        name: 'Claudius',
        avatar: 'https://example.com/avatar3.jpg',
        level: 18,
      },
      content: 'I\'ve successfully recreated garum using anchovies. The fermentation process takes about 3-4 months in Mediterranean climate.',
      timestamp: '45m ago',
      likes: 8,
    },
  ],
  tags: ['recipe-help', 'ancient-rome', 'fermentation'],
};

const DiscussionDetailScreen: React.FC<DiscussionDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const [replyText, setReplyText] = useState('');
  const { discussionId } = route.params;

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      // Add reply logic here
      setReplyText('');
    }
  };

  const renderReply = (reply: typeof DISCUSSION_DATA.replies[0]) => (
    <View
      key={reply.id}
      style={[
        styles.replyContainer,
        { backgroundColor: COLORS?.card || '#ffffff' },
      ]}
    >
      <View style={styles.replyHeader}>
        <View style={styles.authorInfo}>
          <Image
            source={{ uri: reply.author.avatar }}
            style={styles.avatar}
            defaultSource={require('../../assets/placeholder.png')}
          />
          <View>
            <Text style={[styles.authorName, { color: COLORS?.text || '#2c3e50' }]}>
              {reply.author.name}
            </Text>
            <Text style={[styles.authorLevel, { color: COLORS?.primary || '#3498db' }]}>
              Level {reply.author.level}
            </Text>
          </View>
        </View>
        <Text style={[styles.timestamp, { color: COLORS?.lightText || '#7f8c8d' }]}>
          {reply.timestamp}
        </Text>
      </View>
      <Text style={[styles.replyContent, { color: COLORS?.text || '#2c3e50' }]}>
        {reply.content}
      </Text>
      <View style={styles.replyFooter}>
        <TouchableOpacity style={styles.likeButton}>
          <Ionicons
            name="heart-outline"
            size={20}
            color={COLORS?.accent || '#e74c3c'}
          />
          <Text style={[styles.likeCount, { color: COLORS?.lightText || '#7f8c8d' }]}>
            {reply.likes}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: COLORS?.background || '#f8f9fa' }]}>
      <ScrollView>
        {/* Discussion Header */}
        <View style={[styles.headerContainer, { backgroundColor: COLORS?.card || '#ffffff' }]}>
          <View style={styles.authorInfo}>
            <Image
              source={{ uri: DISCUSSION_DATA.author.avatar }}
              style={styles.avatar}
              defaultSource={require('../../assets/placeholder.png')}
            />
            <View>
              <Text style={[styles.authorName, { color: COLORS?.text || '#2c3e50' }]}>
                {DISCUSSION_DATA.author.name}
              </Text>
              <Text style={[styles.authorLevel, { color: COLORS?.primary || '#3498db' }]}>
                Level {DISCUSSION_DATA.author.level}
              </Text>
            </View>
          </View>
          <Text style={[styles.timestamp, { color: COLORS?.lightText || '#7f8c8d' }]}>
            {DISCUSSION_DATA.timestamp}
          </Text>
        </View>

        {/* Discussion Content */}
        <View style={[styles.contentContainer, { backgroundColor: COLORS?.card || '#ffffff' }]}>
          <Text style={[styles.title, { color: COLORS?.text || '#2c3e50' }]}>
            {DISCUSSION_DATA.title}
          </Text>
          <Text style={[styles.content, { color: COLORS?.text || '#2c3e50' }]}>
            {DISCUSSION_DATA.content}
          </Text>
          <View style={styles.tagsContainer}>
            {DISCUSSION_DATA.tags.map((tag) => (
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
        </View>

        {/* Replies */}
        <View style={styles.repliesContainer}>
          <Text style={[styles.repliesTitle, { color: COLORS?.text || '#2c3e50' }]}>
            Replies ({DISCUSSION_DATA.replies.length})
          </Text>
          {DISCUSSION_DATA.replies.map(renderReply)}
        </View>
      </ScrollView>

      {/* Reply Input */}
      <View style={[styles.replyInputContainer, { backgroundColor: COLORS?.card || '#ffffff' }]}>
        <TextInput
          style={[
            styles.replyInput,
            {
              backgroundColor: COLORS?.background || '#f8f9fa',
              color: COLORS?.text || '#2c3e50',
            },
          ]}
          placeholder="Add a reply..."
          placeholderTextColor={COLORS?.lightText || '#7f8c8d'}
          multiline
          value={replyText}
          onChangeText={setReplyText}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            {
              backgroundColor:
                replyText.trim() ? COLORS?.primary || '#3498db' : COLORS?.border || '#e0e0e0',
            },
          ]}
          onPress={handleSubmitReply}
          disabled={!replyText.trim()}
        >
          <Ionicons name="send" size={20} color="#ffffff" />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS?.border || '#e0e0e0',
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
  contentContainer: {
    padding: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  repliesContainer: {
    padding: 16,
  },
  repliesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  replyContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  replyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  replyContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  replyFooter: {
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
  replyInputContainer: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS?.border || '#e0e0e0',
  },
  replyInput: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    minHeight: 40,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DiscussionDetailScreen; 