# WorldBucket - Required APIs Setup Guide

## 📋 APIs You Have ✅

| API | Purpose | Status | Key/Credential |
|-----|---------|--------|-----------------|
| **MongoDB Atlas** | Database | ✅ Ready | `mongodb+srv://Amirali:...` |
| **Geoapify** | Maps & Geocoding | ✅ Ready | `2b4292d062c14b2db94dc4dafa7b1575` |

---

## 🔴 APIs You STILL NEED

### 1. **Google OAuth** (Required for Authentication)
**Purpose:** User login/signup with Google account

**Where you'll use it:**
- Sign in with Google button
- User authentication
- Email verification

**Get your credentials:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Google+ API"
4. Create OAuth 2.0 credentials (Web application)
5. Set Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback`
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback` (for production)
6. Copy **Client ID** and **Client Secret**

**You'll get:**
```
GOOGLE_ID=xxx.apps.googleusercontent.com
GOOGLE_SECRET=xxx_secret_code
```

---

### 2. **Cloudinary** (For Image/Video Uploads)
**Purpose:** Upload and store place images, collection covers, user avatars

**Where you'll use it:**
- Upload place photos
- Store collection cover images
- User profile pictures
- Gallery/media storage

**Get your credentials:**
1. Go to [Cloudinary](https://cloudinary.com/) and sign up
2. Go to Dashboard
3. Copy:
   - Cloud Name
   - API Key
   - API Secret (generate if needed)

**You'll get:**
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

---

### 3. **NextAuth Secret** (Generated - Not an External API)
**Purpose:** Secure session encryption

**How to generate:**
On Windows PowerShell:
```powershell
[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((1..32 | % { [char](Get-Random -Minimum 33 -Maximum 126) } -join '')))
```

Or use online: https://generate-secret.vercel.app/32

**You'll get:**
```
NEXTAUTH_SECRET=your_generated_secret_here
```

---

## 📝 How to Configure Environment Variables

1. **Copy template:**
```bash
cp .env.example .env.local
```

2. **Edit `.env.local` with all your credentials:**
```env
# Database (You have this ✅)
MONGODB_URI=mongodb+srv://Amirali:SepqZM9YulYjynk%40@calendar.nvtr9jh.mongodb.net/nishack?retryWrites=true&w=majority&appName=NISHackathon

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret

# Google OAuth (Get from step 1 ⬇️)
GOOGLE_ID=your_client_id.apps.googleusercontent.com
GOOGLE_SECRET=your_client_secret

# Geoapify (You have this ✅)
NEXT_PUBLIC_GEOAPIFY_API_KEY=2b4292d062c14b2db94dc4dafa7b1575

# Cloudinary (Get from step 2 ⬇️)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🚀 Quick Reference: What Each API Does

### Geoapify ✅
- Display interactive map
- Geocode locations
- Search for places by coordinates
- Show address from latitude/longitude

### Google OAuth ❌ NEEDED
- User registration
- User login
- Email-based authentication
- Social login

### Cloudinary ❌ NEEDED
- Upload images when creating places
- Store collection cover photos
- User profile pictures
- Media gallery

### NextAuth Secret ❌ NEEDED (Generate Locally)
- Encrypt user sessions
- Secure JWT tokens
- Protect authentication cookies

---

## 📊 API Setup Checklist

- [ ] Google OAuth credentials obtained
- [ ] Cloudinary account created and API keys copied
- [ ] NextAuth secret generated
- [ ] `.env.local` file created with all credentials
- [ ] Node modules installed (`npm install` ✅)
- [ ] Ready to run `npm run dev`

---

## 💡 Cost Breakdown

| Service | Tier | Cost | Notes |
|---------|------|------|-------|
| MongoDB Atlas | Free | $0 | 512MB storage |
| Geoapify | Free | $0 | 3000 req/day |
| Google OAuth | Free | $0 | Unlimited |
| Cloudinary | Free | $0 | 25GB storage, 25GB bandwidth |
| NextAuth | Free | $0 | No external cost |

**Total: FREE to get started!** 🎉

---

## ⚠️ IMPORTANT: Environment Variables

**DO NOT** commit `.env.local` to git!

Add to `.gitignore`:
```
.env.local
.env*.local
```

The `.gitignore` is already configured, so you're safe.

---

## 🔗 Useful Links

- [Google Cloud Console](https://console.cloud.google.com/)
- [Cloudinary Dashboard](https://cloudinary.com/console)
- [NextAuth Secret Generator](https://generate-secret.vercel.app/32)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Geoapify API Docs](https://apidocs.geoapify.com/)

---

## ✅ Next Steps

1. Get Google OAuth credentials
2. Create Cloudinary account  
3. Generate NextAuth secret
4. Update `.env.local`
5. Run `npm run dev`
6. Visit `http://localhost:3000`

Good luck! 🚀
