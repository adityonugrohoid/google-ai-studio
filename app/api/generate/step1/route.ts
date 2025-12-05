import { NextRequest, NextResponse } from 'next/server'

const MODEL_STEP1 = 'gemini-2.0-flash-lite'

export async function POST(request: NextRequest) {
  try {
    const { basePrompt } = await request.json()

    if (!basePrompt) {
      return NextResponse.json(
        { error: 'Base prompt is required' },
        { status: 400 }
      )
    }

    // Truncate basePrompt to first 200 words to prevent abuse
    const words = basePrompt.trim().split(/\s+/)
    const maxWords = 200
    const truncatedPrompt = words.length > maxWords 
      ? words.slice(0, maxWords).join(' ') + '...'
      : basePrompt

    const apiKey = process.env.GOOGLE_AI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GOOGLE_AI_API_KEY is not configured' },
        { status: 500 }
      )
    }

    const textPrompt = (
      'Expand this room description into 1-2 short sentences with key details. Be very brief (under 20 words).\n\n' +
      `Room: ${truncatedPrompt}`
    )

    // Use REST API for consistent format and token limits
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_STEP1}:generateContent?key=${apiKey}`,
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
                  text: textPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 50,
            temperature: 0.7,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || 'Failed to generate enhanced prompt')
    }

    const data = await response.json()
    const enhancedPrompt = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || ''

    if (!enhancedPrompt) {
      return NextResponse.json(
        { error: 'No enhanced prompt generated' },
        { status: 500 }
      )
    }

    return NextResponse.json({ enhancedPrompt })
  } catch (error: any) {
    console.error('Step 1 error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate enhanced prompt' },
      { status: 500 }
    )
  }
}
