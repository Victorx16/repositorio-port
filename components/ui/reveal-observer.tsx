"use client";

import { useEffect } from "react";

/**
 * O único observador da página.
 *
 * Percorre todo elemento marcado com um dos gestos de revelação e escreve
 * `data-revealed` quando ele entra em quadro. O CSS cuida do resto: um
 * observador para a página inteira, no lugar de uma instância de animação por
 * elemento.
 *
 * Este componente vive no layout raiz, e era exatamente aí que morava um bug
 * sério. No App Router o layout NÃO remonta em navegação client-side, então um
 * `useEffect` de dependências vazias varria o documento uma única vez, na
 * primeira página aberta na sessão. Quem chegava na home e clicava para o case
 * encontrava o texto inteiro invisível: os elementos novos nunca chegaram a ser
 * observados, e nada os tirava do `opacity: 0`.
 *
 * A correção é o MutationObserver. Em vez de varrer uma vez, o componente
 * escuta o documento e passa a observar qualquer elemento marcado que apareça
 * depois. Cobre troca de rota, conteúdo condicional e o que mais vier, sem
 * depender de detalhe interno do roteador.
 */

/**
 * Os três gestos. Um atributo esquecido nesta lista não falha barulhento: o
 * elemento simplesmente nunca é revelado e some da página. Já aconteceu com
 * `data-reveal-rule`, e custou o traço de todos os rótulos de seção.
 */
const SELETOR = "[data-reveal], [data-reveal-line], [data-reveal-rule]";

export function RevealObserver() {
  useEffect(() => {
    const revelar = (el: Element) => el.setAttribute("data-revealed", "");

    // Sem IntersectionObserver, revela tudo de uma vez. Um site sem animação
    // continua sendo um site; um site sem texto, não.
    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll(SELETOR).forEach(revelar);
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          revelar(entrada.target);
          observador.unobserve(entrada.target);
        }
      },
      // Espera o elemento subir 80px dentro da tela antes de revelar, para a
      // animação não acontecer colada na borda de baixo.
      { rootMargin: "0px 0px -80px 0px" },
    );

    const observar = (el: Element) => {
      if (!el.hasAttribute("data-revealed")) observador.observe(el);
    };

    const varrer = (raiz: ParentNode) =>
      raiz.querySelectorAll(SELETOR).forEach(observar);

    varrer(document);

    // `childList` + `subtree` e nada além: só interessa nó novo entrando no
    // documento. Escutar atributo ou texto custaria caro e não acrescentaria
    // nada, já que o próprio observador é quem escreve `data-revealed`.
    const vigia = new MutationObserver((mutacoes) => {
      for (const mutacao of mutacoes) {
        for (const no of mutacao.addedNodes) {
          if (!(no instanceof Element)) continue;
          if (no.matches(SELETOR)) observar(no);
          varrer(no);
        }
      }
    });

    vigia.observe(document.body, { childList: true, subtree: true });

    return () => {
      observador.disconnect();
      vigia.disconnect();
    };
  }, []);

  return null;
}
