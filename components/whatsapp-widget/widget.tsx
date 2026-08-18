"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useWhatsAppWidget } from "./context";

const COUNTRY_CODES = [
  { code: "+55", label: "Brasil" },
  { code: "+351", label: "Portugal" },
  { code: "+1", label: "EUA / Canadá" },
  { code: "+54", label: "Argentina" },
  { code: "+598", label: "Uruguai" },
  { code: "+595", label: "Paraguai" },
];

const AGENT_NAME = "Victor Xavier";
const AGENT_ROLE = "Dev & Designer";
const AGENT_INITIALS = "VX";

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/**
 * TODO(lead-capture): sem serviço de captura configurado ainda. Quando houver
 * um endpoint / planilha / CRM, envie { name, countryCode, phone, intent }
 * para lá aqui dentro (ex: `await fetch("/api/leads", { method: "POST", body: ... })`)
 * antes (ou em paralelo) do redirecionamento para o WhatsApp abaixo.
 */
function captureLead(lead: {
  name: string;
  countryCode: string;
  phone: string;
  intent: string;
}) {
  console.info("[whatsapp-widget] lead captured (not yet persisted):", lead);
}

export function WhatsAppWidget() {
  const { isOpen, intent, open, close } = useWhatsAppWidget();
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("+55");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      nameInputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (isOpen) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmedName = name.trim();
    const phoneDigits = phone.replace(/\D/g, "");
    const nextErrors: { name?: string; phone?: string } = {};

    if (!trimmedName) {
      nextErrors.name = "Informe seu nome para continuar.";
    }
    if (phoneDigits.length < 10) {
      nextErrors.phone = "Informe um telefone válido com DDD.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    captureLead({ name: trimmedName, countryCode, phone: phoneDigits, intent });

    const message = `Olá, meu nome é ${trimmedName} e gostaria de ${intent}.`;
    const url = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setName("");
    setPhone("");
    close();
  }

  return (
    <div className="fixed bottom-5 right-5 z-[70] sm:bottom-6 sm:right-6">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="panel"
            role="dialog"
            aria-label="Iniciar conversa no WhatsApp"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-start justify-between gap-3 border-b border-border bg-background-alt px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary/15 font-heading text-sm font-semibold text-secondary">
                  {AGENT_INITIALS}
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">
                    {AGENT_NAME} <span className="font-sans font-normal text-muted-foreground">· {AGENT_ROLE}</span>
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-secondary">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-75" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-secondary" />
                    </span>
                    online · responde em minutos
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Fechar"
                className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4 px-5 py-5">
              <div>
                <label
                  htmlFor="wa-widget-name"
                  className="mb-1.5 block text-xs font-medium text-muted-foreground"
                >
                  Seu nome
                </label>
                <input
                  ref={nameInputRef}
                  id="wa-widget-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                  }}
                  placeholder="Como podemos te chamar?"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "wa-widget-name-error" : undefined}
                  className={cn(
                    "w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/50",
                    errors.name ? "border-destructive/50" : "border-border",
                  )}
                />
                {errors.name && (
                  <p id="wa-widget-name-error" className="mt-1.5 text-xs text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="wa-widget-phone"
                  className="mb-1.5 block text-xs font-medium text-muted-foreground"
                >
                  Telefone
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    aria-label="Código do país"
                    className="shrink-0 rounded-lg border border-border bg-background px-2 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    id="wa-widget-phone"
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => {
                      setPhone(formatPhone(e.target.value));
                      if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                    }}
                    placeholder="(11) 99999-9999"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "wa-widget-phone-error" : undefined}
                    className={cn(
                      "w-full min-w-0 rounded-lg border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/50",
                      errors.phone ? "border-destructive/50" : "border-border",
                    )}
                  />
                </div>
                {errors.phone && (
                  <p id="wa-widget-phone-error" className="mt-1.5 text-xs text-destructive">
                    {errors.phone}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-secondary text-sm font-semibold text-secondary-foreground transition-transform duration-200 hover:scale-[1.02] active:scale-100"
              >
                <Send className="size-4" aria-hidden="true" />
                Iniciar conversa
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Você será direcionado pro WhatsApp com a mensagem pronta.
              </p>
            </form>
          </motion.div>
        ) : (
          <motion.button
            key="trigger"
            type="button"
            onClick={() => open()}
            aria-label="Abrir conversa no WhatsApp"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative flex size-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-[0_8px_24px_-4px_rgba(16,185,129,0.55)] transition-transform duration-200 hover:scale-105 active:scale-100"
          >
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-40" />
            <MessageCircle className="relative size-6" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
