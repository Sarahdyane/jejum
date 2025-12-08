import { motion } from "framer-motion";
import { ArrowLeft, Dumbbell, Apple, Zap, Target } from "lucide-react";
import { useEffect, useState } from "react";

interface NutritionExercisePageProps {
  onContinue: () => void;
  onBack?: () => void;
}

export const NutritionExercisePage = ({ onContinue, onBack }: NutritionExercisePageProps) => {
  const [nutritionPercent, setNutritionPercent] = useState(0);
  const [exercisePercent, setExercisePercent] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Animate percentages
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setNutritionPercent(prev => {
          if (prev >= 50) {
            clearInterval(interval);
            return 50;
          }
          return prev + 2;
        });
        setExercisePercent(prev => prev >= 50 ? 50 : prev + 2);
      }, 30);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const circumference = 2 * Math.PI * 70;
  const nutritionDash = (nutritionPercent / 100) * circumference;
  const exerciseDash = (exercisePercent / 100) * circumference;

  return (
    <div className="min-h-screen bg-background flex flex-col p-4">
      {onBack && (
        <button
          onClick={onBack}
          className="fixed top-4 left-4 z-50 p-2 hover:bg-secondary/50 rounded-lg transition-colors"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      )}

      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full space-y-8">
        
        {/* Animated Circular Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <svg width="200" height="200" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="hsl(var(--secondary))"
              strokeWidth="16"
            />
            {/* Nutrition segment (green) */}
            <motion.circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={`${nutritionDash} ${circumference}`}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{ strokeDasharray: `${nutritionDash} ${circumference}` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            {/* Exercise segment (lighter green) */}
            <motion.circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="hsl(174 85% 60%)"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={`${exerciseDash} ${circumference}`}
              strokeDashoffset={-nutritionDash}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{ strokeDasharray: `${exerciseDash} ${circumference}` }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-3xl font-bold text-foreground">100%</span>
              <p className="text-xs text-muted-foreground mt-1">Resultados</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-6"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Nutrição 50%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(174 85% 60%)' }} />
            <span className="text-sm text-muted-foreground">Exercício 50%</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-3xl font-bold text-center text-foreground leading-tight"
        >
          Seu corpo muda quando você escolhe o que ele precisa.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center text-muted-foreground leading-relaxed"
        >
          Com os exercícios certos e alimentos adequados, seu corpo responde rápido.
          Agora vamos descobrir o que funciona melhor para você.
        </motion.p>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 gap-4 w-full"
        >
          <div className="bg-card border border-border rounded-xl p-4 flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-primary" />
            </div>
            <span className="font-semibold text-foreground text-sm">Treinos</span>
            <span className="text-xs text-muted-foreground">Força e tônus</span>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Apple className="w-6 h-6 text-primary" />
            </div>
            <span className="font-semibold text-foreground text-sm">Alimentos</span>
            <span className="text-xs text-muted-foreground">Energia e composição</span>
          </div>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-3 text-xs text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>Início</span>
          </div>
          <div className="w-8 h-px bg-primary/50" />
          <div className="flex items-center gap-2">
            <Target className="w-3 h-3 text-primary" />
            <span>Ajuste alimentar</span>
          </div>
          <div className="w-8 h-px bg-primary/50" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary/40" />
            <span>Evolução</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="w-full space-y-3"
        >
          <button
            onClick={onContinue}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 
                     py-4 px-8 rounded-xl font-semibold text-lg transition-all
                     hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25"
          >
            Continuar
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Cada resposta deixa seu plano mais inteligente para o seu corpo.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
