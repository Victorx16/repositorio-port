import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { WhatsAppWidgetProvider } from "@/components/whatsapp-widget/context";
import { WhatsAppWidget } from "@/components/whatsapp-widget/widget";
import { SITE } from "@/lib/constants";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const title = "Code VX: Engenharia de Software Premium para SP e ABC Paulista";
const description =
  "Sites de alta conversão, ultra performance (< 1s) e posicionamento no Google para negócios e comércios de São Paulo e ABC Paulista.";

export const metadata: Metadata = {
  // TODO: trocar pelo domínio definitivo assim que registrado/apontado.
  metadataBase: new URL("https://codevx.com.br"),
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: SITE.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=satoshi@400,500,700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <MotionConfig reducedMotion="user">
          <WhatsAppWidgetProvider>
            {children}
            <WhatsAppWidget />
          </WhatsAppWidgetProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
