import { useState, useCallback } from 'react';
import { QuizState, QuizQuestion, UserProfile } from '@/types/quiz';

export const useQuiz = (questions: QuizQuestion[]) => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 1,
    answers: {},
    isComplete: false,
  });

  const shouldShowQuestion = useCallback((question: QuizQuestion) => {
    const genderAnswer = quizState.answers[2];
    
    // Pular perguntas de lipedema para homens
    if ((question.id === 8 || question.id === 'lipedema-info') && genderAnswer === 'male') {
      return false;
    }
    
    // Verificar condição showWhen
    if (question.showWhen) {
      const { questionId, notEquals, equals } = question.showWhen;
      const answerValue = quizState.answers[questionId];
      
      if (notEquals && answerValue === notEquals) {
        return false;
      }
      if (equals && answerValue !== equals) {
        return false;
      }
    }
    
    return true;
  }, [quizState.answers]);

  const getFilteredQuestions = useCallback(() => {
    return questions.filter(shouldShowQuestion);
  }, [questions, shouldShowQuestion]);

  const nextQuestion = useCallback(() => {
    const filteredQuestions = getFilteredQuestions();
    const currentIndex = filteredQuestions.findIndex(q => q.id === quizState.currentQuestion);
    
    if (currentIndex < filteredQuestions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: filteredQuestions[currentIndex + 1].id,
      }));
    } else {
      setQuizState(prev => ({
        ...prev,
        isComplete: true,
      }));
    }
  }, [quizState.currentQuestion, getFilteredQuestions]);

  const prevQuestion = useCallback(() => {
    const filteredQuestions = getFilteredQuestions();
    const currentIndex = filteredQuestions.findIndex(q => q.id === quizState.currentQuestion);
    
    if (currentIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: filteredQuestions[currentIndex - 1].id,
      }));
    }
  }, [quizState.currentQuestion, getFilteredQuestions]);

  const setAnswer = useCallback((questionId: number | string, answer: string | string[] | number) => {
    setQuizState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer,
      },
    }));
  }, []);

  const getCurrentQuestion = useCallback(() => {
    const filteredQuestions = getFilteredQuestions();
    return filteredQuestions.find(q => q.id === quizState.currentQuestion);
  }, [getFilteredQuestions, quizState.currentQuestion]);

  const getProgress = useCallback(() => {
    const filteredQuestions = getFilteredQuestions();
    const regularQuestions = filteredQuestions.filter(q => typeof q.id === 'number');
    const currentQuestionNumber = regularQuestions.findIndex(q => q.id === quizState.currentQuestion) + 1;
    return Math.round((currentQuestionNumber / regularQuestions.length) * 100);
  }, [quizState.currentQuestion, getFilteredQuestions]);

  const hasAnswer = useCallback((questionId: number | string) => {
    const answer = quizState.answers[questionId];
    if (Array.isArray(answer)) {
      return answer.length > 0;
    }
    return answer !== undefined && answer !== '';
  }, [quizState.answers]);

  const generateProfile = useCallback((): UserProfile => {
    const answers = quizState.answers;
    return {
      age: answers[1] as string || '',
      gender: answers[2] as string || '',
      goal: answers[3] as string || '',
      bodyType: answers[4] as string || '',
      targetBodyType: answers[5] as string || '',
      targetZones: answers[6] as string[] || [],
      fitnessLevel: answers[7] as string || '',
      fastingKnowledge: answers[8] as string || '',
      dailyActivity: answers[9] as string || '',
      firstMeal: answers[10] as string || '',
      lastMeal: answers[11] as string || '',
      mealsPerDay: answers[12] as string || '',
      dietType: answers[13] as string || '',
      likedFoods: answers[14] as string[] || [],
      waterIntake: answers[15] as string || '',
      sleepHours: answers[16] as string || '',
      energyLevel: answers[18] as string || '',
      cookingPreference: answers[19] as string || '',
      physicalIssues: answers[20] as string[] || [],
      walkingFrequency: answers[21] as string || '',
      workSchedule: answers[22] as string || '',
      badHabits: answers[23] as string[] || [],
      weightGainReasons: answers[24] as string[] || [],
      clothingIssues: answers[25] as string || '',
      mainReason: answers[26] as string || '',
      height: answers[27] as number || 0,
      currentWeight: answers[28] as number || 0,
      targetWeight: answers[29] as number || 0,
      userAge: answers[30] as number || 0,
    };
  }, [quizState.answers]);

  return {
    quizState,
    nextQuestion,
    prevQuestion,
    setAnswer,
    getCurrentQuestion,
    getProgress,
    hasAnswer,
    generateProfile,
  };
};