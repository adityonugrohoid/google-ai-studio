# AI Studio Frontend

Next.js frontend for AI Studio by AdityoLab - Interior Design Render Generation.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local and set NEXT_PUBLIC_API_URL to your backend URL
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Text to Render**: Generate renders from text descriptions
- **Sketch to Render**: Upload a sketch and generate a photorealistic render
- **Progress Tracking**: Real-time progress indicators for generation steps
- **Result Gallery**: View and download all generated renders
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Automatic dark mode support

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (state management)
- React Hot Toast (notifications)
- Framer Motion (animations)
- Lucide React (icons)

## Project Structure

```
frontend/
├── app/              # Next.js app directory
│   ├── layout.tsx   # Root layout
│   ├── page.tsx     # Home page
│   └── globals.css  # Global styles
├── components/       # React components
│   ├── GenerationForm.tsx
│   ├── ImageUpload.tsx
│   ├── ProgressIndicator.tsx
│   └── ResultGallery.tsx
└── lib/             # Utilities
    ├── api.ts       # API client
    └── store.ts     # Zustand store
```

## Build for Production

```bash
npm run build
npm start
```

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:8000)
