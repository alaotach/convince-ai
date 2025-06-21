import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ChatMode } from '../types/chat';
import { ModeToggle } from './ModeToggle';
import { RoastLevelSlider } from './RoastLevelSlider';

interface SettingsPageProps {
  mode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
  roastLevel: number;
  onRoastLevelChange: (level: number) => void;
  onBack: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  mode,
  onModeChange,
  roastLevel,
  onRoastLevelChange,
  onBack,
}) => {
  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6"
      >
        <ArrowLeft size={20} />
        Back to Chat
      </button>
      <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>
      <div className="space-y-8">
        <ModeToggle mode={mode} onModeChange={onModeChange} />
        <RoastLevelSlider value={roastLevel} onChange={onRoastLevelChange} />
      </div>
    </div>
  );
};
