import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Platform,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../navigation/AppNavigator';
import * as ImagePicker from 'expo-image-picker';
import communityService from '../services/communityService';

interface CreateContentModalProps {
  visible: boolean;
  onClose: () => void;
  type: 'discussion' | 'challenge';
  onSuccess?: () => void;
}

const CreateContentModal: React.FC<CreateContentModalProps> = ({
  visible,
  onClose,
  type,
  onSuccess,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [era, setEra] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [endDate, setEndDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission Required',
            'Sorry, we need camera roll permissions to upload images.',
            [{ text: 'OK' }]
          );
        }
      }
    })();
  }, []);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handlePickImage = async () => {
    try {
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please grant camera roll access to upload images.',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Settings',
              onPress: () => {
                // On iOS, this will open the Settings app
                // On Android, this will open app settings
                if (Platform.OS === 'ios') {
                  Linking.openURL('app-settings:');
                } else {
                  Linking.openSettings();
                }
              }
            }
          ]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      setError('Failed to select image. Please try again.');
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setTags([]);
    setTagInput('');
    setEra('');
    setImage(null);
    setEndDate('');
    setError(null);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (type === 'discussion') {
        await communityService.createDiscussion({
          title,
          content,
          tags,
          era,
        });
      } else {
        let imageUrl = image;
        if (image) {
          imageUrl = await communityService.uploadImage(image);
        }

        await communityService.createChallenge({
          title,
          description: content,
          endDate,
          image: imageUrl || undefined,
          tags,
          era,
        });
      }

      resetForm();
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error creating content:', error);
      setError('Failed to create content. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: COLORS?.card || '#ffffff' }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: COLORS?.text || '#2c3e50' }]}>
              Create New {type === 'discussion' ? 'Discussion' : 'Challenge'}
            </Text>
            <TouchableOpacity onPress={onClose} disabled={isSubmitting}>
              <Ionicons name="close" size={24} color={COLORS?.text || '#2c3e50'} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formContainer}>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={[styles.errorText, { color: COLORS?.error || '#e74c3c' }]}>
                  {error}
                </Text>
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: COLORS?.text || '#2c3e50' }]}>Title</Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: COLORS?.background || '#f8f9fa',
                    color: COLORS?.text || '#2c3e50',
                  },
                ]}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title..."
                placeholderTextColor={COLORS?.lightText || '#7f8c8d'}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: COLORS?.text || '#2c3e50' }]}>
                {type === 'discussion' ? 'Discussion' : 'Description'}
              </Text>
              <TextInput
                style={[
                  styles.textArea,
                  { 
                    backgroundColor: COLORS?.background || '#f8f9fa',
                    color: COLORS?.text || '#2c3e50',
                  },
                ]}
                value={content}
                onChangeText={setContent}
                placeholder={`Enter ${type === 'discussion' ? 'discussion' : 'description'}...`}
                placeholderTextColor={COLORS?.lightText || '#7f8c8d'}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: COLORS?.text || '#2c3e50' }]}>Historical Era</Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: COLORS?.background || '#f8f9fa',
                    color: COLORS?.text || '#2c3e50',
                  },
                ]}
                value={era}
                onChangeText={setEra}
                placeholder="e.g., Ancient Rome, Medieval, Renaissance..."
                placeholderTextColor={COLORS?.lightText || '#7f8c8d'}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: COLORS?.text || '#2c3e50' }]}>Tags</Text>
              <View style={styles.tagInputContainer}>
                <TextInput
                  style={[
                    styles.tagInput,
                    { 
                      backgroundColor: COLORS?.background || '#f8f9fa',
                      color: COLORS?.text || '#2c3e50',
                    },
                  ]}
                  value={tagInput}
                  onChangeText={setTagInput}
                  placeholder="Add tags..."
                  placeholderTextColor={COLORS?.lightText || '#7f8c8d'}
                  onSubmitEditing={handleAddTag}
                />
                <TouchableOpacity
                  style={[
                    styles.addTagButton,
                    { backgroundColor: COLORS?.primary || '#3498db' },
                  ]}
                  onPress={handleAddTag}
                >
                  <Ionicons name="add" size={20} color="#ffffff" />
                </TouchableOpacity>
              </View>
              <View style={styles.tagsContainer}>
                {tags.map((tag) => (
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
                    <TouchableOpacity
                      onPress={() => handleRemoveTag(tag)}
                      style={styles.removeTagButton}
                    >
                      <Ionicons
                        name="close-circle"
                        size={16}
                        color={COLORS?.primary || '#3498db'}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>

            {type === 'challenge' && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: COLORS?.text || '#2c3e50' }]}>End Date</Text>
                  <TextInput
                    style={[
                      styles.input,
                      { 
                        backgroundColor: COLORS?.background || '#f8f9fa',
                        color: COLORS?.text || '#2c3e50',
                      },
                    ]}
                    value={endDate}
                    onChangeText={setEndDate}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor={COLORS?.lightText || '#7f8c8d'}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: COLORS?.text || '#2c3e50' }]}>
                    Cover Image
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.imagePickerButton,
                      { backgroundColor: COLORS?.background || '#f8f9fa' },
                    ]}
                    onPress={handlePickImage}
                  >
                    {image ? (
                      <Image source={{ uri: image }} style={styles.previewImage} />
                    ) : (
                      <View style={styles.imagePlaceholder}>
                        <Ionicons
                          name="image-outline"
                          size={32}
                          color={COLORS?.lightText || '#7f8c8d'}
                        />
                        <Text
                          style={[
                            styles.imagePlaceholderText,
                            { color: COLORS?.lightText || '#7f8c8d' },
                          ]}
                        >
                          Select an image
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.cancelButton, { borderColor: COLORS?.border || '#e0e0e0' }]}
              onPress={onClose}
              disabled={isSubmitting}
            >
              <Text
                style={[
                  styles.cancelButtonText,
                  { color: COLORS?.text || '#2c3e50' },
                  isSubmitting && { opacity: 0.5 },
                ]}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.submitButton,
                { backgroundColor: COLORS?.primary || '#3498db' },
                (!title || !content || isSubmitting) && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={!title || !content || isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.submitButtonText}>Create</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minHeight: 100,
  },
  tagInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagInput: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8,
  },
  addTagButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    marginRight: 4,
  },
  removeTagButton: {
    marginLeft: 4,
  },
  imagePickerButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 200,
  },
  imagePlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    marginTop: 8,
    fontSize: 14,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  submitButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  errorContainer: {
    backgroundColor: '#fdeaea',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
  },
});

export default CreateContentModal; 