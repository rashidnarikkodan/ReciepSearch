import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { Navbar } from '../components/Navbar';
import { RecipeGrid } from '../components/recipes/RecipeGrid';
import { Button } from '../components/common/Button';
import type { FavoriteRecipe } from '../types/recipe.types';

export function FavoritesPage() {
  const { favorites, isLoading, removeFavorite } = useFavorites();
  const [filterQuery, setFilterQuery] = useState('');

  const filteredFavorites = useMemo(() => {
    if (!filterQuery.trim()) return favorites;
    const q = filterQuery.toLowerCase();
    return favorites.filter((f: FavoriteRecipe) => f.title.toLowerCase().includes(q));
  }, [favorites, filterQuery]);

  const handleRemove = async (recipeId: number) => {
    await removeFavorite(recipeId);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#242824] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-full px-3.5 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-[#E6E8E3]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#242824]">
              Favorites
            </h1>
            <p className="text-xs sm:text-sm text-[#737873] mt-1">
              {favorites.length === 1
                ? '1 saved recipe'
                : `${favorites.length} saved recipes`}
            </p>
          </div>

          {favorites.length > 0 && (
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#737873]" />
              <input
                type="text"
                placeholder="Filter saved recipes..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full pl-8.5 pr-7 py-2 bg-[#FFFFFF] border border-[#D8DCD4] rounded-lg text-xs text-[#242824] placeholder-[#737873] focus:outline-hidden focus:border-[#365B45]"
              />
              {filterQuery && (
                <button
                  type="button"
                  onClick={() => setFilterQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#737873] hover:text-[#242824] p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        <RecipeGrid
          recipes={filteredFavorites}
          isLoading={isLoading}
          onRemoveFavorite={handleRemove}
          emptyTitle={
            filterQuery ? 'No matching favorites' : 'No favorites saved yet'
          }
          emptyMessage={
            filterQuery
              ? `No saved recipes match "${filterQuery}".`
              : 'Save recipes by clicking the heart icon on any recipe card.'
          }
          emptyAction={
            filterQuery ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setFilterQuery('')}
              >
                Clear filter
              </Button>
            ) : (
              <Link to="/recipes">
                <Button variant="primary" size="sm" className="px-4">
                  Explore Recipes
                </Button>
              </Link>
            )
          }
        />
      </main>

      <footer className="border-t border-[#EBECE8] bg-[#FFFFFF] py-4 text-center text-xs text-[#737873] mt-auto">
        RecipeSearch
      </footer>
    </div>
  );
}
