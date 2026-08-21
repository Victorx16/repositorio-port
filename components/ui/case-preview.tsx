import { cn } from "@/lib/utils";

/**
 * Prévia estilizada de um projeto.
 *
 * É uma reprodução em CSS da identidade do site — paleta, proporção
 * tipográfica e ritmo das seções —, não uma captura de tela. A escolha é
 * deliberada e honesta: uma miniatura claramente ilustrativa comunica a
 * direção de arte sem se passar por um screenshot que não é.
 *
 * Quando houver captura real, passe `src` e a moldura troca sozinha. O
 * enquadramento e a proporção continuam os mesmos, então o layout não mexe.
 */

interface CasePreviewProps {
  /** Captura real. Sem ela, renderiza a miniatura em CSS. */
  src?: string;
  alt?: string;
  className?: string;
}

export function CasePreview({ src, alt, className }: CasePreviewProps) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- prévia estática, sem otimização necessária
      <img
        src={src}
        alt={alt ?? ""}
        className={cn("size-full object-cover object-top", className)}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative size-full overflow-hidden bg-[#0b0a09]",
        // `cqw` mede a largura DESTE elemento: sem o container-type as
        // unidades não resolvem e a miniatura nasce com tipografia de 0px.
        // Isso a faz escalar igual no card da home e no topo da página do case.
        "[container-type:inline-size]",
        className,
      )}
    >
      {/* Brilho oxblood no canto superior esquerdo, como na capa do site. */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_18%_8%,rgba(122,30,43,0.55),transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(50%_45%_at_88%_78%,rgba(217,96,111,0.14),transparent_60%)]" />

      <div className="relative flex h-full flex-col justify-between p-[6%]">
        {/* Barra de navegação */}
        <div className="flex items-center justify-between">
          <span className="font-heading text-[clamp(0.5rem,1.6cqw,0.75rem)] font-medium text-[#f2ede4]">
            Áurea Studio
          </span>
          <span className="flex gap-[3%]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-px w-[1.4rem] bg-[#f2ede4]/25"
              />
            ))}
          </span>
        </div>

        {/* Título monumental — a assinatura da direção */}
        <div>
          <span className="flex items-center gap-2">
            <span className="h-px w-[8%] bg-[#d9606f]/60" />
            <span className="font-mono text-[clamp(0.3rem,1cqw,0.5rem)] uppercase tracking-[0.28em] text-[#d9606f]">
              São Paulo
            </span>
          </span>
          <p className="mt-[3%] font-heading text-[clamp(1.1rem,7cqw,3.5rem)] font-medium leading-[0.86] tracking-[-0.04em] text-[#f2ede4]">
            Beleza
            <br />
            <span className="italic text-[#d9606f]">sem pressa</span>
          </p>
        </div>

        {/* Ficha técnica em mono */}
        <div className="flex items-end justify-between gap-4 border-t border-[#f2ede4]/12 pt-[3%]">
          <span className="flex flex-col gap-[0.35em] font-mono text-[clamp(0.28rem,0.9cqw,0.45rem)] uppercase tracking-[0.16em]">
            <span className="text-[#f2ede4]">Vila Mariana, SP</span>
            <span className="text-[#8a837a]">Endereço</span>
          </span>
          <span className="bg-[#7a1e2b] px-[5%] py-[1.6%] font-mono text-[clamp(0.28rem,0.9cqw,0.45rem)] uppercase tracking-[0.18em] text-[#f2ede4]">
            Agendar
          </span>
        </div>
      </div>
    </div>
  );
}
