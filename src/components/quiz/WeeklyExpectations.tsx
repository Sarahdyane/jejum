import { Check, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import nutriaLogo from '@/assets/nutria-logo.png';

interface WeeklyExpectationsProps {
  onContinue: () => void;
}

const weeklyBenefits = [
  {
    week: 1,
    title: 'Semana 1',
    description: 'Açúcar no sangue equilibrado, energia constante.',
    completed: true
  },
  {
    week: 2,
    title: 'Semana 2',
    description: 'Mais energia através de uma dieta equilibrada.',
    completed: false
  },
  {
    week: 3,
    title: 'Semana 3',
    description: 'Melhor qualidade do sono por meio de nutrientes importantes.',
    completed: false
  },
  {
    week: 4,
    title: 'Semana 4',
    description: 'Equilíbrio hormonal, melhora do humor.',
    completed: false
  },
  {
    week: 6,
    title: 'Semana 6',
    description: 'Digestão mais saudável, menos inchaço.',
    completed: false
  },
  {
    week: 8,
    title: 'Semana 8',
    description: 'Benefícios a longo prazo, riscos reduzidos à saúde.',
    completed: false
  }
];

export const WeeklyExpectations = ({ onContinue }: WeeklyExpectationsProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with Logo */}
      <div className="py-6 px-4 border-b border-gray-200">
        <div className="container mx-auto max-w-md flex justify-center">
          <img 
            src={nutriaLogo} 
            alt="Nutria" 
            className="h-10 w-auto"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between py-8 px-4">
        <div className="container mx-auto max-w-md space-y-8 animate-fade-in">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            O que você pode esperar?
          </h1>

          {/* Timeline */}
          <div className="space-y-6 relative">
            {/* Vertical line */}
            <div className="absolute left-[15px] top-8 bottom-8 w-[2px]" style={{ 
              backgroundImage: 'repeating-linear-gradient(0deg, #e5e7eb, #e5e7eb 4px, transparent 4px, transparent 8px)'
            }} />

            {weeklyBenefits.map((benefit, index) => (
              <div key={index} className="flex gap-4 relative">
                {/* Icon */}
                <div className="flex-shrink-0 relative z-10">
                  {benefit.completed ? (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d7377' }}>
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full border-2 border-gray-300" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <h3 className={`font-semibold mb-1 ${
                    benefit.completed ? 'text-teal-600' : 'text-gray-900'
                  }`}>
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="container mx-auto max-w-md pt-8">
          <Button 
            onClick={onContinue}
            className="w-full text-white text-lg py-6 rounded-lg font-semibold hover:opacity-90"
            style={{ backgroundColor: '#0d7377' }}
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};
