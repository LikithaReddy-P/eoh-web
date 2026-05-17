# EOH Hyderabad Website

A modern, responsive website built with React, TanStack Router, and TailwindCSS.

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## Building

```bash
npm run build
```

This generates optimized production files in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

---

## Deployment

### Option 1: Deploy to Vercel (Recommended)

**Easiest method for static/hybrid apps**

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your Git repository (GitHub, GitLab, or Bitbucket)

2. **Configure Build Settings:**
   - Framework: **Other**
   - Build Command: `npm run build:vercel`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Set Environment Variables** (if needed):
   - Go to Project Settings → Environment Variables
   - Add any required variables (e.g., `VITE_API_URL`)

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your site

**Subsequent Deployments:** Simply push to your connected branch, and Vercel will auto-deploy.

### Option 2: Deploy to Cloudflare Pages

**Ideal for static sites with global CDN**

1. **Install Wrangler (optional for local testing):**
   ```bash
   npm install -g wrangler
   ```

2. **Build Your Site:**
   ```bash
   npm run build
   ```

3. **Connect to Cloudflare Pages:**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Navigate to Pages
   - Click "Create a project" → "Connect to Git"
   - Select your repository

4. **Configure Build Settings:**
   - Framework: **None**
   - Build Command: `npm run build`
   - Build Output Directory: `dist`
   - Root Directory: `/`
   - Environment Variables: (add any needed)

5. **Deploy:**
   - Click "Save and Deploy"
   - Cloudflare will build and deploy your site

### Option 3: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Select your Git repository
4. **Build Settings:**
   - Build Command: `npm run build`
   - Publish Directory: `dist`
5. Deploy

### Option 4: Manual Deployment (Any Host)

1. Build your project:
   ```bash
   npm run build
   ```

2. Upload the `dist/` folder to your hosting provider

3. Configure your server to serve `index.html` for all routes (important for SPA routing)

---

## Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_API_URL=your_api_url_here
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_key
```

These variables will be available as `import.meta.env.VITE_*` in your code.

---

## Project Structure

```
├── src/
│   ├── pages/              # Route components
│   ├── components/         # Reusable components
│   ├── lib/               # Utilities and helpers
│   ├── styles/            # Global styles
│   └── app.tsx            # Root component
├── public/                # Static assets
├── dist/                  # Build output (generated)
├── package.json           # Dependencies
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── vercel.json            # Vercel deployment config
```

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:vercel` | Build optimized for Vercel |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

---

## Troubleshooting

### Build fails with "Module not found"
- Run `npm install` to ensure all dependencies are installed
- Check that all imports use correct paths

### Environment variables not loading
- Make sure variables start with `VITE_` prefix
- Add them to your `.env.local` file (local) or platform's environment settings (production)
- Restart dev server after changing `.env.local`

### Vercel deployment fails
- Check build logs in Vercel dashboard
- Ensure `package.json` has correct build command
- Verify Node.js version matches requirements (>= 18)

### Cloudflare deployment issues
- Build directory must be `dist/`
- No special plugins needed for static site
- Check that routing is configured correctly for SPA

---

## Performance Tips

1. **Image Optimization:**
   - Use modern formats (WebP, AVIF)
   - Compress images before deployment
   - Lazy load images below the fold

2. **Code Splitting:**
   - TanStack Router automatically code-splits routes
   - Monitor bundle size with `npm run build`

3. **Caching:**
   - Vercel/Cloudflare handle caching automatically
   - Set cache headers in production builds

---

## Support & Documentation

- [TanStack Router Docs](https://tanstack.com/router/latest)
- [Vite Docs](https://vitejs.dev)
- [TailwindCSS Docs](https://tailwindcss.com)
- [Vercel Docs](https://vercel.com/docs)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)

---

**Ready to deploy? Choose your platform above and get started! 🚀**
