import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Clipboard,
  Alert,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { Message, ChatMode } from '../types/chat';

const { width } = Dimensions.get('window');

interface ChatMessageProps {
  message: Message;
  mode: ChatMode;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, mode }) => {
  const isUser = message.sender === 'user';
  const [isCopied, setIsCopied] = useState(false);
  
  // Simple entrance animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);  // Function to copy message content to clipboard
  const copyToClipboard = async () => {
    try {
      Clipboard.setString(message.content);
      setIsCopied(true);
      // Alert.alert('✅ Copied!', 'Message copied to clipboard');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      Alert.alert('❌ Error', 'Failed to copy message');
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
          <Text key={index} style={styles.boldText}>
            {boldText}
          </Text>
        );
      }
      return <Text key={index}>{part}</Text>;
    });
  };  // Get the appropriate AI avatar
  const getAiAvatar = () => {
    try {
      if (mode === 'convince-ai') {
        // Use Roxx avatar for convince-ai mode
        return require('../assets/roxx.png');
      } else {
        // Use Agent Wolf avatar for prove-human mode
        return require('../assets/agent_wolf.jpg');
      }
    } catch (error) {
      console.warn('Failed to load AI avatar:', error);
      return null;
    }
  };

  const aiAvatarSource = getAiAvatar();
  
  return (
    <Animated.View 
      style={[
        styles.container, 
        isUser ? styles.userContainer : styles.aiContainer,
        { opacity: fadeAnim }
      ]}
    >
      {/* Simple avatar */}
      <View style={[styles.avatarContainer, isUser ? styles.userAvatarContainer : styles.aiAvatarContainer]}>
        <View style={[styles.avatar, isUser ? styles.userAvatar : styles.aiAvatar]}>
          {isUser ? (
            <Text style={styles.avatarText}>👤</Text>
          ) : aiAvatarSource ? (
            <Image 
              source={aiAvatarSource}
              style={styles.aiAvatarImage}
              onError={(error) => {
                console.warn('Failed to load AI avatar image:', error);
                // Fallback handled by showing emoji instead
              }}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.avatarText}>
              {mode === 'convince-ai' ? '🤖' : '🕵️'}
            </Text>
          )}
        </View>
      </View>

      {/* Message bubble */}
      <View style={[styles.messageContainer, isUser ? styles.userMessageContainer : styles.aiMessageContainer]}>
        <TouchableOpacity 
          style={[
            styles.messageBubble, 
            isUser ? styles.userBubble : styles.aiBubble,
            message.isTyping && styles.typingBubble
          ]}
          onLongPress={copyToClipboard}
          activeOpacity={0.8}
          delayLongPress={500}
        >
          <Text style={[styles.messageText, isUser ? styles.userMessageText : styles.aiMessageText]}>
            {message.isTyping ? (
              <View style={styles.typingIndicator}>
                <Text style={styles.typingDot}>●</Text>
                <Text style={styles.typingDot}> ●</Text>
                <Text style={styles.typingDot}> ●</Text>
              </View>
            ) : (
              renderFormattedText(message.content)
            )}
          </Text>
          
          {/* Copy indicator */}
          {isCopied && (
            <View style={styles.copyIndicator}>
              <Text style={styles.copyIndicatorText}>✓ Copied</Text>
            </View>
          )}
        </TouchableOpacity>
        
        {/* Timestamp */}
        <View style={styles.timestampContainer}>
          <Text style={[styles.timestamp, isUser ? styles.userTimestamp : styles.aiTimestamp]}>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit'
            })}
          </Text>
          {!isUser && (
            <Text style={styles.aiMode}>
              {mode === 'convince-ai' ? '🤖 Roxx' : '🕵️ Agent Wolf'}
            </Text>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
    gap: 8,
  },
  userContainer: {
    flexDirection: 'row-reverse',
  },
  aiContainer: {
    flexDirection: 'row',
  },
  
  // Simple avatar styles
  avatarContainer: {
    flexShrink: 0,
  },
  userAvatarContainer: {
    marginLeft: 8,
  },
  aiAvatarContainer: {
    marginRight: 8,
  },
  
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'hidden',
  },
  userAvatar: {
    backgroundColor: '#06b6d4', // Cyan
  },
  aiAvatar: {
    backgroundColor: '#f97316', // Orange for AI
  },
  
  avatarText: {
    fontSize: 16,
    color: '#ffffff',
  },
  
  aiAvatarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  
  // Message bubble styles
  messageContainer: {
    flex: 1,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  aiMessageContainer: {
    alignItems: 'flex-start',
  },
  
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    position: 'relative',
  },
  userBubble: {
    backgroundColor: '#06b6d4',
    borderBottomRightRadius: 6,
  },
  aiBubble: {
    backgroundColor: '#1e293b', // Dark slate
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  
  typingBubble: {
    opacity: 0.8,
  },
  
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#ffffff',
  },
  userMessageText: {
    color: '#ffffff',
  },
  aiMessageText: {
    color: '#ffffff',
  },
  
  boldText: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  
  typingDot: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.6,
  },
  
  copyIndicator: {
    position: 'absolute',
    top: -25,
    right: 0,
    backgroundColor: 'rgba(34, 197, 94, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 10,
  },
  
  copyIndicatorText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  
  timestamp: {
    fontSize: 12,
    color: '#94a3b8',
    opacity: 0.7,
  },
  userTimestamp: {
    textAlign: 'right',
  },
  aiTimestamp: {
    textAlign: 'left',
  },
  
  aiMode: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '500',
  },
});
