import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import nutriaLogo from '@/assets/nutria-logo.png';

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
      <div className="container mx-auto px-4 py-4">
        {(showTitle || showSubtitle) && (
          <div className="text-center mb-6">
            {showTitle && (
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {showTitle}
              </h1>
            )}
            {showSubtitle && (
              <p className="text-lg text-muted-foreground">
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

          <div className="flex items-center gap-3 flex-1 justify-center">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-primary/10 flex items-center justify-center">
              <img 
                src={nutriaLogo} 
                alt="Nutria" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-xl font-bold text-foreground">Nutria</span>
          </div>
          
          <span className="text-sm font-medium text-muted-foreground min-w-[50px] text-right">
            {currentQuestion}/{totalQuestions}
          </span>
        </div>
        
        <div className="mt-3">
          <Progress value={progress} className="h-2" />
        </div>
      </div>
    </div>
  );
};