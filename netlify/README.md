# Netlify Deployment (Alternative to Vercel)

## Why
Vercel is on Hong Kong edge which is blocked by some ISPs in Russia.
Netlify has European edges (Frankfurt, London) which are NOT blocked.

## Setup
1. Go to https://app.netlify.com → sign up (free)
2. "Add new site" → "Import an existing project"
3. Connect your GitHub account
4. Select repository: evikass/mystic-tarot
5. Build command: `next build`
6. Publish directory: `out`
7. Deploy site
8. Get URL like: https://mystic-tarot.netlify.app
9. Update VK Mini App URL: https://vk.com/editapp?id=54714401
10. Update OK Mini App URL similarly

## Free plan
- 100 GB bandwidth per month
- 300 build minutes per month
- Free SSL
- European CDN edges (not blocked in Russia)
