# PingWindow Component

A production-ready React component for displaying chat-like ping messages with auto-scrolling functionality and integrated chat input interface.

## Features

- ✅ **Scrollable message list** - Displays messages in a scrollable container
- ✅ **Incoming vs Outgoing bubbles** - Different styles for messages based on `fromMe` property
- ✅ **Auto-scroll to bottom** - Automatically scrolls to newest messages when they arrive
- ✅ **Smart scrolling** - Only auto-scrolls if user is already near the bottom
- ✅ **Chat input interface** - Modern text input with send button and Enter key support
- ✅ **Real-time messaging** - Type and send messages instantly
- ✅ **Responsive design** - Works on desktop and mobile devices
- ✅ **Accessibility** - ARIA labels and semantic HTML
- ✅ **TypeScript support** - Fully typed with TypeScript interfaces
- ✅ **Smooth animations** - Fade-in animations for new messages
- ✅ **Timestamp formatting** - Smart timestamp display (time for today, date+time for older)
- ✅ **Loading states** - Proper handling of loading states and disabled inputs
- ✅ **Keyboard shortcuts** - Enter to send, proper focus management

## Props

```typescript
interface PingWindowProps {
  pings: Ping[];
}

interface Ping {
  id: string;        // Unique identifier for the message
  text: string;      // Message content
  ts: number;        // Timestamp in milliseconds
  fromMe: boolean;   // true for outgoing, false for incoming
}
```

## Usage

```tsx
import PingWindow from './components/PingWindow';
import type { Ping } from './types/ping';

const messages: Ping[] = [
  {
    id: '1',
    text: 'Hello there!',
    ts: Date.now() - 60000, // 1 minute ago
    fromMe: false
  },
  {
    id: '2',
    text: 'Hi! How are you?',
    ts: Date.now(),
    fromMe: true
  }
];

function App() {
  return <PingWindow pings={messages} />;
}
```

## Styling

The component uses CSS modules with the following main classes:

- `.ping-window` - Main container
- `.ping-window__messages` - Scrollable messages area
- `.ping-bubble` - Individual message bubble
- `.ping-bubble--incoming` - Incoming message style
- `.ping-bubble--outgoing` - Outgoing message style

## Performance Considerations

- Uses `useRef` for efficient DOM manipulation
- Implements smart scrolling to avoid interrupting user reading
- Optimized re-renders with proper dependency arrays
- Smooth scrolling with CSS `scroll-behavior`

## Browser Support

- Modern browsers with ES6+ support
- CSS Grid and Flexbox support required
- Smooth scrolling supported in most modern browsers
