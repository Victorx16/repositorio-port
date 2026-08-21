import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Prévia de um projeto.
 *
 * Com `src`, mostra a captura real do site em produção. Sem ela, cai para uma
 * reprodução em CSS da identidade do cliente — paleta, proporção tipográfica e
 * ritmo das seções. A alternativa é deliberada e honesta: uma miniatura
 * claramente ilustrativa comunica a direção de arte sem se passar por um
 * screenshot que não é. Quem chama o componente sinaliza isso na legenda.
 *
 * A captura passa pelo next/image, então o navegador recebe o tamanho certo
 * para a largura da tela em vez de sempre o arquivo de 1600px. Num site que
 * vende carregamento, servir imagem grande demais seria o erro mais caro.
 */

interface CasePreviewProps {
  /** Captura real. Sem ela, renderiza a miniatura em CSS. */
  src?: string;
  alt?: string;
  className?: string;
  /** A prévia da home é a maior imagem da página; vale carregar cedo. */
  priority?: boolean;
}

export function CasePreview({
  src,
  alt,
  className,
  priority = false,
}: CasePreviewProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        // Ocupa a largura útil da prancha no desktop e a tela inteira no
        // celular, descontado o respiro lateral.
        sizes="(min-width: 1024px) 1136px, 100vw"
        priority={priority}
        className={cn("object-cover object-top", className)}
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
        "[container-type:inline-size]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_18%_8%,rgba(122,30,43,0.55),transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(50%_45%_at_88%_78%,rgba(217,96,111,0.14),transparent_60%)]" />

      <div className="relative flex h-full flex-col justify-between p-[6%]">
        <div className="flex items-center justify-between">
          <span className="font-heading text-[clamp(0.5rem,1.6cqw,0.75rem)] font-medium text-[#f2ede4]">
            Áurea Studio
          </span>
          <span className="flex gap-[3%]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-px w-[1.4rem] bg-[#f2ede4]/25" />
            ))}
          </span>
        </div>

        <div>
          {/*
            Sem rótulo de região acima do título: o site real deixou de ter
            essa linha, e a miniatura existe para representar o que está no ar.
            Prévia de portfólio que mostra uma versão antiga do projeto é
            defasagem que corrói a credibilidade da peça inteira.
          */}
          <p className="font-heading text-[clamp(1.1rem,7cqw,3.5rem)] font-medium leading-[0.86] tracking-[-0.04em] text-[#f2ede4]">
            Beleza
            <br />
            <span className="italic text-[#d9606f]">sem pressa</span>
          </p>
        </div>

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
