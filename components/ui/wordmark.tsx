import { cn } from "@/lib/utils";
import {
  WORDMARK_CODE,
  WORDMARK_RATIO,
  WORDMARK_VIEWBOX,
  WORDMARK_VX,
} from "@/lib/wordmark";

/**
 * A marca, em um lugar só.
 *
 * Vinha escrita à mão em três pontos (cabeçalho, menu do celular e rodapé),
 * cada um com o próprio tamanho e o próprio `<span>` laranja no "VX".
 *
 * É SVG embutido, não um arquivo referenciado, e isso compra três coisas:
 * nenhuma requisição extra, nitidez em qualquer tamanho, e — a que mais
 * importa — as cores vêm dos tokens. O "Code" usa `fill-current`, então herda
 * a cor do texto de onde estiver; o "VX" usa `fill-signal`. Se a paleta mudar,
 * a marca acompanha sozinha.
 *
 * O desenho mora em `lib/wordmark.ts`, compartilhado com a imagem de
 * compartilhamento, que precisa da mesma marca em outro formato.
 */
export function Wordmark({
  className,
  title = "Code VX",
}: {
  className?: string;
  /** Vira o nome acessível. Passe string vazia quando houver texto ao lado. */
  title?: string;
}) {
  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      role={title ? "img" : "presentation"}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={cn("w-auto", className)}
      style={{ aspectRatio: WORDMARK_RATIO }}
    >
      <path
        className="fill-current"
        d={WORDMARK_CODE.d}
        transform={WORDMARK_CODE.transform}
      />
      <path
        className="fill-signal"
        d={WORDMARK_VX.d}
        transform={WORDMARK_VX.transform}
      />
    </svg>
  );
}
