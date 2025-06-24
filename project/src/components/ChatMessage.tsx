import React, { useState } from 'react';
import { User, Bot, Cpu, Eye, Zap, Copy, Check } from 'lucide-react';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const [isCopied, setIsCopied] = useState(false);
  
  // Function to copy message content to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  // Function to render text with bold formatting for *text*
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*[^*]+\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
        // Remove asterisks and make bold
        const boldText = part.slice(1, -1);
        return (
          <strong key={index} className="font-bold text-white">
            {boldText}
          </strong>
        );
      }
      return part;
    });
  };
  
  return (
    <div className={`flex gap-2 sm:gap-4 mb-4 sm:mb-6 ${isUser ? 'flex-row-reverse' : 'flex-row'} group`}>
      {/* Complex avatar */}
      <div className={`flex-shrink-0 relative ${isUser ? 'ml-1 sm:ml-3' : 'mr-1 sm:mr-3'}`}>
        {/* Outer rotating ring */}
        <div className={`absolute inset-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border-2 rounded-full animate-spin-slow ${
          isUser ? 'border-cyan-400/30' : 'border-orange-400/30'
        }`}></div>
        <div className={`absolute inset-1 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 border rounded-full animate-spin-reverse ${
          isUser ? 'border-blue-400/20' : 'border-red-400/20'
        }`}></div>
        
        {/* Main avatar */}
        <div className={`relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 ${
          isUser 
            ? 'bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 shadow-cyan-500/50' 
            : 'bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 shadow-orange-500/50'
        }`}>
          {isUser ? (
            <User className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
          ) : (
            <Bot className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
        </div>
        
        {/* Status indicators */}
        <div className={`absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-black flex items-center justify-center ${
          isUser ? 'bg-gradient-to-r from-cyan-400 to-blue-400' : 'bg-gradient-to-r from-orange-400 to-red-400'
        }`}>
          {isUser ? (
            <Zap className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 text-white" />
          ) : (
            <Eye className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 text-white" />
          )}
        </div>
        
        {/* Connection lines */}
        <div className={`absolute top-1/2 ${isUser ? '-left-3 sm:-left-6' : '-right-3 sm:-right-6'} w-3 sm:w-5 h-px bg-gradient-to-r ${
          isUser 
            ? 'from-cyan-400/50 to-transparent' 
            : 'from-orange-400/50 to-transparent'
        } ${isUser ? 'rotate-180' : ''}`}></div>
      </div>
      
      {/* Message content */}
      <div className={`max-w-[80%] sm:max-w-[75%] ${isUser ? 'text-right' : 'text-left'} relative`}>
        {/* Message bubble */}
        <div className={`relative inline-block px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4 rounded-xl sm:rounded-2xl border transition-all duration-500 group-hover:shadow-2xl ${
          isUser
            ? 'bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 text-white rounded-br-lg shadow-2xl shadow-cyan-500/30 border-cyan-400/30'
            : 'bg-slate-800 text-white rounded-bl-lg border-slate-700/50 shadow-2xl shadow-slate-900/50'
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
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-current rounded-full opacity-60 animate-bounce"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-current rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-current rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <Cpu className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-60 animate-spin-slow" />
                  <span className="text-xs opacity-60">TYPING</span>
                </div>
              </div>
            ) : (
              <p className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                {renderFormattedText(message.content.trim())}
              </p>
            )}
          </div>
          
          {/* Corner accents */}
          <div className={`absolute top-0 left-0 w-2 h-2 sm:w-3 sm:h-3 border-t-2 border-l-2 rounded-tl-lg ${
            isUser ? 'border-white/30' : 'border-orange-400/30'
          }`}></div>
          <div className={`absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 border-b-2 border-r-2 rounded-br-lg ${
            isUser ? 'border-white/30' : 'border-orange-400/30'
          }`}></div>
        </div>
        
        {/* Timestamp and status */}
        <div className={`flex items-center gap-2 sm:gap-3 mt-1 sm:mt-2 text-xs text-gray-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full animate-pulse ${
              isUser ? 'bg-cyan-400' : 'bg-orange-400'
            }`}></div>
            <span className="font-mono text-xs">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          
          {/* Copy button */}
          {!message.isTyping && (
            <button
              onClick={copyToClipboard}
              className={`p-1 rounded-md transition-all duration-200 hover:bg-slate-700/50 group/copy ${
                isCopied ? 'text-green-400' : 'text-gray-500 hover:text-gray-300'
              }`}
              title={isCopied ? 'Copied!' : 'Copy message'}
            >
              {isCopied ? (
                <Check className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};