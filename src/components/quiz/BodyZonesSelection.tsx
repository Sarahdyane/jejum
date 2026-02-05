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
    // POSIÇÕES REORGANIZADAS PARA EQUILÍBRIO
    const positions: Record<string, { top: string; left?: string; right?: string }> = {
      // Lado Esquerdo
      'arms': { top: '36%', left: '15%' },
      // MUDANÇA: Abdômen foi para a Esquerda
      'abs':  { top: '46%', left: '15%' }, 
      'legs': { top: '72%', left: '15%' },

      // Lado Direito
      'chest': { top: '33%', right: '15%' },
      // MUDANÇA: Glúteos subiu para ocupar o espaço abaixo do peito
      'butt':  { top: '56%', right: '15%' }, 
      
      // Central/Baixo
      'full-body': { top: '90%', right: '20%' }
    };
    return positions[zoneId] || { top: '50%', left: '50%' };
  };

  // Função auxiliar para corrigir o nome visualmente
  const getLabelText = (text: string) => {
    if (text === 'Bunda') return 'Glúteos';
    return text;
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
            const labelText = getLabelText(option.text);
            
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
                {/* Lógica para inverter a direção da seta (esquerda/direita) */}
                <div className={cn("flex items-center", position.right ? "flex-row" : "flex-row-reverse")}>
                  
                  {/* Botão (Etiqueta Flutuante) */}
                  <div 
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold border-2 cursor-pointer transition-all duration-200 whitespace-nowrap shadow-lg z-20",
                      isSelected 
                        ? "bg-[#01d3b4] text-[#050a14] border-[#01d3b4] scale-110" 
                        : "bg-white text-black border-white hover:bg-gray-100 hover:scale-105"
                    )}
                    onClick={() => handleZoneClick(option.id)}
                  >
                    {labelText}
                  </div>

                  {/* Linha da Seta */}
                  <div className={cn("w-4 sm:w-8 h-0.5 transition-colors duration-200", isSelected ? "bg-[#01d3b4]" : "bg-white")} />
                  
                  {/* Ponta da Seta (Bolinha) */}
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
          const labelText = getLabelText(option.text);

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
              {labelText}
            </button>
          );
        })}
      </div>

    </div>
  );
};
