import dotenv from 'dotenv';
import { createApp } from './app.js';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}/api/recipes`);
  console.log(`Health Check: http://localhost:${PORT}/api/health`);
});
