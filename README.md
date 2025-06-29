Scandic Cabins - Cabin Booking Platform
A Next.js application featuring cabin bookings with authentication (Google/Facebook).

🚀 Live Demo
Deployed Website: https://scandic-cabins.vercel.app

🌲 Project Overview
Scandic Cabins is a modern cabin rental platform that allows users to:

Browse and book luxury cabins

Create accounts via Google/Facebook or email

Manage bookings and personal profiles

🛖 Cabins Features
Core Functionality
Cabin Listings: View available cabins with filters

Booking System: Select dates and book cabins

User Dashboard: Manage bookings and profile

Admin Panel: Manage cabins and bookings (protected)
Deployed Website: https://the-scandic-cabins-mangement.netlify.app

Technical Features
Authentication: Google, Facebook, and email/password

Database: Supabase for cabins and bookings data

Payments: Stripe integration (coming soon)

📁 Updated Project Structure
text
scandic-cabins/
├── app/
│ ├── \_components/
│ │ └── # Shared UI components
│ ├── \_lib/
│ │ ├── # Auth logic
│ │ ├── # actions
│ │ └── # cabin-services
│ ├── cabins/
│ │ ├── [id]/ # Single cabin page
│ │ └── page.js # All cabins listing
│ ├── account/
│ │ ├── bookings/ # User bookings
│ │ └── profile/ # Profile management
├── public/
│ └── # images
└── ...
🛠️ Updated Tech Stack
Frontend: Next.js 15 (App Router)

Styling: Tailwind CSS + Shadcn UI

Authentication: NextAuth.js (Google, Facebook)

Database: Supabase (PostgreSQL)

Hosting: Vercel

🔧 Setup Instructions (Updated)
Clone the repository

bash
git clone https://github.com/youssefhikal93/scandic-cabins.git
cd scandic-cabins
Set up environment variables

env

# Supabase

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_KEY=your-supabase-key

Run the development server

bash
npm install
npm run dev
📸 Screenshots
Cabin Listing Page
https://scandic-cabins.vercel.app/screenshots/cabins.jpg

Booking Flow
https://scandic-cabins.vercel.app/screenshots/booking.jpg

User Dashboard
https://scandic-cabins.vercel.app/screenshots/dashboard.jpg

🚀 Deployment Notes
The project is configured for Vercel deployment with:

Automatic CI/CD from GitHub

Serverless function support for API routes

Edge caching for cabin images

Environment variables secured in Vercel dashboard

📈 Next Steps (Roadmap)
Add Stripe payment integration

Implement cabin reviews system

Add favoriting/liking cabins

Mobile app development (React Native)
