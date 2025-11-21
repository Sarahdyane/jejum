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
  
  // Quiz exclusivo para mulheres
  const gender = 'female';
  
  const handleSingleAnswer = (optionId: string) => {
    onAnswer(optionId);
    setSelectedOption(optionId);
  };

  const handleMultipleAnswer = (optionId: string | string[]) => {
    // Se for um array (vindo do "Corpo inteiro"), substitui todas as respostas
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
        // Deselect all
        onAnswer([]);
      } else {
        // Select all
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

  // Get the body image (sempre feminino)
  const getBodyImage = () => {
    if (question.bodyImage) {
      return typeof question.bodyImage === 'string' && !question.bodyImage.startsWith('http') && !question.bodyImage.startsWith('/') 
        ? getImageSrc(question.bodyImage)
        : question.bodyImage;
    }
    return '';
  };

  // Get option image (sempre feminino)
  const getOptionImage = (option: any) => {
    if (option.customImage) {
      return getImageSrc(option.customImage);
    }
    if (option.image) {
      return typeof option.image === 'string' && !option.image.startsWith('http') && !option.image.startsWith('/') 
        ? getImageSrc(option.image)
        : option.image;
    }
    return '';
  };

  // Get info box for selected option
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

  return (
    <div className="w-full max-w-4xl mx-auto quiz-fade-in">
      <div className="text-center mb-12">
        {question.thematicImage && (
          <div className="mb-6 flex justify-center">
            <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white/20">
              <img 
                src={typeof question.thematicImage === 'string' && !question.thematicImage.startsWith('http') && !question.thematicImage.startsWith('/') 
                  ? getImageSrc(question.thematicImage) 
                  : question.thematicImage
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
          "grid gap-3 max-w-3xl mx-auto",
          // Special layout for body type question (ID 4) - 2x2 grid
          question.id === 4
            ? "grid-cols-2"
            : "flex flex-col"
        )}>
          {question.options?.map((option) => {
            const optionImage = getOptionImage(option);
            return (
              <QuizOption
                key={option.id}
                option={{
                  ...option,
                  image: optionImage
                }}
                isSelected={isSelected(option.id)}
                onClick={() => question.type === 'multiple' 
                  ? handleMultipleAnswer(option.id) 
                  : handleSingleAnswer(option.id)
                }
                className="min-h-[70px]"
                gender={gender}
                questionId={question.id}
              />
            );
          })}
        </div>
      )}

      {getSelectedInfoBox()}
    </div>
  );
};