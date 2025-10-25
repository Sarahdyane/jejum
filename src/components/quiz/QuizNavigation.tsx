import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  canProceed: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export const QuizNavigation = ({ 
  currentQuestion, 
  totalQuestions, 
  canProceed, 
  onNext, 
  onPrev 
}: QuizNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onPrev}
            disabled={currentQuestion === 1}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Voltar</span>
          </Button>
          
          <Button
            onClick={onNext}
            disabled={!canProceed}
            className="flex items-center space-x-2 min-w-[120px] quiz-gradient hover:opacity-90"
          >
            <span>
              {currentQuestion === totalQuestions ? 'Finalizar' : 'Continuar'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};