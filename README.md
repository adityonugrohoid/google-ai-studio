# AI Studio by AdityoLab

A Next.js web application that generates photorealistic interior design renders from simple text descriptions using Google Gemini AI.

## Features

- **3-Step AI Workflow:**
  1. **Text Enhancement**: Expands simple descriptions into detailed architectural prompts
  2. **Sketch Generation**: Creates black-and-white architectural sketches
  3. **Photorealistic Rendering**: Transforms sketches into high-end 3D renders

- **Modern UI**: Beautiful, responsive interface with Tailwind CSS
- **Vercel Ready**: Optimized for deployment on Vercel

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini AI (Gemini 2.0 Flash Lite, Gemini 2.5 Flash Image, Gemini 3 Pro Image Preview)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google AI Studio API key ([Get one here](https://aistudio.google.com/apikey))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd google-ai-studio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
GOOGLE_AI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1. Push your code to GitHub/GitLab/Bitbucket

2. Import your repository in [Vercel](https://vercel.com)

3. Add your environment variable:
   - Go to Project Settings → Environment Variables
   - Add `GOOGLE_AI_API_KEY` with your API key value

4. Deploy! Vercel will automatically build and deploy your application.

## Project Structure

```
.
├── app/
│   ├── api/
│   │   └── generate/
│   │       ├── step1/     # Text enhancement API
│   │       ├── step2/     # Sketch generation API
│   │       └── step3/     # Render generation API
│   ├── globals.css        # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page component
├── public/                # Static assets
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## API Routes

### POST `/api/generate/step1`
Enhances a simple text description into a detailed architectural prompt.

**Request:**
```json
{
  "basePrompt": "modern living room"
}
```

**Response:**
```json
{
  "enhancedPrompt": "Detailed architectural description..."
}
```

### POST `/api/generate/step2`
Generates a black-and-white architectural sketch from an enhanced prompt.

**Request:**
```json
{
  "enhancedPrompt": "Detailed architectural description..."
}
```

**Response:**
```json
{
  "imageData": "data:image/png;base64,..."
}
```

### POST `/api/generate/step3`
Transforms a sketch image into a photorealistic render.

**Request:**
```json
{
  "sketchImageData": "data:image/png;base64,..."
}
```

**Response:**
```json
{
  "imageData": "data:image/png;base64,..."
}
```

## Usage

1. Enter a simple room description (e.g., "modern minimalist living room")
2. Click "Generate Design"
3. Watch as the AI:
   - Enhances your description
   - Creates a conceptual sketch
   - Generates a photorealistic render

## Models Used

- **Step 1**: `gemini-2.0-flash-lite` - Fast text generation
- **Step 2**: `gemini-2.5-flash-image` - Image generation from text
- **Step 3**: `gemini-3-pro-image-preview` - High-quality image-to-image transformation

## License

MIT

## Author

AdityoLab
