import { Question, FeedbackType } from '@/types';

const STORAGE_KEY = 'tanya_ahli_questions';

export const saveQuestion = (question: Question): void => {
  try {
    const existingQuestions = getQuestions();
    const updatedQuestions = [question, ...existingQuestions];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuestions));
  } catch (error) {
    console.error('Error saving question:', error);
  }
};

export const updateQuestionFeedback = (questionId: string, feedback: FeedbackType): void => {
  try {
    const questions = getQuestions();
    const updatedQuestions = questions.map(q => 
      q.id === questionId ? { ...q, feedback } : q
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuestions));
  } catch (error) {
    console.error('Error updating feedback:', error);
  }
};

export const getQuestions = (): Question[] => {
  try {
    const questions = localStorage.getItem(STORAGE_KEY);
    return questions ? JSON.parse(questions) : [];
  } catch (error) {
    console.error('Error getting questions:', error);
    return [];
  }
};

export const deleteQuestion = (questionId: string): void => {
  try {
    const questions = getQuestions();
    const updatedQuestions = questions.filter(q => q.id !== questionId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuestions));
  } catch (error) {
    console.error('Error deleting question:', error);
  }
}; 