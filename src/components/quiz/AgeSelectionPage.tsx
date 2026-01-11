import { useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
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
    <div className="min-h-screen bg-[#f5f0eb] flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between px-4 py-4"
      >
        <div className="flex items-center gap-2">
          <img
            src={nutriaLogo}
            alt="Nutria"
            className="w-8 h-8 object-contain"
          />
          <span className="text-lg font-bold text-primary">Nutria</span>
        </div>
        <div className="w-8 h-8 flex flex-col justify-center gap-1">
          <span className="w-6 h-0.5 bg-primary rounded-full"></span>
          <span className="w-6 h-0.5 bg-primary rounded-full"></span>
        </div>
      </motion.header>

      {/* Content */}
      <div className="flex-1 px-4 pb-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-primary uppercase tracking-wide mb-2">
            {title}
          </h1>
          <p className="text-sm md:text-base text-primary/70 uppercase tracking-wider">
            {subtitle}
          </p>
        </motion.div>

        {/* Age Options Grid */}
        <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
          {options.map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              onClick={() => onSelect(option.id)}
              className="relative group"
            >
              {/* Card Container */}
              <div className="relative bg-[#e8dfd6] rounded-3xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-lg transition-shadow duration-300">
                {/* Image */}
                <img
                  src={option.customImage ? getImageSrc(option.customImage) : ""}
                  alt={option.text}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />

                {/* Age Label */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-primary text-primary-foreground rounded-full px-4 py-2 flex items-center justify-between shadow-lg">
                    <span className="text-sm font-semibold">
                      {ageLabels[option.id] || `Idade: ${option.text}`}
                    </span>
                    <ChevronRight className="w-5 h-5" />
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
          className="text-center mt-8 px-4"
        >
          <p className="text-xs text-primary/60 leading-relaxed">
            Ao selecionar sua idade e continuar, você concorda com nossos{" "}
            <a href="#" className="text-primary underline hover:text-primary/80">
              Termos de Serviço
            </a>{" "}
            |{" "}
            <a href="#" className="text-primary underline hover:text-primary/80">
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
