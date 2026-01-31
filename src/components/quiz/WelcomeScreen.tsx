import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, XCircle, Menu } from "lucide-react";
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
    <div className="min-h-screen bg-[#050a14] text-white relative overflow-x-hidden font-sans">
      
      {/* --- NOVO HEADER FIXO (Estilo Referência) --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050a14]/90 backdrop-blur-md border-b border-white/10 py-4 px-6 md:px-12 flex items-center justify-between transition-all duration-300">
         <div className="flex-shrink-0">
            <img 
                src={nutriaLogo} 
                alt="Nutria Logo" 
                // LOGO 2X MAIOR: h-20 no mobile, h-24 no desktop
                className="h-20 md:h-24 w-auto object-contain drop-shadow-sm" 
            />
         </div>
         {/* Ícone de Menu para balancear o cabeçalho (visual) */}
         <div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                <Menu className="w-8 h-8" />
            </Button>
         </div>
      </header>

      {/* --- CONTAINER PRINCIPAL (Para centralizar no Desktop) --- */}
      <main className="max-w-screen-xl mx-auto pt-40 pb-40 px-6 md:px-12 relative z-10">

        {/* --- HERO SECTION (GRID no Desktop) --- */}
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            // No Desktop (lg:), vira um grid de 2 colunas
            className="grid lg:grid-cols-2 gap-12 items-center mb-24"
        >
            {/* Coluna da Esquerda: Texto */}
            <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
                <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 text-white drop-shadow-sm">
                Chega de se esforçar tanto <br class="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E599] to-emerald-500">
                    e continuar com o mesmo corpo.
                </span>
                </motion.h1>
                
                <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                Você não vê resultados porque segue qualquer plano. Nossa IA, treinada com os melhores nutricionistas e personal trainers, <strong>entrega a estratégia que seu corpo precisa.</strong>
                </motion.p>

                 {/* Botão extra para Desktop (opcional, mas bom para UX) */}
                 <motion.div variants={fadeInUp} className="hidden lg:block">
                    <Button
                        onClick={onStart}
                        className="bg-[#00E599] hover:bg-[#00cc88] text-[#050a14] font-extrabold text-lg py-8 px-10 rounded-2xl shadow-[0_0_30px_rgba(0,229,153,0.4)] hover:shadow-[0_0_40px_rgba(0,229,153,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
                    >
                        INICIAR ANÁLISE GRÁTIS
                        <ArrowRight className="w-6 h-6" />
                    </Button>
                 </motion.div>
            </div>

            {/* Coluna da Direita: Mockup */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative z-10 max-w-[320px] lg:max-w-[400px] mx-auto lg:mr-0"
            >
                <div className="absolute top-10 left-10 right-10 bottom-10 bg-[#00E599] opacity-20 blur-[80px] rounded-full"></div>
                
                <img 
                src={appMockup} 
                alt="Nutria App Interface" 
                className="relative z-10 w-full h-auto drop-shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
                />
                
                <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -right-8 top-1/3 bg-[#0a0f1d]/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-gray-800 flex items-center gap-4 z-20"
                >
                <div className="bg-[#00E599]/20 p-3 rounded-full">
                    <Trophy className="w-6 h-6 text-[#00E599]" />
                </div>
                <div>
                    <p className="text-xs text-gray-400 font-bold uppercase mb-1">Meta Atingida</p>
                    <p className="text-lg font-bold text-white">-4.2kg em 15 dias</p>
                </div>
                </motion.div>
            </motion.div>
        </motion.div>

        {/* --- SEÇÃO DE DORES (Adaptada para Desktop) --- */}
        <div className="bg-[#0a0f1d]/50 rounded-3xl p-8 md:p-12 border border-white/5 mb-24 backdrop-blur-sm max-w-4xl mx-auto">
            <div className="text-center mb-12 font-extrabold tracking-tight leading-tight">
                <h2 className="text-3xl md:text-5xl text-white mb-2">
                    Você sabe que é <span className="text-red-500">bom o suficiente.</span>
                </h2>
                <h2 className="text-3xl md:text-5xl text-white">
                    Por que você <span className="text-red-500">trava?</span>
                </h2>
            </div>
          
          {/* Grid: 1 coluna no mobile, 2 no tablet/desktop */}
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="bg-[#050a14] p-6 rounded-2xl border border-red-900/30 shadow-lg flex gap-5 items-start opacity-80 hover:opacity-100 transition-all hover:border-red-500/50 group">
              <div className="bg-red-500/10 p-3 rounded-xl group-hover:bg-red-500/20 transition-colors">
                <XCircle className="w-8 h-8 text-red-500 shrink-0" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">O ciclo da "Segunda-feira"</h3>
                <p className="text-base text-gray-400 leading-relaxed">
                  Você sempre promete que "na segunda vai começar", mas a semana passa e nada muda.
                </p>
              </div>
            </div>

            <div className="bg-[#050a14] p-6 rounded-2xl border border-red-900/30 shadow-lg flex gap-5 items-start opacity-80 hover:opacity-100 transition-all hover:border-red-500/50 group">
              <div className="bg-red-500/10 p-3 rounded-xl group-hover:bg-red-500/20 transition-colors">
                <XCircle className="w-8 h-8 text-red-500 shrink-0" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Esforço sem retorno</h3>
                <p className="text-base text-gray-400 leading-relaxed">
                  Todo aquele suor e dinheiro investido em planos genéricos que não te levaram a lugar nenhum.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* --- PASSO A PASSO (Grid no Desktop) --- */}
        <div className="max-w-5xl mx-auto mb-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Como funciona</h2>
            <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">Sua jornada simplificada em 3 etapas estratégicas.</p>

            {/* Grid: 1 coluna mobile, 3 colunas desktop */}
            <div className="grid md:grid-cols-3 gap-8">
            {[
                { icon: "📝", title: "Análise de Perfil", text: "Nossa IA analisa 50+ pontos de dados sobre sua rotina e metabolismo." },
                { icon: "🤖", title: "Protocolo Gerado", text: "Receba instantaneamente um plano de refeições 100% adaptado." },
                { icon: "🔥", title: "Execução & Ajuste", text: "O sistema recalcula a rota automaticamente sempre que necessário." }
            ].map((item, index) => (
                <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group relative bg-[#0a0f1d] rounded-[2rem] p-8 shadow-xl border border-white/5 overflow-hidden hover:border-[#00E599]/50 transition-all duration-500 hover:-translate-y-2"
                >
                <div className="absolute top-0 left-0 w-full h-1 bg-white/5 group-hover:bg-[#00E599] transition-colors duration-500"></div>
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-3xl bg-[#050a14] flex items-center justify-center text-4xl group-hover:text-[#00E599] group-hover:scale-110 transition-all duration-500 mb-6 shadow-inner border border-white/5 group-hover:border-[#00E599]/20">
                    {item.icon}
                    </div>
                    <div>
                    <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-base text-gray-400 leading-relaxed">{item.text}</p>
                    </div>
                </div>
                </motion.div>
            ))}
            </div>
        </div>

      </main>

      {/* --- CTA FLUTUANTE (Aparece no Mobile/Tablet, some no Desktop grande onde já tem botão) --- */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#050a14]/90 backdrop-blur-xl border-t border-white/10 z-50 lg:hidden">
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
