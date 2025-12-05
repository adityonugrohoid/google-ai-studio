'use client';

import { useAppStore } from '@/lib/store';
import { Download, X } from 'lucide-react';
import { useState } from 'react';

export function ResultGallery() {
  const { results, clearResults } = useAppStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (results.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto mt-12 text-center text-gray-500 dark:text-gray-400">
        <p>No generations yet. Create your first render above!</p>
      </div>
    );
  }

  const downloadImage = (base64: string, filename: string) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${base64}`;
    link.download = filename;
    link.click();
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Generated Renders ({results.length})
        </h2>
        {results.length > 0 && (
          <button
            onClick={clearResults}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result) => (
          <div
            key={result.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Render Image */}
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-900">
              <img
                src={`data:image/png;base64,${result.render}`}
                alt={result.prompt}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setSelectedImage(result.render)}
              />
              <button
                onClick={() => downloadImage(result.render, `render-${result.id}.png`)}
                className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Download render"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="p-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                {result.prompt}
              </p>
              {result.enhancedPrompt && (
                <details className="mt-2">
                  <summary className="text-xs text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
                    View enhanced prompt
                  </summary>
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    {result.enhancedPrompt}
                  </p>
                </details>
              )}
              {result.sketch && (
                <button
                  onClick={() => setSelectedImage(result.sketch!)}
                  className="mt-2 text-xs text-primary-600 dark:text-primary-400 hover:underline"
                >
                  View sketch
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={`data:image/png;base64,${selectedImage}`}
              alt="Full size"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
