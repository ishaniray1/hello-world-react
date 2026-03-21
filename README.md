# Hello World · React + Firebase

A React web app with Firebase Authentication and Firestore database, built with Vite.

## Features
- Email/password sign up & sign in (Firebase Auth)
- Protected home page — only accessible when logged in
- Personal notes saved to Firestore in real-time (add & delete)
- Dark-themed, responsive UI

## Getting Started

### 1. Clone & install
```bash
git clone https://github.com/ishaniray1/hello-world-react.git
cd hello-world-react
npm install
```

### 2. Set up Firebase
1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication → Email/Password**
3. Enable **Firestore Database** (start in test mode)
4. Go to Project Settings → Your apps → Add web app → copy config

### 3. Configure environment variables
```bash
cp .env.example .env
# Fill in your Firebase values in .env
```

### 4. Run locally
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Deploy to Vercel
1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add all `VITE_FIREBASE_*` environment variables in Vercel dashboard
4. Deploy!

## Tech Stack
- [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- [Firebase 10](https://firebase.google.com/) (Auth + Firestore)
