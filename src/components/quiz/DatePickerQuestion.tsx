import { useState } from 'react';
import { format, addMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

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

  const handleContinue = () => {
    onContinue(date || null);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="max-w-sm w-full">

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-muted-foreground mt-2 text-base leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Selected date display */}
          <div className="text-center mb-5">
            <div
              className="inline-block px-6 py-3 rounded-2xl border"
              style={{
                background: date
                  ? 'rgba(1,211,180,0.08)'
                  : 'transparent',
                borderColor: date
                  ? 'rgba(1,211,180,0.3)'
                  : 'hsl(var(--border))',
              }}
            >
              <p
                className="text-3xl font-light tracking-widest"
                style={{ color: date ? 'hsl(174 85% 40%)' : 'hsl(var(--muted-foreground))' }}
              >
                {date
                  ? format(date, 'dd / MM / yyyy', { locale: ptBR })
                  : 'DD / MM / AAAA'}
              </p>
              {date && (
                <p className="text-xs text-muted-foreground mt-1 capitalize">
                  {format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
              )}
            </div>
          </div>

          {/* Inline Calendar */}
          <div
            className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden mb-5"
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={ptBR}
              disabled={(d) => {
                const day = new Date(d);
                day.setHours(0, 0, 0, 0);
                return day <= today;
              }}
              className="w-full pointer-events-auto [&_.rdp]:w-full [&_.rdp-month]:w-full [&_.rdp-table]:w-full"
              classNames={{
                months: 'flex flex-col w-full',
                month: 'w-full',
                caption: 'flex justify-center pt-2 relative items-center mb-2',
                caption_label: 'text-sm font-bold text-foreground capitalize',
                nav: 'space-x-1 flex items-center',
                nav_button:
                  'h-8 w-8 bg-transparent hover:bg-secondary rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors border border-transparent hover:border-border',
                nav_button_previous: 'absolute left-2',
                nav_button_next: 'absolute right-2',
                table: 'w-full border-collapse',
                head_row: 'flex w-full',
                head_cell:
                  'text-muted-foreground flex-1 font-semibold text-[0.75rem] uppercase tracking-wide py-1.5 text-center',
                row: 'flex w-full mt-1',
                cell: 'flex-1 text-center p-0 relative',
                day: 'h-9 w-9 mx-auto rounded-full font-medium text-sm flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer',
                day_selected:
                  'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground font-bold shadow-md',
                day_today: 'border border-primary text-primary font-bold',
                day_outside: 'text-muted-foreground opacity-30',
                day_disabled: 'text-muted-foreground opacity-25 cursor-not-allowed',
                day_hidden: 'invisible',
              }}
            />
          </div>

          {/* Privacy */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-6">
            <Lock className="h-4 w-4 flex-shrink-0" />
            <span>Não estamos compartilhando esses dados com terceiros.</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1 py-6 text-base rounded-2xl font-semibold"
              onClick={onSkip}
            >
              Pular
            </Button>
            <Button
              className="flex-1 py-6 text-base rounded-2xl font-bold bg-primary hover:bg-primary/90"
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
