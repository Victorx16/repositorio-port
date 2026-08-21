/**
 * Auditoria de contraste da paleta Code VX.
 *
 * Rode com `node scripts/contrast.mjs`. Sai com código 1 se algum par que
 * carrega texto reprovar no mínimo AA (4,5:1) — dá para plugar em CI.
 *
 * A regra da casa é medir, não estimar no olho. Um par que "parece legível"
 * num monitor bom reprova no celular de quem está no sol.
 */

const TOKENS = {
  ink: "#0b1020",
  ink2: "#101829",
  ink3: "#16213a",
  paper: "#edf1f7",
  mute: "#8fa0b8",
  faint: "#7c8ead",
  signal: "#ff5a1f",
  rule: "#1e2b45",
};

/** Luminância relativa conforme WCAG 2.1. */
function luminance(hex) {
  const channels = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function ratio(a, b) {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

/** `min: null` = par decorativo, medido para registro mas sem exigência. */
const PAIRS = [
  ["Texto sobre fundo", TOKENS.paper, TOKENS.ink, 4.5],
  ["Texto sobre superfície", TOKENS.paper, TOKENS.ink2, 4.5],
  ["Texto sobre superfície elevada", TOKENS.paper, TOKENS.ink3, 4.5],
  ["Texto mudo sobre fundo", TOKENS.mute, TOKENS.ink, 4.5],
  ["Texto mudo sobre superfície", TOKENS.mute, TOKENS.ink2, 4.5],
  ["Texto mudo sobre superfície elevada", TOKENS.mute, TOKENS.ink3, 4.5],
  ["Acento sobre fundo", TOKENS.signal, TOKENS.ink, 4.5],
  ["Acento sobre superfície", TOKENS.signal, TOKENS.ink2, 4.5],
  ["Botão: fundo sobre acento", TOKENS.ink, TOKENS.signal, 4.5],
  ["Anel de foco sobre fundo", TOKENS.signal, TOKENS.ink, 3],
  // `faint` veste os rótulos do instrumento e as legendas em mono. São 10px
  // em caixa alta — não contam como texto grande, então valem os 4,5:1 cheios.
  ["Texto apagado sobre fundo", TOKENS.faint, TOKENS.ink, 4.5],
  ["Texto apagado sobre superfície", TOKENS.faint, TOKENS.ink2, 4.5],
  ["Texto apagado sobre sup. elevada", TOKENS.faint, TOKENS.ink3, 4.5],
  ["Fio de grade (decorativo)", TOKENS.rule, TOKENS.ink, null],
];

let falhas = 0;

for (const [nome, frente, fundo, minimo] of PAIRS) {
  const valor = ratio(frente, fundo);
  const reprovou = minimo !== null && valor < minimo;
  if (reprovou) falhas++;

  const marca = minimo === null ? "–" : reprovou ? "REPROVA" : "ok";
  const nivel =
    minimo === null ? "decorativo" : valor >= 7 ? "AAA" : valor >= 4.5 ? "AA" : "—";

  console.log(
    `${marca.padEnd(8)} ${nome.padEnd(36)} ${valor.toFixed(2).padStart(6)}:1  ${nivel}`,
  );
}

console.log(
  falhas === 0
    ? "\nTodos os pares com texto passam no mínimo exigido."
    : `\n${falhas} par(es) reprovando. Ajuste os tokens em app/globals.css.`,
);

process.exit(falhas === 0 ? 0 : 1);
