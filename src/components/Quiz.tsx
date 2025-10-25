import { useEffect } from 'react';
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
import { getImageSrc } from '@/utils/imageMapping';

export const Quiz = () => {
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

  // Preload images for better performance
  useEffect(() => {
    const imagesToPreload: string[] = [];
    questions.forEach(q => {
      if (q.image) imagesToPreload.push(getImageSrc(q.image));
      if (q.maleImage) imagesToPreload.push(getImageSrc(q.maleImage));
      if (q.femaleImage) imagesToPreload.push(getImageSrc(q.femaleImage));
      if (q.options) {
        q.options.forEach(opt => {
          if (opt.image) imagesToPreload.push(getImageSrc(opt.image));
          if (opt.maleImage) imagesToPreload.push(getImageSrc(opt.maleImage));
          if (opt.femaleImage) imagesToPreload.push(getImageSrc(opt.femaleImage));
        });
      }
    });

    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const currentQuestion = getCurrentQuestion();
  const progress = getProgress();
  const canProceed = currentQuestion && (
    currentQuestion.type === 'intermediate' || 
    currentQuestion.type === 'stats' ||
    (typeof currentQuestion.id === 'number' && hasAnswer(currentQuestion.id))
  );

  const handleRestart = () => {
    window.location.reload();
  };

  if (quizState.isComplete) {
    const profile = generateProfile();
    return <QuizResults profile={profile} onRestart={handleRestart} />;
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
    const gender = quizState.answers[2] as string;
    let imageSrc = currentQuestion.image ? getImageSrc(currentQuestion.image) : '';
    
    if (currentQuestion.requiresGender && gender) {
      if (gender === 'male' && currentQuestion.maleImage) {
        imageSrc = getImageSrc(currentQuestion.maleImage);
      } else if (gender === 'female' && currentQuestion.femaleImage) {
        imageSrc = getImageSrc(currentQuestion.femaleImage);
      }
    }

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

  // Handle consent and loading pages
  if (currentQuestion.id === "consent-page" || currentQuestion.id === "loading-page") {
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
      
      <main className="pt-32 pb-20 px-4">
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