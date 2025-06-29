# 🛖 Scandic Cabins - Cabin Booking Platform

A Next.js application featuring cabin bookings with authentication (Google/Facebook/Microsoft).

## 🚀 Live Demo

**Deployed Website**: https://scandic-cabins.vercel.app

## 🌲 Project Overview

Scandic Cabins is a modern cabin rental platform that allows users to:

- Browse and book luxury cabins
- Create accounts via Google/Facebook/Microsoft authentication
- Manage bookings and personal profiles

## 🛖 Cabins Features

### Core Functionality
- **Cabin Listings**: View available cabins with filters
- **Booking System**: Select dates and book cabins
- **User Dashboard**: Manage bookings and profile
- **Admin Panel**: Manage cabins and bookings (protected)

**Admin Panel**: https://the-scandic-cabins-mangement.netlify.app

### Technical Features
- **Authentication**: Google, Facebook, and Microsoft providers
- **Database**: Supabase for cabins and bookings data
- **Payments**: Stripe integration (coming soon)

## 🛠️ Updated Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Shadcn UI
- **Authentication**: NextAuth.js v5 (Google, Facebook, Microsoft)
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel

## 🔧 Setup Instructions

### Clone the repository
```bash
git clone https://github.com/Youssefhikal93/Next-The-scandic-cabins.git
cd scandic-cabins
```

### Set up environment variables
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_KEY=your-supabase-key

# NextAuth Configuration
AUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
AUTH_FACEBOOK_ID=your-facebook-app-id
AUTH_FACEBOOK_SECRET=your-facebook-app-secret
```

### Run the development server
```bash
npm install
npm run dev
```


## 🚀 Deployment Notes

The project is configured for Vercel deployment with:

- Automatic CI/CD from GitHub
- Serverless function support for API routes
- Edge caching for cabin images
- Environment variables secured in Vercel dashboard
- Multi-provider OAuth callback URLs configured

## 📈 Next Steps (Roadmap)

- Add Stripe payment integration
- Implement cabin reviews system
- Add favoriting/liking cabins
- Integrate Email services
