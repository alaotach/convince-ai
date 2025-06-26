import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ChatMode } from '../types/chat';

interface ModeToggleProps {
  mode: ChatMode;
  onChange: (mode: ChatMode) => void;
  disabled?: boolean;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ 
  mode, 
  onChange, 
  disabled = false 
}) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange(mode === 'convince-ai' ? 'prove-human' : 'convince-ai');
    }
  };

  const getModeData = (currentMode: ChatMode) => {
    if (currentMode === 'convince-ai') {
      return {
        icon: '🤖',
        title: 'CONVINCE AI',
        description: 'Try to convince the AI',
        color: '#06b6d4',
        bgColor: 'rgba(6, 182, 212, 0.1)',
        borderColor: 'rgba(6, 182, 212, 0.3)',
      };
    }
    return {
      icon: '👤',
      title: 'PROVE HUMAN',
      description: 'Prove you are human',
      color: '#f97316',
      bgColor: 'rgba(249, 115, 22, 0.1)',
      borderColor: 'rgba(249, 115, 22, 0.3)',
    };
  };

  const currentModeData = getModeData(mode);
  const otherModeData = getModeData(mode === 'convince-ai' ? 'prove-human' : 'convince-ai');

  return (
    <View style={styles.container}>
      {/* Current Mode Display */}
      <View style={[
        styles.currentMode,
        { 
          backgroundColor: currentModeData.bgColor,
          borderColor: currentModeData.borderColor,
        }
      ]}>
        <Text style={styles.currentModeIcon}>{currentModeData.icon}</Text>
        <View style={styles.currentModeContent}>
          <Text style={[styles.currentModeTitle, { color: currentModeData.color }]}>
            {currentModeData.title}
          </Text>
          <Text style={styles.currentModeDescription}>
            {currentModeData.description}
          </Text>
        </View>
      </View>

      {/* Toggle Button */}
      <TouchableOpacity
        style={[
          styles.toggleButton,
          disabled && styles.toggleButtonDisabled,
          { borderColor: otherModeData.borderColor }
        ]}
        onPress={handleToggle}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={styles.toggleIcon}>🔄</Text>
        <View style={styles.toggleContent}>
          <Text style={styles.toggleText}>Switch to</Text>
          <Text style={[styles.toggleModeTitle, { color: otherModeData.color }]}>
            {otherModeData.title}
          </Text>
        </View>
        <Text style={styles.arrowIcon}>→</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  currentMode: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
  },
  currentModeIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  currentModeContent: {
    flex: 1,
  },
  currentModeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  currentModeDescription: {
    fontSize: 14,
    color: '#94a3b8',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderWidth: 1,
  },
  toggleButtonDisabled: {
    opacity: 0.5,
  },
  toggleIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  toggleContent: {
    flex: 1,
  },
  toggleText: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 2,
  },
  toggleModeTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  arrowIcon: {
    fontSize: 18,
    color: '#94a3b8',
  },
});
