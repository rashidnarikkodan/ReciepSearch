import type { AddFavoriteRequestDto, FavoriteResponseDto } from '../dtos/favorite.dto.js';
import type { IFavoriteService, IRecipeService, IFavoriteRepository } from '../interfaces/index.js';
import { FavoriteMapper } from '../mappers/favorite.mapper.js';

export class FavoriteService implements IFavoriteService {
  constructor(
    private readonly favoriteRepo: IFavoriteRepository,
    private readonly recipeSvc: IRecipeService
  ) {}

  public async getFavoritesByUser(userId: string): Promise<FavoriteResponseDto[]> {
    const docs = await this.favoriteRepo.findByUser(userId);
    return FavoriteMapper.toResponseDtoList(docs);
  }

  public async addFavorite(userId: string, data: AddFavoriteRequestDto): Promise<FavoriteResponseDto> {
    let title = data.title;
    let image = data.image;
    let readyInMinutes = data.readyInMinutes;
    let servings = data.servings;

    if (!title) {
      const details = await this.recipeSvc.getRecipeDetails(data.recipeId);
      title = details.title;
      image = image || details.image;
      readyInMinutes = readyInMinutes !== undefined ? readyInMinutes : details.readyInMinutes;
      servings = servings !== undefined ? servings : details.servings;
    }

    const existing = await this.favoriteRepo.findOneByUserAndRecipe(userId, data.recipeId);
    if (existing) {
      return FavoriteMapper.toResponseDto(existing);
    }

    const created = await this.favoriteRepo.create({
      userId,
      recipeId: data.recipeId,
      title: title.slice(0, 200),
      image,
      readyInMinutes,
      servings,
    });

    return FavoriteMapper.toResponseDto(created);
  }

  public async removeFavorite(userId: string, recipeId: number): Promise<boolean> {
    return this.favoriteRepo.deleteByUserAndRecipe(userId, recipeId);
  }

  public async isFavorite(userId: string, recipeId: number): Promise<boolean> {
    const count = await this.favoriteRepo.countByUserAndRecipe(userId, recipeId);
    return count > 0;
  }
}
