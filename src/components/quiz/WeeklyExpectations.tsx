import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import nutriaLogo from '@/assets/nutria-logo.png';

interface WeeklyExpectationsProps {
  onContinue: () => void;
}

export const WeeklyExpectations = ({ onContinue }: WeeklyExpectationsProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-6">
      <div className="w-full max-w-md flex-1 flex flex-col">
        {/* Logo */}
        <div className="mb-8 mt-4">
          <img src={nutriaLogo} alt="Nutria" className="h-12" />
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-[#0d7377]" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              O plano de jejum intermitente de 4 semanas está pronto!
            </h1>
            <Sparkles className="w-8 h-8 text-[#0d7377]" />
          </div>
          <p className="text-gray-700 text-lg">
            Trabalharemos juntos em direção ao seu objetivo
          </p>
        </div>

        {/* Timeline Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#0d7377] text-white px-6 py-2 rounded-full font-semibold">
            Depois de 4 semanas
          </div>
        </div>

        {/* Progress Graph */}
        <div className="flex-1 relative bg-gradient-to-b from-white via-teal-50/30 to-teal-100/40 rounded-lg p-6 mb-6">
          {/* Graph visualization */}
          <div className="relative h-64">
            {/* Starting point */}
            <div className="absolute bottom-8 left-4">
              <div className="bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                Seu peso
              </div>
              <div className="w-3 h-3 bg-pink-500 rounded-full mt-2 ml-6"></div>
            </div>

            {/* Curve path */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="50%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#0d7377" />
                </linearGradient>
              </defs>
              <path
                d="M 40 230 Q 100 200, 150 160 T 280 80 T 380 40"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            {/* Intermediate points */}
            <div className="absolute top-32 left-28">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            </div>
            <div className="absolute top-20 left-52">
              <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
            </div>

            {/* End point */}
            <div className="absolute top-8 right-4">
              <div className="w-3 h-3 bg-[#0d7377] rounded-full mb-2 ml-12"></div>
              <div className="bg-[#0d7377] text-white px-4 py-2 rounded-lg font-semibold text-sm">
                MANTER O PESO
              </div>
              <div className="absolute -right-2 top-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-[#0d7377]"></div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-gray-600 text-sm mb-6">
          Este é um cronograma preliminar baseado em suas respostas.
        </p>
      </div>

      {/* Continue Button */}
      <div className="w-full max-w-md">
        <Button
          onClick={onContinue}
          className="w-full bg-[#0d7377] hover:bg-[#0a5c5f] text-white py-6 text-lg font-semibold rounded-lg"
        >
          Avançar
        </Button>
      </div>
    </div>
  );
};
