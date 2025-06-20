import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { CartProvider } from "@/components/cart-provider"
import { SearchProvider } from "@/components/search-provider"
import { QuizProvider } from "@/components/quiz-provider"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Amazon - Sustainable Shopping",
  description: "Shop eco-friendly products and make a positive environmental impact",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <SearchProvider>
              <QuizProvider>
              <Suspense>{children}</Suspense>
              </QuizProvider>
            </SearchProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
