export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Log everything for debugging
  console.log('=== DEBUG API ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Path:', req.url);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Query:', req.query);
  console.log('Body:', req.body);
  console.log('================');

  // Return detailed information about the request
  return res.status(200).json({
    message: "Debug API working",
    method: req.method,
    url: req.url,
    headers: req.headers,
    query: req.query,
    body: req.body,
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
}
