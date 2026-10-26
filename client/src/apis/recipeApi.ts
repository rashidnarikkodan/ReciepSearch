import apiClient from '../configs/apiClient';
import type {
  RecipeSummary,
  RecipeDetail,
  PaginationMeta,
  RecipeSearchParams,
  FavoriteRecipe,
} from '../types/recipe.types';

export interface RecipeListResponse {
  success: boolean;
  data: RecipeSummary[];
  pagination: PaginationMeta;
}

export interface RecipeDetailResponse {
  success: boolean;
  data: RecipeDetail;
}

export interface FavoriteListResponse {
  success: boolean;
  count: number;
  data: FavoriteRecipe[];
}

export interface FavoriteMutationResponse {
  success: boolean;
  message: string;
  data?: FavoriteRecipe;
}

export const recipeApi = {
  /**
   * Search & browse recipes (Public)
   */
  async getRecipes(params: RecipeSearchParams = {}): Promise<RecipeListResponse> {
    const res = await apiClient.get<RecipeListResponse>('/recipes', { params });
    return res.data;
  },

  /**
   * Get single recipe details by ID (Public)
   */
  async getRecipeById(id: number | string): Promise<RecipeDetail> {
    const res = await apiClient.get<RecipeDetailResponse>(`/recipes/${id}`);
    return res.data.data;
  },

  /**
   * List authenticated user's favorites (Protected)
   */
  async getFavorites(): Promise<FavoriteRecipe[]> {
    const res = await apiClient.get<FavoriteListResponse>('/favorites');
    return res.data.data;
  },

  /**
   * Save a recipe to user's favorites (Protected)
   */
  async addFavorite(data: {
    recipeId: number;
    title?: string;
    image?: string;
    readyInMinutes?: number;
    servings?: number;
  }): Promise<FavoriteRecipe | undefined> {
    const res = await apiClient.post<FavoriteMutationResponse>('/favorites', data);
    return res.data.data;
  },

  /**
   * Remove a recipe from user's favorites (Protected)
   */
  async removeFavorite(recipeId: number): Promise<void> {
    await apiClient.delete(`/favorites/${recipeId}`);
  },

  /**
   * Check if a recipe is currently favorited by user (Protected)
   */
  async checkIsFavorite(recipeId: number): Promise<boolean> {
    const res = await apiClient.get<{ success: boolean; data: { isFavorite: boolean } }>(
      `/favorites/${recipeId}/check`
    );
    return Boolean(res.data.data?.isFavorite);
  },
};
