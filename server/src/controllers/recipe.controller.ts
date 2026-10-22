import type { Request, Response } from 'express';
import { RecipeService } from '../services/recipe.service.js';
import { AuthService } from '../services/auth.service.js';

export class RecipeController {
  // Public: search and filter recipes
  public static async getAll(req: Request, res: Response): Promise<void> {
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;
    const category = typeof req.query.category === 'string' ? req.query.category : undefined;

    const recipes = RecipeService.getAll(search, category);

    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  }

  // Public: retrieve recipe categories
  public static async getCategories(_req: Request, res: Response): Promise<void> {
    const categories = RecipeService.getCategories();
    res.status(200).json({
      success: true,
      data: categories,
    });
  }

  // Public: retrieve single recipe details
  public static async getById(req: Request, res: Response): Promise<void> {
    const rawId = req.params.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;

    if (!id) {
      res.status(400).json({ success: false, message: 'Recipe ID is required.' });
      return;
    }

    const recipe = RecipeService.getById(id);

    if (!recipe) {
      res.status(404).json({
        success: false,
        message: 'Recipe not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: recipe,
    });
  }

  // Protected: retrieve saved recipes of authenticated user
  public static async getSaved(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      res.status(401).json({ success: false, message: 'Authentication required.' });
      return;
    }

    const savedIds = await AuthService.getSavedRecipes(userId);
    const savedRecipes = RecipeService.getByIds(savedIds);

    res.status(200).json({
      success: true,
      count: savedRecipes.length,
      data: {
        savedIds,
        recipes: savedRecipes,
      },
    });
  }

  // Protected: save recipe to user's favorites
  public static async saveRecipe(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id || req.user?._id;
    const rawId = req.params.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Authentication required.' });
      return;
    }

    if (!id) {
      res.status(400).json({ success: false, message: 'Recipe ID is required.' });
      return;
    }

    const recipe = RecipeService.getById(id);
    if (!recipe) {
      res.status(404).json({ success: false, message: 'Recipe not found.' });
      return;
    }

    const updatedSaved = await AuthService.addSavedRecipe(userId, id);
    res.status(200).json({
      success: true,
      message: 'Recipe saved to favorites',
      data: { savedRecipes: updatedSaved },
    });
  }

  // Protected: unsave recipe from user's favorites
  public static async unsaveRecipe(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id || req.user?._id;
    const rawId = req.params.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Authentication required.' });
      return;
    }

    if (!id) {
      res.status(400).json({ success: false, message: 'Recipe ID is required.' });
      return;
    }

    const updatedSaved = await AuthService.removeSavedRecipe(userId, id);
    res.status(200).json({
      success: true,
      message: 'Recipe removed from favorites',
      data: { savedRecipes: updatedSaved },
    });
  }
}
