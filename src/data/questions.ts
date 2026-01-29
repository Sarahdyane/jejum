import { QuizQuestion } from "@/types/quiz";

export const questions: QuizQuestion[] = [
  {
    id: 1,
    title: "",
    type: "single",
    showTitle: "O segredo para transformar Calorias em Músculos e secar a barriga comendo o que gosta.",
    showSubtitle: "Nunca foi tão fácil ter resultados em 2026",
    showFooter: true,
    options: [
      { id: "18-29", text: "18–29", customImage: "age-woman-1" },
      { id: "30-39", text: "30–39", customImage: "age-woman-2" },
      { id: "40-49", text: "40–49", customImage: "age-woman-3" },
      { id: "50+", text: "50+", customImage: "age-woman-4" }
    ]
  },
  {
    id: "social-proof",
    title: "VAMOS CRIAR O SEU MAPA ÚNICO",
    subtitle: "Nós usaremos suas respostas para construir um protocolo 'anti-falha', focado em resultados rápidos",
    type: "intermediate",
    image: "fitness-devices-hero"
   
  },
  {
    id: 3,
    title: "Qual é o seu objetivo?",
    type: "single",
    options: [
      { id: "lose-weight", text: "Perder peso", icon: "TrendingDown" },
      { id: "get-fit", text: "Ficar em forma", icon: "Dumbbell" },
      { id: "gain-weight", text: "Ganhar massa muscular", icon: "TrendingUp" }
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
        maleImage: "body-thin-male-mascot", 
        femaleImage: "body-thin-female-mascot" 
      },
      { 
        id: "average", 
        text: "Média",
        maleText: "Médio",
        maleImage: "body-average-male-mascot", 
        femaleImage: "body-average-female-mascot" 
      },
      { 
        id: "fuller", 
        text: "Gordinha", 
        maleText: "Gordinho",
        maleImage: "body-fuller-male-mascot", 
        femaleImage: "body-fuller-female-mascot" 
      },
      { 
        id: "overweight", 
        text: "Sobrepeso", 
        maleImage: "body-obese-male-mascot", 
        femaleImage: "body-obese-female-mascot" 
      }
    ]
  },
  {
    id: "personalized-plan",
    title: "Troque gordura por curvas reais com um protocolo feito para você",
    subtitle: "Não precisa gastar dinheiro com treinadores caros. Vamos detalhar tudo e **adaptar o plano ao seu objetivo**.",
    type: "intermediate",
    image: "fitness-woman-dumbbell"
  },
  {
    id: 5,
    title: "Escolha o corpo que você deseja",
    type: "single",
    requiresGender: true,
    showInfoBox: true,
    infoBoxContent: {
      title: "🔥 Fato sobre queima de gordura",
      content: "Pare de lutar contra seu próprio corpo. Hoje, seu metabolismo está programado para 'Estocar'. Nós vamos apenas virar a chave para o modo 'Queimar'."
    },
    options: [
      { 
        id: "slim", 
        text: "Corpo definido e magro", 
        maleImage: "goal-slim-male-mascot", 
        femaleImage: "goal-slim-female-mascot" 
      },
      { 
        id: "athlete", 
        text: "Corpo definido e musculoso", 
        maleImage: "goal-athlete-male-mascot", 
        femaleImage: "goal-athlete-female-mascot" 
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
    id: "nutrition-info",
    title: "Treinar sem ajustar a comida é jogar tempo fora",
    subtitle: "Seus músculos precisam de combustível. Vamos montar o cardápio que faz seu esforço valer a pena",
    type: "intermediate",
    requiresGender: true,
    femaleImage: "nutrition-info-female",
    maleImage: "fitness-male",
    bulletPoints: [
      "Cardápios econômicos com ingredientes que você JÁ TEM em casa",
      "Transforme calorias em massa magra (Definição sem passar fome)",
      "Liberdade Flexível: Aprenda a comer o que gosta sem estragar o resultado"
    ],
    buttonText: "Entendi",
    footerText: "Só mais algumas perguntas e seu plano estará tomando forma."
  },
  {
    id: "lipedema-info",
    title: "Gordura nas pernas que não sai?",
    subtitle: "Isso pode ser um sinal de Lipedema",
    description: "Vamos adicionar um Protocolo Anti-Inflamatório no seu plano para:\n• Drenar a retenção líquida\n• Melhorar a circulação\n• Destravar essa gordura resistente",
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
    title: "Deixe nosso algoritmo tomar as decisões difíceis por você",
    subtitle: "Um dia dizem para cortar pão, no outro para fazer jejum... Chega de ruído. Vamos entender tudo sobre você e deixar apenas o que funciona para a SUA realidade",
    type: "intermediate",
    requiresGender: true,
    femaleImage: "motivation-change-habits",
    maleImage: "motivation-change-habits-male"
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
    id: 'nutrition-plan',
    title: 'A primeira dieta que se adapta à sua geladeira',
    subtitle: 'Esqueça ingredientes caros e difíceis. Ative o **Modo Chef** e receba receitas deliciosas de 15 minutos usando apenas o que você já tem em casa.',
    type: 'intermediate',
    image: 'app-meals-mockup'
  },
 {
  id: 15,
  title: "Escolha os alimentos que você gosta",
  subtitle: "Selecione todas as opções que você gosta",
  type: "food-categories",
  foodCategories: [
    {
      id: "vegetables",
      emoji: "🥬",
      title: "Vegetais e Legumes",
      options: [
        { id: "tomato", text: "Tomate" },
        { id: "broccoli", text: "Brócolis" },
        { id: "cauliflower", text: "Couve-flor" },
        { id: "cucumber", text: "Pepino" },
        { id: "bell-pepper", text: "Pimentão" },
        { id: "onion", text: "Cebola" },
        { id: "spinach", text: "Espinafre" },
        { id: "kale", text: "Couve" },
        { id: "mushrooms", text: "Cogumelos" },
        { id: "cherry-tomato", text: "Tomate cereja" },
        { id: "lettuce", text: "Alface" },
        { id: "zucchini", text: "Abobrinha" },
        { id: "carrot", text: "Cenoura" },
        { id: "pumpkin", text: "Abóbora/Cabotiá" },
        { id: "beetroot", text: "Beterraba" },
        { id: "eggplant", text: "Berinjela" }
      ]
    },
    {
      id: "grains",
      emoji: "🍠",
      title: "Carboidratos e Grãos",
      options: [
        { id: "rice", text: "Arroz Branco" },
        { id: "brown-rice", text: "Arroz Integral" },
        { id: "beans", text: "Feijão" },
        { id: "sweet-potato", text: "Batata Doce" },
        { id: "potato", text: "Batata Inglesa" },
        { id: "spaghetti", text: "Macarrão/Espaguete" },
        { id: "whole-bread", text: "Pão integral" },
        { id: "couscous", text: "Cuscuz" },
        { id: "oats", text: "Aveia" },
        { id: "quinoa", text: "Quinoa" },
        { id: "tapioca", text: "Tapioca" },
        { id: "lentils", text: "Lentilha" }
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
        { id: "ground-beef", text: "Carne Moída (Patinho)" },
        { id: "beef-steak", text: "Filé de Carne (Alcatra/Mignon)" },
        { id: "pork-loin", text: "Lombo Suíno" },
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
        { id: "tilapia", text: "Tilápia" },
        { id: "salmon", text: "Salmão" },
        { id: "tuna", text: "Atum" },
        { id: "sardine", text: "Sardinha" },
        { id: "bass", text: "Badejo" },
        { id: "shrimp", text: "Camarão" },
        { id: "white-fish", text: "Peixe Branco" }
      ],
      disabledWhen: { questionId: 14, value: "vegetarian" }
    },
    {
      id: "dairy",
      emoji: "🥛",
      title: "Laticínios",
      options: [
        { id: "whey-protein", text: "Whey Protein" },
        { id: "milk", text: "Leite" },
        { id: "cottage", text: "Queijo Cottage" },
        { id: "mozzarella", text: "Mussarela" },
        { id: "ricotta", text: "Ricota" },
        { id: "greek-yogurt", text: "Iogurte grego" },
        { id: "parmesan", text: "Parmesão" },
        { id: "cream-cheese", text: "Cream Cheese Light" },
        { id: "cheese", text: "Queijo Prato/Minas" }
      ],
      disabledWhen: { questionId: 14, value: "lactose-free" }
    },
    {
      id: "fruits",
      emoji: "🍌",
      title: "Frutas",
      options: [
        { id: "banana", text: "Banana" },
        { id: "apple", text: "Maçã" },
        { id: "papaya", text: "Mamão" },
        { id: "pineapple", text: "Abacaxi" },
        { id: "watermelon", text: "Melancia" },
        { id: "grapes", text: "Uvas" },
        { id: "avocado", text: "Abacate" },
        { id: "berries", text: "Morango/Frutas Vermelhas" },
        { id: "mango", text: "Manga" },
        { id: "orange", text: "Laranja" },
        { id: "lemon", text: "Limão" }
      ]
    },
    {
      id: "fats",
      emoji: "🥜",
      title: "Gorduras Saudáveis e Sementes",
      options: [
        { id: "olive-oil", text: "Azeite de Oliva" },
        { id: "peanut-butter", text: "Pasta de Amendoim" },
        { id: "nuts", text: "Castanhas/Nozes" },
        { id: "chia", text: "Chia/Linhaça" },
        { id: "coconut-oil", text: "Óleo de Coco" }
      ]
    }
  ]
},
  {
    id: 16,
    title: "Quanta água você bebe por dia ?",
    type: "single",
    thematicImage: "/images/lifestyle/water-consumption.jpg",
    options: [
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
    title: "Precisamos preparar seu corpo para uma data específica ?",
    subtitle: "Vamos usar essa data como combustível para destravar seus resultados mais rápidos.",
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
    id: 32,
    title: "Quando será o seu evento?",
    subtitle: "Vamos manter este evento importante em mente para a sua jornada",
    type: "date",
    skippable: true,
    showWhen: {
      questionId: 31,
      notEquals: "none"
    }
  },
  {
    id: 33,
    title: "Projeção de objetivo",
    type: "goal-projection"
  },
  {
    id: 34,
    title: "Qual é o seu nível de condicionamento físico?",
    type: "single",
    options: [
      { 
        id: "beginner", 
        text: "Iniciante", 
        description: "Faz tempo que não treino e me sinto 'enferrujada'",
        icon: "Zap"
      },
      { 
        id: "amateur", 
        text: "Intermediária"", 
        description: "Treino de vez em quando, mas sempre acabo parando.",
        icon: "Zap"
      },
      { 
        id: "advanced", 
        text: "Avançado", 
        description: "Já treino firme toda semana.",
        icon: "Zap"
      }
    ]
  },
  {
    id: 35,
    title: "Gosto ou não gosto",
    type: "exercise-preference"
  },
  {
    id: 36,
    title: "Quais são os esportes de seu interesse?",
    type: "multiple",
    options: [
      { id: "gym", text: "Treinos de Academia", icon: "Dumbbell" },
      { id: "home", text: "Treinos em casa", icon: "Home" },
      { id: "running", text: "Corrida", icon: "Footprints" },
      { id: "none", text: "Nenhuma das opções", icon: "X" }
    ]
  },
  {
    id: 37,
    title: "Guia de suplementos",
    type: "supplements-page"
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
      { id: "3-4-times", text: "1-2 vezes por semana", icon: "Footprints" },
      { id: "1-2-times", text: "1–5 vezes por semana", icon: "Footprints" },
      { id: "once-month", text: "Mais ou menos uma vez por mês", icon: "Footprints" }
    ]
  },
  {
    id: 38,
    title: "Escolha o local do seu treino",
    type: "multiple",
    options: [
      { id: "home", text: "Casa", icon: "Home" },
      { id: "gym", text: "Academia", icon: "Dumbbell" },
      { id: "mixed", text: "Misto", icon: "Shuffle" }
    ]
  },
  {
    id: 39,
    title: "Quanto tempo você quer que seus treinos durem?",
    type: "grid",
    options: [
      { id: "10-15", text: "10 a 15 minutos", icon: "Timer" },
      { id: "20-30", text: "20 a 30 minutos", icon: "Timer" },
      { id: "30-40", text: "30 a 40 minutos", icon: "Timer" },
      { id: "40-60", text: "40 a 60 minutos", icon: "Timer" },
      { id: "let-decide", text: "Deixe a Nutria decidir", icon: "ThumbsUp" }
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
    id: 26,
    title: "Qual é a sua principal razão para entrar em forma?",
    type: "single",
    options: [
      { id: "confident-body", text: "Eliminar a pochete e a barriga estufada", icon: "Heart" },
      { id: "healthier", text: "Sentir-me mais saudável", icon: "Activity" },
      { id: "more-energy", text: "Olhar no espelho e gostar do que vejo (Autoestima)", icon: "Zap" },
      { id: "clothes-fit", text: "Trocar gordura por corpo definido", icon: "Shirt" },
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
