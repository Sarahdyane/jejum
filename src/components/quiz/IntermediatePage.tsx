import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

interface IntermediatePageProps {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  onContinue: () => void;
  onBack?: () => void;
  thematicImage?: string;
}

export const IntermediatePage = ({ title, subtitle, description, image, onContinue, onBack, thematicImage }: IntermediatePageProps) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Auto-advance for analyzing page
  const isAnalyzing = title === "Analisando seu padrão metabólico";
  
  useEffect(() => {
    if (isAnalyzing) {
      const timer = setTimeout(() => {
        onContinue();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing, onContinue]);

  // Analyzing mode - show loading bar
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-foreground"
          >
            {title}
          </motion.h1>
          
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="h-full bg-green-500 rounded-full"
            />
          </div>
        </div>
      </div>
    );
  }

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
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {onBack && (
        <button
          onClick={onBack}
          className="fixed top-4 left-4 z-50 p-2 hover:bg-secondary/50 rounded-lg transition-colors"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      )}
      <div className="w-full max-w-2xl text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <img 
            src={image} 
            alt="Inspirational fitness" 
            className="w-full max-w-lg h-auto rounded-2xl shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-muted-foreground">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {description}
            </p>
          )}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onClick={onContinue}
          className="w-full max-w-md mx-auto bg-primary text-primary-foreground hover:bg-primary/90 
                   py-4 px-8 rounded-lg font-semibold text-lg transition-colors"
        >
          Continuar
        </motion.button>
      </div>
    </div>
  );
};