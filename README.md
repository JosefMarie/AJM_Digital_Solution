# Digital Portfolio & Resume Builder

A professional portfolio and resume builder built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Firebase.

## 🌟 Features

### Public Interface
- **Hero Section**: Eye-catching landing with fluid shapes and glassmorphism effects
- **Projects Gallery**: Showcase your portfolio projects with real-time Firestore data
- **Dynamic Resume**: Professional resume section with experience, skills, and education

### Admin Dashboard (Protected)
- **Firebase Authentication**: Secure admin login
- **Projects CRUD**: Create, Read, Update, and Delete portfolio projects
- **Resume Editor**: Real-time resume management interface

## 🎨 Design

- **Dark Mode**: Default dark theme with the "Intense Fluid" aesthetic
- **Color Palette**: Deep blues, vibrant purples, and cyan accents
- **Glassmorphism**: Backdrop blur effects for modern UI elements
- **Fluid Animations**: Organic background shapes with smooth animations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Firebase project (for Firestore and Authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd AJM_Digital_Solution
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Firestore Database
   - Enable Email/Password Authentication
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Firebase credentials in `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
d:/AJM_Digital_Solution/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Public landing page
│   ├── login/               # Admin login
│   └── admin/               # Protected admin routes
├── components/
│   ├── public/              # Public-facing components
│   ├── admin/               # Admin dashboard components
│   └── ui/                  # Reusable UI components
├── lib/
│   ├── firebase/            # Firebase configuration & helpers
│   └── types/               # TypeScript interfaces
├── tailwind.config.ts       # Custom Tailwind configuration
└── .env.local               # Firebase credentials (not in repo)
```

## 🔐 Firebase Setup

### Firestore Collections
- `projects`: Portfolio projects
- `resume`: Resume data (single document with ID 'default')

### Authentication
- Email/Password authentication for admin access
- Create an admin user in Firebase Console > Authentication

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Deployment**: Vercel (recommended)

## 📝 License

MIT License - feel free to use this for your own portfolio!
