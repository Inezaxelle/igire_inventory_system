"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Box, BookOpen, AlertTriangle, PlusCircle, Loader } from "lucide-react";

export function Sidebar() {
  const [loadingLink, setLoadingLink] = useState<string | null>(null);

  const handleClick = (href: string) => {
    setLoadingLink(href);
  };

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav className="space-y-3">
        {[
          { href: "/", label: "Dashboard", icon: Home },
          { href: "/list", label: "Inventory", icon: Box },
          { href: "/borrowing", label: "Borrowing", icon: BookOpen },
          { href: "/damage-reports", label: "Damage Reports", icon: AlertTriangle },
          { href: "/inventory", label: "Add Item", icon: PlusCircle },
        ].map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => handleClick(href)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded transition duration-200 hover:bg-gray-700"
          >
            {loadingLink === href ? <Loader className="w-5 h-5 animate-spin" /> : <Icon className="w-5 h-5" />}
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
