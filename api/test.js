export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      message: "API is working!",
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV || 'development',
      method: req.method,
      url: req.url
    });
  }

  if (req.method === 'POST') {
    return res.status(200).json({
      message: "POST request received",
      body: req.body,
      timestamp: new Date().toISOString()
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
