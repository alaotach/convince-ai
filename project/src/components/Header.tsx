import React from 'react';
import { Settings, Home, Menu } from 'lucide-react';
import { ExportButton } from './ExportButton';
import { Message, ChatMode } from '../types/chat';

interface HeaderProps {
  onBackToHome?: () => void;
  onShowSettings?: () => void;
  onToggleMobileSidebar?: () => void;
  messages?: Message[];
  mode?: ChatMode;
  roastLevel?: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  onBackToHome, 
  onShowSettings,
  onToggleMobileSidebar,
  messages = [],
  mode = 'convince-ai',
  roastLevel = 5
}) => {
  return (
    <div className="p-3 sm:p-4 flex justify-between items-center bg-slate-900 border-b border-slate-700/50">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile sidebar toggle */}
        {onToggleMobileSidebar && (
          <button 
            onClick={onToggleMobileSidebar} 
            className="p-2 hover:bg-slate-700 rounded-full transition-colors lg:hidden"
            title="Open Menu"
          >
            <Menu size={20} />
          </button>
        )}
        
        {onBackToHome && (
          <button 
            onClick={onBackToHome} 
            className="p-2 hover:bg-slate-700 rounded-full transition-colors"
            title="Back to Home"
          >
            <Home size={20} />
          </button>
        )}
        <h1 className="text-lg sm:text-xl font-bold">AI Chat</h1>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <ExportButton 
          messages={messages}
          mode={mode}
          roastLevel={roastLevel}
        />
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