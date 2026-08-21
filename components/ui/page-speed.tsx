"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * O instrumento que mede a própria página.
 *
 * A versão anterior da capa exibia "LCP 0.4s" como um número escrito à mão no
 * código. Era, na melhor das hipóteses, uma medição antiga de outro aparelho —
 * e num site que vende desempenho, um número de folheto é exatamente a coisa
 * que o concorrente de template também sabe escrever.
 *
 * Aqui o número é lido do navegador de quem está olhando, agora, com a API de
 * performance do próprio browser. Vira demonstração no lugar de alegação, e é
 * a única coisa da página que não dá para copiar sem construir junto.
 *
 * Honestidade tem duas partes, e a segunda é a que importa: quando a leitura
 * sai ruim — conexão de celular no meio da rua, aparelho antigo —, o
 * instrumento mostra ruim e diz isso, com o limite oficial do Google ao lado.
 * Esconder a leitura ruim transformaria o instrumento de volta em folheto.
 */

/** Limites do Core Web Vitals para LCP, em segundos. */
const LIMITE_BOM = 2.5;
const LIMITE_RAZOAVEL = 4;

type Metrica = "LCP" | "DOM carregado";

interface Leitura {
  segundos: number;
  metrica: Metrica;
}

function classificar(segundos: number) {
  if (segundos <= LIMITE_BOM) return { texto: "bom", bom: true } as const;
  if (segundos <= LIMITE_RAZOAVEL)
    return { texto: "precisa melhorar", bom: false } as const;
  return { texto: "ruim", bom: false } as const;
}

export function usePageSpeed() {
  const [leitura, setLeitura] = useState<Leitura | null>(null);

  useEffect(() => {
    let maiorPintura: number | null = null;
    let observer: PerformanceObserver | undefined;

    // O Safari não implementa largest-contentful-paint. O try/catch não é
    // decorativo: `observe` com um tipo desconhecido lança, e sem ele o
    // componente inteiro morreria justamente nos aparelhos da Apple.
    try {
      observer = new PerformanceObserver((lista) => {
        const entradas = lista.getEntries();
        const ultima = entradas[entradas.length - 1];
        if (ultima) maiorPintura = ultima.startTime;
      });
      observer.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      observer = undefined;
    }

    // O LCP pode ser revisado enquanto a página ainda pinta. Uma pausa curta
    // deixa o valor assentar antes de a gente congelar a leitura na tela.
    const temporizador = window.setTimeout(() => {
      observer?.disconnect();

      if (maiorPintura && maiorPintura > 0) {
        setLeitura({ segundos: maiorPintura / 1000, metrica: "LCP" });
        return;
      }

      // Sem LCP, cai para o tempo de navegação — outra métrica, então o
      // rótulo muda junto. Chamar as duas de "LCP" seria mentira pequena.
      const [navegacao] = performance.getEntriesByType(
        "navigation",
      ) as PerformanceNavigationTiming[];
      const tempo =
        navegacao?.domContentLoadedEventEnd || navegacao?.responseEnd;
      if (tempo > 0) {
        setLeitura({ segundos: tempo / 1000, metrica: "DOM carregado" });
      }
    }, 1000);

    return () => {
      window.clearTimeout(temporizador);
      observer?.disconnect();
    };
  }, []);

  return leitura;
}

/**
 * O número, em corpo de display, para viver dentro do título.
 *
 * O espaço é reservado desde o primeiro quadro com `min-width` em `ch` sobre
 * algarismos tabulares. Um site que mede o próprio carregamento e empurra o
 * layout ao exibir o resultado seria uma piada — o instrumento não pode ser a
 * causa de um salto de leiaute.
 */
