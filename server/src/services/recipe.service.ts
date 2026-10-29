import {
  SpoonacularService,
  type ProviderSearchResult,
} from './provider/spoonacular.service.js';
import type {
  RecipeSearchQuery,
  RecipeDetail,
} from '../types/recipe.types.js';

export class RecipeService {
  /**
   * Search and filter recipes from provider (Read-only)
   */
  public static async listRecipes(query: RecipeSearchQuery): Promise<ProviderSearchResult> {
    return SpoonacularService.searchRecipes(query);
  }

  /**
   * Retrieve normalized recipe details by external recipe ID (Read-only)
   */
  public static async getRecipeDetails(recipeId: number): Promise<RecipeDetail> {
    return SpoonacularService.getRecipeInformation(recipeId);
  }
}
