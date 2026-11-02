import { useState, useRef, useEffect } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
  const [includeIng, setIncludeIng] = useState(filters.includeIngredients || '');
  const [excludeIng, setExcludeIng] = useState(filters.excludeIngredients || '');
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Drag-to-dismiss bottom sheet state
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartYRef = useRef(0);

  const closeBottomSheet = () => {
    setIsOpen(false);
    setDragOffset(0);
    setIsDragging(false);
  };

  // Lock body scroll when bottom sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartYRef.current = e.clientY;
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaY = e.clientY - dragStartYRef.current;
    if (deltaY > 0) {
      setDragOffset(deltaY);
    } else {
      setDragOffset(0);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setIsDragging(false);
    if (dragOffset > 75) {
      closeBottomSheet();
    }
    setDragOffset(0);
  };

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

  const activeFilterCount = [
    Boolean(filters.cuisine),
    Boolean(filters.diet),
    Boolean(filters.type),
    Boolean(filters.sort && filters.sort !== 'popularity'),
    Boolean(filters.includeIngredients),
    Boolean(filters.excludeIngredients),
  ].filter(Boolean).length;

  const hasActiveFilters = Boolean(
    filters.query ||
      filters.cuisine ||
      filters.diet ||
      filters.type ||
      (filters.sort && filters.sort !== 'popularity') ||
      filters.includeIngredients ||
      filters.excludeIngredients
  );

  const currentSortLabel =
    SORT_OPTIONS.find((s) => s.value === filters.sort)?.label || filters.sort;

  return (
    <div className="space-y-3 pb-3 border-b border-[#E6E8E3]">
      {/* Search and Filter Toggle Row */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 min-w-0">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737873]" />
          <input
            type="text"
            placeholder="Search recipes, ingredients..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-9.5 pr-8 py-2 sm:py-2.5 bg-[#FFFFFF] border border-[#D8DCD4] rounded-lg text-xs sm:text-sm text-[#242824] placeholder-[#737873] focus:outline-hidden focus:border-[#365B45] transition-colors"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#737873] hover:text-[#242824] p-1 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          className={`px-3 sm:px-3.5 lg:px-4 py-2 sm:py-2.5 border rounded-lg text-xs lg:text-sm font-medium flex items-center gap-1.5 lg:gap-2 transition-colors cursor-pointer shrink-0 ${
            isOpen || activeFilterCount > 0
              ? 'border-[#365B45] text-[#365B45] bg-[#365B45]/10 font-semibold'
              : 'border-[#D8DCD4] bg-[#FFFFFF] text-[#242824] hover:border-[#365B45]'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 lg:w-4.5 lg:h-4.5 rounded-full bg-[#365B45] text-white text-[10px] lg:text-xs font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Quick Reset Button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            title="Reset all filters"
            className="p-2 sm:px-3 sm:py-2.5 border border-[#D8DCD4] bg-[#FFFFFF] text-xs text-[#737873] hover:text-[#B42318] hover:border-[#B42318] rounded-lg flex items-center gap-1 cursor-pointer shrink-0 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        )}
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          {filters.query && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F0F2ED] text-[#242824] text-xs rounded-md">
              "{filters.query}"
              <button
                type="button"
                onClick={handleClearSearch}
                className="hover:text-[#B42318] cursor-pointer ml-0.5"
                aria-label="Remove search filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.cuisine && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F0F2ED] text-[#242824] text-xs rounded-md capitalize">
              Cuisine: {filters.cuisine}
              <button
                type="button"
                onClick={() => onFilterChange({ cuisine: undefined, page: 1 })}
                className="hover:text-[#B42318] cursor-pointer ml-0.5"
                aria-label="Remove cuisine filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.diet && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F0F2ED] text-[#242824] text-xs rounded-md capitalize">
              Diet: {filters.diet}
              <button
                type="button"
                onClick={() => onFilterChange({ diet: undefined, page: 1 })}
                className="hover:text-[#B42318] cursor-pointer ml-0.5"
                aria-label="Remove diet filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.type && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F0F2ED] text-[#242824] text-xs rounded-md capitalize">
              Type: {filters.type}
              <button
                type="button"
                onClick={() => onFilterChange({ type: undefined, page: 1 })}
                className="hover:text-[#B42318] cursor-pointer ml-0.5"
                aria-label="Remove meal type filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.sort && filters.sort !== 'popularity' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F0F2ED] text-[#242824] text-xs rounded-md">
              Sort: {currentSortLabel}
              <button
                type="button"
                onClick={() =>
                  onFilterChange({
                    sort: 'popularity',
                    sortDirection: 'desc',
                    page: 1,
                  })
                }
                className="hover:text-[#B42318] cursor-pointer ml-0.5"
                aria-label="Reset sort"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.includeIngredients && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F0F2ED] text-[#242824] text-xs rounded-md">
              + {filters.includeIngredients}
              <button
                type="button"
                onClick={() => {
                  setIncludeIng('');
                  onFilterChange({ includeIngredients: undefined, page: 1 });
                }}
                className="hover:text-[#B42318] cursor-pointer ml-0.5"
                aria-label="Remove include ingredients"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.excludeIngredients && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F0F2ED] text-[#242824] text-xs rounded-md">
              - {filters.excludeIngredients}
              <button
                type="button"
                onClick={() => {
                  setExcludeIng('');
                  onFilterChange({ excludeIngredients: undefined, page: 1 });
                }}
                className="hover:text-[#B42318] cursor-pointer ml-0.5"
                aria-label="Remove exclude ingredients"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-[#737873] hover:text-[#B42318] underline ml-1 cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Draggable Bottom-to-Top Sheet (No close button) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/40 transition-opacity duration-300"
            onClick={closeBottomSheet}
            aria-hidden="true"
          />

          {/* Bottom Sheet Modal Container */}
          <div
            style={{
              transform: `translateY(${dragOffset}px)`,
              transition: isDragging ? 'none' : 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="relative z-10 w-full max-w-2xl lg:max-w-4xl mx-auto bg-[#FFFFFF] rounded-t-2xl lg:rounded-t-3xl border-t border-x border-[#E3E6E0] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
          >
            {/* Draggable Header / Pull Handle */}
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="w-full pt-3 pb-2.5 lg:pt-4 lg:pb-3 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none bg-[#FFFFFF]"
            >
              <div className="w-12 h-1.5 lg:w-16 lg:h-2 bg-[#D4D8CF] rounded-full hover:bg-[#B8BDB2] transition-colors" />
              <span className="text-[10px] lg:text-xs text-[#A3A8A0] font-medium tracking-tight mt-1.5">
                drag down to close
              </span>
            </div>

            {/* Sheet Title Bar (strictly no close button) */}
            <div className="px-5 pb-3 pt-1 lg:px-7 lg:pb-3.5 lg:pt-2 flex items-center justify-between border-b border-[#F0F2ED]">
              <div className="flex items-center gap-2 lg:gap-2.5">
                <span className="text-sm lg:text-base font-semibold text-[#242824]">
                  Filter & Sort Recipes
                </span>
                {activeFilterCount > 0 && (
                  <span className="text-[11px] lg:text-xs text-[#365B45] font-medium bg-[#365B45]/10 px-2 py-0.5 lg:px-2.5 lg:py-0.5 rounded-full">
                    {activeFilterCount} active
                  </span>
                )}
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs lg:text-sm text-[#737873] hover:text-[#B42318] transition-colors cursor-pointer font-medium"
                >
                  Reset all
                </button>
              )}
            </div>

            {/* Scrollable Filters Content */}
            <div className="p-4 sm:p-5 lg:p-6.5 overflow-y-auto space-y-4 lg:space-y-5 flex-1">
              {/* Filter Dropdowns Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                <div>
                  <label className="block text-[11px] lg:text-xs font-medium text-[#737873] mb-1 lg:mb-1.5">
                    Cuisine
                  </label>
                  <select
                    value={filters.cuisine || ''}
                    onChange={(e) =>
                      onFilterChange({ cuisine: e.target.value || undefined, page: 1 })
                    }
                    className="w-full py-2 px-2.5 lg:py-2.5 lg:px-3 bg-[#FAFAF7] border border-[#D8DCD4] rounded-lg text-xs lg:text-sm text-[#242824] focus:outline-hidden focus:border-[#365B45] focus:bg-white cursor-pointer"
                  >
                    <option value="">All Cuisines</option>
                    {CUISINE_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] lg:text-xs font-medium text-[#737873] mb-1 lg:mb-1.5">
                    Diet
                  </label>
                  <select
                    value={filters.diet || ''}
                    onChange={(e) =>
                      onFilterChange({ diet: e.target.value || undefined, page: 1 })
                    }
                    className="w-full py-2 px-2.5 lg:py-2.5 lg:px-3 bg-[#FAFAF7] border border-[#D8DCD4] rounded-lg text-xs lg:text-sm text-[#242824] focus:outline-hidden focus:border-[#365B45] focus:bg-white cursor-pointer"
                  >
                    <option value="">All Diets</option>
                    {DIET_OPTIONS.map((d) => (
                      <option key={d} value={d}>
                        {d.charAt(0).toUpperCase() + d.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] lg:text-xs font-medium text-[#737873] mb-1 lg:mb-1.5">
                    Meal Type
                  </label>
                  <select
                    value={filters.type || ''}
                    onChange={(e) =>
                      onFilterChange({ type: e.target.value || undefined, page: 1 })
                    }
                    className="w-full py-2 px-2.5 lg:py-2.5 lg:px-3 bg-[#FAFAF7] border border-[#D8DCD4] rounded-lg text-xs lg:text-sm text-[#242824] focus:outline-hidden focus:border-[#365B45] focus:bg-white cursor-pointer"
                  >
                    <option value="">All Meal Types</option>
                    {MEAL_TYPE_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] lg:text-xs font-medium text-[#737873] mb-1 lg:mb-1.5">
                    Sort by
                  </label>
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
                    className="w-full py-2 px-2.5 lg:py-2.5 lg:px-3 bg-[#FAFAF7] border border-[#D8DCD4] rounded-lg text-xs lg:text-sm text-[#242824] focus:outline-hidden focus:border-[#365B45] focus:bg-white cursor-pointer"
                  >
                    {SORT_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Ingredients Filter Section */}
              <div className="pt-3 lg:pt-4 border-t border-[#F0F2ED] grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 text-xs lg:text-sm">
                <div>
                  <label className="block text-[11px] lg:text-xs font-medium text-[#737873] mb-1 lg:mb-1.5">
                    Must include ingredients
                  </label>
                  <div className="flex gap-1.5 lg:gap-2">
                    <input
                      type="text"
                      placeholder="e.g. garlic, tomato, basil"
                      value={includeIng}
                      onChange={(e) => setIncludeIng(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleApplyIngredients()}
                      className="flex-1 py-1.5 px-2.5 lg:py-2 lg:px-3 bg-[#FAFAF7] border border-[#D8DCD4] rounded-lg text-xs lg:text-sm text-[#242824] focus:outline-hidden focus:border-[#365B45] focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={handleApplyIngredients}
                      className="px-3 py-1.5 lg:px-4 lg:py-2 bg-[#242824] text-white rounded-lg text-xs lg:text-sm font-medium hover:bg-black transition-colors cursor-pointer shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] lg:text-xs font-medium text-[#737873] mb-1 lg:mb-1.5">
                    Exclude ingredients
                  </label>
                  <div className="flex gap-1.5 lg:gap-2">
                    <input
                      type="text"
                      placeholder="e.g. peanuts, dairy, pork"
                      value={excludeIng}
                      onChange={(e) => setExcludeIng(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleApplyIngredients()}
                      className="flex-1 py-1.5 px-2.5 lg:py-2 lg:px-3 bg-[#FAFAF7] border border-[#D8DCD4] rounded-lg text-xs lg:text-sm text-[#242824] focus:outline-hidden focus:border-[#365B45] focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={handleApplyIngredients}
                      className="px-3 py-1.5 lg:px-4 lg:py-2 bg-[#242824] text-white rounded-lg text-xs lg:text-sm font-medium hover:bg-black transition-colors cursor-pointer shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-3.5 sm:p-4 lg:p-5 bg-[#FFFFFF] border-t border-[#F0F2ED]">
              <button
                type="button"
                onClick={closeBottomSheet}
                className="w-full py-2.5 lg:py-3.5 bg-[#365B45] hover:bg-[#2b4937] text-white font-medium text-xs sm:text-sm lg:text-base rounded-lg transition-colors cursor-pointer text-center"
              >
                Done & Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
