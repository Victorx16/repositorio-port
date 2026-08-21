export const SITE = {
  name: "Code VX",
  tagline: "Engenharia de Software Premium",
  whatsappNumber: "5511966415434",
  legalName: "Victor Xavier Cordeiro Machado",
  cnpj: "64.556.190/0001-00",
  region: "São Paulo & ABC Paulista",
};

export function whatsappLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SITE.whatsappNumber}?text=${encoded}`;
}

export const NAV_LINKS = [
  { label: "Portfólio", href: "#portfolio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "FAQ", href: "#faq" },
];

export const TECH_CREDENTIALS = [
  "Core Web Vitals Otimizado",
  "Next.js & React",
  "SSL / HTTPS Nativo",
  "LGPD Compliant",
  "Hospedagem Edge Global",
  "Schema.org / SEO Técnico",
  "Uptime 99.9%",
  "Mobile-First Design",
];

export const BUSINESS_NICHES = [
  "Salão de Beleza",
  "Barbearia",
  "E-commerce",
  "Advocacia",
  "Adega",
  "Tabacaria",
  "Restaurantes",
  "Clínicas",
  "Mecânicas",
  "Academias",
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
   * TODO: trocar por captura real do site (ex.: "/cases/aurea-studio.jpg").
   * Sem imagem, o card usa a prévia estilizada em CSS.
   */
  image?: string;
  imageAlt?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "aurea-studio",
    client: "Áurea Studio",
    niche: "Beleza",
    year: "2026",
    tagline:
      "Um salão em São Paulo com cara de editorial de moda — e um agendamento que chega pronto no WhatsApp.",
    challenge:
      "Salão de bairro compete com dezenas de perfis iguais no Instagram, todos com a mesma estética bege e o mesmo “chama no direct”. O site precisava fazer duas coisas ao mesmo tempo: parecer caro o suficiente para justificar o ticket, e tirar do caminho o atrito de quem quer marcar horário mas não sabe nomear o serviço que precisa.",
    approach:
      "Direção de arte comprometida no lugar do template de nicho: preto tinta, osso e oxblood, tipografia display em corpo monumental e uma voz monoespaçada para preço e duração. Sobre essa base, três ferramentas que resolvem problemas reais do negócio — um lookbook que se percorre como portfólio, um comparador de antes e depois, e um quiz que traduz “o que está te incomodando” em serviço com preço.",
    decisions: [
      {
        title: "Direção de arte antes de qualquer código",
        body:
          "A primeira versão era tecnicamente correta e visualmente covarde — creme, dourado, pilha de cards. O cliente reconheceu na hora: era o que qualquer gerador de template entrega. Refizemos sobre uma direção editorial noir e o site parou de ser intercambiável com o de qualquer outro negócio.",
      },
      {
        title: "Contraste calculado, não estimado",
        body:
          "O oxblood da marca dá 1,93:1 sobre a tinta — reprova até no mínimo para elemento não textual. Em vez de aceitar no olho, medimos e criamos um segundo papel de acento só para texto. Nenhuma falha de contraste nas três páginas.",
      },
      {
        title: "Agendamento que termina no WhatsApp",
        body:
          "O salão não tem agenda online integrada, então prometer “horário confirmado” seria mentira. O formulário monta o pedido em cliques — vários serviços, soma das durações, profissional, faixa de horário — e entrega a mensagem escrita. Menos ida e volta no chat, e a recepção responde com o horário exato.",
      },
      {
        title: "Mobile desenhado, não espremido",
        body:
          "A capa tem escala tipográfica própria no celular, o agendamento ganha uma barra de ação fixa com o total sempre à vista, e a equipe vira um trilho horizontal em vez de três retratos empilhados. São decisões diferentes das do desktop, não a mesma tela reduzida.",
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
    stack: ["Next.js 16", "React 19", "Tailwind v4", "Framer Motion", "Vercel"],
    liveUrl: "https://aurea-studio-seven.vercel.app",
  },
];

/** O case em destaque na home. */
export const FEATURED_CASE = CASE_STUDIES[0];

export interface ProcessStep {
  title: string;
  body: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Diagnóstico",
    body: "Entendemos o momento da sua empresa, mapeamos a concorrência na sua região e definimos a estrutura ideal.",
  },
  {
    title: "Proposta & Escopo",
    body: "Apresentamos a solução técnica, prazos cravados e investimento de forma clara e sem letras miúdas.",
  },
  {
    title: "Design & Engenharia",
    body: "Construímos uma interface exclusiva, rápida e totalmente otimizada para celular e Google.",
  },
  {
    title: "Publicação & Suporte",
    body: "Colocamos seu site no ar no domínio oficial e garantimos suporte contínuo para você focar no seu negócio.",
  },
];

export interface ServicePlan {
  id: string;
  name: string;
  description: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
  ctaLabel?: string;
  /** Fragment slotted into the WhatsApp widget's message template: "...e gostaria de {ctaIntent}." */
  ctaIntent?: string;
}

export const SERVICE_PLANS: ServicePlan[] = [
  {
    id: "landing",
    name: "Landing Page",
    description: "Página única de alta conversão para campanhas e captação de leads.",
    features: [
      "Design exclusivo de alta conversão",
      "Performance < 1s de carregamento",
      "Estrutura otimizada para campanhas de tráfego pago",
      "Integração com WhatsApp e formulários",
    ],
    highlight: true,
    badge: "Ideal para começar",
  },
  {
    id: "institucional",
    name: "Site Institucional",
    description: "Presença digital completa para consolidar autoridade e ranquear no Google.",
    features: [
      "Múltiplas páginas (Home, Sobre, Serviços, Contato)",
      "SEO técnico completo + Google Meu Negócio",
      "Painel de gestão de conteúdo",
      "Certificado SSL e hospedagem premium",
    ],
  },
  {
    id: "ecommerce",
    name: "Loja Online",
    description: "E-commerce robusto para vender pela internet 24 horas por dia.",
    features: [
      "Catálogo de produtos ilimitado",
      "Checkout otimizado + integração de pagamento",
      "Gestão de estoque e pedidos",
      "Frete automático e cupons de desconto",
    ],
  },
  {
    id: "sistema",
    name: "Projeto sob consulta",
    description: "Precisa de algo fora do padrão? Avaliamos seu caso e propomos uma solução sob medida.",
    features: [
      "Análise gratuita do seu processo",
      "Proposta personalizada",
      "Sem compromisso",
    ],
    ctaLabel: "Conversar sobre meu projeto",
    ctaIntent: "conversar sobre um projeto sob medida",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Existe contrato e segurança jurídica no projeto?",
    answer: `Sim. Todo projeto é formalizado por contrato, emitido por ${SITE.legalName} (CNPJ ${SITE.cnpj}), com escopo, prazos e valores definidos antes do início do trabalho. Você tem nota fiscal e respaldo jurídico completo.`,
  },
  {
    question: "O código e o site são de minha propriedade?",
    answer: "Sim. Após a conclusão do pagamento, todo o código-fonte, domínio e conteúdo produzido são 100% seus. Não existe dependência ou 'aluguel' de plataforma.",
  },
  {
    question: "Como funciona o modelo de pagamento 50/50?",
    answer: "50% do valor é pago na aprovação do escopo/orçamento para iniciarmos o desenvolvimento, e os outros 50% na entrega final, após a aprovação do site em funcionamento.",
  },
  {
    question: "O que acontece depois que o site é entregue?",
    answer: "Oferecemos planos de manutenção contínua com atualizações, backups, monitoramento de performance e pequenos ajustes, para o site nunca ficar desatualizado ou vulnerável.",
  },
  {
    question: "Quanto tempo leva para o site ficar pronto?",
    answer: "Landing Pages costumam levar de 7 a 10 dias úteis; Sites Institucionais e Lojas Online, de 3 a 5 semanas, dependendo da complexidade e do retorno de conteúdo pelo cliente.",
  },
  {
    question: "Vocês cuidam de domínio e hospedagem?",
    answer: "Sim, cuidamos de toda a parte técnica, incluindo registro de domínio, hospedagem em infraestrutura de borda (edge) e certificado SSL, ou orientamos você a manter a titularidade em seu próprio nome, como preferir.",
  },
];

export const HERO_METRICS = [
  { label: "Carregamento", technical: "LCP", value: 0.4, suffix: "s" },
  { label: "Sempre no ar", technical: "Uptime", value: 99.9, suffix: "%" },
  { label: "Sem travamentos", technical: "CLS", value: 0.01, suffix: "" },
];
