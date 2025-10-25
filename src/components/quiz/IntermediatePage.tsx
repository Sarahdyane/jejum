import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface IntermediatePageProps {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  onContinue: () => void;
  onBack?: () => void;
}

export const IntermediatePage = ({ title, subtitle, description, image, onContinue, onBack }: IntermediatePageProps) => {
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
            className="max-w-xs h-auto rounded-lg shadow-lg"
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