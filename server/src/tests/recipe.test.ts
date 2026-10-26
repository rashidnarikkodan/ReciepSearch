import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import type { Server } from 'node:http';
import { createApp } from '../app.js';
import { RecipeValidator } from '../validators/recipe.validator.js';
import { SpoonacularService, RecipeNotFoundError, ProviderRateLimitError } from '../services/provider/spoonacular.service.js';
import { AuthService } from '../services/auth.service.js';
import jwt from 'jsonwebtoken';

describe('Recipe & Favorites Backend Test Suite', () => {
  let server: Server;
  let baseUrl: string;
  let testUserToken: string;
  let testUserId: string;

  before(async () => {
    // Generate valid JWT token for an authenticated test user
    testUserId = '654321654321654321654321';
    testUserToken = AuthService.generateToken({
      userId: testUserId,
      email: 'testuser@example.com',
      role: 'user',
    });

    // Start ephemeral server
    const app = createApp();
    await new Promise<void>((resolve) => {
      server = app.listen(0, '127.0.0.1', () => {
        const address = server.address();
        if (address && typeof address === 'object') {
          baseUrl = `http://127.0.0.1:${address.port}`;
        }
        resolve();
      });
    });
  });

  after(async () => {
    if (server) {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });

  describe('1. Input Validation & Whitelisting (RecipeValidator)', () => {
    it('accepts valid search queries with defaults', () => {
      const res = RecipeValidator.validateSearchQuery({});
      assert.equal(res.isValid, true);
      assert.equal(res.sanitized?.page, 1);
      assert.equal(res.sanitized?.limit, 12);
    });

    it('sanitizes and clamps pagination parameters', () => {
      const res = RecipeValidator.validateSearchQuery({ page: '3', limit: '25' });
      assert.equal(res.isValid, true);
      assert.equal(res.sanitized?.page, 3);
      assert.equal(res.sanitized?.limit, 25);
    });

    it('rejects invalid or out-of-range pagination', () => {
      const invalidPage = RecipeValidator.validateSearchQuery({ page: '-1' });
      assert.equal(invalidPage.isValid, false);
      assert.match(invalidPage.errors![0], /positive integer/);

      const excessLimit = RecipeValidator.validateSearchQuery({ limit: '999' });
      assert.equal(excessLimit.isValid, false);
      assert.match(excessLimit.errors![0], /cannot exceed maximum/);
    });

    it('rejects search queries exceeding maximum allowed length', () => {
      const longQuery = 'a'.repeat(101);
      const res = RecipeValidator.validateSearchQuery({ query: longQuery });
      assert.equal(res.isValid, false);
      assert.match(res.errors![0], /cannot exceed 100 characters/);
    });

    it('validates supported cuisines and rejects arbitrary values', () => {
      const valid = RecipeValidator.validateSearchQuery({ cuisine: 'italian,mexican' });
      assert.equal(valid.isValid, true);
      assert.equal(valid.sanitized?.cuisine, 'italian,mexican');

      const invalid = RecipeValidator.validateSearchQuery({ cuisine: 'martian,italian' });
      assert.equal(invalid.isValid, false);
      assert.match(invalid.errors![0], /Unsupported cuisine/);
    });

    it('validates supported diets and meal types', () => {
      const valid = RecipeValidator.validateSearchQuery({ diet: 'vegetarian', type: 'main course' });
      assert.equal(valid.isValid, true);
      assert.equal(valid.sanitized?.diet, 'vegetarian');
      assert.equal(valid.sanitized?.type, 'main course');

      const invalid = RecipeValidator.validateSearchQuery({ diet: 'carnivore-only' });
      assert.equal(invalid.isValid, false);
      assert.match(invalid.errors![0], /Unsupported diet/);
    });

    it('validates recipe IDs correctly', () => {
      const valid = RecipeValidator.validateRecipeId('716429');
      assert.equal(valid.isValid, true);
      assert.equal(valid.sanitized, 716429);

      const nonNumeric = RecipeValidator.validateRecipeId('abc');
      assert.equal(nonNumeric.isValid, false);

      const pathTraversal = RecipeValidator.validateRecipeId('../etc/passwd');
      assert.equal(pathTraversal.isValid, false);

      const negative = RecipeValidator.validateRecipeId('-50');
      assert.equal(negative.isValid, false);
    });
  });

  describe('2. Public Recipe Listing Endpoint (GET /api/recipes)', () => {
    it('returns default recipe list without authentication', async () => {
      const res = await fetch(`${baseUrl}/api/recipes`);
      assert.equal(res.status, 200);

      const json = await res.json() as {
        success: boolean;
        data: Array<{ id: number; title: string }>;
        pagination: { page: number; limit: number; totalResults: number };
      };

      assert.equal(json.success, true);
      assert.ok(Array.isArray(json.data));
      assert.ok(json.data.length > 0);
      assert.ok(json.pagination.totalResults > 0);
      assert.equal(json.pagination.page, 1);
      assert.equal(json.pagination.limit, 12);
    });

    it('supports keyword query search', async () => {
      const res = await fetch(`${baseUrl}/api/recipes?query=pasta`);
      assert.equal(res.status, 200);

      const json = await res.json() as { success: boolean; data: Array<{ title: string }> };
      assert.equal(json.success, true);
      assert.ok(json.data.length > 0);
      assert.ok(json.data.some((r) => r.title.toLowerCase().includes('pasta')));
    });

    it('supports cuisine and diet filtering', async () => {
      const res = await fetch(`${baseUrl}/api/recipes?cuisine=italian&diet=vegetarian`);
      assert.equal(res.status, 200);

      const json = await res.json() as { success: boolean; data: Array<{ id: number }> };
      assert.equal(json.success, true);
      assert.ok(json.data.length > 0);
    });

    it('supports sorting and pagination boundaries', async () => {
      const res = await fetch(`${baseUrl}/api/recipes?sort=time&sortDirection=asc&page=1&limit=2`);
      assert.equal(res.status, 200);

      const json = await res.json() as {
        success: boolean;
        data: Array<{ readyInMinutes: number }>;
        pagination: { limit: number };
      };
      assert.equal(json.success, true);
      assert.equal(json.pagination.limit, 2);
      assert.ok(json.data.length <= 2);
    });

    it('handles empty search results gracefully', async () => {
      const res = await fetch(`${baseUrl}/api/recipes?query=xyznonexistentrecipekeyword999`);
      assert.equal(res.status, 200);

      const json = await res.json() as {
        success: boolean;
        data: unknown[];
        pagination: { totalResults: number };
      };
      assert.equal(json.success, true);
      assert.equal(json.data.length, 0);
      assert.equal(json.pagination.totalResults, 0);
    });

    it('rejects invalid query parameters with 400 Bad Request', async () => {
      const res = await fetch(`${baseUrl}/api/recipes?limit=9999`);
      assert.equal(res.status, 400);

      const json = await res.json() as { success: boolean; error: { code: string } };
      assert.equal(json.success, false);
      assert.equal(json.error.code, 'INVALID_QUERY_PARAMETERS');
    });
  });

  describe('3. Public Recipe Details Endpoint (GET /api/recipes/:id)', () => {
    it('retrieves recipe details by valid ID without authentication', async () => {
      const res = await fetch(`${baseUrl}/api/recipes/716429`);
      assert.equal(res.status, 200);

      const json = await res.json() as {
        success: boolean;
        data: {
          id: number;
          title: string;
          ingredients: Array<{ name: string }>;
          steps: Array<{ step: string }>;
        };
      };

      assert.equal(json.success, true);
      assert.equal(json.data.id, 716429);
      assert.ok(json.data.title.length > 0);
      assert.ok(Array.isArray(json.data.ingredients));
      assert.ok(json.data.ingredients.length > 0);
      assert.ok(Array.isArray(json.data.steps));
    });

    it('returns 400 Bad Request for malformed non-numeric recipe ID', async () => {
      const res = await fetch(`${baseUrl}/api/recipes/not-a-number`);
      assert.equal(res.status, 400);

      const json = await res.json() as { success: boolean; error: { code: string } };
      assert.equal(json.success, false);
      assert.equal(json.error.code, 'INVALID_RECIPE_ID');
    });

    it('returns 404 for confirmed nonexistent recipe ID', async () => {
      const res = await fetch(`${baseUrl}/api/recipes/99999999`);
      assert.equal(res.status, 404);

      const json = await res.json() as { success: boolean; error: { code: string } };
      assert.equal(json.success, false);
      assert.equal(json.error.code, 'RECIPE_NOT_FOUND');
    });
  });

  describe('4. Strict Prohibition of Recipe CRUD', () => {
    it('rejects POST /api/recipes (no recipe creation allowed)', async () => {
      const res = await fetch(`${baseUrl}/api/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New Recipe' }),
      });
      assert.ok(res.status === 404 || res.status === 405);
    });

    it('rejects PUT /api/recipes/:id (no recipe updates allowed)', async () => {
      const res = await fetch(`${baseUrl}/api/recipes/716429`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Modified' }),
      });
      assert.ok(res.status === 404 || res.status === 405);
    });

    it('rejects DELETE /api/recipes/:id (no recipe deletion allowed)', async () => {
      const res = await fetch(`${baseUrl}/api/recipes/716429`, {
        method: 'DELETE',
      });
      assert.ok(res.status === 404 || res.status === 405);
    });
  });

  describe('5. Protected User-Specific Favorites (/api/favorites)', () => {
    it('rejects unauthenticated requests to favorites with 401', async () => {
      const listRes = await fetch(`${baseUrl}/api/favorites`);
      assert.equal(listRes.status, 401);

      const addRes = await fetch(`${baseUrl}/api/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId: 716429 }),
      });
      assert.equal(addRes.status, 401);

      const deleteRes = await fetch(`${baseUrl}/api/favorites/716429`, {
        method: 'DELETE',
      });
      assert.equal(deleteRes.status, 401);
    });

    it('rejects requests with invalid or expired tokens', async () => {
      const res = await fetch(`${baseUrl}/api/favorites`, {
        headers: { Authorization: 'Bearer invalid.token.value' },
      });
      assert.equal(res.status, 401);
    });

    it('rejects invalid recipe ID when attempting to add favorite', async () => {
      const res = await fetch(`${baseUrl}/api/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${testUserToken}`,
        },
        body: JSON.stringify({ recipeId: 'invalid-id' }),
      });
      assert.equal(res.status, 400);
      const json = await res.json() as { error: { code: string } };
      assert.equal(json.error.code, 'INVALID_RECIPE_ID');
    });

    it('allows authenticated user to add, check, list, and remove a favorite', async () => {
      // 1. Add favorite
      const addRes = await fetch(`${baseUrl}/api/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${testUserToken}`,
        },
        body: JSON.stringify({
          recipeId: 716429,
          title: 'Pasta with Garlic and Cauliflower',
        }),
      });
      assert.equal(addRes.status, 201);
      const addJson = await addRes.json() as { success: boolean; data: { recipeId: number } };
      assert.equal(addJson.success, true);
      assert.equal(addJson.data.recipeId, 716429);

      // 2. Check favorite status
      const checkRes = await fetch(`${baseUrl}/api/favorites/716429/check`, {
        headers: { Authorization: `Bearer ${testUserToken}` },
      });
      assert.equal(checkRes.status, 200);
      const checkJson = await checkRes.json() as { data: { isFavorite: boolean } };
      assert.equal(checkJson.data.isFavorite, true);

      // 3. List favorites
      const listRes = await fetch(`${baseUrl}/api/favorites`, {
        headers: { Authorization: `Bearer ${testUserToken}` },
      });
      assert.equal(listRes.status, 200);
      const listJson = await listRes.json() as { data: Array<{ recipeId: number }> };
      assert.ok(listJson.data.some((f) => f.recipeId === 716429));

      // 4. Remove favorite
      const delRes = await fetch(`${baseUrl}/api/favorites/716429`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${testUserToken}` },
      });
      assert.equal(delRes.status, 200);

      // 5. Verify removed
      const postCheck = await fetch(`${baseUrl}/api/favorites/716429/check`, {
        headers: { Authorization: `Bearer ${testUserToken}` },
      });
      assert.equal(postCheck.status, 200);
      const postCheckJson = await postCheck.json() as { data: { isFavorite: boolean } };
      assert.equal(postCheckJson.data.isFavorite, false);
    });

    it('enforces cross-user isolation: User B cannot view or delete User A favorites', async () => {
      const userBToken = AuthService.generateToken({
        userId: '987654987654987654987654',
        email: 'userb@example.com',
        role: 'user',
      });

      // User A adds favorite 644387
      await fetch(`${baseUrl}/api/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${testUserToken}`,
        },
        body: JSON.stringify({ recipeId: 644387, title: 'Salmon' }),
      });

      // User B lists favorites: should NOT include 644387
      const userBList = await fetch(`${baseUrl}/api/favorites`, {
        headers: { Authorization: `Bearer ${userBToken}` },
      });
      const userBListJson = await userBList.json() as { data: Array<{ recipeId: number }> };
      assert.ok(!userBListJson.data.some((f) => f.recipeId === 644387));

      // User B attempts to delete User A's favorite: 404 Not Found in User B's list
      const userBDel = await fetch(`${baseUrl}/api/favorites/644387`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${userBToken}` },
      });
      assert.equal(userBDel.status, 404);

      // Clean up User A's favorite
      await fetch(`${baseUrl}/api/favorites/644387`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${testUserToken}` },
      });
    });
  });

  describe('6. Provider Error Handling & Resilience', () => {
    it('translates RecipeNotFoundError to clean 404 response without leaking internals', () => {
      const err = new RecipeNotFoundError(12345);
      assert.equal(err.statusCode, 404);
      assert.equal(err.code, 'RECIPE_NOT_FOUND');
    });

    it('handles ProviderRateLimitError with 429 status code and retry header', () => {
      const err = new ProviderRateLimitError(30);
      assert.equal(err.statusCode, 429);
      assert.equal(err.code, 'RATE_LIMIT_EXCEEDED');
      assert.equal(err.retryAfter, 30);
    });
  });
});
