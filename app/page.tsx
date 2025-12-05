'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

type Step = 'input' | 'step1' | 'step2' | 'step3' | 'complete'

export default function Home() {
  const [basePrompt, setBasePrompt] = useState('')
  const [enhancedPrompt, setEnhancedPrompt] = useState('')
  const [sketchImage, setSketchImage] = useState<string | null>(null)
  const [renderImage, setRenderImage] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<Step>('input')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!basePrompt.trim()) return

    setLoading(true)
    setError(null)
    setCurrentStep('step1')
    setEnhancedPrompt('')
    setSketchImage(null)
    setRenderImage(null)

    try {
      // Step 1: Generate enhanced prompt
      const step1Response = await fetch('/api/generate/step1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ basePrompt }),
      })

      if (!step1Response.ok) {
        const errorData = await step1Response.json()
        throw new Error(errorData.error || 'Step 1 failed')
      }

      const step1Data = await step1Response.json()
      setEnhancedPrompt(step1Data.enhancedPrompt)
      setCurrentStep('step2')

      // Step 2: Generate sketch
      const step2Response = await fetch('/api/generate/step2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enhancedPrompt: step1Data.enhancedPrompt }),
      })

      if (!step2Response.ok) {
        const errorData = await step2Response.json()
        throw new Error(errorData.error || 'Step 2 failed')
      }

      const step2Data = await step2Response.json()
      setSketchImage(step2Data.imageData)
      setCurrentStep('step3')

      // Step 3: Generate render
      const step3Response = await fetch('/api/generate/step3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sketchImageData: step2Data.imageData }),
      })

      if (!step3Response.ok) {
        const errorData = await step3Response.json()
        throw new Error(errorData.error || 'Step 3 failed')
      }

      const step3Data = await step3Response.json()
      setRenderImage(step3Data.imageData)
      setCurrentStep('complete')
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      setCurrentStep('input')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setBasePrompt('')
    setEnhancedPrompt('')
    setSketchImage(null)
    setRenderImage(null)
    setCurrentStep('input')
    setError(null)
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-secondary/90 backdrop-blur-md shadow-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-mono font-bold text-primary tracking-wider">
            AI Studio
          </a>
          <div className="text-sm text-gray-400">by AdityoLab</div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6 border border-primary/20">
            <span className="text-primary font-mono font-bold text-sm tracking-wider">AI Powered 3D Design Rendering</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-mono font-bold text-primary mb-6 leading-tight tracking-tight text-center">
            Transform Vision Into
            <span className="text-white block">Photorealistic Renders</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 font-sans max-w-2xl mx-auto tracking-wide">
            Describe your dream space and watch as AI generates a conceptual sketch, then transforms it into a high-end photorealistic render.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Input Section */}
          <div className="bg-neutral rounded-2xl p-8 border border-white/10 mb-12">
            <label className="block text-primary font-mono font-bold mb-4 text-lg tracking-wide">
              Describe Your Dream Space
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={basePrompt}
                onChange={(e) => setBasePrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !loading && handleGenerate()}
                placeholder="e.g., Modern minimalist living room with large windows, neutral colors, and Scandinavian furniture..."
                className="flex-1 px-6 py-4 bg-secondary rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-500 border border-white/10 font-sans tracking-wide"
                disabled={loading}
              />
              <button
                onClick={handleGenerate}
                disabled={loading || !basePrompt.trim()}
                className="px-8 py-4 bg-primary text-secondary font-mono font-bold rounded-xl hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg whitespace-nowrap tracking-wider"
              >
                {loading ? 'Generating...' : 'Generate Design'}
              </button>
            </div>
            {error && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-300">
                {error}
              </div>
            )}
          </div>

          {/* Progress Steps */}
          {currentStep !== 'input' && (
            <div className="mb-12">
              <div className="flex items-center justify-between max-w-4xl mx-auto mb-8 px-8">
                {[
                  {
                    step: 'step1',
                    label: 'Enhanced Prompt',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )
                  },
                  {
                    step: 'step2',
                    label: 'Sketch',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    )
                  },
                  {
                    step: 'step3',
                    label: 'Render',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )
                  },
                ].map((item, index) => {
                  const isActive =
                    currentStep === item.step ||
                    (item.step === 'step1' && ['step2', 'step3', 'complete'].includes(currentStep)) ||
                    (item.step === 'step2' && ['step3', 'complete'].includes(currentStep)) ||
                    (item.step === 'step3' && currentStep === 'complete')
                  const isCurrent = currentStep === item.step

                  return (
                    <div key={item.step} className="flex flex-col items-center flex-1 relative z-10">
                      <div className={`flex flex-col items-center w-full ${isActive ? 'text-primary' : 'text-gray-600'}`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                          isCurrent
                            ? 'bg-primary border-primary animate-pulse'
                            : isActive
                            ? 'bg-primary/20 border-primary'
                            : 'bg-neutral border-gray-600'
                        } ${isCurrent ? 'text-secondary' : isActive ? 'text-primary' : 'text-gray-600'}`}>
                          {item.icon}
                        </div>
                        <span className="mt-2 text-sm font-mono font-medium tracking-wide">{item.label}</span>
                      </div>
                      {index < 2 && (
                        <div className="absolute left-1/2 top-6 w-full h-0.5 flex items-center" style={{ width: 'calc(100% - 3rem)', left: 'calc(50% + 1.5rem)' }}>
                          <div className={`w-full h-0.5 ${isActive ? 'bg-primary' : 'bg-gray-600'}`} />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Enhanced Prompt Card - Always Visible */}
          <div className="mb-8">
            <div className="bg-neutral rounded-2xl overflow-hidden border border-white/10">
              <div className="bg-secondary border-b border-white/10 p-4">
                <h3 className="text-primary font-mono font-bold flex items-center gap-2 tracking-wide">
                  <span className="font-mono">[PROMPT]</span> Enhanced
                </h3>
              </div>
              <div className="p-6">
                {currentStep === 'input' && !enhancedPrompt ? (
                  <p className="text-gray-400 text-sm font-sans tracking-wide">
                    This will display the AI-enhanced architectural prompt generated from your description, including spatial layout, materials, lighting, and design details.
                  </p>
                ) : loading && currentStep === 'step1' ? (
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <p className="text-sm font-sans tracking-wide">[PROCESSING] Generating enhanced prompt...</p>
                  </div>
                ) : enhancedPrompt ? (
                  <div className="max-h-[80px] overflow-y-auto pr-2 custom-scrollbar">
                    <div className="prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => <h1 className="text-primary font-mono font-bold text-lg mb-3 mt-4 first:mt-0">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-primary font-mono font-bold text-base mb-2 mt-3 first:mt-0">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-primary font-mono font-semibold text-sm mb-2 mt-2 first:mt-0">{children}</h3>,
                          p: ({ children }) => <p className="text-gray-300 text-sm font-sans tracking-wide mb-3 leading-relaxed">{children}</p>,
                          strong: ({ children }) => <strong className="text-primary font-semibold">{children}</strong>,
                          em: ({ children }) => <em className="text-gray-400 italic">{children}</em>,
                          ul: ({ children }) => <ul className="list-disc list-inside text-gray-300 text-sm font-sans mb-3 space-y-1">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside text-gray-300 text-sm font-sans mb-3 space-y-1">{children}</ol>,
                          li: ({ children }) => <li className="text-gray-300">{children}</li>,
                          code: ({ children }) => <code className="bg-secondary px-2 py-1 rounded text-primary font-mono text-xs">{children}</code>,
                        }}
                      >
                        {enhancedPrompt}
                      </ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm font-sans tracking-wide">
                    [AWAITING] Enhanced prompt will appear here...
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Results Display - Side by Side - Always Visible */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Sketch Result */}
            <div className="bg-neutral rounded-2xl overflow-hidden border border-white/10">
              <div className="bg-secondary border-b border-white/10 p-4">
                <h3 className="text-primary font-mono font-bold flex items-center gap-2 tracking-wide">
                  <span className="font-mono">[SKETCH]</span> Conceptual Design
                </h3>
                <p className="text-gray-400 text-xs font-sans mt-1 tracking-wide">Black & white architectural line drawing</p>
              </div>
              <div className="aspect-square bg-secondary flex items-center justify-center p-8">
                {sketchImage ? (
                  <img
                    src={sketchImage}
                    alt="AI Generated Sketch"
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : currentStep === 'input' && !loading ? (
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-3 opacity-30 font-mono">✏️</div>
                    <p className="text-sm font-sans tracking-wide mb-2">Sketch Preview</p>
                    <p className="text-xs font-sans tracking-wide text-gray-600">
                      A black-and-white architectural sketch will be generated from your description, showing the spatial layout and design structure.
                    </p>
                  </div>
                ) : (loading && currentStep === 'step2') ? (
                  <div className="text-center text-gray-500">
                    <div className="flex justify-center mb-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                    <p className="text-sm font-sans tracking-wide">[PROCESSING] Generating sketch...</p>
                  </div>
                ) : (loading && currentStep === 'step1') ? (
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-3 opacity-30 font-mono">[...]</div>
                    <p className="text-sm font-sans tracking-wide">[AWAITING] Waiting for enhanced prompt...</p>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-3 opacity-30 font-mono">[...]</div>
                    <p className="text-sm font-sans tracking-wide">[AWAITING] Sketch will appear here...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Render Result */}
            <div className="bg-neutral rounded-2xl overflow-hidden border border-white/10">
              <div className="bg-secondary border-b border-white/10 p-4">
                <h3 className="text-primary font-mono font-bold flex items-center gap-2 tracking-wide">
                  <span className="font-mono">[RENDER]</span> Photorealistic Output
                </h3>
                <p className="text-gray-400 text-xs font-sans mt-1 tracking-wide">8K quality architectural visualization</p>
              </div>
              <div className="aspect-square bg-secondary flex items-center justify-center p-8">
                {renderImage ? (
                  <img
                    src={renderImage}
                    alt="AI Generated Render"
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : currentStep === 'input' && !loading ? (
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-3 opacity-30 font-mono">🎨</div>
                    <p className="text-sm font-sans tracking-wide mb-2">Render Preview</p>
                    <p className="text-xs font-sans tracking-wide text-gray-600">
                      A high-end photorealistic 3D render will be generated from the sketch, featuring ultra-high resolution textures, ray-traced lighting, and realistic materials.
                    </p>
                  </div>
                ) : (loading && currentStep === 'step3') ? (
                  <div className="text-center text-gray-500">
                    <div className="flex justify-center mb-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                    <p className="text-sm font-sans tracking-wide">[PROCESSING] Generating render...</p>
                  </div>
                ) : (loading && (currentStep === 'step1' || currentStep === 'step2')) ? (
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-3 opacity-30 font-mono">[...]</div>
                    <p className="text-sm font-sans tracking-wide">[AWAITING] Waiting for sketch...</p>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-3 opacity-30 font-mono">[...]</div>
                    <p className="text-sm font-sans tracking-wide">[AWAITING] Render will appear here...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-3 bg-neutral px-6 py-3 rounded-full border border-primary/30">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span className="text-gray-300 text-sm font-sans tracking-wide">[Processing] AI Generating Designs...</span>
              </div>
            </div>
          )}

          {/* Reset Button */}
          {currentStep === 'complete' && (
            <div className="text-center mt-12">
              <button
                onClick={handleReset}
                className="px-8 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-secondary transition font-mono font-bold tracking-wider"
              >
                Create New Design
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-10 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-2xl font-mono font-bold mb-4 tracking-wider">AI Studio by AdityoLab</p>
          <p className="text-gray-500 text-sm font-sans tracking-wide">Powered by Google Gemini AI</p>
          <p className="text-gray-500 text-sm mt-2">© 2025 AdityoLab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
