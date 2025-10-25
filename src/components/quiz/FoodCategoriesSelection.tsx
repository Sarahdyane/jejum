import { Checkbox } from "@/components/ui/checkbox";
import { FoodCategory } from "@/types/quiz";

interface FoodCategoriesSelectionProps {
  categories: FoodCategory[];
  selectedFoods: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  allAnswers: Record<number | string, string | string[] | number>;
}

export const FoodCategoriesSelection = ({
  categories,
  selectedFoods,
  onSelectionChange,
  allAnswers,
}: FoodCategoriesSelectionProps) => {
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = categories
        .filter(category => !isCategoryDisabled(category))
        .flatMap(category => category.options.map(opt => opt.id));
      onSelectionChange(allIds);
    } else {
      onSelectionChange([]);
    }
  };

  const handleFoodToggle = (foodId: string) => {
    const newSelection = selectedFoods.includes(foodId)
      ? selectedFoods.filter(id => id !== foodId)
      : [...selectedFoods, foodId];
    onSelectionChange(newSelection);
  };

  const isCategoryDisabled = (category: FoodCategory) => {
    if (!category.disabledWhen) return false;
    const answer = allAnswers[category.disabledWhen.questionId];
    return answer === category.disabledWhen.value;
  };

  const allSelected = categories
    .filter(category => !isCategoryDisabled(category))
    .every(category => 
      category.options.every(opt => selectedFoods.includes(opt.id))
    );

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      {/* Select All */}
      <div className="flex items-center space-x-2 pb-4 border-b">
        <Checkbox
          id="select-all"
          checked={allSelected}
          onCheckedChange={handleSelectAll}
        />
        <label
          htmlFor="select-all"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Selecionar tudo
        </label>
      </div>

      {/* Food Categories */}
      <div className="space-y-8">
        {categories.map((category) => {
          const isDisabled = isCategoryDisabled(category);
          
          return (
            <div key={category.id} className={isDisabled ? "opacity-40 pointer-events-none" : ""}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{category.emoji}</span>
                <h3 className="font-semibold text-base">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.options.map((option) => {
                  const isSelected = selectedFoods.includes(option.id);
                  
                  return (
                    <button
                      key={option.id}
                      onClick={() => !isDisabled && handleFoodToggle(option.id)}
                      className={`
                        px-4 py-2 rounded-lg text-sm transition-colors
                        ${isSelected 
                          ? 'bg-primary/10 text-primary border border-primary' 
                          : 'bg-muted text-muted-foreground border border-transparent hover:bg-muted/80'
                        }
                      `}
                    >
                      {option.text}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
