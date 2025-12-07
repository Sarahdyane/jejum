import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SupplementsPageProps {
  onAnswer: (answer: string) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

const SupplementsPage: React.FC<SupplementsPageProps> = ({
  onAnswer,
  onBack,
  currentStep,
  totalSteps
}) => {
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const targetPercent = 72;
  
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = targetPercent / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetPercent) {
        setAnimatedPercent(targetPercent);
        clearInterval(timer);
      } else {
        setAnimatedPercent(Math.round(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, []);

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (animatedPercent / 100) * circumference;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-card hover:bg-muted transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex-1 mx-4">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
        <span className="text-sm text-muted-foreground">
          {currentStep}/{totalSteps}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Circular Progress with Labels */}
        <motion.div 
          className="flex items-center gap-6 mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Circular Progress */}
          <div className="relative w-28 h-28">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="56"
                cy="56"
                r="45"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
              />
              {/* Sono (purple) */}
              <circle
                cx="56"
                cy="56"
                r="45"
                fill="none"
                stroke="#9b87f5"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (animatedPercent / 100) * circumference * 0.4}
                strokeLinecap="round"
                className="transition-all duration-100"
              />
              {/* Energia (orange) */}
              <circle
                cx="56"
                cy="56"
                r="45"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (animatedPercent / 100) * circumference * 0.25}
                strokeLinecap="round"
                className="transition-all duration-100"
                style={{ 
                  transform: 'rotate(144deg)',
                  transformOrigin: 'center'
                }}
              />
              {/* Metabolismo (teal) */}
              <circle
                cx="56"
                cy="56"
                r="45"
                fill="none"
                stroke="#0EA5E9"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (animatedPercent / 100) * circumference * 0.35}
                strokeLinecap="round"
                className="transition-all duration-100"
                style={{ 
                  transform: 'rotate(234deg)',
                  transformOrigin: 'center'
                }}
              />
            </svg>
            {/* Percentage in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-foreground">{animatedPercent}%</span>
            </div>
          </div>

          {/* Labels */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-2 rounded-full bg-[#9b87f5]" />
              <span className="text-foreground text-sm">Sono</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-2 rounded-full bg-primary" />
              <span className="text-foreground text-sm">Energia</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-2 rounded-full bg-[#0EA5E9]" />
              <span className="text-foreground text-sm">Metabolismo</span>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 
          className="text-2xl md:text-3xl font-bold text-foreground text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Perca peso e ganhe músculos ao mesmo tempo
        </motion.h1>

        {/* Description */}
        <motion.p 
          className="text-muted-foreground text-center text-base md:text-lg mb-10 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Aprenda como otimizar sua nutrição e ingestão de suplementos para obter resultados máximos.
        </motion.p>

        {/* Question */}
        <motion.p 
          className="text-foreground font-semibold text-center text-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Deseja obter um guia para suplementos?
        </motion.p>

        {/* Buttons */}
        <motion.div 
          className="flex gap-4 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            onClick={() => onAnswer('no')}
            variant="outline"
            className="flex-1 py-6 text-lg font-semibold bg-card border-border hover:bg-muted"
          >
            Não
          </Button>
          <Button
            onClick={() => onAnswer('yes')}
            className="flex-1 py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Sim
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default SupplementsPage;
