import type { Request, Response } from 'express';
import type { IRecipeService } from '../interfaces/index.js';
import success from '../utils/success.js';
import { HTTP_STATUS } from '../constants/index.js';
import type { RecipeSearchQuery } from '../types/index.js';

export class RecipeController {
  constructor(private readonly service: IRecipeService) {}

  public listRecipes = async (req: Request, res: Response): Promise<void> => {
    const result = await this.service.listRecipes(req.query as unknown as RecipeSearchQuery);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result.recipes,
      pagination: result.pagination,
    });
  };

  public getRecipeDetails = async (req: Request, res: Response): Promise<void> => {
    const recipeId = Number(req.params.id);
    const recipe = await this.service.getRecipeDetails(recipeId);

    success(res, undefined, HTTP_STATUS.OK, recipe);
  };
}
