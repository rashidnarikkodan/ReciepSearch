import type { Request, Response } from 'express';
import { FavoriteService } from '../services/favorite.service.js';
import { RecipeValidator } from '../validators/recipe.validator.js';
import { RecipeNotFoundError } from '../services/provider/spoonacular.service.js';

export class FavoriteController {
  /**
   * GET /api/favorites - List authenticated user's favorites
   */
  public static async listFavorites(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required to view favorites.',
        },
      });
      return;
    }

    const favorites = await FavoriteService.getFavoritesByUser(userId);

    res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites,
    });
  }

  /**
   * POST /api/favorites - Save a recipe to favorites for the authenticated user
   */
  public static async addFavorite(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required to save favorites.',
        },
      });
      return;
    }

    const rawRecipeId = req.body.recipeId;
    const validation = RecipeValidator.validateRecipeId(rawRecipeId);

    if (!validation.isValid || validation.sanitized === undefined) {
      res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_RECIPE_ID',
          message: validation.errors?.[0] || 'Valid recipeId is required.',
        },
      });
      return;
    }

    try {
      const favorite = await FavoriteService.addFavorite(userId, {
        recipeId: validation.sanitized,
        title: typeof req.body.title === 'string' ? req.body.title : undefined,
        image: typeof req.body.image === 'string' ? req.body.image : undefined,
        readyInMinutes: typeof req.body.readyInMinutes === 'number' ? req.body.readyInMinutes : undefined,
        servings: typeof req.body.servings === 'number' ? req.body.servings : undefined,
      });

      res.status(201).json({
        success: true,
        message: 'Recipe saved to favorites.',
        data: favorite,
      });
    } catch (err: unknown) {
      if (err instanceof RecipeNotFoundError) {
        res.status(404).json({
          success: false,
          error: {
            code: err.code,
            message: err.message,
          },
        });
        return;
      }

      res.status(500).json({
        success: false,
        error: {
          code: 'FAVORITE_SAVE_FAILED',
          message: 'Failed to save recipe to favorites. Please try again.',
        },
      });
    }
  }

  /**
   * DELETE /api/favorites/:recipeId - Remove a recipe from authenticated user's favorites
   */
  public static async removeFavorite(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required to remove favorites.',
        },
      });
      return;
    }

    const validation = RecipeValidator.validateRecipeId(req.params.recipeId);
    if (!validation.isValid || validation.sanitized === undefined) {
      res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_RECIPE_ID',
          message: validation.errors?.[0] || 'Valid recipeId is required.',
        },
      });
      return;
    }

    const removed = await FavoriteService.removeFavorite(userId, validation.sanitized);
    if (!removed) {
      res.status(404).json({
        success: false,
        error: {
          code: 'FAVORITE_NOT_FOUND',
          message: 'Favorite recipe not found in your saved list.',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Recipe removed from favorites.',
    });
  }

  /**
   * GET /api/favorites/:recipeId/check - Check if a recipe is saved as favorite by user
   */
  public static async checkIsFavorite(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required.',
        },
      });
      return;
    }

    const validation = RecipeValidator.validateRecipeId(req.params.recipeId);
    if (!validation.isValid || validation.sanitized === undefined) {
      res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_RECIPE_ID',
          message: validation.errors?.[0] || 'Valid recipeId is required.',
        },
      });
      return;
    }

    const isFav = await FavoriteService.isFavorite(userId, validation.sanitized);

    res.status(200).json({
      success: true,
      data: {
        isFavorite: isFav,
      },
    });
  }
}
