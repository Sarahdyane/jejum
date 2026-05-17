import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import nutriaLogoLight from '@/assets/nutria-logo.png';
import nutriaLogoDark from '@/assets/nutria-logo-dark.png';
import { ThemeToggle } from "@/components/ThemeToggle";

interface QuizHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
  showTitle?: string;
  showSubtitle?: string;
  onBack?: () => void;
}

const milestones = [25, 50, 75];

const motivationalLabel = (progress: number) => {
  if (progress >= 90) return 'Quase lá!';
  if (progress >= 75) return 'Finalizando...';
  if (progress >= 50) return 'Metade do caminho!';
  if (progress >= 25) return 'Indo muito bem!';
  return '';
};

export const QuizHeader = ({
  currentQuestion,
  totalQuestions,
  progress,
  showTitle,
  showSubtitle,
  onBack,
}: QuizHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (currentQuestion === 1) {
      navigate('/');
    }
  };

  const label = motivationalLabel(progress);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/60 shadow-sm">
      <div className="container mx-auto px-4 pt-3 pb-2">

        {/* Top row */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-secondary rounded-xl transition-all duration-200 active:scale-90 flex-shrink-0"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>

          <div className="flex items-center gap-2">
            <img
              src={nutriaLogoLight}
              alt="Nutria"
              className="h-8 w-auto object-contain block dark:hidden mix-blend-multiply"
            />
            <img
              src={nutriaLogoDark}
              alt="Nutria"
              className="h-8 w-auto object-contain hidden dark:block"
            />
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/25 tabular-nums">
              {Math.round(progress)}%
            </span>
            <ThemeToggle />
          </div>
        </div>

        {(showTitle || showSubtitle) && (
          <div className="text-center mb-3">
            {showTitle && (
              <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">{showTitle}</h1>
            )}
            {showSubtitle && (
              <p className="text-base text-muted-foreground">{showSubtitle}</p>
            )}
          </div>
        )}

        {/* Progress bar with milestones */}
        <div className="relative h-2.5 bg-secondary rounded-full overflow-visible">
          {/* Track */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${Math.max(progress, 2)}%` }}
            />
          </div>

          {/* Milestone markers */}
          {milestones.map(m => (
            <div
              key={m}
              className="absolute top-0 bottom-0 w-[2px] rounded-full z-10 transition-colors duration-300"
              style={{
                left: `${m}%`,
                backgroundColor: progress >= m ? 'hsl(var(--primary-foreground) / 0.5)' : 'hsl(var(--border))',
              }}
            />
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex justify-between items-center mt-1.5 text-[10px]">
          <span className="text-muted-foreground font-medium">
            Pergunta {currentQuestion}/{totalQuestions}
          </span>
          {label && (
            <span className="text-primary font-semibold">{label}</span>
          )}
        </div>
      </div>
    </div>
  );
};
