export const SITE = {
  name: "Code VX",
  /** Fonte única do endereço. Usado em metadata, sitemap e dados estruturados. */
  url: "https://codevx.com.br",
  tagline: "Estúdio de engenharia web",
  whatsappNumber: "5511966415434",
  /** Quem assina o trabalho. O atendimento hoje é como pessoa física. */
  legalName: "Victor Xavier Cordeiro Machado",
  region: "São Paulo & ABC Paulista",
  /** Ano de abertura. Aparece no carimbo do rodapé — não escondemos ser novo. */
  since: "2026",
};

export function whatsappLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SITE.whatsappNumber}?text=${encoded}`;
}

/**
 * Âncoras com a barra na frente de propósito.
 *
 * Só com "#trabalho", os links do cabeçalho não faziam nada dentro de
 * /cases/<slug>: a âncora não existe naquela página, e o clique morria. Com
 * "/#trabalho" o navegador volta para a home e rola até a seção — e, quando já
 * se está na home, continua sendo navegação de fragmento no mesmo documento,
 * sem recarregar nada.
 */
export const NAV_LINKS = [
  { label: "Trabalho", href: "/#trabalho" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Processo", href: "/#processo" },
  { label: "Perguntas", href: "/#perguntas" },
];

/**
 * A fita de especificação que corre logo abaixo da capa.
 *
 * Antes eram duas fitas: uma de adjetivos técnicos e outra listando nichos
 * ("Salão de Beleza", "Advocacia"…) que o estúdio ainda não atendeu. A segunda
 * insinuava uma carteira de clientes inexistente, então saiu inteira.
 *
 * O que sobrou é uma lista de compromissos verificáveis: cada item é algo que
 * o cliente pode conferir na entrega e cobrar se faltar. Adjetivo não entra.
 */
export const PROJECT_SPECS = [
  "Código-fonte é seu, do primeiro commit",
  "Escopo, prazo e valor definidos por escrito",
  "Sem mensalidade de plataforma",
  "Desenhado para o celular primeiro",
  "Estrutura de SEO técnico e Google Meu Negócio",
  "Certificado SSL e hospedagem em rede global",
  "Sem rastreador de terceiro, LGPD por padrão",
  "Relatório de desempenho medido na entrega",
];

/**
 * Transparência no lugar de volume de portfólio.
 *
 * O estúdio tem um case publicado. A saída honesta não é inventar mais cinco:
 * é dizer o que se sabe e o que não se sabe, e deixar o visitante decidir com
 * a informação na mão. Cliente que fecha sabendo disso reclama menos depois.
 */
export interface StudioFact {
  label: string;
  body: string;
}

export const STUDIO_FACTS: StudioFact[] = [
  {
    label: "Quem atende",
    body: "Victor Xavier, sozinho. Você fala direto com quem escreve o código. Não existe atendimento, intermediário ou time terceirizado no meio do caminho.",
  },
  {
    label: "Quantos projetos no ar",
    body: "Um, publicado e linkado aqui embaixo para você abrir e conferir. O estúdio é novo, e preferimos que você veja um trabalho de verdade a uma grade de caixinhas escrito “em breve”.",
  },
  {
    label: "Quanto custa",
    body: "Valor fechado antes de a primeira linha ser escrita, com escopo por escrito. Metade na aprovação, metade na entrega. Não existe cobrança que aparece no meio do caminho.",
  },
  {
    label: "O que acontece se der errado",
    body: "O código é seu desde o começo e fica num repositório em seu nome. Se você quiser levar o projeto para outra pessoa, leva, sem ficar refém de plataforma ou de senha que só eu tenho.",
  },
];

export type PortfolioNiche =
  | "Beleza"
  | "Mecânica"
  | "Clínica"
  | "E-commerce"
  | "Advocacia"
  | "Restaurante"
  | "Serviços";

/** Uma decisão de projeto e o motivo dela. É o miolo do estudo de caso. */
export interface CaseDecision {
  title: string;
  body: string;
}

export interface CaseStudy {
  /** Vira a URL: /cases/<slug> */
  slug: string;
  client: string;
  niche: PortfolioNiche;
  year: string;
  /** Uma linha, para o card da home. */
  tagline: string;
  /** O problema que o projeto resolve. */
  challenge: string;
  /** O que foi construído, em prosa curta. */
  approach: string;
  decisions: CaseDecision[];
  /** Entregas verificáveis — nada de número inventado. */
  delivered: string[];
  stack: string[];
  /** Endereço do site no ar. Vazio esconde o botão. */
  liveUrl?: string;
  /**
   * Captura do site em produção, em desktop. Sem ela, o card cai para a
   * prévia em CSS. Recapture rodando o site no ar e salvando em
   * /public/cases/<slug>.webp.
   */
  image?: string;
  /**
   * Captura do MESMO site num celular, não a de desktop recortada. É o que
   * evita decepar o título do cliente numa moldura vertical.
   */
  imageMobile?: string;
  imageAlt?: string;
  /**
   * Título e descrição para a busca. Sem eles, a página cai numa composição
   * automática do nome do cliente com o nicho, que fica curta e usa palavras
   * que ninguém digita. Aqui entram os termos que a pessoa realmente busca.
   */
  metaTitle?: string;
  metaDescription?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "aurea-studio",
    client: "Áurea Studio",
    niche: "Beleza",
    year: "2026",
    tagline:
      "Um salão em São Paulo com cara de editorial de moda, e um agendamento que chega pronto no WhatsApp.",
    challenge:
      "Salão de bairro compete com dezenas de perfis iguais no Instagram, todos com a mesma estética bege e o mesmo “chama no direct”. O site precisava fazer duas coisas ao mesmo tempo: parecer caro o suficiente para justificar o ticket, e tirar do caminho o atrito de quem quer marcar horário mas não sabe nomear o serviço que precisa.",
    approach:
      "Direção de arte comprometida no lugar do template de nicho: preto tinta, osso e oxblood, tipografia display em corpo monumental e uma voz monoespaçada para preço e duração. Sobre essa base, três ferramentas que resolvem problemas reais do negócio. Um lookbook que se percorre como portfólio, um comparador de antes e depois, e um quiz que traduz “o que está te incomodando” em serviço com preço.",
    decisions: [
      {
        title: "Direção de arte antes de qualquer código",
        body: "A primeira versão era tecnicamente correta e visualmente covarde: creme, dourado, pilha de cards. O cliente reconheceu na hora: era o que qualquer gerador de template entrega. Refizemos sobre uma direção editorial noir e o site parou de ser intercambiável com o de qualquer outro negócio.",
      },
      {
        title: "Contraste calculado, não estimado",
        body: "O oxblood da marca dá 1,93:1 sobre a tinta, e reprova até no mínimo para elemento não textual. Em vez de aceitar no olho, medimos e criamos um segundo papel de acento só para texto. Nenhuma falha de contraste nas três páginas.",
      },
      {
        title: "Agendamento que termina no WhatsApp",
        body: "O salão não tem agenda online integrada, então prometer “horário confirmado” seria mentira. O formulário monta o pedido em cliques (vários serviços, soma das durações, profissional, faixa de horário) e entrega a mensagem escrita. Menos ida e volta no chat, e a recepção responde com o horário exato.",
      },
      {
        title: "Mobile desenhado, não espremido",
        body: "A capa tem escala tipográfica própria no celular, o agendamento ganha uma barra de ação fixa com o total sempre à vista, e a equipe vira um trilho horizontal em vez de três retratos empilhados. São decisões diferentes das do desktop, não a mesma tela reduzida.",
      },
    ],
    delivered: [
      "Três páginas: home, catálogo de serviços e agendamento guiado",
      "Lookbook com trilho horizontal no desktop e carrossel por toque no celular",
      "Comparador antes e depois operável por teclado, sobre input nativo",
      "Quiz de indicação validado nas 36 combinações possíveis de resposta",
      "Contraste WCAG AA verificado por auditoria automatizada em todas as páginas",
      "Fotos de 3 MB servidas como WebP de ~120 KB",
    ],
    stack: ["Next.js 16", "React 19", "Tailwind v4", "Framer Motion"],
    liveUrl: "https://aurea-studio-seven.vercel.app",
    image: "/cases/aurea-studio.webp",
    imageMobile: "/cases/aurea-studio-mobile.webp",
    imageAlt:
      "Capa do site do Áurea Studio: fundo preto tinta, o título “Beleza sem pressa” em serifa grande com a segunda linha em itálico oxblood, e uma faixa de informações com endereço, horário e o botão de agendar.",
    metaTitle: "Site para salão de beleza em São Paulo: case Áurea Studio",
    metaDescription:
      "Um salão de bairro em São Paulo trocou o template bege por direção de arte própria e um agendamento que chega pronto no WhatsApp. Veja como foi feito.",
  },
];

/** O case em destaque na home. */
export const FEATURED_CASE = CASE_STUDIES[0];

export interface ProcessStep {
  title: string;
  /** Prazo típico da etapa. O número é o que torna a sequência informativa. */
  duration: string;
  body: string;
  /** O que cabe ao cliente nesta etapa — corta o "e agora, o que eu faço?". */
  yours: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Diagnóstico",
    duration: "1 conversa",
    body: "Eu olho o que você tem hoje, procuro seu negócio no Google como um cliente procuraria e vejo quem aparece na sua frente. Saio dessa conversa sabendo se consigo resolver.",
    yours: "Contar o que o negócio faz e o que você quer que o site resolva.",
  },
  {
    title: "Proposta",
    duration: "2 dias úteis",
    body: "Escopo por escrito, prazo com data e valor fechado. Se algo não couber no orçamento, aparece na proposta como fora do escopo, não como surpresa depois.",
    yours: "Ler, perguntar o que ficou vago e aprovar ou recusar.",
  },
  {
    title: "Design e construção",
    duration: "1 a 4 semanas",
    body: "Direção de arte primeiro, código depois. Você acompanha num endereço de teste desde os primeiros dias e comenta enquanto ainda é barato mudar.",
    yours: "Enviar textos, fotos e logo. É a etapa que mais depende de você.",
  },
  {
    title: "Publicação",
    duration: "1 dia",
    body: "O site vai para o seu domínio, com certificado, sitemap e Google Meu Negócio configurados. Você recebe o relatório de desempenho medido e o acesso ao repositório.",
    yours: "Apontar o domínio, se já tiver um. Se não tiver, eu registro.",
  },
];

export interface ServicePlan {
  id: string;
  name: string;
  /** Para quem é. Uma linha, sem adjetivo. */
  audience: string;
  /** Prazo típico. */
  timeline: string;
  /** O que entra. */
  scope: string[];
  highlight?: boolean;
  ctaLabel?: string;
  /** Encaixa no molde da mensagem do widget: "...e gostaria de {ctaIntent}." */
  ctaIntent?: string;
}

export const SERVICE_PLANS: ServicePlan[] = [
  {
    id: "landing",
    name: "Página única",
    audience:
      "Negócio que precisa de um endereço próprio para colocar no Instagram, no cartão e nos anúncios.",
    timeline: "7 a 10 dias úteis",
    scope: [
      "Uma página, desenhada do zero para o seu negócio",
      "Botão de WhatsApp com a mensagem já escrita",
      "Estrutura pronta para campanha de tráfego pago",
      "Google Meu Negócio configurado e ligado ao site",
    ],
    highlight: true,
    ctaIntent: "um orçamento de página única",
  },
  {
    id: "institucional",
    name: "Site institucional",
    audience:
      "Empresa que precisa aparecer na busca por vários serviços e explicar o que faz com profundidade.",
    timeline: "3 a 4 semanas",
    scope: [
      "Home, sobre, serviços e contato, ou a estrutura que o negócio pedir",
      "Uma página por serviço, cada uma disputando sua própria busca",
      "Painel para você editar textos sem depender de mim",
      "SEO técnico completo, sitemap e dados estruturados",
    ],
    ctaIntent: "um orçamento de site institucional",
  },
  {
    id: "ecommerce",
    name: "Loja online",
    audience: "Quem vende produto e quer receber pedido e pagamento pelo site.",
    timeline: "4 a 6 semanas",
    scope: [
      "Catálogo de produtos com estoque e variações",
      "Checkout com Pix, cartão e boleto",
      "Cálculo de frete e cupom de desconto",
      "Painel de pedidos e relatório de vendas",
    ],
    ctaIntent: "um orçamento de loja online",
  },
  {
    id: "sistema",
    name: "Fora do padrão",
    audience:
      "Seu caso não é nenhum dos três acima: sistema interno, agendamento, integração, o que for.",
    timeline: "Depende do escopo",
    scope: [
      "Conversa inicial sem custo para entender o problema",
      "Proposta sob medida, ou a indicação de alguém melhor para o caso",
    ],
    ctaLabel: "Conversar sobre meu caso",
    ctaIntent: "conversar sobre um projeto fora do padrão",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Existe contrato e segurança jurídica no projeto?",
    answer: `Sim. Todo projeto começa com escopo, prazos e valores definidos por escrito e acordados antes de a primeira linha ser escrita, assinados por ${SITE.legalName}. Nada é cobrado fora do que estiver combinado ali.`,
  },
  {
    question: "O código e o site são de minha propriedade?",
    answer:
      "São. O repositório é aberto em seu nome desde o primeiro dia e o domínio é registrado como seu. Depois de quitado o pagamento, código, domínio e conteúdo ficam com você, sem aluguel de plataforma e sem senha que só eu tenho.",
  },
  {
    question: "Como funciona o pagamento?",
    answer:
      "Metade na aprovação do escopo, para começar, e metade na entrega, depois de você aprovar o site funcionando. Nada é cobrado antes de a proposta estar por escrito e assinada.",
  },
  {
    question: "O que acontece depois que o site é entregue?",
    answer:
      "O site é seu e continua no ar sem depender de mim. Se quiser, existe um plano de manutenção com atualizações, backup, monitoramento e pequenos ajustes, mas é opcional, e recusar não deixa o site parado.",
  },
  {
    question: "Quanto tempo leva para o site ficar pronto?",
    answer:
      "Página única leva de 7 a 10 dias úteis. Site institucional, de 3 a 4 semanas. Loja online, de 4 a 6. O prazo conta a partir do momento em que os textos e as fotos estão comigo. Essa costuma ser a parte que mais atrasa.",
  },
  {
    question: "Vocês cuidam de domínio e hospedagem?",
    answer:
      "Cuido de tudo: registro do domínio, hospedagem em rede global e certificado SSL. A titularidade fica em seu nome, não no meu. Você pode conferir no registro.br a qualquer momento.",
  },
  {
    question: "O estúdio é novo. Por que eu contrataria?",
    answer:
      "Porque dá para verificar antes de decidir. O único projeto no ar está linkado nesta página, aberto para você abrir, testar no seu celular e medir. O escopo fica por escrito, o código fica em seu nome e o pagamento é metade só na entrega. Se isso não bastar, não contrate. É uma resposta legítima.",
  },
];

/* -------------------------------------------------------------------------
 * Páginas de serviço.
 *
 * A home tinha os quatro escopos numa seção só, disputando uma única busca.
 * Página que não existe não aparece em resultado nenhum, e "criação de site
 * institucional em Santo André" nunca ia ranquear dentro de uma linha de
 * tabela.
 *
 * Só dois serviços ganham página. Loja online e projetos fora do padrão ficam
 * de fora de propósito: escrever uma página detalhada sobre checkout e estoque
 * sugeriria um repertório que ainda não existe, que é o mesmo teatro de volume
 * recusado quando o site foi desenhado em torno de um case só.
 *
 * O que cada página promete é escopo e prazo, não histórico. A prova mora no
 * case do Áurea, e é para lá que elas apontam.
 * ---------------------------------------------------------------------- */

export interface ServicePageFaq {
  question: string;
  answer: string;
}

export interface ServicePage {
  /** Vira /servicos/<slug>. Usa o termo que a pessoa digita, não o nome interno. */
  slug: string;
  /** Liga de volta à linha correspondente na tabela da home. */
  planId: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  /** Para quem serve. */
  fitFor: string[];
  /**
   * Para quem não serve, com o serviço certo quando existe. Dizer não é o que
   * dá peso ao sim, e evita a reunião que morre no quinto minuto.
   */
  notFor: { text: string; leadTo?: string }[];
  includes: { title: string; body: string }[];
  timeline: string;
  faq: ServicePageFaq[];
  ctaIntent: string;
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "landing-page",
    planId: "landing",
    name: "Landing page",
    metaTitle: "Criação de landing page em São Paulo e ABC Paulista",
    metaDescription:
      "Uma página sob medida para transformar visita em conversa no WhatsApp. Fica pronta em 7 a 10 dias úteis, com desempenho medido e sem mensalidade.",
    headline: "Uma página. Um objetivo: virar conversa.",
    intro:
      "Quem chega numa landing page tem uma decisão para tomar, não um site para explorar. Por isso ela não tem menu com seis destinos nem seção sobre a história da empresa. Ela tem um caminho, e esse caminho termina no seu WhatsApp com a mensagem já escrita.",
    fitFor: [
      "Você ainda não tem site e hoje manda o cliente para o perfil do Instagram",
      "Vai investir em anúncio e precisa de um lugar para onde mandar o clique",
      "Seu serviço se explica em uma tela e a decisão do cliente é rápida",
    ],
    notFor: [
      {
        text: "Você oferece vários serviços e quer aparecer na busca de cada um",
        leadTo: "site-institucional",
      },
      {
        text: "Você vende produto e precisa receber pedido e pagamento pelo site. Esse escopo existe, mas ainda não tem página aqui: me chame no WhatsApp que eu falo dele direto.",
      },
    ],
    includes: [
      {
        title: "Desenhada do zero para o seu negócio",
        body: "Sem template comprado e sem construtor de blocos. A direção de arte sai do que o seu negócio é, e por isso ela não se parece com a de mais ninguém do seu ramo.",
      },
      {
        title: "Botão de WhatsApp com a mensagem pronta",
        body: "O cliente clica e o aplicativo abre com o texto já digitado, dizendo de onde ele veio. Você responde sabendo o contexto em vez de começar do zero.",
      },
      {
        title: "Feita para aguentar campanha",
        body: "Anúncio manda gente em rajada, e no celular, quase sempre em rede móvel. A página é medida nessas condições: se ela demora, o dinheiro do anúncio vira visitante que desistiu antes de ver.",
      },
      {
        title: "Google Meu Negócio ligado ao site",
        body: "O perfil que aparece no mapa fica configurado e apontando para a página. É de onde vem boa parte das ligações de quem busca serviço perto de casa.",
      },
      {
        title: "Contraste auditado, não estimado",
        body: "As combinações de cor passam por verificação automática contra o padrão WCAG AA. Texto que some no fundo é um problema de acessibilidade e de venda ao mesmo tempo.",
      },
    ],
    timeline: "7 a 10 dias úteis",
    faq: [
      {
        question: "Quanto custa?",
        answer:
          "Depende do tamanho do que você precisa, e sai fechado na proposta antes de qualquer trabalho começar. O que posso adiantar é o que não existe: mensalidade de plataforma e cobrança por alteração durante a construção.",
      },
      {
        question: "Preciso ter um domínio?",
        answer:
          "Não precisa ter antes. Se você já tem, eu aponto para o site novo. Se não tem, eu registro no seu nome, e o registro fica seu, não meu.",
      },
      {
        question: "Vou conseguir editar os textos depois?",
        answer:
          "Nesta página, não por conta própria: alterações passam por mim. É uma escolha de escopo, porque painel de edição custa tempo de construção e uma página só raramente justifica. Se editar sozinho é importante para você, o caminho é o site institucional.",
      },
      {
        question: "E se meu negócio crescer?",
        answer:
          "A landing vira a home. O código é seu e fica num repositório no seu nome, então dá para continuar de onde parou, comigo ou com outra pessoa.",
      },
    ],
    ctaIntent: "um orçamento de landing page",
  },
  {
    slug: "site-institucional",
    planId: "institucional",
    name: "Site institucional",
    metaTitle: "Criação de site institucional em São Paulo e ABC",
    metaDescription:
      "Uma página por serviço, cada uma disputando a própria busca, e um painel para você editar os textos. Fica pronto em 3 a 4 semanas, sem mensalidade de plataforma.",
    headline: "Uma página por serviço. Cada uma disputando a própria busca.",
    intro:
      "Quem procura no Google não digita o nome da sua empresa, digita o serviço que precisa. Se os seus cinco serviços moram todos numa seção da home, existe uma página só concorrendo por cinco buscas diferentes, e ela perde todas para quem dedicou uma página a cada uma.",
    fitFor: [
      "Você oferece serviços diferentes e quer ser encontrado por cada um deles",
      "Precisa explicar o que faz com profundidade, não em três linhas",
      "Quer trocar textos e preços sem depender de mim para cada vírgula",
    ],
    notFor: [
      {
        text: "Você só precisa de um endereço para colocar na bio do Instagram",
        leadTo: "landing-page",
      },
      {
        text: "Você vende produto e precisa de catálogo, estoque e pagamento. Esse escopo existe, mas ainda não tem página aqui: me chame no WhatsApp que eu falo dele direto.",
      },
    ],
    includes: [
      {
        title: "Uma página por serviço, de verdade",
        body: "Cada serviço ganha endereço próprio, título próprio e texto próprio. Página que é a mesma casca com as palavras trocadas o Google trata como isca e desconta, então o trabalho está em dar substância diferente a cada uma.",
      },
      {
        title: "Estrutura que o negócio pedir",
        body: "Home, sobre, serviços e contato é o padrão, não a regra. Se o seu caso pede uma página de equipe ou uma de perguntas frequentes, é isso que entra.",
      },
      {
        title: "Painel para você editar",
        body: "Texto, preço e foto você troca sozinho, sem me chamar e sem instalar plugin. O que o painel não faz é deixar você quebrar o layout por acidente: os campos são os que fazem sentido mudar.",
      },
      {
        title: "SEO técnico completo",
        body: "Sitemap, dados estruturados, endereço canônico e títulos escritos um a um. É o encanamento que faz o Google entender o site; não é promessa de primeiro lugar, é a condição para disputar.",
      },
      {
        title: "Medido antes de entregar",
        body: "Você recebe o relatório de desempenho e de acessibilidade do site publicado, com os números do seu site, não com uma média de mercado.",
      },
    ],
    timeline: "3 a 4 semanas",
    faq: [
      {
        question: "Quantas páginas entram?",
        answer:
          "Depende de quantos serviços você tem e de quais valem página própria. Serviço que ninguém busca separadamente não ganha página, porque página vazia atrapalha em vez de ajudar. Isso é decidido na conversa inicial e fica escrito na proposta.",
      },
      {
        question: "Em quanto tempo apareço no Google?",
        answer:
          "Semanas, e às vezes meses. Domínio novo demora a ser levado a sério, e ninguém controla isso. O que o site faz é estar tecnicamente pronto para quando o Google olhar; quem promete primeira posição com data está vendendo o que não tem.",
      },
      {
        question: "Tem mensalidade?",
        answer:
          "Da minha parte, não. A hospedagem usada cabe no plano gratuito para sites deste tamanho, e o domínio é uma taxa anual paga direto ao registro, no seu nome. Se um dia o site crescer a ponto de sair do plano gratuito, você saberá antes, não pela fatura.",
      },
      {
        question: "Esse método funciona mesmo?",
        answer:
          "Este site é o exemplo. Ele nasceu com os serviços amontoados numa seção só, e a página que você está lendo existe justamente porque essa decisão estava errada. Dá para acompanhar o resultado, porque o case e os números são públicos.",
      },
    ],
    ctaIntent: "um orçamento de site institucional",
  },
];
