import { useState, useEffect } from 'react';
import { ChevronDown, AlertCircle, CheckCircle2 } from 'lucide-react';
import { recipeApi } from '../apis/recipeApi';
import { Navbar } from '../components/Navbar';
import { RecipeSearchFilters } from '../components/recipes/RecipeSearchFilters';
import { RecipeGrid } from '../components/recipes/RecipeGrid';
import { Button } from '../components/common/Button';
import type { RecipeSummary, PaginationMeta, RecipeSearchParams } from '../types/recipe.types';

const INITIAL_FILTERS: RecipeSearchParams = {
  query: undefined,
  cuisine: undefined,
  diet: undefined,
  type: undefined,
  includeIngredients: undefined,
  excludeIngredients: undefined,
  sort: 'popularity',
  sortDirection: 'desc',
  page: 1,
  limit: 12,
};

export function RecipePage() {
  const [filters, setFilters] = useState<RecipeSearchParams>(INITIAL_FILTERS);
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    limit: 12,
    totalResults: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    recipeApi
      .getRecipes({ ...filters, page: 1 })
      .then((response) => {
        if (!ignore && response?.success) {
          setRecipes(response.data || []);
          setPagination(
            response.pagination || {
              page: 1,
              limit: filters.limit || 12,
              totalResults: response.data?.length || 0,
              totalPages: 1,
            }
          );
          setError(null);
          setLoadMoreError(null);
        }
      })
      .catch((err: unknown) => {
        if (!ignore) {
          const msg =
            err instanceof Error
              ? err.message
              : 'Failed to load recipes. Please check your connection.';
          setError(msg);
          setRecipes([]);
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<RecipeSearchParams>) => {
    setIsLoading(true);
    setFilters((prev: RecipeSearchParams) => ({
      ...prev,
      ...newFilters,
      page: 1,
    }));
  };

  const handleResetFilters = () => {
    setIsLoading(true);
    setFilters(INITIAL_FILTERS);
  };

  const handleLoadMore = async () => {
    if (isLoadingMore || pagination.page >= pagination.totalPages) return;

    const nextPage = pagination.page + 1;
    setIsLoadingMore(true);
    setLoadMoreError(null);

    try {
      const response = await recipeApi.getRecipes({
        ...filters,
        page: nextPage,
      });

      if (response && response.success) {
        setRecipes((prev) => {
          const existingIds = new Set(prev.map((r) => r.id));
          const newItems = (response.data || []).filter((r) => !existingIds.has(r.id));
          return [...prev, ...newItems];
        });

        const incomingPagination = response.pagination;
        setPagination({
          page: nextPage,
          limit: filters.limit || 12,
          totalResults: incomingPagination ? incomingPagination.totalResults : recipes.length,
          totalPages: incomingPagination ? incomingPagination.totalPages : nextPage,
        });
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Failed to load more recipes.';
      setLoadMoreError(msg);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleRetry = () => {
    setIsLoading(true);
    setFilters((prev) => ({ ...prev }));
  };

  const hasMore = pagination.page < pagination.totalPages;

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#242824] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <div className="space-y-1 pb-3 border-b border-[#E6E8E3]">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#242824]">
            Recipes
          </h1>
          <p className="text-xs sm:text-sm text-[#737873]">
            Explore home-cooked dishes, filter by diet, and save your favorites.
          </p>
        </div>

        <RecipeSearchFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          isLoading={isLoading}
        />

        <RecipeGrid
          recipes={recipes}
          isLoading={isLoading}
          error={error}
          onRetry={handleRetry}
          emptyTitle="No recipes found"
          emptyMessage="No recipes matched your search criteria. Try removing some filters."
        />

        {!isLoading && recipes.length > 0 && (
          <div className="flex flex-col items-center justify-center pt-4 pb-2 space-y-2">
            {hasMore ? (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  isLoading={isLoadingMore}
                  onClick={handleLoadMore}
                  className="gap-1.5"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                  Load more recipes
                </Button>

                <span className="text-[11px] text-[#737873]">
                  Showing {recipes.length} of {pagination.totalResults} recipes
                </span>

                {loadMoreError && (
                  <div className="flex items-center gap-1.5 text-xs text-[#B42318] bg-[#FEF3F2] border border-[#FECDCA] px-2.5 py-1 rounded">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{loadMoreError}</span>
                  </div>
                )}
              </>
            ) : (
              <div className="inline-flex items-center gap-1.5 text-center py-4 text-xs text-[#737873] border-t border-[#EBECE8] w-full justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#365B45]" />
                <span>All {recipes.length} recipes loaded</span>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-[#EBECE8] bg-[#FFFFFF] py-4 text-center text-xs text-[#737873] mt-auto">
        RecipeSearch
      </footer>
    </div>
  );
}
