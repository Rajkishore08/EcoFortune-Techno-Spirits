import React from 'react';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

export function QuizProgress({ currentQuestion, totalQuestions }: QuizProgressProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-3 text-sm">
        <span className="font-medium text-gray-700">Question {currentQuestion} of {totalQuestions}</span>
        <span className="text-green-600 font-medium">{Math.round(progress)}% Complete</span>
      </div>
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="w-full h-full opacity-30 animate-pulse bg-white"></div>
        </div>
      </div>
    </div>
  );
}