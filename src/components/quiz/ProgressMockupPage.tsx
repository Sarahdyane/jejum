import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";
import nutriaLogoLight from "@/assets/nutria-logo.png";
import nutriaLogoDark from "@/assets/nutria-logo-dark.png";
import bodyGoalFemale from '@/assets/body-goal-female-results.png';
import bodyAverageFemale from '@/assets/body-average-female-results.png';

interface ProgressMockupPageProps {
  title: string;
  subtitle?: string;
  onContinue: () => void;
  onBack?: () => void;
}

const AppMockup = () => (
  <div className="relative mx-auto" style={{ width: 270 }}>
    {/* Glow behind phone */}
    <div
      className="absolute inset-x-10 bottom-0 h-10 -z-10 blur-2xl rounded-full"
      style={{ background: 'rgba(1,211,180,0.35)' }}
    />

    {/* Phone frame */}
    <div
      className="relative rounded-[36px] overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #1c2030, #0e1220)',
        border: '2px solid rgba(255,255,255,0.09)',
        boxShadow: '0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {/* Dynamic Island */}
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 z-10 rounded-full"
        style={{ width: 90, height: 24, background: '#0e1220' }}
      />

      <div className="pt-10 pb-5 px-4">
        {/* Status bar */}
        <div className="flex justify-between items-center mb-4 px-1">
          <span className="text-white/40 text-[9px] font-bold tabular-nums">9:41</span>
          <div className="flex items-center gap-1.5">
            {/* Signal bars */}
            <div className="flex items-end gap-px">
              {[2, 3, 4, 5].map((h, i) => (
                <div
                  key={i}
                  className="w-0.5 rounded-sm"
                  style={{ height: h, background: i < 3 ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)' }}
                />
              ))}
            </div>
            {/* Battery */}
            <div className="flex items-center gap-px">
              <div
                className="rounded-sm"
                style={{ width: 18, height: 10, border: '1px solid rgba(255,255,255,0.35)', position: 'relative' }}
              >
                <div
                  className="absolute left-0.5 top-0.5 bottom-0.5 rounded-sm"
                  style={{ width: '65%', background: 'rgba(255,255,255,0.5)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* App header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-white/30 text-[8px] font-bold uppercase tracking-widest mb-0.5">Nutria</p>
            <h3 className="text-white font-black text-[14px] leading-tight">Seu Progresso</h3>
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(1,211,180,0.15)', border: '1px solid rgba(1,211,180,0.25)' }}
          >
            <span className="text-[11px]">📊</span>
          </div>
        </div>

        {/* Week days */}
        <div className="flex justify-between mb-4">
          {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-white/25 text-[7px] font-bold">{day}</span>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={
                  i < 5
                    ? {
                        background: 'linear-gradient(135deg, hsl(174 85% 40%), hsl(174 85% 52%))',
                        boxShadow: '0 2px 8px rgba(1,211,180,0.35)',
                      }
                    : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }
                }
              >
                {i < 5 && <Check className="w-3 h-3 text-black" strokeWidth={3} />}
              </div>
            </div>
          ))}
        </div>

        {/* Weekly goal progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-white/35 text-[8px] font-semibold">Meta semanal</span>
            <span className="text-[9px] font-black" style={{ color: 'hsl(174 85% 50%)' }}>
              71%
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
            <div
              className="h-full rounded-full"
              style={{
                width: '71%',
                background: 'linear-gradient(90deg, hsl(174 85% 38%), hsl(174 85% 55%))',
              }}
            />
          </div>
        </div>

        {/* Before / After */}
        <div className="flex items-stretch gap-2 mb-4">
          <div
            className="flex-1 rounded-2xl overflow-hidden p-2 text-center"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-white/30 text-[7px] font-bold uppercase tracking-wider mb-1">Início</p>
            <img
              src={bodyAverageFemale}
              alt="Início"
              className="h-16 object-contain mx-auto opacity-55"
            />
          </div>

          <div className="flex items-center justify-center px-0.5">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'hsl(174 85% 40%)', boxShadow: '0 2px 8px rgba(1,211,180,0.4)' }}
            >
              <ArrowRight className="w-3 h-3 text-black" />
            </div>
          </div>

          <div
            className="flex-1 rounded-2xl overflow-hidden p-2 text-center"
            style={{
              background: 'rgba(1,211,180,0.08)',
              border: '1px solid rgba(1,211,180,0.22)',
            }}
          >
            <p
              className="text-[7px] font-bold uppercase tracking-wider mb-1"
              style={{ color: 'hsl(174 85% 52%)' }}
            >
              Agora
            </p>
            <img src={bodyGoalFemale} alt="Progresso" className="h-16 object-contain mx-auto" />
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: 'Perda', value: '−3.2kg', color: 'hsl(174 85% 52%)' },
            { label: 'Treinos', value: '12/15', color: '#f97316' },
            { label: 'Dieta', value: '94%', color: '#a855f7' },
          ].map(({ label, value, color }, i) => (
            <div
              key={i}
              className="rounded-xl p-2 text-center"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <p className="text-white/30 text-[7px] font-semibold mb-0.5">{label}</p>
              <p className="text-[11px] font-black leading-none" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const ProgressMockupPage = ({
  title,
  subtitle,
  onContinue,
  onBack,
}: ProgressMockupPageProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 md:h-20 bg-background z-50 flex items-center justify-between px-4 md:px-8 border-b border-border">
        <div className="w-20 flex justify-start">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 -ml-2 text-foreground hover:text-primary transition-colors rounded-full hover:bg-secondary/50"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src={nutriaLogoLight}
            alt="Nutria"
            className="h-12 w-auto object-contain block dark:hidden mix-blend-multiply"
          />
          <img
            src={nutriaLogoDark}
            alt="Nutria"
            className="h-12 w-auto object-contain hidden dark:block"
          />
        </div>
        <div className="w-20 flex justify-end">
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-6 pt-24 pb-32">
        <div className="w-full max-w-md mx-auto quiz-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-muted-foreground leading-relaxed text-base">{subtitle}</p>
            )}
          </div>

          <AppMockup />
        </div>
      </main>

      {/* Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background/80 backdrop-blur-lg z-20 border-t border-border">
        <div className="max-w-md mx-auto">
          <Button
            onClick={onContinue}
            className="w-full bg-[#01d3b4] hover:bg-[#01b398] text-[#050a14] font-bold py-6 text-lg rounded-xl shadow-[0_0_20px_rgba(1,211,180,0.2)] hover:shadow-[0_0_30px_rgba(1,211,180,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            CONTINUAR
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};
