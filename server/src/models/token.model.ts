import { Document, Schema, Types, model } from 'mongoose';


export interface ITokenDocument extends Document {
  token: string;
  userId: Types.ObjectId;
  expiresAt: Date;
  createdAt: Date;
}

const tokenSchema = new Schema<ITokenDocument>(
  {
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

export const Token = model<ITokenDocument>('Token', tokenSchema);
