import { MessageCircle } from "lucide-react";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { whatsappLink } from "@/lib/constants";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <RetroGrid />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          Pronto para aparecer quando seu cliente procurar?
        </h2>
        <p className="mt-5 text-balance text-muted-foreground sm:text-lg">
          Fale agora com a Code VX e receba uma proposta personalizada para o
          seu negócio — sem compromisso.
        </p>
        <div className="mt-9 flex justify-center">
          <ShimmerButton
            href={whatsappLink(
              "Olá! Vim pelo site e quero uma proposta para o meu negócio.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-8 text-sm"
          >
            <MessageCircle className="mr-2 size-4" aria-hidden="true" />
            Falar no WhatsApp agora
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
}
