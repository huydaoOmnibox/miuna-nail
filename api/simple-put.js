export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Log the request for debugging
  console.log('=== SIMPLE PUT API ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', req.headers);
  console.log('=====================');

  if (req.method === 'GET') {
    return res.status(200).json({
      message: "Simple PUT API - GET request successful",
      timestamp: new Date().toISOString(),
      method: req.method
    });
  }

  if (req.method === 'POST') {
    return res.status(200).json({
      message: "Simple PUT API - POST request successful",
      body: req.body,
      timestamp: new Date().toISOString(),
      method: req.method
    });
  }

  if (req.method === 'PUT') {
    return res.status(200).json({
      message: "Simple PUT API - PUT request successful!",
      body: req.body,
      timestamp: new Date().toISOString(),
      method: req.method
    });
  }

  if (req.method === 'DELETE') {
    return res.status(200).json({
      message: "Simple PUT API - DELETE request successful",
      timestamp: new Date().toISOString(),
      method: req.method
    });
  }

  return res.status(405).json({ 
    error: 'Method not allowed',
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    receivedMethod: req.method
  });
}
