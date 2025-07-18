import React, { useState } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  X
} from 'lucide-react';
import { ChatSession, ChatMode } from '../types/chat';

interface ChatSidebarProps {
  chatHistory: ChatSession[];
  currentChat: ChatSession | null;
  onNewChat: (mode: ChatMode) => void;
  onSelectChat: (chat: ChatSession) => void;
  onDeleteChat: (chatId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onCloseMobile?: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chatHistory,
  currentChat,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  isCollapsed,
  onToggleCollapse,
  onCloseMobile
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<ChatMode | 'all'>('all');

  // Filter and search chats
  const filteredChats = chatHistory
    .filter(chat => {
      if (filterMode !== 'all' && chat.mode !== filterMode) return false;
      if (!searchTerm.trim()) return true;
      
      const term = searchTerm.toLowerCase();
      return chat.name.toLowerCase().includes(term) ||
             chat.messages.some(msg => msg.content.toLowerCase().includes(term));
    })
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  // Group chats by date
  const groupChatsByDate = (chats: ChatSession[]) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    const groups: { [key: string]: ChatSession[] } = {
      'Today': [],
      'Yesterday': [],
      'Last 7 days': [],
      'Older': []
    };

    chats.forEach(chat => {
      const chatDate = new Date(chat.updatedAt);
      const isToday = chatDate.toDateString() === today.toDateString();
      const isYesterday = chatDate.toDateString() === yesterday.toDateString();
      const isLastWeek = chatDate > lastWeek;

      if (isToday) groups['Today'].push(chat);
      else if (isYesterday) groups['Yesterday'].push(chat);
      else if (isLastWeek) groups['Last 7 days'].push(chat);
      else groups['Older'].push(chat);
    });

    return groups;
  };

  const groupedChats = groupChatsByDate(filteredChats);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getModeIcon = (mode: ChatMode) => {
    return mode === 'convince-ai' ? '🤖' : '👤';
  };

  const getModeColor = (mode: ChatMode) => {
    return mode === 'convince-ai' 
      ? 'from-cyan-500 to-blue-500' 
      : 'from-orange-500 to-red-500';
  };

