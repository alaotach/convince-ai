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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-slate-900 border border-slate-700 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6 border-b border-slate-700 flex justify-between items-center sticky top-0 bg-slate-900 z-10">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Settings</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          <ModeToggle mode={mode} onModeChange={onModeChange} />
          <RoastLevelSlider value={roastLevel} onChange={onRoastLevelChange} />
          
          {/* Export Section */}
          {messages.length > 0 && (
            <div className="border-t border-slate-700 pt-4 sm:pt-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
                Export Chat Conversation
              </h3>
              <div className="bg-slate-800 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <div className="flex-1">
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
