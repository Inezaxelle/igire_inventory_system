import { ClerkProvider, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs"
import { InventoryProvider } from "@/contexts/InventoryContext"
import { DashboardLayout } from "@/components/DashboardLayout"
import "./globals.css"
import React from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <InventoryProvider>
            <SignedOut>
              <div className="flex flex-col min-h-screen w-full">
                <header className="p-4 flex justify-end">
                  <SignInButton />
                </header>
                <main className="flex-grow flex items-center justify-center">
                  {children}
                </main>
              </div>
            </SignedOut>
            <SignedIn>
              <DashboardLayout>
                {children}
              </DashboardLayout>
            </SignedIn>
          </InventoryProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
