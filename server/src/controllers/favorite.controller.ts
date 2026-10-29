import type { Request, Response } from 'express';
import type { IFavoriteService } from '../interfaces/index.js';
import success from '../utils/success.js';
import { UnauthorizedError, NotFoundError } from '../errors/index.js';
import {
  HTTP_STATUS,
  ERROR_CODES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from '../constants/index.js';

export class FavoriteController {
  constructor(private readonly service: IFavoriteService) {}

  public listFavorites = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      throw new UnauthorizedError(ERROR_MESSAGES.FAVORITES.AUTH_REQUIRED_VIEW);
    }

    const favorites = await this.service.getFavoritesByUser(userId);

    success(res, undefined, HTTP_STATUS.OK, favorites);
  };

  public addFavorite = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      throw new UnauthorizedError(ERROR_MESSAGES.FAVORITES.AUTH_REQUIRED_SAVE);
    }

    const favorite = await this.service.addFavorite(userId, req.body);

    success(res, SUCCESS_MESSAGES.FAVORITES.RECIPE_SAVED, HTTP_STATUS.CREATED, favorite);
  };

  public removeFavorite = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      throw new UnauthorizedError(ERROR_MESSAGES.FAVORITES.AUTH_REQUIRED_REMOVE);
    }

    const recipeId = Number(req.params.recipeId);
    const removed = await this.service.removeFavorite(userId, recipeId);

    if (!removed) {
      throw new NotFoundError(ERROR_MESSAGES.FAVORITES.NOT_FOUND, ERROR_CODES.FAVORITE_NOT_FOUND);
    }

    success(res, SUCCESS_MESSAGES.FAVORITES.RECIPE_REMOVED, HTTP_STATUS.OK);
  };

  public checkIsFavorite = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      throw new UnauthorizedError(ERROR_MESSAGES.FAVORITES.AUTH_REQUIRED_CHECK);
    }

    const recipeId = Number(req.params.recipeId);
    const isFav = await this.service.isFavorite(userId, recipeId);

    success(res, undefined, HTTP_STATUS.OK, {
      isFavorite: isFav,
    });
  };
}
