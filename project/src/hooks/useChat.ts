import { useState, useCallback } from 'react';
import { Message, ChatMode, ChatState } from '../types/chat';
import { sendMessage } from '../services/openai';

export const useChat = () => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    mode: 'convince-ai',
    roastLevel: 5
  });

  const addMessage = useCallback((content: string, sender: 'user' | 'ai', isTyping = false) => {
    const message: Message = {
      id: Date.now().toString() + Math.random(),
      content,
      sender,
      timestamp: new Date(),
      isTyping
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));

    return message.id;
  }, []);

  const updateMessage = useCallback((id: string, content: string, isTyping = false) => {
    setState(prev => ({
      ...prev,
      messages: prev.messages.map(msg => 
        msg.id === id ? { ...msg, content, isTyping } : msg
      )
    }));
  }, []);

  const sendUserMessage = useCallback(async (content: string) => {
    if (state.isLoading) return;

    // Add user message
    addMessage(content, 'user');
    
    // Set loading state and add typing indicator
    setState(prev => ({ ...prev, isLoading: true }));
    const typingId = addMessage('', 'ai', true);

    try {
      // Prepare conversation history for backend
      const conversationHistory = [
        ...state.messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content
        })),
        { role: 'user' as const, content }
      ];

      const aiResponse = await sendMessage(conversationHistory, state.mode, state.roastLevel);
      
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
  }, [state.messages, state.mode, state.roastLevel, state.isLoading, addMessage, updateMessage]);

  const setMode = useCallback((mode: ChatMode) => {
    setState(prev => ({ ...prev, mode, messages: [] }));
  }, []);

  const setRoastLevel = useCallback((roastLevel: number) => {
    setState(prev => ({ ...prev, roastLevel }));
  }, []);

  const clearChat = useCallback(() => {
    setState(prev => ({ ...prev, messages: [] }));
  }, []);

  return {
    ...state,
    sendUserMessage,
    setMode,
    setRoastLevel,
    clearChat
  };
};