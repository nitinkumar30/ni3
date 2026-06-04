# ▲ Vercel Deployment Guide

> **Branch:** `vercel`  
> **Stack:** Next.js 16 + React 19 + TypeScript

---

## 🚀 One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nitinkumar30/ni3/tree/vercel)

Click the button above or follow the manual steps below.

---

## 📋 Manual Steps

### 1. Push the `vercel` branch

```bash
git checkout vercel
git push origin vercel
```

### 2. Import on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `nitinkumar30/ni3` repository
3. Set **Branch** to `vercel`
4. Click **Deploy**

### 3. Environment Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` | Used for OG images, sitemap, llms.txt |

Vercel auto-sets this via `VERCEL_URL` — no action needed.

---

## ⚙️ What's Included

The `vercel` branch includes everything from `main` plus:

```
📦 ni3
├── vercel.json          # Vercel deployment config (headers, rewrites)
└── ...
```

### `vercel.json` configuration:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/.well-known/security.txt", "destination": "/api/security" }
  ],
  "functions": {
    "api/**/*.{ts,tsx}": { "memory": 256 }
  }
}
```

---

## 🔄 Automatic Deploys

Every push to the `vercel` branch triggers a new deployment on Vercel.

---

## 🧪 Preview Deployments

Create a PR against the `vercel` branch to get a unique preview URL for testing.

---

## ❌ Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails with `Module not found` | Ensure `npm install` ran — Vercel does this automatically |
| 404 on page | Check file is in `src/app/` with correct `page.tsx` name |
| WebGL not rendering | Some serverless browsers lack WebGL — it gracefully degrades |
| Slow cold start | Serverless functions may take a few seconds on first load |
