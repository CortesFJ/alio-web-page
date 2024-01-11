import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

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
    <html lang="es" suppressHydrationWarning className="">
      <body className={`${inter.className} bg-gray-800 text-slate-200`}>
        <Header
          links={[
            { href: "/", lName: "Home" },
            { href: "/blog-page", lName: "About us" },
            { href: "/product-detail", lName: "Catalogue" },
          ]}
        />
        {children}
        <Footer />
      </body>
    </html>
  )
}
