import { ChatMode } from '../types/chat';
import { Message } from '../types/chat';

const API_BASE_URL = 'https://convince.dotverse.tech/api';

export const sendMessage = async (
  messages: Array<{role: 'user' | 'assistant' | 'system', content: string}>,
  mode: ChatMode,
  roastLevel: number
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        mode,
        roastLevel
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to get response from server');
    }

    return data.message;
  } catch (error) {
    console.error('Backend API Error:', error);
    
    if (error instanceof Error && error.message.includes('fetch')) {
      throw new Error('Unable to connect to backend server. Please make sure the Python backend is running on port 5000.');
    }
    
    throw new Error('Failed to get response from AI. Please try again.');
  }
};

// Health check function to verify backend connection
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    return data.status === 'healthy';
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
};

// Export chat conversation in different formats
export const exportChatConversation = (
  messages: Message[],
  format: 'json' | 'txt' | 'pdf',
  mode: ChatMode,
  roastLevel: number
) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `chat-${mode}-${timestamp}`;

  switch (format) {
    case 'json':
      exportAsJSON(messages, filename, mode, roastLevel);
      break;
    case 'txt':
      exportAsTXT(messages, filename, mode, roastLevel);
      break;
    case 'pdf':
      exportAsPDF(messages, filename, mode, roastLevel);
      break;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

// Export as JSON format
const exportAsJSON = (messages: Message[], filename: string, mode: ChatMode, roastLevel: number) => {
  const exportData = {
    exportedAt: new Date().toISOString(),
    chatMode: mode,
    roastLevel,
    messageCount: messages.length,
    conversation: messages.map(msg => ({
      id: msg.id,
      sender: msg.sender,
      content: msg.content,
      timestamp: msg.timestamp,
      isTyping: msg.isTyping || false
    }))
  };

  const jsonString = JSON.stringify(exportData, null, 2);
  downloadFile(jsonString, `${filename}.json`, 'application/json');
};

// Export as TXT format
const exportAsTXT = (messages: Message[], filename: string, mode: ChatMode, roastLevel: number) => {
  const header = `
═══════════════════════════════════════════════════════════════
                        AI CHAT CONVERSATION
═══════════════════════════════════════════════════════════════
Export Date: ${new Date().toLocaleString()}
Chat Mode: ${mode === 'convince-ai' ? 'Convince AI' : 'Prove Human'}
Roast Level: ${roastLevel}/10
Total Messages: ${messages.length}
═══════════════════════════════════════════════════════════════

`;

  const conversationText = messages.map(msg => {
    const timestamp = new Date(msg.timestamp).toLocaleString();
    const sender = msg.sender === 'user' ? '🧑 USER' : '🤖 AI';
    const separator = '─'.repeat(60);
    
    return `${separator}
${sender} | ${timestamp}
${separator}
${msg.content}

`;
  }).join('');

  const footer = `
═══════════════════════════════════════════════════════════════
                        END OF CONVERSATION
═══════════════════════════════════════════════════════════════
`;

  const txtContent = header + conversationText + footer;
  downloadFile(txtContent, `${filename}.txt`, 'text/plain');
};

// Export as PDF format (using HTML to PDF conversion)
const exportAsPDF = (messages: Message[], filename: string, mode: ChatMode, roastLevel: number) => {
  // Create HTML content for PDF
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>AI Chat Conversation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #e2e8f0;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: rgba(15, 23, 42, 0.8);
            border-radius: 10px;
            border: 1px solid #334155;
        }
        .header h1 {
            color: #06b6d4;
            margin: 0 0 10px 0;
            font-size: 28px;
        }
        .header .meta {
            color: #94a3b8;
            font-size: 14px;
        }
        .message {
            margin: 20px 0;
            padding: 15px;
            border-radius: 10px;
            border-left: 4px solid;
        }
        .message.user {
            border-left-color: #06b6d4;
            background: rgba(6, 182, 212, 0.1);
        }
        .message.ai {
            border-left-color: #f97316;
            background: rgba(249, 115, 22, 0.1);
        }
        .message-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            font-size: 12px;
            color: #94a3b8;
        }
        .sender {
            font-weight: bold;
            color: #e2e8f0;
        }
        .user .sender {
            color: #06b6d4;
        }
        .ai .sender {
            color: #f97316;
        }
        .content {
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            background: rgba(15, 23, 42, 0.8);
            border-radius: 10px;
            border: 1px solid #334155;
            color: #94a3b8;
            font-size: 12px;
        }
        @media print {
            body {
                background: white !important;
                color: black !important;
            }
            .header, .footer {
                background: #f8fafc !important;
                border: 1px solid #e2e8f0 !important;
            }
            .message.user {
                background: #f0f9ff !important;
                border-left-color: #0ea5e9 !important;
            }
            .message.ai {
                background: #fff7ed !important;
                border-left-color: #ea580c !important;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🤖 AI Chat Conversation</h1>
        <div class="meta">
            <div>Export Date: ${new Date().toLocaleString()}</div>
            <div>Chat Mode: ${mode === 'convince-ai' ? 'Convince AI' : 'Prove Human'}</div>
            <div>Roast Level: ${roastLevel}/10</div>
            <div>Total Messages: ${messages.length}</div>
        </div>
    </div>
    
    <div class="conversation">
        ${messages.map(msg => `
            <div class="message ${msg.sender}">
                <div class="message-header">
                    <span class="sender">${msg.sender === 'user' ? '🧑 USER' : '🤖 AI'}</span>
                    <span class="timestamp">${new Date(msg.timestamp).toLocaleString()}</span>
                </div>
                <div class="content">${msg.content}</div>
            </div>
        `).join('')}
    </div>
    
    <div class="footer">
        <div>Generated by AI Chat Application</div>
        <div>End of Conversation</div>
    </div>
</body>
</html>
`;

  // Create a blob and trigger download
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  // Create a temporary link to trigger download
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  // Show instructions for PDF conversion
  setTimeout(() => {
    alert('HTML file downloaded! To convert to PDF:\n1. Open the downloaded HTML file in your browser\n2. Press Ctrl+P (or Cmd+P on Mac)\n3. Select "Save as PDF" as the destination\n4. Click Save');
  }, 100);
};

// Helper function to download files
const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Generate chat summary for export
export const generateChatSummary = (messages: Message[], mode: ChatMode) => {
  const userMessages = messages.filter(msg => msg.sender === 'user').length;
  const aiMessages = messages.filter(msg => msg.sender === 'ai').length;
  const totalCharacters = messages.reduce((sum, msg) => sum + msg.content.length, 0);
  const averageMessageLength = Math.round(totalCharacters / messages.length);
  
  const duration = messages.length > 1 
    ? new Date(messages[messages.length - 1].timestamp).getTime() - new Date(messages[0].timestamp).getTime()
    : 0;
  
  const durationMinutes = Math.round(duration / (1000 * 60));

  return {
    totalMessages: messages.length,
    userMessages,
    aiMessages,
    totalCharacters,
    averageMessageLength,
    durationMinutes,
    mode,
    startTime: messages[0]?.timestamp,
    endTime: messages[messages.length - 1]?.timestamp
  };
};