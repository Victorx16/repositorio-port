"use client";

import { useEffect } from "react";

/**
 * O único observador da página.
 *
 * Percorre todo elemento com `data-reveal` e marca `data-revealed` quando ele
 * entra em quadro. O CSS cuida do resto. Um observador para a página inteira,
 * no lugar de quarenta instâncias de animação.
 *
 * Duas saídas de emergência, porque o custo de errar aqui é o conteúdo sumir:
 *
 * · Sem IntersectionObserver no navegador, revela tudo de uma vez. Um site sem
 *   animação continua sendo um site; um site sem texto, não.
 * · O que já estiver em quadro no momento em que isto monta é revelado no mesmo
 *   passo — o observador dispara sozinho para esses casos, mas a garantia
 *   explícita elimina a janela entre a pintura e a primeira notificação.
 */
export function RevealObserver() {
  useEffect(() => {
    const alvos = document.querySelectorAll<HTMLElement>(
      // Os três gestos precisam estar aqui. Um atributo esquecido nesta lista
      // não falha barulhento: o elemento simplesmente nunca é revelado e some
      // da página para sempre. Foi o que aconteceu com `data-reveal-rule`.
      [
        "[data-reveal]:not([data-revealed])",
        "[data-reveal-line]:not([data-revealed])",
        "[data-reveal-rule]:not([data-revealed])",
      ].join(", "),
    );
    if (alvos.length === 0) return;

    const revelar = (el: Element) => el.setAttribute("data-revealed", "");

    if (typeof IntersectionObserver === "undefined") {
      alvos.forEach(revelar);
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

    alvos.forEach((el) => observador.observe(el));

    return () => observador.disconnect();
  }, []);

  return null;
}
