# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Operations
- `npm run drizzle:generate` - Generate new database migrations
- `npm run drizzle:migrate` - Apply database migrations to database
- `npm run drizzle:studio` - Open Drizzle Studio (database GUI)
- `npm run seed` - Seed database with sample data (uses `scripts/seed.ts`)

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Database**: PostgreSQL with Neon serverless
- **ORM**: Drizzle ORM with migrations
- **Authentication**: Better Auth with magic links and OAuth
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Email**: Resend for magic links
- **Type Safety**: TypeScript with strict mode

### Project Structure

#### Route Groups
- `(root)` - Main application pages with Navbar/Footer layout
- `(auth)` - Authentication pages (sign-in, sign-up) with separate layout

#### Authentication System
The app uses Better Auth with comprehensive authentication:

**Database Schema** (`src/db/schema.ts`):
- `users` - User accounts (Better Auth compatible)
- `sessions` - Active user sessions
- `accounts` - OAuth provider accounts
- `verifications` - Magic link tokens
- `passkeys` - WebAuthn credentials (prepared for future)
- `products` - E-commerce product catalog

**Auth Configuration** (`src/lib/auth.ts`):
- Magic link authentication via email
- Google OAuth provider
- Session management (7-day expiry)
- CORS configuration for GitHub Codespaces
- Custom email sending with Resend

**Client Integration** (`src/lib/auth-client.ts`):
- Client-side auth utilities
- Magic link client plugin

#### Database Architecture
- **Connection**: Neon PostgreSQL with connection pooling
- **Migrations**: Located in `/drizzle/` directory
- **Schema**: Uses Better Auth compatible table structure
- **Relations**: Proper foreign key relationships between users, sessions, accounts

#### Key Components
- `Navbar` - Main navigation with authentication state
- `Hero` - Landing page hero section  
- `Slider` - Product carousel using Embla Carousel
- `Card` - Product display component
- `Footer` - Site footer
- `SocialProviders` - OAuth authentication buttons

### Important Configuration

#### Environment Variables Required
```bash
# Database
DATABASE_URL="postgresql://..."

# Better Auth
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="https://your-domain.com" # or localhost:3000

# OAuth (optional)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Email (for magic links)
RESEND_API_KEY="..."
```

#### Path Aliases
- `@/*` maps to `src/*` for absolute imports

#### CORS & Security
- Configured for GitHub Codespaces with pattern `*.app.github.dev`
- API routes have CORS headers for cross-origin requests
- Better Auth handles CSRF protection

### Development Notes

#### Database Development
- Always run migrations after schema changes: `npm run drizzle:generate && npm run drizzle:migrate`
- Use Drizzle Studio for database inspection: `npm run drizzle:studio`
- Schema follows Better Auth requirements exactly - don't modify core auth tables

#### Authentication Flow
- Magic links expire after 10 minutes
- Sessions last 7 days with 1-day update intervals
- Guest users supported (implementation in progress)
- OAuth providers easily extensible

#### Code Style
- ESLint configured with Next.js and TypeScript rules
- Unused variables show warnings, not errors
- `@typescript-eslint/no-explicit-any` disabled for flexibility

#### Debugging
- Auth configuration logs to console in development
- Magic link fallback shows tokens in console if email fails
- Database connection details logged on startup