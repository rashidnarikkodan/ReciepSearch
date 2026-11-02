export interface AddFavoriteDTO {
  recipeId: number;
  title?: string;
  image?: string;
  readyInMinutes?: number;
  servings?: number;
}

export interface FavoriteItem {
  userId: string;
  recipeId: number;
  title: string;
  image?: string;
  readyInMinutes?: number;
  servings?: number;
  createdAt: Date;
}

export interface CheckFavoriteResult {
  isFavorite: boolean;
}
