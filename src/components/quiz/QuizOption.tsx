import { cn } from "@/lib/utils";
import { QuizOption as QuizOptionType } from "@/types/quiz";
import { 
  CheckCircle2, TrendingDown, TrendingUp, Dumbbell, AlertCircle, 
  AlertTriangle, CheckCircle, Footprints, Clock, Moon, Calendar, 
  Armchair, Candy, Wine, Pizza, DollarSign, Users, Briefcase, 
  HeartCrack, Bug, Shirt, Heart, Activity, Zap, MessageCircle,
  HelpCircle, X, Plane, Compass, Cake, Trophy, Mountain,
  Utensils, Leaf, MilkOff, WheatOff, Droplet, Droplets, GlassWater, Waves, UtensilsCrossed,
  Home, Swords, PersonStanding, Shuffle
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
  Droplet,
  Droplets,
  GlassWater,
  Waves,
  UtensilsCrossed,
  Home,
  Swords,
  PersonStanding,
  Shuffle,
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
        "w-full p-4 rounded-2xl border-2 text-left relative group",
        "transition-all duration-[250ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        "hover:border-primary hover:shadow-lg hover:shadow-primary/15 hover:-translate-y-0.5",
        isSelected
          ? "border-primary bg-primary text-primary-foreground shadow-xl shadow-primary/30 scale-[1.025]"
          : "border-border bg-card hover:bg-secondary/40 shadow-sm",
        className
      )}
    >
      {option.image && (
        <div className="flex flex-col items-center space-y-4 mb-4">
          <div className={cn(
            "rounded-xl flex items-center justify-center overflow-hidden",
            isFullWidthImage 
              ? "w-full aspect-[3/4] bg-secondary/20" 
              : "w-28 h-28 bg-secondary/20"
          )}>
            <img 
              src={option.image} 
              alt={option.text}
              loading="eager"
              decoding="async"
              className="w-full h-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      )}
      
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          {option.icon && iconMap[option.icon as keyof typeof iconMap] && (
            (() => {
              const IconComponent = iconMap[option.icon as keyof typeof iconMap];
              return <IconComponent className={cn(
                "w-5 h-5 mt-0.5 flex-shrink-0",
                isSelected ? "text-primary-foreground" : "text-primary"
              )} />;
            })()
          )}
          
          <div className="flex flex-col gap-1">
            <span className={cn(
              "font-semibold text-base leading-relaxed",
              isSelected ? "text-primary-foreground" : "text-foreground"
            )}>
              {getOptionText(option, gender)}
            </span>
            
            {option.description && (
              <span className={cn(
                "text-sm leading-relaxed",
                isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
              )}>
                {option.description}
              </span>
            )}
          </div>
        </div>
        
        {isSelected && questionId !== 2 && (
          <CheckCircle2 className="w-5 h-5 text-primary-foreground drop-shadow-lg flex-shrink-0 mt-0.5" />
        )}
      </div>
    </button>
  );
};