import Link from 'next/link'
import { Home, Box, BookOpen, AlertTriangle, PlusCircle } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav className="space-y-3">
        <Link href="/" className="flex items-center space-x-2 px-4 py-2.5 rounded transition duration-200 hover:bg-gray-700">
          <Home className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
        <Link href="/inventory" className="flex items-center space-x-2 px-4 py-2.5 rounded transition duration-200 hover:bg-gray-700">
          <Box className="w-5 h-5" />
          <span>Inventory</span>
        </Link>
        <Link href="/borrowing" className="flex items-center space-x-2 px-4 py-2.5 rounded transition duration-200 hover:bg-gray-700">
          <BookOpen className="w-5 h-5" />
          <span>Borrowing</span>
        </Link>
        <Link href="/damage-reports" className="flex items-center space-x-2 px-4 py-2.5 rounded transition duration-200 hover:bg-gray-700">
          <AlertTriangle className="w-5 h-5" />
          <span>Damage Reports</span>
        </Link>
        <Link href="/inventory" className="flex items-center space-x-2 px-4 py-2.5 rounded transition duration-200 hover:bg-gray-700">
          <PlusCircle className="w-5 h-5" />
          <span>Add Item</span>
        </Link>
      </nav>
    </div>
  )
}