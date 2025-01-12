import React, { useState } from 'react';
import { quizData } from './data/quizData';
import { QuizProgress } from './components/QuizProgress';
import { NavigationControls } from './components/NavigationControls';
import { Results } from './components/Results';
import { TreeDeciduous, Sparkles } from 'lucide-react';
import type { Answer } from './types';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1;

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      setAnswers(prev => [
        ...prev.filter(a => a.questionId !== currentQuestion.id),
        { questionId: currentQuestion.id, answer: selectedOption }
      ]);
    }

    setIsAnimating(true);
    setTimeout(() => {
      if (isLastQuestion) {
        setShowResults(true);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption('');
      }
      setIsAnimating(false);
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev - 1);
        const previousAnswer = answers.find(a => a.questionId === quizData.questions[currentQuestionIndex - 1].id);
        setSelectedOption(previousAnswer?.answer || '');
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleSkip = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (isLastQuestion) {
        setShowResults(true);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption('');
      }
      setIsAnimating(false);
    }, 300);
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedOption('');
    setShowResults(false);
  };

  if (showResults) {
    return <Results answers={answers} suggestions={quizData.suggestions} onRetake={handleRetake} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative inline-block p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-4">
                <TreeDeciduous className="w-10 h-10 text-green-600" />
                <Sparkles className="absolute top-0 right-0 w-4 h-4 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">{quizData.title}</h1>
            <p className="text-gray-600 max-w-lg mx-auto">{quizData.description}</p>
          </div>

          <QuizProgress
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={quizData.questions.length}
          />

          <div className={`mb-8 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQuestion.question}
            </h2>
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 transform hover:scale-[1.01] ${
                    selectedOption === option
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-colors ${
                      selectedOption === option ? 'border-green-500 bg-green-500' : 'border-gray-300'
                    }`}>
                      {selectedOption === option && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className={`flex-1 ${selectedOption === option ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>
                      {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <NavigationControls
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
            canGoBack={currentQuestionIndex > 0}
            isLastQuestion={isLastQuestion}
            selectedOption={selectedOption}
          />
        </div>
      </div>
    </div>
  );
}

export default App;