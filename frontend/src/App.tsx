import { useState, useEffect } from 'react';
import './App.css';
import PingWindow from './components/PingWindow';
import type { Ping } from './types/ping';
import { sendMessageToBackend, generateMockUserId, testBackendConnection, ApiError } from './services/api';

// Hardcoded messages for demonstration
const hardcodedMessages: Ping[] = [
  {
    id: '1',
    text: 'Hey there! How are you doing?',
    ts: Date.now() - 300000, // 5 minutes ago
    fromMe: false
  },
  {
    id: '2',
    text: 'I\'m doing great, thanks for asking! How about you?',
    ts: Date.now() - 240000,
    fromMe: true
  },
  {
    id: '3',
    text: 'Pretty good! Just working on some React components.',
    ts: Date.now() - 180000,
    fromMe: false
  },
  {
    id: '4',
    text: 'That sounds interesting! What kind of components?',
    ts: Date.now() - 120000,
    fromMe: true
  },
  {
    id: '5',
    text: 'A chat-like ping window component. It has auto-scrolling and different styles for incoming vs outgoing messages.',
    ts: Date.now() - 60000,
    fromMe: false
  },
  {
    id: '6',
    text: 'Cool! That sounds like a useful component. Does it handle real-time updates?',
    ts: Date.now() - 30000,
    fromMe: true
  },
  {
    id: '7',
    text: 'Yes! It automatically scrolls to the bottom when new messages arrive, but only if the user is already near the bottom.',
    ts: Date.now() - 10000,
    fromMe: false
  }
];

function App() {
  const [pings, setPings] = useState<Ping[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [backendConnected, setBackendConnected] = useState<boolean | null>(null);
  const [userId] = useState(() => generateMockUserId());
  const [error, setError] = useState<string | null>(null);

  // Simulate loading messages progressively to demonstrate auto-scroll
  useEffect(() => {
    let isMounted = true; // Flag to prevent double loading in StrictMode

    const loadMessages = async () => {
      if (!isMounted) return;

      setIsLoading(true);
      for (let i = 0; i < hardcodedMessages.length; i++) {
        if (!isMounted) break; // Check if component is still mounted
        await new Promise(resolve => setTimeout(resolve, 300)); // Reduced delay
        setPings(prev => [...prev, hardcodedMessages[i]]);
      }
      setIsLoading(false);
    };

    loadMessages();

    // Cleanup function to prevent double loading
    return () => {
      isMounted = false;
    };
  }, []);

  // Test backend connection on component mount
  useEffect(() => {
    const checkBackend = async () => {
      const isConnected = await testBackendConnection();
      setBackendConnected(isConnected);
    };

    checkBackend();
  }, []);

  // Function to send a new message
  const sendMessage = async () => {
    if (inputMessage.trim() === '' || isSending) return;

    const messageText = inputMessage.trim();
    setInputMessage(''); // Clear input immediately for better UX
    setError(null);

    // Add message to UI immediately (optimistic update)
    const tempMessage: Ping = {
      id: `temp-${Date.now()}`,
      text: messageText,
      ts: Date.now(),
      fromMe: true
    };

    setPings(prev => [...prev, tempMessage]);
    setIsSending(true);

    try {
      // Send to backend
      const response = await sendMessageToBackend(messageText, userId);

      // Update the temporary message with server response
      setPings(prev => prev.map(ping =>
        ping.id === tempMessage.id
          ? { ...ping, id: `msg-${Date.now()}`, ts: new Date(response.ts).getTime() }
          : ping
      ));

      console.log('Message sent successfully:', response);
    } catch (err) {
      // Remove the failed message and show error
      setPings(prev => prev.filter(ping => ping.id !== tempMessage.id));

      if (err instanceof ApiError) {
        setError(`Failed to send message: ${err.message}`);
      } else {
        setError('Failed to send message. Please try again.');
      }

      // Restore the input text so user can retry
      setInputMessage(messageText);
      console.error('Failed to send message:', err);
    } finally {
      setIsSending(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>Ping Window Demo</h1>
        <p>A production-ready React component with chat interface</p>
        <div className="connection-status">
          {backendConnected === null ? (
            <span className="status-checking">Checking backend connection...</span>
          ) : backendConnected ? (
            <span className="status-connected">✅ Backend connected (Port 3000)</span>
          ) : (
            <span className="status-disconnected">❌ Backend disconnected</span>
          )}
          <span className="user-id">User ID: {userId.slice(0, 8)}...</span>
        </div>
      </div>

      <div className="app-content">
        <PingWindow pings={pings} />

        <div className="chat-input-container">
          {error && (
            <div className="error-message">
              {error}
              <button
                onClick={() => setError(null)}
                className="error-dismiss"
                aria-label="Dismiss error"
              >
                ×
              </button>
            </div>
          )}

          <div className="chat-input-wrapper">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                backendConnected === false
                  ? "Backend disconnected..."
                  : isSending
                    ? "Sending..."
                    : "Type your message..."
              }
              className="chat-input"
              disabled={isLoading || isSending || backendConnected === false}
            />
            <button
              onClick={sendMessage}
              disabled={
                inputMessage.trim() === '' ||
                isLoading ||
                isSending ||
                backendConnected === false
              }
              className={`send-button ${isSending ? 'sending' : ''}`}
              aria-label="Send message"
            >
              {isSending ? (
                <div className="spinner"></div>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22,2 15,22 11,13 2,9"></polygon>
                </svg>
              )}
            </button>
          </div>

          <div className="status-info">
            <p className="message-count">
              Total messages: {pings.length}
            </p>
            {isSending && (
              <p className="sending-status">Sending to backend...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
