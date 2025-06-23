import { useState, useCallback, useEffect } from 'react';
import { ChatSession, ChatMode, ChatState } from '../types/chat';
import { sendMessage, generateChatName } from '../services/openai';
import { ChatStorageService } from '../services/chatStorage';

export const useChat = () => {
  const [state, setState] = useState<ChatState>({
    currentChat: null,
    chatHistory: [],
    isLoading: false
  });

  // Load chat history from localStorage on initialization
  useEffect(() => {
    const savedHistory = ChatStorageService.loadChatHistory();
    setState(prev => ({
      ...prev,
      chatHistory: savedHistory
    }));
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (state.chatHistory.length > 0) {
      ChatStorageService.saveChatHistory(state.chatHistory);
    }
  }, [state.chatHistory]);

  const createNewChat = useCallback((mode: ChatMode, roastLevel: number = 5) => {
    const newChat = ChatStorageService.createNewChat(mode, roastLevel);
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
      const updatedHistory = ChatStorageService.deleteChat(prev.chatHistory, chatId);
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
        messages: [...prev.currentChat.messages, message]
      };

      return {
        ...prev,
        currentChat: updatedChat,
        chatHistory: ChatStorageService.updateChat(prev.chatHistory, updatedChat)
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
        messages: updatedMessages
      };

      return {
        ...prev,
        currentChat: updatedChat,
        chatHistory: ChatStorageService.updateChat(prev.chatHistory, updatedChat)
      };
    });
  }, []);

  const updateChatName = useCallback(async (chatId: string, firstMessage: string, mode: ChatMode) => {
    try {
      const generatedName = await generateChatName(firstMessage, mode);
      
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
      console.error('Failed to update chat name:', error);
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

      const aiResponse = await sendMessage(
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

  const updateChatSettings = useCallback((mode: ChatMode, roastLevel: number) => {
    setState(prev => {
      if (!prev.currentChat) return prev;

      const updatedChat = {
        ...prev.currentChat,
        mode,
        roastLevel
      };

      return {
        ...prev,
        currentChat: updatedChat,
        chatHistory: ChatStorageService.updateChat(prev.chatHistory, updatedChat)
      };
    });
  }, []);

  const clearCurrentChat = useCallback(() => {
    setState(prev => {
      if (!prev.currentChat) return prev;

      const clearedChat = {
        ...prev.currentChat,
        messages: [],
        name: 'New Chat'
      };

      return {
        ...prev,
        currentChat: clearedChat,
        chatHistory: ChatStorageService.updateChat(prev.chatHistory, clearedChat)
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