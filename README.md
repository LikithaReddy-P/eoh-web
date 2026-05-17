# EOH Hyderabad Website

A modern, fully responsive website for EOH (Embrace of Humanity) Hyderabad, built with cutting-edge web technologies.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ✨ Features

- 🎨 Modern, responsive UI with TailwindCSS
- ⚡ Lightning-fast performance with Vite
- 🔀 Type-safe routing with TanStack Router
- 📱 Mobile-first design
- 🎯 SEO optimized
- 🔐 Secure authentication with Supabase
- 📊 Data management with TanStack Query
- 🎭 Beautiful UI components from Radix UI
- 🌗 Dark/Light theme support
- 📈 Admin dashboard

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Routing:** TanStack Router
- **Styling:** TailwindCSS + Tailwind Merge
- **UI Components:** Radix UI + shadcn/ui
- **Form Handling:** React Hook Form + Zod
- **Backend/Database:** Supabase
- **Data Fetching:** TanStack Query
- **Build Tool:** Vite
- **Language:** TypeScript
- **Icons:** Lucide React
- **Notifications:** Sonner

## 📦 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # UI primitives (buttons, inputs, etc.)
│   ├── common/         # Shared components (Navbar, Footer, etc.)
│   └── admin/          # Admin-specific components
├── pages/              # Page components and routes
├── hooks/              # Custom React hooks
│   ├── useAuth.tsx     # Authentication hook
│   ├── useTheme.tsx    # Theme management
│   └── useSettings.tsx # Settings management
├── lib/                # Utilities and helpers
├── types.ts            # TypeScript type definitions
├── router.tsx          # Route configuration
├── server.ts           # Server-side code (SSR)
├── client.ts           # Client initialization
└── styles/             # Global styles
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server (http://localhost:5173) |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code quality with ESLint |
| `npm run format` | Format code with Prettier |

## 🌐 Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=your_api_endpoint
```

## 📤 Deployment

This project is optimized for deployment on:

- **Vercel** (Recommended) - Zero-config deployment
- **Cloudflare Pages** - Global CDN with fast edge speeds
- **Netlify** - Git-connected hosting
- **Any Node.js host** - Full server-side capabilities

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for each platform.

### Quick Deployment Links:
- [Deploy to Vercel](https://vercel.com/new)
- [Deploy to Cloudflare Pages](https://dash.cloudflare.com/?to=/:account/pages)
- [Deploy to Netlify](https://app.netlify.com/start)

## 🔐 Authentication

The app uses Supabase for authentication:
- Email/Password login
- Protected routes and admin panel
- Session management
- User profile management

## 🎨 Styling

The project uses TailwindCSS with custom configuration:
- Dark/Light mode support
- Custom color palette
- Responsive design utilities
- Animation utilities

## 📱 Mobile Support

- Fully responsive design
- Mobile-first approach
- Touch-friendly UI
- Optimized performance for mobile devices

## 🚦 Performance

- Automatic code-splitting with TanStack Router
- Image optimization
- CSS purging in production
- Minified and optimized bundles
- Fast API responses with Supabase

## 🐛 Troubleshooting

**Issue: Dependencies not installing**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Issue: Port already in use**
```bash
npm run dev -- --port 3000
```

**Issue: Build fails**
- Check Node.js version (must be >= 18)
- Clear Vite cache: `rm -rf .vite`
- Reinstall dependencies: `npm install`

## 📖 Documentation Links

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TanStack Router Docs](https://tanstack.com/router/latest)
- [TailwindCSS Docs](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

## 📝 Code Style

This project uses:
- **ESLint** for code quality
- **Prettier** for code formatting
- **TypeScript** for type safety

Run formatter before committing:
```bash
npm run format
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run format` and `npm run lint`
4. Commit with clear messages
5. Push and create a pull request

## 📄 License

This project is proprietary and confidential.

## 👥 Support

For support, contact the development team or create an issue in your project repository.

---

**Happy coding! 🎉**

Built with ❤️ for EOH Hyderabad
