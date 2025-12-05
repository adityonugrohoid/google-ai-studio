'use client';

import { useState } from 'react';
import { generateRoom } from '@/lib/api';
import { useAppStore } from '@/lib/store';
import toast from 'react-hot-toast';
import { Sparkles, Loader2 } from 'lucide-react';

export function GenerationForm() {
  const [prompt, setPrompt] = useState('');
  const [returnIntermediates, setReturnIntermediates] = useState(true);
  const { setGenerating, setCurrentStep, setError, addResult, isGenerating } = useAppStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      toast.error('Please enter a room description');
      return;
    }

    setGenerating(true);
    setCurrentStep('prompt');
    setError(null);

    try {
      // Step 1: Generate
      setCurrentStep('sketch');
      const response = await generateRoom({
        prompt: prompt.trim(),
        return_intermediates: returnIntermediates,
      });

      setCurrentStep('render');

      // Add to results
      addResult({
        prompt: prompt.trim(),
        enhancedPrompt: response.data.enhanced_prompt,
        sketch: response.data.sketch,
        render: response.data.render,
      });

      toast.success('Render generated successfully!');
      setPrompt(''); // Clear form
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Generation failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setGenerating(false);
      setCurrentStep(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Room Description
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., modern living room with large windows and minimalist furniture"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
          disabled={isGenerating}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Describe the interior design you want to generate
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="intermediates"
          checked={returnIntermediates}
          onChange={(e) => setReturnIntermediates(e.target.checked)}
          className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
          disabled={isGenerating}
        />
        <label htmlFor="intermediates" className="text-sm text-gray-700 dark:text-gray-300">
          Show intermediate steps (sketch)
        </label>
      </div>

      <button
        type="submit"
        disabled={isGenerating || !prompt.trim()}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate Render
          </>
        )}
      </button>
    </form>
  );
}
