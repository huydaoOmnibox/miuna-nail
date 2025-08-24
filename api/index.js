import { storage, loginSchema, insertProductSchema, insertGallerySchema, insertPricingSchema, insertHomeContentSchema } from './utils.js';
import jwt from 'jsonwebtoken';

// JWT secret from environment variable
const JWT_SECRET = process.env.JWT_SECRET || process.env.SUPABASE_JWT_SECRET || 'dev-fallback-key-not-for-production';

// Helper function to set CORS headers
function setCORSHeaders(res, req, allowCredentials = false) {
  const allowedOrigins = [
    'https://www.nailsofthenetherlands.nl',
    'https://nailsofthenetherlands.nl',
    'http://localhost:3000'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (allowCredentials) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
}

// Helper function to parse URL and extract ID
function parseUrlParams(req) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const id = url.searchParams.get('id');
  const isSingleItem = id && !isNaN(parseInt(id));
  
  return { url, pathParts, id, isSingleItem };
}

export default async function handler(req, res) {
  try {
    console.log(`${req.method} request to ${req.url}`);
    
    // Handle CORS preflight
    setCORSHeaders(res, req, true);
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    const { pathParts, id, isSingleItem } = parseUrlParams(req);
    
    // Route handling
    if (pathParts.length < 2 || pathParts[0] !== 'api') {
      return res.status(404).json({ error: 'API endpoint not found' });
    }

    const endpoint = pathParts[1];
    const subPath = pathParts[2];

    // Login endpoint
    if (endpoint === 'login') {
      return await handleLogin(req, res);
    }


    // Debug endpoint
    if (endpoint === 'debug') {
      return res.json({
        method: req.method,
        url: req.url,
        headers: req.headers,
        query: req.query,
        body: req.body,
        timestamp: new Date().toISOString()
      });
    }

    // Products endpoint
    if (endpoint === 'products') {
      return await handleProducts(req, res, isSingleItem, id);
    }

    // Gallery endpoint
    if (endpoint === 'gallery') {
      return await handleGallery(req, res, isSingleItem, id);
    }

    // Pricing endpoint
    if (endpoint === 'pricing') {
      return await handlePricing(req, res, isSingleItem, id);
    }

    // Home content endpoints
    if (endpoint === 'home-content') {
      if (subPath && !isNaN(parseInt(subPath))) {
        return await handleHomeContentById(req, res, parseInt(subPath));
      }
      return await handleHomeContent(req, res);
    }

    // Image proxy endpoints
    if (endpoint === 'placeholder-image' || endpoint === 'proxy-image') {
      return await handleImageProxy(req, res, endpoint);
    }

    // Simple PUT endpoint
    if (endpoint === 'simple-put') {
      return await handleSimplePut(req, res);
    }

    // Default 404 for unknown endpoints
    return res.status(404).json({
      error: 'API endpoint not found',
      message: `The endpoint /api/${endpoint} was not found`,
      availableEndpoints: [
        '/api/login',
        '/api/products',
        '/api/gallery',
        '/api/pricing',
        '/api/home-content',
        '/api/home-content/[id]'
      ],
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      message: "Internal server error", 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

// Login handler
async function handleLogin(req, res) {
  if (process.env.NODE_ENV === 'production' && JWT_SECRET === 'dev-fallback-key-not-for-production') {
    console.error('JWT_SECRET not configured for production!');
    return res.status(500).json({ 
      error: 'Server configuration error',
      message: 'Authentication service unavailable'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = loginSchema.parse(req.body);
  const user = await storage.getUserByUsername(username);
  
  if (!user || user.password !== password) {
    return res.status(401).json({ 
      error: 'Invalid credentials',
      message: 'Username or password is incorrect'
    });
  }

  const token = jwt.sign(
    { 
      userId: user.id, 
      username: user.username,
      customerId: user.customerId 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  const { password: _, ...userWithoutPassword } = user;
  
  return res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user: userWithoutPassword
  });
}

// Products handler
async function handleProducts(req, res, isSingleItem, id) {
  if (req.method === 'GET') {
    if (isSingleItem) {
      const product = await storage.getProduct(parseInt(id));
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.json(product);
    } else {
      const products = await storage.getProducts();
      return res.json(products);
    }
  } else if (req.method === 'POST') {
    if (isSingleItem) {
      return res.status(405).json({ message: "Method not allowed" });
    }
    const productData = insertProductSchema.parse(req.body);
    const product = await storage.createProduct(productData);
    return res.status(201).json(product);
  } else if (req.method === 'PUT') {
    if (!isSingleItem) {
      return res.status(405).json({ message: "Method not allowed" });
    }
    const productData = insertProductSchema.partial().parse(req.body);
    const product = await storage.updateProduct(parseInt(id), productData);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
  } else if (req.method === 'DELETE') {
    if (!isSingleItem) {
      return res.status(405).json({ message: "Method not allowed" });
    }
    await storage.deleteProduct(parseInt(id));
    return res.status(204).end();
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

// Gallery handler
async function handleGallery(req, res, isSingleItem, id) {
  if (req.method === 'GET') {
    if (isSingleItem) {
      const item = await storage.getGalleryItem(parseInt(id));
      if (!item) {
        return res.status(404).json({ message: "Gallery item not found" });
      }
      return res.json(item);
    } else {
      const gallery = await storage.getGalleryItems();
      return res.json(gallery);
    }
  } else if (req.method === 'POST') {
    if (isSingleItem) {
      return res.status(405).json({ message: "Method not allowed" });
    }
    const galleryData = insertGallerySchema.parse(req.body);
    const gallery = await storage.createGalleryItem(galleryData);
    return res.status(201).json(gallery);
  } else if (req.method === 'PUT') {
    if (!isSingleItem) {
      return res.status(405).json({ message: "Method not allowed" });
    }
    const galleryData = insertGallerySchema.partial().parse(req.body);
    const item = await storage.updateGalleryItem(parseInt(id), galleryData);
    if (!item) {
      return res.status(404).json({ message: "Gallery item not found" });
    }
    return res.json(item);
  } else if (req.method === 'DELETE') {
    if (!isSingleItem) {
      return res.status(405).json({ message: "Method not allowed" });
    }
    await storage.deleteGalleryItem(parseInt(id));
    return res.status(204).end();
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

// Pricing handler
async function handlePricing(req, res, isSingleItem, id) {
  if (req.method === 'GET') {
    if (isSingleItem) {
      const item = await storage.getPricingItem(parseInt(id));
      if (!item) {
        return res.status(404).json({ message: "Pricing item not found" });
      }
      return res.json(item);
    } else {
      const pricing = await storage.getPricingItems();
      return res.json(pricing);
    }
  } else if (req.method === 'POST') {
    if (isSingleItem) {
      return res.status(405).json({ message: "Method not allowed" });
    }
    const pricingData = insertPricingSchema.parse(req.body);
    const pricing = await storage.createPricingItem(pricingData);
    return res.status(201).json(pricing);
  } else if (req.method === 'PUT') {
    if (!isSingleItem) {
      return res.status(405).json({ message: "Method not allowed" });
    }
    const pricingData = insertPricingSchema.partial().parse(req.body);
    const item = await storage.updatePricingItem(parseInt(id), pricingData);
    if (!item) {
      return res.status(404).json({ message: "Pricing item not found" });
    }
    return res.json(item);
  } else if (req.method === 'DELETE') {
    if (!isSingleItem) {
      return res.status(405).json({ message: "Method not allowed" });
    }
    await storage.deletePricingItem(parseInt(id));
    return res.status(204).end();
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

// Home content handler (base)
async function handleHomeContent(req, res) {
  if (req.method === 'GET') {
    const content = await storage.getHomeContents();
    return res.json(content);
  } else if (req.method === 'POST') {
    const contentData = insertHomeContentSchema.parse(req.body);
    const content = await storage.createHomeContent(contentData);
    return res.status(201).json(content);
  } else {
    return res.status(405).json({ message: "Method not allowed for this endpoint. Use /api/home-content/[id] for specific items." });
  }
}

// Home content handler (by ID)
async function handleHomeContentById(req, res, id) {
  if (req.method === 'GET') {
    const content = await storage.getHomeContent(id);
    if (!content) {
      return res.status(404).json({ message: "Home content not found" });
    }
    return res.json(content);
  } else if (req.method === 'PUT') {
    const contentData = insertHomeContentSchema.partial().parse(req.body);
    const content = await storage.updateHomeContent(id, contentData);
    if (!content) {
      return res.status(404).json({ message: "Home content not found" });
    }
    return res.json(content);
  } else if (req.method === 'DELETE') {
    await storage.deleteHomeContent(id);
    return res.status(204).end();
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

// Simple PUT handler
async function handleSimplePut(req, res) {
  if (req.method === 'PUT') {
    return res.json({
      message: 'PUT request successful',
      data: req.body,
      timestamp: new Date().toISOString()
    });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

// Image proxy handler (placeholder)
async function handleImageProxy(req, res, endpoint) {
  return res.json({
    message: `${endpoint} endpoint`,
    note: 'This endpoint would handle image proxying',
    timestamp: new Date().toISOString()
  });
}