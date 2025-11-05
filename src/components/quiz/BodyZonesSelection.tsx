import React from 'react';
import { cn } from '@/lib/utils';
import { getImageSrc } from '@/utils/imageMapping';

interface BodyZonesSelectionProps {
  gender: string;
  selectedZones: string[];
  onZoneSelect: (zone: string) => void;
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
  
  const getBodyImage = () => {
    if (bodyImage) return bodyImage;
    return gender === 'male' 
      ? getImageSrc('body-zones-male-arrows')
      : getImageSrc('body-zones-female-arrows');
  };

  const getArrowPosition = (zoneId: string) => {
    // Position arrows based on body parts - optimized for better visibility
    const positions: Record<string, { top: string; left?: string; right?: string }> = {
      'arms': { top: '22%', left: '8%' },
      'chest': { top: '28%', right: '8%' },
      'abs': { top: '42%', right: '8%' },
      'legs': { top: '68%', left: '8%' },
      'butt': { top: '52%', right: '8%' },
      'full-body': { top: '82%', left: '50%' }
    };
    return positions[zoneId] || { top: '50%', left: '50%' };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-xl px-4">
          <img 
            src={getBodyImage()} 
            alt="Body zones" 
            className="w-full h-auto"
          />
          
          {/* Arrows pointing to body parts */}
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
                  {/* Arrow line */}
                  <div 
                    className={cn(
                      "w-12 sm:w-16 h-0.5 transition-colors duration-200",
                      isSelected ? "bg-primary" : "bg-muted-foreground/60"
                    )}
                  />
                  
                  {/* Arrow head */}
                  <div 
                    className={cn(
                      "w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-transparent transition-colors duration-200",
                      isSelected ? "border-b-primary" : "border-b-muted-foreground/60"
                    )}
                  />
                  
                  {/* Label */}
                  <div 
                    className={cn(
                      "ml-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold border-2 cursor-pointer transition-all duration-200 whitespace-nowrap shadow-lg",
                      isSelected 
                        ? "bg-primary text-primary-foreground border-primary scale-105" 
                        : "bg-card text-foreground border-border hover:border-primary hover:scale-105"
                    )}
                    onClick={() => onZoneSelect(option.id)}
                  >
                    {option.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Alternative button list for easier selection on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md mx-auto md:hidden">
        {options.map((option) => {
          const isSelected = selectedZones.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => onZoneSelect(option.id)}
              className={cn(
                "p-3 rounded-lg border-2 transition-all duration-200 text-center font-medium",
                isSelected 
                  ? "bg-green-500 text-white border-green-500" 
                  : "bg-card text-foreground border-border hover:border-primary"
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