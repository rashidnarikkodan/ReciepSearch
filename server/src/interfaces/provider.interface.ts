import type {
  RecipeSearchQuery,
  RecipeDetail,
  ProviderSearchResult,
} from '../types/index.js';

export interface IRecipeProvider {
  searchRecipes(params: RecipeSearchQuery): Promise<ProviderSearchResult>;
  getRecipeInformation(recipeId: number): Promise<RecipeDetail>;
  clearCache(): void;
}
