import { cn } from "@/lib/utils";

/**
 * Prévia de um projeto.
 *
 * Com `src`, mostra a captura real do site em produção. Sem ela, cai para uma
 * reprodução em CSS da identidade do cliente — paleta, proporção tipográfica e
 * ritmo das seções. A alternativa é deliberada e honesta: uma miniatura
 * claramente ilustrativa comunica a direção de arte sem se passar por um
 * screenshot que não é.
 *
 * A imagem é art-directed, não redimensionada. No celular entra a captura do
 * site do cliente EM UM CELULAR; no desktop, a de desktop. A versão anterior
 * servia só a captura larga e a recortava para caber numa moldura vertical, o
 * que decepava o título do cliente pelos dois lados.
 *
 * Vale dizer em voz alta: a página cobra "mobile desenhado, não espremido" na
 * tabela de serviços. Espremer a prova do próprio trabalho no celular era o
 * mesmo tipo de incoerência do LCP escrito à mão.
 *
 * `<picture>` com `media` é o que faz o navegador baixar UMA das duas, e não as
 * duas. Esconder com `display:none` não evita o download.
 */

interface CasePreviewProps {
  /** Captura de desktop. Sem ela, renderiza a miniatura em CSS. */
  src?: string;
  /** Captura de celular. Sem ela, a de desktop vale para todas as larguras. */
  srcMobile?: string;
  alt?: string;
  className?: string;
  /** A prévia da home é a maior imagem da página; vale carregar cedo. */
  priority?: boolean;
}

export function CasePreview({
  src,
  srcMobile,
  alt,
  className,
  priority = false,
}: CasePreviewProps) {
  if (src) {
    return (
      <picture>
        {srcMobile && (
          <source
            media="(max-width: 639px)"
            srcSet={srcMobile}
            type="image/webp"
          />
        )}
        {/* Art direction precisa de <picture>, que o next/image não expõe. As
            capturas já saem no tamanho e no formato certos, e o export é
            estático: não há otimizador de imagem em produção para o
            next/image acionar. */}
        <img
          src={src}
          alt={alt ?? ""}
          className={cn("size-full object-cover object-top", className)}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      </picture>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative size-full overflow-hidden bg-[#0b0a09]",
        // `cqw` mede a largura DESTE elemento: sem o container-type as
        // unidades não resolvem e a miniatura nasce com tipografia de 0px.
        "[container-type:inline-size]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_18%_8%,rgba(122,30,43,0.55),transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(50%_45%_at_88%_78%,rgba(217,96,111,0.14),transparent_60%)]" />

      <div className="relative flex h-full flex-col justify-between p-[6%]">
        <div className="flex items-center justify-between">
          <span className="font-display text-[clamp(0.5rem,1.6cqw,0.75rem)] font-medium text-[#f2ede4]">
            Áurea Studio
          </span>
          <span className="flex gap-[3%]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-px w-[1.4rem] bg-[#f2ede4]/25" />
            ))}
          </span>
        </div>

        <div>
          <p className="font-display mt-[3%] text-[clamp(1.1rem,7cqw,3.5rem)] leading-[0.86] font-medium tracking-[-0.04em] text-[#f2ede4]">
            Beleza
            <br />
            <span className="text-[#d9606f] italic">sem pressa</span>
          </p>
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-[#f2ede4]/12 pt-[3%]">
          <span className="flex flex-col gap-[0.35em] font-mono text-[clamp(0.28rem,0.9cqw,0.45rem)] tracking-[0.16em] uppercase">
            <span className="text-[#f2ede4]">Vila Mariana, SP</span>
            <span className="text-[#8a837a]">Endereço</span>
          </span>
          <span className="bg-[#7a1e2b] px-[5%] py-[1.6%] font-mono text-[clamp(0.28rem,0.9cqw,0.45rem)] tracking-[0.18em] text-[#f2ede4] uppercase">
            Agendar
          </span>
        </div>
      </div>
    </div>
  );
}
