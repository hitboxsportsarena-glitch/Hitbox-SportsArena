# Vercel Deployment Guide - Hit Box Cricket

Complete guide to deploy your Box Cricket Team Registration system to Vercel.

---

## 📋 Pre-Deployment Checklist

### 1. Verify All Features Work Locally
- [ ] Homepage loads correctly
- [ ] Team registration form works
- [ ] UPI payment and screenshot upload works
- [ ] Admin login with PIN works (8499963878)
- [ ] Admin can view registrations
- [ ] Admin can see payment screenshots
- [ ] Admin can confirm registrations
- [ ] EmailJS sends confirmation emails

### 2. Environment Variables Ready
- [ ] Supabase URL
- [ ] Supabase Anon Key
- [ ] UPI ID
- [ ] EmailJS Service ID
- [ ] EmailJS Template ID
- [ ] EmailJS Public Key

---

## 🚀 Deployment Steps

### Step 1: Prepare Your Repository

#### Option A: Using Git (Recommended)

1. **Initialize Git** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: Box Cricket Registration System"
```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., "hitbox-cricket")
   - Don't initialize with README (you already have code)

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/hitbox-cricket.git
git branch -M main
git push -u origin main
```

#### Option B: Upload ZIP to GitHub
1. Create a `.gitignore` file with:
```
node_modules
.env.local
dist
.DS_Store
```
2. Zip your project folder (exclude node_modules)
3. Upload to GitHub via web interface

---

### Step 2: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com/
2. **Sign Up/Login** with GitHub
3. **Click "Add New Project"**
4. **Import your GitHub repository**
5. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. **Add Environment Variables**:

Click "Environment Variables" and add these:

```
VITE_SUPABASE_URL = https://bbehffcrbrcnzeypfxjf.supabase.co
VITE_SUPABASE_ANON_KEY = your_supabase_anon_key_here
VITE_UPI_ID = ch.sudharaghavi@okicici
VITE_PAYMENT_NAME = Hit Box Cricket
VITE_EMAILJS_SERVICE_ID = your_service_id
VITE_EMAILJS_TEMPLATE_ID = your_template_id
VITE_EMAILJS_PUBLIC_KEY = your_public_key
```

**Important**: Copy the exact values from your `.env.local` file!

7. **Click "Deploy"**

Vercel will:
- Install dependencies
- Build your project
- Deploy to a URL like: `hitbox-cricket.vercel.app`

---

## ✅ Post-Deployment Verification

### Test These Features:

1. **Homepage**: `https://your-app.vercel.app/`
   - Should show beautiful purple gradient design
   - "Register Your Team" button visible

2. **Team Registration**: `https://your-app.vercel.app/register`
   - All steps work
   - UPI QR code displays
   - Screenshot upload works
   - Submission succeeds

3. **Admin Panel**: `https://your-app.vercel.app/admin`
   - PIN screen shows (8499963878)
   - After login, dashboard loads
   - Registrations display
   - Screenshots visible
   - Email confirmation works

4. **Tournament Management**: `https://your-app.vercel.app/tournaments`
   - Accessible via direct URL
   - Can create tournaments
   - Changes save to database

---

## 🔧 Troubleshooting

### Issue 1: 404 on Direct URL Access
**Problem**: Visiting `/admin` or `/register` directly shows 404

**Solution**: Already fixed! The `vercel.json` file handles this.

If it still happens:
1. Check `vercel.json` exists in root folder
2. Redeploy the project
3. Clear browser cache

---

### Issue 2: Environment Variables Not Working
**Problem**: Supabase connection fails, or EmailJS doesn't work

**Solution**:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify all variables are added correctly
3. Variable names must start with `VITE_`
4. Redeploy after adding/changing variables

---

### Issue 3: Build Fails
**Problem**: Deployment fails during build

**Common causes**:
- Missing dependencies
- TypeScript errors
- Import path issues

**Solution**:
1. Check build logs in Vercel
2. Test build locally: `npm run build`
3. Fix any errors shown
4. Commit and push changes

---

### Issue 4: Images/Assets Not Loading
**Problem**: Logo or images show broken

**Solution**:
- Images in `/public` folder: Use absolute paths `/image.png`
- Images in `/src/assets`: Import them in components
- Check browser console for 404 errors

---

### Issue 5: Supabase Storage (Payment Screenshots) Not Working
**Problem**: Screenshot upload fails or can't view screenshots

