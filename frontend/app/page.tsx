'use client';

import { GenerationForm } from '@/components/GenerationForm';
import { ImageUpload } from '@/components/ImageUpload';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { ResultGallery } from '@/components/ResultGallery';
import { useState } from 'react';
import { Sparkles, Upload } from 'lucide-react';

type Tab = 'text' | 'sketch';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('text');

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              AI Studio
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              by AdityoLab
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Generate photorealistic interior design renders from sketches
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-1">
            <button
              onClick={() => setActiveTab('text')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'text'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 inline mr-2" />
              Text to Render
            </button>
            <button
              onClick={() => setActiveTab('sketch')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'sketch'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Sketch to Render
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="mb-12">
          {activeTab === 'text' ? <GenerationForm /> : <ImageUpload />}
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator />

        {/* Results Gallery */}
        <ResultGallery />
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2024 AdityoLab. Powered by Google Gemini AI.
          </p>
        </div>
      </footer>
    </main>
  );
}
