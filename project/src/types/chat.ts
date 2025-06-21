export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isTyping?: boolean;
}

export type ChatMode = 'convince-ai' | 'prove-human';

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  mode: ChatMode;
  roastLevel: number;
}