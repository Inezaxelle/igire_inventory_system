import "./globals.css"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import Navigation from "@/components/Navigation"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Inventory Management System",
  description: "A simple inventory management system built with Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navigation />
          <main className="container mx-auto mt-4">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
