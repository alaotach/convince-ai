import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChatSession, ChatMode } from '../types/chat';

const STORAGE_KEY = 'ai-chat-history';
const MAX_CHATS = 50; // Limit to prevent storage from getting too large

export class ChatStorageService {
  static async saveChatHistory(chatHistory: ChatSession[]): Promise<void> {
    try {
      // Keep only the most recent chats to prevent storage bloat
      const limitedHistory = chatHistory
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, MAX_CHATS);
      
      const serializedData = JSON.stringify(limitedHistory, (key, value) => {
        // Convert Date objects to strings for JSON storage
        if (key === 'timestamp' || key === 'createdAt' || key === 'updatedAt') {
          return value instanceof Date ? value.toISOString() : value;
        }
        return value;
      });
      
      await AsyncStorage.setItem(STORAGE_KEY, serializedData);
    } catch (error) {
      console.error('Failed to save chat history to AsyncStorage:', error);
    }
  }

  static async loadChatHistory(): Promise<ChatSession[]> {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (!savedData) return [];

      const parsed = JSON.parse(savedData);
      
      // Convert string dates back to Date objects
      return parsed.map((chat: any) => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt),
        messages: chat.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
    } catch (error) {
      console.error('Failed to load chat history from AsyncStorage:', error);
      return [];
    }
  }

  static createNewChat(mode: ChatMode, roastLevel: number): ChatSession {
    const now = new Date();
    return {
      id: `chat_${now.getTime()}_${Math.random().toString(36).substr(2, 9)}`,
      name: 'New Chat', // Will be updated when first message is sent
      messages: [],
      mode,
      roastLevel,
      createdAt: now,
      updatedAt: now
    };
  }

  static updateChat(chatHistory: ChatSession[], updatedChat: ChatSession): ChatSession[] {
    const updatedHistory = chatHistory.map(chat => 
      chat.id === updatedChat.id 
        ? { ...updatedChat, updatedAt: new Date() }
        : chat
    );

    // If chat doesn't exist, add it
    if (!chatHistory.find(chat => chat.id === updatedChat.id)) {
      updatedHistory.push({ ...updatedChat, updatedAt: new Date() });
    }

    return updatedHistory;
  }

  static deleteChat(chatHistory: ChatSession[], chatId: string): ChatSession[] {
    return chatHistory.filter(chat => chat.id !== chatId);
  }

  static searchChats(chatHistory: ChatSession[], searchTerm: string): ChatSession[] {
    if (!searchTerm.trim()) return chatHistory;

    const term = searchTerm.toLowerCase();
    return chatHistory.filter(chat => 
      chat.name.toLowerCase().includes(term) ||
      chat.messages.some(msg => msg.content.toLowerCase().includes(term))
    );
  }

  static getChatById(chatHistory: ChatSession[], chatId: string): ChatSession | null {
    return chatHistory.find(chat => chat.id === chatId) || null;
  }

  static getRecentChats(chatHistory: ChatSession[], limit: number = 10): ChatSession[] {
    return chatHistory
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, limit);
  }

  static exportAllChats(chatHistory: ChatSession[]): string {
    const exportData = {
      exportedAt: new Date().toISOString(),
      totalChats: chatHistory.length,
      chats: chatHistory
    };
    return JSON.stringify(exportData, null, 2);
  }

  static async clearAllChats(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear chat history:', error);
    }
  }
}

export const chatStorage = {
  async saveChatSessions(sessions: ChatSession[]): Promise<void> {
    return ChatStorageService.saveChatHistory(sessions);
  },

  async loadChatSessions(): Promise<ChatSession[]> {
    return ChatStorageService.loadChatHistory();
  },

  async clearAllSessions(): Promise<void> {
    return ChatStorageService.clearAllChats();
  }
};

// Simple ID generator to replace uuid
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
