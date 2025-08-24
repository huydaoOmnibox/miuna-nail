import 'dotenv/config';
import express from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// JWT secret from environment variable - required for production
const JWT_SECRET = process.env.JWT_SECRET || 'dev-fallback-key-not-for-production';

// Simple schemas for validation
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Basic login route for testing
app.post("/api/login", async (req, res) => {
  try {
    console.log(`${req.method} request to /api/login`);
    console.log('Request body:', req.body);
    
    // Validate request body
    const { username, password } = loginSchema.parse(req.body);
    console.log('Validated credentials for username:', username);

    // For now, just return a success response
    // In production, you would validate against your database
    console.log('Login successful for user:', username);
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token: 'test-token',
      user: { id: 1, username }
    });

  } catch (error: any) {
    console.error('Login API Error:', error);
    
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        error: 'Validation error',
        details: error.errors
      });
    }
    
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Login failed',
      details: error.message
    });
  }
});

// Test route to verify API is working
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "API is working!", 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Export for Vercel serverless functions
export default app;
