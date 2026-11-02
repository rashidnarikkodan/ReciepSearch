import { Router } from 'express';
import { container } from '../container.js';
import authenticate from '../middleware/auth.middleware.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = Router();
const { favoriteController } = container;

router.get('/', authenticate, asyncHandler(favoriteController.listFavorites));
router.post('/', authenticate, asyncHandler(favoriteController.addFavorite));
router.delete('/:recipeId', authenticate, asyncHandler(favoriteController.removeFavorite));
router.get('/:recipeId/check', authenticate, asyncHandler(favoriteController.checkIsFavorite));

export default router;
