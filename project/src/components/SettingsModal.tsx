import React from 'react';
import { X } from 'lucide-react';
import { ChatMode } from '../types/chat';
import { ModeToggle } from './ModeToggle';
import { RoastLevelSlider } from './RoastLevelSlider';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
  roastLevel: number;
  onRoastLevelChange: (level: number) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  mode,
  onModeChange,
  roastLevel,
  onRoastLevelChange,
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
        </div>
      </div>
    </div>
  );
};
