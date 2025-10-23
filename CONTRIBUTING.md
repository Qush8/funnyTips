# Contributing Guide

## 📋 Development Workflow

### 1. Fork & Clone

\`\`\`bash
git clone <your-fork-url>
cd funnyTips
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Create Feature Branch

\`\`\`bash
git checkout -b feature/your-feature-name
\`\`\`

### 4. Make Changes

Follow the code style and structure already in place.

### 5. Test Your Changes

\`\`\`bash
npm run build
npm run dev
\`\`\`

### 6. Commit & Push

\`\`\`bash
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name
\`\`\`

### 7. Create Pull Request

Open a PR to the main repository.

## 🎨 Code Style Guidelines

### TypeScript

- Use TypeScript for all new files
- Define proper types (no `any` unless absolutely necessary)
- Use interfaces for object types
- Use type aliases for unions/intersections

### React Components

- Use functional components
- Use arrow functions for components: `const MyComponent = () => {}`
- Define props interface above component
- Use early returns for loading/error states

### Naming Conventions

- **Components**: PascalCase (`CreatorCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`usePosts.ts`)
- **Utils**: camelCase (`formatters.ts`)
- **Event Handlers**: camelCase with `handle` prefix (`handleClick`)
- **Types**: PascalCase (`User`, `Post`)
- **Enums**: PascalCase (`UserRole`, `PostType`)

### File Organization

\`\`\`
src/
├── components/          # Reusable UI components
│   ├── ui/             # Generic UI components
│   ├── feed/           # Feed-specific components
│   └── creator/        # Creator-specific components
├── pages/              # Page components (routes)
├── hooks/              # Custom React hooks
├── contexts/           # React contexts
├── lib/                # Libraries and configs
├── types/              # TypeScript types
└── utils/              # Utility functions
\`\`\`

### Styling

- Use **TailwindCSS** for styling
- Use **Material UI** components where appropriate
- Combine MUI + Tailwind: `<Button className="bg-blue-600">`
- Responsive design: use `md:`, `lg:` prefixes
- Mobile-first approach

### Import Order

\`\`\`typescript
// 1. External libraries
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

// 2. Internal modules
import { useAuth } from '../contexts/AuthContext';
import { PostCard } from '../components/feed/PostCard';
import type { User, Post } from '../types';

// 3. Styles (if any)
import './styles.css';
\`\`\`

## 🐛 Bug Reports

When reporting bugs, include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser/OS information
- Console errors

## ✨ Feature Requests

When requesting features:

- Describe the feature clearly
- Explain the use case
- Provide examples if possible
- Consider implementation complexity

## 🧪 Testing (TODO)

Once testing is set up:

\`\`\`bash
npm run test
npm run test:watch
npm run test:coverage
\`\`\`

## 📝 Commit Message Format

Use conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Build process or auxiliary tool changes

Examples:
\`\`\`
feat: add user profile editing
fix: resolve authentication redirect issue
docs: update setup instructions
style: format code with prettier
refactor: extract post card logic
\`\`\`

## 🔒 Security

- Never commit `.env` files
- Never commit API keys or secrets
- Use environment variables for sensitive data
- Report security issues privately

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

