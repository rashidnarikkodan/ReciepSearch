import type { IFavoriteDocument } from '../models/favorite.model.js';
import type { FavoriteResponseDto } from '../dtos/favorite.dto.js';

export class FavoriteMapper {
  public static toResponseDto(doc: IFavoriteDocument | (Record<string, unknown> & { _id?: unknown; id?: unknown })): FavoriteResponseDto {
    const raw = doc as Record<string, any>;
    const id = raw.id ? String(raw.id) : raw._id ? String(raw._id) : undefined;
    const userId = raw.userId ? String(raw.userId) : undefined;
    const recipeId = Number(raw.recipeId);
    const title = String(raw.title || '');
    const image = raw.image ? String(raw.image) : undefined;
    const readyInMinutes = raw.readyInMinutes !== undefined && raw.readyInMinutes !== null ? Number(raw.readyInMinutes) : undefined;
    const servings = raw.servings !== undefined && raw.servings !== null ? Number(raw.servings) : undefined;
    const createdAt = raw.createdAt ? new Date(raw.createdAt as string | number | Date).toISOString() : undefined;

    return {
      id,
      userId,
      recipeId,
      title,
      image,
      readyInMinutes,
      servings,
      createdAt,
    };
  }

  public static toResponseDtoList(docs: (IFavoriteDocument | Record<string, unknown>)[]): FavoriteResponseDto[] {
    return docs.map((doc) => this.toResponseDto(doc));
  }
}
