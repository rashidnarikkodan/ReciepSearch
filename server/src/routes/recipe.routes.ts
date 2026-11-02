import { Router } from 'express';
import { container } from '../container.js';
import { recipeRateLimiter } from '../middleware/rateLimiter.js';
import asyncHandler from '../utils/asyncHandler.js';
import validate from '../middleware/validate.middleware.js';
import { recipeQuerySchema, recipeIdParamSchema } from '../validators/recipe.validator.js';

const router = Router();
const { recipeController } = container;

router.get('/', recipeRateLimiter, validate({ query: recipeQuerySchema }), asyncHandler(recipeController.listRecipes));
router.get('/:id', recipeRateLimiter, validate({ params: recipeIdParamSchema }), asyncHandler(recipeController.getRecipeDetails));

export default router;
