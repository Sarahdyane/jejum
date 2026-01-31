import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Smartphone, Trophy, XCircle, CheckCircle2, Zap } from "lucide-react";
// Imagens seguras
import appMockup from "@/assets/app-meals-mockup.png";

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  // Configuração das animações
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-32">
      
      {/* --- HERO SECTION (A Promessa) --- */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="px-6 pt-12 pb-8 text-center max-w-lg mx-auto"
      >
        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider mb-6">
          <Zap className="w-3 h-3 text-[#00E599] fill-[#00E599]" />
          Nova Tecnologia Metabólica
        </motion.div>
        
        <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6 text-slate-900">
          O fim das tentativas.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E599] to-emerald-600">
            O começo dos resultados.
          </span>
        </motion.h1>
        
        <motion.p variants={fadeInUp} className="text-lg text-slate-500 leading-relaxed">
          Chega de planos genéricos. O Nutria usa Inteligência Artificial para criar o único protocolo que seu corpo é <strong>biologicamente incapaz</strong> de ignorar.
        </motion.p>
      </motion.div>

      {/* --- MOCKUP (A Prova Visual) --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative z-10 -mt-2 px-4 mb-16"
      >
        <div className="relative max-w-[280px] mx-auto">
            {/* Efeito de brilho atrás do celular */}
            <div className="absolute top-10 left-10 right-10 bottom-10 bg-[#00E599] opacity-20 blur-[60px] rounded-full"></div>
            
            <img 
              src={appMockup} 
              alt="Nutria App Interface" 
              className="relative z-10 w-full h-auto drop-shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
            />
            
            {/* Card flutuante de "Resultado" */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -right-4 top-1/3 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-20"
            >
              <div className="bg-green-100 p-2 rounded-full">
                <Trophy className="w-5 h-5 text-[#00E599]" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Meta Atingida</p>
                <p className="text-sm font-bold text-slate-900">-4.2kg em 15 dias</p>
              </div>
            </motion.div>
        </div>
      </motion.div>

      {/* --- QUEBRA DE OBJEÇÕES (Comparativo) --- */}
      <div className="bg-slate-50 py-12 px-6 border-y border-slate-100 mb-16">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Por que você travou?</h2>
          
          <div className="grid gap-4">
            {/* O jeito antigo */}
            <div className="bg-white p-5 rounded-2xl border border-red-100 shadow-sm flex gap-4 items-start opacity-70 grayscale-[0.5]">
              <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900">O jeito antigo</h3>
                <p className="text-sm text-slate-500 mt-1">Dietas restritivas de internet que desaceleram seu metabolismo e causam efeito sanfona.</p>
              </div>
            </div>

            {/* O jeito Nutria */}
            <motion.div 
              whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-2xl border-2 border-[#00E599] shadow-lg flex gap-4 items-start relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-[#00E599] text-black text-[10px] font-bold px-3 py-1 rounded-bl-xl">NOVA ERA</div>
              <CheckCircle2 className="w-6 h-6 text-[#00E599] shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900">O Método Nutria</h3>
                <p className="text-sm text-slate-500 mt-1">Nutrição estratégica baseada nos seus dados, ajustada diariamente por IA para queima constante.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- PASSO A PASSO (Cards Visuais) --- */}
      <div className="px-6 max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Como funciona</h2>
        <p className="text-center text-slate-500 mb-10">Sua jornada simplificada em 3 etapas.</p>

        <div className="space-y-6">
          {/* Passo 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-white rounded-3xl p-6 shadow-lg border border-slate-100 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-[#00E599] transition-colors duration-300"></div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl group-hover:bg-[#00E599]/10 group-hover:scale-110 transition-all duration-300">
                📝
              </div>
              <div>
                <p className="text-xs font-bold text-[#00E599] uppercase mb-1">Passo 01</p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Análise de Perfil</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Você responde um quiz rápido. Nossa IA analisa 50+ pontos de dados sobre sua rotina e corpo.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Passo 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative bg-white rounded-3xl p-6 shadow-lg border border-slate-100 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-[#00E599] transition-colors duration-300"></div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl group-hover:bg-[#00E599]/10 group-hover:scale-110 transition-all duration-300">
                🤖
              </div>
              <div>
                <p className="text-xs font-bold text-[#00E599] uppercase mb-1">Passo 02</p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Protocolo Gerado</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Receba instantaneamente um plano de refeições e treinos 100% adaptado ao que você gosta e tem disponível.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Passo 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative bg-white rounded-3xl p-6 shadow-lg border border-slate-100 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-[#00E599] transition-colors duration-300"></div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl group-hover:bg-[#00E599]/10 group-hover:scale-110 transition-all duration-300">
                🔥
              </div>
              <div>
                <p className="text-xs font-bold text-[#00E599] uppercase mb-1">Passo 03</p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Execução & Resultado</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Siga o plano dia a dia no app. O sistema aprende com você e recalcula a rota para garantir a meta.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- CTA FLUTUANTE --- */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-100 z-50">
        <div className="max-w-md mx-auto">
          <Button
            onClick={onStart}
            className="w-full bg-[#00E599] hover:bg-[#00cc88] text-slate-900 font-extrabold text-lg py-7 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,229,153,0.5)] hover:shadow-[0_15px_35px_-10px_rgba(0,229,153,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            INICIAR ANÁLISE GRÁTIS
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-[10px] text-center text-slate-400 mt-3 flex justify-center items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            142 pessoas analisando o perfil agora
          </p>
        </div>
      </div>

    </div>
  );
};
