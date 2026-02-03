import { QuizQuestion as QuizQuestionType } from "@/types/quiz";
import { QuizOption } from "./QuizOption";
import { QuizInput } from "./QuizInput";
import { InfoBox } from "./InfoBox";
import { BodyZonesSelection } from "./BodyZonesSelection";
import { FoodCategoriesSelection } from "./FoodCategoriesSelection";
import { cn } from "@/lib/utils";
import { getImageSrc } from "@/utils/imageMapping";
import { useState } from "react";

interface QuizQuestionProps {
  question: QuizQuestionType;
  answer: string | string[] | number | undefined;
  onAnswer: (answer: string | string[] | number) => void;
  answers: Record<number | string, string | string[] | number>;
}

export const QuizQuestion = ({ question, answer, onAnswer, answers }: QuizQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
   
  // Get gender from previous answers (question 2)
  const gender = answers[2] as string;
   
  const handleSingleAnswer = (optionId: string) => {
    onAnswer(optionId);
    setSelectedOption(optionId);
  };

  const handleMultipleAnswer = (optionId: string | string[]) => {
    if (Array.isArray(optionId)) {
      onAnswer(optionId);
      return;
    }
    
    const currentAnswers = Array.isArray(answer) ? answer : [];
    
    // Handle "Select All" functionality
    const option = question.options?.find(opt => opt.id === optionId);
    if (option?.isSelectAll) {
      const allOptionIds = question.options?.filter(opt => !opt.isSelectAll && opt.id !== 'none').map(opt => opt.id) || [];
      const hasAllSelected = allOptionIds.every(id => currentAnswers.includes(id));
      if (hasAllSelected) {
        onAnswer([]);
      } else {
        onAnswer(allOptionIds);
      }
      return;
    }
    
    // Handle "none" option
    if (optionId === 'none') {
      onAnswer(currentAnswers.includes('none') ? [] : ['none']);
      return;
    }
    
    // Remove "none" if selecting other options
    let newAnswers = currentAnswers.filter(id => id !== 'none');
    
    if (newAnswers.includes(optionId)) {
      newAnswers = newAnswers.filter(id => id !== optionId);
    } else {
      newAnswers = [...newAnswers, optionId];
    }
    
    onAnswer(newAnswers);
  };

  const handleInputAnswer = (value: string | number) => {
    onAnswer(value);
  };

  const isSelected = (optionId: string) => {
    if (question.type === 'multiple' || question.type === 'body-selection') {
      return Array.isArray(answer) && answer.includes(optionId);
    }
    return answer === optionId;
  };

  const isGridLayout = question.type === 'grid';

  const getBodyImage = () => {
    if (!question.requiresGender || !gender) {
      if (question.bodyImage) return question.bodyImage;
      return question.maleBodyImage ? getImageSrc(question.maleBodyImage) : '';
    }
    if (gender === 'male' && question.maleBodyImage) {
      return getImageSrc(question.maleBodyImage);
    }
    if (gender === 'female' && question.femaleBodyImage) {
      return getImageSrc(question.femaleBodyImage);
    }
    return question.bodyImage || '';
  };

  const getOptionImage = (option: any) => {
    if (option.customImage) {
      return getImageSrc(option.customImage);
    }
    if (!question.requiresGender || !gender) {
      return option.image;
    }
    if (gender === 'male' && option.maleImage) {
      return getImageSrc(option.maleImage);
    }
    if (gender === 'female' && option.femaleImage) {
      return getImageSrc(option.femaleImage);
    }
    return option.image;
  };

  const getSelectedInfoBox = () => {
    if (!question.showInfoBox) return null;
    
    const selectedOpt = question.options?.find(opt => opt.id === selectedOption || opt.id === answer);
    if (selectedOpt?.infoBox) {
      return (
        <InfoBox
          title={selectedOpt.infoBox.title}
          content={selectedOpt.infoBox.content}
        />
      );
    }
    
    if (question.infoBoxContent) {
      return (
        <InfoBox
          title={question.infoBoxContent.title}
          content={question.infoBoxContent.content}
          icon="🔥"
        />
      );
    }
    
    return null;
  };

  const hasImages = question.options?.some(opt => 
    opt.image || opt.maleImage || opt.femaleImage || opt.customImage
  );

  return (
    <div className="w-full max-w-4xl mx-auto quiz-fade-in">
      <div className="text-center mb-12">
        {(question.thematicImage || (question.requiresGender && gender && (question.maleImage || question.femaleImage))) && (
          <div className="mb-6 flex justify-center">
            <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white/20">
              <img 
                src={question.requiresGender && gender ? 
                  (gender === 'male' && question.maleImage ? getImageSrc(question.maleImage) : 
                   gender === 'female' && question.femaleImage ? getImageSrc(question.femaleImage) : 
                   question.thematicImage ? getImageSrc(question.thematicImage) : question.thematicImage) : 
                  question.thematicImage ? getImageSrc(question.thematicImage) : question.thematicImage
                } 
                alt={question.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        )}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {question.title}
        </h1>
        {question.subtitle && (
          <p className="text-muted-foreground text-lg">
            {question.subtitle}
          </p>
        )}
      </div>

      {question.type === 'input' ? (
        <div className="max-w-md mx-auto">
          <QuizInput
            type={question.inputType || 'text'}
            placeholder={question.inputPlaceholder}
            suffix={question.inputSuffix}
            value={answer || ''}
            onChange={handleInputAnswer}
          />
        </div>
      ) : question.type === 'body-selection' ? (
        <BodyZonesSelection
          gender={gender}
          selectedZones={Array.isArray(answer) ? answer : []}
          onZoneSelect={handleMultipleAnswer}
          options={question.options || []}
          bodyImage={getBodyImage()}
        />
      ) : question.type === 'food-categories' ? (
        <FoodCategoriesSelection
          categories={question.foodCategories || []}
          selectedFoods={Array.isArray(answer) ? answer : []}
          onSelectionChange={onAnswer}
          allAnswers={answers}
        />
      ) : (
        <div className={cn(
          "grid gap-4 max-w-3xl mx-auto",
          isGridLayout
            ? "grid-cols-2"
            : hasImages
            ? "grid-cols-2" // Força 2 colunas para imagens
            : question.id === 1 
            ? "grid-cols-2 md:grid-cols-4" 
            : question.id === 2 
            ? "grid-cols-2" 
            : question.id === 4
            ? "grid-cols-2"
            : question.options && question.options.length <= 4 
            ? "grid-cols-1 md:grid-cols-2" 
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        )}>
          {question.options?.map((option, index) => {
            const optionImage = getOptionImage(option);
            const isLastOdd = (isGridLayout || hasImages) && question.options && 
              question.options.length % 2 !== 0 && 
              index === question.options.length - 1;
            
            const isSelectedOption = isSelected(option.id);
            
            return (
              <div
                key={option.id}
                onClick={() => question.type === 'multiple' 
                  ? handleMultipleAnswer(option.id) 
                  : handleSingleAnswer(option.id)
                }
                className={cn(
                  "cursor-pointer rounded-2xl border-2 transition-all duration-200 overflow-hidden relative group flex flex-col",
                  // MUDANÇA: Layout flex vertical para separar imagem do texto
                  optionImage ? "aspect-[3/5]" : "min-h-[60px]",
                  isLastOdd && "col-span-2",
                  isSelectedOption
                    ? "border-[#01d3b4] bg-[#01d3b4]/5 shadow-[0_0_20px_rgba(1,211,180,0.2)]" 
                    : "border-white/10 hover:border-white/30 hover:bg-white/5"
                )}
              >
                {optionImage ? (
                  <>
                    {/* Imagem ocupa o espaço disponível no topo */}
                    <div className="relative flex-grow overflow-hidden">
                        <img 
                            src={optionImage} 
                            alt={option.text}
                            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Gradiente sutil apenas para profundidade */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50" />
                    </div>
                    
                    {/* Texto numa barra DEDICADA embaixo da imagem */}
                    <div className={cn(
                        "p-3 text-center flex items-center justify-center min-h-[50px] bg-[#0a0f1d] border-t border-white/5",
                        isSelectedOption ? "bg-[#01d3b4]/10" : ""
                    )}>
                      <span className={cn(
                        // MUDANÇA: text-xs no mobile para evitar quebras feias
                        "font-bold text-xs md:text-sm leading-tight block w-full whitespace-normal",
                        isSelectedOption ? "text-[#01d3b4]" : "text-white"
                      )}>
                        {option.text}
                      </span>
                    </div>
                    
                    {/* Check de seleção no topo (Opcional, mas ajuda visualmente) */}
                    {isSelectedOption && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-[#01d3b4] rounded-full flex items-center justify-center shadow-lg z-10">
                            <svg className="w-3 h-3 text-[#050a14]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    )}
                  </>
                ) : (
                  // Layout padrão (sem imagem)
                  <QuizOption
                    option={option}
                    isSelected={isSelectedOption}
                    gender={gender}
                    questionId={question.id}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {getSelectedInfoBox()}
    </div>
  );
};
