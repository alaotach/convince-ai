export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isTyping?: boolean;
}

export type ChatMode = 'convince-ai' | 'prove-human';

export interface ChatSession {
  id: string;
  name: string;
  messages: Message[];
  mode: ChatMode;
  roastLevel: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatState {
  currentChat: ChatSession | null;
  chatHistory: ChatSession[];
  isLoading: boolean;
}
