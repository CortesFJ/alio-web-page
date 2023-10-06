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
    <html lang="es">
      <body className={`  ${inter.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
