import type { IUserDocument } from '../models/user.model.js';
import type { UserResponseDto } from '../dtos/auth.dto.js';

export class UserMapper {
  public static toResponseDto(user: IUserDocument | (Record<string, unknown> & { _id?: unknown; id?: unknown })): UserResponseDto {
    const raw = user as Record<string, any>;
    const id = raw.id ? String(raw.id) : raw._id ? String(raw._id) : '';
    const name = String(raw.name || '');
    const email = String(raw.email || '');
    const role = String(raw.role || 'user');
    const createdAt = raw.createdAt ? new Date(raw.createdAt as string | number | Date).toISOString() : undefined;
    const updatedAt = raw.updatedAt ? new Date(raw.updatedAt as string | number | Date).toISOString() : undefined;

    return {
      id,
      name,
      email,
      role,
      createdAt,
      updatedAt,
    };
  }
}
