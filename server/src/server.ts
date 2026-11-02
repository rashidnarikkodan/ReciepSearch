import dotenv from 'dotenv';
import app from './app.js';
import { connectDB, disconnectDB } from './config/db.js';
import { APP_CONFIG } from './constants/index.js';

dotenv.config();


async function startServer(): Promise<void> {
  try {
    await connectDB();

    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : APP_CONFIG.DEFAULT_PORT;
    
    const server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });

    server.on('error', (error: NodeJS.ErrnoException) => {
      console.error('[Server] Server listener error:', error);
      process.exit(1);
    });

    const gracefulShutdown = async (signal: string): Promise<void> => {
      console.log(`[Server] Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        console.log('[Server] HTTP server closed');
        try {
          await disconnectDB();
          process.exit(0);
        } catch (err) {
          console.error('[Server] Error during database disconnect:', err);
          process.exit(1);
        }
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    console.error('[Server] Failed to start server:', error);
    process.exit(1);
  }
}

process.on('uncaughtException', (err: Error) => {
  console.error('[Server] Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  console.error('[Server] Unhandled Rejection:', reason);
  process.exit(1);
});

startServer();
