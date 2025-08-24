import { storage, insertHomeContentSchema } from './utils.js';

export default async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('=== HOME CONTENT BASE API ===');
    console.log('Request URL:', req.url);
    console.log('Method:', req.method);
    console.log('Query params:', req.query);
    console.log('Headers host:', req.headers.host);
    console.log('============================');

    if (req.method === 'GET') {
      // Get all home content items
      const content = await storage.getHomeContents();
      return res.json(content);
    } else if (req.method === 'POST') {
      // Create new home content item
      const contentData = insertHomeContentSchema.parse(req.body);
      const content = await storage.createHomeContent(contentData);
      return res.status(201).json(content);
    } else {
      return res.status(405).json({ message: "Method not allowed for this endpoint. Use /api/home-content/[id] for specific items." });
    }
  } catch (error) {
    console.error('Home Content API Error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}; 