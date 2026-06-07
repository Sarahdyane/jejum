import { useEffect, useState } from 'react';
import { Check, Brain, Dumbbell, Utensils, Sparkles } from 'lucide-react';
import nutriaLogoLight from '@/assets/nutria-logo.png';
import nutriaLogoDark from '@/assets/nutria-logo-dark.png';

interface LoadingAnalysisProps {
  onComplete: () => void;
}

const analysisSteps = [
  { text: 'Analisando seus parâmetros corporais', icon: Brain, duration: 2200 },
  { text: 'Calculando plano alimentar ideal', icon: Utensils, duration: 2200 },
  { text: 'Ajustando rotina de exercícios', icon: Dumbbell, duration: 2200 },
  { text: 'Finalizando seu plano personalizado', icon: Sparkles, duration: 2200 },
];

export const LoadingAnalysis = ({ onComplete }: LoadingAnalysisProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (currentStep >= analysisSteps.length) {
      const t = setTimeout(onComplete, 400);
      return () => clearTimeout(t);
    }

    setStepProgress(0);

    const duration = analysisSteps[currentStep].duration;
    const tickMs = 30;
    const increment = (tickMs / duration) * 100;

    const interval = setInterval(() => {
      setStepProgress(p => {
        const next = p + increment;
        return next >= 100 ? 100 : next;
      });
    }, tickMs);

    const stepTimer = setTimeout(() => {
      setCurrentStep(s => s + 1);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(stepTimer);
    };
  }, [currentStep, onComplete]);

  const totalProgress = Math.min(
    ((currentStep + stepProgress / 100) / analysisSteps.length) * 100,
    100
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/6 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-primary/4 rounded-full blur-2xl" />
      </div>

      <div className="w-full max-w-sm space-y-10 relative z-10">

        {/* Logo */}
        <div className="flex justify-center">
          <img src={nutriaLogoLight} alt="Nutria" className="h-10 w-auto block dark:hidden mix-blend-multiply" />
          <img src={nutriaLogoDark}  alt="Nutria" className="h-10 w-auto hidden dark:block" />
        </div>

        {/* Spinner Nutria AI */}
        <div className="flex justify-center">
          <div className="relative w-[100px] h-[100px]">
            <div className="nutria-spinner" />
            <div className="nutria-spinner1 absolute inset-0" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black text-foreground">
            Montando seu protocolo exclusivo
          </h1>
          <p className="text-sm text-muted-foreground">
            Baseado em {analysisSteps.length * 10}+ parâmetros do seu perfil
          </p>
        </div>

        {/* Overall progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground font-medium">
            <span>Processando...</span>
            <span className="text-primary font-bold">{Math.round(totalProgress)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full rounded-full progress-gradient-bar transition-all duration-300"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {analysisSteps.map((step, index) => {
            const isDone   = index < currentStep;
            const isActive = index === currentStep;
            const StepIcon = step.icon;

            return (
              <div
                key={index}
                className={`flex items-center gap-3 transition-all duration-500 ${
                  isDone || isActive ? 'opacity-100' : 'opacity-30'
                }`}
              >
                {/* Icon / check */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-400 ${
                    isDone
                      ? 'bg-primary'
                      : isActive
                      ? 'bg-primary/15 border border-primary'
                      : 'bg-secondary border border-border'
                  }`}
                >
                  {isDone ? (
                    <Check className="w-4 h-4 text-white step-check-pop" />
                  ) : isActive ? (
                    <StepIcon className="w-4 h-4 text-primary animate-pulse" />
                  ) : (
                    <StepIcon className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>

                {/* Text + mini progress */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold leading-tight ${
                    isDone || isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.text}
                  </p>
                  {isActive && (
                    <div className="mt-1 h-1 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary/70 rounded-full transition-all duration-75"
                        style={{ width: `${stepProgress}%` }}
                      />
                    </div>
                  )}
                </div>

                {isDone && (
                  <span className="text-[10px] font-bold text-primary">OK</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          O assistente de saúde{' '}
          <span className="font-semibold text-foreground">mais eficaz do Brasil</span>
        </p>
      </div>
    </div>
  );
};
