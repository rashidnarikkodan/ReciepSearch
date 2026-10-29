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
  instructions: string;
  ingredients: RecipeIngredient[];
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

export interface RecipeSearchParams {
  query?: string;
  cuisine?: string;
  diet?: string;
  intolerances?: string;
  type?: string;
  includeIngredients?: string;
  excludeIngredients?: string;
  sort?: string;
  sortDirection?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface FavoriteRecipe {
  _id?: string;
  userId: string;
  recipeId: number;
  title: string;
  image?: string;
  readyInMinutes?: number;
  servings?: number;
  createdAt: string;
}
