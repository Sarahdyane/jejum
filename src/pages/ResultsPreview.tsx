import { QuizResults } from "@/components/quiz/QuizResults";
import { UserProfile } from "@/types/quiz";

const mockProfile: UserProfile = {
  age: "30-39",
  gender: "female",
  goal: "lose-weight",
  bodyType: "average",
  targetBodyType: "slim",
  targetZones: ["butt", "belly", "thighs"],
  fitnessLevel: "beginner",
  fastingKnowledge: "some",
  dailyActivity: "light",
  firstMeal: "morning",
  lastMeal: "evening",
  mealsPerDay: "3",
  dietType: "balanced",
  likedFoods: ["chicken-breast", "eggs", "salmon", "sweet-potato", "greek-yogurt", "broccoli", "banana", "oats"],
  waterIntake: "2L",
  sleepHours: "7-8",
  energyLevel: "inconsistent",
  cookingPreference: "quick",
  physicalIssues: [],
  walkingFrequency: "almost-daily",
  workSchedule: "office",
  badHabits: ["cant-quit-sweets"],
  weightGainReasons: [],
  clothingIssues: "yes",
  mainReason: "health",
  height: 165,
  currentWeight: 72,
  targetWeight: 60,
  userAge: 32,
  eventType: "wedding",
  eventDate: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000).toISOString(),
  sportsInterest: ["home", "running"],
  workoutLocation: ["home"],
  workoutDuration: "20-30",
};

const ResultsPreview = () => (
  <QuizResults profile={mockProfile} onRestart={() => window.location.href = '/quiz'} />
);

export default ResultsPreview;
