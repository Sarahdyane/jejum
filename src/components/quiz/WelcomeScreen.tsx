import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, XCircle, Menu, ShieldCheck, Zap, ShoppingCart, Brain } from "lucide-react";

// --- IMAGENS ---
import cardapioMockup from "@/assets/Cardápio do dia_imagem.png";
import treinoMockup from "@/assets/App de treino_imagem.png";
import nutriaLogo from "@/assets/nutria-logo-dark.png";

// --- NOVA IMAGEM PARA O PASSO 1 ---
import step1Image from "@/assets/body-zones-female-mascot-final.png";

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

  // --- DADOS DO PASSO A PASSO ---
  const stepsData = [
    { 
      step: "PASSO 01",
      // AQUI ESTÁ A MUDANÇA: Usando a imagem da modelo com as zonas do corpo
      image: step1Image, 
      title: "Mapeamento Corporal", 
      text: "Nossa IA identifica suas zonas-alvo e biotipo exato. Não é um chute, é um escaneamento completo das suas necessidades." 
    },
    { 
      step: "PASSO 02",
      image: treinoMockup, 
      title: "Geração do Protocolo", 
      text: "Receba instantaneamente seu GPS: refeições exatas, treinos estratégicos e suplementação. Tudo 100% adaptado à sua realidade." 
    },
    { 
      step: "PASSO 03",
      image: cardapioMockup, 
      title: "Execução & Adaptação", 
      text: "O sistema aprende com você. Comeu fora do plano? A IA recalcula a rota automaticamente para você nunca parar de evoluir." 
    }
  ];

  return (
    <div className="min-h-screen bg-[#050a14] text-white relative overflow-x-hidden font-sans">
      
      {/* --- HEADER FIXO --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050a14]/95 backdrop-blur-md border-b border-white/5 py-2 px-6 md:py-6 md:px-12 flex items-center justify-between transition-all duration-300">
         <div className="flex-shrink-0">
            <img 
                src={nutriaLogo} 
                alt="Nutria Logo" 
                className="h-12 md:h-28 w-auto object-contain drop-shadow-sm" 
            />
         </div>
         <div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                <Menu className="w-7 h-7 md:w-10 md:h-10" />
            </Button>
         </div>
      </header>

      {/* --- CONTAINER PRINCIPAL --- */}
      <main className="max-w-screen-xl mx-auto pt-24 md:pt-48 pb-40 px-6 md:px-12 relative z-10">

        {/* --- HERO SECTION --- */}
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24"
        >
            {/* Texto */}
            <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
                <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 md:mb-8 text-white drop-shadow-sm">
                Chega de se esforçar tanto <br class="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#01d3b4] to-teal-500">
                    e continuar com o mesmo corpo.
                </span>
                </motion.h1>
                
                <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-gray-300 leading-relaxed mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0">
                Você não vê resultados porque segue qualquer plano. Nossa IA, treinada com os melhores nutricionistas e personal trainers, <strong>entrega a estratégia que seu corpo precisa.</strong>
                </motion.p>

                 {/* Botão Desktop */}
                 <motion.div variants={fadeInUp} className="hidden lg:block">
                    <Button
                        onClick={onStart}
                        className="bg-[#01d3b4] hover:bg-[#01b398] text-[#050a14] font-extrabold text-lg py-8 px-12 rounded-2xl shadow-[0_0_30px_rgba(1,211,180,0.4)] hover:shadow-[0_0_40px_rgba(1,211,180,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
                    >
                        INICIAR ANÁLISE GRÁTIS
                        <ArrowRight className="w-6 h-6" />
                    </Button>
                 </motion.div>
            </div>

            {/* Mockup Hero (TREINO) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative z-10 max-w-[280px] md:max-w-[320px] lg:max-w-[450px] mx-auto lg:mr-0"
            >
                <div className="absolute top-10 left-10 right-10 bottom-10 bg-[#01d3b4] opacity-20 blur-[80px] rounded-full"></div>
                
                <img 
                src={treinoMockup} 
                alt="Mockup do Treino Nutria" 
                className="relative z-10 w-full h-auto drop-shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
                />
            </motion.div>
        </motion.div>

        {/* --- SEÇÃO DE DORES --- */}
        <div className="bg-[#0a0f1d]/50 rounded-3xl p-5 md:p-16 border border-white/5 mb-24 backdrop-blur-sm max-w-5xl mx-auto">
            <div className="text-center mb-8 md:mb-16 font-extrabold tracking-tight leading-tight">
                <h2 className="text-2xl md:text-5xl text-white mb-1 md:mb-2">
                    Você sabe que é <span className="text-red-500">bom o suficiente.</span>
                </h2>
                <h2 className="text-2xl md:text-5xl text-white">
                    Por que você <span className="text-red-500">trava?</span>
                </h2>
            </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="bg-[#050a14] p-5 md:p-8 rounded-2xl border border-red-900/20 shadow-lg flex gap-4 md:gap-5 items-start opacity-90 hover:opacity-100 transition-all hover:border-red-500/30">
              <div className="shrink-0 mt-1">
                <XCircle className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg md:text-2xl font-bold text-white mb-2">O ciclo da "Segunda-feira"</h3>
                <p className="text-sm md:text-lg text-gray-400 leading-relaxed">
                  Você sempre promete que "na segunda vai começar", mas a semana passa e nada muda.
                </p>
              </div>
            </div>

            <div className="bg-[#050a14] p-5 md:p-8 rounded-2xl border border-red-900/20 shadow-lg flex gap-4 md:gap-5 items-start opacity-90 hover:opacity-100 transition-all hover:border-red-500/30">
              <div className="shrink-0 mt-1">
                <XCircle className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg md:text-2xl font-bold text-white mb-2">Treinos e dietas perdidas</h3>
                <p className="text-sm md:text-lg text-gray-400 leading-relaxed">
                  Todo aquele esforço, suor e dinheiro investido em planos genéricos que não te levaram a lugar nenhum.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- SEÇÃO: BENEFÍCIOS --- */}
        <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                
                {/* LADO ESQUERDO: VISUAL SURREAL (CARDÁPIO) */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative order-1 lg:order-1"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#01d3b4] opacity-10 blur-[100px] rounded-full"></div>
                    <div className="relative z-10 mx-auto max-w-[300px] lg:max-w-md">
                        <img 
                            src={cardapioMockup} 
                            alt="Mockup do Cardápio Nutria" 
                            className="w-full h-auto drop-shadow-2xl relative z-10" 
                        />
                    </div>
                </motion.div>

                {/* LADO DIREITO: LISTA DE BENEFÍCIOS */}
                <div className="order-2 lg:order-2">
                    
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                        A Nutria existe para <br/>
                        <span className="text-[#01d3b4]">corrigir isso.</span>
                    </h2>
                    
                    <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                        Dentro do Nutria, a complexidade desaparece. Você foca em viver, e a nossa Inteligência Artificial cuida dos dados.
                    </p>

                    <div className="space-y-4">
                        <div className="bg-[#050a14] border border-white/5 rounded-2xl p-5 hover:border-[#01d3b4]/30 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-[#01d3b4]/10 text-[#01d3b4] text-[10px] font-bold px-3 py-1 rounded-bl-xl">Impossível falhar</div>
                            <div className="flex gap-4 items-start">
                                <div className="bg-[#01d3b4]/10 p-3 rounded-xl shrink-0 group-hover:bg-[#01d3b4]/20 transition-colors">
                                    <ShieldCheck className="w-6 h-6 text-[#01d3b4]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Cardápio Anti-Falha</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">Comeu pizza no sábado? A IA recalcula automaticamente sua semana inteira. Você não perde progresso, você adapta.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#050a14] border border-white/5 rounded-2xl p-5 hover:border-[#01d3b4]/30 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-[#01d3b4]/10 text-[#01d3b4] text-[10px] font-bold px-3 py-1 rounded-bl-xl">Máximo resultado</div>
                            <div className="flex gap-4 items-start">
                                <div className="bg-[#01d3b4]/10 p-3 rounded-xl shrink-0 group-hover:bg-[#01d3b4]/20 transition-colors">
                                    <Zap className="w-6 h-6 text-[#01d3b4]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Treinos de Alta Eficiência</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">Protocolos de 15-20 minutos que aceleram sua queima de gordura por até 48h depois do treino.</p>
                                </div>
                            </div>
                        </div>

                         <div className="bg-[#050a14] border border-white/5 rounded-2xl p-5 hover:border-[#01d3b4]/30 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-[#01d3b4]/10 text-[#01d3b4] text-[10px] font-bold px-3 py-1 rounded-bl-xl">Sem desperdício</div>
                            <div className="flex gap-4 items-start">
                                <div className="bg-[#01d3b4]/10 p-3 rounded-xl shrink-0 group-hover:bg-[#01d3b4]/20 transition-colors">
                                    <ShoppingCart className="w-6 h-6 text-[#01d3b4]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Lista de Compras Automática</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">Saiba exatamente o que comprar no mercado. Economize R$847/mês eliminando compras desnecessárias.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#050a14] border border-white/5 rounded-2xl p-5 hover:border-[#01d3b4]/30 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-[#01d3b4]/10 text-[#01d3b4] text-[10px] font-bold px-3 py-1 rounded-bl-xl">Prazer + resultado</div>
                            <div className="flex gap-4 items-start">
                                <div className="bg-[#01d3b4]/10 p-3 rounded-xl shrink-0 group-hover:bg-[#01d3b4]/20 transition-colors">
                                    <Brain className="w-6 h-6 text-[#01d3b4]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Memória Alimentar Inteligente</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">A IA aprende seus gostos e recria versões saudáveis dos pratos que você ama. Não é sacrifício, é evolução.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Botão extra para Desktop */}
                    <div className="mt-10 hidden lg:block">
                        <Button
                            onClick={onStart}
                            className="bg-white text-[#050a14] hover:bg-gray-100 font-extrabold text-lg py-6 px-10 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
                        >
                            QUERO MEU GPS AGORA
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

            </div>
        </div>

        {/* --- PASSO A PASSO (CARD ESTILO NIKE) --- */}
        <div className="max-w-7xl mx-auto mb-24 px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-white tracking-tight">
                    Sua jornada, <span className="text-[#01d3b4]">simplificada.</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Esqueça planilhas complexas. A tecnologia Nutria faz o trabalho pesado para você só se preocupar em viver.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stepsData.map((item, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    className="group relative bg-[#0a0f1d] rounded-[2.5rem] border border-white/10 overflow-hidden hover:border-[#01d3b4]/50 transition-all duration-500 hover:-translate-y-3 shadow-2xl flex flex-col"
                >
                    
                    {/* --- METADE SUPERIOR: IMAGEM --- */}
                    <div className="relative h-72 md:h-80 overflow-hidden">
                        {/* Glow atrás da imagem */}
                        <div className="absolute inset-0 bg-[#01d3b4] opacity-0 group-hover:opacity-20 blur-[80px] transition-opacity duration-500 z-0"></div>
                        
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            // Object-contain ou cover dependendo de como você quer que a modelo apareça
                            className="w-full h-full object-cover relative z-10 transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                        />
                        
                        {/* Gradiente para fundir a imagem com o texto embaixo */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/80 to-transparent z-20"></div>
                    </div>

                    {/* --- METADE INFERIOR: CONTEÚDO --- */}
                    <div className="p-8 relative z-30 -mt-10 flex-grow flex flex-col justify-end">
                        {/* Badge do Passo */}
                        <div className="mb-4 inline-flex items-center bg-[#01d3b4]/10 px-4 py-1.5 rounded-full border border-[#01d3b4]/30 backdrop-blur-md">
                            <span className="text-xs font-bold text-[#01d3b4] tracking-widest">{item.step}</span>
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight group-hover:text-[#01d3b4] transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-base text-gray-400 leading-relaxed">
                            {item.text}
                        </p>

                        {/* Ícone de seta sutil no final */}
                        <div className="mt-6 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-4 group-hover:translate-x-0">
                            <ArrowRight className="text-[#01d3b4] w-6 h-6" />
                        </div>
                    </div>
                </motion.div>
            ))}
            </div>
        </div>

      </main>

      {/* --- CTA FLUTUANTE (Mobile Only) --- */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#050a14]/90 backdrop-blur-xl border-t border-white/10 z-50 lg:hidden">
        <div className="max-w-md mx-auto">
          <Button
            onClick={onStart}
            className="w-full bg-[#01d3b4] hover:bg-[#01b398] text-[#050a14] font-extrabold text-lg py-7 rounded-2xl shadow-[0_0_20px_rgba(1,211,180,0.3)] hover:shadow-[0_0_30px_rgba(1,211,180,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
          >
            INICIAR ANÁLISE GRÁTIS
            <ArrowRight className="w-5 h-5" />
          </Button>
          <p className="text-[10px] text-center text-gray-500 mt-3 flex justify-center items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#01d3b4] animate-pulse"></span>
            Sistema Online
          </p>
        </div>
      </div>

    </div>
  );
};
