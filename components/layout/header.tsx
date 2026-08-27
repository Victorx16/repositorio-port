"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE, whatsappLink } from "@/lib/constants";
import { Action } from "@/components/ui/action";
import { Wordmark } from "@/components/ui/wordmark";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

/**
 * Cabeçalho.
 *
 * A marca é só o nome. A região vinha logo abaixo, em mono, mas aparecia mais
 * três vezes na primeira tela: no rótulo da capa, no parágrafo da capa e no
 * carimbo do rodapé. Num cabeçalho fixo, que acompanha a rolagem inteira, a
 * repetição é a mais cara de todas.
 *
 * A navegação é numerada porque a página é uma sequência de leitura, e o número
 * diz ao visitante onde ele está na folha. Não é ornamento: some no celular,
 * onde a lista já é vertical e a posição é óbvia.
 */
export function Header() {
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        rolou
          ? "border-rule bg-ink/85 border-b backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="shell flex h-18 items-center justify-between gap-6">
        <Link
          href="/#top"
          className="-my-1 flex min-h-11 items-center"
          aria-label="Code VX, ir para o início"
        >
          <Wordmark className="h-[22px]" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-group text-mute hover:text-paper flex items-baseline gap-2 font-mono text-[0.6875rem] tracking-[0.12em] uppercase transition-colors"
            >
              <span
                aria-hidden="true"
                className="text-faint tnum text-[0.5625rem] transition-colors"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="link-rule">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Action
            href={whatsappLink(
              `Olá! Vim pelo site e quero saber mais sobre a ${SITE.name}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-10 px-5"
          >
            WhatsApp
          </Action>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="text-paper hover:bg-ink-3 size-11 md:hidden"
                aria-label="Abrir menu"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="bg-ink border-rule w-full max-w-sm border-l"
          >
            <SheetHeader className="border-rule flex-row items-center justify-between border-b">
              <SheetTitle>
                <Wordmark className="h-[18px]" />
              </SheetTitle>
              <SheetClose
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-mute hover:text-paper size-11"
                    aria-label="Fechar menu"
                  />
                }
              >
                <X className="size-5" />
              </SheetClose>
            </SheetHeader>

            <nav className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <SheetClose
                  key={link.href}
                  nativeButton={false}
                  render={
                    <Link
                      href={link.href}
                      className="border-rule text-paper hover:bg-ink-2 flex items-baseline gap-4 border-b px-5 py-5 text-lg transition-colors"
                    />
                  }
                >
                  <span
                    aria-hidden="true"
                    className="text-faint tnum font-mono text-[0.625rem] tracking-[0.2em]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </SheetClose>
              ))}
            </nav>

            <div className="p-5">
              <Action
                href={whatsappLink(
                  `Olá! Vim pelo site e quero saber mais sobre a ${SITE.name}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
                arrow
              >
                Falar no WhatsApp
              </Action>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
