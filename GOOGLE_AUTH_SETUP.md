# Google Authentication Setup Guide

## What Was Fixed

Google authentication has been properly configured in the frontend with the following improvements:

### 1. **Proper OAuth Redirect URLs** ✅
- Updated AuthContext to redirect to `/dashboard` after successful Google login
- Added `access_type=offline` and `prompt=consent` for better OAuth flow
- Proper error handling for network issues

### 2. **Supabase Client Configuration** ✅
- Enabled PKCE flow for enhanced security
- Set `detectSessionInUrl: true` to properly handle OAuth callbacks
- Enabled `autoRefreshToken` for persistent sessions

### 3. **Login Component** ✅
- Improved error handling in handleGoogleLogin
- Better async/await pattern
- Shows appropriate error messages if Google auth fails

## What You Need to Configure in Supabase

### Step 1: Set Up Google OAuth in Supabase Dashboard

1. Go to **Supabase Dashboard** → Your Project
2. Navigate to **Authentication** → **Providers**
3. Click **Google**
4. Toggle to **Enabled**

### Step 2: Add Google OAuth Credentials

You need a Google OAuth 2.0 Client ID and Secret:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Choose **Web application**
6. Add authorized redirect URIs:
   - **For Development:** `http://localhost:5173/dashboard`
   - **For Development:** `http://localhost:5173`
   - **For Production:** `https://yourdomain.com/dashboard`
   - **For Production:** `https://yourdomain.com`

7. Copy the **Client ID** and **Client Secret**

### Step 3: Add Credentials to Supabase

1. In Supabase Dashboard → **Authentication** → **Google Provider**
2. Paste:
   - **Client ID** (from Google Cloud)
   - **Client Secret** (from Google Cloud)
3. Click **Save**

### Step 4: Configure Authorized Redirect URLs in Supabase

In Supabase Dashboard → **Authentication** → **URL Configuration**:

1. Set **Site URL** to your application URL:
   - Development: `http://localhost:5173`
   - Production: `https://yourdomain.com`

2. Add **Redirect URLs**:
   - `http://localhost:5173/dashboard`
   - `http://localhost:5173/`
   - `https://yourdomain.com/dashboard`
   - `https://yourdomain.com/`

3. Click **Save**

## Testing Google Auth Locally

1. Make sure you have the correct `.env` variables:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

2. Run the dev server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Navigate to `http://localhost:5173/login`

4. Click **"Continue with Google"**

5. You'll be redirected to Google's login page

6. After successful login, you'll be redirected back to `/dashboard`

## Troubleshooting

### Issue: "Redirect URI mismatch"
- **Solution:** Make sure the redirect URLs in Google Cloud Console match exactly those in Supabase URL Configuration
- Include both with and without `/dashboard`

### Issue: "OAuth callback fails"
- **Solution:** Check that `detectSessionInUrl: true` is set in Supabase client initialization
- Clear browser cache and local storage
- Check browser console for detailed error messages

### Issue: "User lands on dashboard but not authenticated"
- **Solution:** The auth state listener in AuthContext should catch the OAuth session
- Check that `onAuthStateChange` is properly set up
- Verify session is being loaded with `getSession()`

### Issue: "Google button shows but does nothing"
- **Solution:** 
  - Check network tab in browser DevTools for errors
  - Verify Client ID and Secret are correct in Supabase
  - Check that your app domain is added to Google OAuth consent screen

## Security Notes

- ✅ Using PKCE flow (more secure than implicit)
- ✅ Using `offline` access type for refresh tokens
- ✅ Using `consent` prompt to ensure user grants permissions
- ✅ Proper error handling and validation
- ✅ Sessions are persisted with autoRefreshToken

## Additional Resources

- [Supabase Google OAuth Docs](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google OAuth 2.0 Setup](https://developers.google.com/identity/gsi/web/guides/setup)
- [PKCE Flow Guide](https://datatracker.ietf.org/doc/html/rfc7636)
