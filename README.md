# 🏋️ ElevateU - AI-Powered Fitness Platform

<div align="center">

![ElevateU Logo](public/images/elevateuLogo.png)

**Transform your fitness journey with AI-powered workout plans, progress tracking, and personalized coaching.**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3.0-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.4-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

[Live Demo](#-deployment) • [Documentation](#-getting-started) • [Report Bug](#-contributing) • [Request Feature](#-contributing)

![ElevateU](public/homepage.jpg)
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Key Features Explained](#-key-features-explained)
- [Database Schema](#-database-schema)
- [API Routes](#-api-routes)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**ElevateU** is a full-stack fitness application that combines the power of AI with comprehensive workout tracking. Built with modern web technologies, it provides users with personalized workout plans, real-time progress tracking, and an intuitive interface for managing their fitness journey.

### Problem Statement
Traditional fitness apps lack personalization and don't adapt to individual user needs. Users struggle to track progress effectively and maintain consistency in their workout routines.

### Solution
ElevateU solves this by:
- **AI-Powered Personalization**: Custom workout plans based on user profile, fitness level, and goals
- **Comprehensive Tracking**: Detailed logging of exercises, sets, reps, and weights
- **Progress Analytics**: Visual insights into workout history and performance trends
- **User-Friendly Interface**: Modern, responsive design with smooth animations

---

## ✨ Features

### 🔐 Authentication & User Management
- **Secure Authentication**: Supabase Auth with email verification
- **Profile Management**: Complete user profiles with fitness metrics
- **Multi-step Onboarding**: Guided profile completion with validation
- **Session Management**: Secure session handling with middleware protection

### 💪 Workout Management
- **Create Custom Workouts**: Build personalized workout programs
- **Workout Templates**: Pre-designed programs for all fitness levels
- **Exercise Library**: Comprehensive database of exercises with details
- **Workout Scheduling**: Plan and track upcoming sessions
- **Progress Tracking**: Log sets, reps, weights, and rest periods

### 📊 Analytics & Insights
- **Dashboard Overview**: Key metrics at a glance
- **BMI Calculator**: Real-time body mass index tracking
- **Workout History**: Complete log of completed sessions
- **Streak Tracking**: Daily workout consistency monitoring
- **Progress Charts**: Visual representation of fitness journey

### 🎨 User Experience
- **Modern UI/UX**: Dark theme with purple/pink gradient accents
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion for fluid interactions
- **Accessibility**: WCAG-compliant design with keyboard navigation
- **Real-time Feedback**: Toast notifications and loading states

### 🔒 Security & Performance
- **Row Level Security**: Database-level access control
- **Middleware Protection**: Route-based authentication checks
- **Optimized Queries**: Efficient database queries with Prisma
- **Image Optimization**: Next.js Image component for fast loading
- **Code Splitting**: Automatic route-based code splitting

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 14.2](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5.0](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

### Backend & Database
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via Supabase)
- **ORM**: [Prisma 6.4](https://www.prisma.io/)
- **Authentication**: [Supabase Auth](https://supabase.com/auth)
- **API**: Next.js API Routes + Supabase REST API
- **File Storage**: Supabase Storage (for profile pictures)

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint + Prettier
- **Version Control**: Git
- **Deployment**: Vercel (recommended)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **PostgreSQL** database (or Supabase account)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/elevateu-2.git
   cd elevateu-2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000

   # Database (Prisma)
   DATABASE_URL=postgresql://user:password@host:port/database
   DIRECT_URL=postgresql://user:password@host:port/database
   ```

4. **Set up the database**
   ```bash
   # Run Prisma migrations
   npx prisma migrate deploy
   
   # Generate Prisma Client
   npx prisma generate
   
   # (Optional) Open Prisma Studio to view data
   npx prisma studio
   ```

5. **Set up Row Level Security (RLS)**
   - Open your Supabase dashboard
   - Go to SQL Editor
   - Run the SQL from `supabase-rls-policies.sql`

6. **Configure Supabase Email Templates**
   - Go to Authentication → Email Templates
   - Update templates using content from `supabase-email-templates.md`

7. **Start the development server**
   ```bash
   npm run dev
   ```

8. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
elevateu-2/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── public/
│   ├── images/               # Static images
│   └── favicon.ico           # Site favicon
├── src/
│   ├── app/
│   │   ├── (auth)/          # Auth routes (login, signup)
│   │   ├── (main)/          # Protected routes
│   │   │   └── (pages)/     # Main application pages
│   │   ├── api/             # API routes
│   │   ├── auth/            # Auth callbacks
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Landing page
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── forms/           # Form components
│   │   ├── global/           # Global components
│   │   ├── ui/              # Reusable UI components
│   │   └── ...
│   ├── lib/
│   │   └── constant.ts      # Constants and config
│   ├── middleware.ts        # Route protection middleware
│   ├── providers/           # Context providers
│   └── utils/               # Utility functions
├── .env.local               # Environment variables (gitignored)
├── DESIGN_ANALYSIS.md       # Design system documentation
├── README.md               # This file
└── package.json            # Dependencies
```

---

## 🔑 Key Features Explained

### 1. Multi-Step Profile Form
- **4-step wizard** for profile completion
- Real-time validation with Zod schema
- BMI calculator with visual feedback
- Card-based selections for better UX
- Progress indicator showing completion status

### 2. Dashboard Analytics
- **Stats Cards**: Total workouts, streak, completed sessions
- **Profile Summary**: User info with BMI calculation
- **Quick Actions**: Fast access to common tasks
- **Progress Section**: Workout history and trends

### 3. Workout Management
- **Create Workouts**: Build custom programs with exercises
- **Template Library**: Pre-designed programs
- **Session Tracking**: Log workouts with sets/reps/weights
- **Schedule View**: Upcoming workout calendar

### 4. Authentication Flow
- **Email Verification**: Secure signup with confirmation
- **Branded Emails**: Custom HTML email templates
- **Session Management**: Secure cookie-based sessions
- **Middleware Protection**: Route-level access control

---

## 🗄️ Database Schema

### Core Models

- **userProfile**: User information and fitness metrics
- **Exercise**: Exercise library with details
- **WorkoutProgram**: User-created workout programs
- **WorkoutDay**: Days within a program
- **WorkoutExercise**: Exercises assigned to days
- **WorkoutSession**: Logged workout sessions
- **SessionExercise**: Exercises performed in a session
- **Set**: Individual sets with reps and weight
- **Progress**: User progress tracking over time

See `prisma/schema.prisma` for complete schema definition.

---

## 🛣️ API Routes

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /auth/callback` - OAuth callback handler

### User Profile
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Workouts
- `GET /api/workouts` - List workouts
- `POST /api/workouts` - Create workout
- `GET /api/workouts/[id]` - Get workout details
- `PUT /api/workouts/[id]` - Update workout
- `DELETE /api/workouts/[id]` - Delete workout

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

3. **Configure Environment Variables**
   - Add all variables from `.env.local`
   - Set `NEXT_PUBLIC_SITE_URL` to your production URL

---

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Build for production
npm run build

# Start production server
npm start
```

---

## 📝 Code Quality

- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code linting with Next.js recommended rules
- **Prettier**: Consistent code formatting
- **Prisma**: Type-safe database queries
- **Zod**: Runtime type validation for forms

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Supabase](https://supabase.com/) for backend infrastructure
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Aceternity UI](https://ui.aceternity.com/) for animation components
- All open-source contributors

---

<div align="center">

**Built with ❤️ using Next.js, TypeScript, and Supabase**

⭐ Star this repo if you find it helpful!

</div>
