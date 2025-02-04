import React from 'react';
import {Link} from "react-router-dom"
// import { useModals } from "@/hooks/useModals"

export default function Header() {
  const { openModal } = useModals()
  return (
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Future Engineers
          </Link>
          <button className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ..." onClick={() => openModal("login")}>
            Login
          </button>
          <button className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ..." onClick={() => openModal("login")}>
            Sign up
          </button>
          <button className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ...">
  Save Changes
</button>
        </nav>
      </header>
  )
}