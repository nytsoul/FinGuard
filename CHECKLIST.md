# deployment Checklist - FinGuard

## ✅ Issues Fixed

### Backend (Render)
- [x] **Fixed database.py** - Changed `SUPABASE_KEY` to `SUPABASE_ANON_KEY` (was causing runtime errors)
- [x] **Created render.yaml** - Proper Render deployment configuration
- [x] **Created .env.example** - Reference file for environment variables
- [x] **CORS enabled** - Already configured for all origins (fine for dev, restrict in production)

### Frontend (Vercel)
- [x] **Added VITE_API_BASE_URL** - Environment variable for dynamic API URL
- [x] **Created vercel.json** - Proper Vercel deployment configuration
- [x] **Created .env.example** - Reference file for environment variables  
- [x] **API client ready** - Already supports dynamic API base URL

### Root Project
- [x] **Created DEPLOYMENT.md** - Complete deployment guide
- [x] **Created CHECKLIST.md** - This checklist
- [x] **Verified .gitignore** - .env files are properly ignored

## 📋 Before Pushing to Production

### 1. Test Locally
```bash
# Terminal 1: Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

### 2. Verify Environment Variables
- [ ] Frontend .env has `VITE_API_BASE_URL` (for local: `http://localhost:8000`)
- [ ] Backend .env has `SUPABASE_URL` and `SUPABASE_ANON_KEY`

### 3. Test All Pages
- [ ] Login/Register works
- [ ] Dashboard loads data
- [ ] Forecast page displays chart (fixed!)
- [ ] Transactions page works
- [ ] Invoices page works
- [ ] Decisions page works

## 🚀 Deployment Steps

### Step 1: Prepare Repository
```bash
git add .
git commit -m "Add deployment configuration (vercel.json, render.yaml, DEPLOYMENT.md)"
git push origin main
```

### Step 2: Deploy Backend on Render
1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Configure:
   - Service name: `finguard-backend`
   - Environment: `Python`
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn main:app --host 0.0.0.0 --port 8000`
   - Root directory: `backend`
5. Environment variables (copy from `.env.example`):
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY` (if needed)
6. Deploy and wait for the URL (e.g., `https://finguard-backend.onrender.com`)

### Step 3: Deploy Frontend on Vercel
1. Go to https://vercel.com
2. New Project
3. Import GitHub repo
4. Configure:
   - Framework: `Vite`
   - Build command: `npm run build`
   - Output directory: `frontend/dist`
   - Root directory: `frontend`
5. Environment variables:
   - `VITE_SUPABASE_URL`: `https://ccuaybxdgtyvbpegockf.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: (from your .env)
   - `VITE_API_BASE_URL`: (use Render backend URL from Step 2)
6. Deploy

### Step 4: Update Backend CORS (Optional but Recommended)
After getting Vercel URL, update `backend/main.py`:
```python
allow_origins=[
    "https://your-vercel-url.vercel.app",
    "http://localhost:3000",
],
```

### Step 5: Verify Deployment
- [ ] Backend health check: `GET /api/health` returns 200
- [ ] Frontend loads without errors
- [ ] Can log in and see data
- [ ] API calls work (check browser DevTools Network)

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| "Cannot reach API" | Verify `VITE_API_BASE_URL` in Vercel env vars matches Render URL |
| Backend 500 errors | Check Render logs, verify env vars are set correctly |
| Frontend won't build | Ensure root directory is `frontend` in Vercel, run `npm run build` locally first |
| Supabase auth fails | Verify `VITE_SUPABASE_*` keys in Vercel match your Supabase project |
| Render won't build | Check Python version, try running locally: `pip install -r requirements.txt` |

## 📚 Files Modified
- `backend/database.py` - Fixed Supabase key variable
- `frontend/.env` - Added VITE_API_BASE_URL
- `backend/.env.example` - NEW
- `frontend/.env.example` - NEW  
- `vercel.json` - NEW
- `render.yaml` - NEW
- `DEPLOYMENT.md` - NEW
- `CHECKLIST.md` - NEW (this file)

## ✨ Status
All deployment-blocking issues have been fixed. You're ready to deploy!
