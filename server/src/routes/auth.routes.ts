import { Router } from 'express';
import { container } from '../container.js';
import authenticate from '../middleware/auth.middleware.js';
import { authRateLimiter } from '../middleware/rateLimiter.js';
import asyncHandler from '../utils/asyncHandler.js';
import validate from '../middleware/validate.middleware.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';

const router = Router();
const { authController } = container;

router.post('/register', authRateLimiter, validate({ body: registerSchema }), asyncHandler(authController.register));
router.post('/login', authRateLimiter, validate({ body: loginSchema }), asyncHandler(authController.login));
router.get('/me', authenticate, asyncHandler(authController.getMe));
router.post('/logout', authenticate, asyncHandler(authController.logout));

export default router;
