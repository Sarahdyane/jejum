import { UserProfile } from "@/types/quiz";
import { Progress } from "@/components/ui/progress";
import {
  Check, Target, Flame, Droplet, User, Wind, MapPin, ShieldCheck,
  Dumbbell, Clock, Package, Utensils, Lightbulb, Star, Zap, Trophy,
  ArrowRight, Timer, Lock, BadgeCheck, TrendingUp, ChevronRight,
  CalendarDays, Play, ChefHat, HeartPulse
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import nutriaLogoLight from '@/assets/nutria-logo.png';
import nutriaLogoDark from '@/assets/nutria-logo-dark.png';
import { getImageSrc } from '@/utils/imageMapping';
import { ThemeToggle } from "@/components/ThemeToggle";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import transformationCombinedFemale3 from '@/assets/transformation-combined-female-3.png';
import transformationCombinedFemale4 from '@/assets/transformation-combined-female-4.png';
import transformationCombinedFemale5 from '@/assets/transformation-combined-female-5.png';
import imgHealthyMeal from '@/assets/healthy-meal.jpg';
import imgEveningMeal from '@/assets/evening-meal.jpg';
import imgPanqueca from '@/assets/Panqueca proteíca.png';
import imgCardapio from '@/assets/Cardápio do dia_imagem.png';
import imgExerciseCardio from '@/assets/exercise-cardio.png';
import imgExercisePushups from '@/assets/exercise-pushups.png';
import imgExerciseWeights from '@/assets/exercise-weights.png';
import imgFitnessWoman from '@/assets/fitness-woman-dumbbell.png';

const RippleLoader = () => {
  const delays = ['', 'rd-1', 'rd-2', 'rd-1', 'rd-2', 'rd-3', 'rd-2', 'rd-3', 'rd-4'];
  return (
    <div className="ripple-loader">
      {delays.map((d, i) => (
        <div key={i} className={`ripple-cell${d ? ` ${d}` : ''}`} />
      ))}
    </div>
  );
};

const FadeUp = ({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className={`fade-up ${className}`}>{children}</div>;
};

interface QuizResultsProps {
  profile: UserProfile;
  onRestart: () => void;
}

export const QuizResults = ({ profile, onRestart }: QuizResultsProps) => {
  const navigate = useNavigate();
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => {
    const stored = sessionStorage.getItem('nutria-offer-timer');
    if (stored) return parseInt(stored);
    return 15 * 60;
  });

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const next = Math.max(0, prev - 1);
        sessionStorage.setItem('nutria-offer-timer', String(next));
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (ctaSectionRef.current) {
        const rect = ctaSectionRef.current.getBoundingClientRect();
        setShowStickyCTA(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatTime = (seconds: number) => ({
    m: Math.floor(seconds / 60).toString().padStart(2, '0'),
    s: (seconds % 60).toString().padStart(2, '0'),
  });
  const { m, s } = formatTime(timeLeft);

  const goToCheckout = () => {
    const checkoutUrl = "https://www.ggcheckout.com/checkout/v4/sAxm8xS5o2d9po6HDheO";
    const currentParams = window.location.search;
    const separator = checkoutUrl.includes('?') ? '&' : '?';
    const finalUrl = currentParams ? `${checkoutUrl}${separator}${currentParams.substring(1)}` : checkoutUrl;
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout');
    }
    window.location.href = finalUrl;
  };

  const scrollToCTA = () => {
    ctaSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const calculateBMI = () => {
    if (!profile.height || !profile.currentWeight) return '0.0';
    const h = profile.height / 100;
    return (profile.currentWeight / (h * h)).toFixed(1);
  };

  const calculateTargetBMI = () => {
    const h = profile.height / 100;
    return (profile.targetWeight / (h * h)).toFixed(2);
  };

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return 'Abaixo do peso';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Sobrepeso';
    return 'Obeso';
  };

  const getBodyFatPercentage = () => {
    const bmi = parseFloat(calculateBMI());
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

  const calculateCalories = () => {
    let bmr;
    if (profile.gender === 'male') {
      bmr = 10 * profile.currentWeight + 6.25 * profile.height - 5 * profile.userAge + 5;
    } else {
      bmr = 10 * profile.currentWeight + 6.25 * profile.height - 5 * profile.userAge - 161;
    }
    if (profile.goal === 'lose-weight') return Math.round(bmr * 1.3 - 300);
    if (profile.goal === 'gain-weight') return Math.round(bmr * 1.5 + 300);
    return Math.round(bmr * 1.4);
  };

  const calculateWaterIntake = () => ((profile.currentWeight * 35) / 1000).toFixed(1);

  const getCurrentBodyImage = () => {
    const bodyType = profile.bodyType?.toLowerCase() || '';
    if (bodyType.includes('fuller') || bodyType.includes('overweight')) {
      return getImageSrc('body-fuller-female-results');
    }
    return getImageSrc('body-average-female-results');
  };

  const getTargetBodyImage = () => getImageSrc('body-goal-female-results');

  const bmi = parseFloat(calculateBMI());
  const bmiStatus = getBMIStatus(bmi);
  const calories = calculateCalories();
  const waterIntake = calculateWaterIntake();
  const weightDiff = profile.currentWeight - profile.targetWeight;
  const isTimerUrgent = timeLeft < 300;

  const getEnergyLevel = () => {
    if (profile.energyLevel === 'great-most') return 'Ótimo';
    if (profile.energyLevel === 'inconsistent') return 'Bom';
    if (profile.energyLevel === 'morning-good') return 'Moderado';
    return 'Baixo';
  };

  const getGoalText = () => {
    if (profile.goal === 'lose-weight') return 'Emagrecer com saúde';
    if (profile.goal === 'gain-weight') return 'Ganhar massa muscular';
    return 'Tonificar e definir';
  };

  const translateZones = (zones: string[]) => {
    const t: Record<string, string> = {
      'belly': 'Barriga', 'chest': 'Peito', 'arms': 'Braços',
      'legs': 'Pernas', 'butt': 'Glúteos', 'thighs': 'Coxas',
      'back': 'Costas', 'abs': 'Abdômen', 'full-body': 'Corpo todo',
      'hips': 'Quadris', 'face': 'Rosto', 'neck': 'Pescoço',
    };
    return zones.map(z => t[z] || z);
  };

  const metabolicAge = Math.max(18, Math.min(profile.userAge + Math.round((bmi - 22) * 2), 70));

  // ── Event countdown ──
  const daysToEvent = profile.eventDate
    ? Math.max(0, Math.ceil((new Date(profile.eventDate).getTime() - Date.now()) / 86400000))
    : null;

  const eventLabels: Record<string, string> = {
    vacation: 'Férias', trip: 'Viagem', birthday: 'Aniversário',
    'family-occasion': 'Ocasião familiar', wedding: 'Casamento',
    contest: 'Concurso', 'extreme-sports': 'Esportes radicais', other: 'Evento especial',
  };

  // ── Food → recipe preview (with real images) ──
  const foodRecipeMap: Record<string, { name: string; kcal: number; protein: number; carbs: number; img: string; tag: string }> = {
    'chicken-breast': { name: 'Frango grelhado com quinoa', kcal: 380, protein: 42, carbs: 28, img: imgHealthyMeal, tag: 'Alto em proteína' },
    'turkey-breast':  { name: 'Peito de peru com legumes', kcal: 290, protein: 38, carbs: 18, img: imgEveningMeal, tag: 'Low carb' },
    'eggs':           { name: 'Omelete de claras com espinafre', kcal: 180, protein: 22, carbs: 4, img: imgPanqueca, tag: 'Café da manhã' },
    'salmon':         { name: 'Salmão ao forno com batata-doce', kcal: 420, protein: 40, carbs: 30, img: imgHealthyMeal, tag: 'Ômega-3' },
    'tuna':           { name: 'Salada de atum light', kcal: 220, protein: 32, carbs: 8, img: imgEveningMeal, tag: 'Low carb' },
    'tilapia':        { name: 'Tilápia grelhada com legumes', kcal: 280, protein: 35, carbs: 12, img: imgCardapio, tag: 'Jantar fit' },
    'sweet-potato':   { name: 'Batata-doce assada com frango', kcal: 340, protein: 28, carbs: 42, img: imgHealthyMeal, tag: 'Pré-treino' },
    'oats':           { name: 'Mingau de aveia proteico', kcal: 280, protein: 16, carbs: 38, img: imgPanqueca, tag: 'Café da manhã' },
    'greek-yogurt':   { name: 'Bowl de iogurte grego com granola', kcal: 250, protein: 18, carbs: 28, img: imgCardapio, tag: 'Lanche fit' },
    'cottage':        { name: 'Cottage com frutas e mel', kcal: 180, protein: 20, carbs: 18, img: imgEveningMeal, tag: 'Lanche' },
    'banana':         { name: 'Vitamina de banana com whey', kcal: 260, protein: 25, carbs: 32, img: imgPanqueca, tag: 'Pós-treino' },
    'berries':        { name: 'Bowl de frutas vermelhas proteico', kcal: 190, protein: 15, carbs: 22, img: imgCardapio, tag: 'Antioxidante' },
    'avocado':        { name: 'Toast de abacate com ovos', kcal: 310, protein: 14, carbs: 26, img: imgHealthyMeal, tag: 'Gordura boa' },
    'broccoli':       { name: 'Brócolis refogado com alho', kcal: 80, protein: 5, carbs: 10, img: imgEveningMeal, tag: 'Detox' },
    'spinach':        { name: 'Salada de espinafre com ovo', kcal: 140, protein: 12, carbs: 8, img: imgCardapio, tag: 'Low carb' },
    'quinoa':         { name: 'Bowl de quinoa com legumes', kcal: 320, protein: 14, carbs: 48, img: imgHealthyMeal, tag: 'Almoço fit' },
    'brown-rice':     { name: 'Arroz integral com feijão', kcal: 290, protein: 11, carbs: 52, img: imgEveningMeal, tag: 'Almoço' },
    'ground-beef':    { name: 'Patinho moído com arroz integral', kcal: 380, protein: 36, carbs: 32, img: imgCardapio, tag: 'Ganho muscular' },
    'beef-steak':     { name: 'Bife grelhado magro', kcal: 350, protein: 40, carbs: 4, img: imgHealthyMeal, tag: 'Alto em proteína' },
    'whey-protein':   { name: 'Shake proteico pós-treino', kcal: 180, protein: 30, carbs: 8, img: imgPanqueca, tag: 'Pós-treino' },
    'apple':          { name: 'Maçã com pasta de amendoim', kcal: 220, protein: 8, carbs: 30, img: imgEveningMeal, tag: 'Lanche' },
  };

  const recipePreview = (profile.likedFoods || [])
    .filter(f => foodRecipeMap[f])
    .slice(0, 4)
    .map(f => foodRecipeMap[f]);

  // ── Workout preview (with real images) ──
  const allWorkoutCards = [
    { id: 'home',       label: 'HIIT em casa', duration: '20 min', level: 'Iniciante',     img: imgExercisePushups, desc: 'Circuito completo sem equipamentos' },
    { id: 'running',    label: 'Cardio intervalado', duration: '30 min', level: 'Moderado',     img: imgExerciseCardio,  desc: 'Alterna sprint e caminhada para queimar mais' },
    { id: 'gym',        label: 'Treino de força', duration: '45 min', level: 'Intermediário', img: imgExerciseWeights, desc: 'Musculação focada em hipertrofia' },
    { id: 'walking',    label: 'Caminhada HIIT', duration: '35 min', level: 'Iniciante',     img: imgFitnessWoman,    desc: 'Caminhada rápida com variações de ritmo' },
    { id: 'stretching', label: 'Treino com peso', duration: '25 min', level: 'Iniciante',   img: imgExerciseWeights, desc: 'Força e definição com halteres leves' },
  ];

  const sportsInterest = profile.sportsInterest || [];
  const hasRunning = sportsInterest.includes('running');
  const hasHome    = sportsInterest.includes('home') || (profile.workoutLocation || []).includes('home');
  const hasGym     = sportsInterest.includes('gym')  || (profile.workoutLocation || []).includes('gym');
  const hasWalking = profile.walkingFrequency === 'almost-daily' || profile.walkingFrequency === '3-4-times';

  const workoutPreview = allWorkoutCards.filter(w =>
    (w.id === 'home'       && hasHome)    ||
    (w.id === 'running'    && hasRunning) ||
    (w.id === 'gym'        && hasGym)     ||
    (w.id === 'walking'    && hasWalking) ||
    (w.id === 'stretching')
  ).slice(0, 3);

  const personalizedBadges = [
    `${profile.userAge} anos`,
    ...(profile.targetZones?.length
      ? [`Foco em ${translateZones(profile.targetZones.slice(0, 2)).join(' & ')}`]
      : []),
    weightDiff > 0 ? `-${weightDiff}kg de meta` : 'Definição muscular',
    'Rotinas de 10-20 min',
    getGoalText(),
  ];

  const timeline = [
    { week: 'Semana 1', title: 'Mais leveza', desc: 'Disposição aumenta, inchaço reduz', num: '01', color: '#3b82f6' },
    { week: 'Semana 2', title: 'Roupas mais largas', desc: 'Resultados visíveis no espelho', num: '02', color: '#14b8a6' },
    { week: 'Semana 3', title: 'Comentários chegam', desc: 'Pessoas ao redor notam a mudança', num: '03', color: '#22c55e' },
    { week: 'Semana 4', title: 'Nova você', desc: 'Hábito formado, corpo transformado', num: '04', color: 'hsl(174 85% 35%)' },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* ── HEADER ── */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border py-3 px-4 md:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="w-10" />
          <img src={nutriaLogoLight} alt="Nutria" className="h-10 block dark:hidden mix-blend-multiply" />
          <img src={nutriaLogoDark}  alt="Nutria" className="h-10 hidden dark:block" />
          <ThemeToggle />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-12">

        {/* ══════════════════════════════════════
            HERO — 3D PLAN CARD
        ══════════════════════════════════════ */}
        <FadeUp>
          <div className="flex flex-col items-center gap-6">

            {/* 3D Card */}
            <div className="nc-parent">
              <div className="nc-card">
                {/* Glass overlay */}
                <div className="nc-glass" />

                {/* Concentric circles — top right */}
                <div className="nc-logo">
                  <span className="nc-circle nc-circle1" />
                  <span className="nc-circle nc-circle2" />
                  <span className="nc-circle nc-circle3" />
                  <span className="nc-circle nc-circle4" />
                  <span className="nc-circle nc-circle5">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M13 2L4.5 13H11L10 22L19.5 11H13L13 2Z" />
                    </svg>
                  </span>
                </div>

                {/* Texto principal */}
                <div className="nc-content">
                  <span className="nc-title">
                    Seu plano<br />está pronto.
                  </span>
                  <span className="nc-text">
                    {getGoalText()}
                    {weightDiff > 0 ? ` · Meta: −${weightDiff}kg` : ''}
                  </span>
                </div>

                {/* Bottom — ícones + ver plano */}
                <div className="nc-bottom">
                  <div className="nc-social-btns">
                    <button className="nc-social-btn" title="Treino">
                      <Dumbbell className="nc-social-btn-icon" />
                    </button>
                    <button className="nc-social-btn" title="Queima">
                      <Flame className="nc-social-btn-icon" />
                    </button>
                    <button className="nc-social-btn" title="Conquista">
                      <Trophy className="nc-social-btn-icon" />
                    </button>
                  </div>
                  <div className="nc-view-more" onClick={scrollToCTA}>
                    <button className="nc-view-more-btn">Ver plano</button>
                    <svg viewBox="0 0 15 15" className="nc-view-more-arrow">
                      <path d="M5 3L10 7.5L5 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Weight delta widget */}
            {weightDiff > 0 && (
              <div className="inline-flex items-center gap-4 rounded-2xl p-4 border"
                style={{ background: 'hsl(174 85% 35% / 0.07)', borderColor: 'hsl(174 85% 35% / 0.2)' }}>
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-0.5">Hoje</p>
                  <p className="text-3xl font-black text-foreground">{profile.currentWeight}<span className="text-lg">kg</span></p>
                </div>
                <div className="flex flex-col items-center gap-1 px-1">
                  <div className="rounded-full p-1.5 bg-primary/20">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[10px] font-black text-primary">−{weightDiff}kg</span>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-0.5">Meta</p>
                  <p className="text-3xl font-black text-primary">{profile.targetWeight}<span className="text-lg">kg</span></p>
                </div>
              </div>
            )}

            {/* Badges personalizados */}
            <div className="flex flex-wrap gap-2 justify-center max-w-sm">
              {personalizedBadges.map((badge, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-border bg-card text-foreground">
                  <Check className="w-3 h-3 flex-shrink-0 text-primary" />
                  {badge}
                </span>
              ))}
            </div>

          </div>
        </FadeUp>

        {/* ══════════════════════════════════════
            TRANSFORMAÇÃO — BEFORE / AFTER
        ══════════════════════════════════════ */}
        <FadeUp delay={80}>
          <div>
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Visualize sua transformação</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">
                Sua jornada em <span className="text-primary">12 semanas</span>
              </h2>
            </div>

            {/* Comparison card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border">
              {/* Dark header strip */}
              <div className="grid grid-cols-2">
                <div className="flex items-center justify-center gap-2 py-3 px-4 bg-muted/80 border-b border-border/60">
                  <User className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Você hoje</span>
                </div>
                <div className="flex items-center justify-center gap-2 py-3 px-4 border-b border-primary/30" style={{ background: 'hsl(174 85% 35% / 0.12)' }}>
                  <Trophy className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Em 12 semanas</span>
                </div>
              </div>

              {/* Images row */}
              <div className="grid grid-cols-2 relative">
                {/* Before */}
                <div className="flex items-end justify-center pt-4 pb-0" style={{ background: 'hsl(var(--muted))', minHeight: 260 }}>
                  <img src={getCurrentBodyImage()} alt="Corpo atual"
                    className="w-auto object-contain" style={{ height: 240 }} />
                </div>

                {/* Center divider arrow */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1">
                  <div className="rounded-full p-2.5 shadow-xl" style={{ background: 'hsl(174 85% 35%)' }}>
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* After */}
                <div className="flex items-end justify-center pt-4 pb-0" style={{ background: 'hsl(174 85% 35% / 0.08)', minHeight: 260 }}>
                  <img src={getTargetBodyImage()} alt="Corpo meta"
                    className="w-auto object-contain" style={{ height: 240 }} />
                </div>
              </div>

              {/* Stats strip */}
              <div className="grid grid-cols-2 border-t border-border">
                {/* Before stats */}
                <div className="p-4 space-y-3 bg-card border-r border-border/60">
                  <div className="text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Gordura corporal</p>
                    <p className="text-lg font-black text-foreground">{getBodyFatPercentage()}</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-muted-foreground mb-1.5">
                      <span className="font-semibold">Energia</span><span>35%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-muted-foreground/40" style={{ width: '35%' }} />
                    </div>
                  </div>
                </div>

                {/* After stats */}
                <div className="p-4 space-y-3" style={{ background: 'hsl(174 85% 35% / 0.06)' }}>
                  <div className="text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Gordura corporal</p>
                    <p className="text-lg font-black text-primary">{getTargetBodyFatPercentage()}</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] mb-1.5">
                      <span className="font-semibold text-muted-foreground">Energia</span>
                      <span className="text-primary font-bold">85%</span>
                    </div>
                    <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: '85%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom note */}
              <div className="bg-secondary/40 px-4 py-2 text-center border-t border-border/40">
                <p className="text-[10px] text-muted-foreground">
                  Resultados individuais podem variar. Baseado em plano seguido corretamente.
                </p>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ══════════════════════════════════════
            EVENTO ESPECIAL (se houver)
        ══════════════════════════════════════ */}
        {daysToEvent !== null && profile.eventType && profile.eventType !== 'none' && (
          <FadeUp delay={80}>
            <div className="relative overflow-hidden rounded-3xl" style={{
              background: 'linear-gradient(145deg, #191208 0%, #231a08 60%, #1a1306 100%)',
              border: '1px solid rgba(245,158,11,0.18)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
            }}>
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{
                background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.7), transparent)',
              }} />
              <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(245,158,11,0.08)' }} />
              <div className="relative z-10 p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6">
                <div className="text-center sm:text-left flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                    style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', color: '#fbbf24' }}>
                    <CalendarDays className="w-3 h-3" />
                    {eventLabels[profile.eventType] || 'Evento especial'}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">
                    Você tem{' '}
                    <span style={{ color: '#fbbf24' }}>{daysToEvent} dias</span>{' '}
                    para chegar lá.
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    Seu plano foi calculado para atingir a meta a tempo.
                    {profile.targetWeight > 0 && ` Meta: ${profile.targetWeight}kg.`}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(245,158,11,0.12)', border: '1.5px solid rgba(245,158,11,0.3)' }}>
                    <div className="text-center">
                      <p className="text-4xl font-black leading-none" style={{ color: '#fbbf24' }}>{daysToEvent}</p>
                      <p className="text-[9px] font-bold uppercase tracking-widest mt-0.5" style={{ color: 'rgba(251,191,36,0.5)' }}>dias</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        )}

        {/* ══════════════════════════════════════
            PRÉVIA DO CARDÁPIO PERSONALIZADO
        ══════════════════════════════════════ */}
        {recipePreview.length > 0 && (
          <FadeUp delay={80}>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl" style={{ background: 'hsl(174 85% 35% / 0.12)' }}>
                  <ChefHat className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">Seu cardápio</p>
                  <h2 className="text-2xl font-black text-foreground">Receitas feitas para você</h2>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-6">
                Baseado nos alimentos que você gosta — receitas práticas, saudáveis e deliciosas.
              </p>

              {(() => {
                // 3 fotos reais e diferentes — sem screenshots de app
                const foodImgs = [imgPanqueca, imgHealthyMeal, imgEveningMeal];
                const defaultMeta = [
                  { kcal: 320, protein: 28, tag: 'Café da manhã' },
                  { kcal: 390, protein: 36, tag: 'Almoço fit' },
                  { kcal: 260, protein: 22, tag: 'Jantar leve' },
                ];
                const slots = foodImgs.map((img, i) => ({
                  img,
                  kcal: recipePreview[i]?.kcal ?? defaultMeta[i].kcal,
                  protein: recipePreview[i]?.protein ?? defaultMeta[i].protein,
                  tag: recipePreview[i]?.tag ?? defaultMeta[i].tag,
                }));

                return (
                  <div className="grid grid-cols-2 gap-3">
                    {slots.map((item, i) => (
                      <div
                        key={i}
                        className={`rounded-2xl overflow-hidden group cursor-pointer border border-border/40 shadow-sm${i === 2 ? ' col-span-2' : ''}`}
                      >
                        <div
                          className="relative overflow-hidden"
                          style={{ aspectRatio: i === 2 ? '21/9' : '1/1' }}
                        >
                          <img
                            src={item.img}
                            alt="Receita"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Gradient from bottom */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />

                          {/* Tag */}
                          <div className="absolute top-2.5 left-2.5">
                            <span
                              className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white backdrop-blur-sm"
                              style={{ background: 'hsl(174 85% 35% / 0.88)' }}
                            >
                              {item.tag}
                            </span>
                          </div>

                          {/* Hover lock overlay */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 text-foreground shadow-lg backdrop-blur-sm">
                              <Lock className="w-3 h-3" /> Ver receita
                            </div>
                          </div>

                          {/* Stats overlaid at bottom */}
                          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
                            <span className="flex items-center gap-1 text-[10px] font-bold text-orange-300 drop-shadow-md">
                              <Flame className="w-3 h-3" />{item.kcal} kcal
                            </span>
                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-300 drop-shadow-md">
                              <TrendingUp className="w-3 h-3" />{item.protein}g prot
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}

              <div className="mt-4 flex items-center justify-center gap-2 p-3 rounded-2xl border border-dashed border-primary/30 text-center"
                style={{ background: 'hsl(174 85% 35% / 0.04)' }}>
                <Lock className="w-4 h-4 text-primary/60" />
                <p className="text-xs text-muted-foreground">
                  <span className="font-bold text-foreground">+100 receitas personalizadas</span> desbloqueadas no seu plano
                </p>
              </div>
            </div>
          </FadeUp>
        )}

        {/* ══════════════════════════════════════
            PRÉVIA DOS TREINOS
        ══════════════════════════════════════ */}
        {workoutPreview.length > 0 && (
          <FadeUp delay={80}>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl" style={{ background: 'hsl(174 85% 35% / 0.12)' }}>
                  <HeartPulse className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">Sua rotina</p>
                  <h2 className="text-2xl font-black text-foreground">Treinos no seu estilo</h2>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-6">
                Treinos curtos adaptados à sua rotina — sem precisar de academia.
              </p>

              <div className="space-y-3">
                {workoutPreview.map((workout, i) => (
                  <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden flex group hover:border-primary/30 transition-colors cursor-pointer">
                    {/* Thumbnail */}
                    <div className="relative w-24 flex-shrink-0 overflow-hidden">
                      <img src={workout.img} alt={workout.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" style={{ minHeight: 80 }} />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    </div>
                    {/* Content */}
                    <div className="flex-1 p-4 flex items-center gap-3 min-w-0">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <p className="font-black text-foreground text-sm">{workout.label}</p>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: 'hsl(174 85% 35% / 0.12)', color: 'hsl(174 85% 35%)' }}>
                            {workout.level}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{workout.desc}</p>
                      </div>
                      <div className="flex-shrink-0 flex flex-col items-end gap-2">
                        <div className="flex items-center gap-1 text-xs font-bold text-muted-foreground whitespace-nowrap">
                          <Clock className="w-3 h-3" /> {workout.duration}
                        </div>
                        <div className="p-1.5 rounded-full" style={{ background: 'hsl(174 85% 35%)' }}>
                          <Play className="w-3 h-3 text-white fill-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 p-3 rounded-2xl border border-dashed border-primary/30"
                style={{ background: 'hsl(174 85% 35% / 0.04)' }}>
                <Lock className="w-4 h-4 text-primary/60" />
                <p className="text-xs text-muted-foreground">
                  <span className="font-bold text-foreground">+200 treinos completos</span> desbloqueados no seu plano
                </p>
              </div>
            </div>
          </FadeUp>
        )}

        {/* ══════════════════════════════════════
            TIMELINE
        ══════════════════════════════════════ */}
        <FadeUp delay={80}>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Resultados progressivos</p>
            <h2 className="text-3xl font-black text-foreground mb-8">
              O que esperar <span className="text-primary">semana a semana</span>
            </h2>

            <div className="relative">
              {/* Connector line (desktop) */}
              <div className="absolute top-8 left-8 right-8 h-px bg-gradient-to-r from-blue-500/30 via-primary/40 to-primary/60 hidden md:block" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {timeline.map((item, i) => (
                  <FadeUp key={i} delay={i * 100}>
                    <div className="relative rounded-2xl border bg-card p-5 flex flex-col gap-3 h-full shadow-sm hover:shadow-md transition-shadow"
                      style={{ borderColor: `${item.color}30` }}>
                      {/* Number bubble */}
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white shadow-lg"
                        style={{ background: item.color, boxShadow: `0 4px 12px ${item.color}40` }}>
                        {item.num}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: item.color }}>{item.week}</p>
                        <p className="text-sm font-black text-foreground leading-tight mb-1">{item.title}</p>
                        <p className="text-xs text-muted-foreground leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ══════════════════════════════════════
            DIAGNÓSTICO
        ══════════════════════════════════════ */}
        <FadeUp delay={80}>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Análise do seu perfil</p>
            <h2 className="text-3xl font-black text-foreground mb-6">Seu diagnóstico personalizado</h2>

            {/* IMC */}
            <div className="rounded-2xl border border-border bg-card p-6 mb-4 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">IMC atual</p>
                  <p className="text-5xl font-black text-foreground tracking-tight">{bmi}</p>
                </div>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full border mt-1"
                  style={{ background: 'hsl(174 85% 35% / 0.12)', borderColor: 'hsl(174 85% 35% / 0.3)', color: 'hsl(174 85% 35%)' }}>
                  {bmiStatus}
                </span>
              </div>
              <div className="relative mb-2">
                <div className="h-3 rounded-full overflow-hidden" style={{ background: 'linear-gradient(90deg, #60a5fa 0%, #4ade80 30%, #facc15 60%, #f87171 100%)' }} />
                <div className="absolute top-0 w-4 h-4 bg-white border-4 border-foreground rounded-full -translate-y-0.5 shadow-md transition-all duration-500"
                  style={{ left: `${Math.min(Math.max((bmi - 15) / 25 * 100, 2), 96)}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-3">
                <span>Abaixo</span><span>Normal</span><span>Sobrepeso</span><span>Obeso</span>
              </div>
            </div>

            {/* Calorias + Água */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: Flame, label: 'Calorias diárias', value: String(calories), unit: 'kcal/dia',
                  color: '#f97316', bg: '#f9731615',
                  bar: <div className="h-2 rounded-full overflow-hidden" style={{ background: 'linear-gradient(90deg,#fde68a,#f97316,#dc2626)', opacity: 0.7 }}>
                    <div className="h-full bg-transparent" style={{ width: `${Math.min(((calories - 1000) / 4000) * 100, 100)}%` }} />
                  </div>
                },
                {
                  icon: Droplet, label: 'Água diária', value: waterIntake, unit: 'litros/dia',
                  color: '#3b82f6', bg: '#3b82f615',
                  bar: <div className="flex gap-1 flex-wrap mt-1">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-2.5 h-5 rounded-sm transition-colors"
                        style={{ background: i < Math.round(parseFloat(waterIntake) / 0.25) ? '#60a5fa' : 'hsl(var(--muted))' }} />
                    ))}
                  </div>
                },
              ].map(({ icon: Icon, label, value, unit, color, bg, bar }, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div className="p-2.5 rounded-xl w-fit mb-3" style={{ background: bg }}>
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <p className="text-xs font-semibold text-foreground">{label}</p>
                    <span className="border text-[9px] font-bold uppercase px-2 py-0.5 rounded-full"
                      style={{ borderColor: 'hsl(174 85% 35% / 0.4)', color: 'hsl(174 85% 35%)' }}>Ideal</span>
                  </div>
                  <p className="text-3xl font-black text-foreground leading-none">{value}</p>
                  <p className="text-xs text-muted-foreground mb-3">{unit}</p>
                  {bar}
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* ══════════════════════════════════════
            PLANO PRONTO — STATS CARDS
        ══════════════════════════════════════ */}
        <FadeUp delay={80}>
          <div className="rounded-3xl border border-border overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-6 py-5 border-b border-border bg-card">
              <div className="flex items-center gap-4">
                <div className="h-10 w-1 rounded-full bg-primary flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-black text-foreground">Seu plano está pronto</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Personalizado com base nas suas respostas</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-card">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { icon: Target, label: 'Meta de peso', value: `${profile.targetWeight}kg`, color: '#ef4444', bg: '#ef444415' },
                  { icon: TrendingUp, label: 'Idade metabólica', value: `${metabolicAge} anos`, color: '#a855f7', bg: '#a855f715' },
                  { icon: Wind, label: 'Nível de energia', value: getEnergyLevel(), color: '#f97316', bg: '#f9731615' },
                  ...(profile.targetZones?.length
                    ? [{ icon: MapPin, label: 'Zonas alvo', value: translateZones(profile.targetZones).join(', '), color: '#22c55e', bg: '#22c55e15' }]
                    : []),
                ].map(({ icon: Icon, label, value, color, bg }, i) => (
                  <div key={i} className="rounded-2xl p-4 border border-border/50 flex items-center gap-3 bg-background/50">
                    <div className="p-2.5 rounded-xl flex-shrink-0" style={{ background: bg }}>
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
                      <p className="text-sm font-bold text-foreground truncate">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI pill */}
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-secondary/40 p-4">
                <div className="p-2.5 rounded-xl shrink-0 bg-background border border-border/60">
                  <Zap className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">Nutria AI inclusa no plano</h4>
                  <p className="text-xs text-muted-foreground">Tire dúvidas e ajuste seu plano 24h por dia.</p>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ══════════════════════════════════════
            CHECKOUT — PREMIUM DARK CTA
        ══════════════════════════════════════ */}
        <FadeUp delay={80}>
          <div ref={ctaSectionRef} className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Background */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(135deg, #0a2218 0%, #0f3d2c 50%, #0a2218 100%)'
            }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'hsl(174 85% 35% / 0.12)' }} />
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl" style={{ background: 'hsl(174 85% 35% / 0.2)' }} />

            <div className="relative z-10 p-6 md:p-10">
              {/* Top tag */}
              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full"
                  style={{ background: 'hsl(174 85% 35% / 0.25)', border: '1px solid hsl(174 85% 35% / 0.4)', color: 'hsl(174 85% 65%)' }}>
                  <Zap className="w-3 h-3" /> Oferta Especial — Por tempo limitado
                </span>
              </div>

              {/* Headline */}
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">
                  Comece sua transformação<br />
                  <span style={{ color: 'hsl(174 85% 55%)' }}>ainda hoje.</span>
                </h2>
                <p className="text-white/50 text-sm">Seu plano já está pronto. Falta só um passo.</p>
              </div>

              {/* Ripple grid — visual pulse de energia antes do timer */}
              <div className="flex flex-col items-center gap-3 mb-8">
                <RippleLoader />
                <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'hsl(174 85% 45%)' }}>
                  Plano ativo e pronto para você
                </p>
              </div>

              {/* Countdown */}
              <div className="flex flex-col items-center mb-8">
                <div className="flex items-center gap-1.5 mb-4">
                  <Timer className="w-4 h-4 text-red-400" />
                  <p className="text-sm text-white/60">Esta oferta expira em</p>
                </div>
                <div className="flex items-center gap-3">
                  {[{ val: m, label: 'min' }, { val: s, label: 'seg' }].map(({ val, label }, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {i > 0 && <span className="text-3xl font-black text-white/40">:</span>}
                      <div className="text-center">
                        <div className={`rounded-2xl px-5 py-3 min-w-[72px] shadow-lg ${isTimerUrgent ? 'bg-red-500' : 'bg-white/10 border border-white/15'} ${isTimerUrgent ? 'animate-pulse' : ''}`}>
                          <p className="text-4xl font-black leading-none text-white tabular-nums">{val}</p>
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-1.5">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price card */}
              <div className="rounded-2xl p-5 mb-6 border" style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' }}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'hsl(174 85% 35%)' }}>
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-black text-white text-lg leading-tight">Plano Vitalício Nutria</p>
                      <p className="text-white/40 text-xs">Acesso completo e permanente</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-white/40 line-through">R$ 97,00</p>
                    <p className="text-4xl font-black text-white leading-none">R$ 17<span className="text-2xl">,99</span></p>
                    <p className="text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: 'hsl(174 85% 55%)' }}>Pagamento único</p>
                  </div>
                </div>

                {/* Savings badge */}
                <div className="mt-4 flex items-center justify-center gap-2 rounded-xl py-2 px-4"
                  style={{ background: 'hsl(174 85% 35% / 0.2)', border: '1px solid hsl(174 85% 35% / 0.3)' }}>
                  <BadgeCheck className="w-4 h-4" style={{ color: 'hsl(174 85% 55%)' }} />
                  <span className="text-xs font-bold" style={{ color: 'hsl(174 85% 65%)' }}>
                    Você economiza R$ 79,01 — 81% de desconto
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={goToCheckout}
                className="w-full font-black text-lg py-5 rounded-2xl transition-all duration-200 active:scale-[0.98] mb-4"
                style={{
                  background: 'linear-gradient(135deg, hsl(174 85% 40%) 0%, hsl(174 85% 50%) 100%)',
                  color: 'white',
                  boxShadow: '0 8px 32px hsl(174 85% 35% / 0.5)',
                }}
              >
                QUERO MEU PLANO AGORA →
              </button>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/40">
                <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Pagamento seguro</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Garantia 30 dias</span>
                <span className="flex items-center gap-1.5"><BadgeCheck className="w-3.5 h-3.5" /> Acesso imediato</span>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ══════════════════════════════════════
            O QUE ESTÁ INCLUSO
        ══════════════════════════════════════ */}
        <FadeUp delay={80}>
          <div className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-border bg-secondary/30">
              <h3 className="text-xl font-black text-foreground">O que está incluso no seu plano</h3>
            </div>
            <div className="p-6 grid sm:grid-cols-2 gap-3">
              {[
                { icon: Dumbbell, title: 'Treinos fáceis em casa', desc: 'Para ganhar massa muscular e entrar em forma.', color: 'hsl(174 85% 35%)', bg: 'hsl(174 85% 35% / 0.1)' },
                { icon: Target, title: 'Exercícios para iniciantes', desc: 'Barriga mais lisa e corpo mais definido.', color: '#ef4444', bg: '#ef444410' },
                { icon: Clock, title: 'Rotinas de 10-20 min', desc: 'Que se encaixam na sua agenda.', color: '#f97316', bg: '#f9731610' },
                { icon: Package, title: 'Sem equipamentos', desc: 'Apenas o nosso plano e sua determinação.', color: '#a855f7', bg: '#a855f710' },
                { icon: Utensils, title: 'Plano alimentar personalizado', desc: 'Receitas rápidas, práticas e saborosas.', color: '#3b82f6', bg: '#3b82f610' },
                { icon: Lightbulb, title: 'Dicas de especialistas', desc: 'Para manter a forma e o estilo de vida.', color: '#eab308', bg: '#eab30810' },
              ].map(({ icon: Icon, title, desc, color, bg }, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl border border-border/40 bg-background/60 group hover:border-primary/30 transition-colors">
                  <div className="p-2.5 rounded-xl flex-shrink-0 transition-transform duration-200 group-hover:scale-110" style={{ background: bg }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* ══════════════════════════════════════
            BENEFÍCIOS ADICIONAIS
        ══════════════════════════════════════ */}
        <FadeUp delay={80}>
          <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="px-6 py-5 border-b border-border bg-secondary/30">
              <h2 className="text-xl font-black text-foreground">Além disso, você vai:</h2>
            </div>
            <div className="p-6 grid sm:grid-cols-2 gap-1">
              {[
                'Reduzir o estresse e a ansiedade',
                'Se sentir mais saudável e confiante',
                'Desenvolver autodisciplina de forma natural',
                'Criar hábitos saudáveis que duram',
                'Melhorar a qualidade do sono',
              ].map((goal, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-secondary/40 transition-colors group">
                  <span className="text-[11px] font-black tabular-nums text-primary/50 w-5 flex-shrink-0 group-hover:text-primary transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm text-foreground">{goal}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* ══════════════════════════════════════
            PROVA SOCIAL
        ══════════════════════════════════════ */}
        <FadeUp delay={80}>
          <section className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 pt-8 pb-4 text-center">
              <div className="flex justify-center gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-sm font-bold text-foreground mb-4">4.8 de 5 · mais de 2.400 avaliações</p>
              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-1">Transformações reais</h2>
              <p className="text-muted-foreground text-sm">Pessoas que mudaram suas vidas com a Nutria</p>
            </div>

            <div className="px-4 pb-4">
              <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-5xl mx-auto mb-6">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {[
                    { img: transformationCombinedFemale4, name: 'Camila', loss: '-10kg', quote: 'Resultados visíveis em poucos meses! Me sinto mais confiante e saudável.' },
                    { img: transformationCombinedFemale5, name: 'Juliana', loss: '-14kg', quote: 'Mudança incrível! Recuperei minha autoestima e me sinto radiante.' },
                    { img: transformationCombinedFemale3, name: 'Patricia', loss: '-15kg', quote: 'Transformação incrível! Me sinto completamente renovada e cheia de energia.' },
                  ].map(({ img, name, loss, quote }, i) => (
                    <CarouselItem key={i} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <div className="bg-background border border-border rounded-2xl overflow-hidden h-full flex flex-col shadow-sm">
                        <div className="p-4 pb-2">
                          <div className="flex justify-between mb-2">
                            <p className="text-[10px] text-muted-foreground text-center font-bold flex-1 uppercase tracking-wider">Antes</p>
                            <p className="text-[10px] text-primary text-center font-bold flex-1 uppercase tracking-wider">Depois</p>
                          </div>
                          <img src={img} alt={`Transformação ${name}`} className="w-full h-56 object-cover rounded-xl" />
                        </div>
                        <div className="px-4 pb-5 flex-1">
                          <div className="flex items-center gap-2 mb-2 mt-1">
                            <p className="font-black text-foreground">{name}, <span className="text-primary">{loss}</span></p>
                            <div className="flex gap-0.5 ml-auto">
                              {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed italic">"{quote}"</p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4 md:-left-12" />
                <CarouselNext className="-right-4 md:-right-12" />
              </Carousel>

              <div className="text-center pb-4">
                <button
                  onClick={scrollToCTA}
                  className="inline-flex items-center gap-2 bg-foreground text-background hover:opacity-90 px-8 py-4 text-base font-bold rounded-2xl transition-all hover:scale-105 shadow-lg"
                >
                  Quero ser o próximo resultado
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>
        </FadeUp>

        {/* ══════════════════════════════════════
            FAQ
        ══════════════════════════════════════ */}
        <FadeUp delay={80}>
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-center mb-6 text-foreground">Perguntas frequentes</h2>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {[
                {
                  q: 'Como esse plano pode me ajudar a queimar gordura e ganhar massa muscular?',
                  a: 'Nosso plano combina exercícios específicos para ganho de massa muscular com uma dieta balanceada que acelera o metabolismo. Os treinos são projetados para maximizar a queima de gordura enquanto constroem músculos magros, e o plano alimentar fornece os nutrientes necessários para a recuperação e crescimento muscular.',
                },
                {
                  q: 'Quais são os benefícios da calistenia?',
                  a: 'A calistenia oferece diversos benefícios: você pode treinar em qualquer lugar sem equipamentos, desenvolve força funcional, melhora a flexibilidade e coordenação, reduz o risco de lesões e ainda é altamente eficaz para queima de gordura. É ideal para iniciantes e pode ser adaptada conforme seu nível de condicionamento.',
                },
                {
                  q: 'E se eu perder a motivação rapidamente?',
                  a: 'Entendemos que manter a motivação pode ser desafiador. Por isso, nosso plano inclui metas progressivas, acompanhamento de resultados visíveis e dicas motivacionais diárias. Além disso, os treinos curtos de 10-20 minutos são mais fáceis de manter na rotina, aumentando suas chances de sucesso a longo prazo.',
                },
              ].map(({ q, a }, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-2xl px-4 shadow-sm">
                  <AccordionTrigger className="text-left text-foreground hover:no-underline py-4 font-semibold text-sm">{q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 text-sm leading-relaxed">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </FadeUp>

        {/* ══════════════════════════════════════
            GARANTIA
        ══════════════════════════════════════ */}
        <FadeUp delay={80}>
          <section className="rounded-3xl p-8 border text-center" style={{ background: 'linear-gradient(135deg, #052010 0%, #0a2a18 100%)', borderColor: '#16a34a30' }}>
            <div className="inline-flex p-4 rounded-2xl mb-4" style={{ background: '#16a34a20' }}>
              <ShieldCheck className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Garantia de reembolso de 30 dias</h3>
            <p className="text-white/50 max-w-lg mx-auto leading-relaxed mb-6 text-sm">
              Acreditamos que nosso plano funcionará para você e que você verá resultados visíveis em apenas 4 semanas.
              Estamos dispostos a devolver seu dinheiro caso comprove que seguiu o plano sem obter resultados.
            </p>
            <button
              onClick={goToCheckout}
              className="w-full sm:w-auto font-black text-lg px-10 py-4 rounded-2xl transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, hsl(174 85% 40%) 0%, hsl(174 85% 50%) 100%)',
                color: 'white',
                boxShadow: '0 6px 24px hsl(174 85% 35% / 0.4)',
              }}
            >
              ADQUIRIR MEU PLANO
            </button>
          </section>
        </FadeUp>

        {/* Rodapé */}
        <div className="text-center pt-4 pb-24 md:pb-8 border-t border-border">
          <p className="text-xs text-muted-foreground">Copyright © 2024 Nutria · Todos os direitos reservados</p>
        </div>
      </div>

      {/* ── STICKY CTA MOBILE ── */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 p-3 backdrop-blur-md border-t shadow-2xl transition-all duration-300 md:hidden ${
        showStickyCTA ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`} style={{ background: 'rgba(10,34,24,0.96)', borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-white/40">Plano Vitalício Nutria</p>
            <div className="flex items-baseline gap-2">
              <p className="font-black text-white text-lg leading-none">R$ 17,99</p>
              <p className="text-xs text-white/30 line-through">R$ 97</p>
            </div>
          </div>
          <button
            onClick={goToCheckout}
            className="flex-shrink-0 font-black px-5 py-3 rounded-xl text-sm transition-all active:scale-95"
            style={{ background: 'hsl(174 85% 40%)', color: 'white' }}
          >
            ADQUIRIR AGORA
          </button>
        </div>
      </div>
    </div>
  );
};
