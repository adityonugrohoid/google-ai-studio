# Project Structure

Complete overview of the AI Studio project structure.

## Directory Tree

```
google-ai-studio/
│
├── backend/                          # FastAPI Backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                   # FastAPI application entry point
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   └── routes/
│   │   │       ├── __init__.py
│   │   │       └── generate.py       # Generation API endpoints
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   └── config.py             # Application configuration
│   │   └── services/
│   │       ├── __init__.py
│   │       └── room_generator.py     # Room generation service
│   ├── pyproject.toml               # uv project configuration
│   ├── requirements.txt             # Alternative: pip requirements
│   ├── .env.example                  # Environment variables template
│   └── README.md                     # Backend documentation
│
├── frontend/                          # Next.js Frontend
│   ├── app/
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── ui/                       # UI components directory
│   │   ├── GenerationForm.tsx        # Text-to-render form
│   │   ├── ImageUpload.tsx           # Sketch upload component
│   │   ├── ProgressIndicator.tsx     # Generation progress
│   │   └── ResultGallery.tsx         # Results display
│   ├── lib/
│   │   ├── api.ts                    # API client
│   │   └── store.ts                  # Zustand state management
│   ├── package.json                  # Node.js dependencies
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── next.config.js                # Next.js configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── postcss.config.js             # PostCSS configuration
│   ├── .env.local.example            # Environment variables template
│   ├── .gitignore                    # Git ignore rules
│   └── README.md                     # Frontend documentation
│
├── src/                               # Original Python Package
│   └── google_ai_studio/
│       ├── __init__.py
│       ├── room-gen-full.py          # Original 3-step generation script
│       ├── text-to-text.py           # Text generation example
│       ├── text-to-image.py          # Text-to-image example
│       └── text-and-image-to-image.py # Image-to-image example
│
├── scripts/                           # Utility Scripts
│   ├── start-backend.sh              # Backend start script (Linux/macOS)
│   └── start-backend.ps1             # Backend start script (Windows)
│
├── outputs/                           # Generated Outputs (gitignored)
│   └── [generated images and prompts]
│
├── tests/                             # Tests
│   └── test_example.py
│
├── .gitignore                         # Git ignore rules
├── README.md                          # Main project documentation
├── SETUP.md                           # Setup instructions
├── PROJECT_STRUCTURE.md               # This file
└── pyproject.toml                     # Python project configuration
```

## Key Files Explained

### Backend

- **`app/main.py`**: FastAPI application with CORS, routes, and error handling
- **`app/api/routes/generate.py`**: API endpoints for generation
- **`app/services/room_generator.py`**: Core business logic for AI generation
- **`app/core/config.py`**: Configuration management with Pydantic

### Frontend

- **`app/page.tsx`**: Main page with tabs for text/sketch generation
- **`components/GenerationForm.tsx`**: Form for text-to-render
- **`components/ImageUpload.tsx`**: Component for sketch upload
- **`components/ProgressIndicator.tsx`**: Visual progress tracking
- **`components/ResultGallery.tsx`**: Display and download results
- **`lib/api.ts`**: API client functions
- **`lib/store.ts`**: Global state management

### Configuration

- **`backend/.env`**: Backend environment variables (API keys, CORS, etc.)
- **`frontend/.env.local`**: Frontend environment variables (API URL)
- **`pyproject.toml`**: Python package configuration
- **`package.json`**: Node.js dependencies and scripts

## Data Flow

1. **User Input** → Frontend form/upload
2. **API Request** → Frontend calls backend API
3. **Service Layer** → Backend service processes request
4. **AI Generation** → Google Gemini AI generates images
5. **Response** → Base64 encoded images returned
6. **Display** → Frontend shows results in gallery

## Technology Stack

### Backend
- FastAPI (web framework)
- Google Gemini AI (image generation)
- PIL/Pillow (image processing)
- Pydantic (data validation)

### Frontend
- Next.js 14 (React framework)
- TypeScript (type safety)
- Tailwind CSS (styling)
- Zustand (state management)
- React Hot Toast (notifications)
- Framer Motion (animations)

## Development Workflow

1. **Backend Development**: Edit files in `backend/app/`
2. **Frontend Development**: Edit files in `frontend/app/` and `frontend/components/`
3. **Testing**: Run backend with `uvicorn`, frontend with `npm run dev`
4. **Deployment**: Follow deployment guides in README.md
