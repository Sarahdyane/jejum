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
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#0d7377' }}>
      <div className="text-center animate-scale-in">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Seu plano de elite<br />está pronto!
        </h1>
      </div>
    </div>
  );
};
