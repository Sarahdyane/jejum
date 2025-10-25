import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InfoBoxProps {
  title: string;
  content: string;
  className?: string;
  icon?: string;
}

export const InfoBox = ({ title, content, className, icon = "☝️" }: InfoBoxProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "bg-accent/20 border border-accent/30 rounded-lg p-4 mt-6",
        "backdrop-blur-sm shadow-sm",
        className
      )}
    >
      <div className="space-y-2">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <span>{icon}</span>
          {title}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {content}
        </p>
      </div>
    </motion.div>
  );
};