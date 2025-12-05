import { WebSocketServer, WebSocket } from 'ws';

let wss: WebSocketServer;
const clients = new Set<WebSocket>();

export const initWebSocket = (server: WebSocketServer) => {
  wss = server;

  wss.on('connection', (ws: WebSocket) => {
    console.log('WebSocket client connected');
    clients.add(ws);

    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message.toString());
        console.log('Received:', data);
        
        // Echo back for now
        ws.send(JSON.stringify({ type: 'ACK', data }));
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
      clients.delete(ws);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      clients.delete(ws);
    });
  });
};

export const broadcast = (data: any) => {
  const message = JSON.stringify(data);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};
