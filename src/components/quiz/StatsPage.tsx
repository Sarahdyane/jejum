import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { ArrowLeft } from "lucide-react";
import nutriaLogo from "@/assets/nutria-logo.png";

interface StatsPageProps {
  onContinue: () => void;
  onBack?: () => void;
}

export const StatsPage = ({ onContinue, onBack }: StatsPageProps) => {
  const data = [
    { name: "2 numerações menores", value: 72, color: "hsl(var(--primary))" },
    { name: "3 numerações menores", value: 15, color: "hsl(var(--accent))" },
    { name: "Nenhuma mudança", value: 13, color: "hsl(var(--muted))" }
  ];

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    if (percent < 0.1) return null;

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="font-bold text-2xl"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {onBack && (
        <button
          onClick={onBack}
          className="fixed top-4 left-4 z-50 p-2 hover:bg-secondary/50 rounded-lg transition-colors"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      )}
      <div className="w-full max-w-2xl text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <img 
            src={nutriaLogo} 
            alt="Nutria" 
            className="h-12 mx-auto mb-6"
          />
          
          <p className="text-lg text-muted-foreground">
            De acordo com as estatísticas,
          </p>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            <span className="text-primary text-5xl font-extrabold">72%</span> dos usuários da Nutria<br />
            reduzem <span className="text-primary font-extrabold">2 numerações de roupa</span> em <span className="text-primary font-extrabold">3 meses</span>
          </h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full h-[400px] flex items-center justify-center"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={140}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                  formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <p className="text-sm text-muted-foreground italic max-w-lg mx-auto">
            Porcentagem de usuários da Nutria que reduziram a numeração de roupa em 3 meses. 
            Este é um cronograma preliminar baseado em suas respostas.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onClick={onContinue}
          className="w-full max-w-md mx-auto bg-primary text-primary-foreground hover:bg-primary/90 
                   py-4 px-8 rounded-lg font-semibold text-lg transition-colors"
        >
          Continuar
        </motion.button>
      </div>
    </div>
  );
};
