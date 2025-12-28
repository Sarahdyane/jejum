import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

interface SocialProofPageProps {
  title: string;
  subtitle: string;
  image: string;
  onContinue: () => void;
  onBack?: () => void;
}

export const SocialProofPage = ({ 
  title, 
  subtitle, 
  image, 
  onContinue, 
  onBack 
}: SocialProofPageProps) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {onBack && (
        <button
          onClick={onBack}
          className="fixed top-4 left-4 z-50 p-2 hover:bg-secondary/50 rounded-lg transition-colors"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      )}
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-16 pb-24">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-foreground">
            {subtitle}
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center w-full max-w-lg"
        >
          <img 
            src={image} 
            alt="Nutria App" 
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </div>

      {/* Continue Button - Fixed at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm"
      >
        <button
          onClick={onContinue}
          className="w-full max-w-md mx-auto block bg-primary text-primary-foreground hover:bg-primary/90 
                   py-4 px-8 rounded-lg font-semibold text-lg transition-colors uppercase tracking-wider"
        >
          Continuar
        </button>
      </motion.div>
    </div>
  );
};
