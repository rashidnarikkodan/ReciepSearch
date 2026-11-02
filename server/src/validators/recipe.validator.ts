import { z } from 'zod';
import {
  SUPPORTED_CUISINES,
  SUPPORTED_DIETS,
  SUPPORTED_INTOLERANCES,
  SUPPORTED_MEAL_TYPES,
  SUPPORTED_SORT_OPTIONS,
  RECIPE_VALIDATION_RULES,
  ERROR_MESSAGES,
} from '../constants/index.js';

export const recipeQuerySchema = z.object({
  query: z
    .string()
    .trim()
    .max(RECIPE_VALIDATION_RULES.MAX_QUERY_LENGTH, ERROR_MESSAGES.VALIDATION.QUERY_TOO_LONG(RECIPE_VALIDATION_RULES.MAX_QUERY_LENGTH))
    .optional(),
  page: z
    .coerce
    .number()
    .int(ERROR_MESSAGES.VALIDATION.PAGE_POSITIVE_INT)
    .min(1, ERROR_MESSAGES.VALIDATION.PAGE_POSITIVE_INT)
    .max(RECIPE_VALIDATION_RULES.MAX_PAGE, ERROR_MESSAGES.VALIDATION.PAGE_TOO_HIGH(RECIPE_VALIDATION_RULES.MAX_PAGE))
    .default(RECIPE_VALIDATION_RULES.DEFAULT_PAGE),
  limit: z
    .coerce
    .number()
    .int(ERROR_MESSAGES.VALIDATION.LIMIT_POSITIVE_INT)
    .min(1, ERROR_MESSAGES.VALIDATION.LIMIT_POSITIVE_INT)
    .max(RECIPE_VALIDATION_RULES.MAX_LIMIT, ERROR_MESSAGES.VALIDATION.LIMIT_TOO_HIGH(RECIPE_VALIDATION_RULES.MAX_LIMIT))
    .default(RECIPE_VALIDATION_RULES.DEFAULT_LIMIT),
  cuisine: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const items = val.split(',').map((c) => c.trim().toLowerCase()).filter(Boolean);
      return items.every((c) => SUPPORTED_CUISINES.includes(c as typeof SUPPORTED_CUISINES[number]));
    }, { message: ERROR_MESSAGES.VALIDATION.UNSUPPORTED_CUISINE('specified') }),
  diet: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const items = val.split(',').map((d) => d.trim().toLowerCase()).filter(Boolean);
      return items.every((d) => SUPPORTED_DIETS.includes(d as typeof SUPPORTED_DIETS[number]));
    }, { message: ERROR_MESSAGES.VALIDATION.UNSUPPORTED_DIET('specified') }),
  intolerances: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const items = val.split(',').map((i) => i.trim().toLowerCase()).filter(Boolean);
      return items.every((i) => SUPPORTED_INTOLERANCES.includes(i as typeof SUPPORTED_INTOLERANCES[number]));
    }, { message: ERROR_MESSAGES.VALIDATION.UNSUPPORTED_INTOLERANCE('specified') }),
  type: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      return SUPPORTED_MEAL_TYPES.includes(val.trim().toLowerCase() as typeof SUPPORTED_MEAL_TYPES[number]);
    }, { message: ERROR_MESSAGES.VALIDATION.UNSUPPORTED_MEAL_TYPE('specified') }),
  includeIngredients: z.string().optional(),
  excludeIngredients: z.string().optional(),
  sort: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      return SUPPORTED_SORT_OPTIONS.includes(val.trim().toLowerCase() as typeof SUPPORTED_SORT_OPTIONS[number]);
    }, { message: ERROR_MESSAGES.VALIDATION.UNSUPPORTED_SORT('specified') }),
  sortDirection: z.enum(['asc', 'desc']).optional(),
});

export const recipeIdParamSchema = z.object({
  id: z
    .coerce
    .number()
    .int(ERROR_MESSAGES.VALIDATION.RECIPE_ID_POSITIVE_INT)
    .positive(ERROR_MESSAGES.VALIDATION.RECIPE_ID_POSITIVE_INT),
});

export type RecipeQuerySchema = z.infer<typeof recipeQuerySchema>;
export type RecipeIdParamSchema = z.infer<typeof recipeIdParamSchema>;
