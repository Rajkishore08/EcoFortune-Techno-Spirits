import React from 'react';
import { ArrowLeft, ArrowRight, SkipForward } from 'lucide-react';

interface NavigationControlsProps {
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  canGoBack: boolean;
  isLastQuestion: boolean;
  selectedOption: string;
}

export function NavigationControls({
  onNext,
  onBack,
  onSkip,
  canGoBack,
  isLastQuestion,
  selectedOption,
}: NavigationControlsProps) {
  return (
    <div className="flex justify-between items-center mt-8">
      <button
        onClick={onBack}
        disabled={!canGoBack}
        className={`flex items-center px-5 py-3 rounded-xl transition-all duration-200 ${
          canGoBack
            ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:shadow-md'
            : 'bg-gray-50 text-gray-400 cursor-not-allowed opacity-50'
        }`}
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>
      <button
        onClick={onSkip}
        className="flex items-center px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 hover:shadow-md"
      >
        <SkipForward className="w-5 h-5 mr-2" />
        Skip
      </button>
      <button
        onClick={onNext}
        disabled={!selectedOption}
        className={`flex items-center px-7 py-3 rounded-xl transition-all duration-200 ${
          selectedOption
            ? 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg transform hover:translate-x-0.5'
            : 'bg-gray-300 text-white cursor-not-allowed'
        }`}
      >
        {isLastQuestion ? 'Finish' : 'Next'}
        <ArrowRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  );
}