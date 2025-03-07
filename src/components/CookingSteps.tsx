import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { CookingStep } from '../models';
import { COLORS } from '../navigation/AppNavigator';

interface CookingStepsProps {
  steps: CookingStep[];
}

const CookingSteps: React.FC<CookingStepsProps> = ({ steps }) => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const toggleStep = (index: number) => {
    if (expandedStep === index) {
      setExpandedStep(null);
    } else {
      setExpandedStep(index);
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0
        ? `${hours} hr ${remainingMinutes} min`
        : `${hours} hr`;
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {
            color: COLORS?.text || '#2c3e50',
          },
        ]}
      >
        Cooking Steps
      </Text>

      <ScrollView style={styles.stepsList}>
        {steps.map((step, index) => {
          const isExpanded = expandedStep === index;

          return (
            <TouchableOpacity
              key={`step-${index}`}
              onPress={() => toggleStep(index)}
              style={[
                styles.stepItem,
                {
                  backgroundColor: step.completed ? '#f0f8ff' : COLORS?.card || '#ffffff',
                  borderColor: COLORS?.border || '#e0e0e0',
                  opacity: step.completed ? 0.8 : 1,
                },
              ]}
            >
              <View style={styles.stepHeader}>
                <View style={styles.stepNumberContainer}>
                  <View
                    style={[
                      styles.stepNumber,
                      {
                        backgroundColor: COLORS?.primary || '#3498db',
                      },
                    ]}
                  >
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                </View>

                <View style={styles.stepContent}>
                  <Text
                    style={[
                      styles.stepDescription,
                      {
                        color: COLORS?.text || '#2c3e50',
                      },
                    ]}
                  >
                    {step.description}
                  </Text>

                  <View style={styles.stepMeta}>
                    <Text
                      style={[
                        styles.stepDuration,
                        {
                          color: COLORS?.lightText || '#7f8c8d',
                        },
                      ]}
                    >
                      {formatDuration(step.duration)}
                    </Text>

                    <Text
                      style={[
                        styles.stepTool,
                        {
                          color: COLORS?.lightText || '#7f8c8d',
                        },
                      ]}
                    >
                      Tool: {step.toolSuggestion}
                    </Text>
                  </View>
                </View>
              </View>

              {isExpanded && (step.historicalVideo || step.image) && (
                <View style={styles.mediaContainer}>
                  {step.image && (
                    <Image
                      source={{ uri: step.image }}
                      style={styles.stepImage}
                      resizeMode="cover"
                    />
                  )}
                  {step.historicalVideo && (
                    <View style={styles.videoPlaceholder}>
                      <Text style={styles.videoPlaceholderText}>
                        Historical Video Available
                      </Text>
                      <TouchableOpacity style={styles.playButton}>
                        <Text style={styles.playButtonText}>▶ Play</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
            </TouchableOpacity>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  stepsList: {
    maxHeight: 500,
  },
  stepItem: {
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    shadowColor: COLORS?.shadow || '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  stepHeader: {
    flexDirection: 'row',
  },
  stepNumberContainer: {
    marginRight: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepContent: {
    flex: 1,
  },
  stepDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  stepMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepDuration: {
    fontSize: 14,
  },
  stepTool: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  mediaContainer: {
    marginTop: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  stepImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  videoPlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  videoPlaceholderText: {
    color: '#fff',
    marginBottom: 12,
  },
  playButton: {
    backgroundColor: COLORS?.accent || '#e74c3c',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  playButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CookingSteps; 