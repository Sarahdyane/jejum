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
    // --- COORDENADAS REAJUSTADAS (V4 - DESCENDO AS OPÇÕES) ---
    // Aumentei bastante o 'top' (%) para tirar os botões da borda superior
    const positions: Record<string, { top: string; left?: string; right?: string }> = {
      // Braços: 45% (Agora fica no meio do braço, bem longe do topo cortado)
      'arms': { top: '45%', left: '5%' },
      
      // Peito: 42% (Alinhado com o braço)
      'chest': { top: '42%', right: '5%' },
      
      // Abdômen: 55% (Bem no centro)
      'abs': { top: '55%', right: '5%' },
      
      // Bunda/Quadril: 62%
      'butt': { top: '62%', right: '5%' },

      // Pernas: 78% (Coxa)
      'legs': { top: '78%', left: '5%' },
      
      // Corpo Inteiro: 92% (Pés)
      'full-body': { top: '92%', left: '50%' }
    };
    return positions[zoneId] || { top: '50%', left: '50%' };
  };

  return (
    <div className="space-y-6 -mx-4">
      <div className="flex justify-center mb-8">
        {/* Mantive o container normal, sem margem negativa, para a imagem ficar no lugar dela */}
        <div className="relative w-[150%] sm:w-full sm:max-w-3xl max-h-[50vh] sm:max-h-none overflow-visible flex items-start justify-center">
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
                      "w-8 sm:w-16 h-0.5 transition-colors duration-200",
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
                  
                  {/* Etiqueta / Botão */}
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
      
      {/* Lista Mobile (Backup) */}
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
