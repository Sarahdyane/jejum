import { format, addMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Flag } from 'lucide-react';

interface GoalProjectionPageProps {
  targetWeight: number;
  currentWeight: number;
  eventDate?: string;
  onContinue: () => void;
}

export const GoalProjectionPage = ({
  targetWeight,
  currentWeight,
  eventDate,
  onContinue,
}: GoalProjectionPageProps) => {
  const today = new Date();
  const projectedDate = eventDate ? new Date(eventDate) : addMonths(today, 1);
  
  const formattedDate = format(projectedDate, "d 'de' MMM. 'de' yyyy", { locale: ptBR });
  const formattedToday = format(today, "d 'de' MMM. 'de' yyyy", { locale: ptBR });

  // Determine if gaining or losing weight
  const isGaining = targetWeight > currentWeight;
  const startWeight = currentWeight || 70;
  const endWeight = targetWeight || 65;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col px-4 py-8">
        <div className="max-w-lg mx-auto w-full space-y-6">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center leading-tight">
            O último plano de que você precisará para{' '}
            <span className="text-primary">finalmente entrar</span> em forma
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground text-center text-lg">
            Com base em nossos cálculos, acreditamos que você poderá atingir seu objetivo de peso de{' '}
            <span className="text-foreground font-semibold">{endWeight} kg</span> até
          </p>

          {/* Date with underline */}
          <div className="text-center">
            <span className="text-2xl md:text-3xl font-bold text-primary border-b-2 border-primary pb-1">
              {formattedDate}
            </span>
          </div>

          {/* Chart Area */}
          <div className="relative mt-8 pt-8">
            {/* Target weight flag */}
            <div className="absolute right-4 top-0 flex items-center gap-1">
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-semibold">
                {endWeight} kg
              </span>
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-primary border-2 border-background"></div>
                <Flag className="h-6 w-6 text-amber-600 absolute -right-1 -top-1" fill="currentColor" />
              </div>
            </div>

            {/* Chart visualization */}
            <div className="relative h-48 mt-8">
              {/* Gradient background */}
              <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                
                {/* Filled area */}
                <path
                  d={isGaining 
                    ? "M 0,130 Q 100,120 200,80 T 400,20 L 400,150 L 0,150 Z"
                    : "M 0,20 Q 100,30 200,70 T 400,130 L 400,150 L 0,150 Z"
                  }
                  fill="url(#chartGradient)"
                />
                
                {/* Curve line */}
                <path
                  d={isGaining 
                    ? "M 0,130 Q 100,120 200,80 T 400,20"
                    : "M 0,20 Q 100,30 200,70 T 400,130"
                  }
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                />
                
                {/* Start point */}
                <circle 
                  cx="0" 
                  cy={isGaining ? "130" : "20"} 
                  r="6" 
                  fill="hsl(var(--primary))" 
                />
                
                {/* End point */}
                <circle 
                  cx="400" 
                  cy={isGaining ? "20" : "130"} 
                  r="6" 
                  fill="hsl(var(--primary))" 
                  stroke="hsl(var(--background))"
                  strokeWidth="2"
                />
              </svg>

              {/* Current weight label */}
              <div className="absolute left-0 bottom-full mb-2 flex items-center gap-1">
                <span className="bg-muted text-muted-foreground px-2 py-1 rounded text-sm font-medium">
                  {startWeight} kg
                </span>
              </div>
            </div>

            {/* X-axis dates */}
            <div className="flex justify-between text-muted-foreground text-sm mt-4">
              <span>{formattedToday}</span>
              <span>{formattedDate}</span>
            </div>

            {/* Disclaimer */}
            <p className="text-muted-foreground text-sm text-center mt-6">
              Este gráfico é apenas para fins ilustrativos
            </p>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="p-4 pb-8">
        <Button
          className="w-full py-6 text-lg rounded-full bg-primary hover:bg-primary/90"
          onClick={onContinue}
        >
          Entendi
        </Button>
      </div>
    </div>
  );
};
