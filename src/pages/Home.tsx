import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import nutriaLogo from '@/assets/nutria-logo.png';
import metabolicDoor from '@/assets/metabolic-door-new.webp';

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
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
              A Sua Porta Metabólica Secreta
            </h2>
            <div className="relative w-full max-w-3xl mx-auto">
              <img 
                src={metabolicDoor} 
                alt="A Sua Porta Metabólica Secreta" 
                title="A Sua Porta Metabólica Secreta"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Main Title */}
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
              Seu Corpo Envia Sinais Que Você Nunca Decodificou… até agora.
            </h2>
            
            {/* Emotional Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
              Seu inchaço, suas oscilações de peso, sua falta de constância… nada disso é culpa sua.
            </p>
            
            {/* Authority Paragraph */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Existem 4 padrões metabólicos ocultos que explicam exatamente por que muitas mulheres travam — mesmo tentando de tudo.
              <br /><br />
              Hoje, você vai descobrir qual desses padrões o seu corpo segue… e isso pode mudar completamente sua jornada.
            </p>
          </div>

          {/* CTA Section */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              onClick={() => navigate('/quiz')} 
              className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all" 
              size="lg"
            >
              Começar minha análise gratuita →
            </Button>
            
            {/* Subtle Exclusivity Text */}
            <p className="text-center text-sm text-muted-foreground/80">
              Leva menos de 2 minutos. Resultados personalizados.
            </p>
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