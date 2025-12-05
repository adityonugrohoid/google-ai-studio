"""Application configuration"""

from typing import Optional

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings"""

    # API Configuration
    api_title: str = "AI Studio API"
    api_version: str = "1.0.0"
    api_prefix: str = "/api"

    # CORS Configuration
    cors_origins: list[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
    ]

    # Google AI Configuration
    # Note: The genai.Client() reads from GOOGLE_API_KEY or GEMINI_API_KEY environment variable
    # You can also set it here, but environment variable is recommended
    google_ai_api_key: Optional[str] = None

    # Model Configuration
    model_step1: str = "gemini-2.0-flash-lite"  # text enhancement
    model_step2: str = "gemini-2.5-flash-image"  # sketch generation
    model_step3: str = "gemini-3-pro-image-preview"  # main render

    # Output Configuration
    output_dir: str = "outputs"

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
