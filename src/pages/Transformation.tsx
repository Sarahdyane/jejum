import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles, TrendingUp, Zap, Award } from "lucide-react";
import nutriaLogo from '@/assets/nutria-logo.png';
import { useNavigate } from "react-router-dom";

const Transformation = () => {
  const navigate = useNavigate();

  const weeks = [
    {
      week: 1,
      title: "Ajustes e Consciência",
      icon: Zap,
      benefits: [
        "Entendimento das refeições",
        "Criação de rotina de treino",
        "Aumento de energia e leve desinchaço"
      ],
      color: "from-orange-400 to-amber-500"
    },
    {
      week: 2,
      title: "Resultados iniciais",
      icon: Sparkles,
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
      icon: TrendingUp,
      benefits: [
        "Redução perceptível de medidas",
        "Roupas começam a vestir melhor",
        "Menos retenção de líquidos"
      ],
      color: "from-emerald-500 to-teal-600"
    },
    {
      week: 4,
      title: "Transformação",
      icon: Award,
      benefits: [
        "Diferença no espelho e nas fotos",
        "Corpo mais definido",
        "Mais autoconfiança"
      ],
      color: "from-violet-500 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header fixo */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 py-4 px-4 md:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <img src={nutriaLogo} alt="Nutria" className="h-12 md:h-14" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-20 animate-fade-in">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            Veja como sua transformação vai acontecer
            <br />
            <span className="text-[#0d7377]">nas próximas 4 semanas</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 font-medium">
            Pequenas mudanças → grandes resultados
          </p>
        </div>

        {/* Timeline Section */}
        <div className="relative mb-16 md:mb-24">
          {/* Desktop Timeline - Horizontal */}
          <div className="hidden md:block">
            <div className="grid grid-cols-4 gap-6 relative">
              {/* Linha conectora */}
              <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-[#0d7377] via-emerald-500 to-violet-500 -z-10"></div>
              
              {weeks.map((week, index) => {
                const Icon = week.icon;
                return (
                  <div 
                    key={week.week}
                    className="animate-fade-in hover-scale"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100 hover:border-[#0d7377] transition-all duration-300 h-full">
                      {/* Ícone com gradiente */}
                      <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${week.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                      </div>
                      
                      {/* Título */}
                      <div className="text-center mb-4">
                        <p className="text-sm font-bold text-[#0d7377] mb-1">SEMANA {week.week}</p>
                        <h3 className="text-xl font-bold text-gray-900">{week.title}</h3>
                      </div>
                      
                      {/* Benefícios */}
                      <ul className="space-y-2">
                        {week.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle2 className="w-4 h-4 text-[#0d7377] flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
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
          <div className="md:hidden space-y-6">
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
                    <div className="absolute left-10 top-24 bottom-0 w-1 bg-gradient-to-b from-[#0d7377] to-transparent -z-10"></div>
                  )}
                  
                  <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
                    <div className="flex items-start gap-4">
                      {/* Ícone com gradiente */}
                      <div className={`w-20 h-20 flex-shrink-0 rounded-full bg-gradient-to-br ${week.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                      </div>
                      
                      <div className="flex-1">
                        {/* Título */}
                        <div className="mb-3">
                          <p className="text-xs font-bold text-[#0d7377] mb-1">SEMANA {week.week}</p>
                          <h3 className="text-lg font-bold text-gray-900">{week.title}</h3>
                        </div>
                        
                        {/* Benefícios */}
                        <ul className="space-y-2">
                          {week.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <CheckCircle2 className="w-4 h-4 text-[#0d7377] flex-shrink-0 mt-0.5" />
                              <span>{benefit}</span>
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

        {/* Bloco Motivacional */}
        <div className="mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-to-br from-[#0d7377] to-[#14919b] rounded-3xl p-8 md:p-12 text-center shadow-2xl">
            <div className="max-w-3xl mx-auto">
              <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-white mx-auto mb-6" />
              <p className="text-2xl md:text-4xl font-bold text-white leading-tight">
                "Se você dedicar 4 semanas,<br className="hidden md:block" /> o Nutria cuida do resto."
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.75s' }}>
          <Button 
            onClick={() => navigate('/')}
            className="bg-[#0d7377] hover:bg-[#0a5c5f] text-white px-10 py-6 md:px-16 md:py-8 text-lg md:text-2xl font-bold rounded-full shadow-2xl hover:shadow-[0_20px_60px_rgba(13,115,119,0.4)] transition-all duration-300 hover:scale-105 w-full sm:w-auto"
          >
            Quero começar agora
          </Button>
          
          <div>
            <Button 
              onClick={() => navigate(-1)}
              variant="ghost"
              className="text-[#0d7377] hover:text-[#0a5c5f] text-base md:text-lg font-semibold hover:bg-[#0d7377]/5"
            >
              ← Ver plano em detalhes
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs md:text-sm text-gray-500 mt-12 max-w-2xl mx-auto">
          Os resultados podem variar de pessoa para pessoa. O progresso mostrado é uma estimativa baseada em experiências de usuários que seguiram o plano de forma consistente.
        </p>
      </div>
    </div>
  );
};

export default Transformation;
