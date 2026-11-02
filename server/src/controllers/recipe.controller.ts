import type { Request, Response } from 'express';
import type { IRecipeService } from '../interfaces/index.js';
import { ResponseFactory } from '../core/response/response.factory.js';
import type { RecipeQueryDto } from '../dtos/recipe.dto.js';

export class RecipeController {
  constructor(private readonly service: IRecipeService) {}

  public listRecipes = async (req: Request, res: Response): Promise<void> => {
    const result = await this.service.listRecipes(req.query as unknown as RecipeQueryDto);
    ResponseFactory.paginated(res, result.recipes, result.pagination);
  };

  public getRecipeDetails = async (req: Request, res: Response): Promise<void> => {
    const recipeId = Number(req.params.id);
    const recipe = await this.service.getRecipeDetails(recipeId);
    ResponseFactory.success(res, recipe);
  };
}
