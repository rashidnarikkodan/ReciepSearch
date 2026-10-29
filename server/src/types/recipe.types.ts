export interface RecipeSummary {
  id: number;
  title: string;
  image: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
  cuisines?: string[];
  diets?: string[];
  dishTypes?: string[];
  healthScore?: number;
  aggregateLikes?: number;
}

export interface RecipeIngredient {
  id: number;
  name: string;
  original: string;
  amount: number;
  unit: string;
}

export interface RecipeStep {
  number: number;
  step: string;
}

export interface RecipeNutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds?: number;
}

export interface RecipeDetail extends RecipeSummary {
  preparationMinutes?: number;
  cookingMinutes?: number;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  ingredients: RecipeIngredient[];
  instructions: string;
  steps: RecipeStep[];
  nutrients: RecipeNutrient[];
  sourceUrl?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalResults: number;
  totalPages: number;
}

export interface RecipeSearchQuery {
  query?: string;
  cuisine?: string;
  diet?: string;
  intolerances?: string;
  type?: string;
  includeIngredients?: string;
  excludeIngredients?: string;
  sort?: string;
  sortDirection?: 'asc' | 'desc';
  page: number;
  limit: number;
}

export interface ProviderSearchResult {
  recipes: RecipeSummary[];
  pagination: PaginationMeta;
}

export interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

export interface SpoonacularRawDetail {
  id: number;
  title: string;
  image?: string;
  summary?: string;
  readyInMinutes?: number;
  preparationMinutes?: number;
  cookingMinutes?: number;
  servings?: number;
  cuisines?: string[];
  dishTypes?: string[];
  diets?: string[];
  healthScore?: number;
  aggregateLikes?: number;
  instructions?: string;
  sourceUrl?: string;
  extendedIngredients?: Array<{
    id?: number;
    name?: string;
    original?: string;
    amount?: number;
    unit?: string;
  }>;
  analyzedInstructions?: Array<{
    steps?: Array<{
      number: number;
      step: string;
    }>;
  }>;
  nutrition?: {
    nutrients?: Array<{
      name: string;
      amount: number;
      unit: string;
      percentOfDailyNeeds?: number;
    }>;
  };
}

export interface SpoonacularSearchResponse {
  results?: Array<{
    id: number;
    title: string;
    image?: string;
    summary?: string;
    readyInMinutes?: number;
    servings?: number;
    cuisines?: string[];
    diets?: string[];
    dishTypes?: string[];
    healthScore?: number;
    aggregateLikes?: number;
  }>;
  totalResults?: number;
}
