"use client";

import { useEffect, useState } from "react";
import { Menu, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE, whatsappLink } from "@/lib/constants";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-heading text-lg font-bold tracking-tight text-foreground">
            Code<span className="text-primary">VX</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <ShimmerButton
            href={whatsappLink(
              "Olá! Vim pelo site e quero saber mais sobre a Code VX.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs"
          >
            <MessageCircle
              className="mr-1.5 size-3.5 transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
            Falar no WhatsApp
          </ShimmerButton>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Abrir menu"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-background">
            <SheetHeader>
              <SheetTitle className="font-heading">
                Code<span className="text-primary">VX</span>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {NAV_LINKS.map((link) => (
                <SheetClose
                  key={link.href}
                  nativeButton={false}
                  render={
                    <a
                      href={link.href}
                      className="rounded-md px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground"
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>
            <div className="mt-2 px-4">
              <ShimmerButton
                href={whatsappLink(
                  `Olá! Vim pelo site e quero saber mais sobre a ${SITE.name}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <MessageCircle
                  className="mr-1.5 size-4 transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
                Falar no WhatsApp
              </ShimmerButton>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
