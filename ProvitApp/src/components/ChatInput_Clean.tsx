import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Alert,
} from 'react-native';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isLoading, 
  placeholder = "Enter neural transmission..." 
}) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  
  const textInputRef = useRef<TextInput>(null);

  // Focus animations
  useEffect(() => {
    if (isFocused) {
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isFocused]);

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      if (message.trim().length > 1000) {
        Alert.alert('Message Too Long', 'Please keep your message under 1000 characters.');
        return;
      }
      
      onSendMessage(message.trim());
      setMessage('');
      textInputRef.current?.blur();
    }
  };

  const startPulseAnimation = () => {
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const messageLength = message.length;
  const isNearLimit = messageLength > 800;
  const canSend = message.trim() && !isLoading;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
    >
      <View style={styles.container}>
        {/* Background glow */}
        <Animated.View 
          style={[
            styles.backgroundGlow, 
            {
              opacity: glowAnim,
              backgroundColor: isFocused ? 'rgba(6, 182, 212, 0.15)' : 'rgba(71, 85, 105, 0.1)'
            }
          ]} 
          pointerEvents="none"
        />
        
        {/* Main input container */}
        <Animated.View style={[
          styles.inputContainer,
          {
            borderColor: isFocused ? 'rgba(6, 182, 212, 0.8)' : 'rgba(71, 85, 105, 0.3)',
            shadowOpacity: isFocused ? 0.3 : 0.1
          }
        ]}>
          
          {/* Input row */}
          <View style={styles.inputRow}>
            {/* Status indicator */}
            <View style={styles.statusIndicator}>
              <View style={[
                styles.statusDot,
                { backgroundColor: isLoading ? '#f59e0b' : canSend ? '#10b981' : '#6b7280' }
              ]} />
            </View>
            
            <TextInput
              ref={textInputRef}
              style={[
                styles.textInput,
                isFocused && styles.textInputFocused,
                isNearLimit && styles.textInputWarning
              ]}
              value={message}
              onChangeText={setMessage}
              placeholder={placeholder}
              placeholderTextColor={isFocused ? "#94a3b8" : "#64748b"}
              multiline
              maxLength={1000}
              editable={!isLoading}
              returnKeyType="send"
              onSubmitEditing={handleSend}
              onFocus={handleFocus}
              onBlur={handleBlur}
              blurOnSubmit={false}
              textAlignVertical="top"
              autoCorrect={true}
              autoCapitalize="sentences"
            />
            
            {/* Character counter */}
            {messageLength > 500 && (
              <View style={styles.characterCounter}>
                <Text style={[
                  styles.characterCountText,
                  isNearLimit && styles.characterCountWarning
                ]}>
                  {messageLength}/1000
                </Text>
              </View>
            )}
            
            {/* Send button */}
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  !canSend && styles.sendButtonDisabled,
                  isLoading && styles.sendButtonLoading
                ]}
                onPress={() => {
                  startPulseAnimation();
                  handleSend();
                }}
                disabled={!canSend}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.sendButtonGradient,
                    {
                      backgroundColor: isLoading 
                        ? '#f59e0b' 
                        : canSend 
                          ? '#06b6d4' 
                          : '#374151'
                    }
                  ]}
                >
                  <Text style={styles.sendButtonText}>
                    {isLoading ? '⏳' : canSend ? '🚀' : '💭'}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
        
        {/* Loading indicator */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>🧠 Neural processing...</Text>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    backgroundColor: '#0f172a',
  },
  container: {
    position: 'relative',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0f172a',
  },
  backgroundGlow: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 25,
    zIndex: 0,
  },
  
  inputContainer: {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(71, 85, 105, 0.3)',
    padding: 16,
    position: 'relative',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    minHeight: 44,
  },
  
  statusIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 0,
    maxHeight: 120,
    lineHeight: 22,
    textAlignVertical: 'top',
    minHeight: 44,
  },
  
  textInputFocused: {
    color: '#e2e8f0',
  },
  
  textInputWarning: {
    color: '#fbbf24',
  },
  
  characterCounter: {
    position: 'absolute',
    top: -25,
    right: 10,
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    zIndex: 10,
  },
  
  characterCountText: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '500',
  },
  
  characterCountWarning: {
    color: '#fbbf24',
  },
  
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
  },
  
  sendButtonDisabled: {
    opacity: 0.5,
  },
  
  sendButtonLoading: {
    opacity: 0.8,
  },
  
  sendButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  
  sendButtonText: {
    fontSize: 18,
  },
  
  // Loading indicator
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    gap: 8,
  },
  
  loadingText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '500',
  },
});
