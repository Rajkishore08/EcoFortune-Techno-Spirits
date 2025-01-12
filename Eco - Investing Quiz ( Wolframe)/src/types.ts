export interface Question {
  id: number;
  question: string;
  type: string;
  options: string[];
}

export interface QuizData {
  title: string;
  description: string;
  questions: Question[];
  suggestions: Record<string, string>;
}

export interface Answer {
  questionId: number;
  answer: string;
}