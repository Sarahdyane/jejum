import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, XCircle, Menu, Check, Zap, ShoppingCart, BarChart3, Clock, Heart, TrendingUp, Shield, Users, Star, Sparkles, Brain, Timer } from "lucide-react";
import { useState, useEffect } from "react";
// Imagens
import appMockup from "@/assets/app-meals-mockup.png";
import nutriaLogo from "@/assets/nutria-logo-dark.png";

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 47, seconds: 22 });
  const [activeUsers, setActiveUsers] = useState(1247);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Timer de urgência
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Contador de usuários ativos
  useEffect(() => {
    const userTimer = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(userTimer);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-[#050a14] text-white relative overflow-x-hidden font-sans antialiased">
      
      {/* Efeitos de fundo atmosféricos */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00E599] opacity-[0.03] blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-400 opacity-[0.02] blur-[100px] rounded-full"></div>
      </div>

      {/* HEADER REFINADO */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050a14]/80 backdrop-blur-xl border-b border-white/[0.03] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <img 
              src={nutriaLogo} 
              alt="Nutria" 
              className="h-10 md:h-16 w-auto object-contain drop-shadow-[0_0_8px_rgba(0,229,153,0.15)]" 
            />
          </motion.div>
          
          {/* Indicador de usuários ativos - Mobile */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 bg-[#0a0f1d]/60 backdrop-blur-md px-3 py-2 rounded-full border border-[#00E599]/20 md:hidden"
          >
            <div className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse shadow-[0_0_8px_rgba(0,229,153,0.6)]"></div>
            <span className="text-xs font-semibold text-gray-300">{activeUsers} online</span>
          </motion.div>

          {/* Desktop menu */}
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/5 rounded-full transition-colors hidden md:flex">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 pt-20 md:pt-28">

        {/* === HERO SECTION EMOCIONAL === */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16 md:pb-24">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          >
            {/* Texto Hero */}
            <div className="text-center lg:text-left space-y-6 md:space-y-8 max-w-2xl mx-auto lg:mx-0">
              
              {/* Badge de urgência */}
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-full px-4 py-2 backdrop-blur-sm">
                <Clock className="w-4 h-4 text-red-400" />
                <span className="text-xs md:text-sm font-bold text-red-300">
                  Oferta expira em {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </span>
              </motion.div>

              <motion.h1 
                variants={fadeInUp} 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]"
              >
                <span className="text-white">Pare de se esforçar</span>
                <br />
                <span className="text-white">e continuar com</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E599] via-emerald-400 to-[#00E599] animate-gradient bg-[length:200%_auto]">
                  o mesmo corpo.
                </span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Você não vê resultados porque está seguindo <span className="text-white font-bold">qualquer plano</span>. 
                Nossa IA entrega a <span className="text-[#00E599] font-bold">estratégia exata</span> que seu corpo precisa.
              </motion.p>

              {/* Social Proof Emocional */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
                <div className="flex -space-x-3">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00E599] to-emerald-600 border-2 border-[#050a14] flex items-center justify-center text-xs font-bold">
                      {i === 3 ? '🔥' : '✓'}
                    </div>
                  ))}
                </div>
                <div className="text-center sm:text-left">
                  <div className="flex items-center gap-1 justify-center sm:justify-start mb-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-4 h-4 fill-[#00E599] text-[#00E599]" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-400">
                    <span className="text-white font-bold">12.847 pessoas</span> transformaram seus corpos
                  </p>
                </div>
              </motion.div>

              {/* CTA Principal Desktop */}
              <motion.div variants={fadeInUp} className="hidden lg:block pt-4">
                <Button
                  onClick={onStart}
                  className="group bg-[#00E599] hover:bg-[#00cc88] text-[#050a14] font-black text-lg px-10 py-7 rounded-2xl shadow-[0_0_40px_rgba(0,229,153,0.3)] hover:shadow-[0_0_60px_rgba(0,229,153,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    COMEÇAR MINHA TRANSFORMAÇÃO
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                </Button>
                <p className="text-xs text-gray-500 mt-3 flex items-center justify-center lg:justify-start gap-2">
                  <Shield className="w-3 h-3 text-[#00E599]" />
                  Análise 100% gratuita • Sem cartão de crédito
                </p>
              </motion.div>
            </div>

            {/* Mockup com elementos flutuantes */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-[340px] sm:max-w-[400px] lg:max-w-[500px] mx-auto"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#00E599] opacity-20 blur-[80px] scale-110"></div>
              
              <motion.img 
                src={appMockup} 
                alt="Nutria App" 
                className="relative z-10 w-full h-auto drop-shadow-[0_20px_60px_rgba(0,229,153,0.25)]"
                style={{ opacity }}
              />
              
              {/* Card flutuante - Resultado */}
              <motion.div 
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                className="absolute -right-2 sm:-right-6 top-[25%] bg-[#0a0f1d]/95 backdrop-blur-xl p-3 sm:p-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-[#00E599]/30 z-20 max-w-[140px] sm:max-w-none"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-gradient-to-br from-[#00E599] to-emerald-500 p-2 rounded-xl">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-[#050a14]" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-xs text-gray-400 font-bold uppercase tracking-wide">Meta Atingida</p>
                    <p className="text-sm sm:text-lg font-black text-white">-4.2kg</p>
                  </div>
                </div>
              </motion.div>

              {/* Card flutuante - IA trabalhando */}
              <motion.div 
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 100 }}
                className="absolute -left-2 sm:-left-6 bottom-[30%] bg-[#0a0f1d]/95 backdrop-blur-xl p-3 sm:p-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-[#00E599]/30 z-20 max-w-[140px] sm:max-w-none"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-gradient-to-br from-[#00E599] to-emerald-500 p-2 rounded-xl animate-pulse">
                    <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-[#050a14]" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-xs text-gray-400 font-bold uppercase tracking-wide">IA Ativa</p>
                    <p className="text-sm sm:text-base font-black text-white">Recalculando</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* === SEÇÃO DE DOR EMOCIONAL PROFUNDA === */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-16 md:py-24">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#0a0f1d]/80 to-[#0a0f1d]/60 backdrop-blur-xl rounded-3xl md:rounded-[3rem] p-6 sm:p-8 md:p-16 border border-red-900/10 shadow-[0_0_80px_rgba(239,68,68,0.05)] relative overflow-hidden"
          >
            {/* Efeito de brilho sutil */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
            
            <div className="text-center mb-10 md:mb-16 relative z-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6"
              >
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-sm font-bold text-red-300">Isso dói, mas é verdade</span>
              </motion.div>
              
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-3 md:mb-4 leading-tight">
                Você sabe que é bom o suficiente.
              </h2>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                  Por que você trava?
                </span>
              </h2>
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 relative z-10">
              {[
                {
                  icon: XCircle,
                  title: "O ciclo da 'Segunda-feira'",
                  text: "Você sempre promete que 'na segunda vai começar', mas a semana passa, o mês passa, o ano passa... e você continua no mesmo lugar, sentindo que o tempo está escapando.",
                  gradient: "from-red-500/5 to-orange-500/5"
                },
                {
                  icon: Timer,
                  title: "O cemitério de tentativas",
                  text: "Cada dieta falha, cada treino abandonado, cada dinheiro jogado fora. Não é falta de esforço. É a estratégia errada que te faz desistir toda vez.",
                  gradient: "from-red-500/5 to-rose-500/5"
                },
                {
                  icon: Users,
                  title: "O medo do espelho",
                  text: "Você evita fotos, espelhos, piscinas. Sente que está preso em um corpo que não te representa. E cada dia que passa, a frustração só aumenta.",
                  gradient: "from-orange-500/5 to-red-500/5"
                },
                {
                  icon: TrendingUp,
                  title: "A versão paralela de você",
                  text: "Existe uma versão sua que começou há 6 meses e hoje está vivendo a vida que você sonha. A diferença? Ela tinha o sistema certo. Você também pode.",
                  gradient: "from-rose-500/5 to-red-500/5"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group bg-gradient-to-br ${item.gradient} backdrop-blur-sm p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl border border-red-900/20 hover:border-red-500/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(239,68,68,0.1)]`}
                >
                  <div className="flex gap-4 md:gap-5 items-start">
                    <div className="shrink-0 mt-1 p-2 md:p-3 bg-red-500/10 rounded-xl group-hover:bg-red-500/20 transition-colors">
                      <item.icon className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-2 md:mb-3 group-hover:text-red-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Emocional */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-10 md:mt-16 text-center"
            >
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">
                Não deixe mais tempo passar.
              </p>
              <Button
                onClick={onStart}
                className="bg-white hover:bg-gray-100 text-[#050a14] font-black text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-7 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 mx-auto"
              >
                PARAR DE ADIAR MINHA VIDA
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* === SEÇÃO GPS (NÃO É PDF) === */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            
            {/* Visual lado esquerdo */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#00E599] opacity-[0.08] blur-[120px] rounded-full"></div>
              
              <div className="relative z-10 mx-auto max-w-[300px] sm:max-w-[400px] lg:max-w-[500px]">
                <motion.img 
                  src={appMockup} 
                  alt="Nutria Dashboard" 
                  className="w-full h-auto drop-shadow-[0_20px_60px_rgba(0,229,153,0.2)]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />

                {/* Cards flutuantes com dados da IA */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-3 sm:-left-6 top-[20%] bg-[#0a0f1d]/95 backdrop-blur-xl border border-[#00E599]/30 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl z-20"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-[#00E599]/20 p-1.5 sm:p-2 rounded-lg">
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#00E599]"/>
                    </div>
                    <div>
                      <p className="text-[9px] sm:text-xs text-gray-400 uppercase font-bold">Metabolismo</p>
                      <p className="text-xs sm:text-sm font-black text-white">+24% 🔥</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -right-3 sm:-right-8 bottom-[25%] bg-[#0a0f1d]/95 backdrop-blur-xl border border-[#00E599]/30 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl z-20"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-[#00E599]/20 p-1.5 sm:p-2 rounded-lg animate-pulse">
                      <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-[#00E599]"/>
                    </div>
                    <div>
                      <p className="text-[9px] sm:text-xs text-gray-400 uppercase font-bold">Ajuste IA</p>
                      <p className="text-xs sm:text-sm font-black text-white">Recalculado</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Conteúdo lado direito */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 space-y-6 md:space-y-8"
            >
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 bg-[#00E599]/10 border border-[#00E599]/30 rounded-full px-4 py-2 mb-4"
                >
                  <Sparkles className="w-4 h-4 text-[#00E599]" />
                  <span className="text-sm font-bold text-[#00E599]">Tecnologia Exclusiva</span>
                </motion.div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 leading-[1.1]">
                  Você não recebe uma dieta em PDF.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E599] to-emerald-400">
                    Você recebe um GPS.
                  </span>
                </h2>
                
                <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed">
                  Dentro do Nutria, <span className="text-white font-bold">a complexidade desaparece</span>. 
                  Você foca em viver, e nossa Inteligência Artificial cuida de tudo.
                </p>
              </div>

              <div className="space-y-5 sm:space-y-6">
                {[
                  {
                    icon: Shield,
                    title: "Cardápio Anti-Falha",
                    description: "Comeu pizza no sábado? A IA recalcula automaticamente sua semana inteira. Você não perde progresso, você adapta.",
                    highlight: "Impossível falhar"
                  },
                  {
                    icon: Zap,
                    title: "Treinos de Alta Eficiência",
                    description: "Protocolos de 15-20 minutos que aceleram sua queima de gordura por até 48h depois do treino.",
                    highlight: "Máximo resultado"
                  },
                  {
                    icon: ShoppingCart,
                    title: "Lista de Compras Automática",
                    description: "Saiba exatamente o que comprar no mercado. Economize R$847/mês eliminando compras desnecessárias.",
                    highlight: "Sem desperdício"
                  },
                  {
                    icon: Brain,
                    title: "Memória Alimentar Inteligente",
                    description: "A IA aprende seus gostos e recria versões saudáveis dos pratos que você ama. Não é sacrifício, é evolução.",
                    highlight: "Prazer + resultado"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex gap-4 items-start p-5 sm:p-6 bg-[#0a0f1d]/40 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-[#00E599]/30 hover:bg-[#0a0f1d]/60 transition-all duration-500 hover:scale-[1.02]"
                  >
                    <div className="shrink-0 mt-0.5 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#00E599]/10 flex items-center justify-center group-hover:bg-[#00E599]/20 group-hover:scale-110 transition-all">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#00E599]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-[#00E599] transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-xs font-bold text-[#00E599] bg-[#00E599]/10 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                          {item.highlight}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Desktop nesta seção */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="pt-4 hidden lg:block"
              >
                <Button
                  onClick={onStart}
                  className="bg-white hover:bg-gray-100 text-[#050a14] font-black text-lg px-10 py-7 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
                >
                  ATIVAR MEU GPS PESSOAL
                  <ArrowRight className="w-6 h-6" />
                </Button>
                <p className="text-xs text-gray-500 mt-3 flex items-center gap-2">
                  <Shield className="w-3 h-3 text-[#00E599]" />
                  Garantia de 30 dias ou seu dinheiro de volta + R$50
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* === COMO FUNCIONA (SIMPLIFICADO E VISUAL) === */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 md:mb-6">
              Como funciona
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Sua transformação começa em <span className="text-[#00E599] font-bold">3 passos simples</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {[
              { 
                icon: "🧬", 
                step: "01",
                title: "Análise Profunda", 
                text: "Nossa IA analisa 50+ pontos sobre sua rotina, metabolismo e objetivos. Leva apenas 3 minutos.",
                color: "from-[#00E599] to-emerald-500"
              },
              { 
                icon: "⚡", 
                step: "02",
                title: "Protocolo Personalizado", 
                text: "Receba instantaneamente seu plano de refeições, treinos e suplementação 100% adaptados.",
                color: "from-emerald-400 to-[#00E599]"
              },
              { 
                icon: "🎯", 
                step: "03",
                title: "Execução Inteligente", 
                text: "O sistema se adapta automaticamente conforme você vive. Sem culpa, sem falhas, só resultados.",
                color: "from-[#00E599] to-teal-400"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group relative"
              >
                {/* Linha conectora (desktop) */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#00E599]/30 to-transparent"></div>
                )}

                <div className="relative bg-[#0a0f1d]/40 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/5 hover:border-[#00E599]/30 transition-all duration-500 hover:scale-[1.03] overflow-hidden">
                  {/* Número do passo */}
                  <div className={`absolute top-0 right-0 text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br ${item.color} opacity-[0.03] leading-none`}>
                    {item.step}
                  </div>

                  {/* Borda superior gradiente */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl sm:text-4xl mb-6 shadow-[0_8px_32px_rgba(0,229,153,0.2)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      {item.icon}
                    </div>
                    
                    <div className="mb-2 text-sm font-black text-[#00E599] tracking-widest">
                      PASSO {item.step}
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-[#00E599] transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Garantia destacada */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-20 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-gradient-to-r from-[#00E599]/10 to-emerald-500/10 border border-[#00E599]/30 rounded-2xl px-6 sm:px-10 py-5 sm:py-6 backdrop-blur-sm">
              <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#00E599] rounded-full shrink-0">
                <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-[#050a14]" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-lg sm:text-xl font-black text-white mb-1">
                  Garantia Incondicional de 30 Dias
                </p>
                <p className="text-sm sm:text-base text-gray-400">
                  Se não sentir que o Nutria te entende melhor que você mesmo, devolvemos 100% + <span className="text-[#00E599] font-bold">R$50 pelo seu tempo</span>
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* === URGÊNCIA FINAL === */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#0a0f1d] to-[#050a14] rounded-3xl md:rounded-[3rem] p-8 sm:p-12 md:p-16 border border-[#00E599]/20 overflow-hidden"
          >
            {/* Efeitos de fundo */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsMjI5LDE1MywwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#00E599] opacity-[0.05] blur-[100px] rounded-full"></div>
            
            <div className="relative z-10 text-center space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#00E599]/10 border border-[#00E599]/30 rounded-full px-5 py-2.5">
                <div className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse"></div>
                <span className="text-sm font-bold text-[#00E599]">{activeUsers} pessoas online agora</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                Não deixe mais um dia passar<br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E599] to-emerald-400">
                  no corpo errado.
                </span>
              </h2>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Cada dia que você adia é um dia a mais preso na frustração. 
                <span className="text-white font-bold"> A versão transformada de você está esperando.</span>
              </p>

              {/* Timer de urgência destacado */}
              <div className="flex items-center justify-center gap-3 sm:gap-6 my-8 sm:my-10">
                {[
                  { label: 'Horas', value: timeLeft.hours },
                  { label: 'Min', value: timeLeft.minutes },
                  { label: 'Seg', value: timeLeft.seconds }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="bg-[#050a14] border-2 border-[#00E599]/30 rounded-xl sm:rounded-2xl w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center mb-2">
                      <span className="text-2xl sm:text-4xl font-black text-[#00E599] tabular-nums">
                        {item.value.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 font-bold uppercase tracking-wide">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button
                  onClick={onStart}
                  className="group bg-gradient-to-r from-[#00E599] to-emerald-500 hover:from-[#00cc88] hover:to-emerald-400 text-[#050a14] font-black text-base sm:text-lg md:text-xl px-8 sm:px-12 md:px-16 py-6 sm:py-7 md:py-8 rounded-2xl shadow-[0_0_60px_rgba(0,229,153,0.4)] hover:shadow-[0_0_80px_rgba(0,229,153,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden mx-auto"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    SIM, QUERO ME TRANSFORMAR AGORA
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Button>
                
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00E599]" />
                    <span>Análise gratuita</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00E599]" />
                    <span>Sem cartão de crédito</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00E599]" />
                    <span>Garantia de 30 dias</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Espaçamento para CTA flutuante mobile */}
        <div className="h-24 lg:hidden"></div>

      </main>

      {/* === CTA FLUTUANTE MOBILE (MELHORADO) === */}
      <div className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 bg-[#050a14]/95 backdrop-blur-2xl border-t border-[#00E599]/20 z-50 lg:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
        <div className="max-w-md mx-auto space-y-2">
          <Button
            onClick={onStart}
            className="w-full bg-gradient-to-r from-[#00E599] to-emerald-500 hover:from-[#00cc88] hover:to-emerald-400 text-[#050a14] font-black text-base sm:text-lg py-6 sm:py-7 rounded-2xl shadow-[0_0_40px_rgba(0,229,153,0.4)] hover:shadow-[0_0_60px_rgba(0,229,153,0.6)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
          >
            <span>COMEÇAR AGORA</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
          <div className="flex items-center justify-center gap-3 text-[10px] sm:text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse"></div>
              {activeUsers} online
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Expira em {timeLeft.hours}h {timeLeft.minutes}m
            </span>
          </div>
        </div>
      </div>

      {/* Estilo para animação de gradiente */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};
