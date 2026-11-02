import type { AddFavoriteRequestDto, FavoriteResponseDto } from '../dtos/favorite.dto.js';

export interface IFavoriteService {
  getFavoritesByUser(userId: string): Promise<FavoriteResponseDto[]>;
  addFavorite(userId: string, data: AddFavoriteRequestDto): Promise<FavoriteResponseDto>;
  removeFavorite(userId: string, recipeId: number): Promise<boolean>;
  isFavorite(userId: string, recipeId: number): Promise<boolean>;
}
