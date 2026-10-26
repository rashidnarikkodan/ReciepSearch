import { Router } from 'express';
import recipeRoutes from './recipe.routes.js';
import favoriteRoutes from './favorite.routes.js';

const apiRouter = Router();

// Health check endpoint
apiRouter.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Recipe API',
  });
});

// Recipe discovery (Public, Read-Only)
apiRouter.use('/recipes', recipeRoutes);

// User Favorites (Authenticated)
apiRouter.use('/favorites', favoriteRoutes);

export default apiRouter;
