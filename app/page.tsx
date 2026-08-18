import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { MarqueeCredentials } from "@/components/sections/marquee-credentials";
import { SearchSimulator } from "@/components/sections/search-simulator";
import { PortfolioBento } from "@/components/sections/portfolio-bento";
import { Process } from "@/components/sections/process";
import { ServicesTable } from "@/components/sections/services-table";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <MarqueeCredentials />
        <SearchSimulator />
        <PortfolioBento />
        <Process />
        <ServicesTable />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
