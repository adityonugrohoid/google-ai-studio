"""Generation API routes"""

from io import BytesIO
from typing import Optional

from fastapi import APIRouter, File, HTTPException, UploadFile
from PIL import Image
from pydantic import BaseModel, Field

from app.services.room_generator import RoomGeneratorService

router = APIRouter()
service = RoomGeneratorService()


class GenerateRequest(BaseModel):
    """Request model for text-to-render generation"""

    prompt: str = Field(
        ..., description="Simple room description", min_length=1, max_length=500
    )
    return_intermediates: bool = Field(
        True, description="Return sketch and enhanced prompt"
    )


class GenerateFromSketchRequest(BaseModel):
    """Request model for sketch-to-render generation"""

    custom_prompt: Optional[str] = Field(
        None, description="Custom rendering prompt", max_length=500
    )


@router.post("/generate")
async def generate_room(request: GenerateRequest):
    """
    Generate a photorealistic room render from a text prompt.

    This endpoint performs a 3-step process:
    1. Enhances the text prompt with architectural details
    2. Generates a black-and-white sketch
    3. Transforms the sketch into a photorealistic render
    """
    try:
        result = await service.generate_room(
            request.prompt, request.return_intermediates
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")


@router.post("/generate-from-sketch")
async def generate_from_sketch(
    file: UploadFile = File(...), custom_prompt: Optional[str] = None
):
    """
    Generate a photorealistic render from an uploaded sketch image.

    Accepts an image file (PNG, JPEG) and optionally a custom rendering prompt.
    """
    try:
        # Validate file type
        if not file.content_type or not file.content_type.startswith("image/"):
            raise HTTPException(
                status_code=400, detail="File must be an image (PNG, JPEG, etc.)"
            )

        # Read and convert to PIL Image
        image_data = await file.read()
        sketch_image = Image.open(BytesIO(image_data))

        # Generate render
        result = await service.generate_from_sketch(sketch_image, custom_prompt)

        return {"success": True, "data": result}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")


@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "AI Studio API"}
