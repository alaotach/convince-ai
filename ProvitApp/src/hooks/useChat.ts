import { useState, useCallback, useEffect } from 'react';
import { ChatSession, ChatMode } from '../types/chat';
import { openAIService } from '../services/openai';
import { chatStorage, generateId } from '../services/chatStorage';

interface ChatState {
  currentChat: ChatSession | null;
  chatHistory: ChatSession[];
  isLoading: boolean;
}

export const useChat = () => {
  const [state, setState] = useState<ChatState>({
    currentChat: null,
    chatHistory: [],
    isLoading: false
  });

  // Load chat history from AsyncStorage on initialization
  useEffect(() => {
    const loadSavedHistory = async () => {
      const savedHistory = await chatStorage.loadChatSessions();
      setState(prev => ({
        ...prev,
        chatHistory: savedHistory
      }));
    };
    loadSavedHistory();
  }, []);

  // Save chat history to AsyncStorage whenever it changes
  useEffect(() => {
    if (state.chatHistory.length > 0) {
      chatStorage.saveChatSessions(state.chatHistory);
    }
  }, [state.chatHistory]);
  const createNewChat = useCallback((mode: ChatMode, roastLevel: number = 5) => {
    const now = new Date();
    const newChat: ChatSession = {
      id: `chat_${now.getTime()}_${generateId()}`,
      name: mode === 'convince-ai' ? '🤖 Convincing AI...' : '👤 Testing Human...', // Temporary name while generating
      messages: [],
      mode,
      roastLevel,
      createdAt: now,
      updatedAt: now
    };

    setState(prev => ({
      ...prev,
      currentChat: newChat,
      chatHistory: [newChat, ...prev.chatHistory]
    }));
    return newChat;
  }, []);

  const selectChat = useCallback((chat: ChatSession) => {
    setState(prev => ({
      ...prev,
      currentChat: chat
    }));
  }, []);

  const deleteChat = useCallback((chatId: string) => {
    setState(prev => {
      const updatedHistory = prev.chatHistory.filter(chat => chat.id !== chatId);
      const newCurrentChat = prev.currentChat?.id === chatId 
        ? (updatedHistory.length > 0 ? updatedHistory[0] : null)
        : prev.currentChat;
      
      return {
        ...prev,
        currentChat: newCurrentChat,
        chatHistory: updatedHistory
      };
    });
  }, []);

  const addMessage = useCallback((content: string, sender: 'user' | 'ai', isTyping = false) => {
    const message = {
      id: Date.now().toString() + Math.random(),
      content,
      sender,
      timestamp: new Date(),
      isTyping
    };

    setState(prev => {
      if (!prev.currentChat) return prev;
      
      const updatedChat = {
        ...prev.currentChat,
        messages: [...prev.currentChat.messages, message],
        updatedAt: new Date()
      };

      const updatedHistory = prev.chatHistory.map(chat => 
        chat.id === updatedChat.id ? updatedChat : chat
      );

      return {
        ...prev,
        currentChat: updatedChat,
        chatHistory: updatedHistory
      };
    });

    return message.id;
  }, []);

  const updateMessage = useCallback((id: string, content: string, isTyping = false) => {
    setState(prev => {
      if (!prev.currentChat) return prev;

      const updatedMessages = prev.currentChat.messages.map(msg => 
        msg.id === id ? { ...msg, content, isTyping } : msg
      );

      const updatedChat = {
        ...prev.currentChat,
        messages: updatedMessages,
        updatedAt: new Date()
      };

      const updatedHistory = prev.chatHistory.map(chat => 
        chat.id === updatedChat.id ? updatedChat : chat
      );

      return {
        ...prev,
        currentChat: updatedChat,
        chatHistory: updatedHistory
      };
    });
  }, []);
  const updateChatName = useCallback(async (chatId: string, firstMessage: string, mode: ChatMode) => {
    try {
      console.log('🔄 Generating chat name for:', firstMessage.slice(0, 50));
      
      // Generate a smart chat name based on the first message and mode
      const generatedName = await openAIService.generateChatName(firstMessage, mode);
      
      console.log('✅ Generated chat name:', generatedName);
      
      setState(prev => {
        const updatedHistory = prev.chatHistory.map(chat => 
          chat.id === chatId ? { ...chat, name: generatedName } : chat
        );
        
        const updatedCurrentChat = prev.currentChat?.id === chatId 
          ? { ...prev.currentChat, name: generatedName }
          : prev.currentChat;

        return {
          ...prev,
          currentChat: updatedCurrentChat,
          chatHistory: updatedHistory
        };
      });
    } catch (error) {
      console.error('❌ Failed to update chat name:', error);
      // Fallback to a simple name
      const fallbackName = mode === 'convince-ai' 
        ? `🤖 AI Chat - ${new Date().toLocaleTimeString()}` 
        : `👤 Human Test - ${new Date().toLocaleTimeString()}`;
      
      setState(prev => {
        const updatedHistory = prev.chatHistory.map(chat => 
          chat.id === chatId ? { ...chat, name: fallbackName } : chat
        );
        
        const updatedCurrentChat = prev.currentChat?.id === chatId 
          ? { ...prev.currentChat, name: fallbackName }
          : prev.currentChat;

        return {
          ...prev,
          currentChat: updatedCurrentChat,
          chatHistory: updatedHistory
        };
      });
    }
  }, []);

  const sendUserMessage = useCallback(async (content: string) => {
    // Get current state snapshot
    const currentState = state;
    
    if (currentState.isLoading || !currentState.currentChat) return;

    const currentChatSnapshot = currentState.currentChat;
    const isFirstMessage = currentChatSnapshot.messages.length === 0;

    // Add user message
    addMessage(content, 'user');
    
    // Set loading state and add typing indicator
    setState(prev => ({ ...prev, isLoading: true }));
    const typingId = addMessage('', 'ai', true);

    // Generate chat name if this is the first message
    if (isFirstMessage) {
      updateChatName(currentChatSnapshot.id, content, currentChatSnapshot.mode);
    }

    try {
      // Prepare conversation history for backend
      const conversationHistory = [
        ...currentChatSnapshot.messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content
        })),
        { role: 'user' as const, content }
      ];

      const aiResponse = await openAIService.sendMessage(
        conversationHistory, 
        currentChatSnapshot.mode, 
        currentChatSnapshot.roastLevel
      );
      
      // Update the typing message with actual response
      updateMessage(typingId, aiResponse, false);
    } catch (error) {
      const errorMessage = error instanceof Error && error.message.includes('backend') 
        ? "Oops! Can't reach the backend server. Make sure it's running!"
        : "Something went wrong! Even I'm confused, and that never happens.";
      
      updateMessage(typingId, errorMessage, false);
      console.error('Chat Error:', error);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [state, addMessage, updateMessage, updateChatName]);
  const updateChatSettings = useCallback((chatId: string, settings: { mode?: ChatMode; roastLevel?: number }) => {
    setState(prev => {
      const updatedHistory = prev.chatHistory.map(chat => 
        chat.id === chatId ? { ...chat, ...settings, updatedAt: new Date() } : chat
      );
      
      const updatedCurrentChat = prev.currentChat?.id === chatId 
        ? { ...prev.currentChat, ...settings, updatedAt: new Date() }
        : prev.currentChat;

      return {
        ...prev,
        currentChat: updatedCurrentChat,
        chatHistory: updatedHistory
      };
    });
  }, []);

  const clearCurrentChat = useCallback(() => {
    setState(prev => {
      if (!prev.currentChat) return prev;

      const clearedChat = {
        ...prev.currentChat,
        messages: [],
        name: 'New Chat',
        updatedAt: new Date()
      };

      const updatedHistory = prev.chatHistory.map(chat => 
        chat.id === clearedChat.id ? clearedChat : chat
      );

      return {
        ...prev,
        currentChat: clearedChat,
        chatHistory: updatedHistory
      };
    });
  }, []);

  return {
    ...state,
    // Chat management
    createNewChat,
    selectChat,
    deleteChat,
    // Message handling
    sendUserMessage,
    // Settings
    updateChatSettings,
    // Utilities
    clearCurrentChat
  };
};
