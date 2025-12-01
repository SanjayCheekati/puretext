# Puretext Deployment Guide

## Complete Step-by-Step Guide to Deploy on Vercel

This guide covers deploying both frontend and backend on Vercel and connecting your custom domain `puretext.me`.

---

## Prerequisites

- GitHub account with your puretext repository
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas account (already configured)
- Domain: puretext.me (already purchased)

---

## Part 1: Deploy Backend to Vercel

### Step 1: Prepare Backend for Vercel

1. **Create `vercel.json` in the backend folder**

Create file: `backend/vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

2. **Update `backend/package.json` - Add engines**

Add this section to your `backend/package.json`:

```json
"engines": {
  "node": "18.x"
}
```

3. **Commit these changes**

```bash
cd "c:\Users\sanja\Disk D\personal projects\privatetext"
git add .
git commit -m "Add Vercel configuration for backend"
git push origin master
```

### Step 2: Deploy Backend on Vercel

1. **Login to Vercel**
   - Go to https://vercel.com
   - Click "Login" and sign in with GitHub

2. **Import Backend Project**
   - Click "Add New..." → "Project"
   - Select your `puretext` repository
   - Click "Import"

3. **Configure Backend Deployment**
   - **Framework Preset**: Select "Other"
   - **Root Directory**: Click "Edit" → Select `backend` folder
   - **Build Command**: Leave empty or use `npm install`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   
   Click "Environment Variables" and add:
   
   | Name | Value |
   |------|-------|
   | `MONGODB_URI` | Your MongoDB Atlas connection string (from MongoDB Atlas dashboard) |
   | `PORT` | `5000` |
   | `NODE_ENV` | `production` |

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (2-3 minutes)
   - Note your backend URL: `https://puretext-backend-xxx.vercel.app`

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Prepare Frontend for Vercel

1. **Update API URL in frontend**

Edit `frontend/src/api/notes.ts`:

```typescript
const API_URL = import.meta.env.PROD 
  ? 'https://your-backend-url.vercel.app/api'  // Replace with your actual backend URL
  : 'http://localhost:5000/api';
```
 
2. **Create `vercel.json` in the frontend folder**

Create file: `frontend/vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1"
    },
    {
      "src": "/favicon.(.*)",
      "dest": "/favicon.$1"
    },
    {
      "src": "/manifest.json",
      "dest": "/manifest.json"
    },
    {
      "src": "/robots.txt",
      "dest": "/robots.txt"
    },
    {
      "src": "/sitemap.xml",
      "dest": "/sitemap.xml"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

3. **Update `frontend/package.json` - Ensure build script exists**

Verify this exists in `frontend/package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview"
}
```

4. **Commit these changes**

```bash
git add .
git commit -m "Add Vercel configuration for frontend"
git push origin master
```

### Step 2: Deploy Frontend on Vercel

1. **Import Frontend Project**
   - In Vercel dashboard, click "Add New..." → "Project"
   - Select your `puretext` repository again
   - Click "Import"

2. **Configure Frontend Deployment**
   - **Framework Preset**: Select "Vite"
   - **Root Directory**: Click "Edit" → Select `frontend` folder
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Add Environment Variables** (if needed)
   
   Click "Environment Variables" - leave empty for now

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (2-3 minutes)
   - Your frontend will be live at: `https://puretext-xxx.vercel.app`

---

## Part 3: Connect Custom Domain (puretext.me)

### Step 1: Add Domain to Frontend Project

1. **Go to your Frontend project in Vercel**
   - Click on the frontend project
   - Go to "Settings" → "Domains"

2. **Add Custom Domain**
   - Click "Add Domain"
   - Enter: `puretext.me`
   - Click "Add"

3. **Add www subdomain** (optional but recommended)
   - Click "Add Domain" again
   - Enter: `www.puretext.me`
   - Click "Add"

### Step 2: Configure DNS Settings

You need to update DNS settings where you purchased your domain (e.g., GoDaddy, Namecheap, Google Domains).

1. **Login to your domain registrar**

2. **Update DNS Records**

   **For Root Domain (puretext.me):**
   
   | Type | Name | Value |
   |------|------|-------|
   | A | @ | `76.76.21.21` |
   | CNAME | www | `cname.vercel-dns.com` |

   **OR use CNAME for root (if your registrar supports ANAME/ALIAS):**
   
   | Type | Name | Value |
   |------|------|-------|
   | CNAME | @ | `cname.vercel-dns.com` |
   | CNAME | www | `cname.vercel-dns.com` |

3. **Wait for DNS Propagation**
   - DNS changes can take 5 minutes to 48 hours
   - Usually works within 1-2 hours
   - Check status in Vercel dashboard

### Step 3: Configure SSL Certificate

1. **Vercel automatically generates SSL certificate**
   - This happens after DNS is configured
   - Usually takes 5-10 minutes
   - Your site will have HTTPS automatically

2. **Verify SSL**
   - Visit https://puretext.me
   - Check for the lock icon in browser

---

## Part 4: Update CORS and API URLs

### Step 1: Update Backend CORS

Edit `backend/server.js` to allow your frontend domain:

