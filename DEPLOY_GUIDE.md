# 🚀 Complete Deployment Guide for EOH Hyderabad Website

## Overview

Your website is now ready for production deployment. This guide covers step-by-step instructions for deploying to **Vercel** and **Cloudflare Pages** (the two recommended platforms).

---

## ⚡ Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is owned by the creators of Next.js and Vite, making it the most optimized platform for this stack.

### Step 1: Prepare Your Repository

1. Push your cleaned project to GitHub, GitLab, or Bitbucket:
```bash
git init
git add .
git commit -m "Initial commit: Clean, production-ready build"
git remote add origin https://github.com/yourusername/EOH-hyd-website.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign up (free)
2. Click **"Add New"** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your repository and click **"Import"**

### Step 3: Configure Build Settings

The default settings should work, but verify:
- **Framework Preset:** Other
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
- **Root Directory:** `./`

### Step 4: Environment Variables

1. Click **"Environment Variables"**
2. Add these variables:

| Variable | Value |
|----------|-------|
| `VITE_SUPABASE_URL` | Your Supabase URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase Anon Key |
| `VITE_API_URL` | Your API endpoint (if any) |

3. Click **"Deploy"** ✅

### Step 5: Domain Configuration (Optional)

1. After deployment, go to **Project Settings** → **Domains**
2. Add your custom domain (e.g., `eohhyderabad.com`)
3. Follow DNS configuration instructions
4. SSL certificate is automatic

### ✅ You're Done!

- Your site is now live
- Automatic deploys on every push to `main`
- Free SSL/HTTPS
- Global CDN
- Automatic image optimization

---

## 🌍 Option 2: Deploy to Cloudflare Pages

Cloudflare Pages offers excellent performance with their global network and is great for static sites.

### Step 1: Connect Repository

1. Go to **[dash.cloudflare.com](https://dash.cloudflare.com)**
2. Select your account
3. Go to **Pages** (left sidebar)
4. Click **"Create a project"** → **"Connect to Git"**
5. Authorize Cloudflare to access your GitHub/GitLab account
6. Select your repository

### Step 2: Configure Build

1. **Production branch:** `main`
2. **Build command:** `npm run build`
3. **Build output directory:** `dist`
4. **Root directory:** `/`

### Step 3: Add Environment Variables

1. Click **"Environment variables"**
2. Click **"Edit variables"**
3. Add production environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_API_URL`
4. Click **"Save and Deploy"**

### Step 4: Configure Domain

1. After deployment, note your `*.pages.dev` URL
2. **To use your own domain:**
   - Go to **Pages** → **Your Project** → **Settings** → **Domains**
   - Click **"Add a domain"**
   - Enter your domain
   - Update DNS records at your registrar (Cloudflare will provide instructions)

### ✅ You're Done!

- Lightning-fast global CDN
- Automatic builds on push
- Free SSL/HTTPS
- Great DDoS protection

---

## 📝 Option 3: Deploy to Netlify

An alternative platform with excellent features.

### Step 1: Connect Repository

