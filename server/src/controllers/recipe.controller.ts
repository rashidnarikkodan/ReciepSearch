import type { Request, Response } from 'express';
import { RecipeValidator } from '../validators/recipe.validator.js';
import { RecipeService } from '../services/recipe.service.js';
import {
  ProviderError,
  RecipeNotFoundError,
  ProviderRateLimitError,
} from '../services/provider/spoonacular.service.js';
import {
  HTTP_STATUS,
  ERROR_CODES,
  ERROR_MESSAGES,
} from '../constants/index.js';

export class RecipeController {
  /**
   * GET /api/recipes - Public recipe search & listing with filters, pagination, and sorting
   */
  public static async listRecipes(req: Request, res: Response): Promise<void> {
    const validation = RecipeValidator.validateSearchQuery(req.query);

    if (!validation.isValid || !validation.sanitized) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: ERROR_MESSAGES.RECIPE.INVALID_QUERY_PARAMS,
        error: {
          code: ERROR_CODES.INVALID_QUERY_PARAMETERS,
          message: ERROR_MESSAGES.RECIPE.INVALID_QUERY_PARAMS,
          details: validation.errors,
        },
      });
      return;
    }

    try {
      const result = await RecipeService.listRecipes(validation.sanitized);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: result.recipes,
        pagination: result.pagination,
      });
    } catch (err: unknown) {
      if (err instanceof ProviderRateLimitError) {
        if (err.retryAfter) {
          res.setHeader('Retry-After', err.retryAfter);
        }
        res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({
          success: false,
          message: err.message,
          error: {
            code: err.code,
            message: err.message,
          },
        });
        return;
      }

      if (err instanceof ProviderError) {
        res.status(err.statusCode).json({
          success: false,
          message: err.message,
          error: {
            code: err.code,
            message: err.message,
          },
        });
        return;
      }

      res.status(HTTP_STATUS.BAD_GATEWAY).json({
        success: false,
        message: ERROR_MESSAGES.RECIPE.SEARCH_UNAVAILABLE,
        error: {
          code: ERROR_CODES.RECIPE_PROVIDER_UNAVAILABLE,
          message: ERROR_MESSAGES.RECIPE.SEARCH_UNAVAILABLE,
        },
      });
    }
  }

  /**
   * GET /api/recipes/:id - Public recipe details retrieval
   */
  public static async getRecipeDetails(req: Request, res: Response): Promise<void> {
    const validation = RecipeValidator.validateRecipeId(req.params.id);

    if (!validation.isValid || validation.sanitized === undefined) {
      const message = validation.errors?.[0] || ERROR_MESSAGES.RECIPE.INVALID_RECIPE_ID;
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
      const recipe = await RecipeService.getRecipeDetails(validation.sanitized);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: recipe,
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

      if (err instanceof ProviderRateLimitError) {
        if (err.retryAfter) {
          res.setHeader('Retry-After', err.retryAfter);
        }
        res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({
          success: false,
          message: err.message,
          error: {
            code: err.code,
            message: err.message,
          },
        });
        return;
      }

      if (err instanceof ProviderError) {
        res.status(err.statusCode).json({
          success: false,
          message: err.message,
          error: {
            code: err.code,
            message: err.message,
          },
        });
        return;
      }

      res.status(HTTP_STATUS.BAD_GATEWAY).json({
        success: false,
        message: ERROR_MESSAGES.RECIPE.DETAILS_UNAVAILABLE,
        error: {
          code: ERROR_CODES.RECIPE_PROVIDER_UNAVAILABLE,
          message: ERROR_MESSAGES.RECIPE.DETAILS_UNAVAILABLE,
        },
      });
    }
  }
}
