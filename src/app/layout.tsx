import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/features/layout/Header";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/features/layout/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PowerPost",
  description:
    "Generate a post from a URL with AI. Demonstrate my expertise and capability to create SAAS products. You can see my portfolio on www.henriteinturier.com or my linkedin on https://www.linkedin.com/in/henri-teinturier/",
  metadataBase: new URL("https://www.powerpost.henriteinturier.com"),
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.powerpost.henriteinturier.com",
    images: [
      {
        url: "/assets/logos/logoDarkBg.png",
        width: 1000,
        height: 1000,
        alt: "PowerPost",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={cn(inter.className, "h-full flex-grow flex flex-col")}>
        <Providers>
          <Header />
          {children}
          <SpeedInsights />
          <Analytics />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
