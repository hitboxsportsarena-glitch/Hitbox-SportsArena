# 🚀 Vercel Deployment - Quick Checklist

Use this checklist to deploy your app to Vercel in 10 minutes!

---

## ✅ Pre-Deployment (2 minutes)

- [ ] Test app locally: `npm run dev`
- [ ] Verify all features work
- [ ] Copy environment variables from `.env.local`
- [ ] `vercel.json` file exists ✅ (already created)

---

## 📦 Files Ready for Deployment

✅ **These files are ready:**
- `vercel.json` - Handles routing (no 404 errors)
- `.gitignore` - Protects sensitive files
- `package.json` - Dependencies configured
- Environment variables documented

❌ **Don't commit:**
- `.env.local` (contains secrets)
- `node_modules` folder
- `/dist` folder (build output)

---

## 🌐 Deployment Steps (5 minutes)

### 1. Push to GitHub
```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Vercel deployment"

# Create GitHub repo, then:
git remote add origin https://github.com/YOUR_USERNAME/hitbox-cricket.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to: https://vercel.com/new
2. Import your GitHub repository
3. Framework: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`

### 3. Add Environment Variables

Copy these from your `.env.local`:

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_UPI_ID
VITE_PAYMENT_NAME
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
```

Paste them in Vercel's Environment Variables section.

### 4. Click "Deploy"
Wait ~2 minutes for build to complete.

---

## 🧪 Post-Deployment Testing (3 minutes)

Visit your deployed URL: `https://your-app.vercel.app`

- [ ] Homepage loads
- [ ] Navigate to `/register`
- [ ] Navigate to `/admin` - enter PIN: `8499963878`
- [ ] Test admin dashboard
- [ ] Verify no 404 errors on direct URL access

---

## 🎯 You're Live!

**Your app is now accessible at:**
`https://your-project-name.vercel.app`

**Admin access:**
`https://your-project-name.vercel.app/admin`
PIN: `8499963878`

---

## 📋 Quick Reference

| Item | Value |
|------|-------|
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |
| **Framework** | Vite |
| **Node Version** | 18.x (default) |

---

## 🔄 Future Updates

To update your live site:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Vercel auto-deploys in ~2 minutes.

---

## 🆘 Quick Fixes

**404 on /admin or /register?**
- `vercel.json` should exist ✅
- Redeploy if needed

**Environment variables not working?**
- Add them in Vercel Dashboard → Settings → Environment Variables
- Redeploy after adding

**Build fails?**
- Check build logs in Vercel
- Test locally: `npm run build`
- Fix errors and push again

---

**Need detailed instructions?** See `VERCEL_DEPLOYMENT.md`

---

*Estimated Total Time: 10 minutes*  
*Difficulty: Easy*  
✅ **Ready to Deploy!**
