import { Router } from 'express';
import { FavoriteController } from '../controllers/favorite.controller.js';
import { FavoriteService } from '../services/favorite.service.js';
import { favoriteRepository } from '../repositories/favorite.repository.js';
import { RecipeService } from '../services/recipe.service.js';
import { spoonacularService } from '../services/provider/spoonacular.service.js';
import authenticate from '../middleware/auth.middleware.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = Router();

const recipeService = new RecipeService(spoonacularService);
const favoriteService = new FavoriteService(favoriteRepository, recipeService);
const favoriteController = new FavoriteController(favoriteService);

router.get('/', authenticate, asyncHandler(favoriteController.listFavorites));
router.post('/', authenticate, asyncHandler(favoriteController.addFavorite));
router.delete('/:recipeId', authenticate, asyncHandler(favoriteController.removeFavorite));
router.get('/:recipeId/check', authenticate, asyncHandler(favoriteController.checkIsFavorite));

export default router;
