import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { SpecBand } from "@/components/sections/spec-band";
import { Problem } from "@/components/sections/problem";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Transparency } from "@/components/sections/transparency";
import { Process } from "@/components/sections/process";
import { ServicesTable } from "@/components/sections/services-table";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

/**
 * A ordem é um argumento.
 *
 * Capa (o que eu afirmo, e a prova ao lado) → o que sempre entra → o problema
 * → o trabalho → a dúvida que o trabalho levanta, respondida na hora → como
 * funciona → quanto e em quanto tempo → o resto das perguntas → o convite.
 *
 * A transparência vem logo depois do único case porque é ali que a objeção
 * nasce. Empurrá-la para o fim deixaria o visitante lendo quatro seções com
 * uma pergunta na cabeça.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo" className="flex-1">
        <Hero />
        <SpecBand />
        <Problem />
        <FeaturedWork />
        <Transparency />
        <Process />
        <ServicesTable />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
