import { useState } from 'react';
import { format, addMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Lock, CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DatePickerQuestionProps {
  title: string;
  subtitle?: string;
  onContinue: (date: Date | null) => void;
  onSkip: () => void;
}

export const DatePickerQuestion = ({
  title,
  subtitle,
  onContinue,
  onSkip,
}: DatePickerQuestionProps) => {
  const [date, setDate] = useState<Date | undefined>(addMonths(new Date(), 1));
  const [open, setOpen] = useState(false);

  const handleContinue = () => {
    onContinue(date || null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="text-muted-foreground text-lg">
                {subtitle}
              </p>
            )}
          </div>

          <div className="py-8">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-center text-3xl md:text-4xl font-light py-8 border-b border-border hover:bg-transparent hover:border-primary transition-colors",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? (
                    format(date, "dd / MM / yyyy", { locale: ptBR })
                  ) : (
                    <span className="flex items-center gap-3">
                      <CalendarIcon className="h-8 w-8" />
                      DD / MM / AAAA
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    setOpen(false);
                  }}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <Lock className="h-4 w-4" />
            <span>Não estamos compartilhando esses dados com terceiros.</span>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              variant="secondary"
              className="flex-1 py-6 text-lg rounded-full"
              onClick={onSkip}
            >
              Pular
            </Button>
            <Button
              className="flex-1 py-6 text-lg rounded-full bg-primary hover:bg-primary/90"
              onClick={handleContinue}
              disabled={!date}
            >
              Continuar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
