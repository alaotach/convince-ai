import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Linking,
} from 'react-native';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const handleOpenGitHub = () => {
    Linking.openURL('https://github.com/yourusername/ai-chat-app');
  };

  const handleOpenDocumentation = () => {
    Linking.openURL('https://docs.ai-chat-app.com');
  };

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Settings</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* App Info Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📱 App Information</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Version</Text>
                <Text style={styles.infoValue}>1.0.0</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Build</Text>
                <Text style={styles.infoValue}>2025.01</Text>
              </View>
            </View>

            {/* Features Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>⚡ Features</Text>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🤖</Text>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>AI Conversation</Text>
                  <Text style={styles.featureDescription}>
                    Engage in intelligent debates with advanced AI
                  </Text>
                </View>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🌶️</Text>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Roast Level Control</Text>
                  <Text style={styles.featureDescription}>
                    Adjust AI intensity from gentle to savage
                  </Text>
                </View>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>📤</Text>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Export Conversations</Text>
                  <Text style={styles.featureDescription}>
                    Save chats in multiple formats (TXT, JSON, PDF)
                  </Text>
                </View>
              </View>
            </View>

            {/* Links Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🔗 Links</Text>
              <TouchableOpacity style={styles.linkButton} onPress={handleOpenGitHub}>
                <Text style={styles.linkIcon}>🌟</Text>
                <Text style={styles.linkText}>View on GitHub</Text>
                <Text style={styles.linkArrow}>→</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.linkButton} onPress={handleOpenDocumentation}>
                <Text style={styles.linkIcon}>📚</Text>
                <Text style={styles.linkText}>Documentation</Text>
                <Text style={styles.linkArrow}>→</Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Made with ❤️ for AI enthusiasts
              </Text>
              <Text style={styles.copyright}>
                © 2025 AI Chat App. All rights reserved.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1e293b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: '#334155',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  closeButton: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(148, 163, 184, 0.2)',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#ffffff',
  },
  content: {
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.1)',
  },
  infoLabel: {
    fontSize: 16,
    color: '#94a3b8',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.1)',
  },
  linkIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  linkArrow: {
    fontSize: 18,
    color: '#06b6d4',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(148, 163, 184, 0.1)',
    marginTop: 16,
  },
  footerText: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 8,
  },
  copyright: {
    fontSize: 14,
    color: '#64748b',
  },
});
