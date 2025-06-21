import React from 'react';
import { User, Bot, Cpu, Eye, Zap } from 'lucide-react';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex gap-4 mb-6 ${isUser ? 'flex-row-reverse' : 'flex-row'} group`}>
      {/* Complex avatar */}
      <div className={`flex-shrink-0 relative ${isUser ? 'ml-3' : 'mr-3'}`}>
        {/* Outer rotating ring */}
        <div className={`absolute inset-0 w-12 h-12 border-2 rounded-full animate-spin-slow ${
          isUser ? 'border-cyan-400/30' : 'border-orange-400/30'
        }`}></div>
        <div className={`absolute inset-1 w-10 h-10 border rounded-full animate-spin-reverse ${
          isUser ? 'border-blue-400/20' : 'border-red-400/20'
        }`}></div>
        
        {/* Main avatar */}
        <div className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 ${
          isUser 
            ? 'bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 shadow-cyan-500/50' 
            : 'bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 shadow-orange-500/50'
        }`}>
          {isUser ? <User className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-white" />}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
        </div>
        
        {/* Status indicators */}
        <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-black flex items-center justify-center ${
          isUser ? 'bg-gradient-to-r from-cyan-400 to-blue-400' : 'bg-gradient-to-r from-orange-400 to-red-400'
        }`}>
          {isUser ? <Zap className="w-2.5 h-2.5 text-white" /> : <Eye className="w-2.5 h-2.5 text-white" />}
        </div>
        
        {/* Connection lines */}
        <div className={`absolute top-1/2 ${isUser ? '-left-6' : '-right-6'} w-5 h-px bg-gradient-to-r ${
          isUser 
            ? 'from-cyan-400/50 to-transparent' 
            : 'from-orange-400/50 to-transparent'
        } ${isUser ? 'rotate-180' : ''}`}></div>
      </div>
      
      {/* Message content */}
      <div className={`max-w-[75%] ${isUser ? 'text-right' : 'text-left'} relative`}>
        {/* Message bubble */}
        <div className={`relative inline-block px-6 py-4 rounded-2xl backdrop-blur-xl border transition-all duration-500 group-hover:shadow-2xl ${
          isUser
            ? 'bg-gradient-to-br from-cyan-500/90 via-blue-500/90 to-purple-600/90 text-white rounded-br-lg shadow-2xl shadow-cyan-500/30 border-cyan-400/30'
            : 'bg-slate-800/90 text-white rounded-bl-lg border-slate-700/50 shadow-2xl shadow-slate-900/50'
        } ${message.isTyping ? 'animate-pulse' : ''} overflow-hidden`}>
          
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          {!isUser && (
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5"></div>
          )}
          
          {/* Content */}
          <div className="relative z-10">
            {message.isTyping ? (
              <div className="flex gap-2 items-center">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-current rounded-full opacity-60 animate-bounce"></div>
                  <div className="w-2 h-2 bg-current rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <Cpu className="w-3 h-3 opacity-60 animate-spin-slow" />
                  <span className="text-xs opacity-60">PROCESSING</span>
                </div>
              </div>
            ) : (
              <p className="whitespace-pre-wrap leading-relaxed text-base">{message.content}</p>
            )}
          </div>
          
          {/* Corner accents */}
          <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 rounded-tl-lg ${
            isUser ? 'border-white/30' : 'border-orange-400/30'
          }`}></div>
          <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 rounded-br-lg ${
            isUser ? 'border-white/30' : 'border-orange-400/30'
          }`}></div>
        </div>
        
        {/* Timestamp and status */}
        <div className={`flex items-center gap-3 mt-2 text-xs text-gray-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
              isUser ? 'bg-cyan-400' : 'bg-orange-400'
            }`}></div>
            <span className="font-mono">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};