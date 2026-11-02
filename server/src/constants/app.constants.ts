export const APP_CONFIG = {
  DEFAULT_PORT: 5000,
  DEFAULT_CLIENT_URL: 'http://localhost:5173',
  DEFAULT_MONGODB_URI: 'mongodb://localhost:27017/recipesearch',
  RATE_LIMIT_CLEANUP_INTERVAL_MS: 5 * 60 * 1000,
  AUTH_RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000,
  AUTH_RATE_LIMIT_MAX: 20,
  RECIPE_RATE_LIMIT_WINDOW_MS: 60 * 1000,
  RECIPE_RATE_LIMIT_MAX: 60,
  CORS_METHODS: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  CORS_ALLOWED_HEADERS: ['Content-Type', 'Authorization'],
  VERCEL_DEPLOYMENT_REGEX: /^https:\/\/reciep-search(-[a-z0-9-]+)?\.vercel\.app$/i,
  LOCALHOST_REGEX: /^http:\/\/localhost:\d+$/i,
} as const;
