import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

interface RoastLevelSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const RoastLevelSlider: React.FC<RoastLevelSliderProps> = ({ value, onChange }) => {
  const getRoastData = (level: number) => {
    if (level <= 3) return {
      label: 'NEURAL TICKLE',
      emoji: '⚡',
      color: '#fbbf24', // yellow-400 to orange-400
      backgroundColor: 'rgba(251, 191, 36, 0.2)',
      description: 'Gentle cognitive stimulation protocols'
    };
    if (level <= 6) return {
      label: 'SYNAPTIC BURN',
      emoji: '🔥',
      color: '#f97316', // orange-400 to red-500
      backgroundColor: 'rgba(249, 115, 22, 0.2)',
      description: 'Moderate psychological warfare systems'
    };
    if (level <= 8) return {
      label: 'CORTEX MELTDOWN',
      emoji: '💀',
      color: '#dc2626', // red-500 to purple-600
      backgroundColor: 'rgba(220, 38, 38, 0.2)',
      description: 'Advanced ego destruction algorithms'
    };
    return {
      label: 'QUANTUM ANNIHILATION',
      emoji: '☢️',
      color: '#a855f7', // purple-600 to pink-600
      backgroundColor: 'rgba(168, 85, 247, 0.2)',
      description: 'Reality-bending consciousness obliteration'
    };
  };

  const roastData = getRoastData(value);

  return (
    <View style={[styles.container, { backgroundColor: roastData.backgroundColor }]}>
      {/* Background glow */}
      <View style={[styles.backgroundGlow, { backgroundColor: roastData.color + '33' }]} />
      
      {/* Main container */}
      <View style={styles.mainContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.leftSection}>
            {/* Complex icon with multiple layers */}
            <View style={styles.iconContainer}>
              <View style={[styles.iconBackground, { backgroundColor: roastData.color }]}>
                <Text style={styles.iconEmoji}>{roastData.emoji}</Text>
                <View style={styles.iconOverlay} />
                
                {/* Animated particles */}
                <View style={styles.particlesContainer}>
                  <View style={[styles.particle, styles.particle1]} />
                  <View style={[styles.particle, styles.particle2]} />
                  <View style={[styles.particle, styles.particle3]} />
                </View>
              </View>
              
              {/* Orbiting elements */}
              <View style={styles.orbitElement}>
                <Text style={styles.orbitIcon}>⚛️</Text>
              </View>
            </View>
            
            <View style={styles.titleContainer}>
              <Text style={styles.title}>INTENSITY MATRIX</Text>
              <Text style={styles.subtitle}>Cognitive warfare calibration system</Text>
            </View>
          </View>
          
          {/* Level display */}
          <View style={styles.rightSection}>
            <Text style={[styles.levelLabel, { color: roastData.color }]}>
              {roastData.label}
            </Text>
            <Text style={styles.description}>{roastData.description}</Text>
          </View>
        </View>
        
        {/* Slider container */}
        <View style={styles.sliderContainer}>
          {/* Background track with segments */}
          <View style={styles.sliderTrack}>
            {/* Animated fill */}
            <View 
              style={[
                styles.sliderFill,
                { 
                  backgroundColor: roastData.color,
                  width: `${(value / 10) * 100}%`
                }
              ]}
            >
              <View style={styles.sliderFillOverlay} />
            </View>
            
            {/* Segment markers */}
            {[...Array(9)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.segmentMarker,
                  { left: `${((i + 1) / 10) * 100}%` }
                ]}
              />
            ))}
          </View>
          
          {/* Custom slider */}
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={10}            step={1}
            value={value}
            onValueChange={onChange}
            minimumTrackTintColor="transparent"
            maximumTrackTintColor="transparent"
            thumbTintColor={roastData.color}
          />
        </View>
        
        {/* Level indicators */}
        <View style={styles.levelIndicators}>
          <View style={styles.levelIndicator}>
            <Text style={styles.levelNumber}>1</Text>
            <Text style={styles.levelText}>FRIENDLY</Text>
          </View>
          <View style={styles.levelIndicator}>
            <Text style={styles.levelNumber}>5</Text>
            <Text style={styles.levelText}>BALANCED</Text>
          </View>
          <View style={styles.levelIndicator}>
            <Text style={styles.levelNumber}>10</Text>
            <Text style={styles.levelText}>SAVAGE</Text>
          </View>
        </View>
        
        {/* Current value display */}
        <View style={styles.valueDisplay}>
          <Text style={styles.currentValue}>LEVEL: {value}</Text>
          <Text style={[styles.currentEmoji, { color: roastData.color }]}>
            {roastData.emoji}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundGlow: {
    position: 'absolute',
    top: -16,
    left: -16,
    right: -16,
    bottom: -16,
    borderRadius: 32,
    opacity: 0.2,
  },
  mainContainer: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  iconContainer: {
    position: 'relative',
    marginRight: 16,
  },
  iconBackground: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 12,
    overflow: 'hidden',
  },
  iconEmoji: {
    fontSize: 24,
    zIndex: 10,
  },
  iconOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
  },
  particlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 2,
  },
  particle1: {
    top: 4,
    left: 4,
  },
  particle2: {
    bottom: 4,
    right: 4,
  },
  particle3: {
    top: 4,
    right: 4,
  },
  orbitElement: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 20,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitIcon: {
    fontSize: 12,
    color: '#ffffff',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  rightSection: {
    alignItems: 'flex-end',
    flex: 1,
  },
  levelLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  description: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 4,
    textAlign: 'right',
  },
  sliderContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  sliderTrack: {
    height: 24,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.5)',
    position: 'relative',
  },
  sliderFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  sliderFillOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
  },
  segmentMarker: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(71, 85, 105, 0.5)',
  },
  slider: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 24,
  },
  sliderThumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  levelIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  levelIndicator: {
    alignItems: 'center',
  },
  levelNumber: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  levelText: {
    color: '#64748b',
    fontSize: 10,
    marginTop: 2,
  },
  valueDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.3)',
  },
  currentValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  currentEmoji: {
    fontSize: 20,
  },
});
