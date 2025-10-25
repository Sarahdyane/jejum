import { useEffect } from 'react';

interface ReadyTransitionProps {
  onComplete: () => void;
}

export const ReadyTransition = ({ onComplete }: ReadyTransitionProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-teal-700 to-teal-900">
      <div className="text-center animate-scale-in">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Seu plano de jejum<br />está pronto!
        </h1>
      </div>
    </div>
  );
};
