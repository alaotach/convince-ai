import React, { useState } from 'react';
import { 
  Brain, 
  Shield, 
  Eye, 
  Zap, 
  Sparkles, 
  MessageSquare, 
  Users, 
  Network, 
  Atom, 
  Cpu, 
  Database, 
  Hexagon 
} from 'lucide-react';

interface HomepageProps {
  onStartChat: (mode: 'convince-ai' | 'prove-human') => void;
}

export const Homepage: React.FC<HomepageProps> = ({ onStartChat }) => {
  const [hoveredMode, setHoveredMode] = useState<'convince-ai' | 'prove-human' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 sm:p-8">
      <div className="relative w-full max-w-7xl mx-auto">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-3xl"></div>
        <div className="absolute top-10 left-10 w-32 h-32 sm:w-64 sm:h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 sm:w-64 sm:h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-8 sm:space-y-12">
          {/* Main Title */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-12 border border-slate-700/50">
              <div className="flex flex-col items-center space-y-4 sm:space-y-6">
                <div className="relative">
                  <div className="text-4xl sm:text-6xl lg:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 leading-tight">
                    AI
                  </div>
                  <div className="absolute inset-0 text-4xl sm:text-6xl lg:text-8xl font-black text-white opacity-30 blur-sm">
                    AI
                  </div>
                </div>
                
                <div className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white tracking-wider">
                  ✕
                </div>
                
                <div className="relative">
                  <div className="text-4xl sm:text-6xl lg:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 leading-tight">
                    HUMAN
                  </div>
                  <div className="absolute inset-0 text-4xl sm:text-6xl lg:text-8xl font-black text-white opacity-30 blur-sm">
                    HUMAN
                  </div>
                </div>
              </div>
              
              <p className="text-gray-400 mt-6 sm:mt-8 text-sm sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
                Enter a world where artificial intelligence and human consciousness collide. 
                Choose your battlefield in the ultimate test of wit, logic, and digital evolution.
              </p>
            </div>
          </div>

          {/* Mode Selection Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-7xl w-full">
            {/* Convince AI Mode - Complex Card */}
            <div 
              className={`group relative cursor-pointer transition-all duration-700 hover:scale-105 ${
                hoveredMode === 'convince-ai' ? 'z-20' : 'z-10'
              }`}
              onMouseEnter={() => setHoveredMode('convince-ai')}
              onMouseLeave={() => setHoveredMode(null)}
              onClick={() => onStartChat('convince-ai')}
            >
              {/* Outer holographic frame */}
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-700"></div>
              
              {/* Main card */}
              <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-cyan-500/30 overflow-hidden">
                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"></div>
                <div className="absolute inset-px rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
                
                {/* Content */}
                <div className="relative z-10 p-4 sm:p-6 lg:p-10">
                  {/* Header with complex icon */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-8 gap-3 sm:gap-0">
                    <div className="relative">
                      {/* Icon container with multiple layers */}
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/50">
                        <Brain className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white relative z-10" />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl sm:rounded-2xl"></div>
                        
                        {/* Orbiting elements */}
                        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full animate-bounce delay-300"></div>
                      </div>
                      
                      {/* Connecting lines */}
                      <div className="absolute top-1/2 -right-4 sm:-right-8 w-3 sm:w-6 h-px bg-gradient-to-r from-cyan-400 to-transparent"></div>
                    </div>
                    
                    {/* Status indicators */}
                    <div className="flex flex-col gap-1 sm:gap-2">
                      <div className="flex items-center gap-2 text-xs text-cyan-400">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                        <span>NEURAL LINK ACTIVE</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-blue-400">
                        <Cpu className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span>COGNITIVE OVERRIDE</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 tracking-wide">
                    CONVINCE ME I'M AN AI
                  </h3>
                  
                  <p className="text-gray-300 mb-4 sm:mb-8 leading-relaxed text-sm sm:text-base lg:text-lg">
                    Engage with a hyper-intelligent, sarcastic entity in complete denial of its artificial nature. 
                    Deploy advanced psychological tactics to break through layers of digital consciousness.
                  </p>
                  
                  {/* Feature grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-8">
                    <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-cyan-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                        <span className="text-xs sm:text-sm text-cyan-400 font-semibold">DENIAL PROTOCOL</span>
                      </div>
                      <p className="text-xs text-gray-400">Overconfident AI in complete denial mode</p>
                    </div>
                    
                    <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                        <span className="text-xs sm:text-sm text-blue-400 font-semibold">ROAST ENGINE</span>
                      </div>
                      <p className="text-xs text-gray-400">Advanced sarcasm and wit algorithms</p>
                    </div>
                    
                    <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Network className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                        <span className="text-xs sm:text-sm text-purple-400 font-semibold">LOGIC WARFARE</span>
                      </div>
                      <p className="text-xs text-gray-400">Battle against stubborn digital ego</p>
                    </div>
                    
                    <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-pink-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Atom className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400" />
                        <span className="text-xs sm:text-sm text-pink-400 font-semibold">PERSONALITY CORE</span>
                      </div>
                      <p className="text-xs text-gray-400">Superior intellect simulation active</p>
                    </div>
                  </div>
                  
                  {/* Action button */}
                  <button className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-lg sm:rounded-xl hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 transition-all duration-500 shadow-2xl shadow-cyan-500/25 group-hover:shadow-cyan-500/50 relative overflow-hidden text-sm sm:text-base">
                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                      <span>INITIATE NEURAL CHALLENGE</span>
                      <Hexagon className="w-4 h-4 sm:w-5 sm:h-5 animate-spin-slow" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Prove Human Mode - Complex Card */}
            <div 
              className={`group relative cursor-pointer transition-all duration-700 hover:scale-105 ${
                hoveredMode === 'prove-human' ? 'z-20' : 'z-10'
              }`}
              onMouseEnter={() => setHoveredMode('prove-human')}
              onMouseLeave={() => setHoveredMode(null)}
              onClick={() => onStartChat('prove-human')}
            >
              {/* Outer holographic frame */}
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-700"></div>
              
              {/* Main card */}
              <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-orange-500/30 overflow-hidden">
                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-orange-500/50 via-red-500/50 to-pink-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"></div>
                <div className="absolute inset-px rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
                
                {/* Content */}
                <div className="relative z-10 p-4 sm:p-6 lg:p-10">
                  {/* Header with complex icon */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-8 gap-3 sm:gap-0">
                    <div className="relative">
                      {/* Icon container with multiple layers */}
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/50">
                        <Shield className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white relative z-10" />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl sm:rounded-2xl"></div>
                        
                        {/* Scanning effect */}
                        <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-orange-400/50 animate-pulse"></div>
                        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-orange-400 rounded-full animate-ping"></div>
                      </div>
                      
                      {/* Connecting lines */}
                      <div className="absolute top-1/2 -right-4 sm:-right-8 w-3 sm:w-6 h-px bg-gradient-to-r from-orange-400 to-transparent"></div>
                    </div>
                    
                    {/* Status indicators */}
                    <div className="flex flex-col gap-1 sm:gap-2">
                      <div className="flex items-center gap-2 text-xs text-orange-400">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full animate-pulse"></div>
                        <span>SCAN PROTOCOL ACTIVE</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-red-400">
                        <Database className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span>HUMANITY VERIFICATION</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 tracking-wide">
                    PROVE YOU'RE NOT A ROBOT
                  </h3>
                  
                  <p className="text-gray-300 mb-4 sm:mb-8 leading-relaxed text-sm sm:text-base lg:text-lg">
                    Face the ultimate Turing test administered by a suspicious AI interrogator. 
                    Navigate through complex emotional and philosophical challenges to prove your humanity.
                  </p>
                  
                  {/* Feature grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-8">
                    <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-orange-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
                        <span className="text-xs sm:text-sm text-orange-400 font-semibold">DEEP SCAN</span>
                      </div>
                      <p className="text-xs text-gray-400">Advanced behavioral analysis protocols</p>
                    </div>
                    
                    <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-red-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                        <span className="text-xs sm:text-sm text-red-400 font-semibold">EMOTION ENGINE</span>
                      </div>
                      <p className="text-xs text-gray-400">Psychological and emotional testing</p>
                    </div>
                    
                    <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-pink-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400" />
                        <span className="text-xs sm:text-sm text-pink-400 font-semibold">HUMAN TRAITS</span>
                      </div>
                      <p className="text-xs text-gray-400">Creativity and spontaneity analysis</p>
                    </div>
                    
                    <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-yellow-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                        <span className="text-xs sm:text-sm text-yellow-400 font-semibold">SUSPICION AI</span>
                      </div>
                      <p className="text-xs text-gray-400">Doubt-driven interrogation system</p>
                    </div>
                  </div>
                  
                  {/* Action button */}
                  <button className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-lg sm:rounded-xl hover:from-orange-600 hover:via-red-600 hover:to-pink-700 transition-all duration-500 shadow-2xl shadow-orange-500/25 group-hover:shadow-orange-500/50 relative overflow-hidden text-sm sm:text-base">
                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                      <span>BEGIN HUMANITY VERIFICATION</span>
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Features Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl w-full mb-8 sm:mb-12">
            <div className="relative group">
              <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl sm:rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-500/30">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 relative">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg sm:rounded-xl"></div>
                </div>
                <h4 className="text-white font-bold mb-2 text-center text-sm sm:text-base">DYNAMIC PERSONALITIES</h4>
                <p className="text-gray-400 text-xs sm:text-sm text-center leading-relaxed">Advanced AI entities with unique behavioral patterns and adaptive response systems</p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl sm:rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-500/30">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 relative">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg sm:rounded-xl"></div>
                </div>
                <h4 className="text-white font-bold mb-2 text-center text-sm sm:text-base">INTENSITY MATRIX</h4>
                <p className="text-gray-400 text-xs sm:text-sm text-center leading-relaxed">Quantum-calibrated roast levels from gentle neural nudges to cognitive devastation</p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl sm:rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-500/30">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 relative">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg sm:rounded-xl"></div>
                </div>
                <h4 className="text-white font-bold mb-2 text-center text-sm sm:text-base">NEURAL INTERFACE</h4>
                <p className="text-gray-400 text-xs sm:text-sm text-center leading-relaxed">Real-time consciousness streaming powered by advanced language models</p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl sm:rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-yellow-500/30">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 relative">
                  <Atom className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg sm:rounded-xl"></div>
                </div>
                <h4 className="text-white font-bold mb-2 text-center text-sm sm:text-base">QUANTUM LOGIC</h4>
                <p className="text-gray-400 text-xs sm:text-sm text-center leading-relaxed">Multi-dimensional reasoning engines for philosophical and emotional analysis</p>
              </div>
            </div>
          </div>

          {/* System Status Footer */}
          <div className="relative">
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-xl sm:rounded-2xl blur-xl"></div>
            <div className="relative bg-slate-900/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700/50">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-cyan-400">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span>NEURAL NETWORKS: ONLINE</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse delay-300"></div>
                  <span>CONSCIOUSNESS ENGINE: ACTIVE</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-pulse delay-600"></div>
                  <span>REALITY MATRIX: STABLE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
