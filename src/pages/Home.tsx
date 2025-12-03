import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import nutriaLogo from '@/assets/nutria-logo.png';
export default function Home() {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-center py-6 px-4 relative">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-primary/10 flex items-center justify-center">
            <img src={nutriaLogo} alt="Nutria" className="w-10 h-10 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Nutria</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-24">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Bem-vindo ao Nutria
            </h2>
            <p className="text-lg text-muted-foreground">Seu plano personalizado para alcançar seus objetivos</p>
          </div>

          <div className="space-y-4">
            <Button onClick={() => navigate('/quiz')} className="w-full h-14 text-lg font-semibold" size="lg">
              Começar Agora
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              Junte-se a mais de 29 milhões de usuários que transformaram suas vidas
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 text-center text-sm text-muted-foreground">
        <p>© 2025 Nutria. Todos os direitos reservados.</p>
      </footer>
    </div>;
}