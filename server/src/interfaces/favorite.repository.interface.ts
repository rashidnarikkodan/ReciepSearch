import type { IFavoriteDocument } from '../models/favorite.model.js';
import type { IBaseRepository } from './base.repository.interface.js';

export interface CreateFavoriteData {
  userId: string;
  recipeId: number;
  title: string;
  image?: string;
  readyInMinutes?: number;
  servings?: number;
}

export interface IFavoriteRepository extends IBaseRepository<IFavoriteDocument, CreateFavoriteData> {
  findByUser(userId: string): Promise<IFavoriteDocument[]>;
  findOneByUserAndRecipe(userId: string, recipeId: number): Promise<IFavoriteDocument | null>;
  deleteByUserAndRecipe(userId: string, recipeId: number): Promise<boolean>;
  countByUserAndRecipe(userId: string, recipeId: number): Promise<number>;
}
