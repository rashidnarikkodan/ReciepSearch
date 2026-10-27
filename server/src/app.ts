import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import apiRouter from './routes/index.js';
import authRoutes from './routes/auth.routes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  const rawClientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const configuredOrigins = rawClientUrl
    .split(',')
    .map((origin) => {
      let trimmed = origin.trim();
      if (!trimmed) return '';
      if (!/^https?:\/\//i.test(trimmed)) {
        trimmed = `https://${trimmed}`;
      }
      return trimmed.replace(/\/+$/, '');
    })
    .filter(Boolean);

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        const isAllowed =
          configuredOrigins.includes(origin) ||
          /^https:\/\/reciep-search(-[a-z0-9-]+)?\.vercel\.app$/i.test(origin) ||
          /^http:\/\/localhost:\d+$/i.test(origin);

        if (isAllowed) {
          return callback(null, true);
        }
        return callback(null, false);
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  app.use('/auth', authRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api', apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
