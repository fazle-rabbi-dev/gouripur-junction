import { Atkinson_Hyperlegible, Geist_Mono } from "next/font/google"
import { Suspense } from "react"
import { cn } from "@/lib/utils"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { DesktopSidebar } from "@/components/shared/desktop-sidebar"
import { MobileNav } from "@/components/shared/mobile-nav"
import { UrgentBannerSlot } from "@/components/shared/urgent-banner-slot"
import { RouteProgress } from "@/components/shared/route-progress"
import { UrgentBanner } from "@/components/shared/urgent-banner"

const fontSans = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        fontSans.variable
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
  )
}
