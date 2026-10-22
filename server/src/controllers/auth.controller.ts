import type { Request, Response, CookieOptions } from 'express';
import { AuthService } from '../services/auth.service.js';

const COOKIE_NAME = 'token';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class AuthController {
  public static async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 50) {
      res.status(400).json({
        success: false,
        message: 'Name is required and must be between 2 and 50 characters.',
      });
      return;
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
      return;
    }

    if (!password || typeof password !== 'string' || password.length < 6 || password.length > 128) {
      res.status(400).json({
        success: false,
        message: 'Password must be between 6 and 128 characters.',
      });
      return;
    }

    // Role is strictly enforced as 'user'
    const result = await AuthService.register({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    res.cookie(COOKIE_NAME, result.token, cookieOptions);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      data: result,
    });
  }

  public static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
      return;
    }

    const result = await AuthService.login({ email, password });

    res.cookie(COOKIE_NAME, result.token, cookieOptions);

    res.status(200).json({
      success: true,
      message: 'Sign in successful',
      data: result,
    });
  }

  public static async getMe(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized. Please sign in.' });
      return;
    }

    const profile = await AuthService.getProfile(userId);

    res.status(200).json({
      success: true,
      data: {
        user: profile,
      },
    });
  }

  public static async logout(_req: Request, res: Response): Promise<void> {
    res.clearCookie(COOKIE_NAME, cookieOptions);

    res.status(200).json({
      success: true,
      message: 'Signed out successfully',
    });
  }

  public static async getFavorites(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized.' });
      return;
    }

    const savedRecipes = await AuthService.getSavedRecipes(userId);
    res.status(200).json({
      success: true,
      data: { savedRecipes },
    });
  }

  public static async addFavorite(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id || req.user?._id;
    const rawRecipeId = req.params.recipeId;
    const recipeId = Array.isArray(rawRecipeId) ? rawRecipeId[0] : rawRecipeId;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized.' });
      return;
    }

    if (!recipeId || typeof recipeId !== 'string') {
      res.status(400).json({ success: false, message: 'Recipe ID is required.' });
      return;
    }

    const updatedSaved = await AuthService.addSavedRecipe(userId, recipeId);
    res.status(200).json({
      success: true,
      message: 'Recipe added to saved favorites',
      data: { savedRecipes: updatedSaved },
    });
  }

  public static async removeFavorite(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id || req.user?._id;
    const rawRecipeId = req.params.recipeId;
    const recipeId = Array.isArray(rawRecipeId) ? rawRecipeId[0] : rawRecipeId;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized.' });
      return;
    }

    if (!recipeId || typeof recipeId !== 'string') {
      res.status(400).json({ success: false, message: 'Recipe ID is required.' });
      return;
    }

    const updatedSaved = await AuthService.removeSavedRecipe(userId, recipeId);
    res.status(200).json({
      success: true,
      message: 'Recipe removed from saved favorites',
      data: { savedRecipes: updatedSaved },
    });
  }

  public static async updatePreferences(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id || req.user?._id;
    const { preferences } = req.body;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized.' });
      return;
    }

    if (!Array.isArray(preferences)) {
      res.status(400).json({ success: false, message: 'Preferences must be an array of strings.' });
      return;
    }

    const updatedPrefs = await AuthService.updatePreferences(
      userId,
      preferences.filter((p) => typeof p === 'string')
    );

    res.status(200).json({
      success: true,
      message: 'Preferences updated successfully',
      data: { preferences: updatedPrefs },
    });
  }
}
