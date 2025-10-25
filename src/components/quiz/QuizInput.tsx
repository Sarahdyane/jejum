import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QuizInputProps {
  type: "text" | "number";
  placeholder?: string;
  suffix?: string;
  value: string | number | string[];
  onChange: (value: string | number) => void;
  className?: string;
}

export const QuizInput = ({ 
  type, 
  placeholder, 
  suffix, 
  value, 
  onChange, 
  className 
}: QuizInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    if (type === "number") {
      const numValue = parseFloat(inputValue);
      onChange(isNaN(numValue) ? 0 : numValue);
    } else {
      onChange(inputValue);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="relative">
        <Input
          type={type}
          placeholder={placeholder}
          value={Array.isArray(value) ? '' : value}
          onChange={handleChange}
          className="text-lg py-6 pr-16"
        />
        {suffix && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground font-medium">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
};