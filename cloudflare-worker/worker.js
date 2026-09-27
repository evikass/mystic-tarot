/**
 * Cloudflare Worker — reverse proxy for mystic-tarot-henna.vercel.app
 * 
 * Why: Vercel deployment is on Hong Kong edge (hkg1) which user's ISP
 * in Russia blocks. Cloudflare has European edges that work fine.
 * 
 * Usage:
 * 1. Create free Cloudflare account at https://cloudflare.com
 * 2. Go to Workers & Pages → Create Worker
 * 3. Copy this code as the Worker script
 * 4. Deploy
 * 5. You'll get URL like mystic-tarot.your-name.workers.dev
 * 6. Use that URL in VK Mini App settings instead of Vercel URL
 */

const TARGET = 'mystic-tarot-henna.vercel.app';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // Build the target URL — replace hostname with Vercel
    const targetUrl = `https://${TARGET}${url.pathname}${url.search}`;
    
    // Clone request headers
    const headers = new Headers(request.headers);
    headers.set('Host', TARGET);
    headers.delete('cf-connecting-ip');
    headers.delete('cf-ipcountry');
    headers.delete('cf-ray');
    headers.delete('cf-visitor');
    headers.delete('x-forwarded-proto');
    headers.delete('x-real-ip');
    
    // Fetch from Vercel
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: headers,
      body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
      redirect: 'manual',
    });
    
    // Clone response with CORS headers
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Access-Control-Allow-Origin', '*');
    newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    newHeaders.set('Access-Control-Allow-Headers', '*');
    
    // Fix Location header in redirects (replace Vercel URL with Worker URL)
    if (newHeaders.has('Location')) {
      const location = newHeaders.get('Location');
      newHeaders.set('Location', location.replace(`https://${TARGET}`, url.origin));
    }
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }
};
