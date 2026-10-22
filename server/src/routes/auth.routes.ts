import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { authRateLimiter } from '../middleware/rateLimiter.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

// Public auth endpoints with brute-force rate limiting
router.post('/register', authRateLimiter, asyncHandler(AuthController.register));
router.post('/login', authRateLimiter, asyncHandler(AuthController.login));

// Protected auth session & profile endpoints
router.get('/me', authenticateToken, asyncHandler(AuthController.getMe));
router.post('/logout', authenticateToken, asyncHandler(AuthController.logout));

export default router;
