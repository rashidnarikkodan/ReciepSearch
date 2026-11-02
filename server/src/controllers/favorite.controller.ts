import type { Request, Response } from 'express';
import type { IFavoriteService } from '../interfaces/index.js';
import { ResponseFactory } from '../core/response/response.factory.js';
import { UnauthorizedError, NotFoundError } from '../errors/index.js';
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from '../constants/index.js';
import type { AddFavoriteRequestDto } from '../dtos/favorite.dto.js';

export class FavoriteController {
  constructor(private readonly service: IFavoriteService) {}

  public listFavorites = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      throw new UnauthorizedError(ERROR_MESSAGES.FAVORITES.AUTH_REQUIRED_VIEW);
    }

    const favorites = await this.service.getFavoritesByUser(String(userId));

    ResponseFactory.success(res, favorites, undefined, undefined, favorites.length);
  };

  public addFavorite = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      throw new UnauthorizedError(ERROR_MESSAGES.FAVORITES.AUTH_REQUIRED_SAVE);
    }

    const favorite = await this.service.addFavorite(String(userId), req.body as AddFavoriteRequestDto);

    ResponseFactory.created(res, favorite, SUCCESS_MESSAGES.FAVORITES.RECIPE_SAVED);
  };

  public removeFavorite = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      throw new UnauthorizedError(ERROR_MESSAGES.FAVORITES.AUTH_REQUIRED_REMOVE);
    }

    const recipeId = Number(req.params.recipeId);
    const removed = await this.service.removeFavorite(String(userId), recipeId);

    if (!removed) {
      throw new NotFoundError(ERROR_MESSAGES.FAVORITES.NOT_FOUND, ERROR_CODES.FAVORITE_NOT_FOUND);
    }

    ResponseFactory.success(res, undefined, SUCCESS_MESSAGES.FAVORITES.RECIPE_REMOVED);
  };

  public checkIsFavorite = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      throw new UnauthorizedError(ERROR_MESSAGES.FAVORITES.AUTH_REQUIRED_CHECK);
    }

    const recipeId = Number(req.params.recipeId);
    const isFav = await this.service.isFavorite(String(userId), recipeId);

    ResponseFactory.success(res, {
      isFavorite: isFav,
    });
  };
}
