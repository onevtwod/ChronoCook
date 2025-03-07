import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { COLORS } from '../navigation/AppNavigator';

interface Era {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
}

interface EraSelectorProps {
  eras: Era[];
  selectedEra: string | null;
  onSelectEra: (eraId: string) => void;
}

const { width } = Dimensions.get('window');
const TIMELINE_HEIGHT = 80;
const ERA_WIDTH = width * 0.4;

const EraSelector: React.FC<EraSelectorProps> = ({ eras, selectedEra, onSelectEra }) => {
  const formatYear = (year: number) => {
    const absYear = Math.abs(year);
    return `${absYear} ${year < 0 ? 'BCE' : 'CE'}`;
  };

  const renderEra = (era: Era) => {
    const isSelected = selectedEra === era.id;

    return (
      <TouchableOpacity
        key={era.id}
        style={[
          styles.eraCard,
          {
            backgroundColor: isSelected
              ? COLORS?.primary || '#3498db'
              : COLORS?.card || '#ffffff',
            borderColor: COLORS?.border || '#e0e0e0',
          },
        ]}
        onPress={() => onSelectEra(era.id)}
      >
        <Text
          style={[
            styles.eraName,
            {
              color: isSelected ? '#ffffff' : COLORS?.text || '#2c3e50',
            },
          ]}
        >
          {era.name}
        </Text>
        <Text
          style={[
            styles.eraYears,
            {
              color: isSelected
                ? '#ffffff'
                : COLORS?.lightText || '#7f8c8d',
            },
          ]}
        >
          {formatYear(era.startYear)} - {formatYear(era.endYear)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {eras.map(renderEra)}
      </ScrollView>
      
      {/* Timeline Bar */}
      <View
        style={[
          styles.timelineBar,
          { backgroundColor: (COLORS?.primary || '#3498db') + '20' },
        ]}
      >
        <View
          style={[
            styles.timelineDot,
            { backgroundColor: COLORS?.primary || '#3498db' },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: TIMELINE_HEIGHT,
  },
  scrollContent: {
    paddingHorizontal: 8,
  },
  eraCard: {
    width: ERA_WIDTH,
    height: TIMELINE_HEIGHT - 20,
    marginHorizontal: 8,
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    borderWidth: 1,
  },
  eraName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  eraYears: {
    fontSize: 12,
  },
  timelineBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    borderRadius: 2,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    top: -2,
    left: '50%',
    marginLeft: -4,
  },
});

export default EraSelector; 