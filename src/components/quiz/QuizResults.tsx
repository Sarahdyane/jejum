import { UserProfile } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Target, Flame, Droplet, User, Wind, MapPin, ShieldCheck } from "lucide-react";
import nutriaLogo from '@/assets/nutria-logo.png';
import appPhoneMockup from '@/assets/app-phone-mockup.png';
import { getImageSrc } from '@/utils/imageMapping';

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

  // Obter imagem do corpo atual baseado nas respostas do quiz
  const getCurrentBodyImage = () => {
    const bodyType = profile.bodyType?.toLowerCase() || '';
    const gender = profile.gender;
    
    // Mapear o tipo de corpo atual para a imagem correta
    if (bodyType.includes('thin') || bodyType === 'thin') {
      return getImageSrc(gender === 'female' ? 'body-thin-female-real' : 'body-thin-male-shorts');
    } else if (bodyType.includes('average') || bodyType === 'average') {
      return getImageSrc(gender === 'female' ? 'body-average-female-real' : 'body-fuller-male-shorts');
    } else if (bodyType.includes('fuller') || bodyType === 'fuller') {
      return getImageSrc(gender === 'female' ? 'body-fuller-female-real' : 'body-fuller-male-new-shorts');
    } else if (bodyType.includes('overweight') || bodyType === 'overweight') {
      return getImageSrc(gender === 'female' ? 'body-overweight-female-real' : 'body-overweight-male-shorts');
    }
    
    // Fallback para imagem média se não houver match
    return getImageSrc(gender === 'female' ? 'body-average-female-real' : 'body-fuller-male-shorts');
  };

  // Obter imagem do corpo meta baseado nas respostas do quiz
  const getTargetBodyImage = () => {
    const targetType = profile.targetBodyType?.toLowerCase() || '';
    const gender = profile.gender;
    
    // Mapear o objetivo de corpo para a imagem correta
    if (targetType.includes('slim') || targetType === 'slim') {
      return getImageSrc(gender === 'female' ? 'goal-slim-female' : 'goal-slim-male');
    } else if (targetType.includes('defined') || targetType === 'defined') {
      return getImageSrc(gender === 'female' ? 'goal-defined-female' : 'goal-defined-male');
    } else if (targetType.includes('athlete') || targetType === 'athlete') {
      return getImageSrc(gender === 'female' ? 'goal-athlete-female' : 'goal-athlete-male');
    }
    
    // Fallback para imagem slim se não houver match
    return getImageSrc(gender === 'female' ? 'goal-slim-female' : 'goal-slim-male');
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
                  src={getCurrentBodyImage()}
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
                  src={getTargetBodyImage()}
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
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
            O que você ganha:
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Lista de benefícios */}
            <div className="space-y-4 order-2 lg:order-1">
              {/* Planos nutricionais */}
              <div className="flex items-start gap-3">
                <div className="bg-orange-500 p-2 rounded-full flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm md:text-base font-semibold text-gray-900">
                    Planos nutricionais personalizados com receitas fáceis de entender
                  </p>
                </div>
              </div>

              {/* Rastreador de água */}
              <div className="flex items-start gap-3">
                <div className="bg-blue-500 p-2 rounded-full flex-shrink-0 mt-1">
                  <Droplet className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm md:text-base font-semibold text-gray-900">
                    Rastreador de água inteligente para hidratação suficiente
                  </p>
                </div>
              </div>

              {/* Temporizador de jejum */}
              <div className="flex items-start gap-3">
                <div className="bg-purple-500 p-2 rounded-full flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm md:text-base font-semibold text-gray-900">
                    Temporizador de jejum personalizado
                  </p>
                </div>
              </div>
            </div>

            {/* Mockup do celular - agora responsivo */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="w-full max-w-[280px] md:max-w-[320px]">
                <svg 
                  viewBox="0 0 280 580" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto drop-shadow-2xl"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Definições de gradientes e padrões */}
                  <defs>
                    <linearGradient id="headerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#0d7377" />
                      <stop offset="100%" stopColor="#0a5c5f" />
                    </linearGradient>
                    <linearGradient id="cardGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF5F0" />
                      <stop offset="100%" stopColor="#FFE8DB" />
                    </linearGradient>
                    <linearGradient id="cardGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EFF6FF" />
                      <stop offset="100%" stopColor="#DBEAFE" />
                    </linearGradient>
                    <linearGradient id="cardGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F3E8FF" />
                      <stop offset="100%" stopColor="#E9D5FF" />
                    </linearGradient>
                    
                    {/* Pattern para simular imagens de comida */}
                    <pattern id="foodPattern1" x="0" y="0" width="100%" height="100%">
                      <circle cx="15" cy="15" r="12" fill="#FB923C" opacity="0.3"/>
                      <circle cx="15" cy="15" r="8" fill="#F97316" opacity="0.5"/>
                      <circle cx="18" cy="12" r="3" fill="#FDBA74" opacity="0.8"/>
                    </pattern>
                    <pattern id="foodPattern2" x="0" y="0" width="100%" height="100%">
                      <rect x="5" y="8" width="20" height="14" rx="3" fill="#34D399" opacity="0.4"/>
                      <circle cx="15" cy="15" r="6" fill="#10B981" opacity="0.6"/>
                    </pattern>
                    <pattern id="foodPattern3" x="0" y="0" width="100%" height="100%">
                      <ellipse cx="15" cy="15" rx="10" ry="8" fill="#F59E0B" opacity="0.4"/>
                      <ellipse cx="15" cy="15" rx="6" ry="4" fill="#FBBF24" opacity="0.6"/>
                    </pattern>
                  </defs>
                  
                  {/* Corpo do celular - moldura externa escura */}
                  <rect x="8" y="8" width="264" height="564" rx="35" fill="#1F2937" />
                  
                  {/* Tela do celular - fundo branco */}
                  <rect x="16" y="16" width="248" height="548" rx="28" fill="#F9FAFB" />
                  
                  {/* Notch superior */}
                  <rect x="100" y="16" width="80" height="24" rx="12" fill="#1F2937" />
                  
                  {/* Barra de status */}
                  <text x="28" y="60" fontSize="12" fill="#1F2937" fontWeight="600">9:41</text>
                  <text x="220" y="60" fontSize="12" fill="#1F2937" fontWeight="500">100%</text>
                  
                  {/* Header do app com gradiente */}
                  <rect x="16" y="70" width="248" height="100" fill="url(#headerGradient)" />
                  
                  {/* Logo Nutria simplificado no header */}
                  <circle cx="140" cy="95" r="18" fill="rgba(255,255,255,0.2)" />
                  <text x="140" y="103" fontSize="24" fill="#FFFFFF" fontWeight="800" textAnchor="middle">N</text>
                  <text x="140" y="130" fontSize="14" fill="#FFFFFF" fontWeight="600" textAnchor="middle">Seu Plano Nutria</text>
                  <text x="140" y="148" fontSize="10" fill="rgba(255,255,255,0.8)" textAnchor="middle">Personalizado para você</text>
                  
                  {/* Card 1 - Plano de Refeições Detalhado */}
                  <rect x="28" y="190" width="224" height="110" rx="16" fill="url(#cardGradient1)" />
                  
                  {/* Ícone de prato */}
                  <circle cx="52" cy="218" r="16" fill="#FB923C" />
                  <circle cx="52" cy="218" r="12" fill="white" opacity="0.3" />
                  <path d="M48 218 L50 221 L56 215" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  
                  <text x="76" y="218" fontSize="13" fill="#1F2937" fontWeight="700">Café da Manhã</text>
                  <text x="76" y="234" fontSize="10" fill="#6B7280" fontWeight="500">Ovos mexidos com espinafre</text>
                  <text x="76" y="248" fontSize="9" fill="#FB923C" fontWeight="700">450 kcal • Proteína: 28g</text>
                  
                  {/* Mini imagens de alimentos (simuladas) */}
                  <rect x="35" y="265" width="40" height="28" rx="6" fill="url(#foodPattern1)" />
                  <rect x="82" y="265" width="40" height="28" rx="6" fill="url(#foodPattern2)" />
                  <rect x="129" y="265" width="40" height="28" rx="6" fill="url(#foodPattern3)" />
                  <rect x="176" y="265" width="40" height="28" rx="6" fill="url(#foodPattern1)" />
                  
                  {/* Labels nas imagens */}
                  <text x="55" y="282" fontSize="7" fill="white" fontWeight="600" textAnchor="middle">Ovos</text>
                  <text x="102" y="282" fontSize="7" fill="white" fontWeight="600" textAnchor="middle">Salada</text>
                  <text x="149" y="282" fontSize="7" fill="white" fontWeight="600" textAnchor="middle">Frutas</text>
                  <text x="196" y="282" fontSize="7" fill="white" fontWeight="600" textAnchor="middle">Pão</text>
                  
                  {/* Card 2 - Hidratação Avançada */}
                  <rect x="28" y="315" width="224" height="95" rx="16" fill="url(#cardGradient2)" />
                  
                  {/* Ícone de gota d'água */}
                  <circle cx="52" cy="340" r="16" fill="#3B82F6" />
                  <path d="M52 330 C52 330 46 336 46 342 C46 347 48.7 350 52 350 C55.3 350 58 347 58 342 C58 336 52 330 52 330 Z" fill="white" />
                  
                  <text x="76" y="342" fontSize="13" fill="#1F2937" fontWeight="700">Hidratação Diária</text>
                  <text x="76" y="358" fontSize="10" fill="#6B7280" fontWeight="500">Meta: 2.5L • Concluído: 70%</text>
                  
                  {/* Barra de progresso de água com gradiente */}
                  <rect x="76" y="368" width="155" height="10" rx="5" fill="#DBEAFE" />
                  <rect x="76" y="368" width="108" height="10" rx="5" fill="#3B82F6" />
                  
                  {/* Copos de água */}
                  <g>
                    {[0,1,2,3,4,5,6,7].map((i) => {
                      const filled = i < 5;
                      const x = 36 + i * 26;
                      return (
                        <g key={i}>
                          <rect 
                            x={x} 
                            y="387" 
                            width="18" 
                            height="16" 
                            rx="2" 
                            fill={filled ? '#3B82F6' : '#E5E7EB'} 
                            stroke={filled ? '#2563EB' : '#D1D5DB'} 
                            strokeWidth="1"
                          />
                          {filled && (
                            <rect x={x + 2} y="390" width="14" height="10" fill="#60A5FA" opacity="0.6" />
                          )}
                        </g>
                      );
                    })}
                  </g>
                  
                  {/* Card 3 - Jejum Intermitente Premium */}
                  <rect x="28" y="425" width="224" height="95" rx="16" fill="url(#cardGradient3)" />
                  
                  <text x="140" y="448" fontSize="13" fill="#1F2937" fontWeight="700" textAnchor="middle">Jejum Intermitente</text>
                  <text x="140" y="463" fontSize="10" fill="#7C3AED" fontWeight="500" textAnchor="middle">Protocolo 16:8 em andamento</text>
                  
                  {/* Círculo de progresso do jejum */}
                  <circle cx="140" cy="490" r="28" stroke="#E9D5FF" strokeWidth="4" fill="none" />
                  <circle 
                    cx="140" 
                    cy="490" 
                    r="28" 
                    stroke="#9333EA" 
                    strokeWidth="4" 
                    fill="none" 
                    strokeDasharray="52 176" 
                    strokeLinecap="round" 
                    transform="rotate(-90 140 490)" 
                  />
                  
                  {/* Tempo no centro */}
                  <text x="140" y="495" fontSize="16" fill="#9333EA" fontWeight="800" textAnchor="middle">14:32</text>
                  <text x="140" y="507" fontSize="8" fill="#7C3AED" fontWeight="500" textAnchor="middle">de 16h</text>
                  
                  {/* Navegação inferior */}
                  <rect x="16" y="540" width="248" height="1" fill="#E5E7EB" />
                  
                  {/* Ícones de navegação */}
                  <circle cx="70" cy="552" r="8" fill="#0d7377" />
                  <circle cx="140" cy="552" r="8" fill="#D1D5DB" />
                  <circle cx="210" cy="552" r="8" fill="#D1D5DB" />
                  
                  {/* Indicador de tela ativa */}
                  <rect x="120" y="520" width="40" height="4" rx="2" fill="#0d7377" opacity="0.5" />
                </svg>
              </div>
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