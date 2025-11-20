import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import commitmentHero from "@/assets/commitment-hero.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Commitment = () => {
  const navigate = useNavigate();
  // Quiz exclusivo para mulheres
  const gender = 'female';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={commitmentHero}
          alt="Transformação inspiradora"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center space-y-6">
          {/* Main Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Você realmente está pronta para entrar nessa jornada?
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl font-medium text-[#0d7377]">
            O melhor investimento do mundo é em você.
          </p>

          {/* Supporting Text */}
          <div className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto space-y-3 pt-4">
            <p>Você já deu o passo mais importante: decidiu mudar.</p>
            <p>Agora o Nutria vai caminhar com você.</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              onClick={() => window.location.href = 'https://www.ggcheckout.com/checkout/v2/sAxm8xS5o2d9po6HDheO'}
              size="lg"
              className="w-full sm:w-auto px-8 py-6 text-lg rounded-full bg-[#0d7377] hover:bg-[#0a5c5f] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Quero começar agora
            </Button>

            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar aos resultados
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commitment;
