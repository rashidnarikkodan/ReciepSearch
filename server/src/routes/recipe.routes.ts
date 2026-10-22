import { Router } from 'express';
import { RecipeController } from '../controllers/recipe.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

// Public routes: guests can search, filter, and view recipe details
router.get('/', asyncHandler(RecipeController.getAll));
router.get('/categories', asyncHandler(RecipeController.getCategories));
router.get('/saved', authenticateToken, asyncHandler(RecipeController.getSaved));
router.get('/:id', asyncHandler(RecipeController.getById));

// Protected routes: users can save/unsave recipes to their own profile
router.post('/saved/:id', authenticateToken, asyncHandler(RecipeController.saveRecipe));
router.delete('/saved/:id', authenticateToken, asyncHandler(RecipeController.unsaveRecipe));

export default router;
