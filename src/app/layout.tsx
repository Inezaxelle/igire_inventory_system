import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { InventoryProvider } from "@/contexts/InventoryContext"
import "./globals.css"
import type React from "react" // Added import for React

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
            <div className="flex flex-col min-h-screen">
              <header className="p-4 flex justify-end">
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </header>
              <main className="flex-grow flex items-center justify-center">{children}</main>
            </div>
          </InventoryProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

