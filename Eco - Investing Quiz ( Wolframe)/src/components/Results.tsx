import React from 'react';
import { Leaf, RefreshCw, PieChart, TrendingUp, Target } from 'lucide-react';
import type { Answer } from '../types';
import { quizData } from '../data/quizData';

interface ResultsProps {
  answers: Answer[];
  suggestions: Record<string, string>;
  onRetake: () => void;
}

export function Results({ answers, suggestions, onRetake }: ResultsProps) {
  const getRelevantSuggestions = () => {
    return answers.map(answer => {
      const question = quizData.questions.find(q => q.id === answer.questionId);
      return {
        questionId: answer.questionId,
        question: question?.question || '',
        selectedAnswer: answer.answer,
        suggestion: suggestions[answer.answer]
      };
    }).filter(item => item.suggestion);
  };

  const suggestionsList = getRelevantSuggestions();

  // Calculate completion percentage
  const completionPercentage = (answers.length / quizData.questions.length) * 100;

  // Get investment profile summary based on answers
  const getInvestmentProfile = () => {
    const riskAnswer = answers.find(a => a.questionId === 4)?.answer || '';
    const timelineAnswer = answers.find(a => a.questionId === 5)?.answer || '';
    const trackingAnswer = answers.find(a => a.questionId === 7)?.answer || '';

    return {
      riskProfile: riskAnswer.includes('priority') ? 'Conservative' : 
                   riskAnswer.includes('balance') ? 'Moderate' : 'Aggressive',
      timeline: timelineAnswer.includes('1 year') ? 'Short-term' :
                timelineAnswer.includes('1-5') ? 'Medium-term' : 'Long-term',
      trackingPreference: trackingAnswer.includes('detailed') ? 'Detailed' :
                         trackingAnswer.includes('high-level') ? 'Summary' : 'Basic'
    };
  };

  const profile = getInvestmentProfile();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="text-center mb-12">
        <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
          <Leaf className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your EcoFortune Results</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Based on your responses, we've analyzed your eco-investment preferences and created a personalized investment profile with tailored suggestions.
        </p>
      </div>

      {/* Quiz Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <PieChart className="w-6 h-6 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold">Quiz Completion</h3>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-100">
              <div 
                style={{ width: `${completionPercentage}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
              />
            </div>
            <p className="text-sm text-gray-600">
              {Math.round(completionPercentage)}% Complete ({answers.length} of {quizData.questions.length} questions)
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold">Investment Profile</h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Risk Appetite: <span className="font-medium text-gray-800">{profile.riskProfile}</span></p>
            <p className="text-sm text-gray-600">Timeline: <span className="font-medium text-gray-800">{profile.timeline}</span></p>
            <p className="text-sm text-gray-600">Tracking: <span className="font-medium text-gray-800">{profile.trackingPreference}</span></p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <Target className="w-6 h-6 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold">Key Focus Areas</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {answers.slice(0, 3).map((answer, index) => (
              <span key={index} className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {answer.answer.split(' ').slice(0, 2).join(' ')}...
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Personalized Suggestions Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Personalized Investment Suggestions</h3>
        <div className="grid grid-cols-1 gap-6">
          {suggestionsList.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6 bg-green-50 border-b border-green-100">
                <h4 className="font-semibold text-gray-800 mb-3">{item.question}</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {item.selectedAnswer}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed">{item.suggestion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onRetake}
          className="flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors text-lg font-medium shadow-md hover:shadow-lg"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Retake Quiz
        </button>
      </div>
    </div>
  );
}