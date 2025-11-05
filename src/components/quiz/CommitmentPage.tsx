import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import commitmentHero from "@/assets/commitment-hero.jpg";

interface CommitmentPageProps {
  onStart: () => void;
  onViewPlan: () => void;
}

export const CommitmentPage = ({ onStart, onViewPlan }: CommitmentPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden"
      >
        <img
          src={commitmentHero}
          alt="Transformação inspiradora"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
      </motion.div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center space-y-6"
        >
          {/* Main Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Você realmente está pronta para entrar nessa jornada?
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl font-medium text-primary"
          >
            O melhor investimento do mundo é em você.
          </motion.p>

          {/* Supporting Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto space-y-3 pt-4"
          >
            <p>Você já deu o passo mais importante: decidiu mudar.</p>
            <p>Agora o Nutria vai caminhar com você.</p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Button
              onClick={onStart}
              size="lg"
              className="w-full sm:w-auto px-8 py-6 text-lg rounded-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Quero começar agora
            </Button>

            <button
              onClick={onViewPlan}
              className="text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors duration-200"
            >
              Ver meu plano novamente
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
