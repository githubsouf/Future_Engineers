import { useState } from "react"

type ModalType = "login" | "satisfaction" | "roadmap"

export function useModals() {
  const [openModals, setOpenModals] = useState<Record<ModalType, boolean>>({
    login: false,
    satisfaction: false,
    roadmap: false,
  })

  const openModal = (modalType: ModalType) => {
    setOpenModals((prev) => ({ ...prev, [modalType]: true }))
  }

  const closeModal = (modalType: ModalType) => {
    setOpenModals((prev) => ({ ...prev, [modalType]: false }))
  }

  const isOpen = (modalType: ModalType) => openModals[modalType]

  return { isOpen, openModal, closeModal, openModals }
}