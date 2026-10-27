import { createContext } from 'react';
import type { FavoriteRecipe } from '../../types/recipe.types';

export interface ToggleFavoritePayload {
  recipeId: number;
  title: string;
  image?: string;
  readyInMinutes?: number;
  servings?: number;
}

export interface FavoritesContextType {
  favorites: FavoriteRecipe[];
  favoriteIds: Set<number>;
  isLoading: boolean;
  isFavorite: (recipeId: number) => boolean;
  toggleFavorite: (recipe: ToggleFavoritePayload) => Promise<boolean>;
  removeFavorite: (recipeId: number) => Promise<void>;
  refetchFavorites: () => Promise<void>;
  favoritesCount: number;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
