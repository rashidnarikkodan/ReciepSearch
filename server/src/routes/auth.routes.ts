import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { UserService } from '../services/user.service.js';
import { TokenService } from '../services/token.service.js';
import { userRepository } from '../repositories/user.repository.js';
import { tokenRepository } from '../repositories/token.repository.js';
import authenticate from '../middleware/auth.middleware.js';
import { authRateLimiter } from '../middleware/rateLimiter.js';
import asyncHandler from '../utils/asyncHandler.js';
import validate from '../middleware/validate.middleware.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';

const router = Router();

const userService = new UserService(userRepository);
const tokenService = new TokenService(tokenRepository);
const authController = new AuthController(userService, tokenService);

router.post('/register', authRateLimiter, validate({ body: registerSchema }), asyncHandler(authController.register));
router.post('/login', authRateLimiter, validate({ body: loginSchema }), asyncHandler(authController.login));
router.get('/me', authenticate, asyncHandler(authController.getMe));
router.post('/logout', authenticate, asyncHandler(authController.logout));

export default router;
