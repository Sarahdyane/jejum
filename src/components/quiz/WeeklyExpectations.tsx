import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import nutriaLogo from '@/assets/nutria-logo.png';
interface WeeklyExpectationsProps {
  onContinue: () => void;
}
export const WeeklyExpectations = ({
  onContinue
}: WeeklyExpectationsProps) => {
  return <div className="min-h-screen bg-white flex flex-col items-center justify-between p-6">
      <div className="w-full max-w-md flex-1 flex flex-col">
        {/* Logo */}
        <div className="mb-8 mt-4">
          <img src={nutriaLogo} alt="Nutria" className="h-12" />
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-[#0d7377]" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">O plano para alcaçar seus objetivos está pronto!</h1>
            <Sparkles className="w-8 h-8 text-[#0d7377]" />
          </div>
          <p className="text-gray-700 text-lg">
            Trabalharemos juntos em direção ao seu objetivo
          </p>
        </div>

        {/* Timeline Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#0d7377] text-white px-6 py-2 rounded-full font-semibold">
            Depois de 4 semanas
          </div>
        </div>

        {/* Progress Graph */}
        <div className="flex-1 relative bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 rounded-2xl p-8 mb-6 shadow-lg">
          {/* Graph visualization */}
          <div className="relative h-80">
            {/* Starting point */}
            <motion.div 
              className="absolute bottom-8 left-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg">
                Seu peso
              </div>
              <motion.div 
                className="w-4 h-4 bg-pink-500 rounded-full mt-2 ml-8 shadow-md"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Animated curve path */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="30%" stopColor="#f59e0b" />
                  <stop offset="70%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#0d7377" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <motion.path 
                d="M 40 280 Q 120 240, 180 180 T 320 90 T 420 45" 
                fill="none" 
                stroke="url(#lineGradient)" 
                strokeWidth="4" 
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
              />
            </svg>

            {/* Intermediate points */}
            <motion.div 
              className="absolute top-40 left-36"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1 }}
            >
              <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-md ring-4 ring-yellow-100"></div>
            </motion.div>
            <motion.div 
              className="absolute top-24 left-64"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.5 }}
            >
              <div className="w-4 h-4 bg-green-400 rounded-full shadow-md ring-4 ring-green-100"></div>
            </motion.div>

            {/* End point */}
            <motion.div 
              className="absolute top-8 right-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              <motion.div 
                className="w-4 h-4 bg-[#0d7377] rounded-full mb-2 ml-16 shadow-md"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 2 }}
              />
              <div className="bg-gradient-to-r from-[#0d7377] to-[#0a5c5f] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg">
                MANTER O PESO
              </div>
            </motion.div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-gray-600 text-sm mb-6">
          Este é um cronograma preliminar baseado em suas respostas.
        </p>
      </div>

      {/* Continue Button */}
      <div className="w-full max-w-md">
        <Button onClick={onContinue} className="w-full bg-[#0d7377] hover:bg-[#0a5c5f] text-white py-6 text-lg font-semibold rounded-lg">
          Avançar
        </Button>
      </div>
    </div>;
};