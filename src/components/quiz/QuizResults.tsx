import { UserProfile } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import nutriaLogo from '@/assets/nutria-logo.png';
import appMockupNutritionReal from '@/assets/app-mockup-nutrition-real.png';
import { getImageSrc } from '@/utils/imageMapping';
import transformationCombinedFemale3 from '@/assets/transformation-combined-female-3.png';
import transformationCombinedFemale4 from '@/assets/transformation-combined-female-4.png';
import transformationCombinedFemale5 from '@/assets/transformation-combined-female-5.png';
import transformationCombinedMale1 from '@/assets/transformation-combined-male-1.png';
import transformationCombinedMale2 from '@/assets/transformation-combined-male-2.png';
import transformationCombinedMale3 from '@/assets/transformation-combined-male-3.png';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface QuizResultsProps {
  profile: UserProfile;
  onRestart: () => void;
}

export const QuizResults = ({ profile, onRestart }: QuizResultsProps) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  // Helper functions
  const getCurrentBodyImage = () => {
    const bodyType = profile.bodyType?.toLowerCase() || '';
    const gender = profile.gender;
    
    if (gender === 'female') {
      if (bodyType.includes('fuller') || bodyType === 'fuller' || 
          bodyType.includes('overweight') || bodyType === 'overweight') {
        return getImageSrc('body-fuller-female-results');
      } else {
        return getImageSrc('body-average-female-results');
      }
    } else {
      if (bodyType.includes('thin') || bodyType === 'thin') {
        return getImageSrc('body-thin-male-real');
      } else if (bodyType.includes('average') || bodyType === 'average') {
        return getImageSrc('body-average-male-real');
      } else if (bodyType.includes('fuller') || bodyType === 'fuller') {
        return getImageSrc('body-overweight-male-shorts');
      } else if (bodyType.includes('overweight') || bodyType === 'overweight') {
        return getImageSrc('body-obese-male-shorts');
      }
      return getImageSrc('body-average-male-real');
    }
  };

  const getTargetBodyImage = () => {
    const gender = profile.gender;
    
    if (gender === 'female') {
      return getImageSrc('body-goal-female-results');
    } else {
      const targetType = profile.targetBodyType?.toLowerCase() || '';
      if (targetType.includes('slim') || targetType === 'slim') {
        return getImageSrc('goal-slim-male');
      } else if (targetType.includes('defined') || targetType === 'defined') {
        return getImageSrc('goal-defined-male');
      } else if (targetType.includes('athlete') || targetType === 'athlete') {
        return getImageSrc('goal-athlete-male');
      }
      return getImageSrc('goal-slim-male');
    }
  };

  const calculateBMI = () => {
    if (!profile.height || !profile.currentWeight) {
      return '0.00';
    }
    const heightInMeters = profile.height / 100;
    const bmi = (profile.currentWeight / (heightInMeters * heightInMeters)).toFixed(1);
    return bmi;
  };

  const getBodyFatPercentage = () => {
    const bmi = parseFloat(calculateBMI());
    if (profile.gender === 'female') {
      return `${Math.round(21 + (bmi - 22) * 0.8)}-${Math.round(24 + (bmi - 22) * 0.8)}%`;
    }
    return `${Math.round(18 + (bmi - 22) * 0.8)}-${Math.round(21 + (bmi - 22) * 0.8)}%`;
  };

  const calculateTargetBMI = () => {
    const heightInMeters = profile.height / 100;
    return (profile.targetWeight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const getTargetBodyFatPercentage = () => {
    const targetBMI = parseFloat(calculateTargetBMI());
    if (profile.gender === 'female') {
      return `${Math.round(21 + (targetBMI - 22) * 0.8)}-${Math.round(24 + (targetBMI - 22) * 0.8)}%`;
    }
    return `${Math.round(18 + (targetBMI - 22) * 0.8)}-${Math.round(21 + (targetBMI - 22) * 0.8)}%`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header fixo */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 py-4 px-4 md:px-6 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <img src={nutriaLogo} alt="Nutria" className="h-12 md:h-14" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">
        {/* ⭐ SEÇÃO 1 — HEADER DA REVELAÇÃO */}
        <div className="text-center space-y-4 py-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Análise concluída! Seu corpo acabou de revelar o que estava escondido…
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            E isso explica exatamente porque você trava — e como destravar a partir de agora.
          </p>
        </div>

        {/* Comparação de Corpo - Você agora vs Você daqui 1 mês */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-6 md:p-10 shadow-lg">
          <div className="grid grid-cols-2 gap-6 md:gap-10 items-start">
            {/* Você agora */}
            <div className="text-center">
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 min-h-[40px] md:min-h-[52px] flex items-end justify-center">
                Você agora
              </h3>
              <div className="relative bg-white rounded-2xl p-4 md:p-8 mb-4 md:mb-6 flex items-start justify-center shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src={getCurrentBodyImage()}
                  alt="Corpo atual" 
                  className="w-full max-w-[140px] md:max-w-[220px] h-auto object-contain"
                />
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm md:text-lg font-bold text-gray-900">Gordura corporal</p>
                  <p className="text-xs md:text-base text-gray-600">{getBodyFatPercentage()}</p>
                </div>
                <div>
                  <p className="text-xs md:text-sm font-semibold text-gray-700 mb-2">Nível de energia</p>
                  <Progress value={35} className="h-2 md:h-2.5" />
                </div>
              </div>
            </div>

            {/* Você daqui 1 mês */}
            <div className="text-center">
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 min-h-[40px] md:min-h-[52px] flex items-end justify-center">
                Você daqui 1 mês
              </h3>
              <div className="relative bg-white rounded-2xl p-4 md:p-8 mb-4 md:mb-6 flex items-start justify-center shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src={getTargetBodyImage()}
                  alt="Corpo meta" 
                  className="w-full max-w-[140px] md:max-w-[220px] h-auto object-contain"
                />
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm md:text-lg font-bold text-gray-900">Gordura corporal</p>
                  <p className="text-xs md:text-base text-gray-600">{getTargetBodyFatPercentage()}</p>
                </div>
                <div>
                  <p className="text-xs md:text-sm font-semibold text-gray-700 mb-2">Nível de energia</p>
                  <Progress value={85} className="h-2 md:h-2.5" />
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs md:text-sm text-gray-600 mt-6 md:mt-8">
            Os resultados não são típicos. Os resultados individuais podem variar.
          </p>
        </div>

        {/* ⭐ SEÇÃO 2 — DIAGNÓSTICO PERSONALIZADO */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 md:p-12 border-2 border-primary/20 shadow-xl">
          <div className="text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              🔬 Seu padrão metabólico identificado:
            </h2>
            <div className="bg-gradient-to-r from-white to-primary/10 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-primary/30">
              <p className="text-2xl md:text-4xl font-bold text-primary">
                Metabolismo Reativo com Tendência Inflamatória {profile.gender === 'female' ? 'Feminina' : 'Masculina'}
              </p>
            </div>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Esse padrão explica por que você incha facilmente, sente oscilação de energia, tem dificuldade de ver resultados e acaba frustrad{profile.gender === 'female' ? 'a' : 'o'} mesmo seguindo dietas 'certinhas'.
            </p>
            <div className="bg-gradient-to-r from-primary/15 to-primary/20 rounded-xl p-6 border-2 border-primary/30">
              <p className="text-gray-900 text-lg md:text-xl font-bold">
                💚 A boa notícia é: esse tipo metabólico responde extremamente bem ao protocolo que montei para você.
              </p>
            </div>
          </div>
        </div>

        {/* ⭐ SEÇÃO 3 — ANÁLISE DETALHADA */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
            O que acontece no seu corpo:
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="flex items-start gap-3 p-5 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border-2 border-red-200 shadow-md hover:shadow-lg transition-all">
              <div className="text-red-600 text-2xl font-bold">✔</div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Retenção corporal</h3>
              </div>
            </div>
            <div className="flex items-start gap-3 p-5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200 shadow-md hover:shadow-lg transition-all">
              <div className="text-orange-600 text-2xl font-bold">✔</div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Ansiedade metabólica</h3>
              </div>
            </div>
            <div className="flex items-start gap-3 p-5 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border-2 border-yellow-200 shadow-md hover:shadow-lg transition-all">
              <div className="text-yellow-600 text-2xl font-bold">✔</div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Pico de estresse interno</h3>
              </div>
            </div>
            <div className="flex items-start gap-3 p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 shadow-md hover:shadow-lg transition-all">
              <div className="text-blue-600 text-2xl font-bold">✔</div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Falta de resposta a dietas comuns</h3>
              </div>
            </div>
            <div className="flex items-start gap-3 p-5 bg-gradient-to-br from-primary/10 to-primary/15 rounded-xl border-2 border-primary/20 shadow-md hover:shadow-lg transition-all">
              <div className="text-primary text-2xl font-bold">✔</div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Oscilação de peso</h3>
              </div>
            </div>
            <div className="flex items-start gap-3 p-5 bg-gradient-to-br from-primary/10 to-primary/15 rounded-xl border-2 border-primary/20 shadow-md hover:shadow-lg transition-all">
              <div className="text-primary text-2xl font-bold">✔</div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Inflamação silenciosa</h3>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-primary/15 to-primary/20 rounded-2xl p-6 border-2 border-primary/30">
            <p className="text-center text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
              <strong className="text-primary">Nada disso é culpa sua.</strong> Seu corpo não responde a dietas prontas — ele precisa de algo criado especificamente para o <strong className="text-primary">SEU padrão metabólico</strong>.
            </p>
          </div>
        </div>

        {/* ⭐ SEÇÃO 3 — A OFERTA PRINCIPAL (Tripwire) */}
        <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-3xl p-8 md:p-12 border-2 border-amber-200 shadow-2xl">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold">
              <span>🔓</span> REVELAÇÃO EXCLUSIVA
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
              Apresentando: O Protocolo Internacional de Alívio Imediato
            </h2>
            
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              A <span className="text-amber-700 font-bold">"Manobra Alemã"</span> de 3 minutos + O Guia de Desinflamação Express de 72h
            </p>
            
            {/* Visual Mockups */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-200 flex-1 max-w-xs">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">🎬</span>
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">Vídeo Tutorial</h4>
                <p className="text-gray-600 text-sm">Manobra de drenagem passo a passo</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-200 flex-1 max-w-xs">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">📋</span>
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">Guia PDF Express</h4>
                <p className="text-gray-600 text-sm">Protocolo alimentar de 3 dias</p>
              </div>
            </div>
            
            {/* Bullets de Benefícios */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-amber-200 text-left space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-700 font-bold">✓</span>
                </div>
                <p className="text-gray-800 text-base md:text-lg">
                  <strong className="text-amber-800">Aprenda em vídeo</strong> a manobra manual exata que eu trouxe da Europa para <strong>drenar a sensação de peso antes de dormir.</strong>
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-700 font-bold">✓</span>
                </div>
                <p className="text-gray-800 text-base md:text-lg">
                  <strong className="text-amber-800">O protocolo alimentar de apenas 3 dias</strong> focado em <strong>murchar a inflamação aguda rapidamente.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ⭐ SEÇÃO 4 — BÔNUS "CAVALO DE TROIA" */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 border-2 border-indigo-200 shadow-2xl">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
              <span>🎁</span> MAS ESPERE!
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
              Eu não vou te deixar sozinha depois disso.
            </h2>
            
            {/* Mockup da Plataforma */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-indigo-200 max-w-lg mx-auto">
              <img 
                src={appMockupNutritionReal}
                alt="Plataforma Completa"
                className="w-full max-w-[280px] mx-auto drop-shadow-2xl mb-4"
              />
              <p className="text-sm text-gray-500">Interface da plataforma com treinos, receitas e comunidade</p>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-6 md:p-8 border-2 border-indigo-300">
              <h3 className="text-xl md:text-2xl font-bold text-indigo-900 mb-4">
                🎁 BÔNUS INÉDITO: Acesso GRATUITO à minha Plataforma Completa
              </h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                Se você garantir o Protocolo de Alívio acima <strong className="text-indigo-800">HOJE</strong>, eu vou te dar de presente o <strong className="text-indigo-800">acesso total</strong> à minha plataforma com todos os planos alimentares faseados, treinos específicos para lipedema que não inflamam e suporte.
              </p>
              
              {/* O que está incluso */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <span className="text-2xl mb-2 block">🍽️</span>
                  <h4 className="font-bold text-gray-900 text-sm">Planos Alimentares</h4>
                  <p className="text-xs text-gray-600">Faseados e personalizados</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <span className="text-2xl mb-2 block">💪</span>
                  <h4 className="font-bold text-gray-900 text-sm">Treinos Específicos</h4>
                  <p className="text-xs text-gray-600">Que não inflamam</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <span className="text-2xl mb-2 block">💬</span>
                  <h4 className="font-bold text-gray-900 text-sm">Suporte Exclusivo</h4>
                  <p className="text-xs text-gray-600">Comunidade e chat</p>
                </div>
              </div>
              
              {/* Âncora de Valor */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-4 text-white">
                <p className="text-sm mb-1">Valor real da plataforma:</p>
                <p className="text-2xl font-bold line-through opacity-80">R$ 997/ano</p>
                <p className="text-3xl font-bold text-yellow-300 mt-2">HOJE PARA VOCÊ: R$ 0,00</p>
              </div>
            </div>
          </div>
        </div>

        {/* ⭐ SEÇÃO 5 — FECHAMENTO "SEM PENSAR" */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-primary/20">
          <div className="text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Veja tudo que você está levando:
            </h2>
            
            {/* Pilha de Valor */}
            <div className="space-y-4 max-w-lg mx-auto text-left">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✅</span>
                  <span className="font-medium text-gray-800">Protocolo Internacional de Alívio Imediato</span>
                </div>
                <span className="text-gray-500 font-semibold">R$ 197</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✅</span>
                  <span className="font-medium text-gray-800">BÔNUS VIP: Acesso à Plataforma Completa</span>
                </div>
                <span className="text-gray-500 font-semibold">R$ 997</span>
              </div>
              
              <div className="border-t-2 border-dashed border-gray-300 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">Valor Total:</span>
                  <span className="text-xl font-bold text-gray-500 line-through">R$ 1.194</span>
                </div>
              </div>
            </div>
            
            {/* Preço Final */}
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 md:p-10 text-white shadow-2xl">
              <p className="text-lg md:text-xl font-medium mb-2">🔥 HOJE POR APENAS:</p>
              <div className="flex flex-col items-center gap-2 mb-4">
                <p className="text-4xl md:text-6xl font-bold">12x de R$ 9,90</p>
                <p className="text-lg opacity-90">ou <span className="font-bold">R$ 97 à vista</span></p>
              </div>
              
              <a 
                href="https://www.ggcheckout.com/checkout/v2/sAxm8xS5o2d9po6HDheO"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-400 text-gray-900 px-8 py-4 md:px-12 md:py-5 text-lg md:text-xl font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-200 animate-pulse"
              >
                QUERO MEU ALÍVIO IMEDIATO + ACESSO TOTAL À PLATAFORMA
              </a>
              
              <p className="text-sm mt-4 text-white/80">✨ Acesso imediato após confirmação</p>
            </div>
            
            {/* Selo de Garantia */}
            <div className="flex items-center justify-center gap-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 max-w-md mx-auto">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
              <div className="text-left">
                <p className="font-bold text-green-800">Garantia de 7 dias</p>
                <p className="text-sm text-green-700">Satisfação garantida ou seu dinheiro de volta</p>
              </div>
            </div>
          </div>
        </div>

        {/* ⭐ SEÇÃO 8 — PROVA SOCIAL */}
        <section className="py-12 bg-gradient-to-br from-orange-50/50 to-amber-50/50 rounded-3xl">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
              ✨ Histórias de Transformação Reais
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Pessoas que mudaram suas vidas com o método personalizado
            </p>
            
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto mb-8"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {profile.gender === 'male' ? (
                  <>
                    {/* Transformações Masculinas */}
                    <CarouselItem className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                        <div className="p-4">
                          <div className="flex justify-between mb-2">
                            <p className="text-xs text-gray-500 text-center font-semibold flex-1">ANTES</p>
                            <p className="text-xs text-gray-500 text-center font-semibold flex-1">DEPOIS</p>
                          </div>
                          <img 
                            src={transformationCombinedMale1} 
                            alt="Transformação Ricardo" 
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </div>
                        <div className="p-6 pt-2">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Ricardo, -35kg</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            "Transformação incrível! Recuperei minha saúde e energia."
                          </p>
                        </div>
                      </div>
                    </CarouselItem>

                    <CarouselItem className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                        <div className="p-4">
                          <div className="flex justify-between mb-2">
                            <p className="text-xs text-gray-500 text-center font-semibold flex-1">ANTES</p>
                            <p className="text-xs text-gray-500 text-center font-semibold flex-1">DEPOIS</p>
                          </div>
                          <img 
                            src={transformationCombinedMale2} 
                            alt="Transformação Felipe" 
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </div>
                        <div className="p-6 pt-2">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Felipe, -25kg</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            "Mudança completa! Me sinto mais forte e confiante."
                          </p>
                        </div>
                      </div>
                    </CarouselItem>

                    <CarouselItem className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                        <div className="p-4">
                          <div className="flex justify-between mb-2">
                            <p className="text-xs text-gray-500 text-center font-semibold flex-1">ANTES</p>
                            <p className="text-xs text-gray-500 text-center font-semibold flex-1">DEPOIS</p>
                          </div>
                          <img 
                            src={transformationCombinedMale3} 
                            alt="Transformação Marcelo" 
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </div>
                        <div className="p-6 pt-2">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Marcelo, -40kg</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            "Resultado extraordinário! Transformei completamente minha vida."
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  </>
                ) : (
                  <>
                    {/* Transformações Femininas */}
                    <CarouselItem className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                        <div className="p-4">
                          <div className="flex justify-between mb-2">
                            <p className="text-xs text-gray-500 text-center font-semibold flex-1">ANTES</p>
                            <p className="text-xs text-gray-500 text-center font-semibold flex-1">DEPOIS</p>
                          </div>
                          <img 
                            src={transformationCombinedFemale4} 
                            alt="Transformação Camila" 
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </div>
                        <div className="p-6 pt-2">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Camila, -10kg</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            "Resultados visíveis em poucos meses! Me sinto mais confiante e saudável."
                          </p>
                        </div>
                      </div>
                    </CarouselItem>

                    <CarouselItem className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                        <div className="p-4">
                          <div className="flex justify-between mb-2">
                            <p className="text-xs text-gray-500 text-center font-semibold flex-1">ANTES</p>
                            <p className="text-xs text-gray-500 text-center font-semibold flex-1">DEPOIS</p>
                          </div>
                          <img 
                            src={transformationCombinedFemale5} 
                            alt="Transformação Juliana" 
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </div>
                        <div className="p-6 pt-2">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Juliana, -14kg</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            "Mudança incrível! Recuperei minha autoestima e me sinto radiante."
                          </p>
                        </div>
                      </div>
                    </CarouselItem>

                    <CarouselItem className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                        <div className="p-4">
                          <div className="flex justify-between mb-2">
                            <p className="text-xs text-gray-500 text-center font-semibold flex-1">ANTES</p>
                            <p className="text-xs text-gray-500 text-center font-semibold flex-1">DEPOIS</p>
                          </div>
                          <img 
                            src={transformationCombinedFemale3} 
                            alt="Transformação Patricia" 
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </div>
                        <div className="p-6 pt-2">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Patricia, -15kg</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            "Transformação incrível! Me sinto completamente renovada e cheia de energia."
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  </>
                )}
              </CarouselContent>

              <CarouselPrevious className="-left-4 md:-left-12" />
              <CarouselNext className="-right-4 md:-right-12" />
            </Carousel>

            <div className="text-center mt-6">
              <a 
                href="https://www.ggcheckout.com/checkout/v2/sAxm8xS5o2d9po6HDheO"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-6 py-2.5 md:px-10 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
              >
                Quero ser o próximo resultado
              </a>
            </div>
          </div>
        </section>

        {/* ⭐ SEÇÃO 9 — FINALIZAÇÃO EMOCIONAL */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-6 md:p-8 lg:p-12 text-center shadow-lg border border-primary/20">
          <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-5 md:mb-6">
            Agora que você finalmente sabe o seu <strong className="text-primary">padrão metabólico</strong>… 
            <br />
            <span className="text-primary font-semibold">está nas suas mãos transformar seu corpo com o método certo.</span>
          </p>
          <a 
            href="https://www.ggcheckout.com/checkout/v2/sAxm8xS5o2d9po6HDheO"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-white px-6 py-2.5 md:px-10 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            Sim, eu quero transformar meu corpo agora! 🔥
          </a>
        </div>

        {/* Rodapé */}
        <div className="text-center space-y-6 pt-12 pb-8">
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <Heart className="w-6 h-6 text-primary" fill="currentColor" />
            <p className="text-lg font-medium">
              Feito com dedicação para sua jornada de transformação
            </p>
          </div>
          
          <p className="text-gray-500 text-sm">
            © 2024 Método Monjour - Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  );
};