import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthUserPayload {
  id: string;
  name: string;
  email: string;
  role: 'user';
  savedRecipes: string[];
  preferences: string[];
  createdAt: Date;
}

export interface AuthResponse {
  user: AuthUserPayload;
  token: string;
}

export interface JwtUserPayload {
  userId: string;
  email: string;
  role: 'user';
}

export class AuthService {
  private static readonly SALT_ROUNDS = 10;

  public static generateToken(payload: JwtUserPayload): string {
    const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_recipe_search_app_2026';
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    return jwt.sign(payload, secret, { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] });
  }

  public static async register(data: RegisterDTO): Promise<AuthResponse> {
    const normalizedEmail = data.email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      const error = new Error('An account with this email already exists');
      (error as Error & { statusCode?: number }).statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(data.password, this.SALT_ROUNDS);

    const newUser = await User.create({
      name: data.name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: 'user',
      savedRecipes: [],
      preferences: [],
    });

    const token = this.generateToken({
      userId: newUser._id.toString(),
      email: newUser.email,
      role: 'user',
    });

    return {
      user: {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: 'user',
        savedRecipes: newUser.savedRecipes,
        preferences: newUser.preferences,
        createdAt: newUser.createdAt,
      },
      token,
    };
  }

  public static async login(credentials: LoginDTO): Promise<AuthResponse> {
    const normalizedEmail = credentials.email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      const error = new Error('Invalid email or password');
      (error as Error & { statusCode?: number }).statusCode = 401;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Invalid email or password');
      (error as Error & { statusCode?: number }).statusCode = 401;
      throw error;
    }

    const token = this.generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: 'user',
    });

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: 'user',
        savedRecipes: user.savedRecipes,
        preferences: user.preferences,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  public static async getProfile(userId: string): Promise<AuthUserPayload> {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      const error = new Error('User not found');
      (error as Error & { statusCode?: number }).statusCode = 404;
      throw error;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: 'user',
      savedRecipes: user.savedRecipes || [],
      preferences: user.preferences || [],
      createdAt: user.createdAt,
    };
  }

  public static async getSavedRecipes(userId: string): Promise<string[]> {
    const user = await User.findById(userId).select('savedRecipes');
    if (!user) {
      const error = new Error('User not found');
      (error as Error & { statusCode?: number }).statusCode = 404;
      throw error;
    }
    return user.savedRecipes || [];
  }

  public static async addSavedRecipe(userId: string, recipeId: string): Promise<string[]> {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { savedRecipes: recipeId } },
      { new: true }
    ).select('savedRecipes');

    if (!user) {
      const error = new Error('User not found');
      (error as Error & { statusCode?: number }).statusCode = 404;
      throw error;
    }
    return user.savedRecipes || [];
  }

  public static async removeSavedRecipe(userId: string, recipeId: string): Promise<string[]> {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { savedRecipes: recipeId } },
      { new: true }
    ).select('savedRecipes');

    if (!user) {
      const error = new Error('User not found');
      (error as Error & { statusCode?: number }).statusCode = 404;
      throw error;
    }
    return user.savedRecipes || [];
  }

  public static async updatePreferences(userId: string, preferences: string[]): Promise<string[]> {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { preferences } },
      { new: true }
    ).select('preferences');

    if (!user) {
      const error = new Error('User not found');
      (error as Error & { statusCode?: number }).statusCode = 404;
      throw error;
    }
    return user.preferences || [];
  }
}
