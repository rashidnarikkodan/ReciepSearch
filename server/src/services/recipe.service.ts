import type { IRecipeService, IRecipeProvider } from '../interfaces/index.js';
import type {
  RecipeSearchQuery,
  RecipeDetail,
  ProviderSearchResult,
} from '../types/index.js';

export class RecipeService implements IRecipeService {
  constructor(private readonly provider: IRecipeProvider) {}

  public async listRecipes(query: RecipeSearchQuery): Promise<ProviderSearchResult> {
    return this.provider.searchRecipes(query);
  }

  public async getRecipeDetails(recipeId: number): Promise<RecipeDetail> {
    return this.provider.getRecipeInformation(recipeId);
  }
}