export function SpeedValue({
  leitura,
  className,
}: {
  leitura: Leitura | null;
  className?: string;
}) {
  const [exibido, setExibido] = useState(0);

  useEffect(() => {
    if (!leitura) return;

    const reduzido = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Movimento reduzido não vira um segundo caminho de código: ele zera a
    // duração. O primeiro quadro já resolve para o valor final, então existe
    // um fluxo só para depurar — e nenhum setState solto no corpo do efeito.
    const DURACAO = reduzido ? 0 : 750;

    let quadro = 0;
    const inicio = performance.now();

    const passo = (agora: number) => {
      // A divisão por zero é evitada explicitamente: com duração zero,
      // (agora - inicio) também pode ser zero, e 0/0 daria NaN na tela.
      const t = DURACAO === 0 ? 1 : Math.min(1, (agora - inicio) / DURACAO);
      // Mesma sensação da curva --ease-out-expo do CSS: dispara e assenta.
      const suavizado = 1 - Math.pow(1 - t, 3);
      setExibido(leitura.segundos * suavizado);
      if (t < 1) quadro = requestAnimationFrame(passo);
    };

    quadro = requestAnimationFrame(passo);

    // Rede de segurança, e não detalhe teórico: o navegador congela
    // requestAnimationFrame em aba de fundo. Sem isto, quem abre o site numa
    // aba que só vai olhar depois encontra "Este site abriu em 0,00 s" — o
    // instrumento desmentindo a página inteira. A contagem é enfeite; o valor
    // certo tem que chegar mesmo que nenhum quadro seja desenhado.
    const rede = window.setTimeout(
      () => setExibido(leitura.segundos),
      DURACAO + 250,
    );

    return () => {
      cancelAnimationFrame(quadro);
      window.clearTimeout(rede);
    };
  }, [leitura]);

  return (
    <span
      className={cn(
        "text-signal tnum relative inline-flex min-w-[4.5ch] items-baseline justify-start",
        className,
      )}
      // Anuncia a leitura uma vez, quando ela fecha. Sem isso, quem usa
      // leitor de tela ouviria o título terminar no vazio.
      aria-live="polite"
      aria-atomic="true"
    >
      {leitura ? (
        <>
          {exibido.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          <span className="ml-[0.12em]">s</span>
        </>
      ) : (
        <span
          aria-hidden="true"
          className="bg-signal/70 caret-blink inline-block h-[0.62em] w-[2.2ch] align-baseline"
        >
          <span className="sr-only">medindo</span>
        </span>
      )}

      {/*
        O instrumento trava a leitura: um fio é traçado sob o número quando ele
        para de subir, como um ponteiro assentando na marca.

        Fica FORA do ternário de propósito. Dentro dele, o fio só nasceria junto
        com o valor, já no estado final, e transição não roda na montagem. Aqui
        o elemento existe desde o primeiro quadro e é o atributo que muda,
        que é o que o navegador precisa para interpolar.
      */}
      <span
        aria-hidden="true"
        data-travado={leitura ? "true" : "false"}
        className="bg-signal absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform delay-700 duration-500 ease-out data-[travado=true]:scale-x-100"
      />
    </span>
  );
}

/**
 * A ficha do instrumento: o que foi medido, onde, e como isso se compara ao
 * limite oficial. É o que separa um número de uma medição.
 */
export function SpeedCaption({
  leitura,
  className,
}: {
  leitura: Leitura | null;
  className?: string;
}) {
  const estado = leitura ? classificar(leitura.segundos) : null;

  return (
    <dl
      className={cn(
        "border-rule text-spec-sm font-mono uppercase",
        // Duas colunas sempre: a ficha mora dentro do carimbo estreito da
        // capa, então uma fileira de quatro campos espremeria os rótulos.
        "grid grid-cols-2 gap-x-6 gap-y-4 border-t pt-4",
        className,
      )}
    >
      <div>
        <dt className="text-faint">Métrica</dt>
        <dd className="text-mute mt-1">{leitura?.metrica ?? "medindo"}</dd>
      </div>
      <div>
        <dt className="text-faint">Medida em</dt>
        <dd className="text-mute mt-1">Seu aparelho, agora</dd>
      </div>
      <div>
        <dt className="text-faint">Limite “bom”</dt>
        <dd className="text-mute tnum mt-1">2,50 s</dd>
      </div>
      <div>
        <dt className="text-faint">Resultado</dt>
        <dd
          className={cn(
            "mt-1 flex items-center gap-1.5",
            estado?.bom ? "text-signal" : "text-mute",
          )}
        >
          {estado && (
            <span
              aria-hidden="true"
              className={cn(
                "size-1.5 shrink-0",
                estado.bom ? "bg-signal" : "bg-mute",
              )}
            />
          )}
          {estado?.texto ?? "medindo"}
        </dd>
      </div>
    </dl>
  );
}
