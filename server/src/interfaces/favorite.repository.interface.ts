import { IFavoriteDocument } from "../models/favorite.model.js";

export interface CreateFavoriteData {
  userId: string;
  recipeId: number;
  title: string;
  image?: string;
  readyInMinutes?: number;
  servings?: number;
}

export interface IFavoriteRepository {
  findByUser(userId: string): Promise<IFavoriteDocument[]>;
  findOne(userId: string, recipeId: number): Promise<IFavoriteDocument | null>;
  create(data: CreateFavoriteData): Promise<IFavoriteDocument>;
  delete(userId: string, recipeId: number): Promise<boolean>;
  count(userId: string, recipeId: number): Promise<number>;
}
