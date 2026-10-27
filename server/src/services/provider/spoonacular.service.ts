import type {
  RecipeSearchQuery,
  RecipeSummary,
  RecipeDetail,
  PaginationMeta,
} from '../../types/recipe.types.js';

export interface ProviderSearchResult {
  recipes: RecipeSummary[];
  pagination: PaginationMeta;
}

export class ProviderError extends Error {
  public statusCode: number;
  public code: string;

  constructor(message: string, statusCode = 502, code = 'PROVIDER_ERROR') {
    super(message);
    this.name = 'ProviderError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

export class RecipeNotFoundError extends ProviderError {
  constructor(recipeId: number) {
    super(`Recipe with ID ${recipeId} was not found.`, 404, 'RECIPE_NOT_FOUND');
    this.name = 'RecipeNotFoundError';
  }
}

export class ProviderRateLimitError extends ProviderError {
  public retryAfter?: number;

  constructor(retryAfter?: number) {
    super('Recipe provider rate limit or quota exceeded. Please try again later.', 429, 'RATE_LIMIT_EXCEEDED');
    this.name = 'ProviderRateLimitError';
    this.retryAfter = retryAfter;
  }
}

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

import { MOCK_RECIPES } from './mockRecipes.js';


export class SpoonacularService {
  private static readonly TIMEOUT_MS = 8000;
  private static readonly MAX_RETRIES = 2;
  private static readonly CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
  private static readonly MAX_CACHE_SIZE = 500;

  private static cache = new Map<string, CacheEntry<unknown>>();

  private static get apiKey(): string | undefined {
    return process.env.SPOONACULAR_API_KEY?.trim() || undefined;
  }

  private static get baseUrl(): string {
    return (process.env.SPOONACULAR_BASE_URL || 'https://api.spoonacular.com').replace(/\/+$/, '');
  }

  private static getFromCache<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }

  private static setInCache<T>(key: string, data: T): void {
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + this.CACHE_TTL_MS,
    });
  }

  public static clearCache(): void {
    this.cache.clear();
  }

  /**
   * Search recipes through Spoonacular complexSearch or fallback mock provider
   */
  public static async searchRecipes(params: RecipeSearchQuery): Promise<ProviderSearchResult> {
    const cacheKey = `search:${JSON.stringify(params)}`;
    const cached = this.getFromCache<ProviderSearchResult>(cacheKey);
    if (cached) return cached;

    // Fallback to internal curated catalogue if API key is not configured
    if (!this.apiKey) {
      const mockResult = this.searchMockRecipes(params);
      this.setInCache(cacheKey, mockResult);
      return mockResult;
    }

    const offset = (params.page - 1) * params.limit;
    const url = new URL(`${this.baseUrl}/recipes/complexSearch`);
    url.searchParams.set('apiKey', this.apiKey);
    url.searchParams.set('number', String(params.limit));
    url.searchParams.set('offset', String(offset));
    url.searchParams.set('addRecipeInformation', 'true');

    if (params.query) url.searchParams.set('query', params.query);
    if (params.cuisine) url.searchParams.set('cuisine', params.cuisine);
    if (params.diet) url.searchParams.set('diet', params.diet);
    if (params.intolerances) url.searchParams.set('intolerances', params.intolerances);
    if (params.type) url.searchParams.set('type', params.type);
    if (params.includeIngredients) url.searchParams.set('includeIngredients', params.includeIngredients);
    if (params.excludeIngredients) url.searchParams.set('excludeIngredients', params.excludeIngredients);
    if (params.sort) url.searchParams.set('sort', params.sort);
    if (params.sortDirection) url.searchParams.set('sortDirection', params.sortDirection);

    const rawData = await this.fetchWithRetry<{
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
    }>(url);

    const results = rawData.results || [];
    const totalResults = typeof rawData.totalResults === 'number' ? rawData.totalResults : results.length;
    const totalPages = Math.ceil(totalResults / params.limit) || 1;

    const recipes: RecipeSummary[] = results.map((item) => ({
      id: item.id,
      title: item.title,
      image: item.image || '',
      summary: this.cleanSummaryHtml(item.summary || ''),
      readyInMinutes: item.readyInMinutes || 0,
      servings: item.servings || 0,
      cuisines: item.cuisines || [],
      diets: item.diets || [],
      dishTypes: item.dishTypes || [],
      healthScore: item.healthScore,
      aggregateLikes: item.aggregateLikes,
    }));

    const result: ProviderSearchResult = {
      recipes,
      pagination: {
        page: params.page,
        limit: params.limit,
        totalResults,
        totalPages,
      },
    };

    this.setInCache(cacheKey, result);
    return result;
  }

  /**
   * Fetch recipe detail information by ID
   */
  public static async getRecipeInformation(recipeId: number): Promise<RecipeDetail> {
    const cacheKey = `recipe:${recipeId}`;
    const cached = this.getFromCache<RecipeDetail>(cacheKey);
    if (cached) return cached;

    if (!this.apiKey) {
      const mock = MOCK_RECIPES.find((r) => r.id === recipeId);
      if (!mock) throw new RecipeNotFoundError(recipeId);
      this.setInCache(cacheKey, mock);
      return mock;
    }

    const url = new URL(`${this.baseUrl}/recipes/${recipeId}/information`);
    url.searchParams.set('apiKey', this.apiKey);
    url.searchParams.set('includeNutrition', 'true');

    interface SpoonacularRawDetail {
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

    const raw = await this.fetchWithRetry<SpoonacularRawDetail>(url, recipeId);

    const ingredients = (raw.extendedIngredients || []).map((ing) => ({
      id: ing.id || 0,
      name: ing.name || '',
      original: ing.original || '',
      amount: ing.amount || 0,
      unit: ing.unit || '',
    }));

    const steps = (raw.analyzedInstructions?.[0]?.steps || []).map((s) => ({
      number: s.number,
      step: s.step,
    }));

    const nutrients = (raw.nutrition?.nutrients || []).slice(0, 10).map((n) => ({
      name: n.name,
      amount: Math.round(n.amount * 10) / 10,
      unit: n.unit,
      percentOfDailyNeeds: n.percentOfDailyNeeds ? Math.round(n.percentOfDailyNeeds) : undefined,
    }));

    const detail: RecipeDetail = {
      id: raw.id,
      title: raw.title,
      image: raw.image || '',
      summary: this.cleanSummaryHtml(raw.summary || ''),
      readyInMinutes: raw.readyInMinutes || 0,
      preparationMinutes: raw.preparationMinutes,
      cookingMinutes: raw.cookingMinutes,
      servings: raw.servings || 0,
      cuisines: raw.cuisines || [],
      dishTypes: raw.dishTypes || [],
      diets: raw.diets || [],
      healthScore: raw.healthScore,
      aggregateLikes: raw.aggregateLikes,
      instructions: this.cleanSummaryHtml(raw.instructions || ''),
      ingredients,
      steps,
      nutrients,
      sourceUrl: raw.sourceUrl,
    };

    this.setInCache(cacheKey, detail);
    return detail;
  }

  /**
   * Safe fetch with timeouts, status code interpretation, and bounded retries
   */
  private static async fetchWithRetry<T>(url: URL, recipeIdFor404?: number, attempt = 1): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT_MS);

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        return (await response.json()) as T;
      }

      if (response.status === 404) {
        if (recipeIdFor404) throw new RecipeNotFoundError(recipeIdFor404);
        throw new ProviderError('Resource not found on recipe provider.', 404, 'NOT_FOUND');
      }

      if (response.status === 429) {
        const retryAfterHeader = response.headers.get('Retry-After');
        const retryAfter = retryAfterHeader ? parseInt(retryAfterHeader, 10) : undefined;
        throw new ProviderRateLimitError(Number.isFinite(retryAfter) ? retryAfter : undefined);
      }

      if (response.status === 401 || response.status === 403) {
        throw new ProviderError('Recipe provider authentication failed. Please verify API configuration.', 502, 'PROVIDER_AUTH_ERROR');
      }

      // Retry on 5xx transient server errors
      if (response.status >= 500 && attempt <= this.MAX_RETRIES) {
        await new Promise((res) => setTimeout(res, attempt * 500));
        return this.fetchWithRetry<T>(url, recipeIdFor404, attempt + 1);
      }

      throw new ProviderError(`Recipe provider responded with status ${response.status}.`, 502, 'PROVIDER_UNAVAILABLE');
    } catch (err: unknown) {
      clearTimeout(timeoutId);

      if (err instanceof ProviderError) {
        throw err;
      }

      if (err instanceof Error && err.name === 'AbortError') {
        if (attempt <= this.MAX_RETRIES) {
          await new Promise((res) => setTimeout(res, attempt * 500));
          return this.fetchWithRetry<T>(url, recipeIdFor404, attempt + 1);
        }
        throw new ProviderError('Recipe provider request timed out. Please try again.', 504, 'GATEWAY_TIMEOUT');
      }

      // Retry network failures
      if (attempt <= this.MAX_RETRIES) {
        await new Promise((res) => setTimeout(res, attempt * 500));
        return this.fetchWithRetry<T>(url, recipeIdFor404, attempt + 1);
      }

      throw new ProviderError('Failed to communicate with external recipe provider.', 503, 'SERVICE_UNAVAILABLE');
    }
  }

  /**
   * Filter and paginate mock recipes for development and testing
   */
  private static searchMockRecipes(params: RecipeSearchQuery): ProviderSearchResult {
    let filtered = [...MOCK_RECIPES];

    if (params.query) {
      const q = params.query.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.summary.toLowerCase().includes(q) ||
          r.ingredients.some((ing) => ing.name.toLowerCase().includes(q))
      );
    }

    if (params.cuisine) {
      const cuisines = params.cuisine.split(',').map((c) => c.trim().toLowerCase());
      filtered = filtered.filter((r) => r.cuisines.some((c) => cuisines.includes(c.toLowerCase())));
    }

    if (params.diet) {
      const diets = params.diet.split(',').map((d) => d.trim().toLowerCase());
      filtered = filtered.filter((r) => r.diets.some((d) => diets.includes(d.toLowerCase())));
    }

    if (params.type) {
      const type = params.type.toLowerCase();
      filtered = filtered.filter((r) => r.dishTypes.some((t) => t.toLowerCase() === type));
    }

    if (params.includeIngredients) {
      const includes = params.includeIngredients.split(',').map((i) => i.trim().toLowerCase());
      filtered = filtered.filter((r) =>
        includes.some((inc) => r.ingredients.some((ing) => ing.name.toLowerCase().includes(inc)))
      );
    }

    if (params.excludeIngredients) {
      const excludes = params.excludeIngredients.split(',').map((i) => i.trim().toLowerCase());
      filtered = filtered.filter(
        (r) => !excludes.some((exc) => r.ingredients.some((ing) => ing.name.toLowerCase().includes(exc)))
      );
    }

    // Sort
    if (params.sort === 'time') {
      filtered.sort((a, b) =>
        params.sortDirection === 'desc' ? b.readyInMinutes - a.readyInMinutes : a.readyInMinutes - b.readyInMinutes
      );
    } else if (params.sort === 'calories') {
      filtered.sort((a, b) => {
        const calA = a.nutrients.find((n) => n.name === 'Calories')?.amount || 0;
        const calB = b.nutrients.find((n) => n.name === 'Calories')?.amount || 0;
        return params.sortDirection === 'desc' ? calB - calA : calA - calB;
      });
    }

    const totalResults = filtered.length;
    const totalPages = Math.ceil(totalResults / params.limit) || 1;
    const offset = (params.page - 1) * params.limit;
    const paginated = filtered.slice(offset, offset + params.limit);

    const summaries: RecipeSummary[] = paginated.map((r) => ({
      id: r.id,
      title: r.title,
      image: r.image,
      summary: r.summary,
      readyInMinutes: r.readyInMinutes,
      servings: r.servings,
      cuisines: r.cuisines || [],
      diets: r.diets || [],
      dishTypes: r.dishTypes || [],
      healthScore: r.healthScore,
      aggregateLikes: r.aggregateLikes,
    }));

    return {
      recipes: summaries,
      pagination: {
        page: params.page,
        limit: params.limit,
        totalResults,
        totalPages,
      },
    };
  }

  /**
   * Helper to strip HTML tags from Spoonacular description and instructions
   */
  private static cleanSummaryHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
  }
}
