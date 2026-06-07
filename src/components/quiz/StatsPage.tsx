import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import nutriaLogo from "@/assets/nutria-logo.png";

interface StatsPageProps {
  onContinue: () => void;
  onBack?: () => void;
}

export const StatsPage = ({ onContinue, onBack }: StatsPageProps) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const data = [
    { name: "2 numerações menores", value: 72, color: "hsl(var(--primary))" },
    { name: "3 numerações menores", value: 15, color: "hsl(var(--accent))" },
    { name: "Nenhuma mudança", value: 13, color: "#ef4444" }
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
            reduzem <span className="text-primary font-extrabold">2 numerações de roupa</span> em <span className="text-primary font-extrabold">1 mês</span>
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
            Porcentagem de usuários da Nutria que reduziram a numeração de roupa em 1 mês. 
            Este é um cronograma preliminar baseado em suas respostas.
          </p>
        </motion.div>

        {/* Activity Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center"
        >
          <div className="ns-card text-left">
            <div className="ns-header">
              <span className="ns-title">Queima Diária</span>
              <button className="ns-full-stats-btn">Ver tudo</button>
            </div>

            <div>
              <span className="ns-range-value">1.230</span>
              <span className="ns-range-unit">kcal</span>
            </div>
            <div className="ns-date-range">Meta Nutria · Semana atual</div>

            <div className="ns-chart-container">
              <div className="ns-avg-line">
                <span className="ns-avg-label">Média</span>
              </div>
              <div className="ns-chart">
                {[
                  { label: 'Seg', height: 32 },
                  { label: 'Ter', height: 44 },
                  { label: 'Qua', height: 25 },
                  { label: 'Qui', height: 32 },
                  { label: 'Sex', height: 44 },
                  { label: 'Sáb', height: 38 },
                  { label: 'Dom', height: 28 },
                ].map((day) => (
                  <div key={day.label} className="ns-bar-wrapper">
                    <div className="ns-bar-container">
                      <div className="ns-bar" style={{ height: day.height }}>
                        <span className="ns-dot ns-dot-top" />
                        <span className="ns-dot ns-dot-bottom" />
                      </div>
                    </div>
                    <span className="ns-day-label">{day.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ns-readings">
              {[
                { time: '07:30 AM', value: '280 kcal' },
                { time: '12:00 PM', value: '430 kcal' },
                { time: '15:30 PM', value: '160 kcal' },
                { time: '19:00 PM', value: '360 kcal' },
              ].map((r) => (
                <div key={r.time} className="ns-reading">
                  <span className="ns-reading-time">{r.time}</span>
                  <span className="ns-reading-value">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
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
