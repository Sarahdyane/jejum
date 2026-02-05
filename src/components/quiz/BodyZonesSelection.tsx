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
    const positions: Record<string, { top: string; left?: string; right?: string }> = {
      'arms': { top: '45%', left: '5%' },
      'chest': { top: '42%', right: '5%' },
      'abs': { top: '55%', right: '5%' },
      'butt': { top: '62%', right: '5%' },
      'legs': { top: '78%', left: '5%' },
      'full-body': { top: '92%', left: '50%' }
    };
    return positions[zoneId] || { top: '50%', left: '50%' };
  };

  return (
    <div className="space-y-6 -mx-4">
      
      {/* --- ÁREA DA IMAGEM COM ETIQUETAS --- */}
      <div className="flex justify-center mb-8 overflow-hidden pt-2">
        <div className="relative w-[150%] sm:w-full sm:max-w-3xl max-h-[60vh] sm:max-h-none overflow-visible flex items-start justify-center -mt-10">
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
                // CORREÇÃO AQUI: Removi 'hidden md:flex' e deixei apenas 'absolute flex'
                // Isso garante que as setas apareçam no celular também
                className="absolute flex items-center z-10" 
                style={{
                  top: position.top,
                  ...(position.left ? { left: position.left } : {}),
                  ...(position.right ? { right: position.right } : {})
                }}
              >
                <div className="flex items-center">
                  <div className={cn("w-8 sm:w-16 h-0.5 transition-colors duration-200", isSelected ? "bg-[#01d3b4]" : "bg-white")} />
                  <div className={cn("w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-transparent transition-colors duration-200", isSelected ? "border-b-[#01d3b4]" : "border-b-white")} />
                  <div 
                    className={cn(
                      "ml-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold border-2 cursor-pointer transition-all duration-200 whitespace-nowrap shadow-lg",
                      // MANTIDO BRANCO (para contraste com a imagem)
                      isSelected ? "bg-[#01d3b4] text-[#050a14] border-[#01d3b4] scale-110" : "bg-white text-black border-white hover:bg-gray-100 hover:scale-105"
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
      
      {/* --- LISTA DE BOTÕES INFERIOR (Mobile) --- */}
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto md:hidden px-4 pb-8">
        {options.map((option) => {
          const isSelected = selectedZones.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => handleZoneClick(option.id)}
              className={cn(
                "p-4 rounded-xl border-2 transition-all duration-200 text-center font-bold shadow-md text-sm",
                isSelected 
                  ? "bg-[#01d3b4] text-[#050a14] border-[#01d3b4]" // Selecionado
                  : "bg-transparent text-white border-white/10 hover:bg-white/5 hover:border-white/30" // CORRIGIDO: Dark Theme (Transparente/Branco)
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
