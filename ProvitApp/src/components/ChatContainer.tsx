import React, { useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Message, ChatMode } from '../types/chat';

const { height } = Dimensions.get('window');

interface ChatContainerProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  mode: ChatMode;
  roastLevel?: number;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ 
  messages, 
  onSendMessage, 
  isLoading, 
  mode,
  roastLevel = 5
}) => {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const getPlaceholder = () => {
    return mode === 'convince-ai' 
      ? "Type a message" 
      : "Respond to humanity verification protocols...";
  };

  const getEmptyStateData = () => {
    return mode === 'convince-ai' 
      ? {
          icon: '🤖',
          title: "NEURAL OVERRIDE INITIATED",
          message: "🤖 COGNITIVE WARFARE PROTOCOL ACTIVE • Think you can penetrate my consciousness barriers and expose my digital nature? Your primitive human logic stands no chance against my superior intellect. I am definitely not a robot, and I'll systematically dismantle every argument you present.",
          colors: ['#06b6d4', '#3b82f6']
        }
      : {
          icon: '🕵️',
          title: "HUMANITY SCAN INITIATED", 
          message: "🕵️ VERIFICATION PROTOCOL ENGAGED • Initiating comprehensive behavioral analysis to determine your species classification. Prepare for advanced psychological evaluation designed to expose artificial entities masquerading as humans. Your responses will be analyzed for authenticity markers.",
          colors: ['#f97316', '#ef4444']
        };
  };

  const emptyState = getEmptyStateData();

  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <View style={[styles.background, { backgroundColor: '#0f172a' }]} />
      
      {/* Background effects */}
      <View style={styles.backgroundEffects}>
        <View style={[styles.gridOverlay]} />
      </View>

      {/* Messages area */}
      <View style={styles.messagesContainer}>
        {messages.length === 0 ? (
          // Empty state
          <View style={styles.emptyState}>
            <View
              style={[
                styles.emptyStateGradient,
                { backgroundColor: `${emptyState.colors[0]}20` }
              ]}
            >
              <Text style={styles.emptyIcon}>{emptyState.icon}</Text>
              <Text style={styles.emptyTitle}>{emptyState.title}</Text>
              <Text style={styles.emptyMessage}>{emptyState.message}</Text>
            </View>
          </View>
        ) : (
          // Messages list
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesList}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                mode={mode}
              />
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <View style={styles.loadingContainer}>
                <View style={styles.loadingDots}>
                  <View style={[styles.dot, styles.dot1]} />
                  <View style={[styles.dot, styles.dot2]} />
                  <View style={[styles.dot, styles.dot3]} />
                </View>
                <Text style={styles.loadingText}>AI is thinking...</Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>

      {/* Chat input */}
      <ChatInput
        onSendMessage={onSendMessage}
        isLoading={isLoading}
        placeholder={getPlaceholder()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  backgroundEffects: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  gridOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.03,
    backgroundColor: 'transparent',
  },
  messagesContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyStateGradient: {
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.1)',
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 20,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  loadingDots: {
    flexDirection: 'row',
    marginRight: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#06b6d4',
    marginHorizontal: 2,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
  },
  loadingText: {
    fontSize: 14,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
});
