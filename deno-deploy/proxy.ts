/**
 * Deno Deploy — reverse proxy for mystic-tarot-henna.vercel.app
 * 
 * Why: Vercel deployment is on Hong Kong edge (hkg1) with IP range
 * 216.198.79.x / 64.29.17.x. User's ISP in Russia blocks this range.
 * Deno Deploy has European edges (Frankfurt, etc.) not blocked in Russia.
 * 
 * Free plan: 1 million requests per day, 100 GiB outbound transfer/month.
 * 
 * Setup:
 * 1. Go to https://dash.deno.com → sign up (free, no credit card needed)
 * 2. Click "New Project"
 * 3. Select "Playground" or link your GitHub
 * 4. Paste this code into the editor
 * 5. Click "Save & Deploy"
 * 6. You'll get URL like: https://your-project.deno.dev
 * 7. Test in browser — should work without VPN
 * 8. In VK Mini App settings (vk.com/editapp?id=54714401):
 *    Change URL to: https://your-project.deno.dev
 * 9. Same for OK Mini App
 */

const TARGET = "mystic-tarot-henna.vercel.app";

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);
  
  // Build the target URL
  const targetUrl = `https://${TARGET}${url.pathname}${url.search}`;
  
  // Clone request headers, remove proxy headers
  const headers = new Headers(req.headers);
  headers.set("Host", TARGET);
  headers.delete("cf-connecting-ip");
  headers.delete("cf-ipcountry");
  headers.delete("cf-ray");
  headers.delete("cf-visitor");
  headers.delete("x-forwarded-proto");
  headers.delete("x-forwarded-for");
  headers.delete("x-real-ip");
  
  try {
    // Fetch from Vercel
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: req.method === "GET" || req.method === "HEAD" ? undefined : req.body,
      redirect: "manual",
    });
    
    // Clone response with CORS headers
    const newHeaders = new Headers(response.headers);
    newHeaders.set("Access-Control-Allow-Origin", "*");
    newHeaders.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    newHeaders.set("Access-Control-Allow-Headers", "*");
    
    // Fix Location header in redirects
    if (newHeaders.has("Location")) {
      const location = newHeaders.get("Location") || "";
      newHeaders.set("Location", location.replace(`https://${TARGET}`, url.origin));
    }
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  } catch (err) {
    // Error response
    return new Response(`Proxy error: ${err.message}`, {
      status: 502,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
});
