export interface QuizOption {
  id: string;
  text: string;
  description?: string;
  maleText?: string;
  femaleText?: string;
  image?: string;
  maleImage?: string;
  femaleImage?: string;
  customImage?: string;
  icon?: string;
  isSelectAll?: boolean;
  infoBox?: {
    title: string;
    content: string;
  };
}

export interface FoodCategory {
  id: string;
  emoji: string;
  title: string;
  options: QuizOption[];
  disabledWhen?: {
    questionId: number;
    value: string;
  };
}

export interface QuizQuestion {
  id: number | string;
  title: string;
  subtitle?: string;
  description?: string;
  type: 'single' | 'multiple' | 'intermediate' | 'input' | 'body-selection' | 'food-categories' | 'stats' | 'loading' | 'goal-projection' | 'date' | 'exercise-preference' | 'supplements-page';
  showWhen?: {
    questionId: number;
    notEquals?: string;
    equals?: string;
  };
  skippable?: boolean;
  options?: QuizOption[];
  foodCategories?: FoodCategory[];
  inputType?: 'text' | 'number';
  inputPlaceholder?: string;
  inputSuffix?: string;
  bodyImage?: string;
  maleBodyImage?: string;
  femaleBodyImage?: string;
  bodyZones?: string[];
  requiresGender?: boolean;
  required?: boolean;
  showTitle?: string;
  showSubtitle?: string;
  showFooter?: boolean;
  showInfoBox?: boolean;
  infoBoxContent?: {
    title: string;
    content: string;
  };
  image?: string;
  maleImage?: string;
  femaleImage?: string;
  thematicImage?: string;
  bulletPoints?: string[];
  buttonText?: string;
  footerText?: string;
}

export interface QuizState {
  currentQuestion: number | string;
  answers: Record<number | string, string | string[] | number>;
  isComplete: boolean;
}

export interface UserProfile {
  age: string;
  gender: string;
  goal: string;
  bodyType: string;
  targetBodyType: string;
  targetZones: string[];
  fitnessLevel: string;
  fastingKnowledge: string;
  dailyActivity: string;
  firstMeal: string;
  lastMeal: string;
  mealsPerDay: string;
  dietType: string;
  likedFoods: string[];
  waterIntake: string;
  sleepHours: string;
  energyLevel: string;
  cookingPreference: string;
  physicalIssues: string[];
  walkingFrequency: string;
  workSchedule: string;
  badHabits: string[];
  weightGainReasons: string[];
  clothingIssues: string;
  mainReason: string;
  height: number;
  currentWeight: number;
  targetWeight: number;
  userAge: number;
}