import type { AddFavoriteDTO, IFavoriteDocument } from '../types/index.js';
import type { IFavoriteService, IRecipeService, IFavoriteRepository } from '../interfaces/index.js';

export class FavoriteService implements IFavoriteService {
  constructor(
    private readonly favoriteRepo: IFavoriteRepository,
    private readonly recipeSvc: IRecipeService
  ) {}

  public async getFavoritesByUser(userId: string): Promise<IFavoriteDocument[]> {
    return this.favoriteRepo.findByUser(userId);
  }

  public async addFavorite(userId: string, data: AddFavoriteDTO): Promise<IFavoriteDocument> {
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

    const existing = await this.favoriteRepo.findOne(userId, data.recipeId);
    if (existing) {
      return existing;
    }

    return this.favoriteRepo.create({
      userId,
      recipeId: data.recipeId,
      title: title.slice(0, 200),
      image,
      readyInMinutes,
      servings,
    });
  }

  public async removeFavorite(userId: string, recipeId: number): Promise<boolean> {
    return this.favoriteRepo.delete(userId, recipeId);
  }

  public async isFavorite(userId: string, recipeId: number): Promise<boolean> {
    const count = await this.favoriteRepo.count(userId, recipeId);
    return count > 0;
  }
}
