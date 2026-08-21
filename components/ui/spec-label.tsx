import { cn } from "@/lib/utils";

/**
 * Rótulo de prancha técnica.
 *
 * O fio curto à esquerda não é enfeite: é a linha de chamada do desenho
 * técnico, que aponta para o que está sendo nomeado. Ele amarra o rótulo à
 * seção em vez de deixá-lo flutuando, e dá ao olho um ponto de entrada
 * consistente em toda a página.
 *
 * Substitui o `<span>` de "eyebrow" laranja que antes era colado à mão em cada
 * seção: mesmo texto, mesma medida, mesmo espaçamento, agora num lugar só.
 *
 * O traço é traçado da esquerda quando a seção entra em quadro. É o gesto que
 * dá nome à direção, e por isso abre toda seção da página.
 */

interface SpecLabelProps {
  children: React.ReactNode;
  /** Numeração da seção, quando a ordem carrega informação de verdade. */
  index?: string;
  className?: string;
}

export function SpecLabel({ children, index, className }: SpecLabelProps) {
  return (
    <p
      className={cn(
        "text-signal font-mono text-spec-sm flex items-center gap-3 uppercase",
        className,
      )}
    >
      <span
        aria-hidden="true"
        data-reveal-rule=""
        className="bg-signal h-px w-6 shrink-0"
      />
      {index && (
        <>
          <span className="tnum">{index}</span>
          <span aria-hidden="true" className="bg-rule-strong h-2.5 w-px" />
        </>
      )}
      {children}
    </p>
  );
}
