import mongoose from 'mongoose';
import { Favorite, type IFavorite } from '../models/favorite.model.js';
import { RecipeService } from './recipe.service.js';

export interface AddFavoriteDTO {
  recipeId: number;
  title?: string;
  image?: string;
  readyInMinutes?: number;
  servings?: number;
}

export class FavoriteService {
  private static inMemoryFavorites = new Map<string, Array<{
    userId: string;
    recipeId: number;
    title: string;
    image?: string;
    readyInMinutes?: number;
    servings?: number;
    createdAt: Date;
  }>>();

  /**
   * Retrieve all favorites belonging to an authenticated user
   */
  public static async getFavoritesByUser(userId: string): Promise<IFavorite[] | Array<Record<string, unknown>>> {
    if (mongoose.connection.readyState === 1) {
      return Favorite.find({ userId }).sort({ createdAt: -1 });
    }

    const list = this.inMemoryFavorites.get(userId) || [];
    return [...list].reverse();
  }

  /**
   * Add a recipe to user's favorites, fetching minimal metadata from provider if omitted
   */
  public static async addFavorite(userId: string, data: AddFavoriteDTO): Promise<IFavorite | Record<string, unknown>> {
    let title = data.title;
    let image = data.image;
    let readyInMinutes = data.readyInMinutes;
    let servings = data.servings;

    // If metadata was not supplied by client, fetch details from provider to ensure integrity
    if (!title) {
      const details = await RecipeService.getRecipeDetails(data.recipeId);
      title = details.title;
      image = image || details.image;
      readyInMinutes = readyInMinutes !== undefined ? readyInMinutes : details.readyInMinutes;
      servings = servings !== undefined ? servings : details.servings;
    }

    if (mongoose.connection.readyState === 1) {
      const existing = await Favorite.findOne({ userId, recipeId: data.recipeId });
      if (existing) return existing;

      return Favorite.create({
        userId,
        recipeId: data.recipeId,
        title: title.slice(0, 200),
        image,
        readyInMinutes,
        servings,
      });
    }

    // In-memory fallback for offline test environments
    const list = this.inMemoryFavorites.get(userId) || [];
    const existing = list.find((f) => f.recipeId === data.recipeId);
    if (existing) return existing;

    const newFav = {
      userId,
      recipeId: data.recipeId,
      title: title.slice(0, 200),
      image,
      readyInMinutes,
      servings,
      createdAt: new Date(),
    };
    list.push(newFav);
    this.inMemoryFavorites.set(userId, list);
    return newFav;
  }

  /**
   * Remove a recipe from user's favorites
   */
  public static async removeFavorite(userId: string, recipeId: number): Promise<boolean> {
    if (mongoose.connection.readyState === 1) {
      const result = await Favorite.deleteOne({ userId, recipeId });
      return result.deletedCount > 0;
    }

    const list = this.inMemoryFavorites.get(userId) || [];
    const initialLen = list.length;
    const filtered = list.filter((f) => f.recipeId !== recipeId);
    this.inMemoryFavorites.set(userId, filtered);
    return filtered.length < initialLen;
  }

  /**
   * Check if a recipe is saved as favorite by the user
   */
  public static async isFavorite(userId: string, recipeId: number): Promise<boolean> {
    if (mongoose.connection.readyState === 1) {
      const count = await Favorite.countDocuments({ userId, recipeId });
      return count > 0;
    }

    const list = this.inMemoryFavorites.get(userId) || [];
    return list.some((f) => f.recipeId === recipeId);
  }
}
