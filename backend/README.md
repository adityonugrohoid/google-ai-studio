# AI Studio Backend API

FastAPI backend for AI Studio by AdityoLab - Interior Design Render Generation.

## Setup

1. **Install dependencies using uv:**
   ```bash
   cd backend
   uv sync
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env and add your Google AI API key
   # Set GOOGLE_API_KEY=your_api_key_here
   ```

3. **Run the server:**
   ```bash
   uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

   Or use the main file:
   ```bash
   uv run python -m app.main
   ```

## API Endpoints

### Health Check
- `GET /` - Root endpoint
- `GET /api/health` - Health check

### Generation
- `POST /api/generate` - Generate render from text prompt
  ```json
  {
    "prompt": "modern living room",
    "return_intermediates": true
  }
  ```

- `POST /api/generate-from-sketch` - Generate render from uploaded sketch
  - Form data: `file` (image), optional `custom_prompt` (string)

## API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Environment Variables

- `GOOGLE_AI_API_KEY` - Your Google AI Studio API key (required)
- `CORS_ORIGINS` - Comma-separated list of allowed origins
- `MODEL_STEP1`, `MODEL_STEP2`, `MODEL_STEP3` - Model names (optional)
