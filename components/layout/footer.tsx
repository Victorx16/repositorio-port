import { AtSign, Globe, MessageCircle } from "lucide-react";
import { NAV_LINKS, SITE, whatsappLink } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-alt">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <span className="font-heading text-lg font-bold tracking-tight text-foreground">
              Code<span className="text-primary">VX</span>
            </span>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Engenharia de software premium para negócios de {SITE.region}.
              Sites de alta conversão, ultra performance e posicionamento
              real no Google.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={whatsappLink("Olá! Vim pelo site da Code VX.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <MessageCircle className="size-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <AtSign className="size-4" />
              </a>
              <a
                href="#"
                aria-label="Site institucional"
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Globe className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Navegação
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Institucional
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>{SITE.legalName}</li>
              <li className="font-mono text-xs">CNPJ {SITE.cnpj}</li>
              <li>{SITE.region}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name} — {SITE.legalName}. CNPJ{" "}
            {SITE.cnpj}. Todos os direitos reservados.
          </p>
          <p>Feito com engenharia de verdade em São Paulo.</p>
        </div>
      </div>
    </footer>
  );
}
