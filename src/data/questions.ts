import { QuizQuestion } from "@/types/quiz";

export const questions: QuizQuestion[] = [
  {
    id: "splash-screen",
    title: "",
    subtitle: "",
    type: "intermediate",
    image: "nutria-logo"
  },
  {
    id: 1,
    title: "",
    type: "single",
    showTitle: "CONSTRUA SEU CORPO PERFEITO",
    showSubtitle: "Com base na sua idade",
    showFooter: true,
    options: [
      { id: "18-29", text: "18–29", customImage: "age-couple-1" },
      { id: "30-39", text: "30–39", customImage: "age-couple-2" },
      { id: "40-49", text: "40–49", customImage: "age-couple-3" },
      { id: "50+", text: "50+", customImage: "age-couple-4" }
    ]
  },
  {
    id: 2,
    title: "Qual o seu gênero?",
    type: "single",
    showInfoBox: true,
    options: [
      { 
        id: "male", 
        text: "Masculino", 
        image: "/images/gender-male-professional.jpg",
        infoBox: {
          title: "Você sabia?",
          content: "Os homens tendem a responder bem ao jejum 16:8: ele ajuda a otimizar a testosterona e a queima de gordura."
        }
      },
      { 
        id: "female", 
        text: "Feminino", 
        image: "/images/gender-female-professional.jpg",
        infoBox: {
          title: "Você sabia?",
          content: "As mulheres geralmente se beneficiam de janelas de jejum mais suaves, como o jejum das 14h10, especialmente nas primeiras semanas."
        }
      }
    ]
  },
  {
    id: 3,
    title: "Qual é o seu objetivo?",
    type: "single",
    options: [
      { id: "lose-weight", text: "Perder peso", icon: "TrendingDown" },
      { id: "get-fit", text: "Ficar em forma", icon: "Dumbbell" },
      { id: "gain-weight", text: "Ganhar peso", icon: "TrendingUp" }
    ]
  },
  {
    id: "intermediate-2",
    title: "Um plano personalizado é a chave para o seu sucesso!",
    subtitle: "Para as mulheres, uma abordagem individualizada é essencial para resultados duradouros.",
    description: "Se você deseja uma aparência em forma, energia duradoura e um corpo saudável, um plano personalizado é o ponto de partida ideal que se adapta ao seu estilo de vida.",
    type: "intermediate",
    requiresGender: true,
    maleImage: "fitness-male",
    femaleImage: "fitness-female"
  },
  {
    id: 4,
    title: "Como você descreveria seu físico?",
    type: "single",
    requiresGender: true,
    options: [
      { 
        id: "thin", 
        text: "Magra",
        maleText: "Magro",
        maleImage: "body-thin-male-shorts", 
        femaleImage: "body-thin-female-real" 
      },
      { 
        id: "average", 
        text: "Média",
        maleText: "Médio",
        maleImage: "body-fuller-male-shorts", 
        femaleImage: "body-fuller-female-real" 
      },
      { 
        id: "fuller", 
        text: "Gordinha", 
        maleText: "Gordinho",
        maleImage: "body-overweight-male-shorts", 
        femaleImage: "body-fuller-female-professional" 
      },
      { 
        id: "overweight", 
        text: "Sobrepeso", 
        maleImage: "body-obese-male-shorts", 
        femaleImage: "body-overweight-female-real" 
      }
    ]
  },
  {
    id: 5,
    title: "Escolha o corpo que você deseja",
    type: "single",
    requiresGender: true,
    showInfoBox: true,
    infoBoxContent: {
      title: "🔥 Fato sobre queima de gordura",
      content: "O jejum intermitente ajuda o corpo a queimar gordura armazenada para obter energia após apenas 12 horas de jejum, tornando a perda de peso mais eficaz."
    },
    options: [
      { 
        id: "slim", 
        text: "Corpo esbelto", 
        maleImage: "goal-slim-male", 
        femaleImage: "goal-slim-female" 
      },
      { 
        id: "athlete", 
        text: "Corpo esbelto e musculoso", 
        maleImage: "goal-athlete-male", 
        femaleImage: "goal-athlete-female" 
      }
    ]
  },
  {
    id: 6,
    title: "Selecione suas zonas-alvo",
    subtitle: "Você pode escolher várias opções",
    type: "body-selection",
    requiresGender: true,
    bodyImage: "/images/body-zones.png",
    maleBodyImage: "body-zones-male-mascot",
    femaleBodyImage: "body-zones-female-mascot",
    bodyZones: ["arms", "chest", "abs", "legs", "butt", "full-body"],
    options: [
      { id: "arms", text: "Braços" },
      { id: "chest", text: "Peito" },
      { id: "abs", text: "Abdômen" },
      { id: "legs", text: "Pernas" },
      { id: "butt", text: "Bunda" },
      { id: "full-body", text: "Corpo inteiro" }
    ]
  },
  {
    id: 7,
    title: "Há quanto tempo você não está na melhor forma da sua vida?",
    type: "single",
    requiresGender: true,
    maleImage: "fitness-thinking",
    femaleImage: "fitness-female",
    showInfoBox: true,
    options: [
      { 
        id: "now", 
        text: "Agora mesmo",
        infoBox: {
          title: "🔥 Continue assim!",
          content: "Manter os resultados é tão importante quanto conquistá-los. Vamos ajudá-lo a manter seus hábitos saudáveis."
        }
      },
      { 
        id: "1-2-years", 
        text: "1–2 anos atrás",
        infoBox: {
          title: "⚡ Ótimo momento!",
          content: "Seu corpo ainda se lembra dos hábitos saudáveis. Vamos reativar rapidamente seu metabolismo."
        }
      },
      { 
        id: "3-5-years", 
        text: "3–5 anos atrás",
        infoBox: {
          title: "🎯 Vamos retomar!",
          content: "É normal que o metabolismo desacelere com o tempo. Vamos reativá-lo naturalmente e aumentar sua energia."
        }
      },
      { 
        id: "5-plus-years", 
        text: "Mais de 5 anos atrás",
        infoBox: {
          title: "💪 Seu corpo lembra!",
          content: "Mesmo que já tenha passado um tempo, seu corpo ainda se lembra de como funcionar de forma eficiente."
        }
      },
      { 
        id: "never", 
        text: "Nunca me senti realmente em forma",
        infoBox: {
          title: "🌟 Hora da transformação!",
          content: "Esta é sua oportunidade! Uma transformação corporal duradoura começa agora."
        }
      }
    ]
  },
  {
    id: "nutrition-info",
    title: "81% dos seus resultados dependem da nutrição",
    subtitle: "Para alcançar evolução mais rápida no corpo, o equilíbrio alimentar é essencial.",
    type: "intermediate",
    requiresGender: true,
    femaleImage: "nutrition-info-female",
    maleImage: "fitness-male",
    bulletPoints: [
      "Calorias adequadas para o seu objetivo",
      "Macros distribuídos corretamente (proteínas, carbo e gorduras)",
      "Refeições estratégicas para energia e recuperação"
    ],
    buttonText: "Entendi",
    footerText: "Só mais algumas perguntas e seu plano estará tomando forma."
  },
  {
    id: "lipedema-info",
    title: "Você sabia sobre o Lipedema?",
    subtitle: "Uma condição que afeta milhões de mulheres",
    description: "O lipedema é uma condição crônica que causa acúmulo desproporcional de gordura, principalmente nas pernas e braços.\n\n✨ Características principais:\n• Afeta principalmente mulheres\n• Pode causar dor e sensibilidade\n• Dieta balanceada pode ajudar no controle\n• Não é resultado de má alimentação",
    type: "intermediate",
    image: "lipedema-info"
  },
  {
    id: 8,
    title: "Você sofre ou suspeita ter lipedema?",
    type: "single",
    options: [
      { id: "yes-diagnosed", text: "Sim, tenho diagnóstico", icon: "CheckCircle" },
      { id: "suspect", text: "Suspeito que tenho", icon: "AlertCircle" },
      { id: "no", text: "Não", icon: "X" },
      { id: "dont-know", text: "Não sei o que é", icon: "HelpCircle" }
    ]
  },
  {
    id: "motivation-change-habits",
    title: "Você sempre pode mudar os seus hábitos para melhor",
    subtitle: "Grandes mudanças na vida costumam afetar no peso. É normal. Nós iremos ajudar você a alcançar o seu objetivo.",
    type: "intermediate",
    requiresGender: true,
    femaleImage: "motivation-change-habits",
    maleImage: "motivation-change-habits-male"
  },
  {
    id: 13,
    title: "Quantas refeições por dia você gostaria de fazer?",
    type: "single",
    options: [
      { id: "2-meals", text: "2 refeições por dia 🥗🥙", icon: "UtensilsCrossed" },
      { id: "3-meals", text: "3 refeições por dia 🍳🥗🥙", icon: "UtensilsCrossed" },
      { id: "4-meals", text: "4 refeições por dia 🍳🍽️🥗🥙", icon: "UtensilsCrossed" },
      { id: "5-meals", text: "5 refeições por dia 🍳🍳🍽️🥗🥙", icon: "UtensilsCrossed" }
    ]
  },
  {
    id: 14,
    title: "Qual tipo de dieta você prefere?",
    type: "single",
    options: [
      { id: "traditional", text: "Tradicional", icon: "Utensils" },
      { id: "vegetarian", text: "Vegetariana", icon: "Leaf" },
      { id: "lactose-free", text: "Sem lactose", icon: "MilkOff" },
      { id: "gluten-free", text: "Sem glúten", icon: "WheatOff" }
    ]
  },
  {
    id: 15,
    title: "Escolha os produtos que você gosta",
    subtitle: "Selecione todas as opções que você gosta",
    type: "food-categories",
    foodCategories: [
      {
        id: "vegetables",
        emoji: "🥬",
        title: "Vegetais",
        options: [
          { id: "tomato", text: "Tomate" },
          { id: "cucumber", text: "Pepino" },
          { id: "bell-pepper", text: "Páprica" },
          { id: "onion", text: "Cebola" },
          { id: "spinach", text: "Espinafre" },
          { id: "mushrooms", text: "Cogumelos" },
          { id: "cherry-tomato", text: "Tomate coquetel" },
          { id: "lettuce", text: "Alface" },
          { id: "zucchini", text: "Abobrinha" },
          { id: "carrot", text: "Cenoura" }
        ]
      },
      {
        id: "grains",
        emoji: "🍞",
        title: "Grãos e Pães",
        options: [
          { id: "rice", text: "Arroz" },
          { id: "spaghetti", text: "Espaguete" },
          { id: "whole-bread", text: "Pão integral" },
          { id: "couscous", text: "Cuscuz" },
          { id: "oats", text: "Aveia" },
          { id: "quinoa", text: "Quinoa" }
        ],
        disabledWhen: { questionId: 14, value: "gluten-free" }
      },
      {
        id: "meat",
        emoji: "🥩",
        title: "Carne e Ovos",
        options: [
          { id: "eggs", text: "Ovos" },
          { id: "chicken-breast", text: "Peito de frango" },
          { id: "turkey-breast", text: "Peito de peru" },
          { id: "chicken-sausage", text: "Salsicha de frango" },
          { id: "chicken-ham", text: "Presunto de frango" }
        ],
        disabledWhen: { questionId: 14, value: "vegetarian" }
      },
      {
        id: "fish",
        emoji: "🐟",
        title: "Peixe",
        options: [
          { id: "salmon", text: "Salmão" },
          { id: "tuna", text: "Atum enlatado" },
          { id: "bass", text: "Badejo" },
          { id: "seafood-cocktail", text: "Coquetel de frutos do mar" },
          { id: "shrimp", text: "Camarão" },
          { id: "trout", text: "Filé de truta de rio" }
        ],
        disabledWhen: { questionId: 14, value: "vegetarian" }
      },
      {
        id: "dairy",
        emoji: "🥛",
        title: "Produtos lácteos",
        options: [
          { id: "tofu", text: "Tofu" },
          { id: "feta", text: "Queijo feta" },
          { id: "mozzarella", text: "Mussarela" },
          { id: "cream-cheese", text: "Queijo cremoso light Philadelphia" },
          { id: "greek-yogurt", text: "Iogurte grego" },
          { id: "parmesan", text: "Parmesão ralado" },
          { id: "cheese", text: "Queijo" },
          { id: "light-cream", text: "Chantilly com baixo teor de gordura" }
        ],
        disabledWhen: { questionId: 14, value: "lactose-free" }
      },
      {
        id: "fruits",
        emoji: "🍌",
        title: "Frutas e bagas",
        options: [
          { id: "avocado", text: "Abacate" },
          { id: "apples", text: "Maçãs" },
          { id: "pears", text: "Peras" },
          { id: "bananas", text: "Bananas" },
          { id: "berries", text: "Frutas vermelhas frescas" },
          { id: "mango", text: "Manga" },
          { id: "orange", text: "Laranja" }
        ]
      }
    ]
  },
  {
    id: 16,
    title: "Quanta água você bebe diariamente?",
    type: "single",
    thematicImage: "/images/lifestyle/water-consumption.jpg",
    options: [
      { id: "less-0.5", text: "Menos de 0,5 L (menos de 2 copos)", icon: "Droplet" },
      { id: "0.5-1.5", text: "0,5 – 1,5 L (2–6 copos)", icon: "Droplets" },
      { id: "1.5-2.5", text: "1,5 – 2,5 L (7–10 copos)", icon: "GlassWater" },
      { id: "more-2.5", text: "Mais de 2,5 L (mais de 10 copos)", icon: "Waves" },
      { id: "dont-count", text: "Eu não conto, depende", icon: "HelpCircle" }
    ]
  },
  {
    id: 27,
    title: "Qual a sua altura?",
    type: "input",
    inputType: "number",
    inputPlaceholder: "Ex: 170",
    inputSuffix: "cm"
  },
  {
    id: 28,
    title: "Qual é o seu peso atual?",
    type: "input",
    inputType: "number",
    inputPlaceholder: "Ex: 70",
    inputSuffix: "kg"
  },
  {
    id: 29,
    title: "Qual é o seu peso desejado?",
    type: "input",
    inputType: "number",
    inputPlaceholder: "Ex: 65",
    inputSuffix: "kg"
  },
  {
    id: 31,
    title: "Você tem um evento importante em breve?",
    subtitle: "Ter algo pelo qual ansiar pode ser um grande motivador para atingir sua meta",
    type: "single",
    options: [
      { id: "vacation", text: "Férias", icon: "Plane" },
      { id: "trip", text: "Viagem", icon: "Compass" },
      { id: "birthday", text: "Aniversário", icon: "Cake" },
      { id: "family-occasion", text: "Ocasião familiar", icon: "Users" },
      { id: "wedding", text: "Casamento", icon: "Heart" },
      { id: "contest", text: "Concurso", icon: "Trophy" },
      { id: "extreme-sports", text: "Esportes radicais", icon: "Mountain" },
      { id: "other", text: "Outros", icon: "Calendar" },
      { id: "none", text: "Nenhum evento especial", icon: "X" }
    ]
  },
  {
    id: 20,
    title: "Você tem problemas com algum dos seguintes pontos?",
    type: "multiple",
    options: [
      { id: "sensitive-knees", text: "Joelhos sensíveis", icon: "AlertCircle" },
      { id: "sensitive-back", text: "Costas sensíveis", icon: "AlertTriangle" },
      { id: "none", text: "Nenhuma das afirmações se aplica", icon: "CheckCircle" }
    ]
  },
  {
    id: 21,
    title: "Com que frequência você costuma se exercitar?",
    type: "single",
    options: [
      { id: "almost-daily", text: "Quase todos os dias", icon: "Footprints" },
      { id: "3-4-times", text: "3–4 vezes por semana", icon: "Footprints" },
      { id: "1-2-times", text: "1–2 vezes por semana", icon: "Footprints" },
      { id: "once-month", text: "Mais ou menos uma vez por mês", icon: "Footprints" }
    ]
  },
  {
    id: 23,
    title: "Você tem algum dos seguintes maus hábitos?",
    type: "multiple",
    options: [
      { id: "late-night-eating", text: "Eu como tarde da noite", icon: "Moon" },
      { id: "cant-quit-sweets", text: "Não consigo largar os doces", icon: "Candy" },
      { id: "love-sodas", text: "Eu amo refrigerantes", icon: "Wine" },
      { id: "love-fatty-salty", text: "Eu amo alimentos gordurosos ou salgados", icon: "Pizza" },
      { id: "none", text: "Nenhuma das afirmações se aplica", icon: "CheckCircle" }
    ]
  },
  {
    id: 24,
    title: "Algum dos seguintes eventos nos últimos anos levou ao ganho de peso?",
    type: "multiple",
    options: [
      { id: "financial-difficulties", text: "Dificuldades financeiras", icon: "DollarSign" },
      { id: "busy-family", text: "Vida familiar ocupada", icon: "Users" },
      { id: "slower-metabolism", text: "Metabolismo mais lento devido ao envelhecimento", icon: "TrendingDown" },
      { id: "work-pressure", text: "Pressão no trabalho", icon: "Briefcase" },
      { id: "divorce", text: "Divórcio ou separação", icon: "HeartCrack" },
      { id: "covid-pandemic", text: "Pandemia de Covid-19", icon: "Bug" },
      { id: "other-stressful", text: "Outros eventos estressantes", icon: "AlertCircle" },
      { id: "none", text: "Nenhuma das afirmações se aplica", icon: "CheckCircle" }
    ]
  },
  {
    id: 25,
    title: "É difícil para você escolher roupas com seu peso atual?",
    type: "single",
    options: [
      { id: "almost-always", text: "Quase sempre", icon: "Shirt" },
      { id: "sometimes", text: "Às vezes", icon: "Shirt" },
      { id: "rarely", text: "Raramente", icon: "Shirt" },
      { id: "no-way", text: "De jeito nenhum", icon: "Shirt" }
    ]
  },
  {
    id: "stats-page",
    title: "Estatísticas da Nutria",
    type: "stats",
  },
  {
    id: 26,
    title: "Qual é a sua principal razão para entrar em forma?",
    type: "single",
    options: [
      { id: "confident-body", text: "Sentir-me mais confiante no meu próprio corpo", icon: "Heart" },
      { id: "healthier", text: "Sentir-me mais saudável", icon: "Activity" },
      { id: "more-energy", text: "Sentir-me com mais energia", icon: "Zap" },
      { id: "clothes-fit", text: "Para que minhas roupas sirvam melhor", icon: "Shirt" },
      { id: "other", text: "Outro", icon: "MessageCircle" }
    ]
  },
  {
    id: 30,
    title: "Qual a sua idade?",
    type: "input",
    inputType: "number",
    inputPlaceholder: "Ex: 30",
    inputSuffix: "anos"
  },
  {
    id: "consent-page",
    title: "Deixe-nos personalizar seu plano",
    subtitle: "Para oferecer planos personalizados e recursos do aplicativo, precisamos do seu consentimento para processar seus dados de saúde.",
    type: "intermediate",
    requiresGender: true,
    femaleImage: "healthy-lifestyle",
    maleImage: "healthy-lifestyle-male"
  },
  {
    id: "loading-page",
    title: "Suas respostas estão sendo analisadas...",
    subtitle: "",
    type: "loading",
    image: ""
  }
];