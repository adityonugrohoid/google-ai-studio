# scripts/text-and-image-to-image.py
from pathlib import Path

from google import genai
from PIL import Image

script_dir = Path(__file__).resolve().parent

client = genai.Client()

prompt = (
    "Create a loose skecth version of this picturewith black and white pencil lines",
)

image_path = script_dir.parent / "input_image.png"
image = Image.open(image_path)

response = client.models.generate_content(
    model="gemini-2.5-flash-image",
    contents=[prompt, image],
)

for part in response.parts:
    if part.text is not None:
        print(part.text)
    elif part.inline_data is not None:
        image = part.as_image()
        image.save("generated_image.png")
