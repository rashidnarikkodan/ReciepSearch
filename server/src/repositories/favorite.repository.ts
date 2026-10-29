import { Favorite } from '../models/favorite.model.js';
import type { IFavoriteDocument } from '../types/index.js';
import type { IFavoriteRepository, CreateFavoriteData } from '../interfaces/index.js';

export class FavoriteRepository implements IFavoriteRepository {
  public async findByUser(userId: string): Promise<IFavoriteDocument[]> {
    return Favorite.find({ userId }).sort({ createdAt: -1 });
  }

  public async findOne(userId: string, recipeId: number): Promise<IFavoriteDocument | null> {
    return Favorite.findOne({ userId, recipeId });
  }

  public async create(data: CreateFavoriteData): Promise<IFavoriteDocument> {
    return Favorite.create(data);
  }

  public async delete(userId: string, recipeId: number): Promise<boolean> {
    const result = await Favorite.deleteOne({ userId, recipeId });
    return (result.deletedCount || 0) > 0;
  }

  public async count(userId: string, recipeId: number): Promise<number> {
    return Favorite.countDocuments({ userId, recipeId });
  }
}

export const favoriteRepository = new FavoriteRepository();
