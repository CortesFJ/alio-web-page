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
            className=""
            shopName="alio"
            links={[
              { href: "/blog-page", lName: "About us" },
              { href: "/product-detail", lName: "Catalogue" },
              { href: "/cart", lName: "Cart" },
            ]}
          />
          <div className="h-screen">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
