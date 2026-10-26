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

// Fallback curated mock data used when SPOONACULAR_API_KEY is not configured or in testing
const MOCK_RECIPES: RecipeDetail[] = [
  {
    id: 716429,
    title: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs',
    image: 'https://img.spoonacular.com/recipes/716429-312x231.jpg',
    summary: 'A flavorful, comforting vegetarian pasta toss with crispy cauliflower florets, toasted breadcrumbs, and fresh herbs.',
    readyInMinutes: 45,
    servings: 2,
    preparationMinutes: 15,
    cookingMinutes: 30,
    cuisines: ['italian', 'mediterranean'],
    dishTypes: ['lunch', 'main course'],
    diets: ['vegetarian'],
    instructions: '1. Boil pasta until al dente. 2. Sauté cauliflower with garlic and scallions in olive oil. 3. Toast breadcrumbs in butter. 4. Toss pasta with cauliflower mixture and top with breadcrumbs.',
    ingredients: [
      { id: 11135, name: 'cauliflower', original: '1 head cauliflower, chopped', amount: 1, unit: 'head' },
      { id: 11291, name: 'green onions', original: '1/3 cup chopped scallions', amount: 0.33, unit: 'cup' },
      { id: 11215, name: 'garlic', original: '3 cloves garlic, minced', amount: 3, unit: 'cloves' },
      { id: 20420, name: 'pasta', original: '8 oz fettuccine pasta', amount: 8, unit: 'oz' },
      { id: 18079, name: 'breadcrumbs', original: '1/2 cup panko breadcrumbs', amount: 0.5, unit: 'cup' },
      { id: 4053, name: 'olive oil', original: '3 tbsp extra virgin olive oil', amount: 3, unit: 'tbsp' }
    ],
    steps: [
      { number: 1, step: 'Bring a large pot of salted water to a boil and cook pasta according to package directions.' },
      { number: 2, step: 'Heat olive oil in a skillet over medium heat, add minced garlic and scallions until fragrant.' },
      { number: 3, step: 'Add chopped cauliflower florets and cook until golden brown and tender.' },
      { number: 4, step: 'Toast breadcrumbs until crisp in a small pan.' },
      { number: 5, step: 'Combine drained pasta with cauliflower skillet, toss gently, and serve garnished with toasted breadcrumbs.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 584, unit: 'kcal', percentOfDailyNeeds: 29 },
      { name: 'Protein', amount: 19, unit: 'g', percentOfDailyNeeds: 38 },
      { name: 'Fat', amount: 20, unit: 'g', percentOfDailyNeeds: 31 },
      { name: 'Carbohydrates', amount: 84, unit: 'g', percentOfDailyNeeds: 28 },
      { name: 'Fiber', amount: 8, unit: 'g', percentOfDailyNeeds: 32 }
    ]
  },
  {
    id: 715538,
    title: 'What to make for dinner tonight? Bruschetta Style Pork Chops',
    image: 'https://img.spoonacular.com/recipes/715538-312x231.jpg',
    summary: 'Juicy skillet pork chops topped with a fresh tomato, basil, and balsamic bruschetta relish.',
    readyInMinutes: 35,
    servings: 4,
    preparationMinutes: 10,
    cookingMinutes: 25,
    cuisines: ['italian', 'american'],
    dishTypes: ['dinner', 'main course'],
    diets: ['gluten free', 'ketogenic'],
    instructions: '1. Season pork chops with salt and pepper. 2. Sear pork in olive oil until golden. 3. Dice tomatoes and mix with basil, garlic, and balsamic. 4. Top pork chops with bruschetta mixture and serve.',
    ingredients: [
      { id: 10010062, name: 'pork chops', original: '4 bone-in pork chops', amount: 4, unit: 'chops' },
      { id: 11529, name: 'tomatoes', original: '3 ripe roma tomatoes, diced', amount: 3, unit: 'tomatoes' },
      { id: 2044, name: 'fresh basil', original: '1/4 cup fresh basil leaves, chopped', amount: 0.25, unit: 'cup' },
      { id: 2069, name: 'balsamic vinegar', original: '2 tbsp balsamic vinegar', amount: 2, unit: 'tbsp' },
      { id: 11215, name: 'garlic', original: '2 cloves garlic, minced', amount: 2, unit: 'cloves' }
    ],
    steps: [
      { number: 1, step: 'Pat pork chops dry and generously season both sides with sea salt and cracked black pepper.' },
      { number: 2, step: 'In a medium bowl, combine diced tomatoes, minced garlic, chopped basil, and balsamic vinegar.' },
      { number: 3, step: 'Heat olive oil in a skillet over medium-high heat and sear pork chops for 5–6 minutes per side.' },
      { number: 4, step: 'Remove skillet from heat, let chops rest for 5 minutes, then spoon fresh tomato bruschetta topping over each chop.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 421, unit: 'kcal', percentOfDailyNeeds: 21 },
      { name: 'Protein', amount: 48, unit: 'g', percentOfDailyNeeds: 96 },
      { name: 'Fat', amount: 22, unit: 'g', percentOfDailyNeeds: 34 },
      { name: 'Carbohydrates', amount: 6, unit: 'g', percentOfDailyNeeds: 2 }
    ]
  },
  {
    id: 644387,
    title: 'Garlic Herb Baked Salmon with Asparagus',
    image: 'https://img.spoonacular.com/recipes/644387-312x231.jpg',
    summary: 'Sheet-pan Atlantic salmon fillets baked to perfection with tender green asparagus, lemon slices, and aromatic garlic butter.',
    readyInMinutes: 25,
    servings: 2,
    preparationMinutes: 10,
    cookingMinutes: 15,
    cuisines: ['mediterranean', 'european'],
    dishTypes: ['dinner', 'main course'],
    diets: ['gluten free', 'pescetarian', 'ketogenic', 'whole30'],
    instructions: '1. Preheat oven to 400°F. 2. Place salmon fillets and trimmed asparagus on baking sheet. 3. Brush with melted garlic herb butter. 4. Bake for 15 minutes.',
    ingredients: [
      { id: 15076, name: 'salmon fillets', original: '2 wild salmon fillets (6 oz each)', amount: 2, unit: 'fillets' },
      { id: 11011, name: 'asparagus', original: '1 bunch fresh asparagus, trimmed', amount: 1, unit: 'bunch' },
      { id: 1001, name: 'butter', original: '2 tbsp melted butter', amount: 2, unit: 'tbsp' },
      { id: 9152, name: 'lemon juice', original: '1 tbsp fresh lemon juice', amount: 1, unit: 'tbsp' },
      { id: 11215, name: 'garlic', original: '3 cloves garlic, minced', amount: 3, unit: 'cloves' }
    ],
    steps: [
      { number: 1, step: 'Preheat oven to 400°F (200°C) and line a rimmed baking sheet with parchment paper.' },
      { number: 2, step: 'Arrange salmon fillets and trimmed asparagus in a single layer on the sheet.' },
      { number: 3, step: 'Whisk together melted butter, minced garlic, lemon juice, salt, and chopped parsley.' },
      { number: 4, step: 'Brush mixture over the salmon and asparagus.' },
      { number: 5, step: 'Bake for 12–15 minutes until salmon flakes easily with a fork.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 395, unit: 'kcal', percentOfDailyNeeds: 20 },
      { name: 'Protein', amount: 35, unit: 'g', percentOfDailyNeeds: 70 },
      { name: 'Fat', amount: 25, unit: 'g', percentOfDailyNeeds: 38 },
      { name: 'Carbohydrates', amount: 5, unit: 'g', percentOfDailyNeeds: 2 }
    ]
  },
  {
    id: 654959,
    title: 'Pasta with Garlic and Oil (Aglio e Olio)',
    image: 'https://img.spoonacular.com/recipes/654959-312x231.jpg',
    summary: 'A classic Roman pasta dish featuring spaghetti emulsified in extra virgin olive oil, golden toasted garlic, red chili flakes, and parsley.',
    readyInMinutes: 20,
    servings: 4,
    preparationMinutes: 5,
    cookingMinutes: 15,
    cuisines: ['italian'],
    dishTypes: ['lunch', 'main course'],
    diets: ['vegetarian', 'vegan'],
    instructions: '1. Cook spaghetti in salted water. 2. Gently sauté sliced garlic and red pepper flakes in plenty of olive oil. 3. Toss pasta with garlic oil and reserved cooking water to create an emulsion.',
    ingredients: [
      { id: 11420420, name: 'spaghetti', original: '1 lb spaghetti', amount: 1, unit: 'lb' },
      { id: 11215, name: 'garlic', original: '8 cloves garlic, thinly sliced', amount: 8, unit: 'cloves' },
      { id: 4053, name: 'olive oil', original: '1/2 cup extra virgin olive oil', amount: 0.5, unit: 'cup' },
      { id: 2044, name: 'parsley', original: '1/2 cup chopped fresh flat-leaf parsley', amount: 0.5, unit: 'cup' },
      { id: 1032009, name: 'red pepper flakes', original: '1/2 tsp crushed red pepper flakes', amount: 0.5, unit: 'tsp' }
    ],
    steps: [
      { number: 1, step: 'Cook spaghetti in a large pot of boiling salted water until 1 minute shy of al dente.' },
      { number: 2, step: 'In a wide skillet, heat olive oil over medium-low heat and add sliced garlic and chili flakes.' },
      { number: 3, step: 'Cook gently for 3 minutes until garlic is pale golden, never burnt.' },
      { number: 4, step: 'Transfer pasta directly to the skillet along with 1/2 cup of starchy pasta cooking water.' },
      { number: 5, step: 'Stir vigorously until an emulsion coats the pasta, finish with chopped parsley, and serve immediately.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 480, unit: 'kcal', percentOfDailyNeeds: 24 },
      { name: 'Protein', amount: 13, unit: 'g', percentOfDailyNeeds: 26 },
      { name: 'Fat', amount: 18, unit: 'g', percentOfDailyNeeds: 28 },
      { name: 'Carbohydrates', amount: 68, unit: 'g', percentOfDailyNeeds: 23 }
    ]
  }
];

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
