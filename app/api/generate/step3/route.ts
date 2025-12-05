import { NextRequest, NextResponse } from 'next/server'

const MODEL_STEP3 = 'gemini-2.5-flash-image'

export async function POST(request: NextRequest) {
  try {
    const { sketchImageData } = await request.json()

    if (!sketchImageData) {
      return NextResponse.json(
        { error: 'Sketch image is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GOOGLE_AI_API_KEY is not configured' },
        { status: 500 }
      )
    }

    const renderPrompt = (
      'Transform this into a high-end 3D render. ' +
      'Style: photorealistic architectural visualization (archviz). ' +
      'Ultra-high resolution textures, ray-traced lighting, soft shadows, volumetric light, ' +
      'realistic reflections, micro-surface details, natural color grading, and lens effects.'
    )

    // Extract base64 data from data URL
    const base64Data = sketchImageData.split(',')[1]

    // Use REST API for image-to-image generation
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_STEP3}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: renderPrompt,
                },
                {
                  inlineData: {
                    data: base64Data,
                    mimeType: 'image/png',
                  },
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.0,
            topP: 1.0,
            topK: 40,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || 'Failed to generate render')
    }

    const data = await response.json()

    // Extract image from response
    const generatedImagePart = data.candidates?.[0]?.content?.parts?.find(
      (part: any) => part.inlineData
    )

    if (!generatedImagePart?.inlineData) {
      return NextResponse.json(
        { error: 'No rendered image generated' },
        { status: 500 }
      )
    }

    // Return base64 image data
    const imageData = generatedImagePart.inlineData.data
    const mimeType = generatedImagePart.inlineData.mimeType || 'image/png'

    return NextResponse.json({
      imageData: `data:${mimeType};base64,${imageData}`,
    })
  } catch (error: any) {
    console.error('Step 3 error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate render' },
      { status: 500 }
    )
  }
}
