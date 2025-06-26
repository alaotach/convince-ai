import { Alert, Share } from 'react-native';
import { Message, ChatMode } from '../types/chat';

// Export chat conversation in different formats for React Native
export const exportChatConversation = async (
  messages: Message[],
  format: 'json' | 'txt' | 'pdf' | 'share',
  mode: ChatMode,
  roastLevel: number
) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `chat-${mode}-${timestamp}`;

  try {
    switch (format) {
      case 'json':
        await exportAsJSON(messages, filename, mode, roastLevel);
        break;
      case 'txt':
        await exportAsTXT(messages, filename, mode, roastLevel);
        break;
      case 'pdf':
        await exportAsPDF(messages, filename, mode, roastLevel);
        break;
      case 'share':
        await shareConversation(messages, mode, roastLevel);
        break;
      default:
        throw new Error('Unsupported export format');
    }
  } catch (error) {
    console.error('Export error:', error);
    Alert.alert('Export Error', 'Failed to export chat conversation. Please try again.');
  }
};

// Export as JSON format
const exportAsJSON = async (messages: Message[], filename: string, mode: ChatMode, roastLevel: number) => {
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
  await saveFile(jsonString, `${filename}.json`, 'application/json');
};

// Export as TXT format
const exportAsTXT = async (messages: Message[], filename: string, mode: ChatMode, roastLevel: number) => {
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
    const sender = msg.sender === 'user' ? '🧑 USER' : '🤖 AI';
    const timestamp = new Date(msg.timestamp).toLocaleString();
    const content = msg.content.trim();
    
    return `${sender} [${timestamp}]:
${content}

───────────────────────────────────────────────────────────────

`;
  }).join('');

  const footer = `
═══════════════════════════════════════════════════════════════
                        END OF CONVERSATION
═══════════════════════════════════════════════════════════════
`;

  const txtContent = header + conversationText + footer;
  await saveFile(txtContent, `${filename}.txt`, 'text/plain');
};

// Share conversation using native share functionality
const shareConversation = async (messages: Message[], mode: ChatMode, roastLevel: number) => {
  const conversationText = messages.map(msg => {
    const sender = msg.sender === 'user' ? '👤 You' : '🤖 AI';
    const content = msg.content.trim();
    return `${sender}: ${content}`;
  }).join('\n\n');

  const shareContent = `🤖 AI Chat Conversation
Mode: ${mode === 'convince-ai' ? 'Convince AI' : 'Prove Human'}
Roast Level: ${roastLevel}/10

${conversationText}

Exported from AI Chat App`;

  try {
    await Share.share({
      message: shareContent,
      title: 'AI Chat Conversation',
    });
  } catch (error) {
    console.error('Share error:', error);
    Alert.alert('Share Error', 'Failed to share conversation. Please try again.');
  }
};

// Export as PDF format (using HTML to PDF conversion for mobile)
const exportAsPDF = async (messages: Message[], filename: string, mode: ChatMode, roastLevel: number) => {
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

  // Share HTML content as PDF
  await Share.share({
    message: htmlContent,
    title: `${filename}.html`,
  });
  
  Alert.alert(
    '✅ PDF Export Complete',
    'HTML version has been shared. You can save it as PDF from the share menu or use a browser to print as PDF.',
    [{ text: 'OK', style: 'default' }]
  );
};

// Helper function to save files (requires react-native-fs)
const saveFile = async (content: string, filename: string, mimeType: string) => {
  try {
    // For now, use share as fallback since file saving requires additional permissions
    await Share.share({
      message: content,
      title: filename,
    });
    
    Alert.alert(
      '✅ Export Complete',
      `Chat conversation has been shared. You can save it from the share menu.`,
      [{ text: 'OK', style: 'default' }]
    );
  } catch (error) {
    console.error('File save error:', error);
    throw error;
  }
};

// Generate chat summary for export
export const generateChatSummary = (messages: Message[], mode: ChatMode) => {
  const userMessages = messages.filter(msg => msg.sender === 'user').length;
  const aiMessages = messages.filter(msg => msg.sender === 'ai').length;
  const totalCharacters = messages.reduce((acc, msg) => acc + msg.content.length, 0);
  const averageMessageLength = Math.round(totalCharacters / messages.length);
  
  const startTime = messages.length > 0 ? new Date(messages[0].timestamp) : new Date();
  const endTime = messages.length > 0 ? new Date(messages[messages.length - 1].timestamp) : new Date();
  const duration = Math.round((endTime.getTime() - startTime.getTime()) / 1000 / 60); // minutes

  return {
    mode: mode === 'convince-ai' ? 'Convince AI' : 'Prove Human',
    totalMessages: messages.length,
    userMessages,
    aiMessages,
    totalCharacters,
    averageMessageLength,
    duration: duration > 0 ? duration : 1,
    startTime: startTime.toLocaleString(),
    endTime: endTime.toLocaleString()
  };
};
