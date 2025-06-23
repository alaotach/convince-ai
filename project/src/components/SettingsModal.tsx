import React from 'react';
import { X } from 'lucide-react';
import { ChatMode, Message } from '../types/chat';
import { ModeToggle } from './ModeToggle';
import { RoastLevelSlider } from './RoastLevelSlider';
import { ExportButton } from './ExportButton';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
  roastLevel: number;
  onRoastLevelChange: (level: number) => void;
  messages?: Message[];
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  mode,
  onModeChange,
  roastLevel,
  onRoastLevelChange,
  messages = [],
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md md:max-w-2xl m-4">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-8">
          <ModeToggle mode={mode} onModeChange={onModeChange} />
          <RoastLevelSlider value={roastLevel} onChange={onRoastLevelChange} />
          
          {/* Export Section */}
          {messages.length > 0 && (
            <div className="border-t border-slate-700 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                Export Chat Conversation
              </h3>
              <div className="bg-slate-800 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">
                    Download your conversation in various formats
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {messages.length} messages available for export
                  </p>
                </div>
                <ExportButton 
                  messages={messages}
                  mode={mode}
                  roastLevel={roastLevel}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
