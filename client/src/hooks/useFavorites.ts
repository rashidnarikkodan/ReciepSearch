import { useContext } from 'react';
import {
  FavoritesContext,
  type FavoritesContextType,
  type ToggleFavoritePayload,
} from '../context/favorites/favoritesContextDef';

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

export type { ToggleFavoritePayload, FavoritesContextType };
