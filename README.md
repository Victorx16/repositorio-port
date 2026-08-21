# Code VX

Site do estúdio. Next.js 16, React 19, Tailwind v4.

```bash
pnpm install && pnpm dev
```

| Comando | O que faz |
| --- | --- |
| `pnpm dev` | Servidor de desenvolvimento em `localhost:3000` |
| `pnpm build` | Build de produção (todas as rotas saem estáticas) |
| `pnpm lint` | ESLint |
| `pnpm contrast` | Auditoria de contraste da paleta; sai com erro se algum par com texto reprovar em AA |

---

## A direção de arte: "Prancha técnica"

A paleta não foi escolhida por gosto. Azul de planta técnica e laranja de
sinalização industrial são o vocabulário visual do ABC Paulista — o cinturão
industrial que o estúdio atende. É o que impede a página de ser intercambiável
com qualquer outro site de agência.

Três regras governam tudo:

1. **Canto reto.** `--radius: 2px`. Desenho técnico não tem canto arredondado.
   Os valores de raio dos primitivos shadcn foram remapeados para valores quase
   nulos, então `rounded-2xl` herdado continua saindo reto sem precisar editar
   componente por componente.
2. **Hierarquia por fio e por espaço**, nunca por sombra ou card flutuante.
3. **Laranja é reservado.** Só aparece em ação primária, dado vivo e estado de
   foco. Se ele começar a aparecer em ícone e enfeite, para de comandar.

### Paleta

| Token | Valor | Papel |
| --- | --- | --- |
| `--ink` | `#0b1020` | Fundo |
| `--ink-2` | `#101829` | Superfície |
| `--ink-3` | `#16213a` | Superfície elevada |
| `--paper` | `#edf1f7` | Texto (16,70:1 — AAA) |
| `--mute` | `#8fa0b8` | Texto secundário (7,11:1 — AAA) |
| `--faint` | `#7c8ead` | Rótulos e legendas em mono (5,71:1 — AA) |
| `--signal` | `#ff5a1f` | Acento (6,07:1 — AA) |
| `--rule` | `#1e2b45` | Fio de grade |

Os contrastes são medidos, não estimados. `pnpm contrast` reprova o build se
algum par que carrega texto cair abaixo de AA.

### Tipografia

- **Archivo** (display) — grotesca de sinalização, da Omnibus-Type.
- **Instrument Sans** (corpo) — some no texto e deixa o display falar.
- **IBM Plex Mono** (dados) — anotação de prancha: medida, prazo, ficha técnica.

As três são servidas pelo próprio domínio via `next/font`. Não existe
requisição a terceiro no caminho crítico, e o CSP em `next.config.ts` não abre
exceção para nenhum host externo de fonte.

---

## O instrumento que se mede

`components/ui/page-speed.tsx` é o elemento-assinatura da página. Ele lê o LCP
real do navegador do visitante e mostra o número na capa. Quando o LCP não está
disponível (Safari), cai para o tempo de navegação — e **troca o rótulo**, porque
chamar as duas métricas de "LCP" seria mentira.

Duas decisões que parecem detalhe e não são:

- **Leitura ruim aparece como ruim.** Se a conexão do visitante estiver lenta, o
  instrumento mostra o número alto e o classifica pelo limite oficial do Google.
  Esconder isso transformaria o instrumento de volta em folheto.
- **O valor chega mesmo sem animação.** `requestAnimationFrame` congela em aba
  de fundo; sem a rede de segurança do `setTimeout`, quem abrisse o site numa
  aba para ver depois encontraria "Este site abriu em 0,00 s".

---

## Movimento

Não há biblioteca de animação nas seções. Um `IntersectionObserver`
(`components/ui/reveal-observer.tsx`) marca `data-revealed` nos elementos, e o
CSS faz o resto com uma curva só (`cubic-bezier(0.16, 1, 0.3, 1)`). Só
`opacity` e `transform` são animados — as duas propriedades que o compositor
resolve sem recalcular layout, o que mantém 60fps em Android de entrada.

A versão anterior usava Framer Motion elemento a elemento: quarenta instâncias
na home, cada uma com seus valores animados e seu laço de quadro. Hoje o Framer
só sobrevive no widget de WhatsApp, onde `AnimatePresence` faz falta de verdade.

Três regras não negociáveis, cada uma paga com um bug encontrado em teste:

1. **O conteúdo nasce visível.** O estado escondido só existe dentro de
   `@media (scripting: enabled)`. Onde essa consulta não casa, o visitante perde
   a animação e nunca o texto. O Framer fazia o oposto — serializava
   `opacity: 0` no HTML do servidor —, e bastava o script falhar para a página
   chegar em branco.
2. **Transição, nunca `@keyframes` com atraso.** Numa animação, o estado final
   só é alcançado se o relógio avançar até o fim; uma capa inteira ficou
   invisível no teste por causa disso. Com transição, `[data-revealed]` já é o
   estado computado e a animação é só o caminho até ele.
3. **Nenhuma animação em laço.** O que havia — esteira de credenciais, brilho
   varrendo o botão, grade em perspectiva no rodapé, anéis pulsando — foi
   removido: mantinha a GPU do celular acordada sem acrescentar argumento.

**Movimento reduzido** é respeitado em duas camadas: a media query em
`globals.css` zera transições e transformadas, e a contagem do instrumento zera
a própria duração.

## Regras de conteúdo

O estúdio tem um projeto publicado, e a página é construída em torno disso em
vez de disfarçar. Vale para quem for mexer aqui depois:

- **Nada de número inventado.** Métrica ou é medida, ou tem fonte citada, ou não
  entra. O `53%` na seção do problema traz a origem ao lado.
- **Nada de volume falso.** Não repor a grade de portfólio com "case em breve":
  seis caixas vazias ensinam o visitante a desconfiar também da que é real. O
  campo "Projetos no ar" no rodapé mostra o número verdadeiro.
- **Cada cliente tem identidade própria.** A prévia do Áurea usa a paleta dele —
  preto tinta, osso e oxblood —, que não tem nada a ver com esta página. O
  contraste é proposital e está explicado embaixo da imagem.

---

## Estrutura

```
app/
  layout.tsx              fontes, metadata, observador de revelação
  page.tsx                ordem das seções da home
  globals.css             tokens, escala tipográfica, utilitárias
  cases/[slug]/page.tsx   estudo de caso (estático via generateStaticParams)
  opengraph-image.tsx     imagem de compartilhamento
components/
  sections/               uma seção da home por arquivo
  ui/                     primitivos (action, reveal, spec-label, page-speed)
  ui/reveal-observer.tsx  o único IntersectionObserver da página
  layout/                 header e footer
  whatsapp-widget/        captura de contato
lib/constants.ts          todo o conteúdo editável do site
scripts/contrast.mjs      auditoria de contraste
```

Praticamente todo texto do site vive em `lib/constants.ts`. Para trocar copy,
preço, prazo ou FAQ, é o único arquivo que precisa ser aberto.

### Pendências marcadas no código

- `metadataBase` em `app/layout.tsx` aponta para `codevx.com.br` — trocar quando
  o domínio for registrado.
- `CasePreview` renderiza uma miniatura em CSS. Passando `image` no case em
  `lib/constants.ts`, ela troca por captura real sem mexer no layout.
- `captureLead` no widget de WhatsApp ainda só registra no console; falta ligar
  a um destino de verdade.
