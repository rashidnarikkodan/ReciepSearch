import { Router } from 'express';
import { RecipeController } from '../controllers/recipe.controller.js';
import { recipeRateLimiter } from '../middleware/rateLimiter.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

// Public recipe discovery routes (strictly read-only, no recipe CRUD)
router.get('/', recipeRateLimiter, asyncHandler(RecipeController.listRecipes));
router.get('/:id', recipeRateLimiter, asyncHandler(RecipeController.getRecipeDetails));

export default router;
