import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import { Message, ChatMode } from '../types/chat';
import { exportChatConversation } from '../services/exportService';

interface ExportButtonProps {
  messages: Message[];
  mode: ChatMode;
  roastLevel: number;
  disabled?: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  messages,
  mode,
  roastLevel,
  disabled = false
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleExport = () => {
    if (messages.length === 0) {
      Alert.alert('No Messages', 'There are no messages to export yet. Start chatting first!');
      return;
    }
    setShowDropdown(true);
  };

  const handleExportFormat = async (format: 'json' | 'txt' | 'share') => {
    setShowDropdown(false);
    try {
      await exportChatConversation(messages, format, mode, roastLevel);
    } catch (error) {
      Alert.alert('Export Error', 'Failed to export chat. Please try again.');
    }
  };

  if (disabled || messages.length === 0) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        style={styles.exportButton}
        onPress={handleExport}
        activeOpacity={0.7}
      >
        <Text style={styles.exportIcon}>📤</Text>
      </TouchableOpacity>

      <Modal
        visible={showDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.dropdownContent}>
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownTitle}>Export Chat</Text>
              <TouchableOpacity
                onPress={() => setShowDropdown(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionsList}>
              <TouchableOpacity
                style={styles.exportOption}
                onPress={() => handleExportFormat('share')}
              >
                <Text style={styles.optionIcon}>📝</Text>
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Share Text</Text>
                  <Text style={styles.optionDescription}>Quick share as text</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.exportOption}
                onPress={() => handleExportFormat('txt')}
              >
                <Text style={styles.optionIcon}>📄</Text>
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Export TXT</Text>
                  <Text style={styles.optionDescription}>Plain text format</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.exportOption}
                onPress={() => handleExportFormat('json')}
              >
                <Text style={styles.optionIcon}>🗂️</Text>
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Export JSON</Text>
                  <Text style={styles.optionDescription}>Structured data format</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  exportButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(148, 163, 184, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exportIcon: {
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContent: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    margin: 20,
    minWidth: 280,
    borderWidth: 1,
    borderColor: '#334155',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  closeButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(148, 163, 184, 0.2)',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#ffffff',
  },
  optionsList: {
    padding: 8,
  },
  exportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginVertical: 4,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#94a3b8',
  },
});
