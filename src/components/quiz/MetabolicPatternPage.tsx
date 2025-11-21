import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import smoothieTop from "@/assets/smoothie-detox-purple-top.jpg";
import smoothieSecond from "@/assets/smoothie-detox-purple-second.jpg";

interface MetabolicPatternPageProps {
  onContinue: () => void;
  onBack?: () => void;
}

export const MetabolicPatternPage = ({ onContinue, onBack }: MetabolicPatternPageProps) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 via-pink-50/20 to-background">
      {onBack && (
        <button
          onClick={onBack}
          className="fixed top-4 left-4 z-50 p-2 hover:bg-secondary/50 rounded-lg transition-colors"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      )}

      <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Imagem do topo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <img 
            src={smoothieTop}
            alt="Smoothie Detox"
            className="w-full h-[300px] md:h-[400px] object-cover rounded-3xl shadow-2xl"
          />
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-center text-foreground leading-tight"
        >
          Pronto. Agora eu CONFIRMEI seu padrão metabólico oculto.
        </motion.h1>

        {/* Subtítulo */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl md:text-2xl text-center text-muted-foreground font-medium"
        >
          Seu corpo segue um padrão que poucas mulheres conhecem — e isso muda tudo.
        </motion.h2>

        {/* Texto principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg space-y-6"
        >
          <p className="text-lg text-foreground/90 leading-relaxed">
            "Suas respostas revelaram que seu corpo tem grande tendência a um dos três padrões metabólicos ocultos:
          </p>

          <ul className="space-y-3 text-lg text-foreground/90 pl-6">
            <li className="font-semibold">✨ Retenção Reativa</li>
            <li className="font-semibold">💜 Ansiedade Inflamatória</li>
            <li className="font-semibold">🌸 Metabolismo Oscilante</li>
          </ul>

          <p className="text-base text-muted-foreground italic">
            (Vou confirmar exatamente qual é o SEU no final do teste.)
          </p>

          <p className="text-lg text-foreground/90 leading-relaxed">
            Esse é o tipo de descoberta que explica porque você incha fácil…<br />
            porque trava no dia 3…<br />
            e porque seu corpo reage diferente do das outras mulheres.
          </p>

          <p className="text-lg text-foreground/90 leading-relaxed font-medium">
            E por isso, um dos segredos mais fortes do seu plano personalizado será incluir um protocolo especial que poucas mulheres conhecem…"
          </p>
        </motion.div>

        {/* Segunda imagem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-2xl mx-auto"
        >
          <img 
            src={smoothieSecond}
            alt="Smoothie Detox Premium"
            className="w-full h-[350px] md:h-[450px] object-cover rounded-3xl shadow-2xl"
          />
        </motion.div>

        {/* Texto de antecipação */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-2xl md:text-3xl text-center text-foreground font-semibold"
        >
          Mas eu só destravo esse segredo pra você no final do teste… 😉
        </motion.h3>

        {/* Botão */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          onClick={onContinue}
          className="w-full max-w-md mx-auto block bg-primary text-primary-foreground hover:bg-primary/90 
                   py-5 px-8 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
        >
          Continuar minha análise →
        </motion.button>

        <div className="h-8" />
      </div>
    </div>
  );
};
