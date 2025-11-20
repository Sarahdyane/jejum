import { useEffect, useState } from 'react';
import { questions } from '@/data/questions';
import { useQuiz } from '@/hooks/useQuiz';
import { QuizHeader } from '@/components/quiz/QuizHeader';
import { QuizQuestion } from '@/components/quiz/QuizQuestion';
import { QuizNavigation } from '@/components/quiz/QuizNavigation';
import { QuizResults } from '@/components/quiz/QuizResults';
import { QuizFooter } from '@/components/quiz/QuizFooter';
import { IntermediatePage } from '@/components/quiz/IntermediatePage';
import { IntermittentFastingInfo } from '@/components/quiz/IntermittentFastingInfo';
import { StatsPage } from '@/components/quiz/StatsPage';
import { LoadingAnalysis } from '@/components/quiz/LoadingAnalysis';
import { ReadyTransition } from '@/components/quiz/ReadyTransition';
import { WeeklyExpectations } from '@/components/quiz/WeeklyExpectations';
import { CommitmentPage } from '@/components/quiz/CommitmentPage';
import { getImageSrc } from '@/utils/imageMapping';

export const Quiz = () => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showReadyTransition, setShowReadyTransition] = useState(false);
  const [showExpectations, setShowExpectations] = useState(false);
  const [showCommitment, setShowCommitment] = useState(false);

  const {
    quizState,
    nextQuestion,
    prevQuestion,
    setAnswer,
    getCurrentQuestion,
    getProgress,
    hasAnswer,
    generateProfile,
  } = useQuiz(questions);

  // Scroll to top when question changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [quizState.currentQuestion]);

  // Preload images for current and next questions
  useEffect(() => {
    const currentIndex = questions.findIndex(q => q.id === quizState.currentQuestion);
    const questionsToPreload = questions.slice(currentIndex, currentIndex + 3);
    
    questionsToPreload.forEach(q => {
      const imagesToLoad: string[] = [];
      
      if (q.image) imagesToLoad.push(getImageSrc(q.image));
      if (q.maleImage) imagesToLoad.push(getImageSrc(q.maleImage));
      if (q.femaleImage) imagesToLoad.push(getImageSrc(q.femaleImage));
      
      if (q.options) {
        q.options.forEach(opt => {
          if (opt.image) imagesToLoad.push(getImageSrc(opt.image));
          if (opt.maleImage) imagesToLoad.push(getImageSrc(opt.maleImage));
          if (opt.femaleImage) imagesToLoad.push(getImageSrc(opt.femaleImage));
        });
      }

      imagesToLoad.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    });
  }, [quizState.currentQuestion]);

  const currentQuestion = getCurrentQuestion();
  const progress = getProgress();
  const canProceed = currentQuestion && (
    currentQuestion.type === 'intermediate' || 
    currentQuestion.type === 'stats' ||
    currentQuestion.type === 'loading' ||
    (typeof currentQuestion.id === 'number' && hasAnswer(currentQuestion.id))
  );

  const handleRestart = () => {
    window.location.reload();
  };

  if (quizState.isComplete) {
    const profile = generateProfile();
    
    // Show commitment page after results
    if (showCommitment) {
      return (
        <CommitmentPage
          onStart={() => {
            // Navigate to dashboard/home (for now, restart)
            handleRestart();
          }}
          onViewPlan={() => setShowCommitment(false)}
        />
      );
    }
    
    return <QuizResults profile={profile} onRestart={() => setShowCommitment(true)} />;
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Erro ao carregar pergunta
          </h1>
          <p className="text-muted-foreground">
            Não foi possível carregar a pergunta atual.
          </p>
        </div>
      </div>
    );
  }

  // Handle stats page
  if (currentQuestion.type === 'stats') {
    return (
      <StatsPage
        onContinue={nextQuestion}
        onBack={prevQuestion}
      />
    );
  }

  // Handle intermediate pages
  if (currentQuestion.type === 'intermediate') {
    const imageSrc = currentQuestion.image ? getImageSrc(currentQuestion.image) : '';

    return (
      <IntermediatePage
        title={currentQuestion.title}
        subtitle={currentQuestion.subtitle}
        description={currentQuestion.description}
        image={imageSrc}
        onContinue={nextQuestion}
        onBack={prevQuestion}
      />
    );
  }


  // Handle fasting benefits page
  if (currentQuestion.id === "fasting-benefits") {
    return (
      <IntermediatePage
        title={currentQuestion.title}
        subtitle={currentQuestion.subtitle}
        description={currentQuestion.description}
        image={currentQuestion.image ? getImageSrc(currentQuestion.image) : ''}
        onContinue={nextQuestion}
        onBack={prevQuestion}
      />
    );
  }

  // Handle consent page
  if (currentQuestion.id === "consent-page") {
    return (
      <IntermediatePage
        title={currentQuestion.title}
        subtitle={currentQuestion.subtitle}
        description={currentQuestion.description}
        image={currentQuestion.image ? getImageSrc(currentQuestion.image) : ''}
        onContinue={nextQuestion}
        onBack={prevQuestion}
      />
    );
  }

  // Handle loading page with new analysis flow
  if (currentQuestion.type === 'loading') {
    if (showExpectations) {
      return <WeeklyExpectations onContinue={nextQuestion} />;
    }
    
    if (showReadyTransition) {
      return <ReadyTransition onComplete={() => setShowExpectations(true)} />;
    }
    
    if (showAnalysis) {
      return <LoadingAnalysis onComplete={() => setShowReadyTransition(true)} />;
    }
    
    // Start the analysis flow
    setTimeout(() => setShowAnalysis(true), 100);
    return <LoadingAnalysis onComplete={() => setShowReadyTransition(true)} />;
  }

  const regularQuestions = questions.filter(q => typeof q.id === 'number');
  const currentIndex = regularQuestions.findIndex(q => q.id === currentQuestion.id);
  const totalQuestions = regularQuestions.length;

  return (
    <div className="min-h-screen bg-background">
      <QuizHeader
        currentQuestion={currentIndex + 1}
        totalQuestions={totalQuestions}
        progress={progress}
        showTitle={currentQuestion.showTitle}
        showSubtitle={currentQuestion.showSubtitle}
        onBack={currentIndex > 0 ? prevQuestion : undefined}
      />
      
      <main className="pt-36 pb-20 px-4">
        <div className="container mx-auto py-8">
          <QuizQuestion
            question={currentQuestion}
            answer={quizState.answers[currentQuestion.id]}
            onAnswer={(answer) => setAnswer(currentQuestion.id, answer)}
            answers={quizState.answers}
          />
        </div>
      </main>

      <QuizNavigation
        currentQuestion={currentIndex + 1}
        totalQuestions={totalQuestions}
        canProceed={canProceed}
        onNext={nextQuestion}
        onPrev={prevQuestion}
      />

      {currentQuestion.showFooter && <QuizFooter />}
    </div>
  );
};