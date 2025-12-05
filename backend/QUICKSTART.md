# Quick Start Guide

## Using uv (Recommended)

Since this project uses `uv` for Python environment and dependency management, setup is simple:

### 1. Install Dependencies

```bash
cd backend
uv sync
```

This will:
- Create a virtual environment automatically
- Install all dependencies from `pyproject.toml`
- Set up everything you need

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env and add: GOOGLE_API_KEY=your_api_key_here
```

### 3. Run the Server

```bash
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

That's it! The server will be available at http://localhost:8000

## Alternative: Using pip (Not Recommended)

If you prefer traditional pip/venv:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Running Commands with uv

- `uv run <command>` - Run any command in the virtual environment
- `uv sync` - Install/update dependencies
- `uv add <package>` - Add a new dependency
- `uv remove <package>` - Remove a dependency

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
