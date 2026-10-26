import { useState, useRef } from 'react';
import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import type { RecipeSearchParams } from '../../types/recipe.types';
import {
  CUISINE_OPTIONS,
  DIET_OPTIONS,
  MEAL_TYPE_OPTIONS,
  SORT_OPTIONS,
} from '../../constants/recipeFilters';

interface RecipeSearchFiltersProps {
  filters: RecipeSearchParams;
  onFilterChange: (newFilters: Partial<RecipeSearchParams>) => void;
  onResetFilters: () => void;
  isLoading?: boolean;
}

export function RecipeSearchFilters({
  filters,
  onFilterChange,
  onResetFilters,
  isLoading = false,
}: RecipeSearchFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(filters.query || '');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [includeIng, setIncludeIng] = useState(filters.includeIngredients || '');
  const [excludeIng, setExcludeIng] = useState(filters.excludeIngredients || '');
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      onFilterChange({ query: value.trim() || undefined, page: 1 });
    }, 400);
  };

  const handleClearSearch = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    setSearchTerm('');
    onFilterChange({ query: undefined, page: 1 });
  };

  const handleApplyIngredients = () => {
    onFilterChange({
      includeIngredients: includeIng.trim() || undefined,
      excludeIngredients: excludeIng.trim() || undefined,
      page: 1,
    });
  };

  const handleReset = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    setSearchTerm('');
    setIncludeIng('');
    setExcludeIng('');
    onResetFilters();
  };

  const hasActiveFilters = Boolean(
    filters.query ||
      filters.cuisine ||
      filters.diet ||
      filters.type ||
      filters.sort ||
      filters.includeIngredients ||
      filters.excludeIngredients
  );

  return (
    <div className="space-y-3.5 pb-4 border-b border-[#E6E8E3]">
      <div className="flex gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737873]" />
          <input
            type="text"
            placeholder="Search recipes or ingredients (e.g. Pasta, Salmon, Curry)..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-[#FFFFFF] border border-[#D8DCD4] rounded-lg text-xs sm:text-sm text-[#242824] placeholder-[#737873] focus:outline-hidden focus:border-[#365B45] transition-colors"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737873] hover:text-[#242824] p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`px-3.5 py-2.5 border rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
            showAdvanced || filters.includeIngredients || filters.excludeIngredients
              ? 'border-[#365B45] text-[#365B45] bg-[#365B45]/5'
              : 'border-[#D8DCD4] bg-[#FFFFFF] text-[#737873] hover:text-[#242824]'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>More</span>
        </button>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="px-3 py-2.5 border border-[#D8DCD4] bg-[#FFFFFF] text-xs text-[#737873] hover:text-[#B42318] rounded-lg flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <select
          value={filters.cuisine || ''}
          onChange={(e) =>
            onFilterChange({ cuisine: e.target.value || undefined, page: 1 })
          }
          className="py-1.5 px-2.5 bg-[#FFFFFF] border border-[#D8DCD4] rounded-lg text-xs text-[#242824] focus:outline-hidden focus:border-[#365B45] cursor-pointer"
        >
          <option value="">All Cuisines</option>
          {CUISINE_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={filters.diet || ''}
          onChange={(e) =>
            onFilterChange({ diet: e.target.value || undefined, page: 1 })
          }
          className="py-1.5 px-2.5 bg-[#FFFFFF] border border-[#D8DCD4] rounded-lg text-xs text-[#242824] focus:outline-hidden focus:border-[#365B45] cursor-pointer"
        >
          <option value="">All Diets</option>
          {DIET_OPTIONS.map((d) => (
            <option key={d} value={d}>
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={filters.type || ''}
          onChange={(e) =>
            onFilterChange({ type: e.target.value || undefined, page: 1 })
          }
          className="py-1.5 px-2.5 bg-[#FFFFFF] border border-[#D8DCD4] rounded-lg text-xs text-[#242824] focus:outline-hidden focus:border-[#365B45] cursor-pointer"
        >
          <option value="">All Meal Types</option>
          {MEAL_TYPE_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={filters.sort || 'popularity'}
          onChange={(e) => {
            const matched = SORT_OPTIONS.find((s) => s.value === e.target.value);
            onFilterChange({
              sort: e.target.value,
              sortDirection: (matched?.dir as 'asc' | 'desc') || 'desc',
              page: 1,
            });
          }}
          className="py-1.5 px-2.5 bg-[#FFFFFF] border border-[#D8DCD4] rounded-lg text-xs text-[#242824] focus:outline-hidden focus:border-[#365B45] cursor-pointer ml-auto"
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              Sort: {s.label}
            </option>
          ))}
        </select>
      </div>

      {showAdvanced && (
        <div className="pt-2 pb-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-[#737873] mb-1 font-medium">
              Must include ingredients
            </label>
            <div className="flex gap-1.5">
              <input
                type="text"
                placeholder="garlic, tomato, basil"
                value={includeIng}
                onChange={(e) => setIncludeIng(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyIngredients()}
                className="flex-1 py-1 px-2.5 bg-[#FFFFFF] border border-[#D8DCD4] rounded-lg text-xs text-[#242824] focus:outline-hidden focus:border-[#365B45]"
              />
              <button
                type="button"
                onClick={handleApplyIngredients}
                className="px-3 py-1 bg-[#242824] text-white rounded-lg text-xs font-medium hover:bg-black cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[#737873] mb-1 font-medium">
              Exclude ingredients
            </label>
            <div className="flex gap-1.5">
              <input
                type="text"
                placeholder="dairy, peanuts, pork"
                value={excludeIng}
                onChange={(e) => setExcludeIng(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyIngredients()}
                className="flex-1 py-1 px-2.5 bg-[#FFFFFF] border border-[#D8DCD4] rounded-lg text-xs text-[#242824] focus:outline-hidden focus:border-[#365B45]"
              />
              <button
                type="button"
                onClick={handleApplyIngredients}
                className="px-3 py-1 bg-[#242824] text-white rounded-lg text-xs font-medium hover:bg-black cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {hasActiveFilters && (
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          {filters.query && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#F0F2ED] text-[#242824] text-xs rounded-md">
              "{filters.query}"
              <button
                type="button"
                onClick={handleClearSearch}
                className="hover:text-[#B42318] cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.cuisine && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#F0F2ED] text-[#242824] text-xs rounded-md capitalize">
              {filters.cuisine}
              <button
                type="button"
                onClick={() => onFilterChange({ cuisine: undefined, page: 1 })}
                className="hover:text-[#B42318] cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.diet && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#F0F2ED] text-[#242824] text-xs rounded-md capitalize">
              {filters.diet}
              <button
                type="button"
                onClick={() => onFilterChange({ diet: undefined, page: 1 })}
                className="hover:text-[#B42318] cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.type && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#F0F2ED] text-[#242824] text-xs rounded-md capitalize">
              {filters.type}
              <button
                type="button"
                onClick={() => onFilterChange({ type: undefined, page: 1 })}
                className="hover:text-[#B42318] cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.includeIngredients && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#F0F2ED] text-[#242824] text-xs rounded-md">
              + {filters.includeIngredients}
              <button
                type="button"
                onClick={() => {
                  setIncludeIng('');
                  onFilterChange({ includeIngredients: undefined, page: 1 });
                }}
                className="hover:text-[#B42318] cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.excludeIngredients && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#F0F2ED] text-[#242824] text-xs rounded-md">
              - {filters.excludeIngredients}
              <button
                type="button"
                onClick={() => {
                  setExcludeIng('');
                  onFilterChange({ excludeIngredients: undefined, page: 1 });
                }}
                className="hover:text-[#B42318] cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
