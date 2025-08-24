import { storage, insertHomeContentSchema } from '../utils.js';

export default async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Get ID from Vercel dynamic route
    const { id } = req.query;
    const numericId = parseInt(id);
    
    console.log('=== HOME CONTENT [ID] API ===');
    console.log('Request URL:', req.url);
    console.log('Dynamic route ID:', id);
    console.log('Numeric ID:', numericId);
    console.log('Method:', req.method);
    console.log('Query params:', req.query);
    console.log('Headers:', req.headers);
    console.log('===========================');

    if (isNaN(numericId)) {
      return res.status(400).json({ message: "Invalid ID parameter" });
    }

    if (req.method === 'GET') {
      // Get single home content item
      const content = await storage.getHomeContent(numericId);
      if (!content) {
        return res.status(404).json({ message: "Home content not found" });
      }
      return res.json(content);
    } else if (req.method === 'PUT') {
      // Update home content item
      const contentData = insertHomeContentSchema.partial().parse(req.body);
      const content = await storage.updateHomeContent(numericId, contentData);
      if (!content) {
        return res.status(404).json({ message: "Home content not found" });
      }
      return res.json(content);
    } else if (req.method === 'DELETE') {
      // Delete home content item
      await storage.deleteHomeContent(numericId);
      return res.status(204).end();
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error('Home Content ID API Error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
};