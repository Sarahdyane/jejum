import { UserProfile } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Target, Flame, Droplet, User, Wind, MapPin, ShieldCheck } from "lucide-react";
import nutriaLogo from '@/assets/nutria-logo.png';
import appPhoneMockup from '@/assets/app-phone-mockup.png';
import appMockupNutrition from '@/assets/app-mockup-nutrition-real.png';
import { getImageSrc } from '@/utils/imageMapping';

interface QuizResultsProps {
  profile: UserProfile;
  onRestart: () => void;
}

export const QuizResults = ({ profile, onRestart }: QuizResultsProps) => {
  // Calcular IMC - validar se os dados existem
  const calculateBMI = () => {
    if (!profile.height || !profile.currentWeight) {
      return '0.00';
    }
    const heightInMeters = profile.height / 100;
    const bmi = (profile.currentWeight / (heightInMeters * heightInMeters)).toFixed(1);
    return bmi;
  };

  const calculateTargetBMI = () => {
    const heightInMeters = profile.height / 100;
    return (profile.targetWeight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  // Determinar status do IMC
  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return 'Abaixo do peso';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Sobrepeso';
    return 'Obeso';
  };

  // Calcular percentual de gordura corporal estimado
  const getBodyFatPercentage = () => {
    const bmi = parseFloat(calculateBMI());
    // Fórmula simplificada baseada em IMC e gênero
    if (profile.gender === 'female') {
      return `${Math.round(21 + (bmi - 22) * 0.8)}-${Math.round(24 + (bmi - 22) * 0.8)}%`;
    }
    return `${Math.round(18 + (bmi - 22) * 0.8)}-${Math.round(21 + (bmi - 22) * 0.8)}%`;
  };

  const getTargetBodyFatPercentage = () => {
    const targetBMI = parseFloat(calculateTargetBMI());
    if (profile.gender === 'female') {
      return `${Math.round(21 + (targetBMI - 22) * 0.8)}-${Math.round(24 + (targetBMI - 22) * 0.8)}%`;
    }
    return `${Math.round(18 + (targetBMI - 22) * 0.8)}-${Math.round(21 + (targetBMI - 22) * 0.8)}%`;
  };

  // Calcular ingestão calórica recomendada
  const calculateCalories = () => {
    // Fórmula simplificada baseada em peso, altura, idade e objetivo
    let bmr;
    if (profile.gender === 'male') {
      bmr = 10 * profile.currentWeight + 6.25 * profile.height - 5 * profile.userAge + 5;
    } else {
      bmr = 10 * profile.currentWeight + 6.25 * profile.height - 5 * profile.userAge - 161;
    }

    // Ajustar baseado no objetivo
    if (profile.goal === 'lose-weight') {
      return Math.round(bmr * 1.3 - 300);
    } else if (profile.goal === 'gain-weight') {
      return Math.round(bmr * 1.5 + 300);
    }
    return Math.round(bmr * 1.4);
  };

  // Calcular ingestão de água recomendada
  const calculateWaterIntake = () => {
    // 35ml por kg de peso corporal
    return ((profile.currentWeight * 35) / 1000).toFixed(1);
  };

  // Obter imagem do corpo atual baseado nas respostas do quiz
  const getCurrentBodyImage = () => {
    const bodyType = profile.bodyType?.toLowerCase() || '';
    const gender = profile.gender;
    
    if (gender === 'female') {
      // Para mulheres, usar as novas imagens dos resultados
      if (bodyType.includes('fuller') || bodyType === 'fuller' || 
          bodyType.includes('overweight') || bodyType === 'overweight') {
        // Gordinha ou Sobrepeso -> imagem fuller
        return getImageSrc('body-fuller-female-results');
      } else {
        // Magra ou Média -> imagem average
        return getImageSrc('body-average-female-results');
      }
    } else {
      // Para homens, usar imagens mais comuns para magro e médio
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

  // Obter imagem do corpo meta baseado nas respostas do quiz
  const getTargetBodyImage = () => {
    const gender = profile.gender;
    
    if (gender === 'female') {
      // Para mulheres, sempre usar a imagem goal-female-results
      return getImageSrc('body-goal-female-results');
    } else {
      // Para homens, manter a lógica original
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

  const bmi = parseFloat(calculateBMI());
  const bmiStatus = getBMIStatus(bmi);
  const calories = calculateCalories();
  const waterIntake = calculateWaterIntake();
  
  // Mostrar o peso desejado como meta
  const weightGoal = `${profile.targetWeight}kg`;

  // Calcular idade metabólica (simplificado)
  const metabolicAge = Math.max(18, Math.min(profile.userAge + Math.round((bmi - 22) * 2), 70));

  // Determinar nível de energia baseado na resposta da pergunta 18
  const getEnergyLevel = () => {
    if (profile.energyLevel === 'great-most') return 'Ótimo';
    if (profile.energyLevel === 'inconsistent') return 'Bom';
    if (profile.energyLevel === 'morning-good') return 'Moderado';
    return 'Baixo';
  };

  // Traduzir zonas alvo para português
  const translateZones = (zones: string[]) => {
    const translations: Record<string, string> = {
      'belly': 'Barriga',
      'chest': 'Peito',
      'arms': 'Braços',
      'legs': 'Pernas',
      'butt': 'Glúteos',
      'thighs': 'Coxas',
      'back': 'Costas',
      'face': 'Rosto',
      'neck': 'Pescoço',
      'hips': 'Quadris'
    };
    return zones.map(zone => translations[zone] || zone);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header fixo */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 py-4 px-4 md:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <img src={nutriaLogo} alt="Nutria" className="h-8 md:h-10" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">
        {/* Seção 1: Comparação Corpo Atual vs Meta */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-3 sm:p-6 md:p-10 shadow-lg">
          <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-10">
            {/* Corpo Atual */}
            <div className="text-center">
              <h3 className="text-sm sm:text-lg md:text-2xl font-bold text-gray-900 mb-2 sm:mb-4 md:mb-6">Seu peso</h3>
              <div className="relative bg-white rounded-xl md:rounded-2xl p-2 sm:p-4 md:p-10 mb-2 sm:mb-4 md:mb-6 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src={getCurrentBodyImage()}
                  alt="Corpo atual" 
                  className="w-full max-w-[140px] sm:max-w-[180px] md:max-w-none md:h-[400px] h-auto object-contain"
                />
              </div>
              <div className="space-y-2 md:space-y-3 px-1">
                <div>
                  <p className="text-xs sm:text-sm md:text-lg font-bold text-gray-900">Gordura corporal</p>
                  <p className="text-[10px] sm:text-xs md:text-base text-gray-600">{getBodyFatPercentage()}</p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">Nível de energia</p>
                  <Progress value={35} className="h-1.5 sm:h-2 md:h-2.5" />
                </div>
              </div>
            </div>

            {/* Corpo Meta */}
            <div className="text-center">
              <h3 className="text-sm sm:text-lg md:text-2xl font-bold text-gray-900 mb-2 sm:mb-4 md:mb-6">Meta</h3>
              <div className="relative bg-white rounded-xl md:rounded-2xl p-2 sm:p-4 md:p-10 mb-2 sm:mb-4 md:mb-6 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src={getTargetBodyImage()}
                  alt="Corpo meta" 
                  className="w-full max-w-[140px] sm:max-w-[180px] md:max-w-none md:h-[400px] h-auto object-contain"
                />
              </div>
              <div className="space-y-2 md:space-y-3 px-1">
                <div>
                  <p className="text-xs sm:text-sm md:text-lg font-bold text-gray-900">Gordura corporal</p>
                  <p className="text-[10px] sm:text-xs md:text-base text-gray-600">{getTargetBodyFatPercentage()}</p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">Nível de energia</p>
                  <Progress value={85} className="h-1.5 sm:h-2 md:h-2.5" />
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-[10px] sm:text-xs md:text-sm text-gray-600 mt-3 sm:mt-6 md:mt-8 px-2">
            Os resultados não são típicos. Os resultados individuais podem variar.
          </p>
        </div>

        {/* Seção 2: Resumo Pessoal */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Resumo pessoal baseado em suas respostas
          </h2>

          {/* IMC Atual */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">IMC atual</h3>
            <p className="text-4xl font-bold text-gray-900 mb-4">{bmi}</p>
            
            {/* Escala de IMC */}
            <div className="relative mb-4">
              <div className="h-3 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400 rounded-full"></div>
              <div 
                className="absolute top-0 w-4 h-4 bg-white border-4 border-gray-900 rounded-full transform -translate-y-0.5"
                style={{ left: `${Math.min(Math.max((bmi - 15) / 25 * 100, 0), 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-600 mb-4">
              <span>Abaixo do peso</span>
              <span>Obeso</span>
            </div>

            <div className="bg-[#0d7377]/10 border-l-4 border-[#0d7377] p-4 rounded">
              <p className="font-semibold text-[#0d7377] mb-2">{bmiStatus}</p>
              <p className="text-sm text-gray-700">
                O índice de massa corporal (IMC) é uma medida que usa sua altura e peso para determinar se seu peso é saudável.
              </p>
            </div>
          </div>

          {/* Ingestão Calórica */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6 relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-orange-100 p-3 rounded-xl flex-shrink-0">
                <Flame className="w-8 h-8 text-orange-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-lg font-semibold text-gray-900">Ingestão calórica diária</p>
                  <span className="bg-white border-2 border-[#0d7377] text-[#0d7377] px-3 py-0.5 rounded-full text-xs font-semibold">
                    RECOMENDADO
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mt-1">{calories} kcal</p>
              </div>
            </div>
            <div className="relative mt-4">
              <div className="h-3 bg-gradient-to-r from-yellow-200 via-orange-300 to-red-300 rounded-full"></div>
              <div 
                className="absolute top-0 w-4 h-4 bg-white border-4 border-orange-500 rounded-full transform -translate-y-0.5"
                style={{ left: `${Math.min(Math.max(((calories - 1000) / 4000) * 100, 0), 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>1000 kcal</span>
              <span>5000 kcal</span>
            </div>
          </div>

          {/* Ingestão de Água */}
          <div className="bg-gray-50 rounded-2xl p-6 relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-xl flex-shrink-0">
                <Droplet className="w-8 h-8 text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-lg font-semibold text-gray-900">Ingestão diária de água</p>
                  <span className="bg-white border-2 border-[#0d7377] text-[#0d7377] px-3 py-0.5 rounded-full text-xs font-semibold">
                    RECOMENDADO
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mt-1">{waterIntake} l</p>
              </div>
            </div>
            {/* Copos de água estilizados */}
            <div className="flex gap-2 justify-center mt-6">
              {[...Array(8)].map((_, i) => {
                const filled = i < Math.round(parseFloat(waterIntake) / 0.25);
                return (
                  <svg 
                    key={i} 
                    width="32" 
                    height="48" 
                    viewBox="0 0 32 48" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0"
                  >
                    {/* Copo */}
                    <path 
                      d="M6 4 L26 4 L24 44 L8 44 Z" 
                      fill={filled ? '#60A5FA' : '#E5E7EB'} 
                      stroke={filled ? '#3B82F6' : '#D1D5DB'} 
                      strokeWidth="1.5"
                    />
                    {/* Água dentro */}
                    {filled && (
                      <path 
                        d="M7 10 L25 10 L23.5 42 L8.5 42 Z" 
                        fill="#93C5FD" 
                        opacity="0.8"
                      />
                    )}
                  </svg>
                );
              })}
            </div>
          </div>
        </div>

        {/* Seção 3: Seu plano personalizado está pronto */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Seu plano personalizado <span className="text-[#0d7377]">está pronto!</span>
          </h2>

          <div className="space-y-3 mt-6">
            {/* Meta */}
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-full flex-shrink-0">
                <Target className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Meta</p>
                <p className="text-lg font-bold text-gray-900">{weightGoal}</p>
              </div>
            </div>

            {/* Idade Metabólica */}
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-full flex-shrink-0">
                <User className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Idade metabólica</p>
                <p className="text-lg font-bold text-gray-900">{metabolicAge}</p>
              </div>
            </div>

            {/* Nível de Energia */}
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-full flex-shrink-0">
                <Wind className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Nível de energia</p>
                <p className="text-lg font-bold text-gray-900">{getEnergyLevel()}</p>
              </div>
            </div>

            {/* Zonas Alvo */}
            {profile.targetZones && profile.targetZones.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                  <MapPin className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Zonas alvo</p>
                  <p className="text-lg font-bold text-gray-900">{translateZones(profile.targetZones).join(', ')}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Seção 4: As metas do seu plano também incluem */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            As metas do seu plano também incluem:
          </h2>
          
          <div className="space-y-3">
            {[
              'Reduzir o estresse',
              'Para se sentir mais saudável',
              'Autodisciplina',
              'Crie um hábito saudável',
              'Melhore o sono'
            ].map((goal, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="w-6 h-6 text-[#0d7377] flex-shrink-0" />
                <span className="text-lg text-gray-900">{goal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Seção 5: O que você ganha */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
              O que você ganha
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Tudo o que você precisa para atingir seus objetivos de fitness em um só lugar
            </p>
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center">
              {/* Phone Mockup */}
              <div className="flex-shrink-0">
                <img 
                  src={appMockupNutrition} 
                  alt="Nutria App" 
                  className="w-full max-w-[280px] md:max-w-[340px] h-auto object-contain drop-shadow-2xl"
                />
              </div>

              {/* Features List */}
              <div className="space-y-6 max-w-xl">
                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#0d7377] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      Planos nutricionais personalizados com receitas fáceis de entender
                    </h3>
                    <p className="text-gray-600">
                      Receba planos alimentares adaptados às suas necessidades e preferências
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#0d7377] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      Rastreador de água inteligente para hidratação suficiente
                    </h3>
                    <p className="text-gray-600">
                      Monitore sua ingestão de água e mantenha-se hidratado ao longo do dia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#0d7377] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      Temporizador de jejum personalizado
                    </h3>
                    <p className="text-gray-600">
                      Acompanhe seus períodos de jejum intermitente de forma simples e eficaz
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="text-center py-8">
          <Button 
            onClick={onRestart}
            className="bg-[#0d7377] hover:bg-[#0a5c5f] text-white px-12 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Continuar
          </Button>
        </div>

        {/* Garantia e Rodapé */}
        <div className="text-center space-y-6 pt-12 pb-8">
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <ShieldCheck className="w-6 h-6 text-[#0d7377]" />
            <span className="font-semibold">Garantia de 30 dias de devolução do dinheiro</span>
          </div>
          
          <p className="text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Se não obtiver resultados visíveis, você pode solicitar um reembolso total em até 30 dias após a compra. <span className="text-[#0d7377] font-semibold cursor-pointer">Saiba mais</span>
          </p>
          
          <div className="mt-6 text-xs text-gray-500">
            <p>Copyright © 2024 Nutria</p>
            <p>Todos os direitos reservados</p>
          </div>
        </div>
      </div>
    </div>
  );
};