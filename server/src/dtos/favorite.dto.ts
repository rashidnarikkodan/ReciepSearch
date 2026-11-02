export interface AddFavoriteRequestDto {
  recipeId: number;
  title?: string;
  image?: string;
  readyInMinutes?: number;
  servings?: number;
}

export interface FavoriteResponseDto {
  id?: string;
  recipeId: number;
  userId?: string;
  title: string;
  image?: string;
  readyInMinutes?: number;
  servings?: number;
  createdAt?: string;
}

export interface CheckFavoriteResponseDto {
  isFavorite: boolean;
}
