#!/bin/bash
# Quick start script for backend (using uv)

cd backend

# Install dependencies using uv
echo "Syncing dependencies with uv..."
uv sync

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Warning: .env file not found. Copying from .env.example..."
    cp .env.example .env
    echo "Please edit .env and add your GOOGLE_API_KEY"
fi

# Run the server
echo "Starting backend server..."
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
