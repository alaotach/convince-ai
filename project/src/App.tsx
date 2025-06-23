import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { ChatContainer } from './components/ChatContainer';
import { Homepage } from './components/Homepage';
import { useChat } from './hooks/useChat';
import { SettingsModal } from './components/SettingsModal';

function App() {
  const [showHomepage, setShowHomepage] = useState(true);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const { 
    messages, 
    isLoading, 
    mode, 
    roastLevel, 
    sendUserMessage, 
    setMode, 
    setRoastLevel, 
    clearChat 
  } = useChat();

  useEffect(() => {
    // Check if API key is available
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      console.warn(`
🔑 OpenAI API Key Setup Required!

To use this chat application, you need to:
1. Get an API key from: https://platform.openai.com/api-keys
2. Create a .env file in the project root
3. Add: VITE_OPENAI_API_KEY=your_api_key_here
4. Restart the development server

The app will work without it, but you'll get error messages instead of AI responses.
      `);
    }
  }, []);

  const handleStartChat = (selectedMode: 'convince-ai' | 'prove-human') => {
    setMode(selectedMode);
    setShowHomepage(false);
  };

  const handleBackToHome = () => {
    setShowHomepage(true);
    clearChat();
  };

  if (showHomepage) {
    return <Homepage onStartChat={handleStartChat} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="flex flex-col h-screen max-w-3xl mx-auto">
        <Header 
          mode={mode} 
          onClearChat={clearChat} 
          onBackToHome={handleBackToHome} 
          onShowSettings={() => setIsSettingsModalOpen(true)}
          messages={messages}
          roastLevel={roastLevel}
        />
        <div className="flex-1 overflow-hidden">
          <ChatContainer 
            messages={messages}
            onSendMessage={sendUserMessage}
            isLoading={isLoading}
            mode={mode}
          />
        </div>
      </div>
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        mode={mode}
        onModeChange={setMode}
        roastLevel={roastLevel}
        onRoastLevelChange={setRoastLevel}
        messages={messages}
      />
    </div>
  );
}

export default App;