  return (
    <div className={`bg-slate-900 border-r border-slate-700/50 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-80 sm:w-80'
    } h-full flex flex-col relative`}>
      {/* Header */}
      <div className="p-4 sm:p-4 border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg sm:text-lg font-bold text-white">Chat History</h2>
          )}
          <div className="flex items-center gap-2">
            {/* Mobile close button */}
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors lg:hidden"
                title="Close sidebar"
              >
                <X size={20} />
              </button>
            )}
            {/* Desktop collapse button */}
            <button
              onClick={onToggleCollapse}
              className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors hidden lg:block"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        </div>

        {!isCollapsed && (
          <>
            {/* New Chat Buttons */}
            <div className="mt-4 sm:mt-4 space-y-3">
              <button
                onClick={() => onNewChat('convince-ai')}
                className="w-full p-3 sm:p-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 
                         rounded-xl transition-all duration-200 flex items-center gap-3 sm:gap-3 group text-base sm:text-base font-medium
                         touch-manipulation active:scale-95"
              >
                <Plus size={18} className="sm:w-[18px] sm:h-[18px]" />
                <span>New Convince AI</span>
              </button>
              <button
                onClick={() => onNewChat('prove-human')}
                className="w-full p-3 sm:p-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 
                         rounded-xl transition-all duration-200 flex items-center gap-3 sm:gap-3 group text-base sm:text-base font-medium
                         touch-manipulation active:scale-95"
              >
                <Plus size={18} className="sm:w-[18px] sm:h-[18px]" />
                <span>New Prove Human</span>
              </button>
            </div>

            {/* Search and Filter */}
            <div className="mt-4 sm:mt-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 sm:pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl 
                           text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 text-base
                           touch-manipulation"
                />
              </div>
              
              <div className="flex gap-2 sm:gap-2">
                <button
                  onClick={() => setFilterMode('all')}
                  className={`flex-1 px-3 sm:px-3 py-2.5 rounded-xl text-sm sm:text-sm transition-colors font-medium
                           touch-manipulation active:scale-95 ${
                    filterMode === 'all' 
                      ? 'bg-slate-700 text-white' 
                      : 'bg-slate-800/50 text-slate-400 hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterMode('convince-ai')}
                  className={`flex-1 px-3 sm:px-3 py-2.5 rounded-xl text-sm sm:text-sm transition-colors font-medium
                           touch-manipulation active:scale-95 ${
                    filterMode === 'convince-ai' 
                      ? 'bg-cyan-600 text-white' 
                      : 'bg-slate-800/50 text-slate-400 hover:text-white'
                  }`}
                >
                  🤖 AI
                </button>
                <button
                  onClick={() => setFilterMode('prove-human')}
                  className={`flex-1 px-3 sm:px-3 py-2.5 rounded-xl text-sm sm:text-sm transition-colors font-medium
                           touch-manipulation active:scale-95 ${
                    filterMode === 'prove-human' 
                      ? 'bg-orange-600 text-white' 
                      : 'bg-slate-800/50 text-slate-400 hover:text-white'
                  }`}
                >
                  👤 Human
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600 hover:scrollbar-thumb-slate-500">
        {isCollapsed ? (
          /* Collapsed view - show only current chat and new chat buttons */
          <div className="p-3 space-y-3">
            <button
              onClick={() => onNewChat('convince-ai')}
              className="w-full p-4 bg-cyan-600/20 hover:bg-cyan-600/30 rounded-xl transition-colors
                       touch-manipulation active:scale-95"
              title="New Convince AI Chat"
            >
              <Plus size={22} />
            </button>
            <button
              onClick={() => onNewChat('prove-human')}
              className="w-full p-4 bg-orange-600/20 hover:bg-orange-600/30 rounded-xl transition-colors
                       touch-manipulation active:scale-95"
              title="New Prove Human Chat"
            >
              <Plus size={22} />
            </button>
            {currentChat && (
              <div className="w-full p-4 bg-slate-700/50 rounded-xl">
                <div className="text-center text-2xl">
                  {getModeIcon(currentChat.mode)}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Expanded view */
          <div className="p-4 sm:p-4 space-y-4 sm:space-y-4">
            {Object.entries(groupedChats).map(([groupName, chats]) => (
              chats.length > 0 && (
                <div key={groupName}>
                  <h3 className="text-sm sm:text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
                    <Calendar size={14} className="sm:w-[14px] sm:h-[14px]" />
                    {groupName}
                  </h3>
                  <div className="space-y-2">
                    {chats.map((chat) => (
                      <div
                        key={chat.id}
                        className={`group relative p-3 sm:p-3 rounded-xl cursor-pointer transition-all duration-200 
                                 touch-manipulation active:scale-[0.98] ${
                          currentChat?.id === chat.id
                            ? `bg-gradient-to-r ${getModeColor(chat.mode)} bg-opacity-20 border border-opacity-30 ${
                                chat.mode === 'convince-ai' ? 'border-cyan-500' : 'border-orange-500'
                              }`
                            : 'hover:bg-slate-800/50'
                        }`}
                        onClick={() => onSelectChat(chat)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-lg sm:text-lg">{getModeIcon(chat.mode)}</span>
                              <h4 className="font-medium text-white truncate text-base sm:text-base">
                                {chat.name}
                              </h4>
                            </div>
                            
                            {chat.messages.length > 0 && (
                              <p className="text-sm sm:text-sm text-slate-400 truncate mb-2">
                                {chat.messages[chat.messages.length - 1].content}
                              </p>
                            )}
                            
                            <div className="flex items-center gap-2 sm:gap-2 text-xs text-slate-500 flex-wrap">
                              <span>{formatTime(chat.updatedAt)}</span>
                              <span>•</span>
                              <span>{chat.messages.length} msg{chat.messages.length !== 1 ? 's' : ''}</span>
                              <span>•</span>
                              <span>Lvl {chat.roastLevel}</span>
                            </div>
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteChat(chat.id);
                            }}
                            className="p-2 hover:bg-red-600/20 rounded-lg transition-all touch-manipulation active:scale-95"
                            title="Delete chat"
                          >
                            <Trash2 size={14} className="sm:w-[14px] sm:h-[14px] text-red-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}

            {filteredChats.length === 0 && (
              <div className="text-center py-6 sm:py-8">
                <MessageSquare className="mx-auto mb-3 sm:mb-4 text-slate-600" size={40} />
                <p className="text-slate-400 mb-2 text-sm sm:text-base">
                  {searchTerm || filterMode !== 'all' ? 'No chats found' : 'No chat history yet'}
                </p>
                <p className="text-xs sm:text-sm text-slate-500">
                  {searchTerm || filterMode !== 'all' 
                    ? 'Try adjusting your search or filter'
                    : 'Start a new conversation to begin'
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
