import age1829CoupleNew from '@/assets/age-18-29-couple-new.jpg';
import age3039Couple from '@/assets/age-30-39-couple.jpg';
import age4049Couple from '@/assets/age-40-49-couple.jpg';
import age50PlusCoupl from '@/assets/age-50-plus-couple.jpg';
import healthyCelebration from '@/assets/healthy-people-celebration.jpg';
import fitnessCouple from '@/assets/fitness-couple.jpg';
import fitnessMale from '@/assets/fitness-male.jpg';
import fitnessFemale from '@/assets/fitness-female.jpg';
import bodyZonesMaleMascot from '@/assets/body-zones-male-mascot.jpg';
import bodyZonesFemaleMascot from '@/assets/body-zones-female-mascot.jpg';
import bodyZonesMaleArrows from '@/assets/body-zones-male-arrows.jpg';
import bodyZonesFemaleArrows from '@/assets/body-zones-female-arrows.jpg';
import personExercisingSmall from '@/assets/person-exercising-small.jpg';
import healthyMeal from '@/assets/healthy-meal.jpg';
import eveningMeal from '@/assets/evening-meal.jpg';
import fastingInfographic from '@/assets/fasting-infographic.jpg';
import manWorkingOffice from '@/assets/man-working-office.jpg';
import womanWorkingOffice from '@/assets/woman-working-office.jpg';
import healthyLifestyle from '@/assets/healthy-lifestyle.jpg';
import fitnessThinking from '@/assets/fitness-thinking.jpg';
import appLoading from '@/assets/app-loading.jpg';

// Professional body type images
import bodyThinProfessional from '@/assets/body-thin-professional.png';
import bodyAverageProfessional from '@/assets/body-average-professional.png';
import bodyRobustProfessional from '@/assets/body-robust-professional.png';
import bodyThinMaleProfessional from '@/assets/body-thin-male-professional.png';
import bodyAverageMaleProfessional from '@/assets/body-average-male-professional.png';
import bodyRobustMaleProfessional from '@/assets/body-robust-male-professional.png';
import bodyThinFemaleProfessional from '@/assets/body-thin-female-professional.png';
import bodyAverageFemaleProfessional from '@/assets/body-average-female-professional.png';
import bodyRobustFemaleProfessional from '@/assets/body-robust-female-professional.png';

// Real body type images - realistic photos for body type selection
import bodyThinMaleShorts from '@/assets/body-thin-male-shorts.jpg';
import bodyThinFemaleReal from '@/assets/body-thin-female-real.jpg';
import bodyAverageMaleReal from '@/assets/body-average-male-real.jpg';
import bodyAverageFemaleReal from '@/assets/body-average-female-real.jpg';
import bodyFullerMaleShorts from '@/assets/body-fuller-male-real-shorts.jpg';
import bodyFullerFemaleReal from '@/assets/body-fuller-female-real.jpg';
import bodyFullerMaleNewShorts from '@/assets/body-fuller-male-new-shorts-fixed.jpg';
import bodyFullerFemaleProfessional from '@/assets/body-fuller-female-professional-fixed.jpg';
import bodyOverweightMaleShorts from '@/assets/body-overweight-male-shorts.jpg';
import bodyOverweightFemaleReal from '@/assets/body-overweight-female-real.jpg';

// Goal body images
import goalSlimMale from '@/assets/goal-slim-male.jpg';
import goalSlimFemale from '@/assets/goal-slim-female.jpg';
import goalDefinedMale from '@/assets/goal-defined-male.jpg';
import goalDefinedFemale from '@/assets/goal-defined-female.jpg';
import goalAthleteMale from '@/assets/goal-athlete-male.jpg';
import goalAthleteFemale from '@/assets/goal-athlete-female.jpg';

export const imageMap = {
  'age-couple-1': age1829CoupleNew,
  'age-couple-2': age3039Couple,
  'age-couple-3': age4049Couple,
  'age-couple-4': age50PlusCoupl,
  'healthy-celebration': healthyCelebration,
  'fitness-couple': fitnessCouple,
  'fitness-male': fitnessMale,
  'fitness-female': fitnessFemale,
  'body-zones-male-mascot': bodyZonesMaleMascot,
  'body-zones-female-mascot': bodyZonesFemaleMascot,
  'body-zones-male-arrows': bodyZonesMaleArrows,
  'body-zones-female-arrows': bodyZonesFemaleArrows,
  'person-exercising-small': personExercisingSmall,
  'healthy-meal': healthyMeal,
  'evening-meal': eveningMeal,
  'fasting-infographic': fastingInfographic,
  'man-working-office': manWorkingOffice,
  'woman-working-office': womanWorkingOffice,
  'healthy-lifestyle': healthyLifestyle,
  'fitness-thinking': fitnessThinking,
  'app-loading': appLoading,
  'body-thin-professional': bodyThinProfessional,
  'body-average-professional': bodyAverageProfessional,
  'body-robust-professional': bodyRobustProfessional,
  'body-thin-male-professional': bodyThinMaleProfessional,
  'body-average-male-professional': bodyAverageMaleProfessional,
  'body-robust-male-professional': bodyRobustMaleProfessional,
  'body-thin-female-professional': bodyThinFemaleProfessional,
  'body-average-female-professional': bodyAverageFemaleProfessional,
  'body-robust-female-professional': bodyRobustFemaleProfessional,
  'body-thin-male-shorts': bodyThinMaleShorts,
  'body-thin-female-real': bodyThinFemaleReal,
  'body-average-male-real': bodyAverageMaleReal,
  'body-average-female-real': bodyAverageFemaleReal,
  'body-fuller-male-shorts': bodyFullerMaleShorts,
  'body-fuller-female-real': bodyFullerFemaleReal,
  'body-fuller-male-new-shorts': bodyFullerMaleNewShorts,
  'body-fuller-female-professional': bodyFullerFemaleProfessional,
  'body-overweight-male-shorts': bodyOverweightMaleShorts,
  'body-overweight-female-real': bodyOverweightFemaleReal,
  'goal-slim-male': goalSlimMale,
  'goal-slim-female': goalSlimFemale,
  'goal-defined-male': goalDefinedMale,
  'goal-defined-female': goalDefinedFemale,
  'goal-athlete-male': goalAthleteMale,
  'goal-athlete-female': goalAthleteFemale,
};

export const getImageSrc = (imageKey: string) => {
  return imageMap[imageKey as keyof typeof imageMap] || imageKey;
};