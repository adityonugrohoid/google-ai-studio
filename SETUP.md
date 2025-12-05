# Setup Guide

Complete setup instructions for AI Studio by AdityoLab.

## Prerequisites

- **Python 3.9+** - [Download](https://www.python.org/downloads/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Google AI Studio API Key** - [Get one here](https://aistudio.google.com/apikey)

## Step-by-Step Setup

### 1. Clone or Navigate to Project

```bash
cd google-ai-studio
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies using uv
uv sync

# Set up environment variables
cp .env.example .env

# Edit .env file and add your Google API key
# The genai library reads from GOOGLE_API_KEY or GEMINI_API_KEY
# So set one of these:
# GOOGLE_API_KEY=your_actual_api_key_here
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Set up environment variables
cp .env.local.example .env.local

# Edit .env.local and ensure:
# NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Run the Application

#### Terminal 1 - Backend

```bash
cd backend
# Run with uv:
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: http://localhost:8000
API Documentation: http://localhost:8000/docs

#### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
# or
yarn dev
# or
pnpm dev
```

Frontend will be available at: http://localhost:3000

### 5. Verify Setup

1. Open http://localhost:3000 in your browser
2. You should see the AI Studio interface
3. Try generating a render with a simple prompt like "modern living room"
4. Check the browser console and backend logs for any errors

## Troubleshooting

### Backend Issues

**Problem**: `ModuleNotFoundError: No module named 'google'`
- **Solution**: Make sure you've installed dependencies: `uv sync` in the backend directory

**Problem**: `API key not found`
- **Solution**: Set the `GOOGLE_API_KEY` or `GEMINI_API_KEY` environment variable

**Problem**: `CORS error` in browser
- **Solution**: Make sure `CORS_ORIGINS` in backend `.env` includes your frontend URL

### Frontend Issues

**Problem**: `Cannot connect to API`
- **Solution**:
  1. Check that backend is running on port 8000
  2. Verify `NEXT_PUBLIC_API_URL` in `.env.local` is correct
  3. Check browser console for CORS errors

**Problem**: `Module not found` errors
- **Solution**: Run `npm install` again in the frontend directory

### API Key Issues

**Problem**: Generation fails with authentication error
- **Solution**:
  1. Verify your API key is correct
  2. Check that the environment variable is set correctly
  3. Make sure the API key has the necessary permissions

## Environment Variables Reference

### Backend (.env)

```env
# Required
GOOGLE_API_KEY=your_api_key_here

# Optional
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
MODEL_STEP1=gemini-2.0-flash-lite
MODEL_STEP2=gemini-2.5-flash-image
MODEL_STEP3=gemini-3-pro-image-preview
```

### Frontend (.env.local)

```env
# Required
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Next Steps

- Read the main [README.md](README.md) for usage instructions
- Check [backend/README.md](backend/README.md) for API details
- Check [frontend/README.md](frontend/README.md) for frontend details

## Production Deployment

See the main README.md for deployment instructions to:
- Railway, Render, or Fly.io (backend)
- Vercel, Netlify, or Cloudflare Pages (frontend)
