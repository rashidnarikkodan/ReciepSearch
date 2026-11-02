import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { useAuth } from '../../hooks/useAuth';
import { recipeApi } from '../../apis/recipeApi';
import type { FavoriteRecipe } from '../../types/recipe.types';
import {
  FavoritesContext,
  type FavoritesContextType,
  type ToggleFavoritePayload,
} from './favoritesContextDef';
import { getErrorMessage } from '../../utils/error';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const favoriteIds = useMemo(() => {
    return new Set(favorites.map((f) => f.recipeId));
  }, [favorites]);

  const isFavorite = useCallback(
    (recipeId: number) => {
      return favoriteIds.has(recipeId);
    },
    [favoriteIds]
  );

  const fetchFavorites = useCallback(async () => {
    if (!isAuthenticated) {
      setFavorites([]);
      return;
    }

    try {
      setIsLoading(true);
      const data = await recipeApi.getFavorites();
      setFavorites(data || []);
    } catch (err) {
      console.error('Failed to fetch user favorites:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    let ignore = false;

    async function load() {
      if (!isAuthenticated) {
        return;
      }
      try {
        const data = await recipeApi.getFavorites();
        if (!ignore) {
          setFavorites(data || []);
        }
      } catch (err) {
        console.error('Failed to load favorites in effect:', err);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [isAuthenticated]);

  const removeFavorite = useCallback(
    async (recipeId: number) => {
      if (!isAuthenticated) return;

      const previous = favorites;
      setFavorites((prev) => prev.filter((f) => f.recipeId !== recipeId));

      try {
        await recipeApi.removeFavorite(recipeId);
      } catch (err: unknown) {
        setFavorites(previous);
        const errMsg = getErrorMessage(err);
        if (errMsg.includes('401') || errMsg.toLowerCase().includes('unauthorized') || errMsg.toLowerCase().includes('log in') || errMsg.toLowerCase().includes('sign in')) {
          openAuthModal('login');
          return;
        }
        console.error('Failed to remove favorite:', err);
        throw err;
      }
    },
    [isAuthenticated, favorites, openAuthModal]
  );

  const toggleFavorite = useCallback(
    async (recipe: ToggleFavoritePayload): Promise<boolean> => {
      if (!isAuthenticated) {
        openAuthModal('login');
        return false;
      }

      const isCurrentlyFavorited = favoriteIds.has(recipe.recipeId);
      const previous = favorites;

      if (isCurrentlyFavorited) {
        setFavorites((prev) => prev.filter((f) => f.recipeId !== recipe.recipeId));
        try {
          await recipeApi.removeFavorite(recipe.recipeId);
          return false;
        } catch (err: unknown) {
          setFavorites(previous);
          const errMsg = getErrorMessage(err);
          if (errMsg.includes('401') || errMsg.toLowerCase().includes('unauthorized') || errMsg.toLowerCase().includes('log in') || errMsg.toLowerCase().includes('sign in')) {
            openAuthModal('login');
            return false;
          }
          console.error('Failed to unfavorite recipe:', err);
          throw err;
        }
      } else {
        const optimisticEntry: FavoriteRecipe = {
          _id: `temp-${Date.now()}`,
          userId: 'me',
          recipeId: recipe.recipeId,
          title: recipe.title,
          image: recipe.image,
          readyInMinutes: recipe.readyInMinutes,
          servings: recipe.servings,
          createdAt: new Date().toISOString(),
        };

        setFavorites((prev) => [optimisticEntry, ...prev]);

        try {
          const saved = await recipeApi.addFavorite(recipe);
          if (saved) {
            setFavorites((prev) =>
              prev.map((f) => (f.recipeId === recipe.recipeId ? saved : f))
            );
          }
          return true;
        } catch (err: unknown) {
          setFavorites(previous);
          const errMsg = getErrorMessage(err);
          if (errMsg.includes('401') || errMsg.toLowerCase().includes('unauthorized') || errMsg.toLowerCase().includes('log in') || errMsg.toLowerCase().includes('sign in')) {
            openAuthModal('login');
            return false;
          }
          console.error('Failed to add favorite:', err);
          throw err;
        }
      }
    },
    [isAuthenticated, favoriteIds, favorites, openAuthModal]
  );

  const value: FavoritesContextType = {
    favorites,
    favoriteIds,
    isLoading,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    refetchFavorites: fetchFavorites,
    favoritesCount: favorites.length,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