1. Go to **[netlify.com](https://netlify.com)**
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your Git provider
4. Select your repository

### Step 2: Configure

- **Branch to deploy:** `main`
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Step 3: Deploy

1. Click **"Deploy site"**
2. Add environment variables in **Site settings** → **Build & deploy**

---

## 🎯 Post-Deployment Checklist

- [ ] **Test the website** - Click the deploy link and verify all pages work
- [ ] **Check mobile responsiveness** - Test on mobile devices
- [ ] **Test forms/interactions** - Verify functionality works
- [ ] **Check console errors** - Open DevTools (F12) and check for errors
- [ ] **Test database connections** - Ensure Supabase is connected
- [ ] **Verify environment variables** - Confirm they're loaded
- [ ] **Test authentication** - If applicable, test login/signup
- [ ] **Check performance** - Use [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] **Setup analytics** - Add Google Analytics or Vercel Analytics
- [ ] **Configure domain** - Point your domain to the deployment

---

## 🔄 Continuous Deployment Workflow

Once set up, deployment is automatic:

1. **Make changes** on your local machine
2. **Commit and push** to your main branch:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
3. **Automatic deployment** starts immediately
4. **Check status** in your platform dashboard
5. **Site updates** within minutes

---

## 🔒 Environment Variables Quick Reference

### Required for Supabase:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Optional:
```
VITE_API_URL=https://api.yourdomain.com
VITE_ANALYTICS_ID=your_tracking_id
VITE_GA_ID=google_analytics_id
```

**Note:** Variables must start with `VITE_` to be accessible in the browser.

---

## 🚨 Common Issues & Solutions

### ❌ Build fails after deployment

**Solution:**
1. Check the build logs in platform dashboard
2. Ensure all dependencies are in `package.json`
3. Run locally: `npm install && npm run build`
4. Check Node version: Must be >= 18
5. Check for missing environment variables

### ❌ Site is blank/404 errors

**Solution:**
1. Ensure output directory is set to `dist`
2. Check if `dist/` folder exists after build
3. Verify routing configuration (TanStack Router)
4. Clear browser cache (Ctrl+Shift+Delete)

### ❌ Images/CSS not loading

**Solution:**
1. Check browser DevTools Network tab
2. Verify relative paths (use `/` not `./`)
3. Check CORS settings if loading from external sources
4. Ensure images are in `public/` folder

### ❌ Environment variables not working

**Solution:**
1. Verify variable names start with `VITE_`
2. Restart/redeploy after adding variables
3. Use `import.meta.env.VITE_VARIABLE_NAME` in code
4. Check that variables are in correct environment

### ❌ Supabase connection failing

**Solution:**
1. Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
2. Check Supabase project is running
3. Verify CORS settings in Supabase dashboard
4. Check firewall rules allow Cloudflare/Vercel IPs

---

## 📊 Monitoring & Analytics

### For Vercel:
- Built-in analytics dashboard
- Real-time error tracking
- Performance metrics

### For Cloudflare Pages:
- Cloudflare Analytics
- Performance metrics
- Real-time logs

### Add Google Analytics:
1. Get your Tracking ID from Google Analytics
2. Add to environment variables: `VITE_GA_ID=G-XXXXXXXXXX`
3. Implement in your app

---

## 🔐 Security Best Practices

1. **Never commit `.env` files** - Only `.env.example`
2. **Rotate keys regularly** - Especially database keys
3. **Use strong passwords** - For Supabase and hosting accounts
4. **Enable 2FA** - On all accounts (GitHub, Vercel, Cloudflare, Supabase)
5. **Monitor access logs** - Check for suspicious activity
6. **Keep dependencies updated** - Run `npm audit` regularly
7. **Use HTTPS only** - Automatic on Vercel/Cloudflare
8. **Configure CORS properly** - Only allow trusted origins

---

## 🎓 Learning Resources

| Topic | Resource |
|-------|----------|
| **Vercel Docs** | https://vercel.com/docs |
| **Cloudflare Pages** | https://developers.cloudflare.com/pages/ |
| **Vite Deployment** | https://vitejs.dev/guide/static-deploy |
| **React Best Practices** | https://react.dev/learn |
| **Supabase Guide** | https://supabase.com/docs |

---

## 💡 Pro Tips

1. **Use git branches** for feature development before merging to main
2. **Set up automated tests** (GitHub Actions, GitLab CI)
3. **Monitor performance** regularly with PageSpeed Insights
4. **Keep a changelog** for your deployments
5. **Document API changes** if you have a backend
6. **Use environment-specific configs** for dev/staging/production
7. **Implement error logging** (Sentry, LogRocket, etc.)
8. **Schedule regular backups** of your database

---

## 🆘 Still Need Help?

- **Vercel Support:** https://vercel.com/support
- **Cloudflare Support:** https://support.cloudflare.com/
- **Community Forums:** Stack Overflow, Reddit r/webdev
- **Your Team:** Ask your project lead

---

## 🎉 Next Steps

1. ✅ Deploy to your chosen platform
2. 📧 Share the live URL with your team
3. 🔍 Test thoroughly in production
4. 📈 Monitor performance and user feedback
5. 🚀 Plan your next features!

**Congratulations! Your website is now live!** 🎊

---

*Last Updated: May 17, 2025*
*For the most current deployment information, refer to official platform documentation.*
