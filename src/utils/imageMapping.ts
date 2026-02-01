// --- IMPORTAÇÕES SEGURAS (Só o que sabemos que existe) ---

// Nossa "Carta Coringa" - A imagem que sabemos que existe
import safeImage from '@/assets/fitness-female-new.png';

// Imagens de Idade (Mulheres)
import ageWoman1829Young from '@/assets/age-woman-18-29-young.jpg';
import ageWoman1829 from '@/assets/age-woman-18-29.jpg';
import ageWoman3039 from '@/assets/age-woman-30-39.jpg';
import ageWoman4049 from '@/assets/age-woman-40-49.jpg';
import ageWoman50Plus from '@/assets/age-woman-50-plus.jpg';

// App & Exercícios
import appMealsMockup from '@/assets/app-meals-mockup.png';
import exerciseCardio from '@/assets/exercise-cardio.png';
import exercisePushups from '@/assets/exercise-pushups.png';
import exerciseWeights from '@/assets/exercise-weights.png';

// Corpos Reais (IMPORTADOS CORRETAMENTE)
import bodyAverageFemaleRealNew from '@/assets/body-average-female-real-new.jpg';
import bodyFullerFemaleRealNew from '@/assets/body-fuller-female-real-new.jpg';
import bodyObeseFemaleRealNew from '@/assets/body-obese-female-real-new.jpg';
import bodyThinFemaleRealNew from '@/assets/body-thin-female-real-new.jpg';

// Resultados & Zonas
import bodyAverageFemaleResults from '@/assets/body-average-female-results.png';
import bodyFullerFemaleResults from '@/assets/body-fuller-female-results.png';
import bodyGoalFemaleResults from '@/assets/body-goal-female-results.png';
import bodyZonesFemaleMascotFinal from '@/assets/body-zones-female-mascot-final.png';
import bodyZonesFemaleMascotNew from '@/assets/body-zones-female-mascot-new.png';
import bodyZonesFemaleNew from '@/assets/body-zones-female-new.png';

// Fitness & Lifestyle
import fitnessDevicesHero from '@/assets/fitness-devices-hero.png';
import fitnessFemaleNew from '@/assets/fitness-female-new.png';
import fitnessWomanDumbbell from '@/assets/fitness-woman-dumbbell.png';
import goalAthleteFemaleReal from '@/assets/goal-athlete-female-real.jpg';
import goalSlimFemaleReal from '@/assets/goal-slim-female-real.jpg';
import lipedemaInfo from '@/assets/lipedema-info.png';
import motivationChangeHabitsNew from '@/assets/motivation-change-habits-new.png';

import nutriaLogoDark from '@/assets/nutria-logo-dark.png';
import nutriaLogo from '@/assets/nutria-logo.png';
import nutritionInfoFemale from '@/assets/nutrition-info-female.png';

// Transformações
import transformationCombinedFemale3 from '@/assets/transformation-combined-female-3.png';
import transformationCombinedFemale4 from '@/assets/transformation-combined-female-4.png';
import transformationCombinedFemale5 from '@/assets/transformation-combined-female-5.png';

export const imageMap: Record<string, string> = {
  // --- IDADE ---
  'age-woman-1': ageWoman1829Young,
  'age-woman-18-29': ageWoman1829,
  'age-woman-2': ageWoman3039,
  'age-woman-3': ageWoman4049,
  'age-woman-4': ageWoman50Plus,
  
  // --- TAMPÕES (Casais e Mascotes) ---
  'age-18-29-couple': safeImage, 
  'age-18-29-couple-new': safeImage,
  'age-30-39-couple': safeImage,
  'age-40-49-couple': safeImage,
  'age-50-plus-couple': safeImage,
  
  'age-couple-18-29-mascot': safeImage,
  'age-couple-30-39-mascot': safeImage,
  'age-couple-40-49-mascot': safeImage,
  'age-couple-50-plus-mascot': safeImage,

  // --- APP & EXERCÍCIOS ---
  'app-meals-mockup': appMealsMockup,
  'exercise-cardio': exerciseCardio,
  'exercise-pushups': exercisePushups,
  'exercise-weights': exerciseWeights,

  // --- CORPOS (IMPORTANTE: ADICIONEI AS CHAVES COM "-new" AQUI) ---
  'body-thin-female-real': bodyThinFemaleRealNew,
  'body-thin-female-real-new': bodyThinFemaleRealNew, // <--- ADICIONADO PARA GARANTIR

  'body-average-female-real': bodyAverageFemaleRealNew,
  'body-average-female-real-new': bodyAverageFemaleRealNew, // <--- ADICIONADO PARA GARANTIR

  'body-fuller-female-real': bodyFullerFemaleRealNew,
  'body-obese-female-real': bodyObeseFemaleRealNew,
  
  'body-thin-female-mascot': bodyThinFemaleRealNew, 
  'body-average-female-mascot': bodyAverageFemaleRealNew,
  'body-fuller-female-mascot': bodyFullerFemaleRealNew,
  'body-obese-female-mascot': bodyObeseFemaleRealNew,

  // --- RESULTADOS ---
  'body-average-female-results': bodyAverageFemaleResults,
  'body-fuller-female-results': bodyFullerFemaleResults,
  'body-goal-female-results': bodyGoalFemaleResults,

  // --- ZONAS ---
  'body-zones-female-mascot': bodyZonesFemaleMascotFinal,
  'body-zones-female-mascot-new': bodyZonesFemaleMascotNew,
  'body-zones-female-new': bodyZonesFemaleNew,
  'body-zones-male-arrows': safeImage, // Tampão

  // --- OUTROS ---
  'fitness-devices-hero': fitnessDevicesHero,
  'fitness-female-new': fitnessFemaleNew,
  'fitness-woman-dumbbell': fitnessWomanDumbbell,
  'goal-athlete-female-real': goalAthleteFemaleReal,
  'goal-slim-female-real': goalSlimFemaleReal,
  'lipedema-info': lipedemaInfo,
  'motivation-change-habits': motivationChangeHabitsNew,
  
  // Usando a imagem segura para os motivacionais que faltam para não quebrar
  'motivation-incredible': safeImage, 
  'motivation-incredible-new': safeImage,

  'nutria-logo': nutriaLogo,
  'nutria-logo-dark': nutriaLogoDark,
  'nutrition-info-female': nutritionInfoFemale,
  
  // --- TRANSFORMAÇÕES ---
  'transformation-combined-female-3': transformationCombinedFemale3,
  'transformation-combined-female-4': transformationCombinedFemale4,
  'transformation-combined-female-5': transformationCombinedFemale5,
};

export const getImageSrc = (imageKey: string) => {
  return imageMap[imageKey as keyof typeof imageMap] || imageKey;
};
