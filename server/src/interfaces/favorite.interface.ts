import { IFavoriteDocument } from '../models/favorite.model.js';
import type { AddFavoriteDTO } from '../types/index.js';

export interface IFavoriteService {
  getFavoritesByUser(userId: string): Promise<IFavoriteDocument[]>;
  addFavorite(userId: string, data: AddFavoriteDTO): Promise<IFavoriteDocument>;
  removeFavorite(userId: string, recipeId: number): Promise<boolean>;
  isFavorite(userId: string, recipeId: number): Promise<boolean>;
}
