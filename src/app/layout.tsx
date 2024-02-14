import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"

import { ThemeProvider } from "@/components/theme/theme-provider"
import Footer from "./footer/footer"
import Header from "./header/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "alío",
  description: "hand made, hight quality",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header
            className=" sticky top-0 h-16"
            shopName="alio"
            links={[
              { href: "/about-us", lName: "About us" },
              { href: "/product-detail", lName: "Catalogue" },
              { href: "/cart", lName: "Cart" },
            ]}
          />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
