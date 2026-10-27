import type { Request, Response } from 'express';
import { FavoriteService } from '../services/favorite.service.js';
import { RecipeValidator } from '../validators/recipe.validator.js';
import { RecipeNotFoundError } from '../services/provider/spoonacular.service.js';
import {
  HTTP_STATUS,
  ERROR_CODES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from '../constants/index.js';

export class FavoriteController {
  /**
   * GET /api/favorites - List authenticated user's favorites
   */
  public static async listFavorites(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.FAVORITES.AUTH_REQUIRED_VIEW,
        error: {
          code: ERROR_CODES.UNAUTHORIZED,
          message: ERROR_MESSAGES.FAVORITES.AUTH_REQUIRED_VIEW,
        },
      });
      return;
    }

    const favorites = await FavoriteService.getFavoritesByUser(userId);

    res.status(HTTP_STATUS.OK).json({
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
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.FAVORITES.AUTH_REQUIRED_SAVE,
        error: {
          code: ERROR_CODES.UNAUTHORIZED,
          message: ERROR_MESSAGES.FAVORITES.AUTH_REQUIRED_SAVE,
        },
      });
      return;
    }

    const rawRecipeId = req.body.recipeId;
    const validation = RecipeValidator.validateRecipeId(rawRecipeId);

    if (!validation.isValid || validation.sanitized === undefined) {
      const message = validation.errors?.[0] || ERROR_MESSAGES.FAVORITES.RECIPE_ID_REQUIRED;
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message,
        error: {
          code: ERROR_CODES.INVALID_RECIPE_ID,
          message,
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

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: SUCCESS_MESSAGES.FAVORITES.RECIPE_SAVED,
        data: favorite,
      });
    } catch (err: unknown) {
      if (err instanceof RecipeNotFoundError) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: err.message,
          error: {
            code: err.code,
            message: err.message,
          },
        });
        return;
      }

      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.FAVORITES.SAVE_FAILED,
        error: {
          code: ERROR_CODES.FAVORITE_SAVE_FAILED,
          message: ERROR_MESSAGES.FAVORITES.SAVE_FAILED,
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
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.FAVORITES.AUTH_REQUIRED_REMOVE,
        error: {
          code: ERROR_CODES.UNAUTHORIZED,
          message: ERROR_MESSAGES.FAVORITES.AUTH_REQUIRED_REMOVE,
        },
      });
      return;
    }

    const validation = RecipeValidator.validateRecipeId(req.params.recipeId);
    if (!validation.isValid || validation.sanitized === undefined) {
      const message = validation.errors?.[0] || ERROR_MESSAGES.FAVORITES.RECIPE_ID_REQUIRED;
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message,
        error: {
          code: ERROR_CODES.INVALID_RECIPE_ID,
          message,
        },
      });
      return;
    }

    const removed = await FavoriteService.removeFavorite(userId, validation.sanitized);
    if (!removed) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: ERROR_MESSAGES.FAVORITES.NOT_FOUND,
        error: {
          code: ERROR_CODES.FAVORITE_NOT_FOUND,
          message: ERROR_MESSAGES.FAVORITES.NOT_FOUND,
        },
      });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.FAVORITES.RECIPE_REMOVED,
    });
  }

  /**
   * GET /api/favorites/:recipeId/check - Check if a recipe is saved as favorite by user
   */
  public static async checkIsFavorite(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.FAVORITES.AUTH_REQUIRED_CHECK,
        error: {
          code: ERROR_CODES.UNAUTHORIZED,
          message: ERROR_MESSAGES.FAVORITES.AUTH_REQUIRED_CHECK,
        },
      });
      return;
    }

    const validation = RecipeValidator.validateRecipeId(req.params.recipeId);
    if (!validation.isValid || validation.sanitized === undefined) {
      const message = validation.errors?.[0] || ERROR_MESSAGES.FAVORITES.RECIPE_ID_REQUIRED;
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message,
        error: {
          code: ERROR_CODES.INVALID_RECIPE_ID,
          message,
        },
      });
      return;
    }

    const isFav = await FavoriteService.isFavorite(userId, validation.sanitized);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        isFavorite: isFav,
      },
    });
  }
}
