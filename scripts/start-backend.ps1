# Quick start script for backend (Windows PowerShell, using uv)

Set-Location backend

# Install dependencies using uv
Write-Host "Syncing dependencies with uv..."
uv sync

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "Warning: .env file not found. Copying from .env.example..."
    Copy-Item .env.example .env
    Write-Host "Please edit .env and add your GOOGLE_API_KEY"
}

# Run the server
Write-Host "Starting backend server..."
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
