import 'dotenv/config';
import express from 'express';
import { registerRoutes } from '../server/routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register all API routes
registerRoutes(app);

// Export for Vercel serverless functions
export default app;
