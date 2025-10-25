export const QuizFooter = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border p-4 z-40">
      <div className="container mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          Ao continuar, você concorda com nossos{" "}
          <a href="#" className="text-primary hover:underline">
            Termos de Serviço
          </a>
          ,{" "}
          <a href="#" className="text-primary hover:underline">
            Política de Privacidade
          </a>{" "}
          e{" "}
          <a href="#" className="text-primary hover:underline">
            Política de Cookies
          </a>
        </p>
      </div>
    </footer>
  );
};