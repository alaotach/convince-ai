import React from 'react';
import { Brain, Shield, Cpu, Eye, Zap, Network } from 'lucide-react';
import { ChatMode } from '../types/chat';

interface ModeToggleProps {
  mode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ mode, onModeChange }) => {
  return (
    <div className="relative mb-6 sm:mb-8">
      {/* Background glow */}
      <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-orange-500/10 rounded-2xl sm:rounded-3xl blur-2xl"></div>
      
      {/* Main container */}
      <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-2 sm:p-3 border border-slate-700/50 shadow-2xl">
        {/* Animated background indicator */}
        <div 
          className={`absolute top-2 sm:top-3 h-[calc(100%-16px)] sm:h-[calc(100%-24px)] bg-gradient-to-r rounded-xl sm:rounded-2xl transition-all duration-500 shadow-lg ${
            mode === 'convince-ai'
              ? 'left-2 sm:left-3 w-[calc(50%-8px)] sm:w-[calc(50%-12px)] from-cyan-500/30 via-blue-500/30 to-purple-500/30 shadow-cyan-500/25'
              : 'right-2 sm:right-3 w-[calc(50%-8px)] sm:w-[calc(50%-12px)] from-orange-500/30 via-red-500/30 to-pink-500/30 shadow-orange-500/25'
          }`}
        />
        
        <div className="relative z-10 grid grid-cols-2 gap-2 sm:gap-3">
          {/* Convince AI Mode */}
          <button
            onClick={() => onModeChange('convince-ai')}
            className={`group relative p-3 sm:p-6 rounded-xl sm:rounded-2xl transition-all duration-500 ${
              mode === 'convince-ai'
                ? 'text-white'
                : 'text-gray-400 hover:text-white hover:bg-slate-800/30'
            }`}
          >
            {/* Complex icon arrangement */}
            <div className="flex items-center justify-center mb-2 sm:mb-4 relative">
              <div className={`relative w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-500 ${
                mode === 'convince-ai'
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/50'
                  : 'bg-slate-800/50 group-hover:bg-slate-700/50'
              }`}>
                <Brain className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 transition-all duration-500 ${
                  mode === 'convince-ai' ? 'scale-110 text-white' : 'group-hover:scale-105'
                }`} />
                
                {/* Orbiting elements */}
                {mode === 'convince-ai' && (
                  <>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full animate-bounce">
                      <Cpu className="w-3 h-3 text-white p-0.5" />
                    </div>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-300">
                      <Zap className="w-3 h-3 text-white p-0.5" />
                    </div>
                  </>
                )}
              </div>
              
              {/* Connecting neural network lines */}
              {mode === 'convince-ai' && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 -left-4 w-8 h-px bg-gradient-to-r from-cyan-400/50 to-transparent"></div>
                  <div className="absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-l from-cyan-400/50 to-transparent"></div>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <div className={`font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 transition-all duration-300 ${
                mode === 'convince-ai' ? 'text-white' : 'group-hover:text-white'
              }`}>
                CONVINCE ME I'M AN AI
              </div>
              <div className={`text-xs sm:text-sm transition-all duration-300 ${
                mode === 'convince-ai' ? 'text-cyan-200' : 'text-gray-500 group-hover:text-gray-400'
              }`}>
                Neural Override Protocol
              </div>
              
              {/* Status indicators */}
              <div className="flex items-center justify-center gap-1 sm:gap-2 mt-2 sm:mt-3">
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                  mode === 'convince-ai' ? 'bg-cyan-400 animate-pulse' : 'bg-gray-600'
                }`}></div>
                <span className={`text-xs font-mono transition-all duration-300 ${
                  mode === 'convince-ai' ? 'text-cyan-300' : 'text-gray-500'
                }`}>
                  {mode === 'convince-ai' ? 'ACTIVE' : 'STANDBY'}
                </span>
              </div>
            </div>
          </button>
          
          {/* Prove Human Mode */}
          <button
            onClick={() => onModeChange('prove-human')}
            className={`group relative p-3 sm:p-6 rounded-xl sm:rounded-2xl transition-all duration-500 ${
              mode === 'prove-human'
                ? 'text-white'
                : 'text-gray-400 hover:text-white hover:bg-slate-800/30'
            }`}
          >
            {/* Complex icon arrangement */}
            <div className="flex items-center justify-center mb-2 sm:mb-4 relative">
              <div className={`relative w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-500 ${
                mode === 'prove-human'
                  ? 'bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/50'
                  : 'bg-slate-800/50 group-hover:bg-slate-700/50'
              }`}>
                <Shield className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 transition-all duration-500 ${
                  mode === 'prove-human' ? 'scale-110 text-white' : 'group-hover:scale-105'
                }`} />
                
                {/* Scanning elements */}
                {mode === 'prove-human' && (
                  <>
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-orange-400/50 animate-pulse"></div>
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-orange-400 rounded-full animate-ping">
                      <Eye className="w-2 h-2 sm:w-3 sm:h-3 text-white p-0.5" />
                    </div>
                    <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-3 h-3 sm:w-4 sm:h-4 bg-red-400 rounded-full animate-ping delay-500">
                      <Network className="w-2 h-2 sm:w-3 sm:h-3 text-white p-0.5" />
                    </div>
                  </>
                )}
              </div>
              
              {/* Scanning lines */}
              {mode === 'prove-human' && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 -left-2 sm:-left-4 w-4 sm:w-8 h-px bg-gradient-to-r from-orange-400/50 to-transparent animate-pulse"></div>
                  <div className="absolute top-1/2 -right-2 sm:-right-4 w-4 sm:w-8 h-px bg-gradient-to-l from-orange-400/50 to-transparent animate-pulse delay-300"></div>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <div className={`font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 transition-all duration-300 ${
                mode === 'prove-human' ? 'text-white' : 'group-hover:text-white'
              }`}>
                PROVE YOU'RE NOT A ROBOT
              </div>
              <div className={`text-xs sm:text-sm transition-all duration-300 ${
                mode === 'prove-human' ? 'text-orange-200' : 'text-gray-500 group-hover:text-gray-400'
              }`}>
                Humanity Verification System
              </div>
              
              {/* Status indicators */}
              <div className="flex items-center justify-center gap-1 sm:gap-2 mt-2 sm:mt-3">
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                  mode === 'prove-human' ? 'bg-orange-400 animate-pulse' : 'bg-gray-600'
                }`}></div>
                <span className={`text-xs font-mono transition-all duration-300 ${
                  mode === 'prove-human' ? 'text-orange-300' : 'text-gray-500'
                }`}>
                  {mode === 'prove-human' ? 'SCANNING' : 'STANDBY'}
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};