import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, XCircle, CheckCircle2, Zap } from "lucide-react";
// Imagens
import appMockup from "@/assets/app-meals-mockup.png";
import nutriaLogo from "@/assets/nutria-logo-dark.png"; // Usando a logo pedida

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
    // MUDANÇA: Fundo escuro (bg-slate-900) e texto claro (text-white)
    <div className="min-h-screen bg-slate-900 text-white pb-32 relative">
      
      {/* --- HERO SECTION (A Promessa) --- */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="px-6 pt-12 pb-8 text-center max-w-lg mx-auto"
      >
        {/* Badge Escura */}
        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-bold uppercase tracking-wider mb-6">
          <Zap className="w-3 h-3 text-[#00E599] fill-[#00E599]" />
          Nova Tecnologia Metabólica
        </motion.div>
        
        <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white">
          O fim das tentativas.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E599] to-emerald-500">
            O começo dos resultados.
          </span>
        </motion.h1>
        
        {/* Texto mais claro */}
        <motion.p variants={fadeInUp} className="text-lg text-slate-300 leading-relaxed">
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
            {/* Efeito de brilho VERDE atrás do celular */}
            <div className="absolute top-10 left-10 right-10 bottom-10 bg-[#00E599] opacity-25 blur-[60px] rounded-full"></div>
            
            <img 
              src={appMockup} 
              alt="Nutria App Interface" 
              className="relative z-10 w-full h-auto drop-shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
            />
            
            {/* Card flutuante (Modo Escuro) */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -right-4 top-1/3 bg-slate-800 p-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 z-20"
            >
              <div className="bg-[#00E599]/20 p-2 rounded-full">
                <Trophy className="w-5 h-5 text-[#00E599]" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Meta Atingida</p>
                <p className="text-sm font-bold text-white">-4.2kg em 15 dias</p>
              </div>
            </motion.div>
        </div>
      </motion.div>

      {/* --- QUEBRA DE OBJEÇÕES (Modo Escuro) --- */}
      <div className="bg-slate-800/50 py-12 px-6 border-y border-slate-800 mb-16">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-white">Por que você travou?</h2>
          
          <div className="grid gap-4">
            {/* O jeito antigo (Escuro) */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-red-900/50 shadow-sm flex gap-4 items-start opacity-80">
              <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white">O jeito antigo</h3>
                <p className="text-sm text-slate-400 mt-1">Dietas restritivas de internet que desaceleram seu metabolismo e causam efeito sanfona.</p>
              </div>
            </div>

            {/* O jeito Nutria (Escuro com destaque) */}
            <motion.div 
              whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="bg-slate-800 p-6 rounded-2xl border-2 border-[#00E599] shadow-[0_0_20px_rgba(0,229,153,0.15)] flex gap-4 items-start relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-[#00E599] text-slate-900 text-[10px] font-bold px-3 py-1 rounded-bl-xl">NOVA ERA</div>
              <CheckCircle2 className="w-6 h-6 text-[#00E599] shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white">O Método Nutria</h3>
                <p className="text-sm text-slate-300 mt-1">Nutrição estratégica baseada nos seus dados, ajustada diariamente por IA para queima constante.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- PASSO A PASSO (Cards Escuros) --- */}
      <div className="px-6 max-w-lg mx-auto mb-10">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">Como funciona</h2>
        <p className="text-center text-slate-400 mb-10">Sua jornada simplificada em 3 etapas.</p>

        <div className="space-y-6">
          {/* Cards dos Passos (Adaptados para Dark Mode) */}
          {[
            { icon: "📝", title: "Análise de Perfil", text: "Você responde um quiz rápido. Nossa IA analisa 50+ pontos de dados sobre sua rotina e corpo." },
            { icon: "🤖", title: "Protocolo Gerado", text: "Receba instantaneamente um plano de refeições e treinos 100% adaptado ao que você gosta." },
            { icon: "🔥", title: "Execução & Resultado", text: "Siga o plano dia a dia no app. O sistema aprende com você e recalcula a rota para garantir a meta." }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-slate-800 rounded-3xl p-6 shadow-lg border border-slate-700 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-slate-700 group-hover:bg-[#00E599] transition-colors duration-300"></div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-2xl group-hover:bg-[#00E599]/20 transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#00E599] uppercase mb-1">Passo 0{index + 1}</p>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- LOGO NO CANTO INFERIOR ESQUERDO --- */}
      {/* Fica fixa acima da barra de CTA */}
      <div className="fixed bottom-28 left-6 z-40 opacity-80 pointer-events-none">
          <img src={nutriaLogo} alt="Nutria Logo" className="h-8 w-auto" />
      </div>


      {/* --- CTA FLUTUANTE (Modo Escuro) --- */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 z-50">
        <div className="max-w-md mx-auto">
          <Button
            onClick={onStart}
            className="w-full bg-[#00E599] hover:bg-[#00cc88] text-slate-900 font-extrabold text-lg py-7 rounded-2xl shadow-[0_0_30px_-5px_rgba(0,229,153,0.5)] hover:shadow-[0_0_35px_-5px_rgba(0,229,153,0.7)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            INICIAR ANÁLISE GRÁTIS
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-[10px] text-center text-slate-400 mt-3 flex justify-center items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse"></span>
            142 pessoas analisando o perfil agora
          </p>
        </div>
      </div>

    </div>
  );
};
