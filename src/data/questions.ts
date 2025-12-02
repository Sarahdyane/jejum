import { QuizQuestion } from "@/types/quiz";

export const questions: QuizQuestion[] = [
  {
    id: "heart-intro",
    title: "Hoje você vai descobrir o seu coração metabólico, e o que realmente funciona pra você.",
    type: "intermediate",
    thematicImage: "metabolic-heart"
  },
  {
    id: 2,
    title: "Você se identifica em algum estágio?",
    type: "single",
    thematicImage: "lipedema-stages",
    options: [
      { 
        id: "stage-1", 
        text: "Sim, estágio 1"
      },
      { 
        id: "stage-2", 
        text: "Sim, estágio 2"
      },
      { 
        id: "stage-3", 
        text: "Sim, estágio 3"
      },
      { 
        id: "no-identify", 
        text: "Não me identifico"
      }
    ]
  },
  {
    id: 3,
    title: "Você percebe que a gordura nas pernas tem uma textura diferente do resto do corpo, sendo mais nodular?",
    type: "single",
    options: [
      { 
        id: "yes", 
        text: "Sim"
      },
      { 
        id: "no", 
        text: "Não"
      }
    ]
  },
  {
    id: "lipedema-expert-intro",
    title: "O que eu vou revelar aqui raramente é discutido em consultórios comuns no Brasil. 🚨",
    description: "Após anos de estudos internacionais, descobri protocolos avançados para o lipedema que superam os tratamentos convencionais e decodifiquei estratégias ocultas da doença. Transformei protocolos avançados em uma Ferramenta acessível.",
    type: "intermediate",
    image: "lipedema-expert-presentation"
  },
  {
    id: 4,
    title: "Qual é o momento social que mais te causa insegurança hoje por causa do seu corpo?",
    type: "single",
    options: [
      { id: "bikini", text: "Usar biquíni na praia/piscina" },
      { id: "clothes", text: "Vestir aquela roupa que não serve mais" },
      { id: "photos", text: "Tirar fotos em eventos e festas" },
      { id: "other", text: "Outro (Qualquer um que me faça sentir mal)" }
    ]
  },
  {
    id: "leg-marks",
    title: "É comum você encontrar marcas nas pernas e coxas após tirar a roupa?",
    type: "single",
    options: [
      { id: "yes", text: "Sim" },
      { id: "no", text: "Não" },
      { id: "sometimes", text: "Às vezes" }
    ]
  },
  {
    id: "intermediate-2",
    title: "Amiga…",
    subtitle: "Tô analisando aqui seu padrão e já percebi uma coisa super importante sobre seu corpo.",
    description: "Mulheres com respostas como as suas entram no grupo de Retenção Sensível — e eu já sei que um dos primeiros passos vai ser incluir 2 chás secretos no seu plano… segura aí que já já te conto!",
    type: "intermediate",
    thematicImage: "tea-echinacea"
  },
  {
    id: 5,
    title: "Qual dessas imagens mais se aproxima da sua realidade",
    subtitle: "(seja sincera, amiga, sem julgamento!)",
    type: "single",
    options: [
      { 
        id: "thin", 
        text: "Magra",
        image: "body-thin-female-real" 
      },
      { 
        id: "average", 
        text: "Média",
        image: "body-fuller-female-real" 
      },
      { 
        id: "fuller", 
        text: "Gordinha", 
        image: "body-fuller-female-professional" 
      },
      { 
        id: "overweight", 
        text: "Sobrepeso", 
        image: "body-overweight-female-real" 
      }
    ]
  },
  {
    id: 6,
    title: "Qual é a sensação de poder que você quer ter ao se olhar no espelho daqui a 30 dias?",
    type: "single",
    showInfoBox: true,
    infoBoxContent: {
      title: "🔥 Fato sobre queima de gordura",
      content: "O jejum intermitente ajuda o corpo a queimar gordura armazenada para obter energia após apenas 12 horas de jejum, tornando a perda de peso mais eficaz."
    },
    options: [
      { 
        id: "slim", 
        text: "Afinar", 
        image: "goal-slim-female" 
      },
      { 
        id: "defined", 
        text: "Definir", 
        image: "goal-defined-female" 
      },
      { 
        id: "athlete", 
        text: "Atleta", 
        image: "goal-athlete-female" 
      }
    ]
  },
  {
    id: 7,
    title: "Selecione as áreas que mais te incomodam",
    subtitle: "Você pode escolher várias opções",
    type: "body-selection",
    bodyImage: "body-zones-female-mascot",
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
    id: "motivation-incredible",
    title: "Você não falhou, o método que falhou com você!",
    subtitle: "Suas respostas mostram que você é determinada, mas que foi sabotada por dietas genéricas. Mas calma, vou te ajudar com isso agora !",
    type: "intermediate",
    image: "motivation-incredible"
  },
  {
    id: "lipedema-info",
    title: "Esse Pode Ser o Motivo do Seu Inchaço Que Ninguém Nunca Te Contou…",
    subtitle: "Uma condição que afeta milhões de mulheres",
    description: "Muitas mulheres acham que estão 'engordando errado', quando na verdade estão lidando com algo chamado lipedema — um tipo de acúmulo de gordura e inchaço que NÃO melhora com dieta comum.",
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
    id: "analyzing-pattern",
    title: "Analisando seu padrão metabólico",
    type: "intermediate",
    thematicImage: "metabolic-heart"
  },
  {
    id: "motivation-change-habits",
    title: "Pronto. Agora eu CONFIRMEI seu padrão metabólico oculto.",
    subtitle: "Seu corpo segue um padrão que poucas mulheres conhecem — e isso muda tudo.",
    type: "metabolic-pattern",
    image: "smoothie-detox-purple"
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
    id: "stats-page",
    title: "Estatísticas da Nutria",
    type: "stats",
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
    id: 30,
    title: "Qual a sua idade?",
    type: "input",
    inputType: "number",
    inputPlaceholder: "Ex: 30",
    inputSuffix: "anos"
  },
  {
    id: "consent-page",
    title: "Estamos finalizando sua análise…",
    subtitle: "Para liberar seu plano metabólico personalizado, preciso da sua autorização para usar suas respostas e montar:\n\nsua alimentação ideal\nseu treino exato\nsuas receitas e chás específicos\nseu protocolo de desincho\n\nIsso garante que seu resultado seja 100% preciso.",
    type: "intermediate",
    image: "metabolic-pattern-female"
  },
  {
    id: "loading-page",
    title: "Suas respostas estão sendo analisadas...",
    subtitle: "",
    type: "loading",
    image: ""
  }
];