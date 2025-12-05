import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

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

    const apiKey = process.env.GOOGLE_AI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GOOGLE_AI_API_KEY is not configured' },
        { status: 500 }
      )
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: MODEL_STEP1 })

    const textPrompt = `Expand this description into a detailed architectural and interior-design prompt.

Include:
- spatial layout
- object placements
- textures and materials
- lighting style
- color palette
- rough dimensions
- artistic direction suitable for image generation

Base description: "${basePrompt}"`

    const result = await model.generateContent(textPrompt)
    const response = await result.response
    const enhancedPrompt = response.text().trim()

    return NextResponse.json({ enhancedPrompt })
  } catch (error: any) {
    console.error('Step 1 error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate enhanced prompt' },
      { status: 500 }
    )
  }
}
