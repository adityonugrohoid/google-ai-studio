# scripts/room-gen-full.py
# Terminal-mode chained workflow:
# 1) text → enhanced text
# 2) enhanced text → sketch image
# 3) sketch image → rendered image

from datetime import datetime
from pathlib import Path

from google import genai
from google.genai import types
from PIL import Image

# ============================================================
# Setup
# ============================================================

client = genai.Client()
root_dir = Path(__file__).resolve().parent

# ── Timestamp (prefix for perfect chronological sorting) ──
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

# ── Model names used in each step (update only here if you change models) ──
MODEL_STEP1 = "gemini-2.0-flash-lite"  # text enhancement
MODEL_STEP2 = "gemini-2.5-flash-image"  # sketch generation
MODEL_STEP3 = "gemini-3-pro-image-preview"  # main render

# ── Output paths: timestamp + model + descriptive name ──
# Example result:
# 20251205_152301_gemini-2.0-flash-lite_step1_prompt.txt
# 20251205_152301_gemini-2.0-flash-preview-image-generation_step2_sketch.png
# etc.

prompt_text_path = root_dir / f"{timestamp}_{MODEL_STEP1}_step1_prompt.txt"
sketch_path = root_dir / f"{timestamp}_{MODEL_STEP2}_step2_sketch.png"
render_path = root_dir / f"{timestamp}_{MODEL_STEP3}_step3_render.png"

# ============================================================
# 1) Ask for user input → Generate expanded architectural prompt
# ============================================================

base_prompt = input("Enter a simple room description (e.g. 'modern living room'): ")

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

print("\n[1] Generating detailed description…\n")

response1 = client.models.generate_content(
    model=MODEL_STEP1,
    contents=text_prompt,
    config=types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(thinking_budget=0)
    ),
)

enhanced_prompt = response1.text.strip()
print(enhanced_prompt)
prompt_text_path.write_text(enhanced_prompt, encoding="utf-8")

print(f"\nSaved detailed prompt → {prompt_text_path}\n")

# ============================================================
# 2) Enhanced text → Generate sketch image
# ============================================================

sketch_generation_prompt = (
    "Create a pure black-and-white architectural sketch. "
    "Use only black pencil lines on white background. No colors, no gray shades. "
    "Emphasize contour lines, perspective depth, and object boundaries.\n\n"
    + enhanced_prompt
)

print("[2] Generating sketch image…\n")

response2 = client.models.generate_content(
    model=MODEL_STEP2,
    contents=[sketch_generation_prompt],
)

sketch_img = None
for part in response2.parts:
    if part.inline_data is not None:
        sketch_img = part.as_image()

if sketch_img is None:
    raise RuntimeError("Sketch image not generated.")

sketch_img.save(sketch_path)
print(f"Saved sketch → {sketch_path}\n")

# ============================================================
# 3) Sketch image → Final rendered version
# ============================================================

print("[3] Generating rendered image from sketch…\n")

sketch_img_loaded = Image.open(sketch_path)

render_prompt = (
    "Transform this into a high-end 3D render. "
    "Style: photorealistic architectural visualization (archviz). "
    "Ultra-high resolution textures, ray-traced lighting, soft shadows, volumetric light, "
    "realistic reflections, micro-surface details, natural color grading, and lens effects."
)

response3 = client.models.generate_content(
    model=MODEL_STEP3,
    contents=[render_prompt, sketch_img_loaded],
    config=types.GenerateContentConfig(
        temperature=0.0,  # Maximum determinism → razor-sharp edges, perfect material consistency
        top_p=1.0,  # Allows full probability distribution (required when temp=0.0)
        top_k=40,  # Max obedient generation
    ),
)

render_img = None
for part in response3.parts:
    if part.inline_data is not None:
        render_img = part.as_image()

if render_img is None:
    raise RuntimeError("Rendered image not generated.")

render_img.save(render_path)
print(f"Saved final photorealistic rendered image → {render_path}\n")

print("Done.")
