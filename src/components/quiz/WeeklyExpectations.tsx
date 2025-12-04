import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import nutriaLogo from '@/assets/nutria-logo.png';
interface WeeklyExpectationsProps {
  onContinue: () => void;
}
export const WeeklyExpectations = ({
  onContinue
}: WeeklyExpectationsProps) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return <div className="min-h-screen bg-background flex flex-col items-center justify-between p-6">
      <div className="w-full max-w-md flex-1 flex flex-col">
        {/* Logo */}
        <div className="mb-8 mt-4">
          <img src={nutriaLogo} alt="Nutria" className="h-12" />
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">O plano para alcaçar seus objetivos está pronto!</h1>
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <p className="text-muted-foreground text-lg">
            Trabalharemos juntos em direção ao seu objetivo
          </p>
        </div>

        {/* Timeline Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold">
            Depois de 4 semanas
          </div>
        </div>

        {/* Progress Graph */}
        <div className="flex-1 relative bg-gradient-to-br from-secondary via-card to-muted rounded-3xl p-6 md:p-10 mb-6 shadow-2xl backdrop-blur-sm border border-border">
          {/* Graph visualization */}
          <div className="relative h-80 md:h-96">
            {/* Y-Axis Labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground pr-2">
              <span>Meta</span>
              <span className="text-center">Progresso</span>
              <span>Início</span>
            </div>

            {/* Animated curve path */}
            <svg className="absolute inset-0 w-full h-full pl-8" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid meet">
              <defs>
                {/* Enhanced gradient for the line */}
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fb7185" />
                  <stop offset="25%" stopColor="#f97316" />
                  <stop offset="50%" stopColor="#fbbf24" />
                  <stop offset="75%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#0d7377" />
                </linearGradient>
                
                {/* Glow effect */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                {/* Shadow for markers */}
                <filter id="markerShadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                  <feOffset dx="0" dy="2" result="offsetblur"/>
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3"/>
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Smooth bezier curve path */}
              <motion.path 
                d="M 30 280 C 80 260, 100 220, 120 180 S 160 120, 200 90 S 260 55, 300 40 S 350 28, 370 25" 
                fill="none" 
                stroke="url(#lineGradient)" 
                strokeWidth="5" 
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
              />

              {/* Animated marker points */}
              {/* Point 1 - Start */}
              <motion.circle
                cx="30"
                cy="280"
                r="8"
                fill="#fb7185"
                filter="url(#markerShadow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              />
              <motion.circle
                cx="30"
                cy="280"
                r="14"
                fill="none"
                stroke="#fb7185"
                strokeWidth="2"
                opacity="0.3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              />

              {/* Point 2 */}
              <motion.circle
                cx="120"
                cy="180"
                r="7"
                fill="#f97316"
                filter="url(#markerShadow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.2 }}
              />
              <motion.circle
                cx="120"
                cy="180"
                r="12"
                fill="none"
                stroke="#f97316"
                strokeWidth="2"
                opacity="0.3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              />

              {/* Point 3 */}
              <motion.circle
                cx="200"
                cy="90"
                r="7"
                fill="#fbbf24"
                filter="url(#markerShadow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.7 }}
              />
              <motion.circle
                cx="200"
                cy="90"
                r="12"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2"
                opacity="0.3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.7 }}
              />

              {/* Point 4 */}
              <motion.circle
                cx="300"
                cy="40"
                r="7"
                fill="#34d399"
                filter="url(#markerShadow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 2.2 }}
              />
              <motion.circle
                cx="300"
                cy="40"
                r="12"
                fill="none"
                stroke="#34d399"
                strokeWidth="2"
                opacity="0.3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 2.2 }}
              />

              {/* Point 5 - End */}
              <motion.circle
                cx="370"
                cy="25"
                r="8"
                fill="#0d7377"
                filter="url(#markerShadow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 2.7 }}
              />
              <motion.circle
                cx="370"
                cy="25"
                r="14"
                fill="none"
                stroke="#0d7377"
                strokeWidth="2"
                opacity="0.3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 2.7 }}
              />
              <motion.circle
                cx="370"
                cy="25"
                r="8"
                fill="#0d7377"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 3 }}
              />
            </svg>

            {/* Starting Label */}
            <motion.div 
              className="absolute bottom-2 left-10 md:left-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 md:px-5 md:py-3 rounded-2xl font-bold text-xs md:text-sm shadow-xl backdrop-blur-sm border border-white/20">
                Agora
              </div>
            </motion.div>

            {/* Week 2 Label */}
            <motion.div 
              className="absolute top-32 left-28 md:left-32"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              <div className="bg-card/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-xl font-semibold text-[10px] md:text-xs text-foreground shadow-lg border border-border">
                Semana 2
              </div>
            </motion.div>

            {/* Week 4 Label */}
            <motion.div 
              className="absolute top-6 right-4 md:right-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.8 }}
            >
              <div className="bg-gradient-to-r from-[#0d7377] to-[#0a5c5f] text-white px-4 py-2 md:px-5 md:py-3 rounded-2xl font-bold text-xs md:text-sm shadow-xl backdrop-blur-sm border border-white/20">
                Meta alcançada!
              </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-[#0d7377]/10 to-purple-500/10 rounded-full blur-xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-24 left-32 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-full blur-xl"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-muted-foreground text-sm mb-6">
          Este é um cronograma preliminar baseado em suas respostas.
        </p>
      </div>

      {/* Continue Button */}
      <div className="w-full max-w-md">
        <Button onClick={onContinue} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold rounded-lg">
          Avançar
        </Button>
      </div>
    </div>;
};