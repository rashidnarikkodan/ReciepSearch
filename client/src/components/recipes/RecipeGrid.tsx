import { type ReactNode } from 'react';
import { RecipeCard } from './RecipeCard';
import { RecipeCardSkeleton } from './RecipeCardSkeleton';
import { AlertCircle, RefreshCw, SearchX } from 'lucide-react';
import { Button } from '../common/Button';
import type { RecipeSummary, FavoriteRecipe } from '../../types/recipe.types';

interface RecipeGridProps {
  recipes: (RecipeSummary | FavoriteRecipe)[];
  isLoading?: boolean;
  skeletonCount?: number;
  emptyTitle?: string;
  emptyMessage?: string;
  emptyAction?: ReactNode;
  onRemoveFavorite?: (recipeId: number) => void;
  showRemoveButton?: boolean;
  error?: string | null;
  onRetry?: () => void;
  className?: string;
}

export function RecipeGrid({
  recipes,
  isLoading = false,
  skeletonCount = 8,
  emptyTitle = 'No recipes found',
  emptyMessage = 'Try adjusting your search terms or filters.',
  emptyAction,
  onRemoveFavorite,
  showRemoveButton = false,
  error,
  onRetry,
  className = '',
}: RecipeGridProps) {
  if (error && !isLoading) {
    return (
      <div className="py-12 text-center max-w-sm mx-auto">
        <AlertCircle className="w-6 h-6 text-[#B42318] mx-auto mb-2" />
        <h3 className="text-sm font-semibold text-[#242824] mb-1">
          Unable to load recipes
        </h3>
        <p className="text-xs text-[#737873] mb-3">{error}</p>
        {onRetry && (
          <Button variant="secondary" size="sm" onClick={onRetry} className="gap-1.5 text-xs py-1 px-3">
            <RefreshCw className="w-3 h-3" />
            Try again
          </Button>
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 ${className}`}
      >
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <RecipeCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto">
        <SearchX className="w-8 h-8 text-[#A3A8A0] mx-auto mb-2" />
        <h3 className="text-sm font-semibold text-[#242824] mb-1">{emptyTitle}</h3>
        <p className="text-xs text-[#737873] mb-4 leading-relaxed">{emptyMessage}</p>
        {emptyAction}
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 ${className}`}
    >
      {recipes.map((recipe) => {
        const id = 'recipeId' in recipe ? recipe.recipeId : recipe.id;
        return (
          <RecipeCard
            key={id}
            recipe={recipe}
            onRemoveFavorite={onRemoveFavorite}
            showRemoveButton={showRemoveButton}
          />
        );
      })}
    </div>
  );
}
