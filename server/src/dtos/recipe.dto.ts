import type {
  RecipeSummary,
  RecipeDetail,
  PaginationMeta,
  RecipeSearchQuery,
} from '../types/recipe.types.js';

export type RecipeQueryDto = RecipeSearchQuery;

export type RecipeSummaryDto = RecipeSummary;

export type RecipeDetailDto = RecipeDetail;

export interface RecipeSearchResponseDto {
  recipes: RecipeSummaryDto[];
  pagination: PaginationMeta;
}
