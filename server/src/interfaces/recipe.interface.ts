import type {
  RecipeSearchQuery,
  RecipeDetail,
  ProviderSearchResult,
} from '../types/index.js';

export interface IRecipeService {
  listRecipes(query: RecipeSearchQuery): Promise<ProviderSearchResult>;
  getRecipeDetails(recipeId: number): Promise<RecipeDetail>;
}
