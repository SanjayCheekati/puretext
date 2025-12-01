# Complete Vercel Deployment Guide for Puretext

## ✅ Current Project Status

Your code is ready! Here's what's configured:

**Frontend:**
- ✅ `vercel.json` configured for React Router
- ✅ API URL pointing to `https://puretext-backend.vercel.app/api`
- ✅ Build script ready

**Backend:**
- ✅ `vercel.json` configured for Express
- ✅ CORS allowing `https://puretext-frontend.vercel.app`
- ✅ MongoDB connection ready

---

## 🚀 Step-by-Step Deployment

### Part 1: Deploy Backend First

#### Step 1: Login to Vercel
1. Go to https://vercel.com
2. Click **"Login"** and sign in with GitHub

#### Step 2: Import Backend Project
1. Click **"Add New..."** → **"Project"**
2. Find and select your **`puretext`** repository
3. Click **"Import"**

#### Step 3: Configure Backend Settings
**IMPORTANT:** Configure these settings exactly:

```
Framework Preset: Other
Root Directory: backend (Click "Edit" and select the backend folder)
Build Command: (leave empty)
Output Directory: (leave empty)
Install Command: npm install
```

#### Step 4: Add Environment Variables
Click **"Environment Variables"** and add these:

| Variable Name | Value |
|--------------|-------|
| `MONGODB_URI` | `mongodb+srv://sanjay:DJz3dHQVXBKtrK2F@privatetext.q4ccfax.mongodb.net/?appName=privatetext` |
| `PORT` | `5000` |
| `NODE_ENV` | `production` |

#### Step 5: Deploy Backend
1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment
3. **IMPORTANT:** Note your backend URL - it should be: `https://puretext-backend.vercel.app`

---

### Part 2: Deploy Frontend

#### Step 1: Import Frontend Project
1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. Select your **`puretext`** repository again
3. Click **"Import"**

#### Step 2: Configure Frontend Settings
**IMPORTANT:** Configure these settings exactly:

```
Framework Preset: Vite
Root Directory: frontend (Click "Edit" and select the frontend folder)
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

#### Step 3: Deploy Frontend
1. Click **"Deploy"** (no environment variables needed)
2. Wait 2-3 minutes for deployment
3. **IMPORTANT:** Note your frontend URL - it should be: `https://puretext-frontend.vercel.app`

---

## ⚙️ Post-Deployment Configuration

### Critical: Update Project Names in Vercel

By default, Vercel might name both projects "puretext". You need to rename them:

#### Rename Backend Project:
1. Go to your backend project in Vercel
2. Click **"Settings"** → **"General"**
3. Find **"Project Name"**
4. Change it to: `puretext-backend`
5. Click **"Save"**
6. ⚠️ This will change the URL to `https://puretext-backend.vercel.app`

#### Rename Frontend Project:
1. Go to your frontend project in Vercel
2. Click **"Settings"** → **"General"**
3. Find **"Project Name"**
4. Change it to: `puretext-frontend`
5. Click **"Save"**
6. ⚠️ This will change the URL to `https://puretext-frontend.vercel.app`

---

## 🧪 Testing Your Deployment

After both deployments complete:

1. **Test Backend API:**
   - Open: `https://puretext-backend.vercel.app/health`
   - Should see: `{"status":"ok","service":"Privatetext API"}`

2. **Test Frontend:**
   - Open: `https://puretext-frontend.vercel.app`
   - Enter a note name (e.g., "test")
   - Click "Open Note"
   - Type some content
   - Click "Save"
   - Reload the page - content should persist

---

## 🔧 Troubleshooting

### Issue: Backend Returns 404
**Solution:** 
- Check that `backend/vercel.json` exists in your repo
- Redeploy the backend project in Vercel

### Issue: Frontend Returns 404 on Note Pages
**Solution:**
- Check that `frontend/vercel.json` exists in your repo
- Redeploy the frontend project in Vercel

### Issue: CORS Error
**Solution:**
- Make sure backend CORS includes: `https://puretext-frontend.vercel.app`
- Redeploy backend after any CORS changes

### Issue: Can't Save Notes / Database Error
**Solution:**
- Check MongoDB URI is correct in Vercel backend environment variables
- Make sure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Verify MongoDB password is correct

### Issue: Different URLs Than Expected
**Solution:**
If your actual URLs are different from the guide, update the code:

1. **Update Frontend API URL:**
   Edit `frontend/src/api/notes.ts`:
   ```typescript
   const API_URL = import.meta.env.PROD 
     ? 'https://YOUR-ACTUAL-BACKEND-URL.vercel.app/api'
     : 'http://localhost:5000/api';
   ```

2. **Update Backend CORS:**
   Edit `backend/server.js`:
   ```javascript
   const allowedOrigins = [
     'http://localhost:3000',
     'https://YOUR-ACTUAL-FRONTEND-URL.vercel.app',
     /https:\/\/puretext-.*\.vercel\.app$/
   ];
   ```

3. **Push to GitHub:**
   ```bash
   cd "c:\Users\sanja\Disk D\personal projects\privatetext"
   git add .
   git commit -m "Update URLs for actual deployment"
   git push origin master
   ```

4. **Vercel will auto-redeploy** in 2-3 minutes

---

## 📋 Quick Checklist

### Backend Deployment ✓
- [ ] Project imported from GitHub
- [ ] Root directory set to `backend`
- [ ] Environment variables added (MONGODB_URI, PORT, NODE_ENV)
- [ ] Project renamed to `puretext-backend`
- [ ] Deployment successful
- [ ] Test `/health` endpoint works

### Frontend Deployment ✓
- [ ] Project imported from GitHub
- [ ] Root directory set to `frontend`
- [ ] Framework set to Vite
- [ ] Project renamed to `puretext-frontend`
- [ ] Deployment successful
- [ ] Can create and save notes

### Configuration Verification ✓
- [ ] Backend URL in code matches actual backend URL
- [ ] Frontend URL in CORS matches actual frontend URL
- [ ] MongoDB credentials correct in Vercel
- [ ] Both `vercel.json` files exist in repo

---

## 🎉 Success!

Your app should now be live at:
- **Frontend:** https://puretext-frontend.vercel.app
- **Backend:** https://puretext-backend.vercel.app

**Note:** Every push to your GitHub `master` branch will automatically trigger a new deployment on Vercel!

---

## 📞 Need Help?

If you see errors:
1. Check Vercel deployment logs: Project → Deployments → Click deployment → View Logs
2. Check browser console: F12 → Console tab
3. Test backend health endpoint
4. Verify MongoDB Atlas network access allows all IPs (0.0.0.0/0)
