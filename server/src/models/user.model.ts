import { Document, Schema, model } from 'mongoose';
import { ERROR_MESSAGES, AUTH_CONSTANTS } from '../constants/index.js';
import { UserRole } from '../types/auth.types.js';


export interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: [true, ERROR_MESSAGES.AUTH.NAME_REQUIRED],
      trim: true,
      minlength: [AUTH_CONSTANTS.MIN_NAME_LENGTH, ERROR_MESSAGES.AUTH.NAME_REQUIRED],
      maxlength: [AUTH_CONSTANTS.MAX_NAME_LENGTH, ERROR_MESSAGES.AUTH.NAME_REQUIRED],
    },
    email: {
      type: String,
      required: [true, ERROR_MESSAGES.AUTH.EMAIL_REQUIRED],
      unique: true,
      lowercase: true,
      trim: true,
      match: [AUTH_CONSTANTS.EMAIL_REGEX, ERROR_MESSAGES.AUTH.EMAIL_INVALID],
    },
    password: {
      type: String,
      required: [true, ERROR_MESSAGES.AUTH.PASSWORD_REQUIRED],
      minlength: [AUTH_CONSTANTS.MIN_PASSWORD_LENGTH, ERROR_MESSAGES.AUTH.PASSWORD_LENGTH],
      maxlength: [AUTH_CONSTANTS.MAX_PASSWORD_LENGTH, ERROR_MESSAGES.AUTH.PASSWORD_LENGTH],
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

export const User = model<IUserDocument>('User', userSchema);
