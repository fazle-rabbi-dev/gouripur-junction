import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppHeader } from "@/components/shared/app-header";
import { DesktopSidebar } from "@/components/shared/desktop-sidebar";
import { MobileNav } from "@/components/shared/mobile-nav";
import { UrgentBannerSlot } from "@/components/shared/urgent-banner-slot";
import { RouteProgress } from "@/components/shared/route-progress";

const fontSans = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "গৌরীপুর জংশন - Gouripur Junction",
    template: "%s | গৌরীপুর জংশন",
  },
  description:
    "Gouripur Junction train schedule, train info and community posts. গৌরীপুর জংশনের ট্রেন সময়সূচি, তথ্য ও পোস্ট।",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "Gouripur Jn",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f14" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        fontSans.variable,
      )}
    >
      <body>
        <ThemeProvider>
          <Suspense fallback={null}>
            <RouteProgress />
          </Suspense>
          <div className="min-h-svh md:flex">
            <DesktopSidebar />
            <div className="min-w-0 flex-1 pb-20 md:pb-0">
              <AppHeader />
              <Suspense fallback={null}>
                <UrgentBannerSlot />
              </Suspense>
              <main>{children}</main>
            </div>
          </div>
          <MobileNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
