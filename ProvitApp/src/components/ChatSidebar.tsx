import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { ChatSession, ChatMode } from '../types/chat';

interface ChatSidebarProps {
  chatHistory: ChatSession[];
  currentChat: ChatSession | null;
  onNewChat: (mode: ChatMode) => void;
  onSelectChat: (chat: ChatSession) => void;
  onDeleteChat: (chatId: string) => void;
  isVisible: boolean;
  onClose: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chatHistory,
  currentChat,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  isVisible,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<ChatMode | 'all'>('all');

  // Filter and search chats
  const filteredChats = chatHistory
    .filter(chat => {
      if (filterMode !== 'all' && chat.mode !== filterMode) return false;
      if (!searchTerm.trim()) return true;
      
      const term = searchTerm.toLowerCase();
      return chat.name.toLowerCase().includes(term) ||
             chat.messages.some(msg => msg.content.toLowerCase().includes(term));
    })
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const handleNewChat = (mode: ChatMode) => {
    onNewChat(mode);
    onClose();
  };

  const handleSelectChat = (chat: ChatSession) => {
    onSelectChat(chat);
    onClose();
  };

  const handleDeleteChat = (chatId: string) => {
    Alert.alert(
      'Delete Chat',
      'Are you sure you want to delete this chat?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => onDeleteChat(chatId)
        }
      ]
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getModeIcon = (mode: ChatMode) => {
    return mode === 'convince-ai' ? '🤖' : '👤';
  };

  const getRoastLevelStyle = (level: number) => {
    if (level <= 3) return styles.roastLevelLow;
    if (level <= 6) return styles.roastLevelMedium;
    return styles.roastLevelHigh;
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={[styles.background, { backgroundColor: '#0f172a' }]} />
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chat History</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* New Chat Buttons */}
        <View style={styles.newChatSection}>
          <TouchableOpacity
            onPress={() => handleNewChat('convince-ai')}
            style={styles.newChatButton}
          >
            <View
              style={[styles.newChatGradient, { backgroundColor: '#06b6d4' }]}
            >
              <Text style={styles.newChatIcon}>🤖</Text>
              <Text style={styles.newChatText}>New Convince AI</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => handleNewChat('prove-human')}
            style={styles.newChatButton}
          >
            <View
              style={[styles.newChatGradient, { backgroundColor: '#f97316' }]}
            >
              <Text style={styles.newChatIcon}>👤</Text>
              <Text style={styles.newChatText}>New Prove Human</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search chats..."
              placeholderTextColor="#64748b"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
          
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filterMode === 'all' && styles.filterButtonActive
              ]}
              onPress={() => setFilterMode('all')}
            >
              <Text style={[
                styles.filterButtonText,
                filterMode === 'all' && styles.filterButtonTextActive
              ]}>All</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.filterButton,
                filterMode === 'convince-ai' && styles.filterButtonActive
              ]}
              onPress={() => setFilterMode('convince-ai')}
            >
              <Text style={[
                styles.filterButtonText,
                filterMode === 'convince-ai' && styles.filterButtonTextActive
              ]}>🤖 AI</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.filterButton,
                filterMode === 'prove-human' && styles.filterButtonActive
              ]}
              onPress={() => setFilterMode('prove-human')}
            >
              <Text style={[
                styles.filterButtonText,
                filterMode === 'prove-human' && styles.filterButtonTextActive
              ]}>👤 Human</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Chat List */}
        <ScrollView 
          style={styles.chatList}
          showsVerticalScrollIndicator={false}
        >
          {filteredChats.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>💬</Text>
              <Text style={styles.emptyStateText}>
                {searchTerm ? 'No chats match your search' : 'No chats yet'}
              </Text>
            </View>
          ) : (
            filteredChats.map((chat) => (
              <TouchableOpacity
                key={chat.id}
                style={[
                  styles.chatItem,
                  currentChat?.id === chat.id && styles.chatItemActive
                ]}
                onPress={() => handleSelectChat(chat)}
              >                <View style={styles.chatItemHeader}>
                  <Text style={styles.chatItemIcon}>
                    {getModeIcon(chat.mode)}
                  </Text>
                  <View style={styles.chatItemInfo}>
                    <Text style={styles.chatItemName} numberOfLines={1}>
                      {chat.name}
                    </Text>
                    <View style={styles.chatItemMeta}>
                      <Text style={styles.chatItemTime}>
                        {formatTime(chat.updatedAt)}
                      </Text>
                      <View style={[styles.roastLevelBadge, getRoastLevelStyle(chat.roastLevel)]}>
                        <Text style={styles.roastLevelText}>{chat.roastLevel}🌶️</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleDeleteChat(chat.id)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteButtonText}>🗑️</Text>
                  </TouchableOpacity>
                </View>
                
                {chat.messages.length > 0 && (
                  <Text style={styles.chatItemPreview} numberOfLines={2}>
                    {chat.messages[chat.messages.length - 1].content}
                  </Text>
                )}
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(148, 163, 184, 0.1)',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#ffffff',
  },
  newChatSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  newChatButton: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  newChatGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  newChatIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  newChatText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.1)',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#ffffff',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#06b6d4',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  chatList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  chatItem: {
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.1)',
  },
  chatItemActive: {
    borderColor: '#06b6d4',
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
  },
  chatItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  chatItemIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  chatItemInfo: {
    flex: 1,
  },
  chatItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },  chatItemTime: {
    fontSize: 12,
    color: '#64748b',
  },
  chatItemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  deleteButton: {
    padding: 4,
  },
  deleteButtonText: {
    fontSize: 16,
  },
  chatItemPreview: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 18,
  },  roastLevelBadge: {
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  roastLevelLow: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  roastLevelMedium: {
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
  },
  roastLevelHigh: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  roastLevelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
