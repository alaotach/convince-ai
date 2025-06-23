import React, { useState } from 'react';
import { Download, FileText, FileJson, Printer, ChevronDown } from 'lucide-react';
import { Message, ChatMode } from '../types/chat';
import { exportChatConversation, generateChatSummary } from '../services/openai';

interface ExportButtonProps {
  messages: Message[];
  mode: ChatMode;
  roastLevel: number;
  disabled?: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ 
  messages, 
  mode, 
  roastLevel, 
  disabled = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'json' | 'txt' | 'pdf') => {
    if (messages.length === 0) return;
    
    setIsExporting(true);
    try {
      exportChatConversation(messages, format, mode, roastLevel);
      setIsOpen(false);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const summary = messages.length > 0 ? generateChatSummary(messages, mode) : null;

  if (messages.length === 0 || disabled) {
    return (
      <button
        disabled
        className="p-2 text-slate-500 cursor-not-allowed"
        title="No messages to export"
      >
        <Download size={20} />
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isExporting}
        className={`p-2 rounded-full transition-all duration-200 ${
          isExporting
            ? 'text-slate-500 cursor-wait'
            : 'text-slate-300 hover:text-white hover:bg-slate-700'
        }`}
        title="Export Chat"
      >
        {isExporting ? (
          <div className="w-5 h-5 border-2 border-slate-300 border-t-transparent rounded-full animate-spin" />
        ) : (
          <div className="flex items-center gap-1">
            <Download size={20} />
            <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-60" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu with very high z-index */}
          <div 
            className="absolute right-0 top-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl min-w-80 overflow-hidden"
            style={{ 
              zIndex: 99999,
              position: 'absolute'
            }}
          >
            {/* Header */}
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-700">
              <h3 className="text-sm font-semibold text-white">Export Chat Conversation</h3>
              {summary && (
                <div className="text-xs text-slate-400 mt-1">
                  {summary.totalMessages} messages • {summary.durationMinutes}m duration
                </div>
              )}
            </div>

            {/* Export Options */}
            <div className="p-2">
              <button
                onClick={() => handleExport('json')}
                disabled={isExporting}
                className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-slate-700 rounded-md transition-colors group"
              >
                <div className="p-2 bg-blue-500/20 rounded-full group-hover:bg-blue-500/30">
                  <FileJson size={16} className="text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">JSON Format</div>
                  <div className="text-xs text-slate-400">Structured data with metadata</div>
                </div>
              </button>

              <button
                onClick={() => handleExport('txt')}
                disabled={isExporting}
                className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-slate-700 rounded-md transition-colors group"
              >
                <div className="p-2 bg-green-500/20 rounded-full group-hover:bg-green-500/30">
                  <FileText size={16} className="text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">Text Format</div>
                  <div className="text-xs text-slate-400">Plain text, easy to read</div>
                </div>
              </button>

              <button
                onClick={() => handleExport('pdf')}
                disabled={isExporting}
                className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-slate-700 rounded-md transition-colors group"
              >
                <div className="p-2 bg-orange-500/20 rounded-full group-hover:bg-orange-500/30">
                  <Printer size={16} className="text-orange-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">PDF Format</div>
                  <div className="text-xs text-slate-400">Print-ready with styling</div>
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-slate-900 border-t border-slate-700">
              <div className="text-xs text-slate-500">
                Files will be downloaded to your default download folder
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
