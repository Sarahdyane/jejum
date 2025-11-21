import { QuizQuestion } from "@/types/quiz";

export const questions: QuizQuestion[] = [
  {
    id: "splash-screen",
    title: "O Seu Corpo Tem um Padrão Oculto\nVamos Descobrir Qual É?",
    subtitle: "Cada mulher tem um padrão oculto que explica por que ela incha, por que ganha peso rápido em certas fases, por que trava no dia 3…\nHoje, você vai descobrir o SEU.",
    type: "intermediate",
    image: "nutria-logo"
  },
  {
    id: 1,
    title: "Qual é a sua Visão de Sucesso?",
    subtitle: "O que você quer que as pessoas notem primeiro em você?",
    type: "single",
    options: [
      { 
        id: "confidence", 
        text: "💪 A Confiança Inabalável\nSentir-se poderosa em qualquer roupa"
      },
      { 
        id: "energy", 
        text: "⚡ A Energia Contagiante\nTer disposição para tudo, sem cansaço"
      },
      { 
        id: "sculpted", 
        text: "✨ O Corpo Esculpido\nVer a barriga chapada e a cintura fina"
      }
    ]
  },
  {
    id: 2,
    title: "Quando você tenta seguir um plano, qual é o SEU padrão mais real?",
    type: "single",
    options: [
      { 
        id: "excited-day3", 
        text: "🎯 Fico animada, mas travo no dia 3"
      },
      { 
        id: "weekend-fail", 
        text: "📅 Vou bem até o fim de semana… aí desanda"
      },
      { 
        id: "body-no-response", 
        text: "💪 Faço tudo certo, mas meu corpo não responde"
      },
      { 
        id: "stubborn-body", 
        text: "🔒 Sinto que meu corpo é \"teimoso\""
      }
    ]
  },
  {
    id: 3,
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
    id: "intermediate-2",
    title: "Amiga…",
    subtitle: "Tô analisando aqui seu padrão e já percebi uma coisa super importante sobre seu corpo.",
    description: "Mulheres com respostas como as suas entram no grupo de Retenção Sensível — e eu já sei que um dos primeiros passos vai ser incluir 2 chás secretos no seu plano… segura aí que já já te conto!",
    type: "intermediate",
    thematicImage: "tea-echinacea"
  },
  {
    id: 4,
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
    id: 5,
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
    id: 6,
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
    title: "Deixe-nos personalizar seu plano",
    subtitle: "Para oferecer planos personalizados e recursos do aplicativo, precisamos do seu consentimento para processar seus dados de saúde.",
    type: "intermediate",
    image: "healthy-lifestyle"
  },
  {
    id: "loading-page",
    title: "Suas respostas estão sendo analisadas...",
    subtitle: "",
    type: "loading",
    image: ""
  }
];