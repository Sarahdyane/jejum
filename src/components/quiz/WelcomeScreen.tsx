import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, XCircle } from "lucide-react";
// Imagens
import appMockup from "@/assets/app-meals-mockup.png";
import nutriaLogo from "@/assets/nutria-logo-dark.png";

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
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    // COR DE FUNDO: Mantida a cor escura azulada (#050a14)
    <div className="min-h-screen bg-[#050a14] text-white pb-32 relative overflow-x-hidden">
      
      {/* --- HEADER COM LOGO NUTRIA --- */}
      <div className="w-full px-6 py-8"> 
         <img 
            src={nutriaLogo} 
            alt="Nutria Logo" 
            // AUMENTADO: h-14 (mobile) e h-20 (desktop) para ficar bem visível
            className="h-14 md:h-20 w-auto object-contain" 
         />
      </div>

      {/* --- HERO SECTION --- */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        // Ajustei o padding para não colar na logo gigante
        className="px-6 pt-6 pb-8 text-center max-w-lg mx-auto"
      >
        <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white drop-shadow-sm">
          Chega de se esforçar tanto <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E599] to-emerald-500">
            e continuar com o mesmo corpo.
          </span>
        </motion.h1>
        
        <motion.p variants={fadeInUp} className="text-lg text-gray-400 leading-relaxed">
          Você não vê resultados porque segue qualquer plano. Nossa IA, treinada com os melhores nutricionistas e personal trainers, <strong>entrega a estratégia que seu corpo precisa</strong>
        </motion.p>
      </motion.div>

      {/* --- MOCKUP --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative z-10 -mt-2 px-4 mb-16"
      >
        <div className="relative max-w-[280px] mx-auto">
            <div className="absolute top-10 left-10 right-10 bottom-10 bg-[#00E599] opacity-15 blur-[60px] rounded-full"></div>
            
            <img 
              src={appMockup} 
              alt="Nutria App Interface" 
              className="relative z-10 w-full h-auto drop-shadow-2xl"
            />
            
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -right-4 top-1/3 bg-[#0a0f1d] p-3 rounded-2xl shadow-2xl border border-gray-800 flex items-center gap-3 z-20"
            >
              <div className="bg-[#00E599]/10 p-2 rounded-full">
                <Trophy className="w-5 h-5 text-[#00E599]" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Meta Atingida</p>
                <p className="text-sm font-bold text-white">-4.2kg em 15 dias</p>
              </div>
            </motion.div>
        </div>
      </motion.div>

      {/* --- QUEBRA DE OBJEÇÕES (SÓ DORES AGORA) --- */}
      <div className="bg-[#0a0f1d]/80 py-12 px-6 border-y border-white/5 mb-16">
        <div className="max-w-lg mx-auto">
          
          {/* Títulos grandes e com destaque em vermelho */}
          <div className="text-center mb-12 font-extrabold tracking-tight leading-tight">
            <h2 className="text-3xl md:text-4xl text-white">
                Você sabe que é <span className="text-red-500">bom o suficiente.</span>
            </h2>
            <h2 className="text-3xl md:text-4xl text-white mt-1">
                Por que você <span className="text-red-500">trava?</span>
            </h2>
          </div>
          
          <div className="grid gap-4">
            
            {/* --- CARD DA DOR 1: O CICLO DA SEGUNDA-FEIRA --- */}
            <div className="bg-[#050a14] p-5 rounded-2xl border border-red-900/20 shadow-sm flex gap-4 items-start opacity-70 hover:opacity-100 transition-opacity">
              <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white">O ciclo da "Segunda-feira"</h3>
                <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                  Você sempre promete que "na segunda vai começar", mas a semana passa e nada muda.
                </p>
              </div>
            </div>

            {/* --- CARD DA DOR 2: ESFORÇO SEM RETORNO (NOVO) --- */}
            <div className="bg-[#050a14] p-5 rounded-2xl border border-red-900/20 shadow-sm flex gap-4 items-start opacity-70 hover:opacity-100 transition-opacity">
              <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white">Treinos e dietas perdidas sem retorno</h3>
                <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                  Todo aquele esforço, suor e dinheiro investido em planos genéricos que não te levaram a lugar nenhum.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- PASSO A PASSO --- */}
      <div className="px-6 max-w-lg mx-auto mb-10">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">Como funciona</h2>
        <p className="text-center text-gray-400 mb-10">Sua jornada em 3 etapas.</p>

        <div className="space-y-6">
          {[
            { icon: "📝", title: "Análise de Perfil", text: "Nossa IA analisa 50+ pontos de dados sobre sua rotina." },
            { icon: "🤖", title: "Protocolo Gerado", text: "Receba um plano de refeições 100% adaptado." },
            { icon: "🔥", title: "Execução & Resultado", text: "O sistema recalcula a rota para garantir a meta." }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-[#0a0f1d] rounded-3xl p-6 shadow-lg border border-white/5 overflow-hidden hover:border-[#00E599]/30 transition-colors"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-white/5 group-hover:bg-[#00E599] transition-colors duration-300"></div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#050a14] flex items-center justify-center text-2xl group-hover:text-[#00E599] transition-colors">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- CTA FLUTUANTE --- */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#050a14]/80 backdrop-blur-xl border-t border-white/5 z-50">
        <div className="max-w-md mx-auto">
          <Button
            onClick={onStart}
            className="w-full bg-[#00E599] hover:bg-[#00cc88] text-[#050a14] font-extrabold text-lg py-7 rounded-2xl shadow-[0_0_20px_rgba(0,229,153,0.3)] hover:shadow-[0_0_30px_rgba(0,229,153,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
          >
            INICIAR ANÁLISE GRÁTIS
            <ArrowRight className="w-5 h-5" />
          </Button>
          <p className="text-[10px] text-center text-gray-500 mt-3 flex justify-center items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse"></span>
            Sistema Online
          </p>
        </div>
      </div>

    </div>
  );
};
