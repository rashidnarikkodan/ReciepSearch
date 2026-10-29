import mongoose from 'mongoose';
import { APP_CONFIG } from '../constants/index.js';

export async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI || APP_CONFIG.DEFAULT_MONGODB_URI;
  const conn = await mongoose.connect(uri);
  console.log(`[Database] MongoDB connected: ${conn.connection.host}`);
  return conn;
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
  console.log('[Database] MongoDB disconnected');
}
