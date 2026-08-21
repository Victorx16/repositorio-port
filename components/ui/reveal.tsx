import type { CSSProperties } from "react";

/**
 * A única revelação por scroll da página.
 *
 * Não é client component e não importa nada: emite um atributo e uma variável
 * de atraso. Quem anima é o CSS (`app/globals.css`), e quem decide a hora é um
 * IntersectionObserver só, montado uma vez em `<RevealObserver />`.
 *
 * A versão anterior era um wrapper do Framer Motion. Funcionava, mas custava
 * uma instância de animação por elemento — quarenta na home — e serializava
 * `opacity: 0` no HTML do servidor, o que deixava a página em branco quando o
 * JavaScript não executava. Aqui o conteúdo nasce visível e o esconderijo só
 * existe se o script do <head> tiver rodado.
 *
 * A API continua a mesma dos arquivos que já usavam este componente: `index`
 * para escalonar e `as` para trocar a tag.
 */

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  /** Posição numa lista. Vira um escalonamento curto, no máximo 5 passos. */
  index?: number;
  as?: "div" | "section" | "article" | "li" | "figure";
}

export function Reveal({
  index = 0,
  as: Tag = "div",
  style,
  children,
  ...props
}: RevealProps) {
  return (
    <Tag
      data-reveal=""
      style={
        {
          // Teto no atraso: uma lista de dez itens não pode custar 1,2 s ao
          // último. Depois do quinto, todos entram juntos.
          "--reveal-delay": `${Math.min(index, 5) * 70}ms`,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      {children}
    </Tag>
  );
}
