import { useState, useEffect } from 'react';
import { Quiz } from '@/components/Quiz';
import { WelcomeScreen } from '@/components/quiz/WelcomeScreen';

const Index = () => {
  // Estado para controlar se mostra a capa ou o quiz
  const [showWelcome, setShowWelcome] = useState(true);

  // Garante que a página comece no topo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStart = () => {
    // Rola para o topo suavemente
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Esconde a capa e mostra o quiz
    setShowWelcome(false);
  };

  // Se o estado for true, mostra a capa profissional
  if (showWelcome) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  // Se não, mostra o Quiz normal
  return <Quiz />;
};

export default Index;
