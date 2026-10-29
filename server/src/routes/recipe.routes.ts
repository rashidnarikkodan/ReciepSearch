import { Router } from 'express';
import { RecipeController } from '../controllers/recipe.controller.js';
import { RecipeService } from '../services/recipe.service.js';
import { spoonacularService } from '../services/provider/spoonacular.service.js';
import { recipeRateLimiter } from '../middleware/rateLimiter.js';
import asyncHandler from '../utils/asyncHandler.js';
import validate from '../middleware/validate.middleware.js';
import { recipeQuerySchema, recipeIdParamSchema } from '../validators/recipe.validator.js';

const router = Router();

const recipeService = new RecipeService(spoonacularService);
const recipeController = new RecipeController(recipeService);

router.get('/', recipeRateLimiter, validate({ query: recipeQuerySchema }), asyncHandler(recipeController.listRecipes));
router.get('/:id', recipeRateLimiter, validate({ params: recipeIdParamSchema }), asyncHandler(recipeController.getRecipeDetails));

export default router;
