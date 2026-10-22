import dotenv from 'dotenv';
import { createApp } from './app.js';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
const app = createApp();

connectDB();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Auth endpoints: http://localhost:${PORT}/auth`);
  console.log(`Health Check: http://localhost:${PORT}/api/health`);
});
