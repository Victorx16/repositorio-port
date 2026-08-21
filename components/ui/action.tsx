import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A ação da página, em duas vozes.
 *
 * Substitui o ShimmerButton (brilho varrendo em laço infinito) e o
 * CtaArrowBadge (bolinha laranja grudada na borda direita). Os dois eram
 * ornamento pedindo atenção; num sistema em que o laranja só aparece na ação,
 * o botão já é a coisa mais gritante da tela sem precisar piscar.
 *
 * O rótulo é monoespaçado em caixa alta porque é a mesma voz das medidas e das
 * anotações da prancha: o botão vira parte do instrumento, não um adesivo
 * colado por cima dele. Canto reto, pelo mesmo motivo que o resto da página.
 *
 * Altura mínima de 48px nas duas variantes — alvo de toque confortável em
 * celular, que é de onde vem a maior parte de quem procura serviço local.
 */

type ActionProps = {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  /** Seta diagonal indicando que o destino é externo ou uma nova etapa. */
  arrow?: boolean;
} & (
  | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
);

const BASE =
  "group/action relative overflow-hidden inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xs px-6 font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] transition-colors duration-200";

const VARIANTS = {
  // hover:bg-[#ff7440] é o laranja clareado ~8%. Deixado literal porque um
  // color-mix aqui recalcularia a cada quadro do hover sem ganho nenhum.
  primary: "bg-signal text-ink hover:bg-[#ff7440]",
  // `sweep-base` traça um fio laranja na base ao passar o mouse. Trocar a
  // cor da borda inteira era o gesto óbvio; traçar é o gesto da prancha.
  ghost: "sweep-base border border-rule-strong text-paper hover:border-signal",
} as const;

export function Action({
  children,
  variant = "primary",
  className,
  arrow = false,
  ...props
}: ActionProps) {
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="size-3.5 transition-transform duration-200 group-hover/action:translate-x-0.5 group-hover/action:-translate-y-0.5"
        />
      )}
    </>
  );

  const classes = cn(BASE, VARIANTS[variant], className);

  if (props.href !== undefined) {
    const { href, ...rest } =
      props as React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
      };
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
