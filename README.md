# AI Studio by AdityoLab

Generate photorealistic high-end interior design renders from sketch images using Google Gemini AI.

![AI Studio](https://img.shields.io/badge/AI-Studio-blue)
![Python](https://img.shields.io/badge/Python-3.9+-blue)
![uv](https://img.shields.io/badge/uv-Package%20Manager-orange)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green)

## 🎨 Features

- **Text to Render**: Describe your interior design vision and generate photorealistic renders
- **Sketch to Render**: Upload a sketch image and transform it into a high-end 3D render
- **3-Step Generation Process**:
  1. Text enhancement with architectural details
  2. Black-and-white sketch generation
  3. Photorealistic render creation
- **Real-time Progress Tracking**: See each step of the generation process
- **Result Gallery**: View and download all your generated renders
- **Modern UI**: Beautiful, responsive interface with dark mode support

## 🏗️ Architecture

### Backend (FastAPI)
- **Location**: `backend/`
- **Technology**: Python 3.9+, FastAPI, Google Gemini AI
- **Features**:
  - RESTful API endpoints
  - Image processing with PIL
  - Base64 image encoding for JSON responses
  - CORS configuration
  - Error handling

### Frontend (Next.js)
- **Location**: `frontend/`
- **Technology**: Next.js 14, TypeScript, Tailwind CSS, Zustand
- **Features**:
  - Server-side rendering
  - Responsive design
  - Real-time state management
  - Image upload and preview
  - Progress indicators

### Core Library
- **Location**: `src/google_ai_studio/`
- Original Python scripts for AI generation
- Used by the FastAPI backend service layer

## 🚀 Quick Start

### Prerequisites

- Python 3.9 or higher
- Node.js 18 or higher
- Google AI Studio API key ([Get one here](https://aistudio.google.com/apikey))

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies using uv:**
   ```bash
   uv sync
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env and add your GOOGLE_API_KEY
   ```

4. **Run the backend server:**
   ```bash
   uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

   The API will be available at `http://localhost:8000`
   - API Docs: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local and set NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   The frontend will be available at `http://localhost:3000`

## 📁 Project Structure

```
google-ai-studio/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/      # API endpoints
│   │   ├── core/            # Configuration
│   │   ├── services/        # Business logic
│   │   └── main.py          # FastAPI app
│   ├── pyproject.toml          # uv project configuration
│   └── requirements.txt        # Alternative: pip requirements
│   └── README.md
│
├── frontend/                # Next.js frontend
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   ├── lib/                 # Utilities
│   ├── package.json
│   └── README.md
│
├── src/
│   └── google_ai_studio/    # Original Python scripts
│       ├── room-gen-full.py
│       └── ...
│
└── README.md                # This file
```

## 🔧 API Endpoints

### Generation Endpoints

- **POST `/api/generate`** - Generate render from text prompt
  ```json
  {
    "prompt": "modern living room",
    "return_intermediates": true
  }
  ```

- **POST `/api/generate-from-sketch`** - Generate render from uploaded sketch
  - Form data: `file` (image), optional `custom_prompt` (string)

### Utility Endpoints

- **GET `/api/health`** - Health check
- **GET `/`** - API information

## 🎯 Usage Examples

### Text to Render

1. Open the frontend at `http://localhost:3000`
2. Select "Text to Render" tab
3. Enter a description like: "modern living room with large windows"
4. Click "Generate Render"
5. Wait for the 3-step process to complete
6. View and download your render

### Sketch to Render

1. Select "Sketch to Render" tab
2. Upload a sketch image (PNG, JPEG, etc.)
3. Optionally add a custom rendering prompt
4. Click "Generate from Sketch"
5. View and download your render

## 🛠️ Development

### Backend Development

```bash
cd backend
# Install dependencies
uv sync

# Run with auto-reload
uv run uvicorn app.main:app --reload
```

### Frontend Development

```bash
cd frontend
# Install dependencies
npm install

# Run development server
npm run dev
```

## 📦 Deployment

### Backend Deployment

The FastAPI backend can be deployed to:
- **Railway**: Easy Python deployment
- **Render**: Free tier available
- **Fly.io**: Global edge deployment
- **Docker**: Containerize and deploy anywhere

Example Dockerfile (using uv):
```dockerfile
FROM python:3.11-slim
WORKDIR /app

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# Copy project files
COPY backend/pyproject.toml backend/uv.lock* ./
COPY backend/ ./backend/

# Install dependencies
RUN uv sync --frozen

# Run the application
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Or using traditional pip:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend/ .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Frontend Deployment

The Next.js frontend can be deployed to:
- **Vercel**: Recommended (made by Next.js creators)
- **Netlify**: Easy deployment
- **Cloudflare Pages**: Fast global CDN

## 🔐 Environment Variables

### Backend (.env)
```env
GOOGLE_API_KEY=your_api_key_here
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
MODEL_STEP1=gemini-2.0-flash-lite
MODEL_STEP2=gemini-2.5-flash-image
MODEL_STEP3=gemini-3-pro-image-preview
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 👤 Author

**Adityo Nugroho**
- Email: adityo.nugroho.id@gmail.com
- GitHub: [@adityonugrohoid](https://github.com/adityonugrohoid)

## 🙏 Acknowledgments

- Google Gemini AI for the powerful image generation models
- FastAPI for the excellent Python web framework
- Next.js for the amazing React framework
- All the open-source contributors

---

Made with ❤️ by AdityoLab
