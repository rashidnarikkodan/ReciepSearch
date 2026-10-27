import { Schema, model, type Document } from 'mongoose';
import { ERROR_MESSAGES } from '../constants/index.js';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user';
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, ERROR_MESSAGES.AUTH.NAME_REQUIRED],
      trim: true,
      minlength: [2, ERROR_MESSAGES.AUTH.NAME_REQUIRED],
      maxlength: [50, ERROR_MESSAGES.AUTH.NAME_REQUIRED],
    },
    email: {
      type: String,
      required: [true, ERROR_MESSAGES.AUTH.EMAIL_REQUIRED],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, ERROR_MESSAGES.AUTH.EMAIL_INVALID],
    },
    password: {
      type: String,
      required: [true, ERROR_MESSAGES.AUTH.PASSWORD_REQUIRED],
      minlength: [6, ERROR_MESSAGES.AUTH.PASSWORD_LENGTH],
      maxlength: [128, ERROR_MESSAGES.AUTH.PASSWORD_LENGTH],
    },
    role: {
      type: String,
      enum: ['user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>('User', userSchema);
