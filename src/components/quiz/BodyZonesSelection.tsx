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
    // AJUSTE FINO DE POSIÇÕES (Coordenadas mais precisas)
    const positions: Record<string, { top: string; left?: string; right?: string }> = {
      // Braços: Subi um pouco e trouxe mais para perto do corpo
      'arms': { top: '36%', left: '15%' },
      
      // Peito: Subi para ficar na linha do tórax e trouxe para perto
      'chest': { top: '33%', right: '15%' },
      
      // Abdômen: Ajustado para o centro da barriga
      'abs': { top: '46%', right: '15%' },
      
      // Bunda/Glúteos: Na altura do quadril
      'butt': { top: '56%', right: '15%' },
      
      // Pernas: Na altura da coxa
      'legs': { top: '72%', left: '15%' },
      
      // Corpo Inteiro: Próximo aos pés
      'full-body': { top: '90%', right: '20%' }
    };
    return positions[zoneId] || { top: '50%', left: '50%' };
  };

  return (
    <div className="space-y-6 -mx-4">
      
      {/* --- ÁREA DA IMAGEM COM ETIQUETAS --- */}
      <div className="flex justify-center mb-8 overflow-hidden pt-2">
        <div className="relative w-[150%] sm:w-full sm:max-w-3xl max-h-[70vh] sm:max-h-none overflow-visible flex items-start justify-center mt-0">
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
                {/* Lógica para inverter a seta dependendo do lado (Esquerda/Direita) */}
                <div className={cn("flex items-center", position.right ? "flex-row" : "flex-row-reverse")}>
                  
                  {/* Botão (Etiqueta) */}
                  <div 
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold border-2 cursor-pointer transition-all duration-200 whitespace-nowrap shadow-lg z-20",
                      isSelected ? "bg-[#01d3b4] text-[#050a14] border-[#01d3b4] scale-110" : "bg-white text-black border-white hover:bg-gray-100 hover:scale-105"
                    )}
                    onClick={() => handleZoneClick(option.id)}
                  >
                    {option.text}
                  </div>

                  {/* Linha da Seta */}
                  <div className={cn("w-4 sm:w-8 h-0.5 transition-colors duration-200", isSelected ? "bg-[#01d3b4]" : "bg-white")} />
                  
                  {/* Ponta da Seta (Triângulo) - Simplificado para um círculo pequeno para ficar mais limpo, ou mantendo a seta se preferir */}
                  <div className={cn("w-1.5 h-1.5 rounded-full", isSelected ? "bg-[#01d3b4]" : "bg-white")} />
                  
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
                  ? "bg-[#01d3b4] text-[#050a14] border-[#01d3b4]" 
                  : "bg-transparent text-white border-white/10 hover:bg-white/5 hover:border-white/30"
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
