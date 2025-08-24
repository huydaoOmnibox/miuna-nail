export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.query;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL parameter required' });
  }

  // Basic URL validation
  try {
    new URL(url);
  } catch (err) {
    console.error('Invalid URL provided to proxy-image:', url);
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  const requestedUrl = decodeURIComponent(url);
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  };

  const tryFetch = async (u) => {
    try {
      return await fetch(u, { headers, redirect: 'follow' });
    } catch (err) {
      console.error('Fetch error for', u, err);
      return null;
    }
  };

  try {
    let response = await tryFetch(requestedUrl);

    // If not an image and looks like a Google Drive URL, try download variant
    const isDrive = requestedUrl.includes('drive.google.com');
    let contentType = response?.headers?.get('content-type') || '';

    if ((!response || !response.ok || !contentType.startsWith('image/')) && isDrive) {
      // try to extract file id
      const idMatch = requestedUrl.match(/([?&]id=([^&]+))|\/d\/([^\/]+)\//);
      const fileId = idMatch ? (idMatch[2] || idMatch[3]) : null;
      if (fileId) {
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        response = await tryFetch(downloadUrl);
        contentType = response?.headers?.get('content-type') || '';
      }
    }

    if (!response || !response.ok) {
      console.error('Proxy image fetch failed:', response && response.status, response && response.statusText);
      // Serve placeholder image instead
      return res.redirect('/api/placeholder-image');
    }

    if (!contentType.startsWith('image/')) {
      console.error('Proxy image returned non-image content-type:', contentType);
      return res.redirect('/api/placeholder-image');
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600');

    const buffer = Buffer.from(await response.arrayBuffer());
    return res.send(buffer);
  } catch (err) {
    console.error('Proxy image handler error:', err);
    return res.redirect('/api/placeholder-image');
  }
}
