import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsDown, Meh, ThumbsUp, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Import exercise images
import exerciseCardio from '@/assets/exercise-cardio.png';
import exerciseWeights from '@/assets/exercise-weights.png';
import exercisePushups from '@/assets/exercise-pushups.png';

interface Exercise {
  id: string;
  name: string;
  image: string;
}

const exercises: Exercise[] = [
  { id: 'cardio', name: 'Cardio', image: exerciseCardio },
  { id: 'weights', name: 'Levantamento de pesos', image: exerciseWeights },
  { id: 'pushups', name: 'Flexões', image: exercisePushups },
];

type Preference = 'dislike' | 'neutral' | 'like';

interface ExercisePreferenceProps {
  onComplete: (preferences: Record<string, Preference>) => void;
  onBack?: () => void;
}

export const ExercisePreference = ({ onComplete, onBack }: ExercisePreferenceProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [preferences, setPreferences] = useState<Record<string, Preference>>({});
  const [direction, setDirection] = useState(0);

  const currentExercise = exercises[currentIndex];
  const isLast = currentIndex === exercises.length - 1;

  const handleSelect = (preference: Preference) => {
    const newPreferences = {
      ...preferences,
      [currentExercise.id]: preference,
    };
    setPreferences(newPreferences);

    if (isLast) {
      onComplete(newPreferences);
    } else {
      setDirection(1);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 150);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center gap-4">
        <button
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        
        {/* Progress */}
        <div className="flex-1">
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
            />
          </div>
        </div>
        
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1}/{exercises.length}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
          Gosto ou não gosto
        </h1>

        <div className="w-full max-w-sm relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentExercise.id}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-3xl overflow-hidden shadow-xl"
            >
              <div className="aspect-square p-8 bg-gradient-to-b from-secondary/50 to-secondary/20 flex items-center justify-center">
                <img
                  src={currentExercise.image}
                  alt={currentExercise.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-4 bg-secondary/80 text-center">
                <span className="text-lg font-semibold text-foreground">
                  {currentExercise.name}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Preference buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => handleSelect('dislike')}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200",
              "hover:bg-secondary/80 hover:scale-105 active:scale-95",
              preferences[currentExercise?.id] === 'dislike' && "bg-destructive/20"
            )}
          >
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
              <ThumbsDown className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Não gosto</span>
          </button>

          <button
            onClick={() => handleSelect('neutral')}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200",
              "hover:bg-secondary/80 hover:scale-105 active:scale-95",
              preferences[currentExercise?.id] === 'neutral' && "bg-primary/20"
            )}
          >
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center border-2 border-primary">
              <Meh className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Neutro</span>
          </button>

          <button
            onClick={() => handleSelect('like')}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200",
              "hover:bg-secondary/80 hover:scale-105 active:scale-95",
              preferences[currentExercise?.id] === 'like' && "bg-primary/20"
            )}
          >
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
              <ThumbsUp className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Gosto</span>
          </button>
        </div>
      </div>
    </div>
  );
};