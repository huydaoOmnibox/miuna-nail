export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Log all unmatched requests for debugging
  console.log('=== CATCH-ALL API DEBUG ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Path:', req.query.catchall);
  console.log('Headers:', req.headers);
  console.log('Query:', req.query);
  console.log('Body:', req.body);
  console.log('==========================');

  // Return a helpful error message
  return res.status(404).json({
    error: 'API endpoint not found',
    message: `The endpoint ${req.url} with method ${req.method} was not found`,
    availableEndpoints: [
      '/api/test',
      '/api/login',
      '/api/products',
      '/api/products?id=1',
      '/api/gallery',
      '/api/gallery?id=1',
      '/api/pricing',
      '/api/pricing?id=1',
      '/api/home-content',
      '/api/home-content/1'
    ],
    timestamp: new Date().toISOString()
  });
}
