"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useModals } from "@/hooks/useModals"

export default function Header() {
  const { openModal } = useModals()

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Future Engineers
        </Link>
        <Button variant="outline" onClick={() => openModal("login")}>
          Login
        </Button>
      </nav>
    </header>
  )
}