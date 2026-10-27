import { Router } from 'express';
import { FavoriteController } from '../controllers/favorite.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

// Protected user-specific favorites (requires authentication)
router.get('/', authenticateToken, asyncHandler(FavoriteController.listFavorites));
router.post('/', authenticateToken, asyncHandler(FavoriteController.addFavorite));
router.delete('/:recipeId', authenticateToken, asyncHandler(FavoriteController.removeFavorite));
router.get('/:recipeId/check', authenticateToken, asyncHandler(FavoriteController.checkIsFavorite));

export default router;
