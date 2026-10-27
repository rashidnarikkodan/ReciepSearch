import {
  SUPPORTED_CUISINES,
  SUPPORTED_DIETS,
  SUPPORTED_INTOLERANCES,
  SUPPORTED_MEAL_TYPES,
  SUPPORTED_SORT_OPTIONS,
  type RecipeSearchQuery,
} from '../types/recipe.types.js';
import { ERROR_MESSAGES } from '../constants/index.js';

export interface ValidationResult<T> {
  isValid: boolean;
  errors?: string[];
  sanitized?: T;
}

export class RecipeValidator {
  public static readonly MAX_QUERY_LENGTH = 100;
  public static readonly MAX_PAGE = 1000;
  public static readonly DEFAULT_LIMIT = 12;
  public static readonly MAX_LIMIT = 50;
  public static readonly MAX_INGREDIENTS_LIST = 10;
  public static readonly MAX_INGREDIENT_LEN = 50;

  public static validateSearchQuery(query: Record<string, unknown>): ValidationResult<RecipeSearchQuery> {
    const errors: string[] = [];

    // Query validation
    let sanitizedQuery: string | undefined;
    if (query.query !== undefined) {
      if (typeof query.query !== 'string') {
        errors.push(ERROR_MESSAGES.VALIDATION.QUERY_MUST_BE_STRING);
      } else {
        const trimmed = query.query.trim();
        if (trimmed.length > this.MAX_QUERY_LENGTH) {
          errors.push(ERROR_MESSAGES.VALIDATION.QUERY_TOO_LONG(this.MAX_QUERY_LENGTH));
        } else if (trimmed.length > 0) {
          sanitizedQuery = trimmed;
        }
      }
    }

    // Page validation
    let page = 1;
    if (query.page !== undefined) {
      const parsedPage = Number(query.page);
      if (!Number.isInteger(parsedPage) || parsedPage < 1) {
        errors.push(ERROR_MESSAGES.VALIDATION.PAGE_POSITIVE_INT);
      } else if (parsedPage > this.MAX_PAGE) {
        errors.push(ERROR_MESSAGES.VALIDATION.PAGE_TOO_HIGH(this.MAX_PAGE));
      } else {
        page = parsedPage;
      }
    }

    // Limit validation
    let limit = this.DEFAULT_LIMIT;
    if (query.limit !== undefined) {
      const parsedLimit = Number(query.limit);
      if (!Number.isInteger(parsedLimit) || parsedLimit < 1) {
        errors.push(ERROR_MESSAGES.VALIDATION.LIMIT_POSITIVE_INT);
      } else if (parsedLimit > this.MAX_LIMIT) {
        errors.push(ERROR_MESSAGES.VALIDATION.LIMIT_TOO_HIGH(this.MAX_LIMIT));
      } else {
        limit = parsedLimit;
      }
    }

    // Cuisine validation
    let sanitizedCuisine: string | undefined;
    if (query.cuisine !== undefined && typeof query.cuisine === 'string' && query.cuisine.trim()) {
      const cuisines = query.cuisine
        .split(',')
        .map((c) => c.trim().toLowerCase())
        .filter(Boolean);

      const invalid = cuisines.filter((c) => !SUPPORTED_CUISINES.includes(c as (typeof SUPPORTED_CUISINES)[number]));
      if (invalid.length > 0) {
        errors.push(ERROR_MESSAGES.VALIDATION.UNSUPPORTED_CUISINE(invalid.join(', ')));
      } else if (cuisines.length > 0) {
        sanitizedCuisine = cuisines.join(',');
      }
    }

    // Diet validation
    let sanitizedDiet: string | undefined;
    if (query.diet !== undefined && typeof query.diet === 'string' && query.diet.trim()) {
      const diets = query.diet
        .split(',')
        .map((d) => d.trim().toLowerCase())
        .filter(Boolean);

      const invalid = diets.filter((d) => !SUPPORTED_DIETS.includes(d as (typeof SUPPORTED_DIETS)[number]));
      if (invalid.length > 0) {
        errors.push(ERROR_MESSAGES.VALIDATION.UNSUPPORTED_DIET(invalid.join(', ')));
      } else if (diets.length > 0) {
        sanitizedDiet = diets.join(',');
      }
    }

    // Intolerances validation
    let sanitizedIntolerances: string | undefined;
    if (query.intolerances !== undefined && typeof query.intolerances === 'string' && query.intolerances.trim()) {
      const intolerances = query.intolerances
        .split(',')
        .map((i) => i.trim().toLowerCase())
        .filter(Boolean);

      const invalid = intolerances.filter(
        (i) => !SUPPORTED_INTOLERANCES.includes(i as (typeof SUPPORTED_INTOLERANCES)[number])
      );
      if (invalid.length > 0) {
        errors.push(ERROR_MESSAGES.VALIDATION.UNSUPPORTED_INTOLERANCE(invalid.join(', ')));
      } else if (intolerances.length > 0) {
        sanitizedIntolerances = intolerances.join(',');
      }
    }

    // Meal type validation
    let sanitizedType: string | undefined;
    if (query.type !== undefined && typeof query.type === 'string' && query.type.trim()) {
      const normalizedType = query.type.trim().toLowerCase();
      if (!SUPPORTED_MEAL_TYPES.includes(normalizedType as (typeof SUPPORTED_MEAL_TYPES)[number])) {
        errors.push(ERROR_MESSAGES.VALIDATION.UNSUPPORTED_MEAL_TYPE(String(query.type)));
      } else {
        sanitizedType = normalizedType;
      }
    }

    // Include / Exclude ingredients validation
    const sanitizeIngredientsList = (raw: unknown, fieldName: string): string | undefined => {
      if (raw === undefined || typeof raw !== 'string' || !raw.trim()) return undefined;
      const items = raw
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);

      if (items.length > this.MAX_INGREDIENTS_LIST) {
        errors.push(ERROR_MESSAGES.VALIDATION.MAX_INGREDIENTS_EXCEEDED(fieldName, this.MAX_INGREDIENTS_LIST));
        return undefined;
      }

      for (const item of items) {
        if (item.length > this.MAX_INGREDIENT_LEN) {
          errors.push(ERROR_MESSAGES.VALIDATION.INGREDIENT_TOO_LONG(fieldName, this.MAX_INGREDIENT_LEN));
          return undefined;
        }
        if (!/^[a-z0-9\s-]+$/i.test(item)) {
          errors.push(ERROR_MESSAGES.VALIDATION.INVALID_INGREDIENT_CHARS(fieldName, item));
          return undefined;
        }
      }

      return items.join(',');
    };

