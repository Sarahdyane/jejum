// --- IMPORTAÇÕES CONFIRMADAS ---

// 1. Idade (Mulheres sozinhas) - ESSAS EXISTEM, vamos usar como base
import ageWoman1829Young from '@/assets/age-woman-18-29-young.jpg';
import ageWoman1829 from '@/assets/age-woman-18-29.jpg';
import ageWoman3039 from '@/assets/age-woman-30-39.jpg';
import ageWoman4049 from '@/assets/age-woman-40-49.jpg';
import ageWoman50Plus from '@/assets/age-woman-50-plus.jpg';

// 2. Idade (Mascotes)
import ageCouple1829Mascot from '@/assets/age-couple-18-29-mascot.jpg';
import ageCouple3039Mascot from '@/assets/age-couple-30-39-mascot.jpg';
import ageCouple4049Mascot from '@/assets/age-couple-40-49-mascot.jpg';
import ageCouple50PlusMascot from '@/assets/age-couple-50-plus-mascot.jpg';

// 3. App & Exercícios
import appMealsMockup from '@/assets/app-meals-mockup.png';
import exerciseCardio from '@/assets/exercise-cardio.png';
import exercisePushups from '@/assets/exercise-pushups.png';
import exerciseWeights from '@/assets/exercise-weights.png';

// 4. Corpos Reais (Mulheres)
import bodyAverageFemaleRealNew from '@/assets/body-average-female-real-new.jpg';
import bodyFullerFemaleRealNew from '@/assets/body-fuller-female-real-new.jpg';
import bodyObeseFemaleRealNew from '@/assets/body-obese-female-real-new.jpg';
import bodyThinFemaleRealNew from '@/assets/body-thin-female-real-new.jpg';

// 5. Resultados & Zonas
import bodyAverageFemaleResults from '@/assets/body-average-female-results.png';
import bodyFullerFemaleResults from '@/assets/body-fuller-female-results.png';
import bodyGoalFemaleResults from '@/assets/body-goal-female-results.png';
import bodyZonesFemaleMascotFinal from '@/assets/body-zones-female-mascot-final.png';
import bodyZonesFemaleMascotNew from '@/assets/body-zones-female-mascot-new.png';
import bodyZonesFemaleNew from '@/assets/body-zones-female-new.png';
import bodyZonesMaleArrows from '@/assets/body-zones-male-arrows.jpg';

// 6. Fitness & Lifestyle & Logos
import fitnessDevicesHero from '@/assets/fitness-devices-hero.png';
import fitnessFemaleNew from '@/assets/fitness-female-new.png';
import fitnessWomanDumbbell from '@/assets/fitness-woman-dumbbell.png';
import goalAthleteFemaleReal from '@/assets/goal-athlete-female-real.jpg';
import goalSlimFemaleReal from '@/assets/goal-slim-female-real.jpg';
import lipedemaInfo from '@/assets/lipedema-info.png';
import motivationChangeHabitsNew from '@/assets/motivation-change-habits-new.png';
import motivationIncredibleNew from '@/assets/motivation-incredible-new.png';
import motivationIncredible from '@/assets/motivation-incredible.jpg';
import nutriaLogoDark from '@/assets/nutria-logo-dark.png';
import nutriaLogo from '@/assets/nutria-logo.png';
import nutritionInfoFemale from '@/assets/nutrition-info-female.png';

// 7. Transformações (Femininas)
import transformationCombinedFemale3 from '@/assets/transformation-combined-female-3.png';
import transformationCombinedFemale4 from '@/assets/transformation-combined-female-4.png';
import transformationCombinedFemale5 from '@/assets/transformation-combined-female-5.png';

export const imageMap = {
  // --- IDADE ---
  'age-woman-1': ageWoman1829Young,
  'age-woman-18-29': ageWoman1829,
  'age-woman-2': ageWoman3039,
  'age-woman-3': ageWoman4049,
  'age-woman-4': ageWoman50Plus,
  
  // --- CASAIS (SUBSTITUIÇÃO DE EMERGÊNCIA) ---
  // Estou apontando para as imagens de mulher ou mascotes para não quebrar o build
  'age-18-29-couple': ageCouple1829Mascot, 
  'age-18-29-couple-new': ageCouple1829Mascot,
  'age-30-39-couple': ageCouple3039Mascot,
  'age-40-49-couple': ageCouple4049Mascot,
  'age-50-plus-couple': ageCouple50PlusMascot,
  
  // --- MASCOTES ---
  'age-couple-18-29-mascot': ageCouple1829Mascot,
  'age-couple-30-39-mascot': ageCouple3039Mascot,
  'age-couple-40-49-mascot': ageCouple4049Mascot,
  'age-couple-50-plus-mascot': ageCouple50PlusMascot,

  // --- APP & EXERCÍCIOS ---
  'app-meals-mockup': appMealsMockup,
  'exercise-cardio': exerciseCardio,
  'exercise-pushups': exercisePushups,
  'exercise-weights': exerciseWeights,

  // --- CORPOS ---
  'body-thin-female-real': bodyThinFemaleRealNew,
  'body-average-female-real': bodyAverageFemaleRealNew,
  'body-fuller-female-real': bodyFullerFemaleRealNew,
  'body-obese-female-real': bodyObeseFemaleRealNew,
  
  // Fallbacks
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
  'body-zones-male-arrows': bodyZonesMaleArrows,

  // --- OUTROS ---
  'fitness-devices-hero': fitnessDevicesHero,
  'fitness-female-new': fitnessFemaleNew,
  'fitness-woman-dumbbell': fitnessWomanDumbbell,
  'goal-athlete-female-real': goalAthleteFemaleReal,
  'goal-slim-female-real': goalSlimFemaleReal,
  'lipedema-info': lipedemaInfo,
  'motivation-change-habits': motivationChangeHabitsNew,
  'motivation-incredible': motivationIncredibleNew,
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
