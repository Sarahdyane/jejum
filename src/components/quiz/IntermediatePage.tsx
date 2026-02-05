import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

// Importando a Logo da Nutria
import nutriaLogo from "@/assets/nutria-logo-dark.png";

interface IntermediatePageProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  onContinue: () => void;
  onBack?: () => void;
  bulletPoints?: string[];
  buttonText?: string;
  footerText?: string;
}

export const IntermediatePage = ({
  title,
  subtitle,
  description,
  image,
  onContinue,
  onBack,
  bulletPoints,
  buttonText = "CONTINUAR",
  footerText
}: IntermediatePageProps) => {
  return (
    <div className="min-h-screen bg-[#050a14] flex flex-col">
      
      {/* --- CABEÇALHO (TAMANHO PADRÃO FIXO) --- */}
      {/* Voltei para h-16 (mobile) e h-20 (desktop) para não ocupar muito espaço */}
      <header className="fixed top-0 left-0 right-0 h-16 md:h-20 bg-[#050a14] z-50 flex items-center justify-between px-4 md:px-8 border-b border-white/5">
        
        {/* Lado Esquerdo: Botão Voltar */}
        <div className="w-20 flex justify-start">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-2 -ml-2 text-white hover:text-[#01d3b4] transition-colors rounded-full hover:bg-white/5"
            >
              <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          )}
        </div>

        {/* Centro: Logo Nutria (OCUPANDO O MÁXIMO DO CABEÇALHO) */}
        <div className="flex-1 flex justify-center h-full items-center">
          <img 
            src={nutriaLogo} 
            alt="Nutria" 
            // h-12 no mobile (dentro de um header h-16) fica bem grande
            // h-16 no desktop (dentro de um header h-20) fica enorme
            className="h-12 md:h-16 w-auto object-contain"
          />
        </div>

        {/* Lado Direito: Espaço vazio para manter o centro alinhado */}
        <div className="w-20"></div>
      </header>

      {/* --- CONTEÚDO DA PÁGINA --- */}
      <main className="flex-grow flex items-center justify-center px-6 pt-24 pb-32 relative z-0">
        <div className="w-full max-w-md mx-auto quiz-fade-in">
          
          {/* Área de Texto Superior */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-gray-300">
                {subtitle}
            </p>
            )}
          </div>

          {/* Descrição Principal */}
          {description && (
            <p className="text-gray-300 text-center mb-8 leading-relaxed">
              {description}
            </p>
          )}

          {/* Área da Imagem */}
          {image && (
            <div className="mb-8 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-[#050a14]">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-auto object-cover block"
                />
              </div>
            </div>
          )}

          {/* Bullet Points */}
          {bulletPoints && bulletPoints.length > 0 && (
            <ul className="space-y-4 mb-8 text-left inline-block mx-auto">
              {bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#01d3b4]/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#01d3b4]" />
                  </div>
                  <span className="text-gray-300">{point}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Rodapé de Texto */}
          {footerText && (
            <p className="text-sm text-gray-400 text-center mb-8 italic">
              {footerText}
            </p>
          )}
        </div>
      </main>

      {/* Botão de Continuar Fixo na Base */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#050a14]/80 backdrop-blur-lg z-20 border-t border-white/5">
        <div className="max-w-md mx-auto">
          <Button
            onClick={onContinue}
            className="w-full bg-[#01d3b4] hover:bg-[#01b398] text-[#050a14] font-bold py-6 text-lg rounded-xl shadow-[0_0_20px_rgba(1,211,180,0.2)] hover:shadow-[0_0_30px_rgba(1,211,180,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            {buttonText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};
