import { Favorite, type IFavoriteDocument } from '../models/favorite.model.js';
import type { IFavoriteRepository, CreateFavoriteData } from '../interfaces/index.js';
import { BaseMongoRepository } from './base/base.mongo.repository.js';

export class FavoriteRepository extends BaseMongoRepository<IFavoriteDocument, CreateFavoriteData> implements IFavoriteRepository {
  constructor() {
    super(Favorite);
  }

  public async findByUser(userId: string): Promise<IFavoriteDocument[]> {
    return this.model.find({ userId } as any).sort({ createdAt: -1 }).exec();
  }

  public async findOneByUserAndRecipe(userId: string, recipeId: number): Promise<IFavoriteDocument | null> {
    return this.model.findOne({ userId, recipeId } as any).exec();
  }

  public async deleteByUserAndRecipe(userId: string, recipeId: number): Promise<boolean> {
    const result = await this.model.deleteOne({ userId, recipeId } as any).exec();
    return (result.deletedCount || 0) > 0;
  }

  public async countByUserAndRecipe(userId: string, recipeId: number): Promise<number> {
    return this.model.countDocuments({ userId, recipeId } as any).exec();
  }
}

export const favoriteRepository = new FavoriteRepository();
