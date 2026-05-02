import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, BarChart3, Target, Trophy, ArrowLeft } from "lucide-react";
import nutriaLogoLight from '@/assets/nutria-logo.png';
import nutriaLogoDark from '@/assets/nutria-logo-dark.png';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { goToCheckout } from "@/utils/utmHelper";
import { ThemeToggle } from "@/components/ThemeToggle";

const Transformation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const weeks = [
    {
      week: 1,
      title: "Ajustes e Consciência",
      icon: Clock,
      benefits: [
        "Entendimento das refeições",
        "Criação de rotina de treino",
        "Aumento de energia e leve desinchaço"
      ],
      color: "from-[#0d7377] to-[#14919b]"
    },
    {
      week: 2,
      title: "Resultados iniciais",
      icon: BarChart3,
      benefits: [
        "Melhor controle da fome",
        "Abdômen menos inchado",
        "Aumento da disposição"
      ],
      color: "from-[#0d7377] to-[#14919b]"
    },
    {
      week: 3,
      title: "Mudança visível",
      icon: Target,
      benefits: [
        "Redução perceptível de medidas",
        "Roupas começam a vestir melhor",
        "Menos retenção de líquidos"
      ],
      color: "from-[#0d7377] to-[#14919b]"
    },
    {
      week: 4,
      title: "Transformação",
      icon: Trophy,
      benefits: [
        "Diferença no espelho e nas fotos",
        "Corpo mais definido",
        "Mais autoconfiança"
      ],
      color: "from-[#0d7377] to-[#14919b]"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header fixo */}
      <div className="sticky top-0 z-50 bg-background border-b border-border py-4 px-4 md:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="w-16" />
          <div className="flex items-center justify-center">
            <img src={nutriaLogoLight} alt="Nutria" className="h-12 md:h-14 block dark:hidden mix-blend-multiply" />
            <img src={nutriaLogoDark} alt="Nutria" className="h-12 md:h-14 hidden dark:block" />
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-28 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 md:mb-8 leading-tight">
            Veja como sua transformação vai acontecer
            <br />
            <span className="text-[#0d7377]">nas próximas 4 semanas</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light">
            Pequenas mudanças → grandes resultados
          </p>
        </div>

        {/* Timeline Section */}
        <div className="relative mb-20 md:mb-32">
          {/* Desktop Timeline - Horizontal */}
          <div className="hidden md:block">
            <div className="grid grid-cols-4 gap-8 relative">
              {/* Linha conectora */}
              <div className="absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#0d7377]/20 via-[#0d7377] to-[#0d7377]/20 -z-10"></div>
              
              {weeks.map((week, index) => {
                const Icon = week.icon;
                return (
                  <div 
                    key={week.week}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="bg-card rounded-3xl shadow-sm p-8 border border-border hover:shadow-xl hover:border-[#0d7377]/30 transition-all duration-500 h-full group">
                      {/* Ícone minimalista */}
                      <div className="w-32 h-32 mx-auto mb-8 rounded-full border-2 border-[#0d7377]/20 bg-[#0d7377]/5 flex items-center justify-center group-hover:border-[#0d7377] group-hover:bg-[#0d7377]/10 transition-all duration-500">
                        <Icon className="w-14 h-14 text-[#0d7377]" strokeWidth={1.5} />
                      </div>
                      
                      {/* Título */}
                      <div className="text-center mb-6">
                        <p className="text-xs font-semibold text-[#0d7377]/60 tracking-wider mb-2">SEMANA {week.week}</p>
                        <h3 className="text-2xl font-bold text-foreground">{week.title}</h3>
                      </div>
                      
                      {/* Benefícios */}
                      <ul className="space-y-3">
                        {week.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                            <CheckCircle2 className="w-5 h-5 text-[#0d7377] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                            <span className="leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Timeline - Vertical */}
          <div className="md:hidden space-y-8">
            {weeks.map((week, index) => {
              const Icon = week.icon;
              return (
                <div 
                  key={week.week}
                  className="relative animate-fade-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Linha conectora vertical */}
                  {index < weeks.length - 1 && (
                    <div className="absolute left-12 top-28 bottom-0 w-px bg-gradient-to-b from-[#0d7377] to-[#0d7377]/10 -z-10"></div>
                  )}
                  
                  <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-all duration-500">
                    <div className="flex items-start gap-5">
                      {/* Ícone minimalista */}
                      <div className="w-24 h-24 flex-shrink-0 rounded-full border-2 border-[#0d7377]/20 bg-[#0d7377]/5 flex items-center justify-center">
                        <Icon className="w-12 h-12 text-[#0d7377]" strokeWidth={1.5} />
                      </div>
                      
                      <div className="flex-1">
                        {/* Título */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-[#0d7377]/60 tracking-wider mb-1">SEMANA {week.week}</p>
                          <h3 className="text-xl font-bold text-gray-900">{week.title}</h3>
                        </div>
                        
                        {/* Benefícios */}
                        <ul className="space-y-3">
                          {week.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <CheckCircle2 className="w-5 h-5 text-[#0d7377] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                              <span className="leading-relaxed">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6 animate-fade-in" style={{ animationDelay: '0.75s' }}>
          <Button 
            onClick={goToCheckout}
            className="bg-[#0d7377] hover:bg-[#0a5c5f] text-white px-12 py-6 md:px-20 md:py-8 text-lg md:text-2xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto"
          >
            Quero começar agora
          </Button>
          
          <div>
            <Button 
              onClick={() => navigate('/quiz')}
              variant="ghost"
              className="text-[#0d7377] hover:text-[#0a5c5f] text-base md:text-lg font-medium hover:bg-[#0d7377]/5 transition-all flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-5 h-5" />
              Ver plano em detalhes
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs md:text-sm text-muted-foreground mt-12 max-w-2xl mx-auto">
          Os resultados podem variar de pessoa para pessoa. O progresso mostrado é uma estimativa baseada em experiências de usuários que seguiram o plano de forma consistente.
        </p>
      </div>
    </div>
  );
};

export default Transformation;
