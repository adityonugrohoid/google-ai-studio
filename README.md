# AI Studio by AdityoLab

A Next.js web application that generates photorealistic interior design renders from simple text descriptions using Google Gemini AI. This project serves as a portfolio demonstration of AI system design, API integration, and image generation optimization.

## Project Overview

This project demonstrates advanced AI practices in building a production-ready system for interior designers. The goal is to provide a service where simple, high-quality renders can be achieved through AI solutions, eliminating the need for complex 3D modeling software.

## Key Features & System Design

### 3-Step AI Workflow

1. **Text Enhancement**: 
   - Users input simple space descriptions (e.g., "modern living room")
   - The system expands these into detailed architectural prompts
   - This enhancement ensures the sketch generation receives rich, contextual information

2. **Sketch Generation**: 
   - Creates black-and-white architectural sketches from enhanced prompts
   - Uses Google Gemini 2.5 Flash Image for fast generation

3. **Photorealistic Rendering**: 
   - Transforms sketches into high-end, V-Ray-like 3D renders
   - Utilizes Google's text-and-image to image generation function
   - **Tuned generation config** for true sketch-to-render alignment:
     - `temperature: 0.0` - Ensures deterministic, consistent outputs
     - `topP: 1.0` - Allows full vocabulary access
     - `topK: 40` - Balances creativity with accuracy

### Model Performance Analysis

- **Gemini 3 Pro Image Preview**: 
  - Delivers perfect alignment between sketch and render
  - Maintains 1:1 correspondence with input sketch
  - Production-ready for interior design services

- **Gemini 2.5 Flash Image**: 
  - Can deliver good results but with minor artifacts
  - Occasional creativity drift makes render result not 1:1 to sketch
  - Suitable for faster iterations but less precise

## Portfolio Highlights

This project demonstrates expertise in:

- **AI System Architecture**: Designing multi-step AI workflows with proper data flow
- **Google Gemini API Integration**: Advanced usage of text-to-text, text-to-image, and image-to-image models
- **Image Generation Optimization**: Fine-tuning generation parameters for production-quality outputs
- **Full-Stack Development**: Next.js, TypeScript, Tailwind CSS
- **API Design**: RESTful API routes with proper error handling
- **Production Deployment**: Vercel-optimized configuration

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Models**: 
  - `gemini-2.0-flash-lite` - Fast text enhancement
  - `gemini-2.5-flash-image` - Sketch generation
  - `gemini-3-pro-image-preview` - High-quality sketch-to-render transformation

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
│   │       └── step3/     # Render generation API (with tuned config)
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
Transforms a sketch image into a photorealistic render using optimized generation parameters.

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

**Generation Config:**
- `temperature: 0.0` - Ensures deterministic output matching the sketch
- `topP: 1.0` - Full vocabulary access for quality
- `topK: 40` - Balanced creativity and accuracy

## Usage

1. Enter a simple room description (e.g., "modern minimalist living room")
2. Click "Generate Design"
3. Watch as the AI:
   - Enhances your description with architectural details
   - Creates a conceptual sketch
   - Generates a photorealistic render with perfect sketch alignment

## Target Audience

This project is designed to provide services to **interior designers** where:
- Simple, high-quality renders can be achieved through AI
- No complex 3D modeling software required
- Fast iteration and visualization
- Professional-grade output suitable for client presentations

## Models Used

- **Step 1**: `gemini-2.0-flash-lite` - Fast text generation for prompt enhancement
- **Step 2**: `gemini-2.5-flash-image` - Efficient sketch generation from text
- **Step 3**: `gemini-3-pro-image-preview` - High-quality image-to-image transformation with perfect sketch alignment

## License

MIT

## Author

**AdityoLab** - AI System Designer & Full-Stack Developer

Portfolio project demonstrating advanced AI integration and system design.
