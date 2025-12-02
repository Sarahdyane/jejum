import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import nutriaLogo from '@/assets/nutria-logo.png';
import lipedemaComparison from '@/assets/lipedema-comparison.jpg';
import nutritionistAna from '@/assets/nutritionist-ana-flavia-new.png';

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
              descubra seu nível de inflamação
            </p>
            <div className="relative w-full max-w-3xl mx-auto">
              <img 
                src={lipedemaComparison} 
                alt="Chega de sofrer com lipedema" 
                title="Chega de sofrer com lipedema"
                className="w-full h-auto object-contain drop-shadow-2xl rounded-xl"
              />
            </div>
          </div>

          {/* Texto de curiosidade */}
          <div className="text-center animate-fade-in space-y-4" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl md:text-2xl font-bold text-foreground leading-relaxed">
              O que eu descobri sobre a gordura nas pernas depois de viajar o mundo vai contra tudo o que te disseram até hoje.
            </p>
            <p className="text-base md:text-lg text-muted-foreground italic">
              Esqueça o "feche a boca e malhe mais". Se isso funcionasse, você não estaria aqui.
            </p>
          </div>

          {/* Texto de transição */}
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
              Se livre do lipedema ainda esse mês e receba o mapa que já ajudou centenas de mulheres a reconquistar a leveza e a liberdade
            </p>
          </div>

          {/* Authority Section - DOUTORA PRIMEIRO */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
              <img 
                src={nutritionistAna} 
                alt="Dr. Ana Flávia" 
                className="w-64 h-64 rounded-full object-cover shadow-2xl"
              />
              <p className="text-center md:text-left text-lg text-muted-foreground max-w-sm">
                Teste desenvolvido pela Dr.Ana Flávia, especialista em saúde da mulher.
              </p>
            </div>

            {/* CTA Section - BOTÃO DEPOIS DA DOUTORA */}
            <div className="space-y-4 pt-8">
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

              {/* Social Proof */}
              <p className="text-center text-base text-muted-foreground pt-4">
                Junte-se a mais de <span className="font-semibold text-foreground">1.257 mulheres</span> que já descobriram seu nível de inflamação.
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