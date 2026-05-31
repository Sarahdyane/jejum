import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InfoBoxProps {
  title: string;
  content: string;
  className?: string;
  icon?: string;
}

export const InfoBox = ({ title, content, className }: InfoBoxProps) => {
  const cleanTitle = title.replace(/^🔥\s*/, '').trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn("mt-6 relative overflow-hidden rounded-2xl", className)}
      style={{
        background: 'linear-gradient(135deg, rgba(1,211,180,0.07) 0%, rgba(1,211,180,0.02) 100%)',
        border: '1px solid rgba(1,211,180,0.22)',
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{ background: 'linear-gradient(90deg, hsl(174 85% 40% / 0.9), transparent)' }}
      />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg leading-none"
            style={{
              background: 'linear-gradient(135deg, #ff6b35, #ff4200)',
              boxShadow: '0 4px 14px rgba(255, 90, 0, 0.28)',
            }}
          >
            🔥
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] mb-0.5" style={{ color: 'hsl(174 85% 45%)' }}>
              Dado Científico
            </p>
            <h4 className="font-black text-foreground text-sm leading-snug">
              {cleanTitle || title}
            </h4>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-3"
          style={{ background: 'linear-gradient(to right, rgba(1,211,180,0.3), transparent)' }}
        />

        {/* Body */}
        <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>

        {/* Footer badge */}
        <div className="mt-4 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span
            className="text-[9px] font-bold uppercase tracking-widest"
            style={{ color: 'hsl(174 85% 50% / 0.65)' }}
          >
            Baseado em pesquisa metabólica
          </span>
        </div>
      </div>
    </motion.div>
  );
};
