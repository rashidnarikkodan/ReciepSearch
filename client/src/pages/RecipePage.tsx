import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { recipeApi } from '../apis/recipeApi';
import { Navbar } from '../components/Navbar';
import { RecipeSearchFilters } from '../components/recipes/RecipeSearchFilters';
import { RecipeGrid } from '../components/recipes/RecipeGrid';
import { getErrorMessage } from '../utils/error';
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
  const [searchParams] = useSearchParams();

  const getInitialFilters = (): RecipeSearchParams => ({
    query: searchParams.get('query') || undefined,
    cuisine: searchParams.get('cuisine') || undefined,
    diet: searchParams.get('diet') || undefined,
    type: searchParams.get('type') || undefined,
    sort: searchParams.get('sort') || 'popularity',
    sortDirection: (searchParams.get('sortDirection') as 'asc' | 'desc') || 'desc',
    includeIngredients: searchParams.get('includeIngredients') || undefined,
    excludeIngredients: searchParams.get('excludeIngredients') || undefined,
    page: 1,
    limit: 12,
  });

  const [filters, setFilters] = useState<RecipeSearchParams>(getInitialFilters);
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

  // Sync when searchParams change in the URL
  const searchParamsString = searchParams.toString();
  const [prevParamsString, setPrevParamsString] = useState(searchParamsString);

  if (prevParamsString !== searchParamsString) {
    setPrevParamsString(searchParamsString);
    setFilters((prev) => ({
      ...prev,
      cuisine: searchParams.get('cuisine') || undefined,
      diet: searchParams.get('diet') || undefined,
      type: searchParams.get('type') || undefined,
      sort: searchParams.get('sort') || 'popularity',
      query: searchParams.get('query') || undefined,
      page: 1,
    }));
  }

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
          const msg = getErrorMessage(err, 'Failed to load recipes. Please check your connection.');
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
      setLoadMoreError(getErrorMessage(err, 'Failed to load more recipes.'));
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

      <main className="flex-1 w-full px-3 sm:px-6 lg:px-8 py-3.5 sm:py-6 space-y-3.5 sm:space-y-5">
        <div className="space-y-0.5 sm:space-y-1 pb-2.5 sm:pb-3 border-b border-[#E6E8E3]">
          <h1 className="text-xl sm:text-3xl font-bold text-[#242824]">
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
          <div className="py-8 flex flex-col items-center gap-2">
            {hasMore ? (
              <>
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#D8DCD4] bg-white hover:border-[#365B45] hover:text-[#365B45] text-xs font-medium text-[#242824] transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isLoadingMore ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-[#365B45] border-t-transparent rounded-full animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <span>Load more recipes</span>
                      <span className="text-[#737873]">↓</span>
                    </>
                  )}
                </button>

                <span className="text-[11px] text-[#737873]">
                  Showing {recipes.length} of {pagination.totalResults} recipes
                </span>

                {loadMoreError && (
                  <span className="text-xs text-[#B42318]">{loadMoreError}</span>
                )}
              </>
            ) : (
              <span className="text-xs text-[#737873]">
                All {recipes.length} recipes loaded
              </span>
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
