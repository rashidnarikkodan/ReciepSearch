import type {
  RecipeSearchQuery,
  RecipeSummary,
  RecipeDetail,
  ProviderSearchResult,
  CacheEntry,
  SpoonacularRawDetail,
  SpoonacularSearchResponse,
} from '../../types/index.js';
import {
  HTTP_STATUS,
  ERROR_CODES,
  ERROR_MESSAGES,
  RECIPE_PROVIDER_CONFIG,
} from '../../constants/index.js';
import {
  AppError,
  NotFoundError,
  TooManyRequestsError,
  BadGatewayError,
} from '../../errors/index.js';
import type { IRecipeProvider } from '../../interfaces/index.js';

export class ProviderError extends AppError {
  constructor(
    message: string,
    statusCode: number = HTTP_STATUS.BAD_GATEWAY,
    code: string = ERROR_CODES.PROVIDER_ERROR
  ) {
    super(message, statusCode, code);
  }
}

export class RecipeNotFoundError extends NotFoundError {
  constructor(recipeId: number) {
    super(ERROR_MESSAGES.RECIPE.NOT_FOUND(recipeId), ERROR_CODES.RECIPE_NOT_FOUND);
  }
}

export class ProviderRateLimitError extends TooManyRequestsError {
  constructor(retryAfter?: number) {
    super(ERROR_MESSAGES.RECIPE.PROVIDER_RATE_LIMIT, retryAfter, ERROR_CODES.RATE_LIMIT_EXCEEDED);
  }
}

export class SpoonacularService implements IRecipeProvider {
  private cache = new Map<string, CacheEntry<unknown>>();

  private get apiKey(): string | undefined {
    return process.env.SPOONACULAR_API_KEY?.trim() || undefined;
  }

  private get baseUrl(): string {
    return (process.env.SPOONACULAR_BASE_URL || RECIPE_PROVIDER_CONFIG.DEFAULT_BASE_URL).replace(/\/+$/, '');
  }

