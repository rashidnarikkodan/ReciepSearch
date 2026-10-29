import type { CorsOptions } from 'cors';
import { APP_CONFIG } from '../constants/index.js';

const rawClientUrl = process.env.CLIENT_URL || APP_CONFIG.DEFAULT_CLIENT_URL;

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

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    const isAllowed =
      configuredOrigins.includes(origin) ||
      APP_CONFIG.VERCEL_DEPLOYMENT_REGEX.test(origin) ||
      APP_CONFIG.LOCALHOST_REGEX.test(origin);

    if (isAllowed) {
      return callback(null, true);
    }

    return callback(null, false);
  },
  credentials: true,
  methods: [...APP_CONFIG.CORS_METHODS],
  allowedHeaders: [...APP_CONFIG.CORS_ALLOWED_HEADERS],
};
