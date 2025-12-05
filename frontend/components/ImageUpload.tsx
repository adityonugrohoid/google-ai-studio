'use client';

import { useState, useRef } from 'react';
import { generateFromSketch } from '@/lib/api';
import { useAppStore } from '@/lib/store';
import toast from 'react-hot-toast';
import { Upload, Loader2, X } from 'lucide-react';

export function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setGenerating, setCurrentStep, setError, addResult } = useAppStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error('Please select an image file');
      return;
    }

    setGenerating(true);
    setCurrentStep('render');
    setError(null);

    try {
      const response = await generateFromSketch(
        file,
        customPrompt.trim() || undefined
      );

      addResult({
        prompt: customPrompt.trim() || 'From uploaded sketch',
        render: response.data.render,
      });

      toast.success('Render generated successfully!');
      handleClear();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Generation failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setGenerating(false);
      setCurrentStep(null);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setCustomPrompt('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Upload Sketch Image
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 mx-auto rounded-lg"
              />
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 mx-auto text-gray-400" />
              <div>
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                >
                  Click to upload
                </label>
                <input
                  id="file-upload"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={useAppStore.getState().isGenerating}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  PNG, JPEG, or any image format
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="custom-prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Custom Rendering Prompt (Optional)
        </label>
        <textarea
          id="custom-prompt"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="e.g., Transform into a luxury modern interior with warm lighting"
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
          disabled={useAppStore.getState().isGenerating}
        />
      </div>

      <button
        type="submit"
        disabled={useAppStore.getState().isGenerating || !file}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {useAppStore.getState().isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            Generate from Sketch
          </>
        )}
      </button>
    </form>
  );
}