**Solution**:
1. **Check Supabase Storage Settings**:
   - Go to Supabase Dashboard → Storage → Policies
   - Make sure public read access is enabled for `payments` bucket
   - Or set proper RLS policies

2. **Update Storage Policies**:
```sql
-- Allow public uploads to payments bucket
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT TO public
WITH CHECK (bucket_id = 'payments');

-- Allow public reads from payments bucket
CREATE POLICY "Allow public reads" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'payments');
```

---

## 🎨 Custom Domain (Optional)

### Add Your Own Domain:

1. **Go to Project Settings** → Domains
2. **Add Domain**: e.g., `hitboxcricket.com`
3. **Follow DNS Instructions**:
   - Add A record pointing to Vercel's IP
   - Or add CNAME record
4. **Wait for DNS propagation** (5-60 minutes)
5. **SSL Certificate** auto-generated by Vercel

---

## 🔐 Security Considerations

### Before Going Live:

1. **Enable Supabase RLS Policies**:
```sql
-- Enable RLS on all tables
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create appropriate policies for your use case
```

2. **Review Admin PIN**:
   - Current PIN: 8499963878
   - Consider changing for production
   - Update in `src/components/AdminLogin.jsx`

3. **Supabase Security**:
   - Enable RLS policies (currently disabled for testing)
   - Review anon key permissions
   - Set up proper authentication for production

4. **EmailJS Rate Limits**:
   - Free tier: 200 emails/month
   - Monitor usage in EmailJS dashboard
   - Upgrade if needed for tournaments

---

## 📊 Monitoring & Analytics

### Vercel Analytics (Optional):
1. Enable in Project Settings → Analytics
2. Track page views, visitors, performance
3. Free tier available

### Supabase Monitoring:
1. Go to Supabase Dashboard → Database → Usage
2. Monitor:
   - API requests
   - Database size
   - Storage usage
   - Bandwidth

---

## 🔄 Updating Your Deployed App

### Deploy New Changes:

**Method 1: Auto-Deploy (If using Git)**
1. Make changes locally
2. Commit: `git add . && git commit -m "Update message"`
3. Push: `git push origin main`
4. Vercel auto-deploys in ~2 minutes

**Method 2: Manual Deploy**
1. Go to Vercel Dashboard
2. Click "Redeploy" button
3. Select branch to deploy

### Rollback if Needed:
1. Go to Deployments tab
2. Find previous working deployment
3. Click "..." → Promote to Production

---

## 📱 Mobile Testing

After deployment, test on mobile devices:
- iOS Safari
- Android Chrome
- Tablet views
- Landscape orientation

Check:
- PIN input works on mobile keyboard
- UPI QR code scans properly
- Image upload from camera works
- Forms are touch-friendly

---

## 🎯 Production Launch Checklist

Before announcing to users:

- [ ] All routes work (no 404s)
- [ ] Test complete registration flow
- [ ] Admin panel accessible and functional
- [ ] Email notifications sending
- [ ] Payment screenshot upload/view working
- [ ] Mobile responsive testing complete
- [ ] Supabase database has proper data
- [ ] Storage bucket configured
- [ ] Custom domain configured (if using)
- [ ] SSL certificate active (green padlock)
- [ ] Test with multiple browsers
- [ ] Create at least one test tournament
- [ ] Test admin PIN access
- [ ] Backup Supabase data
- [ ] Monitor first few real registrations

---

## 🆘 Support Resources

### Vercel:
- Documentation: https://vercel.com/docs
- Support: https://vercel.com/support

### Supabase:
- Documentation: https://supabase.com/docs
- Support: https://supabase.com/support

### EmailJS:
- Documentation: https://www.emailjs.com/docs/
- Support: support@emailjs.com

---

## 📝 Important Files

### Don't Forget These:
- ✅ `vercel.json` - Routing configuration (created)
- ✅ `.env.local` - Local environment variables (don't commit!)
- ✅ `.gitignore` - Ignore node_modules and .env.local
- ✅ `package.json` - Dependencies and scripts
- ✅ Build output in `/dist` (auto-generated)

---

## 🎉 Deployment Complete!

Your app will be live at: `https://your-project-name.vercel.app`

**Share this URL with users to start receiving registrations!**

---

## 🔗 Quick Links After Deployment

- **Live Site**: https://your-app.vercel.app
- **Admin Panel**: https://your-app.vercel.app/admin
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://app.supabase.com
- **EmailJS Dashboard**: https://dashboard.emailjs.com

---

*Last Updated: Current Session*  
*Status: Ready for deployment*
