"""Room generation service using Google Gemini AI"""

import base64
from io import BytesIO
from typing import Optional

from google import genai
from google.genai import types
from PIL import Image

from app.core.config import settings


class RoomGeneratorService:
    """Service for generating interior design renders from text prompts"""

    def __init__(self):
        """Initialize the service with Google AI client"""
        # Google genai.Client() reads API key from GOOGLE_API_KEY or GEMINI_API_KEY env var
        # Or you can pass it explicitly: genai.Client(api_key=settings.google_ai_api_key)
        self.client = genai.Client()
        self.model_step1 = settings.model_step1
        self.model_step2 = settings.model_step2
        self.model_step3 = settings.model_step3

    async def generate_room(
        self, base_prompt: str, return_intermediates: bool = True
    ) -> dict:
        """
        Generate a photorealistic room render from a text prompt.

        Args:
            base_prompt: Simple room description (e.g., "modern living room")
            return_intermediates: Whether to return sketch and enhanced prompt

        Returns:
            Dictionary containing:
            - enhanced_prompt: Detailed architectural prompt
            - sketch: Base64 encoded sketch image (if return_intermediates)
            - render: Base64 encoded final render
        """
        # Step 1: Enhance text prompt
        enhanced_prompt = await self._enhance_prompt(base_prompt)

        # Step 2: Generate sketch
        sketch_image = await self._generate_sketch(enhanced_prompt)

        # Step 3: Generate render
        render_image = await self._generate_render(sketch_image)

        result = {
            "enhanced_prompt": enhanced_prompt,
            "render": self._image_to_base64(render_image),
        }

        if return_intermediates:
            result["sketch"] = self._image_to_base64(sketch_image)

        return result

    async def generate_from_sketch(
        self, sketch_image: Image.Image, custom_prompt: Optional[str] = None
    ) -> dict:
        """
        Generate render from an uploaded sketch image.

        Args:
            sketch_image: PIL Image object of the sketch
            custom_prompt: Optional custom prompt for rendering

        Returns:
            Dictionary with base64 encoded render
        """
        render_image = await self._generate_render(sketch_image, custom_prompt)

        return {
            "render": self._image_to_base64(render_image),
        }

    async def _enhance_prompt(self, base_prompt: str) -> str:
        """Step 1: Expand simple description into detailed architectural prompt"""
        text_prompt = f"""
Expand this description into a detailed architectural and interior-design prompt.

Include:
- spatial layout
- object placements
- textures and materials
- lighting style
- color palette
- rough dimensions
- artistic direction suitable for image generation

Base description: "{base_prompt}"
"""

        # Run blocking call in thread pool to avoid blocking event loop
        response = await asyncio.to_thread(
            self.client.models.generate_content,
            model=self.model_step1,
            contents=text_prompt,
            config=types.GenerateContentConfig(
                thinking_config=types.ThinkingConfig(thinking_budget=0)
            ),
        )

        return response.text.strip()

    async def _generate_sketch(self, enhanced_prompt: str) -> Image.Image:
        """Step 2: Generate black-and-white sketch from enhanced prompt"""
        sketch_generation_prompt = (
            "Create a pure black-and-white architectural sketch. "
            "Use only black pencil lines on white background. No colors, no gray shades. "
            "Emphasize contour lines, perspective depth, and object boundaries.\n\n"
            + enhanced_prompt
        )

        # Run blocking call in thread pool to avoid blocking event loop
        response = await asyncio.to_thread(
            self.client.models.generate_content,
            model=self.model_step2,
            contents=[sketch_generation_prompt],
        )

        sketch_img = None
        for part in response.parts:
            if part.inline_data is not None:
                sketch_img = part.as_image()

        if sketch_img is None:
            raise RuntimeError("Sketch image not generated.")

        return sketch_img

    async def _generate_render(
        self, sketch_image: Image.Image, custom_prompt: Optional[str] = None
    ) -> Image.Image:
        """Step 3: Transform sketch into photorealistic render"""
        render_prompt = custom_prompt or (
            "Transform this into a high-end 3D render. "
            "Style: photorealistic architectural visualization (archviz). "
            "Ultra-high resolution textures, ray-traced lighting, soft shadows, volumetric light, "
            "realistic reflections, micro-surface details, natural color grading, and lens effects."
        )

        # Run blocking call in thread pool to avoid blocking event loop
        response = await asyncio.to_thread(
            self.client.models.generate_content,
            model=self.model_step3,
            contents=[render_prompt, sketch_image],
            config=types.GenerateContentConfig(
                temperature=0.0,  # Maximum determinism
                top_p=1.0,
                top_k=40,
            ),
        )

        render_img = None
        for part in response.parts:
            if part.inline_data is not None:
                render_img = part.as_image()

        if render_img is None:
            raise RuntimeError("Rendered image not generated.")

        return render_img

    def _image_to_base64(self, image: Image.Image) -> str:
        """Convert PIL Image to base64 string for JSON response"""
        buffered = BytesIO()
        image.save(buffered, format="PNG")
        return base64.b64encode(buffered.getvalue()).decode("utf-8")

    def _base64_to_image(self, base64_string: str) -> Image.Image:
        """Convert base64 string to PIL Image"""
        image_data = base64.b64decode(base64_string)
        return Image.open(BytesIO(image_data))