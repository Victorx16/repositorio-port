"use client";

import dynamic from "next/dynamic";

/**
 * O widget, carregado depois.
 *
 * Ele é a única coisa da página que ainda usa Framer Motion, e o Framer não é
 * pequeno. Importado direto no layout, ele entrava no pacote inicial e era
 * avaliado antes de a primeira tela terminar de montar — a medição em produção
 * mostrou 1 s só de avaliação de script no celular, com o LCP em 3,8 s.
 *
 * Nada aqui é necessário para ler a página nem para clicar no botão principal,
 * que é um link direto para o WhatsApp. Então o widget desce para um pedaço
 * separado, buscado depois da hidratação.
 *
 * `ssr: false` porque não há o que pré-renderizar: fechado, ele é um botão
 * flutuante, e sem JavaScript não teria como abrir de qualquer forma.
 */
export const WhatsAppWidgetLazy = dynamic(
  () => import("./widget").then((m) => m.WhatsAppWidget),
  { ssr: false },
);
