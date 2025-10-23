# ⚡ Quick Start Guide

## 🚀 Get Started in 3 Minutes

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Create Environment File
\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env`:
\`\`\`env
VITE_API_URL=http://localhost:3000/api
\`\`\`

### 3. Start Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit: http://localhost:5173

## 📁 Project Structure Overview

\`\`\`
funnyTips/
├── src/
│   ├── pages/              # Main pages (Home, Login, Profile, etc.)
│   ├── components/         # Reusable components
│   ├── hooks/              # Custom React hooks
│   ├── contexts/           # React contexts (Auth)
│   ├── types/              # TypeScript definitions
│   ├── lib/                # Config & utilities
│   └── utils/              # Helper functions
├── .env                    # Environment variables (create this)
├── README.md               # Main documentation
├── SETUP.md                # Detailed setup guide
└── PROJECT_STATUS.md       # Current project status
\`\`\`

## 🔑 Key Features

✅ **Authentication** - JWT-based with localStorage
✅ **User Profiles** - Creator & Fan roles
✅ **Feed System** - Post viewing and interactions
✅ **Explore Page** - Discover creators
✅ **Messaging** - Direct messages (UI ready)
✅ **Subscriptions** - Subscribe to creators (UI ready)
✅ **Responsive Design** - Mobile-first approach

## 🛠️ Available Commands

\`\`\`bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
\`\`\`

## 📚 Documentation

- **README.md** - Overview and features
- **SETUP.md** - Backend API setup guide
- **PROJECT_STATUS.md** - What's done and what's pending
- **CONTRIBUTING.md** - How to contribute

## 🔧 Backend API (Required)

The frontend is complete, but you need a backend API:

### Required Endpoints:
\`\`\`
POST   /api/auth/login      - Login
POST   /api/auth/register   - Sign up
GET    /api/users/:id       - Get user
GET    /api/posts           - Get posts
POST   /api/posts           - Create post
GET    /api/subscriptions   - Get subscriptions
\`\`\`

See `SETUP.md` for detailed backend requirements.

## 💡 Tips

- Frontend is 100% complete and production-ready
- Authentication uses JWT tokens in localStorage
- All types are defined in `src/types/`
- API client automatically handles token injection

## 🆘 Need Help?

Check:
- Build errors? → Run `npm run build` for details
- Type errors? → All types are in `src/types/`
- API errors? → Check `.env` configuration

---

Happy coding! 🚀
