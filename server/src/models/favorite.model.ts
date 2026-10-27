import { Schema, model, type Document, type Types } from 'mongoose';
import { ERROR_MESSAGES } from '../constants/index.js';

export interface IFavorite extends Document {
  userId: Types.ObjectId;
  recipeId: number;
  title: string;
  image?: string;
  readyInMinutes?: number;
  servings?: number;
  createdAt: Date;
}

const favoriteSchema = new Schema<IFavorite>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, ERROR_MESSAGES.FAVORITES.USER_ID_REQUIRED],
      index: true,
    },
    recipeId: {
      type: Number,
      required: [true, ERROR_MESSAGES.FAVORITES.RECIPE_ID_REQUIRED],
      min: [1, ERROR_MESSAGES.VALIDATION.RECIPE_ID_POSITIVE_INT],
    },
    title: {
      type: String,
      required: [true, ERROR_MESSAGES.FAVORITES.RECIPE_TITLE_REQUIRED],
      trim: true,
      maxlength: [200, ERROR_MESSAGES.FAVORITES.TITLE_TOO_LONG(200)],
    },
    image: {
      type: String,
      trim: true,
    },
    readyInMinutes: {
      type: Number,
      min: [0, ERROR_MESSAGES.FAVORITES.TIME_NEGATIVE],
    },
    servings: {
      type: Number,
      min: [1, ERROR_MESSAGES.FAVORITES.SERVINGS_MIN],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

// Compound index to guarantee uniqueness per user and efficient lookups
favoriteSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

export const Favorite = model<IFavorite>('Favorite', favoriteSchema);
