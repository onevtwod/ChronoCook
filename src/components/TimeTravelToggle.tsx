import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface TimeTravelToggleProps {
  label?: string;
}

const TimeTravelToggle: React.FC<TimeTravelToggleProps> = ({
  label = 'Time-Travel Mode',
}) => {
  const { isTimeTravelMode, toggleTimeTravel, currentTheme, currentEra } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text
          style={[
            styles.label,
            {
              color: isTimeTravelMode ? currentTheme.textColor : '#333',
              fontFamily: isTimeTravelMode ? currentTheme.fontFamily : 'System',
            },
          ]}
        >
          {label}
        </Text>
      </View>
      
      <View style={styles.switchContainer}>
        <Text
          style={[
            styles.eraText,
            {
              color: isTimeTravelMode ? currentTheme.textColor : '#666',
              fontFamily: isTimeTravelMode ? currentTheme.fontFamily : 'System',
            },
          ]}
        >
          {isTimeTravelMode ? `${currentEra} Mode Active` : 'Modern View'}
        </Text>
        
        <Switch
          trackColor={{ false: '#d0d0d0', true: currentTheme.primaryColor }}
          thumbColor={isTimeTravelMode ? currentTheme.accentColor : '#f4f3f4'}
          ios_backgroundColor="#d0d0d0"
          onValueChange={(value) => toggleTimeTravel(value)}
          value={isTimeTravelMode}
        />
      </View>
      
      {isTimeTravelMode && (
        <Text
          style={[
            styles.description,
            {
              color: currentTheme.textColor,
              fontFamily: currentTheme.fontFamily,
            },
          ]}
        >
          Experience recipes as they would have been presented in {currentEra} times.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eraText: {
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 8,
  },
});

export default TimeTravelToggle; 