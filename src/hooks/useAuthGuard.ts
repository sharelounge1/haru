import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export function useAuthGuard() {
  const { user } = useAuth()
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  const checkAuth = (callback: () => void) => {
    const isGuest = localStorage.getItem('guestMode') === 'true'

    if (!user || isGuest) {
      setShowLoginDialog(true)
      return false
    }

    callback()
    return true
  }

  const closeDialog = () => {
    setShowLoginDialog(false)
  }

  return {
    checkAuth,
    showLoginDialog,
    closeDialog
  }
}
