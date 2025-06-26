import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Download, FileText, FileJson, Printer, ChevronDown } from 'lucide-react';
import jsPDF from 'jspdf';
import { Message, ChatMode } from '../types/chat';
import { exportChatConversation, generateChatSummary } from '../services/openai';

interface ExportButtonProps {
  messages: Message[];
  mode: ChatMode;
  roastLevel: number;
  disabled?: boolean;
}

const DropdownPortal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  buttonRect: DOMRect | null;
  children: React.ReactNode;
}> = ({ isOpen, onClose, buttonRect, children }) => {
  if (!isOpen || !buttonRect) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-transparent z-[9998]" 
        onClick={onClose}
      />
      
      {/* Dropdown positioned absolutely to button */}
      <div 
        className="fixed bg-slate-800 border border-slate-700 rounded-lg shadow-2xl min-w-80 overflow-hidden z-[9999]"
        style={{
          top: buttonRect.bottom + 8,
          right: window.innerWidth - buttonRect.right,
        }}
      >
        {children}
      </div>
    </>,
    document.body
  );
};

export const ExportButton: React.FC<ExportButtonProps> = ({ 
  messages, 
  mode, 
  roastLevel, 
  disabled = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }
  }, [isOpen]);

  const generatePdf = async () => {
    const pdf = new jsPDF();
    let yPosition = 20;
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 20;
    const lineHeight = 7;
    const pageWidth = pdf.internal.pageSize.width - (margin * 2);

    // Add title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`AI Chat Export - ${mode === 'convince-ai' ? 'Convince AI' : 'Prove Human'}`, margin, yPosition);
    yPosition += lineHeight * 2;

    // Add metadata
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Roast Level: ${roastLevel}/10`, margin, yPosition);
    yPosition += lineHeight;
    pdf.text(`Exported: ${new Date().toLocaleString()}`, margin, yPosition);
    yPosition += lineHeight;
    pdf.text(`Total Messages: ${messages.length}`, margin, yPosition);
    yPosition += lineHeight * 2;

    // Add messages
    for (const message of messages) {
      // Check if we need a new page
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = 20;
      }

      // Add sender label
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      const sender = message.sender === 'user' ? 'You' : (mode === 'convince-ai' ? 'AI' : 'AI Detective');
      pdf.text(`${sender}:`, margin, yPosition);
      yPosition += lineHeight;

      // Add message content
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      // Split text to fit page width
      const lines = pdf.splitTextToSize(message.content, pageWidth);
      
      for (const line of lines) {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = 20;
        }
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      }
      
      yPosition += lineHeight; // Add space between messages
    }

    // Save the PDF
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    pdf.save(`chat-export-${mode}-roast-${roastLevel}-${timestamp}.pdf`);
  };

  const handleExport = async (format: 'json' | 'txt' | 'pdf') => {
    if (messages.length === 0) return;
    
    setIsExporting(true);
    try {
      if (format === 'pdf') {
        await generatePdf();
      } else {
        exportChatConversation(messages, format, mode, roastLevel);
      }
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
    <>
      <button
        ref={buttonRef}
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

      <DropdownPortal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        buttonRect={buttonRect}
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
      </DropdownPortal>
    </>
  );
};
