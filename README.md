# ImpactHub Frontend

A modern React-based web application for charitable donation management, built with TypeScript and powered by Vite.

## Overview

ImpactHub is a comprehensive platform that connects donors with charitable campaigns. The application provides a seamless experience for browsing campaigns, making secure donations, and tracking impact metrics.

## Technology Stack

### Core Framework
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **React Router v6** for client-side routing

### UI & Styling
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for high-quality component library
- **Framer Motion** for smooth animations

### State & Data Management
- **React Context API** for global state
- **React Query** for server state management
- **React Hook Form** with Zod validation

### Payment Integration
- **Stripe** for secure payment processing
- Payment Intents API for enhanced security

### Development Tools
- **ESLint** for code quality
- **Prettier** for code formatting
- **TypeScript** for static type checking

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── common/         # Shared components
│   └── ui/             # UI library components
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
│   ├── admin/          # Admin dashboard pages
│   ├── auth/           # Authentication pages
│   ├── donor/          # Donor dashboard pages
│   ├── leader/         # Campaign leader pages
│   └── publicc/        # Public-facing pages
└── services/           # API service layer
```

## Key Features

### Campaign Management
- Browse and search campaigns with advanced filtering
- Real-time progress tracking and analytics
- Category-based organization
- Featured campaign highlights

### Donation System
- Secure payment processing via Stripe
- Multiple donation amount options
- Donation history and receipts
- Anonymous donation support

### User Roles
- **Donors**: Make donations and track contribution history
- **Campaign Leaders**: Create and manage campaigns
- **Administrators**: Platform oversight and user management

### Dashboard Features
- Role-specific dashboards
- Analytics and reporting
- Notification system
- Profile management

## Getting Started

### Prerequisites
- Node.js 16+ and pnpm
- Modern web browser

### Installation

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview


### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=your_api_url
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
```

## API Integration

### Core Endpoints

```typescript
// Campaign operations
GET    /api/campaigns
GET    /api/campaigns/:id
POST   /api/campaigns
PUT    /api/campaigns/:id
DELETE /api/campaigns/:id

// Donation operations
POST   /api/donations/create-payment-intent
POST   /api/donations/confirm
GET    /api/donations/history

// User operations
POST   /api/auth/login
POST   /api/auth/register
GET    /api/users/profile
PUT    /api/users/profile
```

## Development Guidelines

### Code Quality
- Follow TypeScript best practices
- Maintain consistent code formatting
- Write self-documenting code
- Use meaningful variable and function names

### Component Structure
- Keep components focused and single-purpose
- Use composition over inheritance
- Implement proper prop typing
- Handle loading and error states

### Performance Optimization
- Implement code splitting for routes
- Lazy load heavy components
- Optimize images and assets
- Minimize bundle size

## Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader optimization
- High contrast mode support

## License

This project is proprietary software developed by FURO Labs.

## Support

For technical support or inquiries, please contact the development team.
