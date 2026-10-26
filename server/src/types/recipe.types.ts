export interface RecipeSummary {
  id: number;
  title: string;
  image: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
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

export const SUPPORTED_CUISINES = [
  'african',
  'asian',
  'american',
  'british',
  'cajun',
  'caribbean',
  'chinese',
  'eastern european',
  'european',
  'french',
  'german',
  'greek',
  'indian',
  'irish',
  'italian',
  'japanese',
  'jewish',
  'korean',
  'latin american',
  'mediterranean',
  'mexican',
  'middle eastern',
  'nordic',
  'southern',
  'spanish',
  'thai',
  'vietnamese',
] as const;

export const SUPPORTED_DIETS = [
  'gluten free',
  'ketogenic',
  'vegetarian',
  'lacto-vegetarian',
  'ovo-vegetarian',
  'vegan',
  'pescetarian',
  'paleo',
  'primal',
  'low fodmap',
  'whole30',
] as const;

export const SUPPORTED_INTOLERANCES = [
  'dairy',
  'egg',
  'gluten',
  'grain',
  'peanut',
  'seafood',
  'sesame',
  'shellfish',
  'soy',
  'sulfite',
  'tree nut',
  'wheat',
] as const;

export const SUPPORTED_MEAL_TYPES = [
  'main course',
  'side dish',
  'dessert',
  'appetizer',
  'salad',
  'bread',
  'breakfast',
  'soup',
  'beverage',
  'sauce',
  'marinade',
  'fingerfood',
  'snack',
  'drink',
] as const;

export const SUPPORTED_SORT_OPTIONS = [
  'popularity',
  'healthiness',
  'price',
  'time',
  'calories',
  'nutrients',
  'random',
  'max-used-ingredients',
  'min-missing-ingredients',
] as const;
