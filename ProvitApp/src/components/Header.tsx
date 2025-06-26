import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Message, ChatMode } from '../types/chat';
import { ExportButton } from './ExportButton';

interface HeaderProps {
  onBackToHome?: () => void;
  onShowSettings?: () => void;
  onToggleSidebar?: () => void;
  onRoastLevelChange?: (level: number) => void;
  messages?: Message[];
  mode?: ChatMode;
  roastLevel?: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  onBackToHome, 
  onShowSettings,
  onToggleSidebar,
  onRoastLevelChange,
  messages = [],
  mode = 'convince-ai',
  roastLevel = 5
}) => {  
  const [showRoastPicker, setShowRoastPicker] = useState(false);
  const [tempRoastLevel, setTempRoastLevel] = useState(roastLevel);
  const handleExportChat = () => {
    // This is now handled by ExportButton component
  };const handleRoastLevelPress = () => {
    setTempRoastLevel(roastLevel);
    setShowRoastPicker(true);
  };

  const handleRoastLevelConfirm = () => {
    onRoastLevelChange?.(tempRoastLevel);
    setShowRoastPicker(false);
  };

  const handleRoastLevelCancel = () => {
    setTempRoastLevel(roastLevel);
    setShowRoastPicker(false);
  };

  const getRoastLevelData = (level: number) => {
    if (level <= 3) return {
      label: 'NEURAL TICKLE',
      emoji: '⚡',
      color: '#22c55e',
      description: 'Gentle cognitive stimulation protocols'
    };
    if (level <= 6) return {
      label: 'SYNAPTIC BURN',
      emoji: '🔥',
      color: '#f97316',
      description: 'Moderate psychological warfare systems'
    };
    if (level <= 8) return {
      label: 'CORTEX MELTDOWN',
      emoji: '💀',
      color: '#dc2626',
      description: 'Advanced ego destruction algorithms'
    };
    return {
      label: 'QUANTUM ANNIHILATION',
      emoji: '☢️',
      color: '#a855f7',
      description: 'Reality-bending consciousness obliteration'
    };
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      <View style={styles.header}>
        <View style={styles.leftSection}>
          {onToggleSidebar && (
            <TouchableOpacity 
              onPress={onToggleSidebar} 
              style={styles.iconButton}
            >
              <Text style={styles.icon}>☰</Text>
            </TouchableOpacity>
          )}
          
          {onBackToHome && (
            <TouchableOpacity 
              onPress={onBackToHome} 
              style={styles.iconButton}
            >
              <Text style={styles.icon}>🏠</Text>
            </TouchableOpacity>
          )}
          
          <View style={styles.titleSection}>
            <Text style={styles.title}>AI Chat</Text>
            {mode && (
              <Text style={styles.subtitle}>
                {mode === 'convince-ai' ? '🤖 Convince AI' : '👤 Prove Human'}
              </Text>
            )}
          </View>
        </View>
        
        <View style={styles.rightSection}>
          {/* Roast Level Button */}
          {onRoastLevelChange && (
            <TouchableOpacity
              onPress={handleRoastLevelPress}
              style={[styles.roastButton, getRoastButtonStyle(roastLevel)]}
            >
              <Text style={styles.roastLevel}>{roastLevel}</Text>
              <Text style={styles.roastIcon}>🌶️</Text>
            </TouchableOpacity>
          )}          
          {/* Export Button */}
          <ExportButton 
            messages={messages}
            mode={mode}
            roastLevel={roastLevel}
          />
          
          {/* {onShowSettings && (
            <TouchableOpacity
              onPress={onShowSettings}
              style={styles.iconButton}
            >
              <Text style={styles.icon}>⚙️</Text>
            </TouchableOpacity>
          )}         */}
          </View>
      </View>      
      {/* Roast Level Picker Modal */}
      <Modal
        visible={showRoastPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={handleRoastLevelCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>🌶️ Roast Level</Text>
              <TouchableOpacity
                onPress={handleRoastLevelCancel}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.sliderContainer}>
              {/* Current Level Display */}
              <View style={styles.currentLevelDisplay}>
                <View style={[styles.levelBadge, { backgroundColor: getRoastLevelData(tempRoastLevel).color + '20', borderColor: getRoastLevelData(tempRoastLevel).color }]}>
                  <Text style={styles.levelBadgeEmoji}>
                    {getRoastLevelData(tempRoastLevel).emoji}
                  </Text>
                  <Text style={[styles.levelBadgeNumber, { color: getRoastLevelData(tempRoastLevel).color }]}>
                    {tempRoastLevel}
                  </Text>
                </View>
                <Text style={[styles.levelLabel, { color: getRoastLevelData(tempRoastLevel).color }]}>
                  {getRoastLevelData(tempRoastLevel).label}
                </Text>
                <Text style={styles.levelDescription}>
                  {getRoastLevelData(tempRoastLevel).description}
                </Text>
              </View>

              {/* Slider */}
              <View style={styles.sliderWrapper}>
                <View style={styles.sliderTrack}>
                  {/* Level markers */}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                    <View
                      key={level}
                      style={[
                        styles.sliderMarker,
                        level <= tempRoastLevel && { backgroundColor: getRoastLevelData(tempRoastLevel).color }
                      ]}
                    />
                  ))}
                </View>
                  <Slider
                  style={styles.slider}
                  minimumValue={1}
                  maximumValue={10}
                  step={1}
                  value={tempRoastLevel}
                  onValueChange={setTempRoastLevel}
                  minimumTrackTintColor={getRoastLevelData(tempRoastLevel).color}
                  maximumTrackTintColor="rgba(148, 163, 184, 0.3)"
                  thumbTintColor={getRoastLevelData(tempRoastLevel).color}
                />
                
                {/* Level indicators */}
                <View style={styles.levelIndicators}>
                  <Text style={styles.levelIndicator}>1</Text>
                  <Text style={styles.levelIndicator}>5</Text>
                  <Text style={styles.levelIndicator}>10</Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleRoastLevelCancel}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.confirmButton, { backgroundColor: getRoastLevelData(tempRoastLevel).color }]}
                  onPress={handleRoastLevelConfirm}
                >
                  <Text style={styles.confirmButtonText}>Apply Level</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const getRoastButtonStyle = (level: number) => {
  if (level <= 3) return styles.roastButtonLow;
  if (level <= 6) return styles.roastButtonMedium;
  return styles.roastButtonHigh;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f172a',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleSection: {
    marginLeft: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(148, 163, 184, 0.1)',
  },
  icon: {
    fontSize: 20,
    color: '#ffffff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  roastButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    gap: 4,
  },
  roastButtonLow: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderColor: '#22c55e',
  },
  roastButtonMedium: {
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    borderColor: '#f97316',
  },
  roastButtonHigh: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderColor: '#ef4444',
  },
  roastLevel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },  roastIcon: {
    fontSize: 12,
  },  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    margin: 20,
    minWidth: "90%",
    borderWidth: 1,
    borderColor: '#334155',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  closeButton: {
    padding: 8,
    borderRadius: 15,
    backgroundColor: 'rgba(148, 163, 184, 0.2)',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#ffffff',
  },
  sliderContainer: {
    padding: 24,
  },
  currentLevelDisplay: {
    alignItems: 'center',
    marginBottom: 32,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 12,
  },
  levelBadgeEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  levelBadgeNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  levelLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  levelDescription: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 20,
  },
  sliderWrapper: {
    marginBottom: 24,
  },
  sliderTrack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 4,
    backgroundColor: 'rgba(148, 163, 184, 0.3)',
    borderRadius: 2,
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  sliderMarker: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(148, 163, 184, 0.5)',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  levelIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: 8,
  },
  levelIndicator: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(148, 163, 184, 0.2)',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
