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

export const REGIONAL_FOCUS = [
  "São Paulo",
  "Santo André",
  "São Bernardo do Campo",
  "São Caetano do Sul",
  "Diadema",
  "Mauá",
  "Ribeirão Pires",
  "Mogi das Cruzes",
];

export type PortfolioNiche =
  | "Mecânica"
  | "Clínica"
  | "E-commerce"
  | "Advocacia"
  | "Restaurante"
  | "Serviços";

export interface PortfolioItem {
  id: string;
  niche: PortfolioNiche;
  size: "sm" | "md" | "lg";
}

// TODO: substituir por cases reais (nome do cliente, screenshot, métricas verídicas)
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: "case-1", niche: "Mecânica", size: "lg" },
  { id: "case-2", niche: "Clínica", size: "md" },
  { id: "case-3", niche: "E-commerce", size: "md" },
  { id: "case-4", niche: "Advocacia", size: "sm" },
  { id: "case-5", niche: "Restaurante", size: "sm" },
  { id: "case-6", niche: "Serviços", size: "md" },
];

export interface Objection {
  title: string;
  body: string;
}

export const OBJECTIONS: Objection[] = [
  {
    title: "\"Já tive uma experiência ruim com site antes\"",
    body: "Entendemos — muito freelancer entrega e some. Por isso trabalhamos com contrato formal, prazos claros e suporte contínuo após a entrega. Você acompanha cada etapa.",
  },
  {
    title: "\"Tenho medo de tecnologia, não vou entender nada\"",
    body: "Você não precisa entender de código. Traduzimos tudo em português simples, com reuniões objetivas e um painel claro do que está sendo feito e por quê.",
  },
  {
    title: "\"Vou ver isso depois, agora quero saber o preço\"",
    body: "Sem problema. Nossa proposta é sempre personalizada ao seu negócio — chama no WhatsApp e te passamos um valor justo em poucos minutos, sem enrolação.",
  },
];

export interface ServicePlan {
  id: string;
  name: string;
  description: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
}

export const SERVICE_PLANS: ServicePlan[] = [
  {
    id: "landing",
    name: "Landing Page",
    description: "Página única de alta conversão para campanhas e captação de leads.",
    features: [
      "Design exclusivo de alta conversão",
      "Performance < 1s de carregamento",
      "Otimização para Google Ads / Meta Ads",
      "Integração com WhatsApp e formulários",
    ],
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
    highlight: true,
    badge: "Mais Escolhido",
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
    name: "Sistema Sob Medida",
    description: "Desenvolvimento 100% customizado, com APIs e automações para seu processo.",
    features: [
      "Arquitetura sob medida para seu negócio",
      "Integrações via API (ERPs, CRMs, pagamentos)",
      "Automações de processos internos",
      "Escalável e com suporte dedicado",
    ],
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
    answer: "50% do valor é pago na aprovação do escopo/orçamento para iniciarmos o desenvolvimento, e os outros 50% na entrega final, após sua aprovação do site funcionando.",
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
    answer: "Sim, cuidamos de toda a parte técnica — registro de domínio, hospedagem em infraestrutura de borda (edge) e certificado SSL — ou orientamos você a manter a titularidade em seu próprio nome, como preferir.",
  },
];

export const HERO_METRICS = [
  { label: "LCP", value: 0.4, suffix: "s", description: "Carregamento principal" },
  { label: "Uptime", value: 99.9, suffix: "%", description: "Disponibilidade" },
  { label: "CLS", value: 0.01, suffix: "", description: "Estabilidade visual" },
];
