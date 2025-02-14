import { UserButton } from "@clerk/nextjs"
import { Menu } from "lucide-react"

export function TopNavigation() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button className="text-gray-500 focus:outline-none md:hidden">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-700 ml-2">Inventory Management</h1>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  )
}
