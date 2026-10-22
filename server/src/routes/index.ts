import { Router } from 'express';
import recipeRoutes from './recipe.routes.js';

const apiRouter = Router();

// Health check endpoint
apiRouter.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Recipe API',
  });
});

// Mount recipe routes
apiRouter.use('/recipes', recipeRoutes);

export default apiRouter;
