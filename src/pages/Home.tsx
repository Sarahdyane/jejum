import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import nutriaLogo from '@/assets/nutria-logo.png';
import lipedemaLegs from '@/assets/lipedema-legs.png';
import nutritionistAna from '@/assets/nutritionist-ana-flavia.png';

export default function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-center py-8 px-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-primary/10 flex items-center justify-center">
            <img src={nutriaLogo} alt="Nutria" className="w-10 h-10 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Nutria</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-16">
        <div className="w-full max-w-2xl space-y-12">
          {/* Hero Image */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground">
              Chega de sofrer com lipedema !
            </h1>
            <p className="text-xl md:text-2xl text-center text-muted-foreground font-medium">
              descobrir o nível de inflamação
            </p>
            <div className="relative w-full max-w-3xl mx-auto">
              <img 
                src={lipedemaLegs} 
                alt="Chega de sofrer com lipedema" 
                title="Chega de sofrer com lipedema"
                className="w-full h-auto object-contain drop-shadow-2xl rounded-xl"
              />
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              onClick={() => {
                try {
                  sessionStorage.removeItem('nutria_quiz_state');
                } catch (e) {
                  // ignore storage errors
                }
                navigate('/quiz');
              }} 
              className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all" 
              size="lg"
            >
              FAZER O TESTE AGORA
            </Button>
            
            {/* Subtle Exclusivity Text */}
            <p className="text-center text-sm text-muted-foreground/80">
              Leva menos de 2 minutos. Resultados personalizados.
            </p>

            {/* Authority Section */}
            <div className="flex items-center gap-4 justify-center pt-6 pb-2">
              <img 
                src={nutritionistAna} 
                alt="Nutricionista Ana Flávia" 
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
              <p className="text-left text-sm text-muted-foreground max-w-xs">
                Teste desenvolvido pela Nutricionista Ana Flávia, especialista em saúde da mulher.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 text-center text-sm text-muted-foreground/60">
        <p>© 2025 Nutria. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}