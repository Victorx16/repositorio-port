"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface WhatsAppWidgetContextValue {
  isOpen: boolean;
  intent: string;
  open: (intent?: string) => void;
  close: () => void;
}

const DEFAULT_INTENT = "solicitar um orçamento";

const WhatsAppWidgetContext = createContext<WhatsAppWidgetContextValue | null>(
  null,
);

export function WhatsAppWidgetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [intent, setIntent] = useState(DEFAULT_INTENT);

  const open = useCallback((nextIntent?: string) => {
    setIntent(nextIntent ?? DEFAULT_INTENT);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, intent, open, close }),
    [isOpen, intent, open, close],
  );

  return (
    <WhatsAppWidgetContext.Provider value={value}>
      {children}
    </WhatsAppWidgetContext.Provider>
  );
}

export function useWhatsAppWidget() {
  const ctx = useContext(WhatsAppWidgetContext);
  if (!ctx) {
    throw new Error(
      "useWhatsAppWidget must be used within a WhatsAppWidgetProvider",
    );
  }
  return ctx;
}
