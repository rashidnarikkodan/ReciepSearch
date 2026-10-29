export const ERROR_MESSAGES = {
  AUTH: {
    NAME_REQUIRED: 'Name is required and must be between 2 and 50 characters.',
    EMAIL_REQUIRED: 'Email is required.',
    EMAIL_INVALID: 'Please provide a valid email address.',
    PASSWORD_REQUIRED: 'Password is required.',
    PASSWORD_LENGTH: 'Password must be between 6 and 128 characters.',
    CREDENTIALS_REQUIRED: 'Email and password are required.',
    EMAIL_ALREADY_EXISTS: 'An account with this email address already exists.',
    INVALID_CREDENTIALS: 'Invalid email or password.',
    UNAUTHORIZED: 'Authentication required. Please sign in.',
    FORBIDDEN: 'You do not have permission to perform this action.',
    TOKEN_EXPIRED: 'Session has expired. Please sign in again.',
    INVALID_TOKEN: 'Invalid authentication token.',
    USER_NOT_FOUND: 'User not found.',
    USER_NO_LONGER_EXISTS: 'User belonging to this token no longer exists.',
  },

  RECIPE: {
    INVALID_QUERY_PARAMS: 'Invalid search or filter parameters provided.',
    INVALID_RECIPE_ID: 'Recipe ID must be a positive integer.',
    RECIPE_ID_REQUIRED: 'Recipe ID is required.',
    NOT_FOUND: (id?: number | string): string =>
      id !== undefined ? `Recipe with ID ${id} was not found.` : 'Recipe not found.',
    SEARCH_UNAVAILABLE: 'Recipe search is temporarily unavailable. Please try again later.',
    DETAILS_UNAVAILABLE: 'Recipe details are temporarily unavailable. Please try again later.',
    PROVIDER_RESOURCE_NOT_FOUND: 'Resource not found on recipe provider.',
    PROVIDER_RATE_LIMIT: 'Recipe provider rate limit or quota exceeded. Please try again later.',
    PROVIDER_AUTH_FAILED: 'Recipe provider authentication failed. Please verify API configuration.',
    PROVIDER_STATUS_ERROR: (status: number): string =>
      `Recipe provider responded with status ${status}.`,
    PROVIDER_TIMEOUT: 'Recipe provider request timed out. Please try again.',
    PROVIDER_COMMUNICATION_FAILED: 'Failed to communicate with external recipe provider.',
  },

  VALIDATION: {
    INVALID_INPUT: 'Invalid request payload or parameters provided.',
    QUERY_MUST_BE_STRING: 'Search query must be a string.',
    QUERY_TOO_LONG: (max: number): string => `Search query cannot exceed ${max} characters.`,
    PAGE_POSITIVE_INT: 'Page must be a positive integer greater than or equal to 1.',
    PAGE_TOO_HIGH: (max: number): string => `Page cannot exceed ${max}.`,
    LIMIT_POSITIVE_INT: 'Limit must be a positive integer greater than or equal to 1.',
    LIMIT_TOO_HIGH: (max: number): string => `Limit cannot exceed maximum of ${max}.`,
    UNSUPPORTED_CUISINE: (cuisines: string): string => `Unsupported cuisine(s): ${cuisines}.`,
    UNSUPPORTED_DIET: (diets: string): string => `Unsupported diet(s): ${diets}.`,
    UNSUPPORTED_INTOLERANCE: (intolerances: string): string => `Unsupported intolerance(s): ${intolerances}.`,
    UNSUPPORTED_MEAL_TYPE: (type: string): string => `Unsupported meal category type: ${type}.`,
    MAX_INGREDIENTS_EXCEEDED: (field: string, max: number): string => `${field} cannot exceed ${max} ingredients.`,
    INGREDIENT_TOO_LONG: (field: string, max: number): string => `Each ingredient in ${field} must be under ${max} characters.`,
    INVALID_INGREDIENT_CHARS: (field: string, item: string): string => `Invalid characters in ${field}: "${item}".`,
    UNSUPPORTED_SORT: (sort: string): string => `Unsupported sort option: ${sort}.`,
    INVALID_SORT_DIRECTION: 'sortDirection must be either "asc" or "desc".',
    RECIPE_ID_REQUIRED: 'Recipe ID is required.',
    RECIPE_ID_POSITIVE_INT: 'Recipe ID must be a valid positive integer.',
  },

  FAVORITES: {
    AUTH_REQUIRED_VIEW: 'Authentication required to view favorites.',
    AUTH_REQUIRED_SAVE: 'Authentication required to save favorites.',
    AUTH_REQUIRED_REMOVE: 'Authentication required to remove favorites.',
    AUTH_REQUIRED_CHECK: 'Authentication required.',
    RECIPE_ID_REQUIRED: 'Valid recipeId is required.',
    NOT_FOUND: 'Favorite recipe not found in your saved list.',
    SAVE_FAILED: 'Failed to save recipe to favorites. Please try again.',
    USER_ID_REQUIRED: 'User ID is required',
    RECIPE_TITLE_REQUIRED: 'Recipe title is required',
    TITLE_TOO_LONG: (max: number): string => `Title cannot exceed ${max} characters`,
    TIME_NEGATIVE: 'Preparation time cannot be negative',
    SERVINGS_MIN: 'Servings must be at least 1',
  },

  RATE_LIMIT: {
    AUTH_LIMIT_EXCEEDED: 'Too many authentication attempts from this IP. Please try again later.',
    RECIPE_LIMIT_EXCEEDED: 'Too many recipe requests. Please slow down and try again later.',
  },

  SYSTEM: {
    NOT_FOUND: 'Requested resource was not found.',
    ROUTE_NOT_FOUND: (method: string, path: string): string =>
      `Cannot ${method} ${path} - Route not found`,
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
  },
} as const;

export const SUCCESS_MESSAGES = {
  AUTH: {
    REGISTER_SUCCESS: 'Account registered successfully',
    LOGIN_SUCCESS: 'Sign in successful',
    LOGOUT_SUCCESS: 'Signed out successfully',
  },
  FAVORITES: {
    RECIPE_SAVED: 'Recipe saved to favorites.',
    RECIPE_REMOVED: 'Recipe removed from favorites.',
  },
  HEALTH: {
    STATUS_OK: 'ok',
    SERVICE_NAME: 'Recipe API',
  },
} as const;
