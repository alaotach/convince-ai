import React from 'react';
import { MessageSquarePlus, Settings, Home } from 'lucide-react';
import { ExportButton } from './ExportButton';
import { Message, ChatMode } from '../types/chat';

interface HeaderProps {
  onClearChat: () => void;
  onBackToHome?: () => void;
  onShowSettings?: () => void;
  messages?: Message[];
  mode?: ChatMode;
  roastLevel?: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  onClearChat, 
  onBackToHome, 
  onShowSettings,
  messages = [],
  mode = 'convince-ai',
  roastLevel = 5
}) => {
  return (
    <div className="p-4 flex justify-between items-center bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50">
      <div className="flex items-center gap-4">
        {onBackToHome && (
          <button 
            onClick={onBackToHome} 
            className="p-2 hover:bg-slate-700 rounded-full transition-colors"
            title="Back to Home"
          >
            <Home size={20} />
          </button>
        )}
        <h1 className="text-xl font-bold">AI Chat</h1>
      </div>
      <div className="flex items-center gap-2">
        <ExportButton 
          messages={messages}
          mode={mode}
          roastLevel={roastLevel}
        />
        <button 
          onClick={onClearChat} 
          className="p-2 hover:bg-slate-700 rounded-full transition-colors"
          title="New Chat"
        >
          <MessageSquarePlus size={20} />
        </button>
        {onShowSettings && (
          <button
            onClick={onShowSettings}
            className="p-2 hover:bg-slate-700 rounded-full transition-colors"
            title="Settings"
          >
            <Settings size={20} />
          </button>
        )}
      </div>
    </div>
  );
};