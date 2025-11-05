import React from 'react';
import { cn } from '@/lib/utils';
import { getImageSrc } from '@/utils/imageMapping';

interface BodyZonesSelectionProps {
  gender: string;
  selectedZones: string[];
  onZoneSelect: (zone: string) => void;
  options: Array<{ id: string; text: string }>;
}

export const BodyZonesSelection = ({ 
  gender, 
  selectedZones, 
  onZoneSelect, 
  options 
}: BodyZonesSelectionProps) => {
  
  const getBodyImage = () => {
    return gender === 'male' 
      ? getImageSrc('body-zones-male-arrows')
      : getImageSrc('body-zones-female-arrows');
  };

  const getArrowPosition = (zoneId: string) => {
    // Position arrows based on body parts - adjust these coordinates as needed
    const positions: Record<string, { top: string; left?: string; right?: string }> = {
      'arms': { top: '25%', left: '15%' },
      'chest': { top: '30%', right: '15%' },
      'abs': { top: '45%', right: '20%' },
      'legs': { top: '65%', left: '25%' },
      'butt': { top: '60%', right: '15%' },
      'full-body': { top: '75%', right: '25%' }
    };
    return positions[zoneId] || { top: '50%', left: '50%' };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-6">
        <div className="relative max-w-xs">
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
                className="absolute flex items-center"
                style={{
                  top: position.top,
                  ...(position.left ? { left: position.left } : {}),
                  ...(position.right ? { right: position.right } : {}),
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Arrow line */}
                <div 
                  className={cn(
                    "w-16 h-0.5 transition-colors duration-200",
                    isSelected ? "bg-green-500" : "bg-gray-400"
                  )}
                />
                
                {/* Arrow head */}
                <div 
                  className={cn(
                    "w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent transition-colors duration-200",
                    isSelected ? "border-b-green-500" : "border-b-gray-400"
                  )}
                />
                
                {/* Label */}
                <div 
                  className={cn(
                    "ml-2 px-3 py-1 rounded-full text-sm font-medium border-2 cursor-pointer transition-all duration-200 whitespace-nowrap",
                    isSelected 
                      ? "bg-green-500 text-white border-green-500 shadow-md" 
                      : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                  )}
                  onClick={() => onZoneSelect(option.id)}
                >
                  {option.text}
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