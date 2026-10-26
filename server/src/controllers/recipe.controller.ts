import type { Request, Response } from 'express';
import { RecipeValidator } from '../validators/recipe.validator.js';
import { RecipeService } from '../services/recipe.service.js';
import { ProviderError, RecipeNotFoundError, ProviderRateLimitError } from '../services/provider/spoonacular.service.js';

export class RecipeController {
  /**
   * GET /api/recipes - Public recipe search & listing with filters, pagination, and sorting
   */
  public static async listRecipes(req: Request, res: Response): Promise<void> {
    const validation = RecipeValidator.validateSearchQuery(req.query);

    if (!validation.isValid || !validation.sanitized) {
      res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_QUERY_PARAMETERS',
          message: 'Invalid search or filter parameters provided.',
          details: validation.errors,
        },
      });
      return;
    }

    try {
      const result = await RecipeService.listRecipes(validation.sanitized);

      res.status(200).json({
        success: true,
        data: result.recipes,
        pagination: result.pagination,
      });
    } catch (err: unknown) {
      if (err instanceof ProviderRateLimitError) {
        if (err.retryAfter) {
          res.setHeader('Retry-After', err.retryAfter);
        }
        res.status(429).json({
          success: false,
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
          error: {
            code: err.code,
            message: err.message,
          },
        });
        return;
      }

      res.status(502).json({
        success: false,
        error: {
          code: 'RECIPE_PROVIDER_UNAVAILABLE',
          message: 'Recipe search is temporarily unavailable. Please try again later.',
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
      res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_RECIPE_ID',
          message: validation.errors?.[0] || 'Recipe ID must be a positive integer.',
        },
      });
      return;
    }

    try {
      const recipe = await RecipeService.getRecipeDetails(validation.sanitized);

      res.status(200).json({
        success: true,
        data: recipe,
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

      if (err instanceof ProviderRateLimitError) {
        if (err.retryAfter) {
          res.setHeader('Retry-After', err.retryAfter);
        }
        res.status(429).json({
          success: false,
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
          error: {
            code: err.code,
            message: err.message,
          },
        });
        return;
      }

      res.status(502).json({
        success: false,
        error: {
          code: 'RECIPE_PROVIDER_UNAVAILABLE',
          message: 'Recipe details are temporarily unavailable. Please try again later.',
        },
      });
    }
  }
}
