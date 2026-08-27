import { cn } from "@/lib/utils";

/**
 * A marca, em um lugar só.
 *
 * Aparecia escrita à mão em três pontos (cabeçalho, menu do celular e rodapé),
 * cada um com o próprio tamanho e o próprio `<span>` laranja no "VX". Trocar a
 * marca significava lembrar dos três.
 *
 * O arquivo é PNG, não SVG, e isso é uma limitação conhecida: o que existia era
 * um PNG de 530x278 com o fundo escuro chapado. O fundo foi removido por
 * projeção de duas cores — cada pixel é reescrito como branco ou laranja puro
 * com o alfa que o explica —, então recompor sobre o azul do site devolve o
 * original com diferença média de 0,5 por canal.
 *
 * A altura nativa é 60px. No cabeçalho ele é exibido a 22px, o que dá quase
 * 3x de densidade e cobre tela retina. Acima de ~50px de altura ele começa a
 * amolecer: até chegar um SVG, não use a marca em corpo grande.
 */

/** Proporção nativa do arquivo (307x60), para reservar o espaço e não saltar. */
const LARGURA = 307;
const ALTURA = 60;

export function Wordmark({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- o export é
    // estático: não há otimizador de imagem para o next/image acionar, e a
    // marca já sai no tamanho certo.
    <img
      src="/logo-codevx.png"
      alt="Code VX"
      width={LARGURA}
      height={ALTURA}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={cn("w-auto", className)}
    />
  );
}
