import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { authRateLimiter } from '../middleware/rateLimiter.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

// Public auth endpoints with brute-force rate limiting
router.post('/register', authRateLimiter, asyncHandler(AuthController.register));
router.post('/login', authRateLimiter, asyncHandler(AuthController.login));

// Protected user endpoints
router.get('/me', authenticateToken, asyncHandler(AuthController.getMe));
router.get('/profile', authenticateToken, asyncHandler(AuthController.getMe));
router.post('/logout', authenticateToken, asyncHandler(AuthController.logout));

// Protected user-specific favorites & preferences
router.get('/favorites', authenticateToken, asyncHandler(AuthController.getFavorites));
router.post('/favorites/:recipeId', authenticateToken, asyncHandler(AuthController.addFavorite));
router.delete('/favorites/:recipeId', authenticateToken, asyncHandler(AuthController.removeFavorite));
router.put('/preferences', authenticateToken, asyncHandler(AuthController.updatePreferences));

export default router;
