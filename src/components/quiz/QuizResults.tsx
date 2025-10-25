import { UserProfile } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Target, Clock, Utensils, Activity } from "lucide-react";

interface QuizResultsProps {
  profile: UserProfile;
  onRestart: () => void;
}

export const QuizResults = ({ profile, onRestart }: QuizResultsProps) => {
  const getFastingPlan = () => {
    if (profile.fastingKnowledge === 'never') {
      return '12:12 - Iniciante';
    } else if (profile.fastingKnowledge === 'heard') {
      return '14:10 - Intermediário';
    } else {
      return '16:8 - Avançado';
    }
  };

  const getGoalDescription = () => {
    switch (profile.goal) {
      case 'lose-weight':
        return 'Perda de peso através de jejum intermitente';
      case 'get-fit':
        return 'Melhora da forma física e saúde geral';
      case 'gain-weight':
        return 'Ganho de peso saudável e massa muscular';
      default:
        return 'Plano personalizado de saúde';
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 quiz-fade-in">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Seu Plano Personalizado Está Pronto!
            </h1>
            <p className="text-lg text-muted-foreground">
              Baseado nas suas respostas, criamos um plano de jejum intermitente ideal para você.
            </p>
          </div>

          {/* Profile Summary */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="quiz-slide-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-primary" />
                  <span>Seu Perfil</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Objetivo:</span>
                  <Badge variant="secondary">{getGoalDescription()}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Idade:</span>
                  <span className="font-medium">{profile.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tipo de corpo:</span>
                  <span className="font-medium">{profile.bodyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Peso atual:</span>
                  <span className="font-medium">{profile.currentWeight} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Peso desejado:</span>
                  <span className="font-medium">{profile.targetWeight} kg</span>
                </div>
              </CardContent>
            </Card>

            <Card className="quiz-slide-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Plano de Jejum</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {getFastingPlan()}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Plano recomendado para você
                  </p>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Refeições por dia:</span>
                  <span className="font-medium">{profile.mealsPerDay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tipo de dieta:</span>
                  <span className="font-medium">{profile.dietType}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="quiz-slide-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Utensils className="w-5 h-5 text-primary" />
                  <span>Recomendações Alimentares</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-3">
                    Baseado nas suas preferências alimentares:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {profile.likedFoods.slice(0, 6).map((food, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {food}
                      </Badge>
                    ))}
                    {profile.likedFoods.length > 6 && (
                      <Badge variant="outline" className="text-xs">
                        +{profile.likedFoods.length - 6} mais
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="quiz-slide-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <span>Atividade Física</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nível de atividade:</span>
                  <span className="font-medium">{profile.dailyActivity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Caminhadas:</span>
                  <span className="font-medium">{profile.walkingFrequency}</span>
                </div>
                {profile.targetZones.length > 0 && (
                  <div>
                    <span className="text-muted-foreground">Zonas-alvo:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile.targetZones.map((zone, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {zone}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center quiz-fade-in">
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">
                  Pronto para começar sua jornada?
                </h3>
                <p className="text-muted-foreground">
                  Comece seu plano personalizado de jejum intermitente hoje mesmo e alcance seus objetivos de saúde e bem-estar.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" className="quiz-gradient hover:opacity-90">
                    Começar Plano Premium
                  </Button>
                  <Button size="lg" variant="outline" onClick={onRestart}>
                    Refazer Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};