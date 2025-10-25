import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import nutriaLogo from '@/assets/nutria-logo.png';

interface LoadingAnalysisProps {
  onComplete: () => void;
}

const analysisSteps = [
  { text: 'Os parâmetros corporais são analisados...', duration: 2000 },
  { text: 'Refeições e atividades...', duration: 2000 },
  { text: 'Estilo de vida e hábitos...', duration: 2000 },
  { text: 'Seu plano de ação está sendo criado...', duration: 2000 }
];

export const LoadingAnalysis = ({ onComplete }: LoadingAnalysisProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    if (currentStep >= analysisSteps.length) {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }

    // Animate current step progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = [...prev];
        if (newProgress[currentStep] < 100) {
          newProgress[currentStep] = Math.min(100, newProgress[currentStep] + 2);
        }
        return newProgress;
      });
    }, analysisSteps[currentStep].duration / 50);

    // Move to next step when current completes
    const stepTimer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, analysisSteps[currentStep].duration);

    return () => {
      clearInterval(interval);
      clearTimeout(stepTimer);
    };
  }, [currentStep, onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md space-y-12 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center">
          <img 
            src={nutriaLogo} 
            alt="Nutria" 
            className="h-12 w-auto"
          />
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Suas respostas estão sendo analisadas...
          </h1>
        </div>

        {/* Progress Bars */}
        <div className="space-y-8">
          {analysisSteps.map((step, index) => (
            <div key={index} className="space-y-3">
              <p className={`text-sm md:text-base transition-colors duration-300 ${
                index <= currentStep 
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground'
              }`}>
                {step.text}
              </p>
              <Progress 
                value={progress[index]} 
                className="h-2"
              />
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <div className="text-center space-y-4 pt-8">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">🌿</span>
            <p className="text-sm text-muted-foreground italic">
              O assistente de perda de peso <span className="font-semibold text-foreground">mais eficaz</span>
            </p>
            <span className="text-xl">🌿</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Avaliações honestas da marca
          </p>
        </div>
      </div>
    </div>
  );
};
