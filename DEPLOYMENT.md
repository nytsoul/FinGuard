# FinGuard Deployment Guide

## Overview
This application consists of two parts:
- **Frontend**: React + TypeScript + Tailwind (deployed on Vercel)
- **Backend**: FastAPI + Python (deployed on Render)

## Pre-Deployment Checklist

### 1. Git Setup
```bash
# Make sure all changes are committed
git add .
git commit -m "Add deployment configuration files"
git push origin main
```

### 2. Environment Variables Setup

#### Vercel (Frontend)
Go to Vercel dashboard → Project Settings → Environment Variables

Add these variables:
```
VITE_SUPABASE_URL=https://ccuaybxdgtyvbpegockf.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_API_BASE_URL=https://your-backend-render-url.onrender.com
```

#### Render (Backend)
Go to Render dashboard → Environment → Environment Variables

Add these variables:
```
SUPABASE_URL=https://ccuaybxdgtyvbpegockf.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
OPENAI_API_KEY=your_openai_key_here (if using LLM features)
```

## Deployment Steps

### Step 1: Deploy Backend on Render

1. Create new Web Service on Render.com
2. Connect GitHub repo
3. Configure:
   - **Environment**: Python
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 8000`
   - **Root Directory**: `backend`
4. Add environment variables (see above)
5. Deploy

**Wait for the backend URL** (should look like `https://your-app.onrender.com`)

### Step 2: Deploy Frontend on Vercel

1. Create new project on Vercel.com
2. Connect GitHub repo
3. Configure:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `frontend/dist`
   - **Root Directory**: `frontend`
4. Add environment variables (especially `VITE_API_BASE_URL` with your Render backend URL from Step 1)
5. Deploy

## Important Notes

### Backend Changes Made
- ✅ Fixed `database.py` to use `SUPABASE_ANON_KEY` instead of non-existent `SUPABASE_KEY`
- ✅ Added `render.yaml` for proper Render deployment
- ✅ Added `.env.example` for reference

### Frontend Changes Made
- ✅ Added `VITE_API_BASE_URL` environment variable support
- ✅ Added `vercel.json` for Vercel configuration
- ✅ Added `.env.example` for reference

### CORS Configuration
Backend CORS is set to allow all origins (`allow_origins=["*"]`). This is fine for development but should be restricted in production:

```python
# In backend/main.py, update to:
allow_origins=[
    "https://your-vercel-frontend-url.vercel.app",
    "http://localhost:3000",  # local development
],
```

## Post-Deployment Testing

1. **Backend Health Check**
   ```
   GET https://your-backend-render-url.onrender.com/api/health
   ```
   Should return health status

2. **Frontend Access**
   - Visit your Vercel URL
   - Sign up / Log in
   - Navigate to Forecast page to verify API connection

3. **Check Console for Errors**
   - Browser DevTools console (frontend errors)
   - Render logs (backend errors)

## Troubleshooting

### "Cannot connect to API" Error
- Verify `VITE_API_BASE_URL` in Vercel environment variables
- Check Render backend is running (check logs)
- Verify CORS is properly configured

### 500 Errors from Backend
- Check Render logs for Python errors
- Verify environment variables are set
- Ensure Supabase credentials are correct

### Build Fails on Vercel
- Check that root directory is set to `frontend`
- Verify Node dependencies are installed
- Check TypeScript compilation (`npm run build` locally first)

### Build Fails on Render
- Check Python version compatibility (render.yaml uses default Python)
- Verify all requirements in `requirements.txt` are compatible
- Check Render logs for pip install errors
