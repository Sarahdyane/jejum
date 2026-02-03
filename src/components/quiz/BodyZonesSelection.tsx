import React from 'react';
import { cn } from '@/lib/utils';
import { getImageSrc } from '@/utils/imageMapping';

interface BodyZonesSelectionProps {
  gender: string;
  selectedZones: string[];
  onZoneSelect: (zone: string | string[]) => void;
  options: Array<{ id: string; text: string }>;
  bodyImage?: string;
}

export const BodyZonesSelection = ({ 
  gender, 
  selectedZones, 
  onZoneSelect, 
  options,
  bodyImage 
}: BodyZonesSelectionProps) => {
  
  const handleZoneClick = (zoneId: string) => {
    if (zoneId === 'full-body') {
      const allZones = options.filter(opt => opt.id !== 'full-body').map(opt => opt.id);
      onZoneSelect(allZones);
    } else {
      onZoneSelect(zoneId);
    }
  };
  
  const getBodyImage = () => {
    if (bodyImage) return bodyImage;
    return gender === 'male' 
      ? getImageSrc('body-zones-male-arrows')
      : getImageSrc('body-zones-female-arrows');
  };

  const getArrowPosition = (zoneId: string) => {
    // --- COORDENADAS AJUSTADAS PARA A NOVA MODELO ---
    const positions: Record<string, { top: string; left?: string; right?: string }> = {
      // Braços: Desci de 22% para 28% para não cortar no topo
      'arms': { top: '28%', left: '8%' },
      
      // Peito: Ajuste fino para alinhar melhor
      'chest': { top: '30%', right: '8%' },
      
      // Abdômen
      'abs': { top: '44%', right: '8%' },
      
      // Pernas: Subi um pouquinho de 68% para 65% para ficar mais central na coxa
      'legs': { top: '65%', left: '8%' },
      
      // Bunda/Quadril
      'butt': { top: '54%', right: '8%' },
      
      // Corpo Inteiro
      'full-body': { top: '82%', left: '50%' }
    };
    return positions[zoneId] || { top: '50%', left: '50%' };
  };

  return (
    <div className="space-y-6 -mx-4">
      <div className="flex justify-center mb-8">
        {/* Adicionei 'pt-4' (padding top) para garantir que nada encoste no teto do container */}
        <div className="relative w-[150%] sm:w-full sm:max-w-3xl max-h-[50vh] sm:max-h-none overflow-visible flex items-start justify-center pt-4">
          <img 
            src={getBodyImage()} 
            alt="Body zones" 
            className="w-full h-auto object-top"
          />
          
          {options.map((option) => {
            const position = getArrowPosition(option.id);
            const isSelected = selectedZones.includes(option.id);
            
            return (
              <div
                key={option.id}
                className="absolute flex items-center z-10"
                style={{
                  top: position.top,
                  ...(position.left ? { left: position.left } : {}),
                  ...(position.right ? { right: position.right } : {})
                }}
              >
                <div className="flex items-center">
                  {/* Linha da Seta */}
                  <div 
                    className={cn(
                      "w-12 sm:w-16 h-0.5 transition-colors duration-200",
                      isSelected ? "bg-[#01d3b4]" : "bg-white"
                    )}
                  />
                  
                  {/* Ponta da Seta */}
                  <div 
                    className={cn(
                      "w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-transparent transition-colors duration-200",
                      isSelected ? "border-b-[#01d3b4]" : "border-b-white"
                    )}
                  />
                  
                  {/* Botão/Etiqueta */}
                  <div 
                    className={cn(
                      "ml-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold border-2 cursor-pointer transition-all duration-200 whitespace-nowrap shadow-lg",
                      isSelected 
                        ? "bg-[#01d3b4] text-[#050a14] border-[#01d3b4] scale-110" 
                        : "bg-white text-black border-white hover:bg-gray-100 hover:scale-105"
                    )}
                    onClick={() => handleZoneClick(option.id)}
                  >
                    {option.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Lista de botões alternativa para Mobile (caso a imagem fique ruim em telas muito pequenas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md mx-auto md:hidden px-4">
        {options.map((option) => {
          const isSelected = selectedZones.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => handleZoneClick(option.id)}
              className={cn(
                "p-3 rounded-lg border-2 transition-all duration-200 text-center font-bold shadow-md",
                isSelected 
                  ? "bg-[#01d3b4] text-[#050a14] border-[#01d3b4]" 
                  : "bg-white text-black border-white hover:bg-gray-100"
              )}
            >
              {option.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};
