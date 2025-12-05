import { NextRequest, NextResponse } from 'next/server'

const MODEL_STEP2 = 'gemini-2.5-flash-image'

export async function POST(request: NextRequest) {
  try {
    const { enhancedPrompt } = await request.json()

    if (!enhancedPrompt) {
      return NextResponse.json(
        { error: 'Enhanced prompt is required' },
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

    const sketchGenerationPrompt = (
      'Create a pure black-and-white architectural sketch. ' +
      'Use only black pencil lines on white background. No colors, no gray shades. ' +
      'Emphasize contour lines, perspective depth, and object boundaries.\n\n' +
      enhancedPrompt
    )

    // Use REST API for image generation models
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_STEP2}:generateContent?key=${apiKey}`,
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
                  text: sketchGenerationPrompt,
                },
              ],
            },
          ],
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || 'Failed to generate sketch')
    }

    const data = await response.json()

    // Extract image from response
    const imagePart = data.candidates?.[0]?.content?.parts?.find(
      (part: any) => part.inlineData
    )

    if (!imagePart?.inlineData) {
      return NextResponse.json(
        { error: 'No image generated' },
        { status: 500 }
      )
    }

    // Return base64 image data
    const imageData = imagePart.inlineData.data
    const mimeType = imagePart.inlineData.mimeType || 'image/png'

    return NextResponse.json({
      imageData: `data:${mimeType};base64,${imageData}`,
    })
  } catch (error: any) {
    console.error('Step 2 error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate sketch' },
      { status: 500 }
    )
  }
}