    const sanitizedInclude = sanitizeIngredientsList(query.includeIngredients, 'includeIngredients');
    const sanitizedExclude = sanitizeIngredientsList(query.excludeIngredients, 'excludeIngredients');

    // Sort validation
    let sanitizedSort: string | undefined;
    if (query.sort !== undefined && typeof query.sort === 'string' && query.sort.trim()) {
      const normalizedSort = query.sort.trim().toLowerCase();
      if (!SUPPORTED_SORT_OPTIONS.includes(normalizedSort as (typeof SUPPORTED_SORT_OPTIONS)[number])) {
        errors.push(ERROR_MESSAGES.VALIDATION.UNSUPPORTED_SORT(String(query.sort)));
      } else {
        sanitizedSort = normalizedSort;
      }
    }

    // Sort Direction validation
    let sanitizedSortDirection: 'asc' | 'desc' | undefined;
    if (query.sortDirection !== undefined && typeof query.sortDirection === 'string') {
      const dir = query.sortDirection.trim().toLowerCase();
      if (dir === 'asc' || dir === 'desc') {
        sanitizedSortDirection = dir;
      } else {
        errors.push(ERROR_MESSAGES.VALIDATION.INVALID_SORT_DIRECTION);
      }
    }

    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    return {
      isValid: true,
      sanitized: {
        query: sanitizedQuery,
        cuisine: sanitizedCuisine,
        diet: sanitizedDiet,
        intolerances: sanitizedIntolerances,
        type: sanitizedType,
        includeIngredients: sanitizedInclude,
        excludeIngredients: sanitizedExclude,
        sort: sanitizedSort,
        sortDirection: sanitizedSortDirection,
        page,
        limit,
      },
    };
  }

  public static validateRecipeId(id: unknown): ValidationResult<number> {
    if (id === undefined || id === null || id === '') {
      return { isValid: false, errors: [ERROR_MESSAGES.VALIDATION.RECIPE_ID_REQUIRED] };
    }

    const strId = String(id).trim();
    if (!/^\d+$/.test(strId)) {
      return { isValid: false, errors: [ERROR_MESSAGES.VALIDATION.RECIPE_ID_POSITIVE_INT] };
    }

    const numericId = parseInt(strId, 10);
    if (!Number.isSafeInteger(numericId) || numericId <= 0) {
      return { isValid: false, errors: [ERROR_MESSAGES.VALIDATION.RECIPE_ID_POSITIVE_INT] };
    }

    return { isValid: true, sanitized: numericId };
  }
}
