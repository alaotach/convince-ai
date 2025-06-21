import { ChatMode } from '../types/chat';

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