import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { useEffect } from "react";

interface IntermediatePageProps {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  onContinue: () => void;
  onBack?: () => void;
  bulletPoints?: string[];
  buttonText?: string;
  footerText?: string;
}

export const IntermediatePage = ({ title, subtitle, description, image, onContinue, onBack, bulletPoints, buttonText, footerText }: IntermediatePageProps) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Splash screen mode - show only logo centered
  const isSplashScreen = !title && !subtitle && !description;
  
  if (isSplashScreen) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center"
        >
          <img 
            src={image} 
            alt="Nutria" 
            className="h-24 w-auto"
          />
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          onClick={onContinue}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md mx-auto bg-primary text-primary-foreground hover:bg-primary/90 
                   py-4 px-8 rounded-lg font-semibold text-lg transition-colors"
        >
          Começar
        </motion.button>
      </div>
    );
  }
  
  // Helper function to render text with markdown bold support
  const renderTextWithBold = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) => {
      // Odd indices are the bold parts (content between **)
      if (index % 2 === 1) {
        return <strong key={index} className="font-bold text-foreground">{part}</strong>;
      }
      return part;
    });
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col p-4 pt-16">
      {onBack && (
        <button
          onClick={onBack}
          className="fixed top-4 left-4 z-50 p-2 hover:bg-secondary/50 rounded-lg transition-colors"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      )}
      <div className="w-full max-w-2xl mx-auto space-y-6 flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {renderTextWithBold(subtitle)}
            </p>
          )}
          {description && (
            <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {description}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center flex-1 items-center"
        >
          <img 
            src={image} 
            alt="Inspirational fitness" 
            className="max-w-full w-full h-auto rounded-lg"
          />
        </motion.div>

        {bulletPoints && bulletPoints.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-3 text-left"
          >
            {bulletPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <p className="text-foreground">{point}</p>
              </div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-3 pb-4"
        >
          <button
            onClick={onContinue}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 
                     py-4 px-8 rounded-full font-semibold text-lg transition-colors"
          >
            {buttonText || "CONTINUAR"}
          </button>
          {footerText && (
            <p className="text-sm text-muted-foreground text-center">{footerText}</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};