"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Tira o fragmento (#processo, #perguntas…) da barra de endereços depois que a
 * rolagem termina.
 *
 * A âncora continua fazendo o trabalho dela: quem chega em /#processo por um
 * link de fora é levado até a seção, e quem clica na navegação também. O que
 * some é só o rastro na URL, que antes ficava preso ali até a próxima
 * navegação.
 *
 * Três armadilhas que esta implementação precisou contornar:
 *
 * 1. O App Router troca a URL por `pushState`, e pushState **não** dispara
 *    `hashchange`. Por isso o gatilho é o clique no link, não o evento de hash
 *    — que fica só para o botão voltar.
 * 2. `history.replaceState` cru **quebra a navegação**: a barra de endereços
 *    passa a divergir do estado interno do router, o Next continua achando que
 *    está em "/#perguntas" e ignora o clique seguinte no mesmo link. Por isso
 *    a limpeza usa `router.replace`, que atualiza os dois lados.
 * 3. A leitura do hash acontece dentro do temporizador, não no clique: no
 *    momento do clique a URL ainda é a antiga, e a rolagem ainda não terminou.
 */
export function UrlLimpa() {
  const router = useRouter();
  const caminho = usePathname();

  useEffect(() => {
    let temporizador: number | undefined;

    const agendarLimpeza = () => {
      window.clearTimeout(temporizador);
      temporizador = window.setTimeout(() => {
        if (!window.location.hash) return;
        router.replace(caminho + window.location.search, { scroll: false });
      }, 600);
    };

    const aoClicar = (evento: MouseEvent) => {
      const alvo = (evento.target as HTMLElement | null)?.closest("a");
      if (!alvo) return;
      if (!(alvo.getAttribute("href") ?? "").includes("#")) return;
      agendarLimpeza();
    };

    // Chegada direta em /#alguma-coisa, vinda de um link de fora.
    agendarLimpeza();

    document.addEventListener("click", aoClicar);
    window.addEventListener("hashchange", agendarLimpeza);

    return () => {
      window.clearTimeout(temporizador);
      document.removeEventListener("click", aoClicar);
      window.removeEventListener("hashchange", agendarLimpeza);
    };
  }, [router, caminho]);

  return null;
}
