# FunnyTips - Content Subscription Platform

Modern content subscription platform similar to OnlyFans/Fansly built with React, TypeScript, TailwindCSS, and Material UI.

## 🚀 Features

- **User Authentication** - JWT-based authentication (Email/Password)
- **Content Management** - Upload and manage posts (images, videos, text)
- **Subscription System** - Monthly subscriptions for creators
- **Pay-Per-View Content** - Premium locked content
- **Direct Messages** - Private messaging between users
- **Payment Integration** - Ready for Stripe Connect integration
- **Responsive Design** - Mobile-first design with TailwindCSS + Material UI

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Material UI (MUI)** - Component library
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **Axios** - HTTP client with JWT interceptors

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd funnyTips
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a `.env` file in the root directory:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Configure your API endpoint in `.env`:
\`\`\`env
VITE_API_URL=http://localhost:3000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_key_here
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

## 📁 Project Structure

\`\`\`
funnyTips/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── auth/            # Auth-related components
│   │   ├── creator/         # Creator dashboard components
│   │   ├── feed/            # Feed and post components
│   │   ├── subscription/    # Subscription components
│   │   ├── messages/        # Messaging components
│   │   └── layout/          # Layout components (Navbar, Layout)
│   ├── pages/               # Page components
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── SignUp.tsx
│   │   ├── Explore.tsx
│   │   ├── CreatorProfile.tsx
│   │   └── Messages.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── usePosts.ts
│   │   ├── useSubscription.ts
│   │   └── ...
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx
│   ├── lib/                 # Utilities and configs
│   │   ├── auth.ts          # Auth token management
│   │   ├── api.ts           # Axios API client
│   │   └── queryClient.ts   # React Query client
│   ├── types/               # TypeScript type definitions
│   │   ├── user.ts
│   │   ├── post.ts
│   │   ├── subscription.ts
│   │   ├── payment.ts
│   │   └── message.ts
│   ├── utils/               # Helper functions
│   ├── App.tsx              # Main App component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── .env.example             # Environment variables template
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
\`\`\`

## 🔐 Authentication

The app uses JWT-based authentication with localStorage for token management:

- Tokens are stored in localStorage
- API client automatically attaches tokens to requests
- Expired tokens trigger automatic logout and redirect to login

## 💳 Payment Integration (TODO)

The app is ready for Stripe Connect integration:
- Stripe checkout for subscriptions
- Stripe Connect for creator payouts
- PPV payments
- Tips and donations

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 UI Components

The project uses Material UI components combined with TailwindCSS for styling. All components follow these principles:
- Mobile-first responsive design
- Accessibility (WCAG 2.1)
- Clean and modern UI
- Consistent design system

## 🔐 Authentication Flow

1. User signs up with email/password
2. Backend returns JWT token and user data
3. Token is stored in localStorage
4. Token is attached to all API requests via Axios interceptors
5. Protected routes check authentication status

## 📱 User Roles

- **Fan** - Can subscribe to creators, view content, send tips
- **Creator** - Can upload content, set subscription prices, receive payments
- **Admin** - Can manage users, moderate content, view analytics

## 🚀 Deployment

### Frontend (Vercel/Netlify)
\`\`\`bash
npm run build
# Deploy dist/ folder
\`\`\`

### Backend (Required)
- Set up Node.js/Express API server
- Deploy to Railway/Heroku/AWS
- Configure PostgreSQL database
- Set up Stripe webhooks

## 📄 Backend API Requirements

The frontend expects these API endpoints:

\`\`\`
POST   /api/auth/login       - Login with email/password
POST   /api/auth/register    - Register new user

GET    /api/users/:id        - Get user by ID
GET    /api/users/username/:username - Get user by username
PATCH  /api/users/:id        - Update user

GET    /api/posts            - Get all posts (with filters)
GET    /api/posts/:id        - Get single post
POST   /api/posts            - Create new post
DELETE /api/posts/:id        - Delete post
POST   /api/posts/:id/like   - Like/unlike post

GET    /api/subscriptions    - Get user subscriptions
POST   /api/subscriptions    - Create subscription
DELETE /api/subscriptions/:id - Cancel subscription

GET    /api/messages         - Get conversations
POST   /api/messages         - Send message
\`\`\`

All endpoints (except auth) require `Authorization: Bearer <token>` header.

## 📚 Documentation

- **README.md** - This file (overview)
- **SETUP.md** - Detailed setup guide
- **PROJECT_STATUS.md** - Current project status
- **CONTRIBUTING.md** - Contribution guidelines
- **QUICK_START.md** - Quick start guide

## 📄 License

MIT License

## 👨‍💻 Author

Built with ❤️ by Senior React Developer
