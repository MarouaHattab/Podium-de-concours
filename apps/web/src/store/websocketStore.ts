import { create } from 'zustand';

interface WebSocketState {
  ws: WebSocket | null;
  connected: boolean;
  connect: () => void;
  disconnect: () => void;
  send: (data: any) => void;
  onMessage: (handler: (data: any) => void) => void;
}

let messageHandlers: ((data: any) => void)[] = [];

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
  ws: null,
  connected: false,

  connect: () => {
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected');
      set({ ws, connected: true });
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        messageHandlers.forEach((handler) => handler(data));
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      set({ ws: null, connected: false });
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  },

  disconnect: () => {
    const { ws } = get();
    if (ws) {
      ws.close();
      set({ ws: null, connected: false });
    }
  },

  send: (data) => {
    const { ws, connected } = get();
    if (ws && connected) {
      ws.send(JSON.stringify(data));
    }
  },

  onMessage: (handler) => {
    messageHandlers.push(handler);
  },
}));
