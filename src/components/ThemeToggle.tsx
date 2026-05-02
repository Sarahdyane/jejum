import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const html = document.documentElement;
    const newDark = !isDark;
    html.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
    setIsDark(newDark);
  };

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      className={cn(
        "relative flex items-center w-14 h-7 rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring flex-shrink-0",
        isDark
          ? "bg-primary/20 border-primary/40"
          : "bg-secondary border-border",
        className
      )}
    >
      <div
        className={cn(
          "absolute flex items-center justify-center w-5 h-5 rounded-full shadow-sm transition-all duration-300",
          isDark
            ? "translate-x-[34px] bg-primary text-primary-foreground"
            : "translate-x-[3px] bg-foreground text-background"
        )}
      >
        {isDark ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
      </div>
    </button>
  );
};
