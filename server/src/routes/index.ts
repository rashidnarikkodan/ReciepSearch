import { Router } from 'express';
import recipeRoutes from './recipe.routes.js';
import favoriteRoutes from './favorite.routes.js';
import authRoutes from './auth.routes.js';
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../constants/index.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(HTTP_STATUS.OK).json({
    status: SUCCESS_MESSAGES.HEALTH.STATUS_OK,
    timestamp: new Date().toISOString(),
    service: SUCCESS_MESSAGES.HEALTH.SERVICE_NAME,
  });
});

router.use('/recipes', recipeRoutes);
router.use('/auth', authRoutes);
router.use('/favorites', favoriteRoutes);

export default router;
