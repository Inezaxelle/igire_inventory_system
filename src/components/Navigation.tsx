import Link from "next/link"
import { UserButton } from "@clerk/nextjs"

export default function Navigation() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Dashboard
          </Link>
          <Link href="/inventory" className="hover:text-gray-300">
            Inventory
          </Link>
          <Link href="/borrowing" className="hover:text-gray-300">
            Borrowing
          </Link>
          <Link href="/damage-reports" className="hover:text-gray-300">
            Damage Reports
          </Link>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  )
}
