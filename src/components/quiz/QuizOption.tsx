import { cn } from "@/lib/utils";
import { QuizOption as QuizOptionType } from "@/types/quiz";
import { 
  CheckCircle2, TrendingDown, TrendingUp, Dumbbell, AlertCircle, 
  AlertTriangle, CheckCircle, Footprints, Clock, Moon, Calendar, 
  Armchair, Candy, Wine, Pizza, DollarSign, Users, Briefcase, 
  HeartCrack, Bug, Shirt, Heart, Activity, Zap, MessageCircle,
  HelpCircle, X, Plane, Compass, Cake, Trophy, Mountain,
  Utensils, Leaf, MilkOff, WheatOff, UtensilsCrossed,
  Droplet, Droplets, GlassWater, Waves
} from "lucide-react";

const iconMap = {
  TrendingDown,
  TrendingUp,
  Dumbbell,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Footprints,
  Clock,
  Moon,
  Calendar,
  Armchair,
  Candy,
  Wine,
  Pizza,
  DollarSign,
  Users,
  Briefcase,
  HeartCrack,
  Bug,
  Shirt,
  Heart,
  Activity,
  Zap,
  MessageCircle,
  HelpCircle,
  X,
  Plane,
  Compass,
  Cake,
  Trophy,
  Mountain,
  Utensils,
  Leaf,
  MilkOff,
  WheatOff,
  UtensilsCrossed,
  Droplet,
  Droplets,
  GlassWater,
  Waves,
};

interface QuizOptionProps {
  option: QuizOptionType;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
  gender?: string;
  questionId?: number | string;
}

const getOptionText = (option: QuizOptionType, gender?: string): string => {
  if (gender === 'male' && option.maleText) return option.maleText;
  if (gender === 'female' && option.femaleText) return option.femaleText;
  return option.text;
};

export const QuizOption = ({ option, isSelected, onClick, className, gender, questionId }: QuizOptionProps) => {
  // Check if this is a body type or age option that needs full-width display
  const isFullWidthImage = !!(option.image && typeof option.image === 'string' && (
    option.image.includes('body-') || 
    option.image.includes('age-') || 
    option.image.includes('couple')
  ));
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left relative group shadow-lg hover:shadow-xl",
        "hover:border-primary hover:shadow-primary/20 hover:scale-105",
        isSelected 
          ? "border-primary bg-primary text-primary-foreground shadow-xl shadow-primary/25 scale-105" 
          : "border-border bg-card hover:bg-secondary/50 hover:shadow-primary/10",
        className
      )}
    >
      {option.image && (
        <div className="flex flex-col items-center space-y-4 mb-4">
          <div className={cn(
            "rounded-xl flex items-center justify-center",
            isFullWidthImage 
              ? "w-full aspect-square bg-secondary/20" 
              : "w-28 h-28 bg-secondary/20"
          )}>
            <img 
              src={option.image} 
              alt={option.text}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between gap-2">
        <span className={cn(
          "font-semibold text-base leading-relaxed flex-1",
          isSelected ? "text-primary-foreground" : "text-foreground"
        )}>
          {getOptionText(option, gender)}
        </span>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          {option.icon && iconMap[option.icon as keyof typeof iconMap] && (
            (() => {
              const IconComponent = iconMap[option.icon as keyof typeof iconMap];
              return <IconComponent className={cn(
                "w-5 h-5",
                isSelected ? "text-primary-foreground" : "text-primary"
              )} />;
            })()
          )}
          
          {isSelected && questionId !== 2 && (
            <CheckCircle2 className="w-5 h-5 text-primary-foreground drop-shadow-lg flex-shrink-0" />
          )}
        </div>
      </div>
    </button>
  );
};