'use client';

import { useAppStore } from '@/lib/store';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

const steps = [
  { key: 'prompt', label: 'Enhancing Prompt' },
  { key: 'sketch', label: 'Generating Sketch' },
  { key: 'render', label: 'Creating Render' },
] as const;

export function ProgressIndicator() {
  const { isGenerating, currentStep } = useAppStore();

  if (!isGenerating) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = currentStep === step.key;
          const isCompleted = steps.findIndex(s => s.key === currentStep) > index;
          const isPending = steps.findIndex(s => s.key === currentStep) < index;

          return (
            <div key={step.key} className="flex-1 flex flex-col items-center">
              <div className="flex items-center w-full">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isCompleted
                        ? 'bg-primary-600 border-primary-600 text-white'
                        : isActive
                        ? 'border-primary-600 text-primary-600'
                        : 'border-gray-300 dark:border-gray-600 text-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : isActive ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </div>
                  <p
                    className={`mt-2 text-xs font-medium text-center ${
                      isActive || isCompleted
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      isCompleted ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
