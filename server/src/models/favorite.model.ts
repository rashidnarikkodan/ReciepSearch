import { Schema, model, type Document, type Types } from 'mongoose';

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
      required: [true, 'User ID is required'],
      index: true,
    },
    recipeId: {
      type: Number,
      required: [true, 'Recipe ID is required'],
      min: [1, 'Recipe ID must be a positive integer'],
    },
    title: {
      type: String,
      required: [true, 'Recipe title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    image: {
      type: String,
      trim: true,
    },
    readyInMinutes: {
      type: Number,
      min: [0, 'Preparation time cannot be negative'],
    },
    servings: {
      type: Number,
      min: [1, 'Servings must be at least 1'],
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
