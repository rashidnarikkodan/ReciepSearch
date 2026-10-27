import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import type { Server } from 'node:http';
import { createApp } from '../app.js';
import {
  HTTP_STATUS,
  ERROR_CODES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from '../constants/index.js';

describe('Error Messages & Constants Verification Suite', () => {
  let server: Server;
  let baseUrl: string;

  before(async () => {
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

  describe('1. Constants Integrity & Completeness', () => {
    it('contains valid HTTP status codes', () => {
      assert.equal(HTTP_STATUS.OK, 200);
      assert.equal(HTTP_STATUS.BAD_REQUEST, 400);
      assert.equal(HTTP_STATUS.UNAUTHORIZED, 401);
      assert.equal(HTTP_STATUS.NOT_FOUND, 404);
      assert.equal(HTTP_STATUS.CONFLICT, 409);
      assert.equal(HTTP_STATUS.TOO_MANY_REQUESTS, 429);
      assert.equal(HTTP_STATUS.INTERNAL_SERVER_ERROR, 500);
      assert.equal(HTTP_STATUS.BAD_GATEWAY, 502);
    });

    it('contains valid machine-readable error codes', () => {
      assert.equal(typeof ERROR_CODES.INVALID_INPUT, 'string');
      assert.equal(typeof ERROR_CODES.INVALID_QUERY_PARAMETERS, 'string');
      assert.equal(typeof ERROR_CODES.INVALID_RECIPE_ID, 'string');
      assert.equal(typeof ERROR_CODES.UNAUTHORIZED, 'string');
      assert.equal(typeof ERROR_CODES.RECIPE_NOT_FOUND, 'string');
      assert.equal(typeof ERROR_CODES.RATE_LIMIT_EXCEEDED, 'string');
    });

    it('contains human-readable error messages for all categories', () => {
      assert.ok(ERROR_MESSAGES.AUTH.NAME_REQUIRED.length > 0);
      assert.ok(ERROR_MESSAGES.AUTH.EMAIL_INVALID.length > 0);
      assert.ok(ERROR_MESSAGES.AUTH.PASSWORD_LENGTH.length > 0);
      assert.ok(ERROR_MESSAGES.AUTH.UNAUTHORIZED.length > 0);
      assert.ok(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS.length > 0);
      assert.ok(ERROR_MESSAGES.RECIPE.INVALID_QUERY_PARAMS.length > 0);
      assert.ok(ERROR_MESSAGES.RECIPE.SEARCH_UNAVAILABLE.length > 0);
      assert.ok(ERROR_MESSAGES.FAVORITES.AUTH_REQUIRED_VIEW.length > 0);
      assert.ok(ERROR_MESSAGES.RATE_LIMIT.AUTH_LIMIT_EXCEEDED.length > 0);
      assert.ok(ERROR_MESSAGES.SYSTEM.INTERNAL_SERVER_ERROR.length > 0);
    });

    it('formats dynamic error message helpers correctly', () => {
      const notFoundMsg = ERROR_MESSAGES.RECIPE.NOT_FOUND(999);
      assert.equal(notFoundMsg, 'Recipe with ID 999 was not found.');

      const routeMsg = ERROR_MESSAGES.SYSTEM.ROUTE_NOT_FOUND('GET', '/unknown');
      assert.equal(routeMsg, 'Cannot GET /unknown - Route not found');
    });
  });

  describe('2. Endpoint Error Responses Adhere to Constants', () => {
    it('returns constant message on 404 Route Not Found', async () => {
      const res = await fetch(`${baseUrl}/api/non-existent-endpoint`);
      assert.equal(res.status, HTTP_STATUS.NOT_FOUND);

      const json = await res.json() as { success: boolean; message: string; error?: { code: string; message: string } };
      assert.equal(json.success, false);
      assert.equal(json.message, ERROR_MESSAGES.SYSTEM.ROUTE_NOT_FOUND('GET', '/api/non-existent-endpoint'));
      assert.equal(json.error?.code, ERROR_CODES.ROUTE_NOT_FOUND);
    });

    it('returns constant message on Auth registration input validation failure', async () => {
      const res = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: '', email: 'bad-email', password: '123' }),
      });
      assert.equal(res.status, HTTP_STATUS.BAD_REQUEST);

      const json = await res.json() as { success: boolean; message: string; error?: { code: string; message: string } };
      assert.equal(json.success, false);
      assert.equal(json.message, ERROR_MESSAGES.AUTH.NAME_REQUIRED);
      assert.equal(json.error?.code, ERROR_CODES.INVALID_INPUT);
    });

    it('returns constant message on Auth login credentials validation failure', async () => {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: '' }),
      });
      assert.equal(res.status, HTTP_STATUS.BAD_REQUEST);

      const json = await res.json() as { success: boolean; message: string; error?: { code: string; message: string } };
      assert.equal(json.success, false);
      assert.equal(json.message, ERROR_MESSAGES.AUTH.CREDENTIALS_REQUIRED);
      assert.equal(json.error?.code, ERROR_CODES.INVALID_INPUT);
    });

    it('returns constant message on unauthenticated Auth /me endpoint', async () => {
      const res = await fetch(`${baseUrl}/auth/me`);
      assert.equal(res.status, HTTP_STATUS.UNAUTHORIZED);

      const json = await res.json() as { success: boolean; message: string; error?: { code: string } };
      assert.equal(json.success, false);
      assert.equal(json.message, ERROR_MESSAGES.AUTH.UNAUTHORIZED);
      assert.equal(json.error?.code, ERROR_CODES.UNAUTHORIZED);
    });

    it('returns constant message on invalid Recipe search query', async () => {
      const res = await fetch(`${baseUrl}/api/recipes?query=${'x'.repeat(150)}`);
      assert.equal(res.status, HTTP_STATUS.BAD_REQUEST);

      const json = await res.json() as { success: boolean; message: string; error?: { code: string; message: string } };
      assert.equal(json.success, false);
      assert.equal(json.message, ERROR_MESSAGES.RECIPE.INVALID_QUERY_PARAMS);
      assert.equal(json.error?.code, ERROR_CODES.INVALID_QUERY_PARAMETERS);
    });

    it('returns constant message on invalid Recipe ID format', async () => {
      const res = await fetch(`${baseUrl}/api/recipes/abc`);
      assert.equal(res.status, HTTP_STATUS.BAD_REQUEST);

      const json = await res.json() as { success: boolean; message: string; error?: { code: string; message: string } };
      assert.equal(json.success, false);
      assert.equal(json.message, ERROR_MESSAGES.VALIDATION.RECIPE_ID_POSITIVE_INT);
      assert.equal(json.error?.code, ERROR_CODES.INVALID_RECIPE_ID);
    });

    it('returns constant message on non-existent Recipe ID', async () => {
      const res = await fetch(`${baseUrl}/api/recipes/99999999`);
      assert.equal(res.status, HTTP_STATUS.NOT_FOUND);

      const json = await res.json() as { success: boolean; message: string; error?: { code: string; message: string } };
      assert.equal(json.success, false);
      assert.equal(json.message, ERROR_MESSAGES.RECIPE.NOT_FOUND(99999999));
      assert.equal(json.error?.code, ERROR_CODES.RECIPE_NOT_FOUND);
    });

    it('returns constant message on unauthenticated Favorites list request', async () => {
      const res = await fetch(`${baseUrl}/api/favorites`);
      assert.equal(res.status, HTTP_STATUS.UNAUTHORIZED);

      const json = await res.json() as { success: boolean; message: string; error?: { code: string } };
      assert.equal(json.success, false);
      assert.equal(json.message, ERROR_MESSAGES.AUTH.UNAUTHORIZED);
      assert.equal(json.error?.code, ERROR_CODES.UNAUTHORIZED);
    });

    it('returns constant message on Health check endpoint', async () => {
      const res = await fetch(`${baseUrl}/api/health`);
      assert.equal(res.status, HTTP_STATUS.OK);

      const json = await res.json() as { status: string; service: string };
      assert.equal(json.status, SUCCESS_MESSAGES.HEALTH.STATUS_OK);
      assert.equal(json.service, SUCCESS_MESSAGES.HEALTH.SERVICE_NAME);
    });
  });
});
