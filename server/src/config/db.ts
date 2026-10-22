import mongoose from 'mongoose';

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/recipesearch';
  try {
    const conn = await mongoose.connect(uri);
    console.log(`[Database] MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('[Database] MongoDB connection error:', error);
  }
}
