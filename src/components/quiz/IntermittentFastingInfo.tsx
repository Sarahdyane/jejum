import { motion } from "framer-motion";
import { Clock, Heart, TrendingUp, ArrowLeft } from "lucide-react";

interface IntermittentFastingInfoProps {
  onContinue: () => void;
  onBack?: () => void;
}

export const IntermittentFastingInfo = ({ onContinue, onBack }: IntermittentFastingInfoProps) => {
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
      <div className="w-full max-w-3xl text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            O que é jejum intermitente?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            O jejum intermitente ajuda você a se concentrar em quando você come, 
            não apenas no que você come.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 my-12"
        >
          <div className="bg-accent/10 rounded-lg p-6 space-y-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Período de jejum</h3>
            <p className="text-muted-foreground">Faça uma pausa na alimentação</p>
          </div>

          <div className="bg-accent/10 rounded-lg p-6 space-y-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Época de alimentação</h3>
            <p className="text-muted-foreground">Aproveite seus pratos favoritos!</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold text-foreground">
            Benefícios do jejum intermitente:
          </h3>
          <div className="space-y-4 max-w-md mx-auto">
            <div className="flex items-center gap-3 text-left">
              <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">Auxilia no controle de peso</span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">Melhora o metabolismo</span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">Melhora a saúde geral</span>
            </div>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
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