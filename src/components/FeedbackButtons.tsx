'use client'

import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Question } from '@/types';
import { updateQuestionFeedback } from '@/lib/storage';

interface FeedbackButtonsProps {
  question: Question;
  onFeedbackUpdate?: (question: Question) => void;
  className?: string;
}

export default function FeedbackButtons({ question, onFeedbackUpdate, className = '' }: FeedbackButtonsProps) {
  const handleFeedback = (feedback: 'helpful' | 'not_helpful', e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuestionFeedback(question.id, feedback);
    if (onFeedbackUpdate) {
      onFeedbackUpdate({ ...question, feedback });
    }
  };

  return (
    <div className={`flex items-center justify-end space-x-2 ${className}`}>
      <button
        onClick={(e) => handleFeedback('helpful', e)}
        className={`p-2 rounded-full transition-all duration-200 ${
          question.feedback === 'helpful'
            ? 'text-green-500 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
            : 'text-gray-400 dark:text-gray-500 hover:text-green-500 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
        }`}
        title="Jawaban membantu"
      >
        <ThumbsUp className="w-5 h-5" />
      </button>
      <button
        onClick={(e) => handleFeedback('not_helpful', e)}
        className={`p-2 rounded-full transition-all duration-200 ${
          question.feedback === 'not_helpful'
            ? 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
            : 'text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
        }`}
        title="Jawaban tidak membantu"
      >
        <ThumbsDown className="w-5 h-5" />
      </button>
    </div>
  );
} 