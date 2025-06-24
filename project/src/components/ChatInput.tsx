import React, { useState, KeyboardEvent } from 'react';
import { Send, Loader2, Zap, Cpu } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isLoading, 
  placeholder = "Enter neural transmission..." 
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
      {/* Background glow */}
      <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl sm:rounded-3xl blur-2xl"></div>
      
      {/* Main container */}
      <div className="relative bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden">
        {/* Top scanning line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse"></div>
        
        <div className="p-3 sm:p-4 lg:p-6">
          <div className="flex gap-2 sm:gap-4 items-end">
            {/* Input area */}
            <div className="flex-1 relative">
              {/* Input field */}
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none min-h-[2.5rem] sm:min-h-[3rem] max-h-32 sm:max-h-40 text-sm sm:text-base leading-relaxed pr-8 sm:pr-12"
                rows={1}
                disabled={isLoading}
              />
              
              {/* Character counter */}
              <div className="absolute bottom-0 right-0 text-xs text-gray-500 font-mono">
                {message.length}/500
              </div>
            </div>
            
            {/* Send button complex */}
            <div className="relative">
              <button
                onClick={handleSend}
                disabled={!message.trim() || isLoading}
                className="relative group w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 active:scale-95 overflow-hidden"
              >
                {/* Button background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Button content */}
                <div className="relative z-10">
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white animate-spin" />
                      <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-ping"></div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Send className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  )}
                </div>
                
                {/* Orbiting elements */}
                {!isLoading && (
                  <>
                    <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-cyan-400 rounded-full animate-bounce opacity-60">
                      <Zap className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white p-0.5" />
                    </div>
                    <div className="absolute -bottom-0.5 -left-0.5 sm:-bottom-1 sm:-left-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-400 rounded-full animate-bounce delay-300 opacity-60">
                      <Cpu className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white p-0.5" />
                    </div>
                  </>
                )}
                
                {/* Hover glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
              </button>
            </div>
          </div>
          
          {/* Status bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-700/30 gap-2 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs">NEURAL LINK ACTIVE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse delay-300"></div>
                <span className="text-xs">QUANTUM ENCRYPTION</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 font-mono">
              PRESS ENTER TO TRANSMIT
            </div>
          </div>
        </div>
        
        {/* Bottom scanning line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-pulse delay-500"></div>
      </div>
    </div>
  );
};