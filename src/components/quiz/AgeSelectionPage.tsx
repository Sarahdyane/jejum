import { useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Menu } from "lucide-react";
import { getImageSrc } from "@/utils/imageMapping";
import nutriaLogo from '@/assets/nutria-logo-dark.png';

interface AgeOption {
  id: string;
  text: string;
  customImage?: string;
}

interface AgeSelectionPageProps {
  title: string;
  subtitle: string;
  options: AgeOption[];
  onSelect: (optionId: string) => void;
}

export const AgeSelectionPage = ({
  title,
  subtitle,
  options,
  onSelect,
}: AgeSelectionPageProps) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const ageLabels: Record<string, string> = {
    "18-29": "Idade: 18-29",
    "30-39": "Idade: 30-39",
    "40-49": "Idade: 40-49",
    "50+": "Idade: 50+",
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between px-4 py-4 border-b border-border"
      >
        <div className="flex items-center gap-2">
          <img
            src={nutriaLogo}
            alt="Nutria"
            className="w-8 h-8 object-contain"
          />
          <span className="text-lg font-bold text-primary">Nutria</span>
        </div>
        <Menu className="w-6 h-6 text-foreground" />
      </motion.header>

      {/* Content */}
      <div className="flex-1 px-4 py-6">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-primary uppercase tracking-wide mb-2">
            {title}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
            {subtitle}
          </p>
        </motion.div>

        {/* Age Options Grid */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {options.map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              onClick={() => onSelect(option.id)}
              className="relative group focus:outline-none"
            >
              {/* Card Container */}
              <div className="relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group-hover:scale-[1.02] border border-border">
                {/* Image Container */}
                <div className="aspect-[3/4] overflow-hidden bg-secondary/30">
                  <img
                    src={option.customImage ? getImageSrc(option.customImage) : ""}
                    alt={option.text}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Age Label - positioned at bottom of card */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-primary text-primary-foreground rounded-full px-4 py-2.5 flex items-center justify-between shadow-lg group-hover:bg-[hsl(var(--primary-hover))] transition-colors duration-300">
                    <span className="text-sm font-semibold">
                      {ageLabels[option.id] || `Idade: ${option.text}`}
                    </span>
                    <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-10 px-4"
        >
          <p className="text-xs text-muted-foreground leading-relaxed">
            Ao selecionar sua idade e continuar, você concorda com nossos{" "}
            <a href="#" className="text-primary underline hover:text-primary/80 transition-colors">
              Termos de Serviço
            </a>{" "}
            |{" "}
            <a href="#" className="text-primary underline hover:text-primary/80 transition-colors">
              Política de Privacidade
            </a>
            .
            <br />
            Leia atentamente antes de prosseguir.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
