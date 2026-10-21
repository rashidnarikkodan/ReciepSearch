import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.post('/register', asyncHandler(AuthController.register));
router.post('/login', asyncHandler(AuthController.login));
router.get('/me', authenticateToken, asyncHandler(AuthController.getMe));
router.get('/profile', authenticateToken, asyncHandler(AuthController.getMe));
router.post('/logout', authenticateToken, asyncHandler(AuthController.logout));

export default router;
