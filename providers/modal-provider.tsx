'use client'

import { useEffect, useState } from "react"

import { SubscriptionModal } from "@/components/subscription-modal"

export const ModalProvider = () => {
  const [isMounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <SubscriptionModal />
    </>
  )
}