import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import teamRoutes from './routes/teams';
import pathRoutes from './routes/path';
import progressRoutes from './routes/progress';
import leagueRoutes from './routes/leagues';
import missionRoutes from './routes/missions';
import leaderboardRoutes from './routes/leaderboard';
import storeRoutes from './routes/store';
import webhookRoutes from './routes/webhooks';
import { initWebSocket } from './websocket';
import { startCronJobs } from './cron';

dotenv.config();

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/teams', teamRoutes);
app.use('/path', pathRoutes);
app.use('/progress', progressRoutes);
app.use('/leagues', leagueRoutes);
app.use('/missions', missionRoutes);
app.use('/leaderboard', leaderboardRoutes);
app.use('/store', storeRoutes);
app.use('/webhooks', webhookRoutes);

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// Initialize WebSocket
initWebSocket(wss);

// Start cron jobs
startCronJobs();

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 WebSocket server ready`);
  console.log(`⏰ Cron jobs started`);
});