```javascript
import cors from 'cors';

const allowedOrigins = [
  'http://localhost:3000',
  'https://puretext.me',
  'https://www.puretext.me',
  'https://puretext-xxx.vercel.app'  // Your Vercel frontend URL
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

Commit and push:

```bash
git add .
git commit -m "Update CORS for production domains"
git push origin master
```

Vercel will auto-deploy the backend.

### Step 2: Update Frontend API URL

Edit `frontend/src/api/notes.ts` with your actual backend URL:

```typescript
const API_URL = import.meta.env.PROD 
  ? 'https://puretext-backend-xxx.vercel.app/api'  // Your actual backend URL
  : 'http://localhost:5000/api';
```

Commit and push:

```bash
git add .
git commit -m "Update API URL for production"
git push origin master
```

Vercel will auto-deploy the frontend.

---

## Part 5: Update SEO Meta Tags

Update `frontend/index.html` to use your actual domain:

```html
<link rel="canonical" href="https://puretext.me" />
<meta property="og:url" content="https://puretext.me" />
<meta property="twitter:url" content="https://puretext.me" />
```

And update Schema.org data:

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Puretext",
  "url": "https://puretext.me",
  ...
}
```

Update sitemap:

```xml
<url>
  <loc>https://puretext.me</loc>
  ...
</url>
```

Commit and push:

```bash
git add .
git commit -m "Update SEO meta tags with production domain"
git push origin master
```

---

## Part 6: Configure Custom Subdomain for Backend (Optional)

If you want `api.puretext.me` instead of `puretext-backend-xxx.vercel.app`:

1. **In Vercel Backend Project**
   - Go to "Settings" → "Domains"
   - Add domain: `api.puretext.me`

2. **Update DNS**
   
   | Type | Name | Value |
   |------|------|-------|
   | CNAME | api | `cname.vercel-dns.com` |

3. **Update Frontend API URL**
   
   ```typescript
   const API_URL = import.meta.env.PROD 
     ? 'https://api.puretext.me/api'
     : 'http://localhost:5000/api';
   ```

---

## Quick Deployment Checklist

### Backend Deployment ✓
- [ ] Create `backend/vercel.json`
- [ ] Add engine version to `backend/package.json`
- [ ] Deploy to Vercel
- [ ] Add environment variables (MONGODB_URI, PORT, NODE_ENV)
- [ ] Note backend URL
- [ ] Optional: Add custom domain `api.puretext.me`

### Frontend Deployment ✓
- [ ] Update API URL in `frontend/src/api/notes.ts`
- [ ] Create `frontend/vercel.json`
- [ ] Deploy to Vercel
- [ ] Add custom domain `puretext.me`
- [ ] Add www subdomain `www.puretext.me`

### DNS Configuration ✓
- [ ] Add A record for @ → `76.76.21.21`
- [ ] Add CNAME for www → `cname.vercel-dns.com`
- [ ] Optional: Add CNAME for api → `cname.vercel-dns.com`
- [ ] Wait for DNS propagation

### Final Updates ✓
- [ ] Update CORS in backend
- [ ] Update meta tags with puretext.me
- [ ] Update sitemap.xml
- [ ] Test https://puretext.me
- [ ] Test https://www.puretext.me
- [ ] Verify SSL certificate

---

## Troubleshooting

### Issue: "Application Error" on Backend

**Solution:**
- Check Vercel logs: Project → Deployments → Click deployment → Logs
- Verify environment variables are set correctly
- Check MongoDB connection string

### Issue: Frontend can't connect to Backend

**Solution:**
- Verify CORS settings in backend
- Check API_URL in frontend matches backend URL
- Open browser console (F12) to see exact error

### Issue: Domain not working

**Solution:**
- Check DNS propagation: https://dnschecker.org
- Verify DNS records are correct
- Wait 1-2 hours for DNS to propagate
- Check Vercel domain status

### Issue: SSL Certificate not generating

**Solution:**
- Ensure DNS is correctly configured
- Wait 10-15 minutes after DNS propagation
- Check Vercel domain settings for errors

---

## Post-Deployment Testing

1. **Test Homepage**
   - Visit https://puretext.me
   - Check if it loads correctly

2. **Test Creating Note**
   - Enter a note name
   - Create content
   - Save (with and without password)

3. **Test Note Retrieval**
   - Access the note URL
   - Verify encryption works
   - Test password unlock

4. **Test All Features**
   - Multiple tabs
   - Auto-save (without password)
   - Manual save (with password)
   - Share URL
   - Scroll to top button

5. **Check SEO**
   - View page source (Ctrl+U)
   - Verify meta tags are correct
   - Check robots.txt: https://puretext.me/robots.txt
   - Check sitemap: https://puretext.me/sitemap.xml

---

## Maintenance

### Auto-Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin master

# Vercel will auto-deploy both frontend and backend
```

### Monitor Deployments

- Check Vercel dashboard for deployment status
- View logs for any errors
- Get email notifications for failed deployments

### Update Environment Variables

- Go to Vercel project → Settings → Environment Variables
- Add/Edit variables
- Redeploy for changes to take effect

---

## Success! 🎉

Your Puretext app should now be live at:
- **Main Site**: https://puretext.me
- **WWW**: https://www.puretext.me
- **Backend**: https://puretext-backend-xxx.vercel.app (or https://api.puretext.me)

Share your secure note-taking app with the world!
