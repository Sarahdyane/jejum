import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import nutriaLogo from '@/assets/nutria-logo-dark.png';

interface QuizHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
  showTitle?: string;
  showSubtitle?: string;
  onBack?: () => void;
}

export const QuizHeader = ({ 
  currentQuestion, 
  totalQuestions, 
  progress, 
  showTitle, 
  showSubtitle,
  onBack
}: QuizHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (currentQuestion === 1) {
      navigate('/');
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center gap-3 justify-center mb-3">
          <div className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center">
            <img 
              src={nutriaLogo} 
              alt="Nutria" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <span className="text-xl font-bold text-foreground">Nutria</span>
        </div>

        {(showTitle || showSubtitle) && (
          <div className="text-center mb-3">
            {showTitle && (
              <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                {showTitle}
              </h1>
            )}
            {showSubtitle && (
              <p className="text-base text-muted-foreground">
                {showSubtitle}
              </p>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-secondary/50 rounded-lg transition-colors"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>

          <div className="flex-1"></div>
          
          <span className="text-sm font-medium text-muted-foreground min-w-[50px] text-right">
            {currentQuestion}/{totalQuestions}
          </span>
        </div>
        
        <div className="mt-2">
          <Progress value={progress} className="h-2" />
        </div>
      </div>
    </div>
  );
};