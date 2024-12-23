import Modal from "./Modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
      <p className="text-gray-600 mb-4 text-center">
        Log in to save your progress and access your data later.
      </p>
      <form className="space-y-4">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button className="w-full">Login</Button>
      </form>
      <p className="mt-4 text-sm text-gray-500 text-center">
        Don't have an account?{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Sign up
        </a>
      </p>
    </Modal>
  )
}