  private getFromCache<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }

  private setInCache<T>(key: string, data: T): void {
    if (this.cache.size >= RECIPE_PROVIDER_CONFIG.MAX_CACHE_SIZE) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + RECIPE_PROVIDER_CONFIG.CACHE_TTL_MS,
    });
  }

  public clearCache(): void {
    this.cache.clear();
  }

  public async searchRecipes(params: RecipeSearchQuery): Promise<ProviderSearchResult> {
    const cacheKey = `search:${JSON.stringify(params)}`;
    const cached = this.getFromCache<ProviderSearchResult>(cacheKey);
    if (cached) return cached;

    if (!this.apiKey) {
      throw new ProviderError(
        ERROR_MESSAGES.RECIPE.PROVIDER_AUTH_FAILED,
        HTTP_STATUS.BAD_GATEWAY,
        ERROR_CODES.PROVIDER_AUTH_ERROR
      );
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

    const rawData = await this.fetchWithRetry<SpoonacularSearchResponse>(url);

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

  public async getRecipeInformation(recipeId: number): Promise<RecipeDetail> {
    const cacheKey = `recipe:${recipeId}`;
    const cached = this.getFromCache<RecipeDetail>(cacheKey);
    if (cached) return cached;

    if (!this.apiKey) {
      throw new ProviderError(
        ERROR_MESSAGES.RECIPE.PROVIDER_AUTH_FAILED,
        HTTP_STATUS.BAD_GATEWAY,
        ERROR_CODES.PROVIDER_AUTH_ERROR
      );
    }

    const url = new URL(`${this.baseUrl}/recipes/${recipeId}/information`);
    url.searchParams.set('apiKey', this.apiKey);
    url.searchParams.set('includeNutrition', 'true');

    const raw = await this.fetchWithRetry<SpoonacularRawDetail>(url, recipeId);

    const detail: RecipeDetail = {
      id: raw.id,
      title: raw.title,
      image: raw.image || '',
      summary: this.cleanSummaryHtml(raw.summary || ''),
      readyInMinutes: raw.readyInMinutes || 0,
      preparationMinutes: raw.preparationMinutes,
      cookingMinutes: raw.cookingMinutes,
      servings: raw.servings || 1,
      cuisines: raw.cuisines || [],
      dishTypes: raw.dishTypes || [],
      diets: raw.diets || [],
      healthScore: raw.healthScore,
      aggregateLikes: raw.aggregateLikes,
      instructions: this.cleanSummaryHtml(raw.instructions || ''),
      sourceUrl: raw.sourceUrl,
      ingredients: (raw.extendedIngredients || []).map((ing, idx) => ({
        id: ing.id || idx,
        name: ing.name || '',
        original: ing.original || '',
        amount: ing.amount || 0,
        unit: ing.unit || '',
      })),
      steps:
        raw.analyzedInstructions?.[0]?.steps?.map((s) => ({
          number: s.number,
          step: s.step,
        })) || [],
      nutrients:
        raw.nutrition?.nutrients?.slice(0, 8).map((n) => ({
          name: n.name,
          amount: n.amount,
          unit: n.unit,
          percentOfDailyNeeds: n.percentOfDailyNeeds,
        })) || [],
    };

    this.setInCache(cacheKey, detail);
    return detail;
  }

  private async fetchWithRetry<T>(
    url: URL,
    recipeIdFor404?: number,
    attempt: number = 1
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), RECIPE_PROVIDER_CONFIG.TIMEOUT_MS);

    try {
      const response = await fetch(url.toString(), {
        signal: controller.signal,
        headers: {
          Accept: 'application/json',
        },
      });

      clearTimeout(timeoutId);

      if (response.status === HTTP_STATUS.NOT_FOUND) {
        if (recipeIdFor404 !== undefined) {
          throw new RecipeNotFoundError(recipeIdFor404);
        }
        throw new ProviderError(
          ERROR_MESSAGES.RECIPE.PROVIDER_RESOURCE_NOT_FOUND,
          HTTP_STATUS.NOT_FOUND,
          ERROR_CODES.RECIPE_NOT_FOUND
        );
      }

      if (response.status === HTTP_STATUS.TOO_MANY_REQUESTS || response.status === 402) {
        const retryAfterHeader = response.headers.get('Retry-After');
        const retryAfter = retryAfterHeader ? parseInt(retryAfterHeader, 10) : undefined;
        throw new ProviderRateLimitError(retryAfter);
      }

      if (response.status === HTTP_STATUS.UNAUTHORIZED || response.status === HTTP_STATUS.FORBIDDEN) {
        throw new ProviderError(
          ERROR_MESSAGES.RECIPE.PROVIDER_AUTH_FAILED,
          HTTP_STATUS.BAD_GATEWAY,
          ERROR_CODES.PROVIDER_AUTH_ERROR
        );
      }

      if (!response.ok) {
        throw new ProviderError(
          ERROR_MESSAGES.RECIPE.PROVIDER_STATUS_ERROR(response.status),
          HTTP_STATUS.BAD_GATEWAY,
          ERROR_CODES.PROVIDER_UNAVAILABLE
        );
      }

      return (await response.json()) as T;
    } catch (err: unknown) {
      clearTimeout(timeoutId);

      if (err instanceof AppError) {
        throw err;
      }

      if (err instanceof Error && err.name === 'AbortError') {
        if (attempt <= RECIPE_PROVIDER_CONFIG.MAX_RETRIES) {
          await new Promise((res) => setTimeout(res, attempt * 500));
          return this.fetchWithRetry<T>(url, recipeIdFor404, attempt + 1);
        }
        throw new ProviderError(
          ERROR_MESSAGES.RECIPE.PROVIDER_TIMEOUT,
          HTTP_STATUS.GATEWAY_TIMEOUT,
          ERROR_CODES.GATEWAY_TIMEOUT
        );
      }

      if (attempt <= RECIPE_PROVIDER_CONFIG.MAX_RETRIES) {
        await new Promise((res) => setTimeout(res, attempt * 500));
        return this.fetchWithRetry<T>(url, recipeIdFor404, attempt + 1);
      }

      throw new BadGatewayError(
        ERROR_MESSAGES.RECIPE.PROVIDER_COMMUNICATION_FAILED,
        ERROR_CODES.SERVICE_UNAVAILABLE
      );
    }
  }

  private cleanSummaryHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
  }
}

export const spoonacularService = new SpoonacularService();
