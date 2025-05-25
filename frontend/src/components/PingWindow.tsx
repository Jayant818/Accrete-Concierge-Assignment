import React, { useEffect, useRef } from 'react';
import './PingWindow.css';
import type { Ping, PingWindowProps } from '../types/ping';


const PingWindow: React.FC<PingWindowProps> = ({ pings }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  };

  
  // Auto-scroll to bottom when new pings are added
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const isNearBottom = 
      container.scrollHeight - container.scrollTop - container.clientHeight < 100;

    if (isNearBottom || pings.length === 1) {
      // Small delay to ensure DOM has updated
      setTimeout(scrollToBottom, 50);
    }
  }, [pings]);


  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else {
      return date.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  };


  const renderPingBubble = (ping: Ping) => {
    const bubbleClass = `ping-bubble ${
      ping.fromMe ? 'ping-bubble--outgoing' : 'ping-bubble--incoming'
    }`;

    return (
      <div 
        key={ping.id} 
        className={bubbleClass}
        role="listitem"
        aria-label={`${ping.fromMe ? 'Sent' : 'Received'} message: ${ping.text}`}
      >
        <p className="ping-bubble__text">{ping.text}</p>
        <div className="ping-bubble__timestamp">
          {formatTimestamp(ping.ts)}
        </div>
      </div>
    );
  };

  return (
    <div className="ping-window" role="log" aria-label="Ping messages">
      <div className="ping-window__header">
        Ping Messages ({pings.length})
      </div>
      
      <div 
        className="ping-window__messages"
        ref={messagesContainerRef}
        role="list"
        aria-live="polite"
        aria-label="Message list"
      >
        {pings.length === 0 ? (
          <div className="ping-window__empty">
            No messages yet. Start a conversation!
          </div>
        ) : (
          <>
            {pings.map(renderPingBubble)}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    </div>
  );
};

export default PingWindow;
