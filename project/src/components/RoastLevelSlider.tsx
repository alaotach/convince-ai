import React from 'react';
import { Flame, Zap, Skull, Atom, FileHeart as Nuclear } from 'lucide-react';

interface RoastLevelSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const RoastLevelSlider: React.FC<RoastLevelSliderProps> = ({ value, onChange }) => {
  const getRoastData = (level: number) => {
    if (level <= 3) return {
      label: 'NEURAL TICKLE',
      emoji: '⚡',
      color: 'from-yellow-400 to-orange-400',
      icon: Zap,
      description: 'Gentle cognitive stimulation protocols'
    };
    if (level <= 6) return {
      label: 'SYNAPTIC BURN',
      emoji: '🔥',
      color: 'from-orange-400 to-red-500',
      icon: Flame,
      description: 'Moderate psychological warfare systems'
    };
    if (level <= 8) return {
      label: 'CORTEX MELTDOWN',
      emoji: '💀',
      color: 'from-red-500 to-purple-600',
      icon: Skull,
      description: 'Advanced ego destruction algorithms'
    };
    return {
      label: 'QUANTUM ANNIHILATION',
      emoji: '☢️',
      color: 'from-purple-600 to-pink-600',
      icon: Nuclear,
      description: 'Reality-bending consciousness obliteration'
    };
  };

  const roastData = getRoastData(value);
  const RoastIcon = roastData.icon;

  return (
    <div className="relative mb-6 sm:mb-8">
      {/* Background glow */}
      <div className={`absolute -inset-2 sm:-inset-4 bg-gradient-to-r ${roastData.color} opacity-20 rounded-2xl sm:rounded-3xl blur-2xl`}></div>
      
      {/* Main container */}
      <div className="relative bg-slate-900/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-700/50 shadow-2xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Complex icon with multiple layers */}
            <div className="relative">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${roastData.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden`}>
                <RoastIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                
                {/* Animated particles */}
                <div className="absolute inset-0">
                  <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/60 rounded-full animate-ping"></div>
                  <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/60 rounded-full animate-ping delay-300"></div>
                  <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/60 rounded-full animate-ping delay-600"></div>
                </div>
              </div>
              
              {/* Orbiting elements */}
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-5 sm:h-5 bg-white/20 rounded-full border border-white/40 flex items-center justify-center">
                <Atom className="w-2 h-2 sm:w-3 sm:h-3 text-white animate-spin-slow" />
              </div>
            </div>
            
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-bold text-sm sm:text-lg lg:text-xl tracking-wider">INTENSITY MATRIX</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Cognitive warfare calibration system</p>
            </div>
          </div>
          
          {/* Level display */}
          <div className="text-left sm:text-right">
            <div className={`text-lg sm:text-xl lg:text-2xl font-black bg-gradient-to-r ${roastData.color} bg-clip-text text-transparent`}>
              {roastData.label}
            </div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">{roastData.description}</div>
          </div>
        </div>
        
        {/* Slider container */}
        <div className="relative">
          {/* Background track with segments */}
          <div className="relative h-4 sm:h-6 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
            {/* Animated fill */}
            <div 
              className={`absolute left-0 top-0 h-full bg-gradient-to-r ${roastData.color} transition-all duration-500 rounded-full shadow-lg`}
              style={{ width: `${(value / 10) * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full"></div>
            </div>
            
            {/* Segment markers */}
            {Array.from({ length: 9 }, (_, i) => (
              <div
                key={i}
                className="absolute top-0 w-px h-full bg-slate-600/50"
                style={{ left: `${((i + 1) / 10) * 100}%` }}
              />
            ))}
          </div>
          
          {/* Custom slider */}
          <input
            type="range"
            min="1"
            max="10"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-0 w-full h-4 sm:h-6 opacity-0 cursor-pointer"
          />
          
          {/* Custom thumb */}
          <div 
            className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br ${roastData.color} rounded-full border-2 border-white shadow-2xl transition-all duration-300 hover:scale-125 cursor-pointer`}
            style={{ left: `${(value / 10) * 100}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Level indicators */}
        <div className="flex justify-between text-xs text-gray-500 mt-3 sm:mt-4 px-1 sm:px-2">
          <div className="flex flex-col items-center">
            <span className="text-yellow-400 text-sm sm:text-base">⚡</span>
            <span className="text-xs">GENTLE</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-orange-400 text-sm sm:text-base">🔥</span>
            <span className="text-xs">MODERATE</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-red-400 text-sm sm:text-base">💀</span>
            <span className="text-xs">SAVAGE</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-purple-400 text-sm sm:text-base">☢️</span>
            <span className="text-xs">NUCLEAR</span>
          </div>
        </div>
        
        {/* Power level display */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-slate-800/50 rounded-xl sm:rounded-2xl border border-slate-700/30">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs sm:text-sm">POWER LEVEL</span>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5 sm:gap-1">
                {Array.from({ length: 10 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-3 sm:w-2 sm:h-4 rounded-sm transition-all duration-300 ${
                      i < value 
                        ? `bg-gradient-to-t ${roastData.color}` 
                        : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
              <span className={`text-base sm:text-lg font-bold bg-gradient-to-r ${roastData.color} bg-clip-text text-transparent`}>
                {value}/10
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};