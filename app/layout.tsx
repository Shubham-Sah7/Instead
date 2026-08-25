import { Lato, Libre_Baskerville } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
})

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-baskerville",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased light", lato.variable, libreBaskerville.variable, "font-sans")}
    >
      <body className="bg-[#F7F6F0] text-[#24282C] font-sans min-h-screen selection:bg-[#C2EF72] selection:text-[#141618]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

