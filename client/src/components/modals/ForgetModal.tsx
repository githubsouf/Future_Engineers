import Modal from "./Modal"
import { motion } from "framer-motion"

interface ForgetModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ForgetModal({ isOpen, onClose }: ForgetModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <form className="space-y-4">
          
        </form>
      </motion.div>
    </Modal>
  )
}