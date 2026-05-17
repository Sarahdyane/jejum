import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
  onPrev,
}: QuizNavigationProps) => {
  const isLast = currentQuestion === totalQuestions;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/60">
      <div className="container mx-auto px-4 py-3 pb-4">
        <div className="flex items-center gap-3">
          {/* Back button */}
          <button
            onClick={onPrev}
            disabled={currentQuestion === 1}
            className="p-3.5 rounded-2xl border border-border bg-card hover:bg-secondary/60 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 active:scale-90 flex-shrink-0"
            aria-label="Voltar"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          {/* Continue button */}
          <button
            onClick={onNext}
            disabled={!canProceed}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all duration-300 active:scale-[0.97]",
              canProceed
                ? "quiz-gradient text-white btn-pulse"
                : "bg-secondary text-muted-foreground cursor-not-allowed"
            )}
          >
            <span>{isLast ? 'Ver meu plano' : 'Continuar'}</span>
            {canProceed && (
              isLast
                ? <ArrowRight className="w-5 h-5" />
                : <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
