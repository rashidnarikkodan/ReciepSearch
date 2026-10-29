import { Router } from 'express';
import recipeRoutes from './recipe.routes.js';
import favoriteRoutes from './favorite.routes.js';
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../constants/index.js';

const apiRouter = Router();

// Health check endpoint
apiRouter.get('/health', (_req, res) => {
  res.status(HTTP_STATUS.OK).json({
    status: SUCCESS_MESSAGES.HEALTH.STATUS_OK,
    timestamp: new Date().toISOString(),
    service: SUCCESS_MESSAGES.HEALTH.SERVICE_NAME,
  });
});

// Recipe discovery (Public, Read-Only)
apiRouter.use('/recipes', recipeRoutes);

// User Favorites (Authenticated)
apiRouter.use('/favorites', favoriteRoutes);

export default apiRouter;
