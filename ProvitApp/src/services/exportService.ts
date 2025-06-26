import { Alert, Share } from 'react-native';
import { Message, ChatMode } from '../types/chat';

// Export chat conversation in different formats for React Native
export const exportChatConversation = async (
  messages: Message[],
  format: 'json' | 'txt' | 'share',
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

// Helper function to save files using share functionality
const saveFile = async (content: string, filename: string, mimeType: string) => {
  try {
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
