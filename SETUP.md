# Setup Guide

## 🚀 Quick Setup

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment Variables

Create a `.env` file:

\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env`:

\`\`\`env
# API Backend URL
VITE_API_URL=http://localhost:3000/api

# Stripe (Optional - for payments)
VITE_STRIPE_PUBLIC_KEY=pk_test_...
\`\`\`

### 3. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:5173

## 🔧 Backend API Setup (Required)

The frontend needs a backend API to function properly. Here's what you need:

### Backend Stack Recommendations

**Option 1: Node.js + Express + PostgreSQL**
- Express.js for API routes
- PostgreSQL for database
- Prisma ORM for database management
- JWT for authentication
- bcrypt for password hashing

**Option 2: Node.js + Express + MongoDB**
- Express.js for API routes
- MongoDB for database
- Mongoose for ODM
- JWT for authentication

### Required API Endpoints

#### Authentication Endpoints

\`\`\`javascript
// POST /api/auth/register
// Body: { email, password, username, displayName, role }
// Returns: { token: string, user: User }

// POST /api/auth/login
// Body: { email, password }
// Returns: { token: string, user: User }
\`\`\`

#### User Endpoints

\`\`\`javascript
// GET /api/users/:id
// Headers: Authorization: Bearer <token>
// Returns: User

// GET /api/users/username/:username
// Headers: Authorization: Bearer <token>
// Returns: User

// PATCH /api/users/:id
// Headers: Authorization: Bearer <token>
// Body: Partial<User>
// Returns: User
\`\`\`

#### Post Endpoints

\`\`\`javascript
// GET /api/posts
// Query: ?creatorId=123 (optional)
// Headers: Authorization: Bearer <token>
// Returns: Post[]

// GET /api/posts/:id
// Headers: Authorization: Bearer <token>
// Returns: Post

// POST /api/posts
// Headers: Authorization: Bearer <token>
// Body: FormData (content, media files, isPPV, price, etc.)
// Returns: Post

// DELETE /api/posts/:id
// Headers: Authorization: Bearer <token>
// Returns: { success: true }

// POST /api/posts/:id/like
// Headers: Authorization: Bearer <token>
// Returns: { liked: boolean }
\`\`\`

#### Subscription Endpoints

\`\`\`javascript
// GET /api/subscriptions
// Query: ?subscriberId=123 (optional)
// Headers: Authorization: Bearer <token>
// Returns: Subscription[]

// POST /api/subscriptions
// Headers: Authorization: Bearer <token>
// Body: { creatorId, paymentMethodId }
// Returns: Subscription

// DELETE /api/subscriptions/:id
// Headers: Authorization: Bearer <token>
// Returns: { success: true }
\`\`\`

#### Message Endpoints

\`\`\`javascript
// GET /api/messages
// Headers: Authorization: Bearer <token>
// Returns: Conversation[]

// POST /api/messages
// Headers: Authorization: Bearer <token>
// Body: { receiverId, content, type, mediaUrl?, isPPV?, price? }
// Returns: Message
\`\`\`

### Database Schema (Prisma Example)

\`\`\`prisma
model User {
  id              String         @id @default(uuid())
  email           String         @unique
  password        String         // Hashed with bcrypt
  username        String         @unique
  displayName     String
  avatar          String?
  role            Role           @default(FAN)
  verified        Boolean        @default(false)
  subscriptionPrice Decimal?
  bio             String?
  
  posts           Post[]
  subscriptions   Subscription[] @relation("subscriber")
  subscribers     Subscription[] @relation("creator")
  
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
}

model Post {
  id              String         @id @default(uuid())
  creatorId       String
  creator         User           @relation(fields: [creatorId], references: [id])
  
  type            PostType
  content         String?
  mediaUrls       String[]
  
  isPPV           Boolean        @default(false)
  price           Decimal?
  subscribersOnly Boolean        @default(true)
  
  likes           Int            @default(0)
  views           Int            @default(0)
  
  createdAt       DateTime       @default(now())
}

model Subscription {
  id              String         @id @default(uuid())
  subscriberId    String
  subscriber      User           @relation("subscriber", fields: [subscriberId], references: [id])
  creatorId       String
  creator         User           @relation("creator", fields: [creatorId], references: [id])
  
  status          SubStatus
  startDate       DateTime       @default(now())
  endDate         DateTime?
  price           Decimal
}

enum Role {
  FAN
  CREATOR
  ADMIN
}

enum PostType {
  IMAGE
  VIDEO
  TEXT
  GALLERY
}

enum SubStatus {
  ACTIVE
  CANCELLED
  EXPIRED
}
\`\`\`

### JWT Authentication Middleware

\`\`\`javascript
// Example middleware
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
\`\`\`

## 💳 Stripe Setup (Optional for MVP)

### 1. Create Stripe Account

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register)
2. Complete registration

### 2. Get API Keys

1. Go to **Developers** → **API keys**
2. Copy **Publishable key** to `.env`:

\`\`\`env
VITE_STRIPE_PUBLIC_KEY=pk_test_...
\`\`\`

### 3. Backend Stripe Setup

Install Stripe SDK:
\`\`\`bash
npm install stripe
\`\`\`

Add to backend `.env`:
\`\`\`env
STRIPE_SECRET_KEY=sk_test_...
\`\`\`

## 🚀 Running the Project

### Development

\`\`\`bash
npm run dev
\`\`\`

### Production Build

\`\`\`bash
npm run build
npm run preview
\`\`\`

## 📱 Deployment

### Frontend (Vercel)

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

Add environment variables in Vercel dashboard.

### Backend (Railway)

1. Create Railway project
2. Connect GitHub repo
3. Add environment variables
4. Deploy

## 🐛 Troubleshooting

### API Connection Issues

- Check `VITE_API_URL` in `.env`
- Ensure backend is running
- Check CORS configuration in backend

### Authentication Issues

- Check if JWT token is being saved in localStorage
- Verify token format in API requests
- Check token expiration settings

### Build Errors

\`\`\`bash
npm run build
\`\`\`

Check for TypeScript errors.

## 📚 Resources

- [React Query Docs](https://tanstack.com/query/)
- [Material UI Docs](https://mui.com/)
- [TailwindCSS Docs](https://tailwindcss.com/)
- [Stripe Docs](https://stripe.com/docs)
