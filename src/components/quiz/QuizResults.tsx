import { UserProfile } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Target, Flame, Droplet, User, Wind, MapPin, ShieldCheck } from "lucide-react";
import nutriaLogo from '@/assets/nutria-logo.png';
import appPhoneMockup from '@/assets/app-phone-mockup.png';
import bodyCurrentFemale from '@/assets/body-current-female.png';
import bodyGoalFemale from '@/assets/body-goal-female.png';

interface QuizResultsProps {
  profile: UserProfile;
  onRestart: () => void;
}

export const QuizResults = ({ profile, onRestart }: QuizResultsProps) => {
  // Calcular IMC
  const calculateBMI = () => {
    const heightInMeters = profile.height / 100;
    return (profile.currentWeight / (heightInMeters * heightInMeters)).toFixed(2);
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

  // Obter imagem do corpo atual
  const getCurrentBodyImage = () => {
    const bodyType = profile.bodyType.toLowerCase();
    const gender = profile.gender;
    
    if (bodyType.includes('média') || bodyType.includes('average')) {
      return gender === 'female' 
        ? '/images/body-average-female.png'
        : '/images/body-average-male.png';
    } else if (bodyType.includes('magra') || bodyType.includes('thin')) {
      return gender === 'female'
        ? '/images/body-thin-female.png'
        : '/images/body-thin-male.png';
    } else {
      return gender === 'female'
        ? '/images/body-robust-female.png'
        : '/images/body-robust-male.png';
    }
  };

  // Obter imagem do corpo meta
  const getTargetBodyImage = () => {
    const targetType = profile.targetBodyType?.toLowerCase() || profile.goal;
    const gender = profile.gender;
    
    if (targetType.includes('atleta') || targetType.includes('athlete')) {
      return gender === 'female'
        ? '/images/goal-athlete-female.png'
        : '/images/goal-athlete-male.png';
    } else if (targetType.includes('esportivo') || targetType.includes('sporty')) {
      return gender === 'female'
        ? '/images/goal-sporty-female.png'
        : '/images/goal-sporty-male.png';
    } else if (targetType.includes('treinado') || targetType.includes('trained')) {
      return gender === 'female'
        ? '/images/goal-trained-female.png'
        : '/images/goal-trained-male.png';
    }
    return gender === 'female'
      ? '/images/goal-smaller-female.png'
      : '/images/goal-smaller-male.png';
  };

  const bmi = parseFloat(calculateBMI());
  const bmiStatus = getBMIStatus(bmi);
  const calories = calculateCalories();
  const waterIntake = calculateWaterIntake();
  const weightDifference = Math.abs(profile.targetWeight - profile.currentWeight);
  const weightGoal = profile.targetWeight > profile.currentWeight ? `+${weightDifference}kg` : `-${weightDifference}kg`;

  // Calcular idade metabólica (simplificado)
  const metabolicAge = Math.max(18, Math.min(profile.userAge + Math.round((bmi - 22) * 2), 70));

  // Determinar nível de energia
  const getEnergyLevel = () => {
    if (profile.energyLevel === 'high') return 'Ótimo';
    if (profile.energyLevel === 'medium') return 'Bom';
    return 'Baixo';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header fixo */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <img src={nutriaLogo} alt="Nutria" className="h-10" />
          <Button className="bg-[#0d7377] hover:bg-[#0a5c5f] text-white px-6 py-2 rounded-lg font-semibold">
            Obtenha meus resultados
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">
        {/* Seção 1: Comparação Corpo Atual vs Meta */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {/* Corpo Atual */}
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Seu peso</h3>
              <div className="relative bg-white rounded-xl p-3 md:p-6 mb-3 md:mb-4 flex items-center justify-center">
                <img 
                  src={bodyCurrentFemale}
                  alt="Corpo atual" 
                  className="h-48 md:h-80 object-contain"
                />
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm md:text-lg font-bold text-gray-900">Gordura corporal</p>
                  <p className="text-xs md:text-base text-gray-600">{getBodyFatPercentage()}</p>
                </div>
                <div>
                  <p className="text-xs md:text-sm font-semibold text-gray-700 mb-2">Nível de energia</p>
                  <Progress value={35} className="h-2" />
                </div>
              </div>
            </div>

            {/* Corpo Meta */}
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Meta</h3>
              <div className="relative bg-white rounded-xl p-3 md:p-6 mb-3 md:mb-4 flex items-center justify-center">
                <img 
                  src={bodyGoalFemale}
                  alt="Corpo meta" 
                  className="h-48 md:h-80 object-contain"
                />
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm md:text-lg font-bold text-gray-900">Gordura corporal</p>
                  <p className="text-xs md:text-base text-gray-600">{getTargetBodyFatPercentage()}</p>
                </div>
                <div>
                  <p className="text-xs md:text-sm font-semibold text-gray-700 mb-2">Nível de energia</p>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs md:text-sm text-gray-600 mt-4 md:mt-6">
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
            <p className="text-4xl font-bold text-gray-900 mb-4">{bmi} IMC</p>
            
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
                  <p className="text-lg font-bold text-gray-900">{profile.targetZones.join(', ')}</p>
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
        <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
            O que você ganha:
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Texto à esquerda */}
            <div className="space-y-6">
              {/* Planos nutricionais */}
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-full flex-shrink-0">
                  <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-base md:text-lg font-bold text-gray-900">
                    Planos nutricionais personalizados com receitas fáceis de entender
                  </p>
                </div>
              </div>

              {/* Rastreador de água */}
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                  <Droplet className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-base md:text-lg font-bold text-gray-900">
                    Rastreador de água inteligente para hidratação suficiente
                  </p>
                </div>
              </div>

              {/* Temporizador de jejum */}
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <path strokeWidth="2" d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <div>
                  <p className="text-base md:text-lg font-bold text-gray-900">
                    Temporizador de jejum personalizado
                  </p>
                </div>
              </div>
            </div>

            {/* Imagem do celular à direita */}
            <div className="flex justify-center md:justify-end">
              <img 
                src={appPhoneMockup} 
                alt="App Nutria" 
                className="w-full max-w-[280px] md:max-w-sm drop-shadow-2xl"
              />
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <Button 
              className="w-full bg-[#0d7377] hover:bg-[#0a5c5f] text-white py-6 text-lg font-semibold rounded-xl"
              size="lg"
            >
              Começar Meu Plano Agora
            </Button>
          </div>
        </div>

        {/* Seção 6: Garantia de Devolução */}
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="text-8xl">🏅</div>
              <div className="absolute -top-2 -right-2 text-3xl">✨</div>
              <div className="absolute -bottom-2 -left-2 text-3xl">✨</div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Garantia de devolução de dinheiro
          </h2>
          
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Se não obtiver resultados visíveis, você pode solicitar um reembolso total em até 30 dias após a compra. <span className="text-[#0d7377] font-semibold cursor-pointer">Saiba mais</span>
          </p>
          
          <div className="border-t border-gray-300 pt-6 mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Isenção de responsabilidade
            </h3>
            <p className="text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Este site destina-se apenas a fins educacionais e de bem-estar geral. As informações fornecidas não substituem aconselhamento ou tratamento médico. Consulte sempre seu médico ou profissional de saúde antes de iniciar qualquer programa de perda de peso.
            </p>
          </div>
          
          <div className="mt-6 text-xs text-gray-500">
            <p>Copyright © 2024 Nutria</p>
            <p>Todos os direitos reservados</p>
          </div>
        </div>
      </div>
    </div>
  );
};